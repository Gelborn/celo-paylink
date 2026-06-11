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
    notConnected: string;
    copied: string;
    shared: string;
    checking: string;
    transaction: string;
    owner: string;
    visitor: string;
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
      openDashboard: "Open dashboard",
      connectWallet: "Connect wallet",
      switchNetwork: "Switch network",
      refreshNetwork: "I've switched networks",
      disconnectWallet: "Disconnect",
      saveProfile: "Publish profile",
      updateProfile: "Save changes",
      copyLink: "Copy link",
      copyProfile: "Copy public profile link",
      copyChargeLink: "Copy request link",
      shareLink: "Share link",
      shareProfile: "Share public profile",
      createChargeLink: "Create request link",
      openExplorer: "View Celo explorer receipt",
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
        "Prefilled request links",
        "Built for MiniPay"
      ],
      demoCaption:
        "Public profile, wallet confirmation, and receipt in one flow.",
      proofEyebrow: "Trust built in",
      proofTitle: "Clear payment details before anyone sends.",
      proofDescription:
        "PayLink shows the recipient, amount, token, and verification path before the transfer moves on Celo.",
      proofChips: [
        "Funds move directly to the recipient wallet",
        "Amount, token, and reference stay in the link",
        "Every payment includes PayLink and explorer proof",
        "Accept USDm, USDC, and USD₮"
      ],
      stepsEyebrow: "How it works",
      stepsTitle: "Create once. Share whenever you need to get paid.",
      stepsDescription:
        "Publish a profile, then use the same public profile or a prefilled request link for each payment.",
      steps: [
        {
          title: "Publish your profile",
          description:
            "Claim a handle, add your public details, and choose the token you want to receive."
        },
        {
          title: "Share the right link",
          description:
            "Share your public profile for open payments or create a prefilled request link with amount, token, and reference."
        },
        {
          title: "Keep a receipt",
          description:
            "Payers get a receipt link after confirmation, and recent payments appear from onchain events."
        }
      ],
      trustStatements: [
        "Settles to your wallet",
        "No PayLink custody",
        "PayLink and explorer proof"
      ],
      closingEyebrow: "Ready when you are",
      closingTitle: "Publish your PayLink before the next payment request.",
      closingDescription:
        "Open the dashboard, create your profile, and share your public profile link anywhere you get paid.",
      summaryTitle: "Your PayLink is live.",
      summaryDescription:
        "Share your public profile, create prefilled request links, and review incoming payments from one dashboard.",
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
        "Manage profile details, prefilled request links, and incoming payments.",
      actionsTab: "Profile and links",
      manageTab: "Profile",
      transactionsTab: "Payments",
      quickActions: "Quick actions",
      quickActionChargeDescription:
        "Create a prefilled request link with amount, token, and reference.",
      quickActionTransactionsDescription:
        "Review incoming payments and open their PayLink receipts.",
      profileShareHint:
        "Share this public profile wherever customers already reach you.",
      chargeLinkHint:
        "Create a prefilled payment request with amount, token, and reference.",
      profileSection: "Profile",
      chargeSection: "Request link",
      transactionsSection: "Incoming payments",
      emptyTransactions:
        "Incoming payments and PayLink receipts will appear here after someone pays through your public profile or request link.",
      connectPrompt:
        "Open in MiniPay or connect a browser wallet to create and manage your public profile."
    },
    profileDiscovery: {
      eyebrow: "Published profiles",
      title: "Creators and merchants using PayLink.",
      description:
        "Browse public profiles recently published from the PayLink contract.",
      searchTab: "Search",
      searchTitle: "Find a profile",
      searchDescription:
        "Enter an exact handle to open its public profile.",
      searchPlaceholder: "creator_handle",
      latestTitle: "Recent profiles",
      latestDescription:
        "Newest profiles published by PayLink contract events.",
      loading: "Loading profiles...",
      empty: "Published profiles will appear here after they are created onchain.",
      unavailable:
        "Profile discovery will appear after the PayLink contract address is configured.",
      tooShort: "Enter at least 3 characters from a handle to search.",
      notFound: "No published profile matches that handle.",
      error: "Profiles could not load right now. Try again in a moment.",
      exactHint: "Paste the full handle; PayLink strips @ and spaces. Handles need 3-32 letters, numbers, hyphens, or underscores.",
      openProfile: "Open profile"
    },
    publicPage: {
      ownerTitle: "This is your public PayLink profile.",
      ownerDescription:
        "Visitors see the payment form here. Share this public profile as-is, or open the dashboard to update details and create prefilled request links.",
      visitorTitle: "Send a direct Celo payment",
      visitorDescription:
        "Review the recipient, amount, token, and any reference before confirming the payment in your wallet.",
      invoiceEyebrow: "Payment request",
      invoiceDescription:
        "This request link includes payment details. Review them, then complete the transfer on Celo.",
      paymentFormTitle: "Payment details",
      paymentFormDescription:
        "Choose an amount, token, and optional reference. If prompted, approve the token first, then confirm the payment.",
      paymentFormLoading: "Loading payment details",
      requestSummaryLabel: "Request summary",
      missingTitle: "This PayLink is not published yet.",
      missingDescription:
        "That handle has not been published. Check the link, or create your profile to start receiving direct payments.",
      noContractTitle: "Contract not configured",
      noContractDescription:
        "Set a PayLink contract address in the environment so public profiles can load.",
      recentPayments: "Recent payments",
      createYours: "Create your profile"
    },
    success: {
      eyebrow: "Payment sent",
      title: "Payment sent.",
      description:
        "Your transfer was submitted on Celo. Save the PayLink receipt as proof, then return to the profile to see recent payment activity.",
      receiptDetails: "PayLink receipt details"
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
      chargeLink: "Request link"
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
      notConnected: "Not connected",
      copied: "Copied",
      shared: "Shared",
      checking: "Checking...",
      transaction: "Transaction",
      owner: "Owner view",
      visitor: "Public profile"
    },
    messages: {
      contractReady: "Profile updates are written directly to the deployed PayLink contract.",
      missingContract: "Set a PayLink contract address in .env before using the app.",
      noWalletFound:
        "No wallet found. Open PayLink in MiniPay or use a browser with an injected wallet.",
      couldNotConnectWallet: "Could not connect to the wallet. Check the wallet prompt and try again.",
      switchWalletRequired: "Switch your wallet to {network} to continue.",
      miniPayWrongNetwork:
        "MiniPay is on the wrong network. Open MiniPay settings and switch to {network}.",
      couldNotSwitchNetwork: "Could not switch to {network}.",
      unsupportedNetwork: "Unsupported network ({chainId}).",
      waitingConfirmation: "Waiting for confirmation...",
      profilePublished: "Profile published. Public link is ready.",
      paymentComplete: "Payment complete.",
      connectBeforeSave: "Connect your wallet before publishing this profile.",
      connectBeforePay: "Connect a wallet to send this payment.",
      fillAllFields: "Complete handle, display name, bio, and token before publishing.",
      invalidImage:
        "Avatar URL must be blank or start with https://.",
      missingAmount: "Enter a payment amount to continue.",
      positiveAmount: "Enter an amount greater than zero.",
      handleAvailable: "Handle is available.",
      handleTaken: "That handle is already taken. Try another one.",
      handleInvalid: "Handle must be 3-32 characters.",
      handleLocked: "Handle cannot change after publishing.",
      handleChecking: "Checking handle availability...",
      handleDefault: "Use lowercase letters, numbers, hyphen, or underscore.",
      noProfile:
        "Connect a wallet and publish your profile to start receiving payments.",
      profileLoading: "Loading your profile...",
      finishingProfile: "Publishing your profile...",
      confirmProfileInWallet:
        "Confirm the profile transaction in your wallet, then wait for Celo confirmation.",
      syncingProfile:
        "Refreshing your dashboard with the latest onchain profile data.",
      wrongNetworkDescription:
        "Switch your wallet to the required network before using PayLink.",
      wrongNetworkMiniPayDescription:
        'MiniPay is on the wrong network for this app. If you are testing, disable "Use Testnet" in MiniPay settings, then return and try again.',
      insufficientBalance: "Insufficient {token} balance to send this payment.",
      approving: "Approving",
      confirmingApproval: "Confirming token approval on Celo...",
      sending: "Sending",
      openingReceipt: "Opening your receipt link...",
      linkCopied: "Link copied to clipboard.",
      shareOpened: "Share sheet opened for this link.",
      copyFailed: "Could not copy the link on this device. Select the URL and copy it manually.",
      shareFailed: "Could not share the link right now. Copy the link instead.",
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
      openExplorer: "Ver comprovante no explorer da Celo",
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
        "O PayLink mostra quem recebe, valor, token e caminho de verificação antes da transferência na Celo.",
      proofChips: [
        "Os fundos vão direto para a carteira de quem recebe",
        "Valor, token e referência ficam no link",
        "Todo pagamento inclui prova no PayLink e no explorer",
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
          title: "Guarde o comprovante",
          description:
            "Quem paga recebe um link de comprovante após a confirmação, e os pagamentos recentes aparecem por eventos onchain."
        }
      ],
      trustStatements: [
        "Liquida na sua carteira",
        "Sem custódia do PayLink",
        "Prova no PayLink e explorer"
      ],
      closingEyebrow: "Pronto para receber",
      closingTitle: "Publique seu PayLink antes da próxima cobrança.",
      closingDescription:
        "Abra o painel, crie seu perfil e compartilhe o link do seu perfil público onde você recebe pagamentos.",
      summaryTitle: "Seu PayLink está no ar.",
      summaryDescription:
        "Compartilhe seu perfil público, crie links de cobrança preenchidos e acompanhe pagamentos recebidos em um painel.",
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
        "Gerencie dados do perfil, links de cobrança preenchidos e pagamentos recebidos.",
      actionsTab: "Perfil e links",
      manageTab: "Perfil",
      transactionsTab: "Pagamentos",
      quickActions: "Ações rápidas",
      quickActionChargeDescription:
        "Crie um link de cobrança preenchido com valor, token e referência.",
      quickActionTransactionsDescription:
        "Revise os pagamentos recebidos e abra os comprovantes do PayLink.",
      profileShareHint:
        "Compartilhe este perfil público onde seus clientes já falam com você.",
      chargeLinkHint:
        "Crie uma cobrança preenchida com valor, token e referência.",
      profileSection: "Perfil",
      chargeSection: "Link de cobrança",
      transactionsSection: "Pagamentos recebidos",
      emptyTransactions:
        "Os pagamentos recebidos e comprovantes do PayLink aparecerão aqui depois que alguém pagar pelo seu perfil público ou link de cobrança.",
      connectPrompt:
        "Abra no MiniPay ou conecte uma carteira do navegador para criar e gerenciar seu perfil público."
    },
    profileDiscovery: {
      eyebrow: "Perfis publicados",
      title: "Criadores e comerciantes usando o PayLink.",
      description:
        "Veja perfis públicos publicados recentemente pelo contrato do PayLink.",
      searchTab: "Buscar",
      searchTitle: "Buscar perfil",
      searchDescription:
        "Digite o handle exato para abrir o perfil público.",
      searchPlaceholder: "criador_handle",
      latestTitle: "Perfis recentes",
      latestDescription:
        "Perfis mais novos publicados por eventos do contrato PayLink.",
      loading: "Carregando perfis...",
      empty: "Perfis publicados aparecerão aqui depois que forem criados onchain.",
      unavailable:
        "A descoberta de perfis aparecerá quando o endereço do contrato do PayLink estiver configurado.",
      tooShort: "Digite pelo menos 3 caracteres de um handle para buscar.",
      notFound: "Nenhum perfil publicado corresponde a esse handle.",
      error: "Não foi possível carregar os perfis agora. Tente novamente em instantes.",
      exactHint: "Cole o handle completo; o PayLink remove @ e espaços. Handles precisam de 3 a 32 letras, números, hífens ou sublinhados.",
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
        "Este link de cobrança inclui os dados do pagamento. Revise tudo e conclua a transferência na Celo.",
      paymentFormTitle: "Dados do pagamento",
      paymentFormDescription:
        "Escolha valor, token e referência opcional. Se solicitado, aprove o token primeiro e depois confirme o pagamento.",
      paymentFormLoading: "Carregando dados do pagamento",
      requestSummaryLabel: "Resumo da cobrança",
      missingTitle: "Este PayLink ainda não foi publicado.",
      missingDescription:
        "Esse handle ainda não foi publicado. Confira o link ou crie seu perfil para começar a receber pagamentos diretos.",
      noContractTitle: "Contrato não configurado",
      noContractDescription:
        "Defina o endereço do contrato do PayLink no ambiente para carregar perfis públicos.",
      recentPayments: "Pagamentos recentes",
      createYours: "Criar seu perfil"
    },
    success: {
      eyebrow: "Pagamento enviado",
      title: "Pagamento enviado.",
      description:
        "Sua transferência foi enviada na Celo. Salve o comprovante do PayLink como confirmação e volte ao perfil para ver os pagamentos recentes.",
      receiptDetails: "Dados do comprovante do PayLink"
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
      notConnected: "Não conectado",
      copied: "Copiado",
      shared: "Compartilhado",
      checking: "Verificando...",
      transaction: "Transação",
      owner: "Seu perfil",
      visitor: "Perfil público"
    },
    messages: {
      contractReady: "As alterações do perfil são gravadas direto no contrato do PayLink.",
      missingContract: "Defina o endereço do contrato do PayLink no .env antes de usar o app.",
      noWalletFound:
        "Nenhuma carteira foi encontrada. Abra o PayLink no MiniPay ou use um navegador com carteira integrada.",
      couldNotConnectWallet: "Não foi possível conectar à carteira. Confira a solicitação na carteira e tente novamente.",
      switchWalletRequired: "Troque sua carteira para {network} para continuar.",
      miniPayWrongNetwork:
        "O MiniPay está na rede errada. Abra as configurações do MiniPay e troque para {network}.",
      couldNotSwitchNetwork: "Não foi possível trocar para {network}.",
      unsupportedNetwork: "Rede não suportada ({chainId}).",
      waitingConfirmation: "Aguardando confirmação...",
      profilePublished: "Perfil publicado. Link público pronto.",
      paymentComplete: "Pagamento concluído.",
      connectBeforeSave: "Conecte sua carteira antes de publicar este perfil.",
      connectBeforePay: "Conecte uma carteira para enviar este pagamento.",
      fillAllFields: "Preencha handle, nome exibido, bio e token antes de publicar.",
      invalidImage:
        "A URL do avatar deve ficar vazia ou começar com https://.",
      missingAmount: "Informe um valor de pagamento para continuar.",
      positiveAmount: "Informe um valor maior que zero.",
      handleAvailable: "Handle disponível.",
      handleTaken: "Esse handle já está em uso. Tente outro.",
      handleInvalid: "O handle deve ter entre 3 e 32 caracteres.",
      handleLocked: "O handle não pode ser alterado depois da publicação.",
      handleChecking: "Verificando disponibilidade do handle...",
      handleDefault: "Use letras minúsculas, números, hífen ou sublinhado.",
      noProfile:
        "Conecte uma carteira e publique seu perfil para começar a receber.",
      profileLoading: "Carregando seu perfil...",
      finishingProfile: "Publicando seu perfil...",
      confirmProfileInWallet:
        "Confirme a transação do perfil na sua carteira e aguarde a inclusão na Celo.",
      syncingProfile:
        "Atualizando seu painel com os dados onchain mais recentes do perfil.",
      wrongNetworkDescription:
        "Troque sua carteira para a rede correta antes de usar o PayLink.",
      wrongNetworkMiniPayDescription:
        'O MiniPay está na rede errada para este app. Se você estiver testando, desative "Use Testnet" nas configurações do MiniPay, volte e tente de novo.',
      insufficientBalance: "Saldo insuficiente em {token} para enviar este pagamento.",
      approving: "Aprovando",
      confirmingApproval: "Confirmando a aprovação do token na Celo...",
      sending: "Enviando",
      openingReceipt: "Abrindo o link do comprovante...",
      linkCopied: "Link copiado para a área de transferência.",
      shareOpened: "Janela de compartilhamento aberta para este link.",
      copyFailed: "Não foi possível copiar o link neste dispositivo. Selecione a URL e copie manualmente.",
      shareFailed: "Não foi possível compartilhar o link agora. Copie o link em vez disso.",
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
