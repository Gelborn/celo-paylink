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
    productTagline: "One profile. One link. Direct Celo payments.",
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      publicPage: "Public page"
    },
    actions: {
      createProfile: "Create profile",
      editProfile: "Edit",
      cancel: "Cancel",
      openDashboard: "Open dashboard",
      connectWallet: "Connect wallet",
      switchNetwork: "Switch network",
      refreshNetwork: "I switched networks",
      disconnectWallet: "Disconnect",
      saveProfile: "Publish profile",
      updateProfile: "Save changes",
      copyLink: "Copy link",
      copyProfile: "Copy profile link",
      copyChargeLink: "Copy request link",
      shareLink: "Share link",
      shareProfile: "Share profile",
      createChargeLink: "Create request link",
      openExplorer: "Open explorer",
      openPublicPage: "Open public page",
      payNow: "Pay now",
      payCreator: "Send a payment",
      shareCreatorLink: "Share this profile",
      viewProfile: "View profile",
      createYourOwn: "Create your own",
      backToProfile: "Back to profile",
      useDashboard: "Use dashboard",
      viewTransactions: "View transactions"
    },
    home: {
      eyebrow: "MiniPay payment profiles",
      title: "One trusted link for Celo payments.",
      description:
        "Create a public profile, choose the token you want to receive, and share a clean link with clients, supporters, and customers.",
      heroSupport:
        "Payments go straight to your wallet. PayLink never takes custody.",
      heroChips: [
        "Direct wallet payments",
        "Reusable request links",
        "Built for MiniPay"
      ],
      demoCaption:
        "Live flow: public page, wallet confirmation, and receipt.",
      proofEyebrow: "Trust by default",
      proofTitle: "Clear details before every payment.",
      proofDescription:
        "PayLink shows who is receiving, what is being paid, and where to verify the transfer.",
      proofChips: [
        "Funds move directly to the recipient",
        "Amount, token, and reference stay in the link",
        "Receipts link to the explorer",
        "Works with USDm, USDC, and USD₮"
      ],
      stepsEyebrow: "How it works",
      stepsTitle: "Set up once. Share whenever you need to get paid.",
      stepsDescription:
        "Create your profile once, then use the same page or a prefilled request link.",
      steps: [
        {
          title: "Publish your profile",
          description:
            "Claim a handle, add your profile details, and choose a receiving token."
        },
        {
          title: "Share the right link",
          description:
            "Send your public page for open payments or prefill amount, token, and reference for requests."
        },
        {
          title: "Keep a receipt",
          description:
            "Payers get a success screen with the explorer link, and recent payments appear from onchain events."
        }
      ],
      trustStatements: [
        "Direct to your wallet",
        "No PayLink custody",
        "Explorer receipt included"
      ],
      closingEyebrow: "Ready when you are",
      closingTitle: "Publish your PayLink before the next payment request.",
      closingDescription:
        "Open the dashboard, create your profile, and share one link anywhere you receive payments.",
      summaryTitle: "Your PayLink is live.",
      summaryDescription:
        "Share your page, create request links, and review incoming payments from one dashboard.",
      connectHint:
        "Open PayLink in MiniPay or connect a wallet to publish your profile."
    },
    dashboard: {
      eyebrow: "Dashboard",
      titleNoProfile: "Publish your payment profile",
      titleWithProfile: "Manage your PayLink",
      descriptionNoProfile:
        "Claim a handle, add profile details, and publish the page people will use to pay you.",
      descriptionWithProfile:
        "Update your public profile, create request links, and review incoming payments.",
      actionsTab: "Profile and links",
      manageTab: "Profile",
      transactionsTab: "Payments",
      quickActions: "Quick actions",
      quickActionChargeDescription:
        "Prefill amount, token, and reference before sharing a payment request.",
      quickActionTransactionsDescription:
        "Review incoming payments and their explorer receipts.",
      profileShareHint:
        "Share this public profile anywhere you receive payments.",
      chargeLinkHint:
        "Prefill amount, token, and reference for a payment request.",
      profileSection: "Profile",
      chargeSection: "Request link",
      transactionsSection: "Incoming payments",
      emptyTransactions:
        "Incoming payments will appear here after someone pays through your PayLink.",
      connectPrompt:
        "Connect a wallet to create and manage your public payment profile."
    },
    profileDiscovery: {
      eyebrow: "Published profiles",
      title: "Creators receiving with PayLink.",
      description:
        "Browse recently published profiles from the PayLink contract.",
      searchTab: "Search",
      searchTitle: "Find a profile",
      searchDescription:
        "Enter an exact handle to open a public payment page.",
      searchPlaceholder: "creator_handle",
      latestTitle: "Recent profiles",
      latestDescription:
        "Newest profiles from onchain profile events.",
      loading: "Loading profiles...",
      empty: "No published profiles found yet.",
      unavailable:
        "Profile discovery appears after the contract is configured.",
      notFound: "No published profile matches that handle.",
      error: "Profiles could not load right now.",
      exactHint: "Use the full handle without @.",
      openProfile: "Open profile"
    },
    publicPage: {
      ownerTitle: "This is your public PayLink.",
      ownerDescription:
        "Share it as-is or use the dashboard to update your profile and create request links.",
      visitorTitle: "Send a direct payment",
      visitorDescription:
        "Review the profile, choose an amount and token, then confirm in your wallet.",
      invoiceEyebrow: "Payment request",
      invoiceDescription:
        "This link includes payment details. Review the request, then complete the transfer on Celo.",
      paymentFormTitle: "Payment details",
      paymentFormDescription:
        "Choose an amount and token, then confirm the transfer in your wallet.",
      requestSummaryLabel: "Request summary",
      missingTitle: "This PayLink is not published yet.",
      missingDescription:
        "That handle has not been published. Create your own profile to start receiving payments.",
      noContractTitle: "Contract not configured",
      noContractDescription:
        "Set a PayLink contract address in the environment before opening public profile routes.",
      recentPayments: "Recent payments",
      createYours: "Create your profile"
    },
    success: {
      eyebrow: "Payment sent",
      title: "Payment sent.",
      description:
        "Your transfer was submitted on Celo. Use the explorer receipt as proof, then return to the profile for the latest activity."
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
      visitor: "Public view"
    },
    messages: {
      contractReady: "Profile updates are written directly to the deployed PayLink contract.",
      missingContract: "Set a PayLink contract address in .env before using the app.",
      noWalletFound:
        "No wallet found. Open PayLink in MiniPay or use a browser with an injected wallet.",
      couldNotConnectWallet: "Could not connect to the wallet.",
      switchWalletRequired: "Switch your wallet to {network} to continue.",
      miniPayWrongNetwork:
        "MiniPay is on the wrong network. Open MiniPay settings and switch to {network}.",
      couldNotSwitchNetwork: "Could not switch to {network}.",
      unsupportedNetwork: "Unsupported network ({chainId}).",
      waitingConfirmation: "Waiting for confirmation...",
      profilePublished: "Profile published.",
      paymentComplete: "Payment complete.",
      connectBeforeSave: "Connect your wallet before saving this profile.",
      connectBeforePay: "Connect a wallet to send this payment.",
      fillAllFields: "Complete the required fields before publishing.",
      invalidImage:
        "Avatar URL must be blank or start with https://.",
      missingAmount: "Enter an amount to continue.",
      positiveAmount: "Enter an amount greater than zero.",
      handleAvailable: "Handle is available.",
      handleTaken: "That handle is already taken.",
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
      insufficientBalance: "Insufficient {token} balance for this payment.",
      approving: "Approving",
      confirmingApproval: "Confirming token approval onchain...",
      sending: "Sending",
      openingReceipt: "Opening your receipt...",
      linkCopied: "Link copied to clipboard.",
      shareOpened: "Share sheet opened.",
      copyFailed: "Could not copy the link on this device.",
      shareFailed: "Could not share the link right now.",
      loadingPayments: "Loading the latest payments...",
      supportsTokens: "Accepts {tokens}."
    }
  },
  "pt-BR": {
    languageName: "Português",
    productName: "MiniPay PayLink",
    productTagline: "Um perfil. Um link. Pagamentos diretos na Celo.",
    nav: {
      home: "Início",
      dashboard: "Painel",
      publicPage: "Página pública"
    },
    actions: {
      createProfile: "Criar perfil",
      editProfile: "Editar",
      cancel: "Cancelar",
      openDashboard: "Abrir painel",
      connectWallet: "Conectar carteira",
      switchNetwork: "Trocar rede",
      refreshNetwork: "Já troquei de rede",
      disconnectWallet: "Desconectar",
      saveProfile: "Publicar perfil",
      updateProfile: "Salvar alterações",
      copyLink: "Copiar link",
      copyProfile: "Copiar link do perfil",
      copyChargeLink: "Copiar link de cobrança",
      shareLink: "Compartilhar link",
      shareProfile: "Compartilhar perfil",
      createChargeLink: "Criar link de cobrança",
      openExplorer: "Ver no explorer",
      openPublicPage: "Ver página pública",
      payNow: "Pagar agora",
      payCreator: "Enviar pagamento",
      shareCreatorLink: "Compartilhar este perfil",
      viewProfile: "Ver perfil",
      createYourOwn: "Criar o seu",
      backToProfile: "Voltar ao perfil",
      useDashboard: "Usar painel",
      viewTransactions: "Ver transações"
    },
    home: {
      eyebrow: "Perfil de pagamento MiniPay",
      title: "Um link confiável para receber na Celo.",
      description:
        "Crie um perfil público, escolha o token que quer receber e compartilhe um link simples com clientes, apoiadores e compradores.",
      heroSupport:
        "O pagamento cai direto na sua carteira. O PayLink nunca fica com os fundos.",
      heroChips: [
        "Pagamentos diretos na carteira",
        "Links de cobrança reutilizáveis",
        "Feito para MiniPay"
      ],
      demoCaption:
        "Fluxo real: página pública, confirmação na carteira e comprovante.",
      proofEyebrow: "Confiança desde o início",
      proofTitle: "Tudo claro antes de pagar.",
      proofDescription:
        "O PayLink mostra quem recebe, o que será pago e onde verificar a transferência.",
      proofChips: [
        "Os fundos vão direto para quem recebe",
        "Valor, token e referência ficam no link",
        "Comprovantes abrem no explorer",
        "Funciona com USDm, USDC e USD₮"
      ],
      stepsEyebrow: "Como funciona",
      stepsTitle: "Configure uma vez. Compartilhe sempre que precisar receber.",
      stepsDescription:
        "Crie o perfil uma vez e use a mesma página ou um link de cobrança preenchido.",
      steps: [
        {
          title: "Publique seu perfil",
          description:
            "Escolha um handle, adicione os dados do perfil e defina o token de recebimento."
        },
        {
          title: "Compartilhe o link certo",
          description:
            "Envie a página pública para pagamentos livres ou preencha valor, token e referência para cobranças."
        },
        {
          title: "Guarde o comprovante",
          description:
            "Quem paga vê uma tela de sucesso com link do explorer, e os pagamentos recentes aparecem por eventos onchain."
        }
      ],
      trustStatements: [
        "Direto para sua carteira",
        "Sem custódia do PayLink",
        "Comprovante no explorer"
      ],
      closingEyebrow: "Pronto para receber",
      closingTitle: "Publique seu PayLink antes da próxima cobrança.",
      closingDescription:
        "Abra o painel, crie seu perfil e compartilhe um link em qualquer lugar onde você recebe.",
      summaryTitle: "Seu PayLink está no ar.",
      summaryDescription:
        "Compartilhe sua página, crie links de cobrança e acompanhe pagamentos recebidos em um painel.",
      connectHint:
        "Abra o PayLink no MiniPay ou conecte uma carteira para publicar seu perfil."
    },
    dashboard: {
      eyebrow: "Painel",
      titleNoProfile: "Publique seu perfil de pagamentos",
      titleWithProfile: "Gerencie seu PayLink",
      descriptionNoProfile:
        "Escolha um handle, adicione os dados do perfil e publique a página que as pessoas vão usar para pagar você.",
      descriptionWithProfile:
        "Atualize seu perfil público, crie links de cobrança e acompanhe pagamentos recebidos.",
      actionsTab: "Perfil e links",
      manageTab: "Perfil",
      transactionsTab: "Pagamentos",
      quickActions: "Ações rápidas",
      quickActionChargeDescription:
        "Preencha valor, token e referência antes de compartilhar a próxima cobrança.",
      quickActionTransactionsDescription:
        "Revise os pagamentos recebidos e seus comprovantes no explorer.",
      profileShareHint:
        "Compartilhe este perfil público onde você recebe pagamentos.",
      chargeLinkHint:
        "Preencha valor, token e referência para uma cobrança.",
      profileSection: "Perfil",
      chargeSection: "Link de cobrança",
      transactionsSection: "Pagamentos recebidos",
      emptyTransactions:
        "Os pagamentos recebidos aparecerão aqui depois que alguém pagar pelo seu PayLink.",
      connectPrompt:
        "Conecte sua carteira para criar e gerenciar seu perfil de pagamentos."
    },
    profileDiscovery: {
      eyebrow: "Perfis publicados",
      title: "Criadores recebendo pelo PayLink.",
      description:
        "Veja perfis publicados recentemente pelo contrato do PayLink.",
      searchTab: "Buscar",
      searchTitle: "Buscar perfil",
      searchDescription:
        "Digite o handle exato para abrir uma página pública de pagamento.",
      searchPlaceholder: "criador_handle",
      latestTitle: "Perfis recentes",
      latestDescription:
        "Perfis mais novos vindos dos eventos onchain.",
      loading: "Carregando perfis...",
      empty: "Nenhum perfil publicado encontrado ainda.",
      unavailable:
        "A descoberta de perfis aparece depois que o contrato for configurado.",
      notFound: "Nenhum perfil publicado corresponde a esse handle.",
      error: "Não foi possível carregar os perfis agora.",
      exactHint: "Use o handle completo sem @.",
      openProfile: "Abrir perfil"
    },
    publicPage: {
      ownerTitle: "Este é o seu PayLink público.",
      ownerDescription:
        "Compartilhe como está ou use o painel para atualizar o perfil e criar links de cobrança.",
      visitorTitle: "Enviar pagamento direto",
      visitorDescription:
        "Confira o perfil, escolha valor e token e confirme na sua carteira.",
      invoiceEyebrow: "Cobrança",
      invoiceDescription:
        "Este link inclui os dados do pagamento. Revise a cobrança e conclua a transferência na Celo.",
      paymentFormTitle: "Dados do pagamento",
      paymentFormDescription:
        "Escolha valor e token e confirme a transferência na sua carteira.",
      requestSummaryLabel: "Resumo da cobrança",
      missingTitle: "Este PayLink ainda não foi publicado.",
      missingDescription:
        "Esse handle ainda não foi publicado. Crie seu perfil para começar a receber pagamentos.",
      noContractTitle: "Contrato não configurado",
      noContractDescription:
        "Defina o endereço do contrato do PayLink no ambiente antes de abrir páginas públicas.",
      recentPayments: "Pagamentos recentes",
      createYours: "Criar seu perfil"
    },
    success: {
      eyebrow: "Pagamento enviado",
      title: "Pagamento enviado.",
      description:
        "Sua transferência foi enviada na Celo. Use o comprovante no explorer e volte ao perfil para ver a atividade mais recente."
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
      visitor: "Página pública"
    },
    messages: {
      contractReady: "As alterações do perfil são gravadas direto no contrato do PayLink.",
      missingContract: "Defina o endereço do contrato do PayLink no .env antes de usar o app.",
      noWalletFound:
        "Nenhuma carteira foi encontrada. Abra o PayLink no MiniPay ou use um navegador com carteira integrada.",
      couldNotConnectWallet: "Não foi possível conectar à carteira.",
      switchWalletRequired: "Troque sua carteira para {network} para continuar.",
      miniPayWrongNetwork:
        "O MiniPay está na rede errada. Abra as configurações do MiniPay e troque para {network}.",
      couldNotSwitchNetwork: "Não foi possível trocar para {network}.",
      unsupportedNetwork: "Rede não suportada ({chainId}).",
      waitingConfirmation: "Aguardando confirmação...",
      profilePublished: "Perfil publicado.",
      paymentComplete: "Pagamento concluído.",
      connectBeforeSave: "Conecte sua carteira antes de salvar este perfil.",
      connectBeforePay: "Conecte uma carteira para enviar este pagamento.",
      fillAllFields: "Preencha os campos obrigatórios antes de publicar.",
      invalidImage:
        "A URL do avatar deve ficar vazia ou começar com https://.",
      missingAmount: "Informe um valor para continuar.",
      positiveAmount: "Informe um valor maior que zero.",
      handleAvailable: "Handle disponível.",
      handleTaken: "Esse handle já está em uso.",
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
      insufficientBalance: "Saldo insuficiente em {token} para este pagamento.",
      approving: "Aprovando",
      confirmingApproval: "Confirmando a aprovação do token na rede...",
      sending: "Enviando",
      openingReceipt: "Abrindo seu comprovante...",
      linkCopied: "Link copiado para a área de transferência.",
      shareOpened: "Janela de compartilhamento aberta.",
      copyFailed: "Não foi possível copiar o link neste dispositivo.",
      shareFailed: "Não foi possível compartilhar o link agora.",
      loadingPayments: "Carregando os pagamentos mais recentes...",
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
