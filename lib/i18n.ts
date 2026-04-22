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
    profileSection: string;
    chargeSection: string;
    transactionsSection: string;
    emptyTransactions: string;
    connectPrompt: string;
  };
  publicPage: {
    ownerTitle: string;
    ownerDescription: string;
    visitorTitle: string;
    visitorDescription: string;
    invoiceEyebrow: string;
    invoiceDescription: string;
    invoiceSummary: string;
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
    shareHint: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    languageName: "English",
    productName: "MiniPay PayLink",
    productTagline: "One profile. One link. Direct stablecoin payments on Celo.",
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
      copyChargeLink: "Copy charge link",
      shareLink: "Share link",
      shareProfile: "Share profile",
      createChargeLink: "Create charge link",
      openExplorer: "Open explorer",
      openPublicPage: "Open public page",
      payNow: "Pay now",
      payCreator: "Make a payment to this creator",
      shareCreatorLink: "Share this creator's link",
      viewProfile: "View profile",
      createYourOwn: "Create yours",
      backToProfile: "Back to profile",
      useDashboard: "Use dashboard",
      viewTransactions: "View transactions"
    },
    home: {
      eyebrow: "MiniPay payment profile",
      title: "One link for tips, invoices, and direct stablecoin payments.",
      description:
        "Create a public payment page, set your preferred token, and share a clean MiniPay-friendly link that works for freelancers, creators, and solo merchants.",
      heroSupport:
        "No custody. No backend. Just a public profile and a faster way to get paid on Celo.",
      heroChips: [
        "Direct stablecoin payments",
        "Reusable charge links",
        "Built for MiniPay"
      ],
      demoCaption:
        "Real product flow: public pay page, send screen, and success receipt.",
      proofEyebrow: "Why it works",
      proofTitle: "Clear enough to trust at a glance.",
      proofDescription:
        "PayLink keeps the product promise simple: one public page, direct transfer, and a visible onchain record.",
      proofChips: [
        "Funds go straight to the recipient",
        "Prefilled amount and note in one link",
        "Recent payments rendered from onchain events",
        "Works with USDm, USDC, and USD₮"
      ],
      stepsEyebrow: "How it works",
      stepsTitle: "Set it once. Reuse it every time.",
      stepsDescription:
        "The homepage should read in one scan, and the product flow should feel the same.",
      steps: [
        {
          title: "Create your profile",
          description:
            "Claim your handle, add your image and message, and choose the token you want to receive."
        },
        {
          title: "Share a payment link",
          description:
            "Use your public page or prefill amount and note for tips, retainers, and lightweight invoices."
        },
        {
          title: "Receive proof instantly",
          description:
            "The payer gets a success screen and the payment can show back up on the public page from chain data."
        }
      ],
      trustStatements: [
        "Direct onchain transfer",
        "No platform custody",
        "Explorer receipt included"
      ],
      closingEyebrow: "Start now",
      closingTitle: "Publish your PayLink and make the next payment obvious.",
      closingDescription:
        "Open the dashboard, create the profile, and share the same link anywhere you want to get paid.",
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
      actionsTab: "Actions",
      manageTab: "Manage",
      transactionsTab: "Transactions",
      quickActions: "Quick actions",
      quickActionChargeDescription:
        "Prefill amount and reference before you share your next payment request.",
      quickActionTransactionsDescription:
        "Open your dashboard to review the latest incoming payments and explorer links.",
      profileSection: "Profile",
      chargeSection: "Charge link",
      transactionsSection: "Incoming payments",
      emptyTransactions:
        "Payments will appear here after someone pays through your public page.",
      connectPrompt:
        "Connect a wallet to create and manage your public payment profile."
    },
    publicPage: {
      ownerTitle: "This is your public payment page.",
      ownerDescription:
        "Share it directly or go back to the dashboard to edit your profile and build charge links.",
      visitorTitle: "Pay this profile",
      visitorDescription:
        "Open the payment flow or share this public page with someone else.",
      invoiceEyebrow: "Payment request",
      invoiceDescription:
        "This link already includes payment details. Review the request and complete the transfer on Celo.",
      invoiceSummary: "Invoice details",
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
        "The transaction was sent through PayLink. Keep the explorer link as proof and reopen the public page after confirmation to see the latest payment activity."
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
      publicLink: "Public link",
      chargeLink: "Charge link"
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
      profilePublished: "Profile published onchain.",
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
        "Review the profile transaction in your wallet, then wait while it is confirmed onchain.",
      syncingProfile:
        "Updating your dashboard with the latest onchain profile data.",
      wrongNetworkDescription:
        "Switch your wallet to the required network before creating or editing your PayLink profile.",
      wrongNetworkMiniPayDescription:
        'MiniPay is on the wrong network for this app. If you are testing, disable "Use Testnet" in MiniPay settings, then come back and try again.',
      insufficientBalance: "Insufficient {token} balance for this payment.",
      approving: "Approving",
      confirmingApproval: "Confirming token approval onchain...",
      sending: "Sending",
      openingReceipt: "Opening your receipt...",
      shareHint:
        "Use this link anywhere you want to receive direct MiniPay-friendly payments."
    }
  },
  "pt-BR": {
    languageName: "Português",
    productName: "MiniPay PayLink",
    productTagline: "Um perfil. Um link. Pagamentos em stablecoin direto na Celo.",
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
      payCreator: "Pagar esse criador",
      shareCreatorLink: "Compartilhar o link desse criador",
      viewProfile: "Ver perfil",
      createYourOwn: "Criar perfil",
      backToProfile: "Voltar ao perfil",
      useDashboard: "Usar painel",
      viewTransactions: "Ver transações"
    },
    home: {
      eyebrow: "Perfil de pagamento MiniPay",
      title: "Um link para gorjetas, cobranças e pagamentos diretos em stablecoin.",
      description:
        "Crie uma página pública, escolha o token que você quer receber e compartilhe um link limpo e pronto para MiniPay para freelas, criadores e pequenos negócios.",
      heroSupport:
        "Sem custódia. Sem backend. Só um perfil público e um jeito mais rápido de receber na Celo.",
      heroChips: [
        "Pagamentos diretos em stablecoin",
        "Links de cobrança reutilizáveis",
        "Feito para MiniPay"
      ],
      demoCaption:
        "Fluxo real do produto: página pública de pagamento, envio e comprovante final.",
      proofEyebrow: "Por que funciona",
      proofTitle: "Claro o bastante para gerar confiança na primeira olhada.",
      proofDescription:
        "O PayLink mantém a proposta simples: uma página pública, transferência direta e registro visível na rede.",
      proofChips: [
        "Os fundos vão direto para o destinatário",
        "Valor e referência já preenchidos no mesmo link",
        "Pagamentos recentes vindos de eventos onchain",
        "Funciona com USDm, USDC e USD₮"
      ],
      stepsEyebrow: "Como funciona",
      stepsTitle: "Configure uma vez. Reaproveite sempre.",
      stepsDescription:
        "A homepage precisa ser entendida em uma passada, e o produto deve manter essa mesma clareza.",
      steps: [
        {
          title: "Crie seu perfil",
          description:
            "Escolha seu handle, adicione sua imagem e mensagem e defina o token que você quer receber."
        },
        {
          title: "Compartilhe o link",
          description:
            "Use sua página pública ou já envie valor e referência preenchidos para gorjetas, sinais e cobranças leves."
        },
        {
          title: "Receba o comprovante na hora",
          description:
            "Quem paga vê a tela de sucesso e o pagamento pode aparecer de volta na sua página pública a partir dos dados onchain."
        }
      ],
      trustStatements: [
        "Transferência direta onchain",
        "Sem custódia da plataforma",
        "Comprovante no explorer"
      ],
      closingEyebrow: "Comece agora",
      closingTitle: "Publique seu PayLink e deixe o próximo pagamento óbvio.",
      closingDescription:
        "Abra o painel, crie seu perfil e compartilhe o mesmo link em todo lugar onde você quer receber.",
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
      actionsTab: "Ações",
      manageTab: "Gerir",
      transactionsTab: "Transações",
      quickActions: "Ações rápidas",
      quickActionChargeDescription:
        "Defina valor e referência antes de compartilhar sua próxima cobrança.",
      quickActionTransactionsDescription:
        "Abra o painel para revisar os pagamentos recebidos mais recentes e os links do explorer.",
      profileSection: "Perfil",
      chargeSection: "Link de cobrança",
      transactionsSection: "Pagamentos recebidos",
      emptyTransactions:
        "Os pagamentos aparecerão aqui depois que alguém pagar pela sua página pública.",
      connectPrompt:
        "Conecte sua carteira para criar e gerenciar seu perfil de pagamentos."
    },
    publicPage: {
      ownerTitle: "Esta é a sua página pública.",
      ownerDescription:
        "Compartilhe sua página ou volte ao painel para editar seu perfil e gerar links de cobrança.",
      visitorTitle: "Pagar este perfil",
      visitorDescription:
        "Abra o fluxo de pagamento ou compartilhe esta página pública com outra pessoa.",
      invoiceEyebrow: "Cobrança",
      invoiceDescription:
        "Este link já inclui os dados do pagamento. Revise a cobrança e conclua a transferência na Celo.",
      invoiceSummary: "Detalhes da cobrança",
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
        "A transação foi enviada pelo PayLink. Guarde o link do explorer como comprovante e volte à página pública depois da confirmação para ver a atividade mais recente."
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
      profilePublished: "Perfil publicado na rede.",
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
      shareHint:
        "Use este link em qualquer lugar onde você queira receber pagamentos diretos."
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
