/**
 * Serviço de Licitações na Blockchain
 * Usa BASE Sub Accounts para registrar licitações
 */
import { baseProvider } from "./baseAccountSDK";
import { encodeFunctionData } from "viem";
import { baseSepolia } from "viem/chains";

/**
 * Tipo de dados da licitação
 */
export type LicitacaoBlockchain = {
  nome: string;
  contratante: string;
  descricao: string;
  valorInicial: string;
  dataEncerramento: string;
  categoria: string;
};

/**
 * Registra uma nova licitação na blockchain
 * @param licitacao - Dados da licitação
 * @param subAccountAddress - Endereço da Sub Account
 * @param contractAddress - Endereço do contrato de licitações
 * @returns Transaction hash ou null em caso de erro
 */
export const registrarLicitacaoBlockchain = async (
  licitacao: LicitacaoBlockchain,
  subAccountAddress: string,
  contractAddress: string,
): Promise<string | null> => {
  try {
    // TODO: Ajuste os parâmetros conforme seu contrato
    // Este é um exemplo genérico

    // Codifica os dados da licitação para enviar ao contrato
    // IMPORTANTE: Ajuste conforme a ABI do seu contrato
    const data = encodeFunctionData({
      abi: [
        {
          name: "criarLicitacao",
          type: "function",
          inputs: [
            { name: "nome", type: "string" },
            { name: "contratante", type: "string" },
            { name: "descricao", type: "string" },
            { name: "valorInicial", type: "uint256" },
            { name: "dataEncerramento", type: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
      ],
      functionName: "criarLicitacao",
      args: [
        licitacao.nome,
        licitacao.contratante,
        licitacao.descricao,
        BigInt(licitacao.valorInicial),
        BigInt(new Date(licitacao.dataEncerramento).getTime() / 1000),
      ],
    });

    // Envia transação usando Sub Account
    const callsId = (await baseProvider.request({
      method: "wallet_sendCalls",
      params: [
        {
          version: "2.0",
          atomicRequired: true,
          chainId: `0x${baseSepolia.id.toString(16)}`,
          from: subAccountAddress,
          calls: [
            {
              to: contractAddress,
              data,
              value: "0x0",
            },
          ],
          capabilities: {
            // Opcional: adicione paymaster para pagar gas pelo usuário
            // paymasterUrl: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/your-api-key",
          },
        },
      ],
    })) as string;

    console.log("Licitação registrada na blockchain:", callsId);
    return callsId;
  } catch (error) {
    console.error("Erro ao registrar licitação na blockchain:", error);
    return null;
  }
};

/**
 * Envia uma proposta para uma licitação
 * @param licitacaoId - ID da licitação
 * @param valorProposta - Valor proposto
 * @param subAccountAddress - Endereço da Sub Account
 * @param contractAddress - Endereço do contrato
 * @returns Transaction hash ou null
 */
export const enviarPropostaBlockchain = async (
  licitacaoId: number,
  valorProposta: string,
  subAccountAddress: string,
  contractAddress: string,
): Promise<string | null> => {
  try {
    const data = encodeFunctionData({
      abi: [
        {
          name: "enviarProposta",
          type: "function",
          inputs: [
            { name: "licitacaoId", type: "uint256" },
            { name: "valorProposta", type: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
      ],
      functionName: "enviarProposta",
      args: [BigInt(licitacaoId), BigInt(valorProposta)],
    });

    const callsId = (await baseProvider.request({
      method: "wallet_sendCalls",
      params: [
        {
          version: "2.0",
          atomicRequired: true,
          chainId: `0x${baseSepolia.id.toString(16)}`,
          from: subAccountAddress,
          calls: [
            {
              to: contractAddress,
              data,
              value: "0x0",
            },
          ],
        },
      ],
    })) as string;

    console.log("Proposta enviada na blockchain:", callsId);
    return callsId;
  } catch (error) {
    console.error("Erro ao enviar proposta:", error);
    return null;
  }
};

/**
 * Aprovar uma proposta (apenas governo)
 * @param licitacaoId - ID da licitação
 * @param propostaId - ID da proposta
 * @param subAccountAddress - Endereço da Sub Account
 * @param contractAddress - Endereço do contrato
 * @returns Transaction hash ou null
 */
export const aprovarPropostaBlockchain = async (
  licitacaoId: number,
  propostaId: number,
  subAccountAddress: string,
  contractAddress: string,
): Promise<string | null> => {
  try {
    const data = encodeFunctionData({
      abi: [
        {
          name: "aprovarProposta",
          type: "function",
          inputs: [
            { name: "licitacaoId", type: "uint256" },
            { name: "propostaId", type: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
      ],
      functionName: "aprovarProposta",
      args: [BigInt(licitacaoId), BigInt(propostaId)],
    });

    const callsId = (await baseProvider.request({
      method: "wallet_sendCalls",
      params: [
        {
          version: "2.0",
          atomicRequired: true,
          chainId: `0x${baseSepolia.id.toString(16)}`,
          from: subAccountAddress,
          calls: [
            {
              to: contractAddress,
              data,
              value: "0x0",
            },
          ],
        },
      ],
    })) as string;

    console.log("Proposta aprovada na blockchain:", callsId);
    return callsId;
  } catch (error) {
    console.error("Erro ao aprovar proposta:", error);
    return null;
  }
};
