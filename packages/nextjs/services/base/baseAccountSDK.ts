/**
 * BASE Account SDK Configuration
 * Gerencia Sub Accounts para a aplicação
 *
 * IMPORTANTE: Este arquivo usa lazy initialization para evitar erros de SSR
 */
import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";

let sdkInstance: ReturnType<typeof createBaseAccountSDK> | null = null;
let providerInstance: any = null;

/**
 * Inicializa o SDK apenas no cliente (não durante SSR/build)
 */
const initializeSDK = () => {
  if (typeof window === "undefined") {
    // Está no servidor, não inicializa
    return null;
  }

  if (sdkInstance) {
    // Já foi inicializado
    return sdkInstance;
  }

  console.log("🔷 Inicializando BASE Account SDK...");

  // Configuração do SDK
  sdkInstance = createBaseAccountSDK({
    appName: "Licitações Blockchain",
    appLogoUrl: `${window.location.origin}/logo.svg`,
    appChainIds: [baseSepolia.id],
    subAccounts: {
      // Criar automaticamente ao conectar
      creation: "on-connect" as const,
      // Usar sub account como padrão
      defaultAccount: "sub" as const,
    },
  });

  console.log("✅ BASE Account SDK inicializado!");
  console.log("📦 Chain ID:", baseSepolia.id);
  console.log("📦 App Name: Licitações Blockchain");

  providerInstance = sdkInstance.getProvider();
  console.log("✅ Provider obtido:", providerInstance ? "OK" : "ERRO");

  return sdkInstance;
};

/**
 * Obtém o provider (inicializa SDK se necessário)
 */
export const getBaseProvider = () => {
  if (typeof window === "undefined") {
    // Durante SSR, retorna um mock que não faz nada
    return {
      request: async () => {
        throw new Error("BASE Provider só pode ser usado no cliente");
      },
    };
  }

  if (!providerInstance) {
    initializeSDK();
  }

  return providerInstance;
};

// Export do provider que inicializa sob demanda
export const baseProvider = {
  request: async (params: any) => {
    const provider = getBaseProvider();
    return provider.request(params);
  },
};

/**
 * Tipos de resposta
 */
export type SubAccount = {
  address: string;
  type: string;
};

export type UniversalAccount = {
  address: string;
  subAccounts: SubAccount[];
};
