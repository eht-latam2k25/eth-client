/**
 * BASE Account SDK Configuration
 * Gerencia Sub Accounts para a aplicação
 */
import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";

console.log("🔷 Inicializando BASE Account SDK...");

// Configuração do SDK
export const baseAccountSDK = createBaseAccountSDK({
  appName: "Licitações Blockchain",
  appLogoUrl: typeof window !== "undefined" ? `${window.location.origin}/logo.svg` : "",
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

// Provider para interagir com contas
export const baseProvider = baseAccountSDK.getProvider();

console.log("✅ Provider obtido:", baseProvider ? "OK" : "ERRO");

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
