export const LOCALE_COOKIE_NAME = "paylink_locale";

export const locales = ["en", "pt-BR"] as const;

export type Locale = (typeof locales)[number];

type HomeStep = {
  title: string;
  description: string;
};

export type Dictionary = {
  languageName: string;
  productName: string;
  productTagline: string;
  nav: {
    home: string;
    dashboard: string;
    publicPage: string;
  };
  actions: {
    createProfile: string;
    editProfile: string;
    cancel: string;
    dismissMessage: string;
    closeWalletControls: string;
    openDashboard: string;
    connectWallet: string;
    switchNetwork: string;
    refreshNetwork: string;
    disconnectWallet: string;
    saveProfile: string;
    updateProfile: string;
    copyLink: string;
    copyProfile: string;
    copyChargeLink: string;
    shareLink: string;
    shareProfile: string;
    createChargeLink: string;
    openExplorer: string;
    openPublicPage: string;
    payNow: string;
    payCreator: string;
    shareCreatorLink: string;
    viewProfile: string;
    createYourOwn: string;
    backToProfile: string;
    useDashboard: string;
    viewTransactions: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    heroSupport: string;
    heroChips: string[];
    demoCaption: string;
    proofEyebrow: string;
    proofTitle: string;
    proofDescription: string;
    proofChips: string[];
    stepsEyebrow: string;
    stepsTitle: string;
    stepsDescription: string;
    steps: HomeStep[];
    trustStatements: string[];
    closingEyebrow: string;
    closingTitle: string;
    closingDescription: string;
    summaryTitle: string;
    summaryDescription: string;
    connectHint: string;
  };
  dashboard: {
    eyebrow: string;
    titleNoProfile: string;
    titleWithProfile: string;
    descriptionNoProfile: string;
    descriptionWithProfile: string;
    actionsTab: string;
    manageTab: string;
    transactionsTab: string;
    quickActions: string;
    quickActionChargeDescription: string;
    quickActionTransactionsDescription: string;
    profileShareHint: string;
    chargeLinkHint: string;
    profileSection: string;
    chargeSection: string;
    transactionsSection: string;
    emptyTransactions: string;
    connectPrompt: string;
  };
  profileDiscovery: {
    eyebrow: string;
    title: string;
    description: string;
    searchTab: string;
    searchTitle: string;
    resultTitle: string;
    searchDescription: string;
    searchPlaceholder: string;
    latestTitle: string;
    latestDescription: string;
    loading: string;
    empty: string;
    unavailable: string;
    tooShort: string;
    notFound: string;
    error: string;
    exactHint: string;
    openProfile: string;
  };
  publicPage: {
    ownerTitle: string;
    ownerDescription: string;
    visitorTitle: string;
    visitorDescription: string;
    invoiceEyebrow: string;
    invoiceDescription: string;
    paymentFormTitle: string;
    paymentFormDescription: string;
    paymentFormLoading: string;
    requestSummaryLabel: string;
    missingTitle: string;
    missingDescription: string;
    noContractTitle: string;
    noContractDescription: string;
    recentPayments: string;
    createYours: string;
  };
  success: {
    eyebrow: string;
    title: string;
    description: string;
    receiptDetails: string;
  };
  fields: {
    handle: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    paymentMessage: string;
    preferredToken: string;
    amount: string;
    note: string;
    token: string;
    suggestedAmounts: string;
    publicLink: string;
    chargeLink: string;
  };
  placeholders: {
    handle: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    paymentMessage: string;
    note: string;
    amount: string;
  };
  labels: {
    language: string;
    connectedWallet: string;
    walletControls: string;
    network: string;
    profileLive: string;
    preferredToken: string;
    payingFrom: string;
    paidFrom: string;
    notConnected: string;
    copied: string;
    shared: string;
    checking: string;
    transaction: string;
    owner: string;
    visitor: string;
    opensInNewTab: string;
  };
    messages: {
      contractReady: string;
      missingContract: string;
      noWalletFound: string;
    couldNotConnectWallet: string;
    switchWalletRequired: string;
    miniPayWrongNetwork: string;
    couldNotSwitchNetwork: string;
    unsupportedNetwork: string;
    waitingConfirmation: string;
    profilePublished: string;
    paymentComplete: string;
    connectBeforeSave: string;
    connectBeforePay: string;
    fillAllFields: string;
    invalidImage: string;
    missingAmount: string;
    positiveAmount: string;
    handleAvailable: string;
    handleTaken: string;
    handleInvalid: string;
    handleLocked: string;
    handleChecking: string;
    handleDefault: string;
    noProfile: string;
    profileLoading: string;
    finishingProfile: string;
    confirmProfileInWallet: string;
    syncingProfile: string;
    wrongNetworkDescription: string;
    wrongNetworkMiniPayDescription: string;
    insufficientBalance: string;
    approving: string;
      confirmingApproval: string;
      sending: string;
      openingReceipt: string;
      copyingLink: string;
      sharingLink: string;
      linkCopied: string;
      shareOpened: string;
      copyFailed: string;
      shareFailed: string;
      loadingPayments: string;
      supportsTokens: string;
    };
  };

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    languageName: "English",
    productName: "MiniPay PayLink",
    productTagline: "One profile. One link. Direct payments on Celo.",
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      publicPage: "Public profile"
    },
    actions: {
      createProfile: "Create profile",
      editProfile: "Edit",
      cancel: "Cancel",
      dismissMessage: "Dismiss message",
      closeWalletControls: "Close wallet controls",
      openDashboard: "Open dashboard",
      connectWallet: "Connect wallet",
      switchNetwork: "Switch network",
      refreshNetwork: "I've switched networks",
      disconnectWallet: "Disconnect",
      saveProfile: "Publish profile",
      updateProfile: "Save changes",
      copyLink: "Copy link",
      copyProfile: "Copy public profile link",
      copyChargeLink: "Copy payment request link",
      shareLink: "Share link",
      shareProfile: "Share public profile",
      createChargeLink: "Create payment request",
      openExplorer: "View Celo explorer transaction",
      openPublicPage: "Open public profile",
      payNow: "Pay now",
      payCreator: "Send payment",
      shareCreatorLink: "Share public profile",
      viewProfile: "View profile",
      createYourOwn: "Create your profile",
      backToProfile: "Back to profile",
      useDashboard: "Use dashboard",
      viewTransactions: "View transactions"
    },
    home: {
      eyebrow: "Payment profiles for MiniPay",
      title: "A trusted public profile link for direct Celo payments.",
      description:
        "Create a public profile, choose the token you accept, and send clients one clean way to pay you on Celo.",
      heroSupport:
        "Payments settle directly in your wallet. PayLink never takes custody.",
      heroChips: [
        "Direct wallet settlement",
        "Prefilled payment links",
        "Built for MiniPay"
      ],
      demoCaption:
        "Public profile, wallet confirmation, and receipt in one flow.",
      proofEyebrow: "Trust built in",
      proofTitle: "Clear payment details before anyone sends.",
      proofDescription:
        "PayLink shows the recipient, amount, token, reference, and verification path before the transfer moves on Celo.",
      proofChips: [
        "Funds move directly to the recipient wallet",
        "Amount, token, and reference stay in the link",
        "Every payment includes a PayLink receipt URL and Celo explorer link",
        "Accept USDm, USDC, and USD₮"
      ],
      stepsEyebrow: "How it works",
      stepsTitle: "Create once. Share whenever you need to get paid.",
      stepsDescription:
        "Publish a profile, then use the same public profile or a prefilled payment link for each payment.",
      steps: [
        {
          title: "Publish your profile",
          description:
            "Claim a handle, add your public details, and choose the token you want to receive."
        },
        {
          title: "Share the right link",
          description:
            "Share your public profile for open payments or create a prefilled payment link with amount, token, and reference."
        },
        {
          title: "Keep the receipt link",
          description:
            "Payers get a receipt link after confirmation, and recent payments appear from Celo activity."
        }
      ],
      trustStatements: [
        "Settles to your wallet",
        "No PayLink custody",
        "PayLink receipt URL and Celo explorer link"
      ],
      closingEyebrow: "Ready when you are",
      closingTitle: "Publish your PayLink before the next payment request.",
      closingDescription:
        "Open the dashboard, create your profile, and share your public profile link anywhere you get paid.",
      summaryTitle: "Your PayLink is live.",
      summaryDescription:
        "Share your public profile, create prefilled payment links, and review incoming payments and receipt links from one dashboard.",
      connectHint:
        "Open PayLink in MiniPay or connect a wallet to publish your profile."
    },
    dashboard: {
      eyebrow: "Dashboard",
      titleNoProfile: "Publish your public profile",
      titleWithProfile: "Manage your PayLink",
      descriptionNoProfile:
        "Claim a handle, add your public details, and publish the profile people will use to pay you.",
      descriptionWithProfile:
        "Manage profile details, prefilled payment links, incoming payments, and receipt links.",
      actionsTab: "Profile and links",
      manageTab: "Profile",
      transactionsTab: "Payments",
      quickActions: "Quick actions",
      quickActionChargeDescription:
        "Create a prefilled payment link with amount, token, and reference.",
      quickActionTransactionsDescription:
        "Review incoming payments and open their PayLink receipt links.",
      profileShareHint:
        "Share this public profile wherever customers already reach you.",
      chargeLinkHint:
        "Create a shareable payment request link with amount, token, and reference.",
      profileSection: "Profile",
      chargeSection: "Payment request",
      transactionsSection: "Incoming payments",
      emptyTransactions:
        "Incoming payments and PayLink receipt links will appear here after someone pays through your public profile or payment request link.",
      connectPrompt:
        "Open PayLink in MiniPay or connect a browser wallet to create and manage your public profile."
    },
    profileDiscovery: {
      eyebrow: "Published profiles",
      title: "Creators, freelancers, and merchants already accepting PayLink.",
      description:
        "Browse public profiles recently published through PayLink on Celo.",
      searchTab: "Search",
      searchTitle: "Find a profile",
      resultTitle: "Matching profile",
      searchDescription:
        "Enter an exact handle to open the matching public profile.",
      searchPlaceholder: "creator_handle",
      latestTitle: "Recent profiles",
      latestDescription:
        "Newest profiles published on Celo through PayLink.",
      loading: "Searching profiles...",
      empty: "Published profiles will appear here after they are created on Celo. Start from the dashboard to add yours.",
      unavailable:
        "Configure a PayLink contract address for this network to enable public profile search.",
      tooShort: "Enter at least 3 characters from a handle to search.",
      notFound: "No published profile matches that handle. Check the spelling or paste the full handle.",
      error: "Profiles could not load right now. Check your connection and try again in a moment.",
      exactHint: "Paste @handle or the handle only. PayLink removes @ and extra spaces; handles use 3-32 letters, numbers, hyphens, or underscores.",
      openProfile: "Open profile"
    },
    publicPage: {
      ownerTitle: "This is your public PayLink profile.",
      ownerDescription:
        "Visitors see the payment form here. Share this public profile as-is, or open the dashboard to update details and create prefilled payment links.",
      visitorTitle: "Send a direct Celo payment",
      visitorDescription:
        "Review the recipient, amount, token, and any reference before confirming the payment in your wallet.",
      invoiceEyebrow: "Payment request",
      invoiceDescription:
        "This payment request link includes prefilled payment details. Review them, then complete the transfer on Celo.",
      paymentFormTitle: "Payment details",
      paymentFormDescription:
        "Choose an amount, token, and optional reference. If prompted, approve the token first, then confirm the payment.",
      paymentFormLoading: "Loading payment request form",
      requestSummaryLabel: "Request summary",
      missingTitle: "This PayLink is not published yet.",
      missingDescription:
        "That handle has not been published. Check the handle spelling, or create your profile to start receiving direct payments.",
      noContractTitle: "PayLink is not configured for this network.",
      noContractDescription:
        "Configure PayLink for this network before sharing public profiles.",
      recentPayments: "Recent payments",
      createYours: "Create your profile"
    },
    success: {
      eyebrow: "Payment sent",
      title: "Payment sent.",
      description:
        "Your transfer was submitted on Celo. Save the PayLink receipt link and matching Celo explorer transaction link as proof, then return to the profile to see recent payment activity.",
      receiptDetails: "PayLink receipt link details"
    },
    fields: {
      handle: "Handle",
      displayName: "Display name",
      avatarUrl: "Avatar URL",
      bio: "Bio",
      paymentMessage: "Payment message",
      preferredToken: "Preferred token",
      amount: "Amount",
      note: "Reference",
      token: "Token",
      suggestedAmounts: "Suggested amounts",
      publicLink: "Public link",
      chargeLink: "Payment request"
    },
    placeholders: {
      handle: "creator",
      displayName: "Atlas Studio",
      avatarUrl: "https://example.com/avatar.jpg",
      bio: "Design systems, websites, and product work.",
      paymentMessage: "Thanks for sending this payment.",
      note: "Project deposit",
      amount: "15.00"
    },
    labels: {
      language: "Language",
      connectedWallet: "Connected wallet",
      walletControls: "Wallet controls",
      network: "Network",
      profileLive: "PayLink live",
      preferredToken: "Preferred token",
      payingFrom: "Paying from",
      paidFrom: "Paid from",
      notConnected: "Not connected",
      copied: "Copied",
      shared: "Shared",
      checking: "Checking...",
      transaction: "Transaction",
      owner: "Your profile",
      visitor: "Public profile",
      opensInNewTab: "opens in a new tab"
    },
    messages: {
      contractReady: "Profile updates publish directly through PayLink on Celo.",
      missingContract: "Configure PayLink for this network before publishing profiles or accepting payments.",
      noWalletFound:
        "No wallet found. Open PayLink in MiniPay or connect with a browser wallet, then try again.",
      couldNotConnectWallet: "Could not connect to the wallet. Approve the wallet request, or reopen it if you dismissed it.",
      switchWalletRequired: "Switch your wallet to {network} to continue.",
      miniPayWrongNetwork:
        "MiniPay is on the wrong network. Open MiniPay settings and switch to {network}.",
      couldNotSwitchNetwork: "Could not switch to {network}. Switch manually in your wallet and try again.",
      unsupportedNetwork: "Unsupported network ({chainId}). Switch to a supported Celo network.",
      waitingConfirmation: "Waiting for wallet confirmation...",
      profilePublished: "Profile published. Your public link is ready to share.",
      paymentComplete: "Payment complete. Your receipt link is ready.",
      connectBeforeSave: "Connect with MiniPay or a browser wallet before publishing this profile.",
      connectBeforePay: "Connect with MiniPay or a browser wallet to send this payment.",
      fillAllFields: "Complete handle, display name, bio, and preferred token before publishing.",
      invalidImage:
        "Leave the avatar URL blank, or paste an https:// image link.",
      missingAmount: "Enter an amount like 5 or 5.50 before sending this payment.",
      positiveAmount: "Enter an amount greater than zero, then review it before sending.",
      handleAvailable: "Handle is available.",
      handleTaken: "That handle is already taken. Try another one.",
      handleInvalid: "Use 3-32 characters with no spaces: lowercase letters, numbers, hyphen, or underscore.",
      handleLocked: "Handle cannot change after publishing, but profile details can still be updated.",
      handleChecking: "Checking handle availability...",
      handleDefault: "Use 3-32 lowercase letters, numbers, hyphen, or underscore; PayLink removes @ and spaces.",
      noProfile:
        "Connect a wallet and publish your profile to start receiving payments.",
      profileLoading: "Loading your PayLink profile...",
      finishingProfile: "Publishing your profile...",
      confirmProfileInWallet:
        "Confirm the profile transaction in your wallet, then wait for Celo confirmation.",
      syncingProfile:
        "Refreshing your dashboard with the latest Celo profile data.",
      wrongNetworkDescription:
        "Switch your wallet to the required network before using PayLink.",
      wrongNetworkMiniPayDescription:
        'MiniPay is on the wrong network for this app. If you are testing, disable "Use Testnet" in MiniPay settings, then return and try again.',
      insufficientBalance: "Insufficient {token} balance to send this payment. Add funds or choose a smaller amount.",
      approving: "Approving",
      confirmingApproval: "Confirming token approval on Celo...",
      sending: "Sending",
      openingReceipt: "Opening your PayLink receipt link...",
      copyingLink: "Copying link",
      sharingLink: "Opening share sheet",
      linkCopied: "Link copied. Ready to share.",
      shareOpened: "Share sheet opened for this link.",
      copyFailed: "Could not copy the link on this device. Select the URL and copy it manually.",
      shareFailed: "Could not open sharing right now. Use the copy button or copy the URL manually.",
      loadingPayments: "Reading recent payments from Celo...",
      supportsTokens: "Accepts {tokens}."
    }
  },
  "pt-BR": {
    languageName: "Português (Brasil)",
    productName: "MiniPay PayLink",
    productTagline: "Um perfil. Um link. Pagamentos diretos na Celo.",
    nav: {
      home: "Início",
      dashboard: "Painel",
      publicPage: "Perfil público"
    },
    actions: {
      createProfile: "Criar perfil",
      editProfile: "Editar",
      cancel: "Cancelar",
      dismissMessage: "Fechar mensagem",
      closeWalletControls: "Fechar controles da carteira",
      openDashboard: "Abrir painel",
      connectWallet: "Conectar carteira",
      switchNetwork: "Trocar rede",
      refreshNetwork: "Já troquei a rede",
      disconnectWallet: "Desconectar",
      saveProfile: "Publicar perfil",
      updateProfile: "Salvar alterações",
      copyLink: "Copiar link",
      copyProfile: "Copiar link do perfil público",
      copyChargeLink: "Copiar link de cobrança",
      shareLink: "Compartilhar link",
      shareProfile: "Compartilhar perfil público",
      createChargeLink: "Criar link de cobrança",
      openExplorer: "Ver transação no explorer da Celo",
      openPublicPage: "Ver perfil público",
      payNow: "Pagar agora",
      payCreator: "Enviar pagamento",
      shareCreatorLink: "Compartilhar perfil público",
      viewProfile: "Ver perfil",
      createYourOwn: "Criar seu perfil",
      backToProfile: "Voltar ao perfil",
      useDashboard: "Usar painel",
      viewTransactions: "Ver transações"
    },
    home: {
      eyebrow: "Perfis de pagamento para MiniPay",
      title: "Um link de perfil público confiável para pagamentos diretos na Celo.",
      description:
        "Crie um perfil público, escolha o token que aceita e envie aos clientes uma forma simples de pagar você na Celo.",
      heroSupport:
        "O pagamento liquida direto na sua carteira. O PayLink nunca fica com os fundos.",
      heroChips: [
        "Liquidação direta na carteira",
        "Links de cobrança preenchidos",
        "Feito para MiniPay"
      ],
      demoCaption:
        "Perfil público, confirmação na carteira e comprovante em um só fluxo.",
      proofEyebrow: "Confiança integrada",
      proofTitle: "Dados claros antes de qualquer pagamento.",
      proofDescription:
        "O PayLink mostra quem recebe, valor, token, referência e caminho de verificação antes da transferência na Celo.",
      proofChips: [
        "Os fundos vão direto para a carteira de quem recebe",
        "Valor, token e referência ficam no link",
        "Todo pagamento inclui link de comprovante do PayLink e link para o explorer da Celo",
        "Aceite USDm, USDC e USD₮"
      ],
      stepsEyebrow: "Como funciona",
      stepsTitle: "Crie uma vez. Compartilhe sempre que precisar receber.",
      stepsDescription:
        "Publique um perfil e use o mesmo perfil público ou um link de cobrança preenchido para cada pagamento.",
      steps: [
        {
          title: "Publique seu perfil",
          description:
            "Escolha um handle, adicione seus dados públicos e defina o token que quer receber."
        },
        {
          title: "Compartilhe o link certo",
          description:
            "Compartilhe seu perfil público para pagamentos livres ou crie um link de cobrança preenchido com valor, token e referência."
        },
        {
          title: "Guarde o link do comprovante",
          description:
            "Quem paga recebe um link de comprovante após a confirmação, e os pagamentos recentes aparecem pela atividade na Celo."
        }
      ],
      trustStatements: [
        "Liquida na sua carteira",
        "Sem custódia do PayLink",
        "Comprovante do PayLink e link para o explorer da Celo"
      ],
      closingEyebrow: "Pronto para receber",
      closingTitle: "Publique seu PayLink antes da próxima cobrança.",
      closingDescription:
        "Abra o painel, crie seu perfil e compartilhe o link do seu perfil público onde você recebe pagamentos.",
      summaryTitle: "Seu PayLink está no ar.",
      summaryDescription:
        "Compartilhe seu perfil público, crie links de cobrança preenchidos e acompanhe pagamentos recebidos e links de comprovante em um painel.",
      connectHint:
        "Abra o PayLink no MiniPay ou conecte uma carteira para publicar seu perfil."
    },
    dashboard: {
      eyebrow: "Painel",
      titleNoProfile: "Publique seu perfil público",
      titleWithProfile: "Gerencie seu PayLink",
      descriptionNoProfile:
        "Escolha um handle, adicione seus dados públicos e publique o perfil que as pessoas vão usar para pagar você.",
      descriptionWithProfile:
        "Gerencie dados do perfil, links de cobrança preenchidos, pagamentos recebidos e links de comprovante.",
      actionsTab: "Perfil e links",
      manageTab: "Perfil",
      transactionsTab: "Pagamentos",
      quickActions: "Ações rápidas",
      quickActionChargeDescription:
        "Crie um link de cobrança preenchido com valor, token e referência.",
      quickActionTransactionsDescription:
        "Revise os pagamentos recebidos e abra os links de comprovante do PayLink.",
      profileShareHint:
        "Compartilhe este perfil público onde seus clientes já falam com você.",
      chargeLinkHint:
        "Crie um link de cobrança compartilhável com valor, token e referência.",
      profileSection: "Perfil",
      chargeSection: "Link de cobrança",
      transactionsSection: "Pagamentos recebidos",
      emptyTransactions:
        "Os pagamentos recebidos e links de comprovante do PayLink aparecerão aqui depois que alguém pagar pelo seu perfil público ou link de cobrança.",
      connectPrompt:
        "Abra o PayLink no MiniPay ou conecte uma carteira do navegador para criar e gerenciar seu perfil público."
    },
    profileDiscovery: {
      eyebrow: "Perfis publicados",
      title: "Criadores, freelancers e comerciantes já recebendo pelo PayLink.",
      description:
        "Veja perfis públicos publicados recentemente pelo PayLink na Celo.",
      searchTab: "Buscar",
      searchTitle: "Buscar perfil",
      resultTitle: "Perfil encontrado",
      searchDescription:
        "Digite o handle exato para abrir o perfil público correspondente.",
      searchPlaceholder: "criador_handle",
      latestTitle: "Perfis recentes",
      latestDescription:
        "Perfis mais novos publicados na Celo pelo PayLink.",
      loading: "Buscando perfis...",
      empty: "Perfis publicados aparecerão aqui depois que forem criados na Celo. Comece pelo painel para adicionar o seu.",
      unavailable:
        "Configure um endereço de contrato do PayLink para esta rede para ativar a busca de perfis públicos.",
      tooShort: "Digite pelo menos 3 caracteres de um handle para buscar.",
      notFound: "Nenhum perfil publicado corresponde a esse handle. Confira a grafia ou cole o handle completo.",
      error: "Não foi possível carregar os perfis agora. Confira sua conexão e tente novamente em instantes.",
      exactHint: "Cole @handle ou apenas o handle. O PayLink remove @ e espaços extras; handles usam de 3 a 32 letras, números, hífens ou sublinhados.",
      openProfile: "Abrir perfil"
    },
    publicPage: {
      ownerTitle: "Este é o seu perfil público do PayLink.",
      ownerDescription:
        "Visitantes veem o formulário de pagamento aqui. Compartilhe este perfil público como está ou abra o painel para atualizar dados e criar links de cobrança preenchidos.",
      visitorTitle: "Enviar pagamento direto na Celo",
      visitorDescription:
        "Confira quem recebe, valor, token e referência, se houver, antes de confirmar o pagamento na sua carteira.",
      invoiceEyebrow: "Cobrança",
      invoiceDescription:
        "Este link de cobrança traz dados de pagamento preenchidos. Revise tudo e conclua a transferência na Celo.",
      paymentFormTitle: "Dados do pagamento",
      paymentFormDescription:
        "Escolha valor, token e referência opcional. Se solicitado, aprove o token primeiro e depois confirme o pagamento.",
      paymentFormLoading: "Carregando formulário da cobrança",
      requestSummaryLabel: "Resumo da cobrança",
      missingTitle: "Este PayLink ainda não foi publicado.",
      missingDescription:
        "Esse handle ainda não foi publicado. Confira a grafia do handle ou crie seu perfil para começar a receber pagamentos diretos.",
      noContractTitle: "O PayLink não está configurado para esta rede.",
      noContractDescription:
        "Configure o PayLink para esta rede antes de compartilhar perfis públicos.",
      recentPayments: "Pagamentos recentes",
      createYours: "Criar seu perfil"
    },
    success: {
      eyebrow: "Pagamento enviado",
      title: "Pagamento enviado.",
      description:
        "Sua transferência foi enviada na Celo. Salve o link do comprovante do PayLink e o link da transação correspondente no explorer da Celo como prova, depois volte ao perfil para ver os pagamentos recentes.",
      receiptDetails: "Dados do link de comprovante do PayLink"
    },
    fields: {
      handle: "Handle",
      displayName: "Nome exibido",
      avatarUrl: "URL do avatar",
      bio: "Bio",
      paymentMessage: "Mensagem de agradecimento",
      preferredToken: "Token preferido",
      amount: "Valor",
      note: "Referência",
      token: "Token",
      suggestedAmounts: "Valores sugeridos",
      publicLink: "Link público",
      chargeLink: "Link de cobrança"
    },
    placeholders: {
      handle: "criador",
      displayName: "Atlas Studio",
      avatarUrl: "https://example.com/avatar.jpg",
      bio: "Design, sites e suporte de produto.",
      paymentMessage: "Obrigado pelo pagamento.",
      note: "Sinal do projeto",
      amount: "15.00"
    },
    labels: {
      language: "Idioma",
      connectedWallet: "Carteira conectada",
      walletControls: "Controles da carteira",
      network: "Rede",
      profileLive: "PayLink ativo",
      preferredToken: "Token preferido",
      payingFrom: "Pagando com",
      paidFrom: "Pago por",
      notConnected: "Não conectado",
      copied: "Copiado",
      shared: "Compartilhado",
      checking: "Verificando...",
      transaction: "Transação",
      owner: "Seu perfil",
      visitor: "Perfil público",
      opensInNewTab: "abre em uma nova aba"
    },
    messages: {
      contractReady: "As alterações do perfil são publicadas direto pelo PayLink na Celo.",
      missingContract: "Configure o PayLink para esta rede antes de publicar perfis ou receber pagamentos.",
      noWalletFound:
        "Nenhuma carteira foi encontrada. Abra o PayLink no MiniPay ou conecte uma carteira do navegador e tente novamente.",
      couldNotConnectWallet: "Não foi possível conectar à carteira. Aprove a solicitação ou abra de novo se você a dispensou.",
      switchWalletRequired: "Troque sua carteira para {network} para continuar.",
      miniPayWrongNetwork:
        "O MiniPay está na rede errada. Abra as configurações do MiniPay e troque para {network}.",
      couldNotSwitchNetwork: "Não foi possível trocar para {network}. Troque manualmente na carteira e tente novamente.",
      unsupportedNetwork: "Rede não suportada ({chainId}). Troque para uma rede Celo compatível.",
      waitingConfirmation: "Aguardando confirmação na carteira...",
      profilePublished: "Perfil publicado. Seu link público está pronto para compartilhar.",
      paymentComplete: "Pagamento concluído. Seu link de comprovante está pronto.",
      connectBeforeSave: "Conecte pelo MiniPay ou por uma carteira do navegador antes de publicar este perfil.",
      connectBeforePay: "Conecte pelo MiniPay ou por uma carteira do navegador para enviar este pagamento.",
      fillAllFields: "Preencha handle, nome exibido, bio e token preferido antes de publicar.",
      invalidImage:
        "Deixe a URL do avatar vazia ou cole um link de imagem https://.",
      missingAmount: "Informe um valor como 5 ou 5.50 antes de enviar este pagamento.",
      positiveAmount: "Informe um valor maior que zero e revise antes de enviar.",
      handleAvailable: "Handle disponível.",
      handleTaken: "Esse handle já está em uso. Tente outro.",
      handleInvalid: "Use de 3 a 32 caracteres sem espaços: letras minúsculas, números, hífen ou sublinhado.",
      handleLocked: "O handle não pode ser alterado depois da publicação, mas os dados do perfil ainda podem ser atualizados.",
      handleChecking: "Verificando disponibilidade do handle...",
      handleDefault: "Use de 3 a 32 letras minúsculas, números, hífen ou sublinhado; o PayLink remove @ e espaços.",
      noProfile:
        "Conecte uma carteira e publique seu perfil para começar a receber.",
      profileLoading: "Carregando seu perfil PayLink...",
      finishingProfile: "Publicando seu perfil...",
      confirmProfileInWallet:
        "Confirme a transação do perfil na sua carteira e aguarde a inclusão na Celo.",
      syncingProfile:
        "Atualizando seu painel com os dados mais recentes do perfil na Celo.",
      wrongNetworkDescription:
        "Troque sua carteira para a rede correta antes de usar o PayLink.",
      wrongNetworkMiniPayDescription:
        'O MiniPay está na rede errada para este app. Se você estiver testando, desative "Use Testnet" nas configurações do MiniPay, volte e tente de novo.',
      insufficientBalance: "Saldo insuficiente em {token} para enviar este pagamento. Adicione saldo ou escolha um valor menor.",
      approving: "Aprovando",
      confirmingApproval: "Confirmando a aprovação do token na Celo...",
      sending: "Enviando",
      openingReceipt: "Abrindo o link do comprovante do PayLink...",
      copyingLink: "Copiando link",
      sharingLink: "Abrindo compartilhamento",
      linkCopied: "Link copiado. Pronto para compartilhar.",
      shareOpened: "Janela de compartilhamento aberta para este link.",
      copyFailed: "Não foi possível copiar o link neste dispositivo. Selecione a URL e copie manualmente.",
      shareFailed: "Não foi possível abrir o compartilhamento agora. Use o botão de copiar ou copie a URL manualmente.",
      loadingPayments: "Lendo pagamentos recentes na Celo...",
      supportsTokens: "Aceita {tokens}."
    }
  }
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function interpolate(
  template: string,
  values: Record<string, string | number>
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    return String(values[key] ?? `{${key}}`);
  });
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return "en";

  const normalized = value.toLowerCase();
  if (normalized.startsWith("pt")) {
    return "pt-BR";
  }

  return "en";
}

export function resolveLocaleFromRequest(
  cookieStore: {
    get: (name: string) => { value: string } | undefined;
  },
  headerStore: {
    get: (name: string) => string | null | undefined;
  }
): Locale {
  const fromCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (fromCookie) {
    return normalizeLocale(fromCookie);
  }

  return normalizeLocale(headerStore.get("accept-language"));
}

export function getRuntimeLocale(): Locale {
  if (typeof document !== "undefined") {
    const cookieValue = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${LOCALE_COOKIE_NAME}=`))
      ?.split("=")[1];

    if (cookieValue) {
      return normalizeLocale(decodeURIComponent(cookieValue));
    }
  }

  if (typeof navigator !== "undefined") {
    return normalizeLocale(navigator.language);
  }

  return "en";
}

export function getRuntimeDictionary() {
  return getDictionary(getRuntimeLocale());
}
