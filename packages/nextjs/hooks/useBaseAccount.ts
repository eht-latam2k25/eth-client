/**
 * Hook para gerenciar BASE Sub Accounts
 * Fornece funções para conectar, criar e gerenciar sub accounts
 */
import { useCallback, useEffect, useState } from "react";
import { type SubAccount, getBaseProvider } from "~~/services/base/baseAccountSDK";

const normalizeHexAddress = (value: unknown, context: string): string => {
  if (typeof value !== "string") {
    throw new Error(`${context} must be a hexadecimal string that starts with 0x. Received: ${String(value)}`);
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("0x")) {
    throw new Error(`${context} must start with 0x. Received: ${trimmed}`);
  }

  return trimmed.toLowerCase();
};

export const useBaseAccount = () => {
  const [universalAddress, setUniversalAddress] = useState<string | null>(null);
  const [subAccount, setSubAccount] = useState<SubAccount | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Conecta a conta universal do usuário
   */
  const connectUniversalAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const provider = getBaseProvider();
      console.log("🔄 Conectando Universal Account...");

      // Solicita acesso às contas
      const response = await provider.request({
        method: "eth_requestAccounts",
        params: [],
      });

      const accounts = response as string[];
      const normalizedAddress = normalizeHexAddress(accounts[0], "Universal account address");
      setUniversalAddress(normalizedAddress);
      setIsConnected(true);

      console.log("✅ Universal Account conectada!");
      console.log("📍 Endereço:", normalizedAddress);

      // Salva no localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("universalAddress", normalizedAddress);
      }

      return normalizedAddress;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao conectar conta";
      setError(errorMessage);
      console.error("❌ Erro ao conectar universal account:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verifica se já existe um Sub Account para a aplicação
   */
  const checkExistingSubAccount = useCallback(async (universalAddr: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const provider = getBaseProvider();
      const result = (await provider.request({
        method: "wallet_getSubAccounts",
        params: [
          {
            account: universalAddr,
            domain: typeof window !== "undefined" ? window.location.origin : "",
          },
        ],
      })) as { subAccounts: SubAccount[] };

      const existing = result.subAccounts[0];

      if (existing) {
        const normalizedAddress = normalizeHexAddress(existing.address, "Sub account address");
        const normalizedSubAccount: SubAccount = {
          ...existing,
          address: normalizedAddress,
        };

        setSubAccount(normalizedSubAccount);

        // Log quando sub account existe
        console.log("✅ Sub Account encontrada:", normalizedSubAccount);
        console.log("📍 Endereço da Sub Account:", normalizedAddress);

        // Salva no localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("subAccount", JSON.stringify(normalizedSubAccount));
        }

        return normalizedSubAccount;
      }

      console.log("ℹ️ Nenhuma Sub Account encontrada. Será criada uma nova.");
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao verificar sub account";
      setError(errorMessage);
      console.error("❌ Erro ao verificar sub account:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Cria um novo Sub Account
   */
  const createSubAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const provider = getBaseProvider();
      console.log("🔄 Criando nova Sub Account...");

      const newSubAccount = (await provider.request({
        method: "wallet_addSubAccount",
        params: [
          {
            account: { type: "create" },
          },
        ],
      })) as SubAccount;

      const normalizedAddress = normalizeHexAddress(newSubAccount.address, "Sub account address");
      const normalizedSubAccount: SubAccount = {
        ...newSubAccount,
        address: normalizedAddress,
      };

      setSubAccount(normalizedSubAccount);

      // Log quando sub account é criada
      console.log("✅ Nova Sub Account criada com sucesso!");
      console.log("📍 Endereço da Sub Account:", normalizedAddress);
      console.log("📦 Dados completos:", normalizedSubAccount);

      // Salva no localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("subAccount", JSON.stringify(normalizedSubAccount));
      }

      return normalizedSubAccount;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar sub account";
      setError(errorMessage);
      console.error("❌ Erro ao criar sub account:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Inicializa a conexão completa (universal + sub account)
   */
  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🚀 Iniciando conexão BASE Account...");
      console.log("═══════════════════════════════════════");

      // 1. Conecta conta universal
      const universalAddr = await connectUniversalAccount();
      if (!universalAddr) {
        throw new Error("Falha ao conectar conta universal");
      }

      // 2. Verifica se já existe sub account
      const existing = await checkExistingSubAccount(universalAddr);

      // 3. Se não existir, cria um novo
      if (!existing) {
        const newSub = await createSubAccount();
        console.log("═══════════════════════════════════════");
        console.log("✅ Inicialização completa!");
        console.log("📍 Universal Account:", universalAddr);
        console.log("📍 Sub Account (NOVA):", newSub?.address);
        console.log("═══════════════════════════════════════");
      } else {
        console.log("═══════════════════════════════════════");
        console.log("✅ Inicialização completa!");
        console.log("📍 Universal Account:", universalAddr);
        console.log("📍 Sub Account (EXISTENTE):", existing.address);
        console.log("═══════════════════════════════════════");
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao inicializar";
      setError(errorMessage);
      console.error("❌ Erro ao inicializar:", err);
      console.error("═══════════════════════════════════════");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connectUniversalAccount, checkExistingSubAccount, createSubAccount]);

  /**
   * Envia transações usando a Sub Account
   */
  const sendTransaction = useCallback(
    async (to: string, data: string, value: string = "0x0", chainId: number = 84532) => {
      if (!subAccount) {
        throw new Error("Sub Account não está configurada");
      }

      try {
        setIsLoading(true);
        setError(null);

        const provider = getBaseProvider();
        const callsId = (await provider.request({
          method: "wallet_sendCalls",
          params: [
            {
              version: "2.0",
              atomicRequired: true,
              chainId: `0x${chainId.toString(16)}`,
              from: subAccount.address,
              calls: [
                {
                  to,
                  data,
                  value,
                },
              ],
              capabilities: {
                // Adicione paymasterUrl se quiser patrocinar gas
                // paymasterUrl: "https://...",
              },
            },
          ],
        })) as string;

        return callsId;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro ao enviar transação";
        setError(errorMessage);
        console.error("Erro ao enviar transação:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [subAccount],
  );

  /**
   * Desconecta e limpa dados
   */
  const disconnect = useCallback(() => {
    setUniversalAddress(null);
    setSubAccount(null);
    setIsConnected(false);
    setError(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("universalAddress");
      localStorage.removeItem("subAccount");
    }
  }, []);

  /**
   * Restaura dados do localStorage ao montar
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUniversal = localStorage.getItem("universalAddress");
      const savedSub = localStorage.getItem("subAccount");

      if (savedUniversal) {
        setUniversalAddress(savedUniversal);
        setIsConnected(true);
      }

      if (savedSub) {
        try {
          setSubAccount(JSON.parse(savedSub));
        } catch (err) {
          console.error("Erro ao restaurar sub account:", err);
        }
      }
    }
  }, []);

  return {
    // Estados
    universalAddress,
    subAccount,
    isConnected,
    isLoading,
    error,

    // Ações
    connectUniversalAccount,
    checkExistingSubAccount,
    createSubAccount,
    initialize,
    sendTransaction,
    disconnect,
  };
};
