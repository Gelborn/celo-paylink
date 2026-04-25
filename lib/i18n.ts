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
    productTagline: "One profile. One link. Direct payments on Celo.",
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
      connectWallet: "Connect",
      switchNetwork: "Switch network",
      refreshNetwork: "I switched already",
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
      createYourOwn: "Create yours",
      backToProfile: "Back to profile",
      useDashboard: "Use dashboard",
      viewTransactions: "View transactions"
    },
    home: {
      eyebrow: "MiniPay payment profile",
      title: "One link for payments, tips, and requests.",
      description:
        "Create a public payment profile, choose the token you want to receive, and share one clean link with clients, supporters, and customers.",
      heroSupport:
        "No custody. Just your profile, your wallet, and a faster way to get paid on Celo.",
      heroChips: [
        "Direct payments",
        "Reusable request links",
        "Built for MiniPay"
      ],
      demoCaption:
        "Real flow: public payment page, send screen, and receipt.",
      proofEyebrow: "Why it works",
      proofTitle: "Clear enough to trust at a glance.",
      proofDescription:
        "PayLink keeps the promise simple: one public page, direct transfer, and a visible receipt.",
      proofChips: [
        "Funds go straight to the recipient",
        "Amount and reference in one link",
        "Recent payments from onchain events",
        "Works with USDm, USDC, and USD₮"
      ],
      stepsEyebrow: "How it works",
      stepsTitle: "Set it once. Reuse it every time.",
      stepsDescription:
        "Create the profile once, then reuse the same link wherever people pay you.",
      steps: [
        {
          title: "Create your profile",
          description:
            "Claim your handle, add your image and message, and choose your receiving token."
        },
        {
          title: "Share your link",
          description:
            "Use your public page or prefill amount and reference for tips, deposits, and requests."
        },
        {
          title: "Keep the receipt",
          description:
            "The payer gets a success screen, and the explorer link stays available as proof."
        }
      ],
      trustStatements: [
        "Direct wallet transfer",
        "No platform custody",
        "Explorer receipt included"
      ],
      closingEyebrow: "Start now",
      closingTitle: "Publish your PayLink and make the next payment obvious.",
      closingDescription:
        "Open the dashboard, create your profile, and share the same link anywhere you want to receive.",
      summaryTitle: "Your payment profile is live.",
      summaryDescription:
        "Use your public page, create charge links, and track incoming payments in one place.",
      connectHint:
        "Open PayLink inside MiniPay or connect a wallet to create your profile."
    },
    dashboard: {
      eyebrow: "Dashboard",
      titleNoProfile: "Create your payment profile",
      titleWithProfile: "Manage your payment profile",
      descriptionNoProfile:
        "Claim your handle, add a profile image, and publish the payment page you want people to open.",
      descriptionWithProfile:
        "Edit your public profile, generate charge links, and review incoming payments.",
      actionsTab: "Profile and links",
      manageTab: "Manage",
      transactionsTab: "Payments",
      quickActions: "Quick actions",
      quickActionChargeDescription:
        "Set amount and reference before sharing your next payment request.",
      quickActionTransactionsDescription:
        "Review incoming payments and their explorer receipts.",
      profileShareHint:
        "Share this profile anywhere you want to receive payments.",
      chargeLinkHint:
        "Create a payment request with amount, token, and reference already filled in.",
      profileSection: "Profile",
      chargeSection: "Request link",
      transactionsSection: "Incoming payments",
      emptyTransactions:
        "Payments will appear here after someone pays through your public page.",
      connectPrompt:
        "Connect a wallet to create and manage your public payment profile."
    },
    profileDiscovery: {
      eyebrow: "Live profiles",
      title: "People already receiving with PayLink.",
      description:
        "Browse recently published profiles discovered from the PayLink contract.",
      searchTab: "Search",
      searchTitle: "Find a profile",
      searchDescription:
        "Search by exact handle and open the public payment page.",
      searchPlaceholder: "creator_handle",
      latestTitle: "Recent profiles",
      latestDescription:
        "Newest profiles discovered from onchain profile events.",
      loading: "Loading profiles...",
      empty: "No other profiles found yet.",
      unavailable:
        "Profile discovery is unavailable until the contract is configured.",
      notFound: "No published profile found for that handle.",
      error: "Could not load profiles right now.",
      exactHint: "Enter the full handle without @.",
      openProfile: "Open profile"
    },
    publicPage: {
      ownerTitle: "This is your public payment page.",
      ownerDescription:
        "Share it directly or go back to the dashboard to edit your profile and build charge links.",
      visitorTitle: "Send payment",
      visitorDescription:
        "Choose the amount, confirm the token, and send from your wallet.",
      invoiceEyebrow: "Payment request",
      invoiceDescription:
        "This link includes payment details. Review the request and complete the transfer on Celo.",
      paymentFormTitle: "Payment",
      paymentFormDescription:
        "Choose the amount, confirm the token, and send from your wallet.",
      requestSummaryLabel: "Request summary",
      missingTitle: "This profile does not exist yet.",
      missingDescription:
        "The handle has not been published yet. Create your own profile to start sharing payments.",
      noContractTitle: "Contract not configured",
      noContractDescription:
        "Set the contract address in your environment before opening public profile routes.",
      recentPayments: "Recent payments",
      createYours: "Create your own profile"
    },
    success: {
      eyebrow: "Payment sent",
      title: "Your payment was sent.",
      description:
        "The transaction was sent. Use the explorer receipt as proof, then return to the profile to see the latest activity."
    },
    fields: {
      handle: "Handle",
      displayName: "Display name",
      avatarUrl: "Avatar URL",
      bio: "Bio",
      paymentMessage: "Payment message",
      preferredToken: "Preferred token",
      amount: "Amount",
      note: "Note",
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
      paymentMessage: "Thanks for paying with PayLink.",
      note: "Landing page deposit",
      amount: "15.00"
    },
    labels: {
      language: "Language",
      connectedWallet: "Connected wallet",
      network: "Network",
      profileLive: "Profile live",
      preferredToken: "Preferred token",
      payingFrom: "Paying from",
      notConnected: "Not connected",
      copied: "Copied",
      shared: "Shared",
      checking: "Checking...",
      transaction: "Transaction",
      owner: "Owner view",
      visitor: "Visitor view"
    },
    messages: {
      contractReady: "Profile updates write directly to the deployed PayLink contract.",
      missingContract: "Set a contract address in .env before using the app.",
      noWalletFound:
        "No wallet found. Open the app in MiniPay or use a browser with an injected wallet.",
      couldNotConnectWallet: "Could not connect the wallet.",
      switchWalletRequired: "Switch your wallet to {network} to continue.",
      miniPayWrongNetwork:
        "MiniPay is on the wrong network. Open MiniPay settings and switch to {network}.",
      couldNotSwitchNetwork: "Could not switch to {network}.",
      unsupportedNetwork: "Unsupported network ({chainId})",
      waitingConfirmation: "Waiting for confirmation...",
      profilePublished: "Profile published.",
      paymentComplete: "Payment complete.",
      connectBeforeSave: "Connect your wallet before saving your profile.",
      connectBeforePay: "Connect a wallet to complete the payment.",
      fillAllFields: "Fill out all fields before publishing the profile.",
      invalidImage:
        "Avatar URL must be empty or use https://.",
      missingAmount: "Enter an amount before continuing.",
      positiveAmount: "Use a positive amount.",
      handleAvailable: "Handle available.",
      handleTaken: "Handle already taken.",
      handleInvalid: "Handle must be 3-32 characters.",
      handleLocked: "Handles are immutable after the first publish.",
      handleChecking: "Checking handle availability...",
      handleDefault: "Use lowercase letters, numbers, - or _.",
      noProfile:
        "Connect a wallet and create your profile to start receiving payments.",
      profileLoading: "Loading your profile...",
      finishingProfile: "Publishing your profile...",
      confirmProfileInWallet:
        "Review the profile transaction in your wallet, then wait for confirmation.",
      syncingProfile:
        "Updating your dashboard with the latest profile data.",
      wrongNetworkDescription:
        "Switch your wallet to the required network before creating or editing your PayLink profile.",
      wrongNetworkMiniPayDescription:
        'MiniPay is on the wrong network for this app. If you are testing, disable "Use Testnet" in MiniPay settings, then come back and try again.',
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
      connectWallet: "Conectar",
      switchNetwork: "Trocar rede",
      refreshNetwork: "Já troquei",
      disconnectWallet: "Desconectar",
      saveProfile: "Publicar perfil",
      updateProfile: "Salvar alterações",
      copyLink: "Copiar link",
      copyProfile: "Copiar perfil",
      copyChargeLink: "Copiar cobrança",
      shareLink: "Compartilhar link",
      shareProfile: "Compartilhar perfil",
      createChargeLink: "Criar link de cobrança",
      openExplorer: "Ver no explorer",
      openPublicPage: "Ver página pública",
      payNow: "Pagar agora",
      payCreator: "Enviar pagamento",
      shareCreatorLink: "Compartilhar este perfil",
      viewProfile: "Ver perfil",
      createYourOwn: "Criar perfil",
      backToProfile: "Voltar ao perfil",
      useDashboard: "Usar painel",
      viewTransactions: "Ver transações"
    },
    home: {
      eyebrow: "Perfil de pagamento MiniPay",
      title: "Um link para receber pagamentos, gorjetas e cobranças.",
      description:
        "Crie um perfil de pagamento, escolha o token que você quer receber e compartilhe um link simples com clientes, apoiadores e compradores.",
      heroSupport:
        "Sem custódia. Só seu perfil, sua carteira e um jeito mais rápido de receber na Celo.",
      heroChips: [
        "Pagamentos diretos",
        "Links de cobrança reutilizáveis",
        "Feito para MiniPay"
      ],
      demoCaption:
        "Fluxo real: página de pagamento, envio e comprovante.",
      proofEyebrow: "Por que funciona",
      proofTitle: "Claro o bastante para gerar confiança na primeira olhada.",
      proofDescription:
        "O PayLink mantém a proposta simples: uma página pública, transferência direta e comprovante visível.",
      proofChips: [
        "Os fundos vão direto para o destinatário",
        "Valor e referência já preenchidos no mesmo link",
        "Pagamentos recentes vindos da rede",
        "Funciona com USDm, USDC e USD₮"
      ],
      stepsEyebrow: "Como funciona",
      stepsTitle: "Configure uma vez. Reaproveite sempre.",
      stepsDescription:
        "Crie o perfil uma vez e reutilize o mesmo link onde as pessoas pagam você.",
      steps: [
        {
          title: "Crie seu perfil",
          description:
            "Escolha seu handle, adicione sua imagem e mensagem e defina o token de recebimento."
        },
        {
          title: "Compartilhe o link",
          description:
            "Use sua página pública ou envie valor e referência preenchidos para gorjetas, sinais e cobranças."
        },
        {
          title: "Guarde o comprovante",
          description:
            "Quem paga vê a tela de sucesso, e o link do explorer fica disponível como comprovante."
        }
      ],
      trustStatements: [
        "Transferência direta",
        "Sem custódia da plataforma",
        "Comprovante no explorer"
      ],
      closingEyebrow: "Comece agora",
      closingTitle: "Publique seu PayLink e deixe o próximo pagamento óbvio.",
      closingDescription:
        "Abra o painel, crie seu perfil e compartilhe o mesmo link onde você quer receber.",
      summaryTitle: "Seu perfil de pagamentos está no ar.",
      summaryDescription:
        "Use sua página pública, gere links de cobrança e acompanhe os pagamentos em um só lugar.",
      connectHint:
        "Abra o PayLink no MiniPay ou conecte sua carteira para criar seu perfil."
    },
    dashboard: {
      eyebrow: "Painel",
      titleNoProfile: "Crie seu perfil de pagamentos",
      titleWithProfile: "Gerencie seu perfil de pagamento",
      descriptionNoProfile:
        "Escolha seu handle, adicione sua imagem e publique a página que as pessoas vão usar para pagar você.",
      descriptionWithProfile:
        "Edite seu perfil público, gere links de cobrança e acompanhe os pagamentos recebidos.",
      actionsTab: "Perfil e links",
      manageTab: "Gerir",
      transactionsTab: "Pagamentos",
      quickActions: "Ações rápidas",
      quickActionChargeDescription:
        "Defina valor e referência antes de compartilhar sua próxima cobrança.",
      quickActionTransactionsDescription:
        "Revise os pagamentos recebidos e seus comprovantes no explorer.",
      profileShareHint:
        "Compartilhe este perfil onde você quer receber pagamentos.",
      chargeLinkHint:
        "Crie uma cobrança com valor, token e referência já preenchidos.",
      profileSection: "Perfil",
      chargeSection: "Link de cobrança",
      transactionsSection: "Pagamentos recebidos",
      emptyTransactions:
        "Os pagamentos aparecerão aqui depois que alguém pagar pela sua página pública.",
      connectPrompt:
        "Conecte sua carteira para criar e gerenciar seu perfil de pagamentos."
    },
    profileDiscovery: {
      eyebrow: "Perfis ao vivo",
      title: "Pessoas já recebendo pelo PayLink.",
      description:
        "Veja perfis publicados recentemente e descobertos pelo contrato do PayLink.",
      searchTab: "Buscar",
      searchTitle: "Buscar perfil",
      searchDescription:
        "Busque pelo handle exato e abra a página pública de pagamento.",
      searchPlaceholder: "criador_handle",
      latestTitle: "Perfis recentes",
      latestDescription:
        "Perfis mais novos descobertos pelos eventos publicados na rede.",
      loading: "Carregando perfis...",
      empty: "Nenhum outro perfil encontrado ainda.",
      unavailable:
        "A descoberta de perfis fica indisponível até o contrato ser configurado.",
      notFound: "Nenhum perfil publicado encontrado para esse handle.",
      error: "Não foi possível carregar os perfis agora.",
      exactHint: "Digite o handle completo sem @.",
      openProfile: "Abrir perfil"
    },
    publicPage: {
      ownerTitle: "Esta é a sua página pública.",
      ownerDescription:
        "Compartilhe sua página ou volte ao painel para editar seu perfil e gerar links de cobrança.",
      visitorTitle: "Enviar pagamento",
      visitorDescription:
        "Escolha o valor, confira o token e envie pela sua carteira.",
      invoiceEyebrow: "Cobrança",
      invoiceDescription:
        "Este link inclui os dados do pagamento. Revise a cobrança e conclua a transferência na Celo.",
      paymentFormTitle: "Pagamento",
      paymentFormDescription:
        "Escolha o valor, confira o token e envie pela sua carteira.",
      requestSummaryLabel: "Resumo da cobrança",
      missingTitle: "Esse perfil ainda não existe.",
      missingDescription:
        "Esse handle ainda não foi publicado. Crie seu perfil para começar a receber.",
      noContractTitle: "Contrato não configurado",
      noContractDescription:
        "Defina o endereço do contrato no ambiente antes de abrir a página pública.",
      recentPayments: "Pagamentos recentes",
      createYours: "Criar perfil"
    },
    success: {
      eyebrow: "Pagamento enviado",
      title: "Seu pagamento foi enviado.",
      description:
        "A transação foi enviada. Use o link do explorer como comprovante e volte ao perfil para ver a atividade mais recente."
    },
    fields: {
      handle: "Handle",
      displayName: "Nome exibido",
      avatarUrl: "URL do avatar",
      bio: "Bio",
      paymentMessage: "Mensagem",
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
      bio: "Sites, design systems e produto.",
      paymentMessage: "Obrigado por usar o PayLink.",
      note: "Sinal do projeto",
      amount: "15.00"
    },
    labels: {
      language: "Idioma",
      connectedWallet: "Carteira conectada",
      network: "Rede",
      profileLive: "Perfil ativo",
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
      contractReady: "As alterações do perfil vão direto para o contrato do PayLink.",
      missingContract: "Defina o endereço do contrato no .env antes de usar o app.",
      noWalletFound:
        "Nenhuma carteira foi encontrada. Abra o app no MiniPay ou use um navegador com carteira integrada.",
      couldNotConnectWallet: "Não foi possível conectar a carteira.",
      switchWalletRequired: "Troque sua carteira para {network} para continuar.",
      miniPayWrongNetwork:
        "O MiniPay está na rede errada. Abra as configurações do MiniPay e troque para {network}.",
      couldNotSwitchNetwork: "Não foi possível trocar para {network}.",
      unsupportedNetwork: "Rede não suportada ({chainId})",
      waitingConfirmation: "Aguardando confirmação...",
      profilePublished: "Perfil publicado.",
      paymentComplete: "Pagamento concluído.",
      connectBeforeSave: "Conecte sua carteira antes de salvar o perfil.",
      connectBeforePay: "Conecte uma carteira para concluir o pagamento.",
      fillAllFields: "Preencha todos os campos antes de publicar seu perfil.",
      invalidImage:
        "A URL do avatar deve estar vazia ou usar https://.",
      missingAmount: "Informe um valor antes de continuar.",
      positiveAmount: "Use um valor positivo.",
      handleAvailable: "Handle disponível.",
      handleTaken: "Esse handle já está em uso.",
      handleInvalid: "O handle deve ter entre 3 e 32 caracteres.",
      handleLocked: "O handle não pode ser alterado depois da primeira publicação.",
      handleChecking: "Verificando disponibilidade do handle...",
      handleDefault: "Use letras minúsculas, números, - ou _.",
      noProfile:
        "Conecte sua carteira e crie seu perfil para começar a receber.",
      profileLoading: "Carregando seu perfil...",
      finishingProfile: "Publicando seu perfil...",
      confirmProfileInWallet:
        "Revise a transação do perfil na sua carteira e depois aguarde a confirmação na rede.",
      syncingProfile:
        "Atualizando seu painel com os dados mais recentes do perfil na rede.",
      wrongNetworkDescription:
        "Troque sua carteira para a rede correta antes de criar ou editar seu perfil no PayLink.",
      wrongNetworkMiniPayDescription:
        'O MiniPay está na rede errada para este app. Se você estiver testando, desative "Use Testnet" nas configurações do MiniPay e volte para tentar de novo.',
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
