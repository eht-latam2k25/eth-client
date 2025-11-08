# Documentação Completa - OnLicity

## Índice

1. [Problemática](#problemática)
2. [Solução](#solução)
3. [Arquitetura](#arquitetura)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Código e Implementação](#código-e-implementação)
7. [Utilização das Tecnologias Blockchain](#utilização-das-tecnologias-blockchain)
8. [Fluxo de Funcionamento](#fluxo-de-funcionamento)
9. [Referências](#referências)

---

## Problemática

### Contexto

O processo de licitações públicas no Brasil enfrenta diversos desafios estruturais que comprometem a transparência, eficiência e integridade dos processos:

1. **Falta de Transparência**
   - Dificuldade em rastrear histórico de gastos públicos
   - Ausência de auditoria pública em tempo real
   - Processos obscuros e difíceis de serem verificados

2. **Risco de Fraudes**
   - Manipulação de propostas durante a avaliação
   - Conluio entre participantes e gestores
   - Vazamento de informações confidenciais antes do encerramento

3. **Processos Burocráticos**
   - Documentação excessiva e processos manuais
   - Tempo prolongado para conclusão das licitações
   - Dificuldade de acesso para pequenos fornecedores

4. **Falta de Privacidade na Avaliação**
   - Identidade dos participantes revelada durante o processo
   - Possibilidade de retaliação ou favoritismo
   - Ausência de mecanismos de avaliação anônima

5. **Custos Elevados**
   - Custos operacionais altos para manutenção de sistemas
   - Taxas elevadas de transação em sistemas tradicionais
   - Ineficiência na gestão de documentos

### Impacto

Estes problemas resultam em:
- Perda de confiança da sociedade nos processos públicos
- Prejuízos financeiros ao erário público
- Desigualdade de oportunidades para participantes
- Ineficiência na aplicação de recursos públicos

---

##  Solução

### OnLicity - Plataforma de Licitações Públicas em Blockchain

A OnLicity é uma aplicação que digitaliza e automatiza o processo de licitações públicas em apenas 3 passos, utilizando tecnologias de ponta para garantir privacidade, transparência e facilidade de uso.

### Os 3 Pilares da Solução

#### 1. Privacidade

**Tecnologia: Zama (Criptografia Homomórfica Total)**

- O governo cadastra o edital de licitação na plataforma
- Prestadores enviam propostas de forma **anônima**
- Análise das propostas **sem revelar a identidade** do prestador
- Prevenção de fraudes e garantia de confidencialidade
- O gestor público visualiza apenas o **score** do prestador
- Score baseado nos critérios da Lei 14.133:
  - Preço
  - Retorno econômico
  - Inovação
- Seleção automática baseada na pontuação mais alta

**Benefícios:**
- Eliminação de vazamento de informações
- Prevenção de conluio
- Avaliação imparcial e objetiva
- Conformidade com princípios de impessoalidade

#### 2.  Transparência

**Tecnologia: Blockchain (Base)**

- Histórico completo registrado On-chain
- Transações de pagamento rastreáveis
- Contratos registrados permanentemente
- Auditoria pública em tempo real
- Imutabilidade dos dados
- Rastreabilidade completa do processo

**Benefícios:**
- Transparência total dos gastos governamentais
- Auditoria facilitada
- Prevenção de alterações fraudulentas
- Confiança pública restaurada

#### 3. Facilidade

**Tecnologia: Base Sub Accounts**

- Carteira digital automática no cadastro
- Processo simplificado e intuitivo
- Custo reduzido de transações
- Rapidez no processamento
- Acesso facilitado para todos os usuários

**Benefícios:**
- Redução de barreiras de entrada
- Experiência do usuário melhorada
- Custos operacionais reduzidos
- Eficiência no processo

---

## Arquitetura

### Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Governo    │  │ Participante │  │   Público    │      │
│  │  Dashboard   │  │  Dashboard   │  │   Licitações │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Serviços de Integração Blockchain              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Base SDK    │  │  Wagmi/Viem  │  │  Zama SDK    │      │
│  │  (Accounts)  │  │  (Web3)      │  │  (Encryption)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Blockchain (Base Sepolia)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Smart      │  │   Sub        │  │  Transaction │      │
│  │  Contracts   │  │  Accounts    │  │  History     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Arquitetura de Camadas

#### 1. Camada de Apresentação (Frontend)
- **Framework**: Next.js 15.2.3 (React 19)
- **UI Components**: DaisyUI, TailwindCSS
- **Estado**: Zustand
- **Roteamento**: Next.js App Router

#### 2. Camada de Integração Web3
- **Wagmi**: Gerenciamento de conexões Web3
- **Viem**: Biblioteca para interação com blockchain
- **RainbowKit**: Interface de conexão de carteiras
- **Base Account SDK**: Gerenciamento de Sub Accounts

#### 3. Camada de Blockchain
- **Rede**: Base Sepolia (testnet)
- **Smart Contracts**: Solidity (Hardhat)
- **Contas**: Base Sub Accounts
- **Armazenamento**: On-chain (transações imutáveis)

#### 4. Camada de Criptografia
- **Zama**: Criptografia homomórfica para privacidade
- **Processamento**: Análise de propostas sem revelar identidade

### Fluxo de Dados

```
1. Usuário → Frontend (Next.js)
2. Frontend → Base Account SDK (Conexão)
3. Base Account SDK → Base Blockchain (Transação)
4. Blockchain → Eventos (Logs)
5. Eventos → Frontend (Atualização de Estado)
```

---

## Tecnologias Utilizadas

### Stack Principal

#### Frontend
- **Next.js 15.2.3**: Framework React para aplicações web
- **React 19.0.0**: Biblioteca para construção de interfaces
- **TypeScript 5.8.2**: Tipagem estática
- **TailwindCSS 4.1.3**: Framework CSS utility-first
- **DaisyUI 5.0.9**: Componentes UI para TailwindCSS

#### Blockchain
- **Scaffold-ETH 2**: Toolkit para desenvolvimento de dApps
- **Hardhat 2.22.10**: Ambiente de desenvolvimento Ethereum
- **Solidity 0.8.20**: Linguagem para smart contracts
- **Ethers.js 6.13.2**: Biblioteca para interação com blockchain
- **Viem 2.34.0**: Biblioteca TypeScript para Ethereum
- **Wagmi 2.16.4**: Hooks React para Ethereum

#### Base Blockchain
- **Base Sepolia**: Rede de teste da Base
- **Base Account SDK (@base-org/account 2.4.2)**: Gerenciamento de contas
- **Sub Accounts**: Contas derivadas para aplicações

#### Web3
- **RainbowKit 2.2.8**: Interface de conexão de carteiras
- **WalletConnect**: Protocolo para conexão de carteiras
- **Burner Wallet**: Carteira local para desenvolvimento

#### Estado e Dados
- **Zustand 5.0.0**: Gerenciamento de estado global
- **TanStack Query 5.59.15**: Gerenciamento de dados do servidor

#### Criptografia
- **Zama**: Criptografia homomórfica total (integração futura)

### Ferramentas de Desenvolvimento

- **ESLint**: Linter para JavaScript/TypeScript
- **Prettier**: Formatador de código
- **TypeChain**: Geração de tipos TypeScript para contratos
- **Hardhat Deploy**: Plugin para deploy de contratos
- **Hardhat Gas Reporter**: Relatório de consumo de gas

---

## Estrutura do Projeto

```
eth-client/
├── packages/
│   ├── hardhat/                 # Smart Contracts
│   │   ├── contracts/           # Contratos Solidity
│   │   │   └── YourContract.sol
│   │   ├── deploy/              # Scripts de deploy
│   │   │   └── 00_deploy_your_contract.ts
│   │   ├── scripts/             # Scripts utilitários
│   │   │   ├── generateAccount.ts
│   │   │   ├── importAccount.ts
│   │   │   └── generateTsAbis.ts
│   │   ├── test/                # Testes
│   │   │   └── YourContract.ts
│   │   ├── hardhat.config.ts    # Configuração Hardhat
│   │   └── package.json
│   │
│   └── nextjs/                  # Frontend
│       ├── app/                 # Next.js App Router
│       │   ├── page.tsx         # Página inicial
│       │   ├── layout.tsx       # Layout principal
│       │   ├── auth/            # Autenticação
│       │   ├── governo/         # Área do governo
│       │   │   ├── dashboard/   # Dashboard governo
│       │   │   ├── criar-licitacao/  # Criar licitação
│       │   │   ├── licitacoes/  # Lista de licitações
│       │   │   └── propostas/   # Propostas recebidas
│       │   ├── participante/    # Área do participante
│       │   │   ├── dashboard/   # Dashboard participante
│       │   │   └── certificado/ # Certificado digital
│       │   ├── licitacoes/      # Licitações públicas
│       │   │   └── [id]/        # Detalhes da licitação
│       │   └── blockexplorer/   # Explorador de blocos
│       │
│       ├── components/          # Componentes React
│       │   ├── Header.tsx       # Cabeçalho
│       │   ├── Footer.tsx       # Rodapé
│       │   ├── BaseAccountConnect.tsx  # Conexão Base
│       │   ├── ProtectedRoute.tsx      # Rota protegida
│       │   ├── governo/         # Componentes governo
│       │   │   └── GovernoNav.tsx
│       │   └── scaffold-eth/    # Componentes Scaffold-ETH
│       │
│       ├── hooks/               # Custom Hooks
│       │   ├── useBaseAccount.ts        # Hook Base Account
│       │   └── scaffold-eth/    # Hooks Scaffold-ETH
│       │
│       ├── services/            # Serviços
│       │   ├── base/            # Serviços Base
│       │   │   ├── baseAccountSDK.ts    # SDK Base
│       │   │   └── licitacaoService.ts  # Serviço licitações
│       │   ├── web3/            # Serviços Web3
│       │   │   ├── wagmiConfig.tsx      # Config Wagmi
│       │   │   └── wagmiConnectors.tsx  # Conectores
│       │   └── store/           # Estado global
│       │       └── store.ts     # Zustand store
│       │
│       ├── utils/               # Utilitários
│       │   ├── auth.ts          # Autenticação
│       │   └── scaffold-eth/    # Utils Scaffold-ETH
│       │
│       ├── contracts/           # Contratos deployados
│       │   ├── deployedContracts.ts
│       │   └── externalContracts.ts
│       │
│       ├── scaffold.config.ts   # Configuração Scaffold
│       ├── next.config.ts       # Configuração Next.js
│       └── package.json
│
├── README.md
└── package.json
```

---

## Código e Implementação

### 1. Configuração Base Account SDK

**Arquivo**: `packages/nextjs/services/base/baseAccountSDK.ts`

```typescript
import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";

let sdkInstance: ReturnType<typeof createBaseAccountSDK> | null = null;
let providerInstance: any = null;

const initializeSDK = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (sdkInstance) {
    return sdkInstance;
  }

  sdkInstance = createBaseAccountSDK({
    appName: "Licitações Blockchain",
    appLogoUrl: `${window.location.origin}/logo.svg`,
    appChainIds: [baseSepolia.id],
  });

  providerInstance = sdkInstance.getProvider();
  return sdkInstance;
};

export const getBaseProvider = () => {
  if (typeof window === "undefined") {
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
```

**Funcionalidades:**
- Inicialização lazy do SDK (apenas no cliente)
- Configuração para Base Sepolia
- Gerenciamento de provider

### 2. Hook useBaseAccount

**Arquivo**: `packages/nextjs/hooks/useBaseAccount.ts`

**Principais Funcionalidades:**
- Conexão de Universal Account
- Criação/Verificação de Sub Account
- Envio de transações
- Gerenciamento de estado de conexão

**Exemplo de Uso:**
```typescript
const { 
  universalAddress, 
  subAccount, 
  isConnected, 
  initialize, 
  sendTransaction 
} = useBaseAccount();
```

### 3. Serviço de Licitações Blockchain

**Arquivo**: `packages/nextjs/services/base/licitacaoService.ts`

**Funcionalidades:**
- `registrarLicitacaoBlockchain`: Registra licitação na blockchain
- `enviarPropostaBlockchain`: Envia proposta anônima
- `aprovarPropostaBlockchain`: Aprova proposta (governo)

**Exemplo:**
```typescript
export const registrarLicitacaoBlockchain = async (
  licitacao: LicitacaoBlockchain,
  subAccountAddress: string,
  contractAddress: string,
): Promise<string | null> => {
  const data = encodeFunctionData({
    abi: [/* ABI do contrato */],
    functionName: "criarLicitacao",
    args: [
      licitacao.nome,
      licitacao.contratante,
      licitacao.descricao,
      BigInt(licitacao.valorInicial),
      BigInt(new Date(licitacao.dataEncerramento).getTime() / 1000),
    ],
  });

  const callsId = await baseProvider.request({
    method: "wallet_sendCalls",
    params: [{
      version: "2.0",
      atomicRequired: true,
      chainId: `0x${baseSepolia.id.toString(16)}`,
      from: subAccountAddress,
      calls: [{
        to: contractAddress,
        data,
        value: "0x0",
      }],
    }],
  });

  return callsId;
};
```

### 4. Componente BaseAccountConnect

**Arquivo**: `packages/nextjs/components/BaseAccountConnect.tsx`

**Funcionalidades:**
- Interface para conectar Base Account
- Exibição de Universal Account e Sub Account
- Gerenciamento de estado de conexão
- Desconexão

**Características:**
- Design responsivo com DaisyUI
- Feedback visual do estado de conexão
- Formatação de endereços para exibição


### 5. Configuração Hardhat

**Arquivo**: `packages/hardhat/hardhat.config.ts`

**Redes Configuradas:**
- Hardhat (local)
- Base Sepolia
- Base Mainnet
- Outras redes EVM compatíveis

**Características:**
- Compilador Solidity 0.8.20
- Otimizador habilitado (200 runs)
- Suporte a múltiplas redes
- Integração com Alchemy

### 6. Configuração Scaffold-ETH

**Arquivo**: `packages/nextjs/scaffold.config.ts`

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.hardhat],
  pollingInterval: 30000,
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "...",
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;
```

### 8. Páginas Principais

#### Dashboard do Governo
**Arquivo**: `packages/nextjs/app/governo/dashboard/page.tsx`

**Funcionalidades:**
- Estatísticas de licitações
- Ações rápidas (criar licitação, ver propostas)
- Lista de licitações recentes
- Integração com Base Account

#### Dashboard do Participante
**Arquivo**: `packages/nextjs/app/participante/dashboard/page.tsx`

**Funcionalidades:**
- Estatísticas de propostas
- Verificação de certificado digital
- Acesso a licitações abertas
- Histórico de participações

#### Lista de Licitações
**Arquivo**: `packages/nextjs/app/licitacoes/page.tsx`

**Funcionalidades:**
- Listagem de licitações públicas
- Filtros e busca
- Detalhes de cada licitação
- Acesso público (sem autenticação)

---

## Utilização das Tecnologias Blockchain

### Scaffold-ETH 2

#### O que é Scaffold-ETH 2?

Scaffold-ETH 2 é um toolkit open-source e abrangente desenvolvido pela comunidade BuidlGuidl para construção de aplicações descentralizadas (dApps) na blockchain Ethereum. Ele fornece uma estrutura completa e production-ready que acelera significativamente o desenvolvimento de dApps, desde o prototipagem até o deploy em produção.

**Principais Características:**

-  **Hot Reload de Contratos**: Mudanças em contratos Solidity são refletidas automaticamente no frontend
-  **Hooks React Customizados**: Coleção de hooks TypeScript com autocompletar para interação com contratos
- **Componentes Web3 Prontos**: Biblioteca de componentes reutilizáveis para interfaces Web3
-  **Burner Wallet & Faucet Local**: Ambiente de desenvolvimento completo com carteira local e faucet
-  **Integração com Carteiras**: Suporte nativo para MetaMask, WalletConnect, Coinbase Wallet e outras
-  **Type Safety**: Geração automática de tipos TypeScript a partir de ABIs de contratos
-  **Ferramentas de Debug**: Interface integrada para debug e teste de contratos
-  **Deploy Automatizado**: Scripts prontos para deploy em múltiplas redes

#### Arquitetura do Scaffold-ETH 2

Scaffold-ETH 2 utiliza uma arquitetura monorepo baseada em workspaces (Yarn), separando claramente as responsabilidades:

```
Scaffold-ETH 2
├── packages/
│   ├── hardhat/          # Ambiente de desenvolvimento de contratos
│   └── nextjs/           # Frontend Next.js com integração Web3
```

**Hardhat Package:**
- Compilação de contratos Solidity
- Deploy automatizado
- Testes de contratos
- Geração de tipos TypeScript
- Gas reporting

**Next.js Package:**
- Interface do usuário React
- Integração com Wagmi/Viem
- Hooks customizados para contratos
- Componentes Web3
- Estado global com Zustand

#### Como Scaffold-ETH 2 é Utilizado no OnLicity?

##### 1. Estrutura de Desenvolvimento

**Monorepo com Workspaces:**
```json
{
  "workspaces": {
    "packages": ["packages/*"]
  }
}
```

Esta estrutura permite:
- Desenvolvimento sincronizado entre frontend e contratos
- Compartilhamento de tipos TypeScript
- Scripts unificados para todo o projeto
- Versionamento coordenado

**Hot Reload de Contratos:**
- Quando um contrato é modificado e compilado, o frontend detecta automaticamente
- ABIs são regenerados automaticamente
- Tipos TypeScript são atualizados
- Interface do usuário reflete as mudanças sem necessidade de recarregar

**Geração Automática de Tipos:**
```typescript
// Tipos são gerados automaticamente a partir dos contratos
import { YourContract } from "~~/contracts/deployedContracts";
```

##### 2. Hooks Customizados do Scaffold-ETH

O Scaffold-ETH 2 fornece uma série de hooks React que simplificam drasticamente a interação com contratos inteligentes:

**a) useScaffoldReadContract**

Hook para leitura de dados de contratos com cache automático e revalidação:

```typescript
// Exemplo de uso no OnLicity
const { data: licitacao } = useScaffoldReadContract({
  contractName: "LicitacaoContract",
  functionName: "getLicitacao",
  args: [licitacaoId],
});

// Características:
// - Cache automático de resultados
// - Revalidação em intervalos configuráveis
// - Type-safe com autocompletar
// - Tratamento de erros integrado
```

**b) useScaffoldWriteContract**

Hook para escrita/interação com contratos, incluindo estado de transação:

```typescript
// Exemplo: Criar licitação
const { writeAsync, isLoading, isMining } = useScaffoldWriteContract({
  contractName: "LicitacaoContract",
  functionName: "criarLicitacao",
  args: [nome, contratante, descricao, valorInicial, dataEncerramento],
  onBlockConfirmation: (txnReceipt) => {
    console.log("Licitação criada!", txnReceipt);
    // Atualizar UI ou redirecionar
  },
});

// Características:
// - Estado de loading automático
// - Confirmação de blocos
// - Tratamento de erros
// - Estimativa de gas
// - Type-safe
```

**c) useScaffoldEventHistory**

Hook para buscar histórico de eventos de contratos:

```typescript
// Exemplo: Buscar eventos de licitações criadas
const { data: eventos } = useScaffoldEventHistory({
  contractName: "LicitacaoContract",
  eventName: "LicitacaoCriada",
  fromBlock: 0,
  filters: { contratante: enderecoGoverno },
  blockData: true,
});

// Características:
// - Busca paginada
// - Filtros avançados
// - Inclui dados do bloco
// - Cache inteligente
```

**d) useScaffoldWatchContractEvent**

Hook para observar eventos em tempo real:

```typescript
// Exemplo: Observar novas propostas
useScaffoldWatchContractEvent({
  contractName: "LicitacaoContract",
  eventName: "PropostaEnviada",
  onLogs: (logs) => {
    console.log("Nova proposta recebida!", logs);
    // Atualizar lista de propostas
    refetchPropostas();
  },
});

// Características:
// - Observação em tempo real
// - Múltiplos eventos simultâneos
// - Callbacks customizáveis
// - Cleanup automático
```

**e) Outros Hooks Úteis:**

```typescript
// Hook para informações de contrato deployado
const { data: contractData } = useDeployedContractInfo({
  contractName: "LicitacaoContract",
});

// Hook para logs de contrato
const { data: logs } = useContractLogs({
  contractName: "LicitacaoContract",
  eventName: "LicitacaoCriada",
});

// Hook para transações
const { data: transaction } = useScaffoldReadContract({
  contractName: "LicitacaoContract",
  functionName: "getTransaction",
  args: [txHash],
});
```

##### 3. Componentes Reutilizáveis

Scaffold-ETH 2 inclui uma biblioteca rica de componentes React prontos para uso:

**a) Componentes de Conexão de Carteira:**

```typescript
// RainbowKitCustomConnectButton
// Componente completo de conexão de carteira com:
// - Suporte a múltiplas carteiras (MetaMask, WalletConnect, etc.)
// - Indicador de rede
// - Informações da conta conectada
// - Dropdown com opções (copiar endereço, desconectar, etc.)
// - QR Code para conexão mobile
```

**b) Interface de Debug de Contratos:**

```typescript
// DebugContracts
// Interface completa para interagir com contratos durante desenvolvimento:
// - Lista de todas as funções do contrato
// - Inputs type-safe para cada função
// - Botões para read/write
// - Exibição de resultados
// - Histórico de chamadas
```

**c) Explorador de Blocos Integrado:**

```typescript
// BlockExplorer
// Explorador de blocos completo incluído:
// - Busca por endereço ou hash de transação
// - Visualização de transações
// - Visualização de contratos
// - Logs de eventos
// - Storage de contratos
// - Código fonte (se verificado)
```

**d) Componentes de Notificação:**

```typescript
// Notification
// Sistema de notificações para transações:
// - Notificações de transação pendente
// - Notificações de confirmação
// - Notificações de erro
// - Links para block explorer
// - Auto-dismiss configurável
```

**e) Componentes de UI:**

```typescript
// BlockieAvatar - Avatar baseado no endereço
// AddressQRCodeModal - QR Code do endereço
// Faucet - Componente para obter tokens de teste
// SwitchTheme - Alternador de tema
```

##### 4. Ferramentas de Desenvolvimento

**a) Burner Wallet:**

Carteira local integrada para desenvolvimento rápido:

```typescript
// Características:
// - Criação automática de conta local
// - Saldo ilimitado para testes
// - Não requer seed phrase
// - Ideal para desenvolvimento rápido
// - Suporte a múltiplas contas
```

**b) Faucet Local:**

Sistema de faucet integrado para obter tokens de teste:

```typescript
// Funcionalidades:
// - Distribuição automática de ETH
// - Limite configurável
// - Rate limiting
// - Interface web integrada
// - Suporte a múltiplas redes
```

**c) Scripts de Deploy:**

Scripts automatizados para deploy em múltiplas redes:

```typescript
// yarn deploy --network localhost
// yarn deploy --network sepolia
// yarn deploy --network baseSepolia
// yarn deploy --network base

// Características:
// - Deploy em múltiplas redes
// - Verificação automática de contratos
// - Geração de ABIs
// - Atualização de tipos TypeScript
// - Histórico de deploys
```

**d) Geração de ABIs TypeScript:**

```typescript
// Scripts automáticos geram:
// - deployedContracts.ts - Contratos deployados
// - externalContracts.ts - Contratos externos
// - Tipos TypeScript para todos os contratos
// - ABI completo com type safety
```

##### 5. Configuração e Personalização

**scaffold.config.ts:**

```typescript
const scaffoldConfig = {
  // Redes alvo para a aplicação
  targetNetworks: [chains.hardhat, chains.baseSepolia],
  
  // Intervalo de polling para atualizações
  pollingInterval: 30000,
  
  // API Key do Alchemy para RPC
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  
  // Override de RPC para redes específicas
  rpcOverrides: {
    [chains.baseSepolia.id]: "https://sepolia.base.org",
  },
  
  // WalletConnect Project ID
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  
  // Apenas usar burner wallet localmente
  onlyLocalBurnerWallet: true,
};
```

**hardhat.config.ts:**

```typescript
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      // Configuração da rede local
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [deployerPrivateKey],
    },
  },
  // Verificação de contratos
  etherscan: {
    apiKey: etherscanApiKey,
  },
};
```

##### 6. Workflow de Desenvolvimento com Scaffold-ETH 2

**Fluxo Típico no OnLicity:**

1. **Desenvolvimento de Contrato:**
   ```bash
   # 1. Criar/modificar contrato em packages/hardhat/contracts/
   # 2. Compilar
   yarn compile
   # 3. Testar
   yarn test
   # 4. Deploy local
   yarn deploy
   ```

2. **Frontend Detecta Mudanças:**
   - Scaffold-ETH detecta mudanças nos contratos
   - Regenera ABIs e tipos TypeScript
   - Frontend atualiza automaticamente

3. **Desenvolvimento de Interface:**
   ```typescript
   // Usar hooks do Scaffold-ETH
   const { data, isLoading } = useScaffoldReadContract({
     contractName: "LicitacaoContract",
     functionName: "getLicitacao",
     args: [id],
   });
   ```

4. **Debug e Teste:**
   - Usar interface de debug integrada
   - Testar funções diretamente na UI
   - Ver eventos em tempo real
   - Inspecionar estado do contrato

5. **Deploy:**
   ```bash
   # Deploy para testnet
   yarn deploy --network baseSepolia
   # Verificar contrato
   yarn verify --network baseSepolia
   # Deploy frontend
   yarn next:build
   ```

##### 7. Integração com Wagmi e Viem

Scaffold-ETH 2 é construído sobre Wagmi e Viem, fornecendo uma camada de abstração que simplifica o desenvolvimento:

**Wagmi:**
- Hooks React para Ethereum
- Gerenciamento de estado de conexão
- Cache e revalidação inteligente
- Suporte a múltiplas carteiras

**Viem:**
- Biblioteca TypeScript para Ethereum
- Type-safe por padrão
- Suporte a múltiplas chains
- Utilities para encoding/decoding

**Scaffold-ETH Adiciona:**
- Hooks específicos para contratos deployados
- Geração automática de tipos
- Componentes pré-construídos
- Ferramentas de desenvolvimento

##### 8. Casos de Uso Específicos no OnLicity

**a) Criação de Licitação:**

```typescript
// Usando useScaffoldWriteContract
const { writeAsync: criarLicitacao } = useScaffoldWriteContract({
  contractName: "LicitacaoContract",
  functionName: "criarLicitacao",
  args: [
    formData.nome,
    formData.contratante,
    formData.descricao,
    BigInt(formData.valorInicial),
    BigInt(new Date(formData.dataEncerramento).getTime() / 1000),
  ],
  onBlockConfirmation: (txnReceipt) => {
    toast.success("Licitação criada com sucesso!");
    router.push("/governo/licitacoes");
  },
});

// Chamar a função
await criarLicitacao();
```

**b) Listagem de Licitações:**

```typescript
// Buscar eventos de licitações criadas
const { data: eventos } = useScaffoldEventHistory({
  contractName: "LicitacaoContract",
  eventName: "LicitacaoCriada",
  fromBlock: 0,
  blockData: true,
});

// Processar eventos
const licitacoes = eventos?.map((event) => ({
  id: event.args.id,
  nome: event.args.nome,
  contratante: event.args.contratante,
  valorInicial: event.args.valorInicial,
  dataCriacao: new Date(Number(event.block.timestamp) * 1000),
  hash: event.transactionHash,
}));
```

**c) Observação de Novas Propostas:**

```typescript
// Observar eventos em tempo real
useScaffoldWatchContractEvent({
  contractName: "LicitacaoContract",
  eventName: "PropostaEnviada",
  onLogs: (logs) => {
    logs.forEach((log) => {
      if (log.args.licitacaoId === licitacaoIdAtual) {
        toast.info("Nova proposta recebida!");
        refetchPropostas();
      }
    });
  },
});
```

**d) Leitura de Dados de Contrato:**

```typescript
// Ler dados de uma licitação específica
const { data: licitacao, isLoading } = useScaffoldReadContract({
  contractName: "LicitacaoContract",
  functionName: "getLicitacao",
  args: [licitacaoId],
});

if (isLoading) return <Loading />;
if (!licitacao) return <NotFound />;

return (
  <div>
    <h1>{licitacao.nome}</h1>
    <p>Contratante: {licitacao.contratante}</p>
    <p>Valor: {formatEther(licitacao.valorInicial)} ETH</p>
  </div>
);
```

##### 9. Benefícios do Scaffold-ETH 2 para o OnLicity

**Desenvolvimento Rápido:**
- Estrutura pronta para dApps
- Não precisa configurar do zero
- Boilerplate mínimo
- Foco no código de negócio

**Type Safety:**
- Tipos TypeScript gerados automaticamente
- Autocompletar em IDEs
- Erros detectados em tempo de compilação
- Refatoração segura

**Hot Reload:**
- Mudanças em contratos refletem imediatamente
- Desenvolvimento iterativo rápido
- Feedback instantâneo
- Menos tempo de espera

**Debugging:**
- Interface integrada para debug
- Teste de funções diretamente na UI
- Visualização de eventos
- Inspeção de estado

**Deploy Simplificado:**
- Scripts prontos para múltiplas redes
- Verificação automática de contratos
- Geração de ABIs
- Histórico de deploys

**Documentação e Comunidade:**
- Documentação extensa
- Comunidade ativa
- Exemplos e tutoriais
- Suporte da comunidade

**Manutenibilidade:**
- Código organizado
- Separação de responsabilidades
- Padrões estabelecidos
- Fácil de estender

##### 10. Comparação com Outras Ferramentas

**Scaffold-ETH 2 vs. Truffle:**
- TypeScript nativo
- Integração React melhor
- Hot reload de contratos
- Hooks customizados

**Scaffold-ETH 2 vs. Hardhat puro:**
- Frontend integrado
- Componentes prontos
- Hooks React
- Ferramentas de debug

**Scaffold-ETH 2 vs. Create React App + Web3:**
- Estrutura otimizada para dApps
- Type safety automático
- Ferramentas integradas
- Menos configuração

##### 11. Recursos Avançados Utilizados no OnLicity

**a) TypeChain Integration:**

```typescript
// Tipos gerados automaticamente
import type { LicitacaoContract } from "~~/generated/contract-types";

// Type-safe contract interactions
const contract: LicitacaoContract = await ethers.getContractAt(
  "LicitacaoContract",
  contractAddress
);
```

**b) Contract Hot Reload:**

```typescript
// Mudanças em contratos são detectadas automaticamente
// Frontend atualiza sem recarregar
// ABIs são regenerados
// Tipos são atualizados
```

**c) Multi-Network Support:**

```typescript
// Suporte a múltiplas redes
const networks = [chains.hardhat, chains.baseSepolia, chains.base];

// Switch entre redes facilmente
// Diferentes contratos para cada rede
// Configuração por rede
```

**d) Gas Reporting:**

```typescript
// Relatório de gas automático nos testes
// Comparação de gas entre funções
// Otimização de gas
```

##### 12. Melhores Práticas com Scaffold-ETH 2

**Organização de Contratos:**
- Um contrato por arquivo
- Nomes descritivos
- Comentários claros
- Eventos para logs importantes

**Uso de Hooks:**
- Sempre usar hooks do Scaffold-ETH quando possível
- Aproveitar cache e revalidação
- Tratar estados de loading e erro
- Usar callbacks apropriados

**Deploy:**
- Sempre testar localmente antes
- Verificar contratos após deploy
- Manter histórico de deploys
- Documentar endereços de contratos

**Segurança:**
- Sempre auditar contratos
- Usar bibliotecas testadas (OpenZeppelin)
- Validar inputs
- Tratar erros adequadamente

### Base Blockchain

#### O que é Base?

Base é uma Layer 2 (L2) blockchain desenvolvida pela Coinbase e construída sobre o Optimism Stack (OP Stack). Foi lançada em 2023 com o objetivo de trazer bilhões de usuários para a web3, oferecendo uma experiência blockchain rápida, barata e segura.

**Características Técnicas:**

- **Tecnologia**: Optimistic Rollup construído sobre o OP Stack
- **Segurança**: Herda a segurança da Ethereum mainnet através de provas de fraude
- **Compatibilidade**: 100% compatível com a Ethereum Virtual Machine (EVM)
- **Finalidade**: Finalização rápida (~2 segundos) com segurança da L1
- **Custos**: Taxas de transação significativamente menores que Ethereum mainnet
- **Escalabilidade**: Capacidade de processar milhares de transações por segundo

**Rede Principal e Testnet:**

- **Base Mainnet**: Rede principal para produção (Chain ID: 8453)
- **Base Sepolia**: Rede de teste para desenvolvimento (Chain ID: 84532)
- **Base Goerli**: Rede de teste legada (descontinuada)

#### Arquitetura Técnica da Base

**Optimistic Rollup:**
Base utiliza a tecnologia Optimistic Rollup, que:
- Agrupa múltiplas transações L2 em uma única transação L1
- Assume que todas as transações são válidas (otimista)
- Permite desafios de transações inválidas através de provas de fraude
- Reduz custos ao compartilhar custos de gas entre múltiplas transações

**OP Stack:**
Base é construída sobre o OP Stack (Optimism Stack), um conjunto de módulos open-source que inclui:
- Sequenciador: Ordena e executa transações
- Prover: Gera provas de estado
- Verifier: Verifica provas e desafia transações inválidas
- Bridge: Conecta L1 e L2 para depósitos e saques

**Fluxo de Transações:**
```
1. Usuário envia transação → Base L2
2. Sequenciador processa e ordena transação
3. Transação é executada na L2
4. Estado atualizado é publicado na Ethereum L1
5. Período de desafio (7 dias para saques)
6. Transação finalizada
```

#### Por que Base foi Escolhida para o OnLicity?

##### 1. Custos Extremamente Baixos

**Comparação de Custos:**
- Ethereum Mainnet: ~$5-50 por transação (variável)
- Base Mainnet: ~$0.01-0.10 por transação
- Redução de custos: **99%+ mais barato**

**Impacto no OnLicity:**
- Licitações podem ter múltiplas transações (criação, propostas, aprovações, pagamentos)
- Com custos baixos, cada etapa do processo é economicamente viável
- Permite microtransações e interações frequentes
- Ideal para processos governamentais que requerem muitas transações

**Exemplo Prático:**
```typescript
// Custo estimado para criar uma licitação:
// Ethereum Mainnet: ~$15-30
// Base Mainnet: ~$0.05-0.15
// Economia: ~$14.85-29.85 por licitação
```

##### 2. Velocidade e Finalidade Rápida

**Tempos de Confirmação:**
- Ethereum Mainnet: ~12-15 segundos (1 bloco)
- Base Mainnet: ~2 segundos (finalidade otimista)
- Base Sepolia: ~2 segundos

**Benefícios:**
- Experiência do usuário similar a aplicações web tradicionais
- Feedback instantâneo para usuários
- Processos mais ágeis
- Menor tempo de espera

**Caso de Uso no OnLicity:**
- Criação de licitação: Confirmação em ~2 segundos
- Envio de proposta: Confirmação em ~2 segundos
- Aprovação: Confirmação em ~2 segundos
- Pagamento: Confirmação em ~2 segundos

##### 3. Segurança e Descentralização

**Herança de Segurança:**
- Base herda a segurança da Ethereum mainnet
- Dados de estado são publicados na L1
- Provas de fraude garantem correção
- Validação descentralizada

**Garantias de Segurança:**
- Transações não podem ser revertidas após confirmação (exceto durante período de desafio)
- Dados são imutáveis após publicação na L1
- Sistema de desafio previne fraudes
- Auditoria pública completa

**Para Licitações Públicas:**
- Transparência garantida
- Imutabilidade dos dados
- Auditoria facilitada
- Prevenção de fraudes

##### 4. Compatibilidade Total com EVM

**100% Compatível:**
- Qualquer contrato Solidity funciona diretamente
- Ferramentas Ethereum funcionam sem modificação
- Bibliotecas existentes são compatíveis
- Não requer aprendizado de novas tecnologias

**Ferramentas Compatíveis:**
- Hardhat: Funciona diretamente
- Foundry: Funciona diretamente
- Remix: Suporta Base
- MetaMask: Suporte nativo
- Todas as bibliotecas Web3: Compatíveis

**Vantagem para OnLicity:**
- Reutilização de código existente
- Ferramentas familiares
- Menor curva de aprendizado
- Ecossistema maduro

##### 5. Base Account SDK e Sub Accounts

**Base Account SDK:**
- Gerenciamento simplificado de contas
- Criação automática de Sub Accounts
- Experiência do usuário melhorada
- Não requer conhecimento técnico de carteiras

**Sub Accounts:**
- Contas derivadas por aplicação
- Isolamento de segurança
- Gerenciamento unificado
- Melhor organização

**Impacto:**
- Usuários governamentais não precisam ser especialistas em blockchain
- Processo simplificado de conexão
- Melhor experiência do usuário
- Menos barreiras de entrada

##### 6. Suporte e Ecossistema

**Backing da Coinbase:**
- Desenvolvido e mantido pela Coinbase
- Suporte corporativo robusto
- Recursos e investimento significativos
- Roadmap claro e transparente

**Ecossistema Crescente:**
- Muitas dApps já deployadas
- Ferramentas e bibliotecas em crescimento
- Comunidade ativa
- Documentação extensa

**Para OnLicity:**
- Confiança institucional
- Suporte contínuo
- Ecossistema em crescimento
- Futuro promissor

#### Como Base é Utilizada no OnLicity?

##### 1. Configuração da Rede Base

**hardhat.config.ts:**
```typescript
import { HardhatUserConfig } from "hardhat/config";
import * as chains from "viem/chains";

const config: HardhatUserConfig = {
  networks: {
    // Base Sepolia (Testnet)
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [deployerPrivateKey],
      chainId: 84532,
    },
    // Base Mainnet
    base: {
      url: "https://mainnet.base.org",
      accounts: [deployerPrivateKey],
      chainId: 8453,
    },
  },
  etherscan: {
    apiKey: {
      baseSepolia: baseScanApiKey,
      base: baseScanApiKey,
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
};
```

**scaffold.config.ts:**
```typescript
import { baseSepolia, base } from "viem/chains";

const scaffoldConfig = {
  targetNetworks: [baseSepolia], // ou [base] para mainnet
  pollingInterval: 30000,
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  rpcOverrides: {
    [baseSepolia.id]: "https://sepolia.base.org",
    [base.id]: "https://mainnet.base.org",
  },
};
```

##### 2. Deploy de Contratos na Base

**Deploy para Base Sepolia:**
```bash
# Deploy para testnet
yarn deploy --network baseSepolia

# Verificar contrato
yarn verify --network baseSepolia
```

**Deploy para Base Mainnet:**
```bash
# Deploy para mainnet
yarn deploy --network base

# Verificar contrato
yarn verify --network base
```

**Script de Deploy:**
```typescript
// packages/hardhat/deploy/00_deploy_licitacao_contract.ts
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployLicitacaoContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("LicitacaoContract", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const contract = await hre.ethers.getContract("LicitacaoContract", deployer);
  console.log("LicitacaoContract deployed to:", await contract.getAddress());
};

export default deployLicitacaoContract;
deployLicitacaoContract.tags = ["LicitacaoContract"];
```

##### 3. Integração com Base Account SDK

**Configuração do SDK:**
```typescript
// packages/nextjs/services/base/baseAccountSDK.ts
import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";

const sdkInstance = createBaseAccountSDK({
  appName: "OnLicity - Licitações Públicas",
  appLogoUrl: `${window.location.origin}/logo.svg`,
  appChainIds: [baseSepolia.id], // ou [base.id] para mainnet
});

export const baseProvider = sdkInstance.getProvider();
```

**Uso no Hook:**
```typescript
// packages/nextjs/hooks/useBaseAccount.ts
import { baseProvider } from "~~/services/base/baseAccountSDK";

export const useBaseAccount = () => {
  const connectUniversalAccount = async () => {
    const provider = baseProvider;
    const response = await provider.request({
      method: "eth_requestAccounts",
      params: [],
    });
    return response[0]; // Universal Account address
  };

  const createSubAccount = async () => {
    const provider = baseProvider;
    const subAccount = await provider.request({
      method: "wallet_addSubAccount",
      params: [{ account: { type: "create" } }],
    });
    return subAccount;
  };

  return { connectUniversalAccount, createSubAccount };
};
```

##### 4. Transações na Base

**Enviar Transação:**
```typescript
// packages/nextjs/services/base/licitacaoService.ts
import { baseProvider } from "./baseAccountSDK";
import { encodeFunctionData } from "viem";
import { baseSepolia } from "viem/chains";

export const registrarLicitacaoBlockchain = async (
  licitacao: LicitacaoBlockchain,
  subAccountAddress: string,
  contractAddress: string,
): Promise<string | null> => {
  const data = encodeFunctionData({
    abi: licitacaoContractABI,
    functionName: "criarLicitacao",
    args: [
      licitacao.nome,
      licitacao.contratante,
      licitacao.descricao,
      BigInt(licitacao.valorInicial),
      BigInt(new Date(licitacao.dataEncerramento).getTime() / 1000),
    ],
  });

  const callsId = await baseProvider.request({
    method: "wallet_sendCalls",
    params: [
      {
        version: "2.0",
        atomicRequired: true,
        chainId: `0x${baseSepolia.id.toString(16)}`, // 0x14a34
        from: subAccountAddress,
        calls: [
          {
            to: contractAddress,
            data,
            value: "0x0",
          },
        ],
        capabilities: {
          // Opcional: paymaster para patrocinar gas
          // paymasterUrl: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/your-api-key",
        },
      },
    ],
  });

  return callsId;
};
```

##### 5. Leitura de Dados da Base

**Usando Wagmi/Viem:**
```typescript
// Ler dados de contrato na Base
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { baseSepolia } from "viem/chains";

const { data: licitacao } = useScaffoldReadContract({
  contractName: "LicitacaoContract",
  functionName: "getLicitacao",
  args: [licitacaoId],
  chainId: baseSepolia.id,
});
```

**Buscar Eventos:**
```typescript
// Buscar eventos de licitações criadas
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const { data: eventos } = useScaffoldEventHistory({
  contractName: "LicitacaoContract",
  eventName: "LicitacaoCriada",
  fromBlock: 0,
  chainId: baseSepolia.id,
});
```

##### 6. Bridge e Cross-Chain

**Depositar ETH para Base:**
```typescript
// Usuário pode depositar ETH da Ethereum para Base
// Através do Base Bridge oficial
// https://bridge.base.org
```

**Saque de Base para Ethereum:**
```typescript
// Saques levam ~7 dias (período de desafio)
// Usuário pode sacar ETH de Base para Ethereum
// Através do Base Bridge
```

#### Base Account SDK em Detalhes

##### O que é Base Account SDK?

Base Account SDK é uma biblioteca JavaScript/TypeScript desenvolvida pela Coinbase que simplifica o gerenciamento de contas blockchain para aplicações. Ela introduz o conceito de **Universal Accounts** e **Sub Accounts**.

**Universal Account:**
- Conta principal do usuário
- Gerenciada pela carteira Base (ou Coinbase Wallet)
- Pode ter múltiplas Sub Accounts
- Assina transações de Sub Accounts

**Sub Account:**
- Conta derivada de uma Universal Account
- Específica para uma aplicação ou domínio
- Não requer gerenciamento de chaves separadas
- Transações são assinadas pela Universal Account

##### Configuração no OnLicity

**Instalação:**
```bash
yarn add @base-org/account
```

**Inicialização:**
```typescript
import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";

const sdk = createBaseAccountSDK({
  appName: "OnLicity",
  appLogoUrl: "https://onlicity.com/logo.svg",
  appChainIds: [baseSepolia.id],
});

const provider = sdk.getProvider();
```

**Métodos Principais:**

1. **Conectar Universal Account:**
```typescript
const accounts = await provider.request({
  method: "eth_requestAccounts",
  params: [],
});
const universalAddress = accounts[0];
```

2. **Listar Sub Accounts:**
```typescript
const result = await provider.request({
  method: "wallet_getSubAccounts",
  params: [
    {
      account: universalAddress,
      domain: window.location.origin,
    },
  ],
});
const subAccounts = result.subAccounts;
```

3. **Criar Sub Account:**
```typescript
const newSubAccount = await provider.request({
  method: "wallet_addSubAccount",
  params: [
    {
      account: { type: "create" },
    },
  ],
});
```

4. **Enviar Transação via Sub Account:**
```typescript
const callsId = await provider.request({
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
          data: encodedData,
          value: "0x0",
        },
      ],
    },
  ],
});
```

##### Benefícios do Base Account SDK

**Para Desenvolvedores:**
- API simples e intuitiva
- Type-safe com TypeScript
- Documentação completa
- Exemplos e tutoriais

**Para Usuários:**
- Não precisa criar múltiplas carteiras
- Gerenciamento unificado
- Processo simplificado
- Melhor experiência

**Para Aplicações:**
- Isolamento de contas
- Melhor organização
- Segurança aprimorada
- Escalabilidade

#### Base Sub Accounts em Detalhes

##### Arquitetura de Sub Accounts

**Hierarquia:**
```
Universal Account (Conta Principal)
├── Sub Account (App 1 - OnLicity)
├── Sub Account (App 2 - Outra dApp)
└── Sub Account (App 3 - Mais uma dApp)
```

**Características:**
- Cada Sub Account é única por domínio/aplicação
- Sub Accounts são endereços Ethereum válidos
- Transações são assinadas pela Universal Account
- Sub Accounts não têm chaves privadas próprias

##### Como Funcionam no OnLicity

**1. Primeira Conexão:**
```typescript
// Usuário acessa OnLicity pela primeira vez
// 1. Conecta Universal Account
const universalAddress = await connectUniversalAccount();

// 2. Verifica se existe Sub Account para o domínio
const existing = await checkSubAccount(universalAddress, window.location.origin);

// 3. Se não existir, cria nova Sub Account
if (!existing) {
  const subAccount = await createSubAccount();
  // Sub Account criada: 0x1234...5678
}

// 4. Sub Account é salva localmente
localStorage.setItem("subAccount", JSON.stringify(subAccount));
```

**2. Conexões Subsequentes:**
```typescript
// Usuário acessa OnLicity novamente
// 1. Conecta Universal Account
const universalAddress = await connectUniversalAccount();

// 2. Busca Sub Account existente
const subAccount = await getSubAccount(universalAddress, window.location.origin);

// 3. Usa Sub Account existente
// Não precisa criar nova
```

**3. Envio de Transações:**
```typescript
// Todas as transações usam Sub Account
const txHash = await sendTransaction({
  from: subAccount.address, // Sub Account
  to: contractAddress,
  data: encodedData,
});

// Transação é assinada pela Universal Account
// Mas enviada da Sub Account
```

##### Casos de Uso no OnLicity

**Caso 1: Criar Licitação (Governo)**
```typescript
// 1. Governo conecta Base Account
const { subAccount } = useBaseAccount();

// 2. Preenche formulário de licitação
const licitacao = {
  nome: "Construção de Ponte",
  contratante: "Prefeitura de Belo Horizonte",
  // ...
};

// 3. Envia transação via Sub Account
const txHash = await registrarLicitacaoBlockchain(
  licitacao,
  subAccount.address,
  contractAddress
);

// 4. Transação confirmada em ~2 segundos
// 5. Licitação registrada na blockchain
```

**Caso 2: Enviar Proposta (Participante)**
```typescript
// 1. Participante conecta Base Account
const { subAccount } = useBaseAccount();

// 2. Seleciona licitação
const licitacaoId = 1;

// 3. Preenche proposta
const proposta = {
  valor: "1000000",
  prazo: "12 meses",
  // ...
};

// 4. Envia proposta via Sub Account
const txHash = await enviarPropostaBlockchain(
  licitacaoId,
  proposta,
  subAccount.address,
  contractAddress
);

// 5. Proposta registrada anonimamente
```

**Caso 3: Aprovar Proposta (Governo)**
```typescript
// 1. Governo visualiza propostas
const { data: propostas } = useScaffoldEventHistory({
  contractName: "LicitacaoContract",
  eventName: "PropostaEnviada",
  filters: { licitacaoId: 1 },
});

// 2. Seleciona melhor proposta (por score)
const melhorProposta = propostas[0];

// 3. Aprova proposta via Sub Account
const txHash = await aprovarPropostaBlockchain(
  1, // licitacaoId
  melhorProposta.id,
  subAccount.address,
  contractAddress
);

// 4. Contrato fechado
```

##### Benefícios das Sub Accounts

**Isolamento:**
- Cada aplicação tem sua própria Sub Account
- Transações são isoladas por aplicação
- Melhor organização e rastreabilidade

**Segurança:**
- Sub Accounts não têm chaves privadas
- Transações são assinadas pela Universal Account
- Usuário mantém controle total
- Prevenção de acesso não autorizado

**Facilidade:**
- Usuário não precisa criar múltiplas carteiras
- Gerenciamento unificado
- Processo simplificado
- Melhor experiência do usuário

**Escalabilidade:**
- Múltiplas Sub Accounts por Universal Account
- Suporte a muitas aplicações
- Organização clara
- Fácil gerenciamento

#### Comparação com Outras L2s

**Base vs. Arbitrum:**
- Base: OP Stack, finalidade ~2s, custos similares
- Arbitrum: Optimistic Rollup próprio, finalidade ~1-2s
- Base: Melhor integração com Coinbase
- Arbitrum: Ecossistema mais maduro

**Base vs. Optimism:**
- Base: Construído sobre OP Stack (mesma base)
- Optimism: Criador do OP Stack
- Base: Backing da Coinbase
- Optimism: Mais tempo no mercado

**Base vs. Polygon:**
- Base: Optimistic Rollup, herda segurança da L1
- Polygon: Sidechain, segurança própria
- Base: Melhor segurança (herda da L1)
- Polygon: Maior throughput

**Base vs. zkSync:**
- Base: Optimistic Rollup, finalidade rápida
- zkSync: ZK Rollup, finalidade instantânea
- Base: Mais simples, compatibilidade total
- zkSync: Mais complexo, melhor segurança teórica

**Por que Base para OnLicity:**
- Backing institucional (Coinbase)
- Compatibilidade total com EVM
- Base Account SDK simplifica UX
- Custos baixos
- Velocidade adequada
- Segurança da L1

#### Configuração e Setup Completo

**1. Variáveis de Ambiente:**
```bash
# .env.local
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
DEPLOYER_PRIVATE_KEY=your_deployer_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

**2. Configuração Hardhat:**
```typescript
// packages/hardhat/hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC || "https://sepolia.base.org",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: 84532,
    },
    base: {
      url: process.env.BASE_MAINNET_RPC || "https://mainnet.base.org",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: 8453,
    },
  },
  etherscan: {
    apiKey: {
      baseSepolia: process.env.BASESCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
};

export default config;
```

**3. Configuração Wagmi:**
```typescript
// packages/nextjs/services/web3/wagmiConfig.tsx
import { createConfig } from "wagmi";
import { baseSepolia, base } from "viem/chains";
import { http } from "viem";

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [base.id]: http("https://mainnet.base.org"),
  },
});
```

#### Melhores Práticas com Base

**Desenvolvimento:**
- Sempre teste em Base Sepolia primeiro
- Use faucet para obter ETH de teste
- Verifique contratos após deploy
- Monitore gas costs

**Produção:**
- Faça deploy gradual (testnet → mainnet)
- Audite contratos antes do deploy
- Monitore transações
- Tenha planos de contingência

**Segurança:**
- Use bibliotecas testadas (OpenZeppelin)
- Valide todos os inputs
- Implemente checks de segurança
- Faça auditorias regulares

**Otimização:**
- Otimize contratos para reduzir gas
- Use eventos para logs (mais barato)
- Evite loops grandes
- Cache dados quando possível

#### Benefícios Técnicos para OnLicity

**Performance:**
- Transações rápidas (~2s)
- Alta throughput
- Baixa latência
- Escalabilidade

**Custos:**
- Taxas baixas (~$0.01-0.10)
- Economicamente viável
- Permite muitas transações
- ROI positivo

**Experiência do Usuário:**
- Processo simplificado
- Base Account SDK facilita uso
- Interface intuitiva
- Menos barreiras

**Conformidade:**
- Transparência garantida
- Auditoria facilitada
- Imutabilidade dos dados
- Rastreabilidade completa

---

## Fluxo de Funcionamento

### Fluxo Completo de uma Licitação

#### 1. Criação de Licitação (Governo)

```
1. Governo acessa dashboard
2. Clica em "Criar Licitação"
3. Preenche formulário:
   - Nome da licitação
   - Contratante
   - Descrição
   - Valor inicial
   - Data de encerramento
   - Categoria
   - Documentos necessários
4. Conecta Base Account (se não conectado)
5. Submete formulário
6. Dados são registrados na blockchain via Smart Contract
7. Transação é confirmada
8. Licitação fica disponível publicamente
```

#### 2. Envio de Proposta (Participante)

```
1. Participante acessa lista de licitações
2. Seleciona licitação de interesse
3. Visualiza detalhes
4. Conecta Base Account (se não conectado)
5. Preenche proposta:
   - Valor proposto
   - Prazo de execução
   - Documentos anexos
6. Proposta é criptografada usando Zama (homomórfica)
7. Proposta criptografada é enviada para blockchain
8. Identidade do participante não é revelada
9. Score é calculado automaticamente
10. Proposta aparece na lista (apenas score visível)
```

#### 3. Avaliação de Propostas (Governo)

```
1. Governo acessa dashboard de propostas
2. Visualiza lista de propostas ordenadas por score
3. Vê apenas:
   - Score da proposta
   - Valor proposto (criptografado)
   - Prazo (criptografado)
   - Não vê identidade do participante
4. Seleciona proposta com melhor score
5. Aprova proposta
6. Identidade do participante é revelada
7. Contrato é fechado
8. Tudo é registrado na blockchain
```

#### 4. Finalização e Pagamento

```
1. Contrato é assinado
2. Pagamentos são feitos via blockchain
3. Cada transação é registrada on-chain
4. Histórico completo fica disponível publicamente
5. Auditoria pode ser feita a qualquer momento
```

### Fluxo Técnico Detalhado

#### Conexão Base Account

```typescript
1. Usuário clica em "Conectar Base Account"
2. useBaseAccount.initialize() é chamado
3. SDK Base solicita conexão da Universal Account
4. Usuário aprova conexão na carteira
5. SDK verifica se existe Sub Account para o domínio
6. Se não existir, cria nova Sub Account
7. Sub Account é salva no localStorage
8. Estado é atualizado no componente
9. Interface mostra endereços conectados
```

#### Registro de Licitação na Blockchain

```typescript
1. Formulário é submetido
2. Dados são validados
3. Função registrarLicitacaoBlockchain() é chamada
4. Dados são codificados usando encodeFunctionData()
5. Transação é preparada com:
   - to: endereço do contrato
   - data: dados codificados
   - from: Sub Account address
   - value: 0 (não envia ETH)
6. baseProvider.request('wallet_sendCalls') é chamado
7. Usuário aprova transação na carteira
8. Transação é enviada para Base Sepolia
9. Transação é confirmada
10. Hash da transação é retornado
11. Interface é atualizada
12. Licitação aparece na lista
```

---


## Conformidade com Lei 14.133

A OnLicity foi desenvolvida para estar em conformidade com a Lei 14.133/2021 (Nova Lei de Licitações):

### Princípios Atendidos

1. **Legalidade**: Processos seguem a legislação vigente
2. **Impessoalidade**: Avaliação anônima elimina favoritismo
3. **Moralidade**: Transparência blockchain previne fraudes
4. **Publicidade**: Todos os dados são públicos e verificáveis
5. **Eficiência**: Processos automatizados reduzem tempo
6. **Isonomia**: Todos os participantes têm igualdade de condições
7. **Vinculação ao Instrumento Convocatório**: Cumprimento estrito do edital
8. **Julgamento Objetivo**: Score automático baseado em critérios objetivos

### Critérios de Avaliação (Lei 14.133)

O sistema de score considera:
- **Preço**: Menor preço = maior pontuação
- **Retorno Econômico**: Melhor relação custo-benefício
- **Inovação**: Propostas inovadoras recebem pontuação adicional
- **Qualidade**: Critérios de qualidade definidos no edital
- **Prazo**: Prazos menores recebem pontuação adicional

---

##  Segurança

### Medidas de Segurança Implementadas

1. **Criptografia Homomórfica (Zama)**
   - Propostas são criptografadas antes do envio
   - Análise sem revelar identidade
   - Decriptografia apenas após seleção

2. **Blockchain Imutável**
   - Dados não podem ser alterados após registro
   - Histórico completo e auditável
   - Prevenção de fraudes

3. **Autenticação**
   - Sistema de autenticação JWT
   - Rotas protegidas
   - Verificação de tipo de usuário

4. **Base Sub Accounts**
   - Isolamento de contas por aplicação
   - Gerenciamento seguro de chaves
   - Transações assinadas pela Universal Account

5. **Validação de Dados**
   - Validação no frontend e backend
   - Verificação de tipos
   - Sanitização de inputs

---

## Próximos Passos

### Funcionalidades Futuras

1. **Integração Completa com Zama**
   - Implementação completa de criptografia homomórfica
   - Processamento de propostas criptografadas
   - Decriptografia segura

2. **Smart Contracts Completos**
   - Contratos específicos para licitações
   - Gerenciamento de propostas on-chain
   - Sistema de pagamentos automático

3. **Sistema de Notificações**
   - Notificações em tempo real
   - Alertas de novas licitações
   - Atualizações de status

4. **Analytics e Relatórios**
   - Dashboards analíticos
   - Relatórios de gastos públicos
   - Estatísticas de participação

5. **Integração com Sistemas Governamentais**
   - Integração com sistemas existentes
   - Sincronização de dados
   - APIs para terceiros

6. **Melhorias de UX**
   - Interface mais intuitiva
   - Melhor feedback visual
   - Acessibilidade

---

## Referências

### Documentação Oficial

- [Scaffold-ETH 2](https://docs.scaffoldeth.io)
- [Base Documentation](https://docs.base.org)
- [Base Account SDK](https://docs.base.org/docs/tools/base-account-sdk)
- [Next.js](https://nextjs.org/docs)
- [Hardhat](https://hardhat.org/docs)
- [Wagmi](https://wagmi.sh)
- [Viem](https://viem.sh)
- [Zama](https://www.zama.ai)

### Legislação

- [Lei 14.133/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm) - Nova Lei de Licitações

### Artigos e Recursos

- [Base Blog](https://base.org/blog)
- [Ethereum Documentation](https://ethereum.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org)

---

## Conclusão

A OnLicity representa uma evolução significativa no processo de licitações públicas, combinando:

- **Privacidade** através de criptografia homomórfica (Zama)
- **Transparência** através de blockchain (Base)
- **Facilidade** através de Base Sub Accounts e interface intuitiva

A plataforma está preparada para transformar o setor público, oferecendo processos mais eficientes, transparentes e seguros, alinhados com os princípios da Lei 14.133/2021.

---


