import type { ProfileRecord } from "./contract";

export const featuredProfiles = [
  {
    owner: "0xCAb2A9ddeaD44bD23904a31Eaf138cfDEbf55eea",
    handle: "marble-motion-c8d6ed",
    displayName: "Marble Motion",
    avatarUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=400&q=80",
    bio: "Narration cleanup, mastering, and reusable creator audio packs for indie builders shipping with tighter timelines.",
    paymentMessage: "Thanks for backing this recording block.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x2BC1Dd4a9B0De90ABFB2d7fC85B63B5070ecccBc",
    handle: "signal-photo-2b24a3",
    displayName: "Signal Photo",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Release automation, deployment fixes, and calmer on-call handoffs for founders who need quick delivery and fewer meetings.",
    paymentMessage: "Thanks for backing this deploy fix.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x7144C3794565E374dE8d540c22a2d1d393B24668",
    handle: "aster-research-d2de2a",
    displayName: "Aster Research",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    bio: "Release automation, deployment fixes, and calmer on-call handoffs for creators turning loose ideas into shippable launches.",
    paymentMessage: "Appreciate the backing for the next deploy fix.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0xD97Cd4a1B90d95c679A4D1801735dFfe3BE33637",
    handle: "echo-motion-814dd2",
    displayName: "Echo Motion",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    bio: "Refined design systems, handoff notes, and launch-ready polish for founders who need quick delivery and fewer meetings.",
    paymentMessage: "Appreciate the backing for the next design sprint.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x4659A7a39Ce3a1E8BadA60D61f837669d34e39Bf",
    handle: "tidal-collective-fed4e2",
    displayName: "Tidal Collective",
    avatarUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80",
    bio: "Animated launch kits, motion cleanup, and campaign cutdowns for creators turning loose ideas into shippable launches.",
    paymentMessage: "Thanks again for helping fund the next motion pack.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x295aaECEe22C3105FFC5777742E92C6D7bDc155C",
    handle: "signal-media-fdf3dd",
    displayName: "Signal Media",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=420&q=80",
    bio: "Narration cleanup, mastering, and reusable creator audio packs for creators turning loose ideas into shippable launches.",
    paymentMessage: "Thanks for keeping the next recording block.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x7965718c0718DDC5e91477E3533B92a783Ce73Fc",
    handle: "northline-collective-d50c06",
    displayName: "Northline Collective",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=420&q=80",
    bio: "Refined design systems, handoff notes, and launch-ready polish for indie builders shipping with tighter timelines.",
    paymentMessage: "Thanks again for supporting the next design sprint.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x3F648F49345CC6Ca7F28fB2BfD278Cb7681bb8F7",
    handle: "maple-ux-notes-b47f70",
    displayName: "Maple UX Notes",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=420&q=80",
    bio: "Interface walkthroughs, research notes, and sharper product flows for creators turning loose ideas into shippable launches.",
    paymentMessage: "Thanks for pushing the next UX review.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x97a69D367084b8ca6A16e585B3b42e8Cca2DEd18",
    handle: "foundry-works-427ba6",
    displayName: "Foundry Works",
    avatarUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=420&q=80",
    bio: "Content sequencing, launch support, and campaign tune-ups for recurring work that benefits from a steadier delivery loop.",
    paymentMessage: "Appreciate the backing for the next campaign sprint.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  },
  {
    owner: "0x23C00Cd3F33D3d5fcD17A1b119DB072eeE3f0285",
    handle: "lena-audio-4a2e30",
    displayName: "Lena Audio",
    avatarUrl:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=420&q=80",
    bio: "Editorial selects, quick retouching passes, and final exports for recurring work that benefits from a steadier delivery loop.",
    paymentMessage: "Appreciate the backing for the next photo delivery.",
    preferredToken: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    exists: true
  }
] as const satisfies readonly ProfileRecord[];

export function getFeaturedProfileNameKey(profile: Pick<ProfileRecord, "displayName">) {
  return profile.displayName.trim().toLowerCase();
}

export function getFeaturedProfileImageKey(profile: Pick<ProfileRecord, "avatarUrl">) {
  try {
    const url = new URL(profile.avatarUrl);
    return `${url.origin}${url.pathname}`.toLowerCase();
  } catch {
    return profile.avatarUrl.trim().toLowerCase();
  }
}
