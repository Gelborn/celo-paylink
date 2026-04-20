// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20Minimal {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract PayLinkProfile {
    struct Profile {
        address owner;
        string handle;
        string displayName;
        string avatarUrl;
        string bio;
        string paymentMessage;
        address preferredToken;
        bool exists;
    }

    error HandleTaken();
    error HandleImmutable();
    error InvalidHandle();
    error UnsupportedToken();
    error ProfileNotFound();
    error InvalidRecipient();
    error ZeroAmount();
    error TransferFailed();

    event ProfileSet(
        address indexed owner,
        string handle,
        string displayName,
        string avatarUrl,
        address preferredToken
    );
    event PaymentSent(
        address indexed recipient,
        address indexed payer,
        address indexed token,
        uint256 amount,
        string paymentReference,
        string handle
    );

    mapping(address => Profile) private profiles;
    mapping(bytes32 => address) private ownersByHandle;
    mapping(address => bool) public supportedTokens;

    constructor(address[] memory allowedTokens) {
        uint256 length = allowedTokens.length;
        if (length == 0) revert UnsupportedToken();

        for (uint256 i = 0; i < length; i++) {
            address token = allowedTokens[i];
            if (token == address(0)) revert UnsupportedToken();
            supportedTokens[token] = true;
        }
    }

    function setProfile(
        string calldata handle,
        string calldata displayName,
        string calldata avatarUrl,
        string calldata bio,
        string calldata paymentMessage,
        address preferredToken
    ) external {
        if (!supportedTokens[preferredToken]) revert UnsupportedToken();

        string memory normalizedHandle = _normalizeHandle(handle);
        bytes32 handleKey = keccak256(bytes(normalizedHandle));
        Profile storage profile = profiles[msg.sender];

        if (!profile.exists) {
            if (ownersByHandle[handleKey] != address(0)) revert HandleTaken();

            ownersByHandle[handleKey] = msg.sender;
            profiles[msg.sender] = Profile({
                owner: msg.sender,
                handle: normalizedHandle,
                displayName: displayName,
                avatarUrl: avatarUrl,
                bio: bio,
                paymentMessage: paymentMessage,
                preferredToken: preferredToken,
                exists: true
            });
        } else {
            if (keccak256(bytes(profile.handle)) != handleKey) {
                revert HandleImmutable();
            }

            profile.displayName = displayName;
            profile.avatarUrl = avatarUrl;
            profile.bio = bio;
            profile.paymentMessage = paymentMessage;
            profile.preferredToken = preferredToken;
        }

        emit ProfileSet(
            msg.sender,
            normalizedHandle,
            displayName,
            avatarUrl,
            preferredToken
        );
    }

    function getProfile(address owner) external view returns (Profile memory) {
        Profile memory profile = profiles[owner];
        if (!profile.exists) revert ProfileNotFound();
        return profile;
    }

    function getProfileByHandle(
        string calldata handle
    ) external view returns (Profile memory) {
        address owner = resolveHandle(handle);
        if (owner == address(0)) revert ProfileNotFound();
        return profiles[owner];
    }

    function resolveHandle(
        string calldata handle
    ) public view returns (address) {
        string memory normalizedHandle = _normalizeHandle(handle);
        return ownersByHandle[keccak256(bytes(normalizedHandle))];
    }

    function pay(
        string calldata recipientOrHandle,
        address token,
        uint256 amount,
        string calldata paymentReference
    ) external {
        if (amount == 0) revert ZeroAmount();
        if (!supportedTokens[token]) revert UnsupportedToken();

        (address recipient, string memory normalizedHandle) = _resolveRecipient(
            recipientOrHandle
        );

        if (recipient == address(0)) revert InvalidRecipient();

        bool success = IERC20Minimal(token).transferFrom(
            msg.sender,
            recipient,
            amount
        );
        if (!success) revert TransferFailed();

        emit PaymentSent(
            recipient,
            msg.sender,
            token,
            amount,
            paymentReference,
            normalizedHandle
        );
    }

    function _resolveRecipient(
        string calldata recipientOrHandle
    ) private view returns (address recipient, string memory normalizedHandle) {
        bytes memory raw = bytes(recipientOrHandle);

        if (
            raw.length == 42 &&
            raw[0] == bytes1("0") &&
            (raw[1] == bytes1("x") || raw[1] == bytes1("X"))
        ) {
            recipient = _parseAddress(raw);
            Profile memory profile = profiles[recipient];
            if (!profile.exists) revert ProfileNotFound();
            return (recipient, profile.handle);
        }

        normalizedHandle = _normalizeHandle(recipientOrHandle);
        recipient = ownersByHandle[keccak256(bytes(normalizedHandle))];
        if (recipient == address(0)) revert ProfileNotFound();
        return (recipient, normalizedHandle);
    }

    function _normalizeHandle(
        string memory handle
    ) private pure returns (string memory) {
        bytes memory raw = bytes(handle);
        uint256 length = raw.length;

        if (length < 3 || length > 32) revert InvalidHandle();

        bytes memory normalized = new bytes(length);

        for (uint256 i = 0; i < length; i++) {
            bytes1 char = raw[i];

            if (char >= 0x41 && char <= 0x5A) {
                normalized[i] = bytes1(uint8(char) + 32);
            } else if (
                (char >= 0x61 && char <= 0x7A) ||
                (char >= 0x30 && char <= 0x39) ||
                char == 0x2D ||
                char == 0x5F
            ) {
                normalized[i] = char;
            } else {
                revert InvalidHandle();
            }
        }

        return string(normalized);
    }

    function _parseAddress(
        bytes memory text
    ) private pure returns (address parsed) {
        uint160 result = 0;

        for (uint256 i = 2; i < 42; i++) {
            result = result * 16 + uint160(_fromHexChar(uint8(text[i])));
        }

        parsed = address(result);
    }

    function _fromHexChar(uint8 charCode) private pure returns (uint8) {
        if (charCode >= 48 && charCode <= 57) return charCode - 48;
        if (charCode >= 65 && charCode <= 70) return charCode - 55;
        if (charCode >= 97 && charCode <= 102) return charCode - 87;
        revert InvalidRecipient();
    }
}
