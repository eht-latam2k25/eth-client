"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowPathIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// Tipo de dados para licitação
type Licitacao = {
  id: number;
  nome: string;
  contratante: string;
  descricao: string;
  valorInicial: string;
  dataEncerramento: string;
  status: "aberta" | "fechada" | "em-analise";
};

// Dados mock de licitações
const licitacoesMock: Licitacao[] = [
  {
    id: 1,
    nome: "Construção de Ponte Rodoviária",
    contratante: "Prefeitura Municipal de Belo Horizonte",
    descricao:
      "Construção de ponte rodoviária sobre o Rio das Velhas, incluindo estudos de impacto ambiental, projeto executivo e execução da obra. A ponte terá extensão de 450 metros e capacidade para tráfego pesado.",
    valorInicial: "R$ 15.000.000,00",
    dataEncerramento: "15 de Dezembro de 2024 às 14:00",
    status: "aberta",
  },
  {
    id: 2,
    nome: "Fornecimento de Equipamentos Médicos",
    contratante: "Hospital das Clínicas",
    descricao:
      "Aquisição de equipamentos médicos hospitalares incluindo 5 aparelhos de ressonância magnética, 10 tomógrafos computadorizados e equipamentos de UTI. Inclui instalação, treinamento e garantia de 3 anos.",
    valorInicial: "R$ 8.500.000,00",
    dataEncerramento: "22 de Dezembro de 2024 às 16:30",
    status: "aberta",
  },
  {
    id: 3,
    nome: "Reforma de Escola Municipal",
    contratante: "Secretaria de Educação",
    descricao:
      "Reforma completa da Escola Municipal Santos Dumont, incluindo modernização de salas de aula, construção de laboratório de informática, quadra poliesportiva coberta e acessibilidade completa.",
    valorInicial: "R$ 2.300.000,00",
    dataEncerramento: "10 de Janeiro de 2025 às 10:00",
    status: "aberta",
  },
  {
    id: 4,
    nome: "Sistema de Iluminação Pública LED",
    contratante: "Prefeitura Municipal de São Paulo",
    descricao:
      "Substituição de 50.000 pontos de iluminação pública por tecnologia LED em toda cidade, incluindo manutenção preventiva e corretiva pelo período de 5 anos. Sistema com controle remoto e monitoramento.",
    valorInicial: "R$ 45.000.000,00",
    dataEncerramento: "28 de Dezembro de 2024 às 11:00",
    status: "aberta",
  },
  {
    id: 5,
    nome: "Pavimentação de Vias Urbanas",
    contratante: "Prefeitura de Contagem",
    descricao:
      "Pavimentação asfáltica de 25km de vias urbanas em diversos bairros da cidade, incluindo drenagem, sinalização horizontal e vertical, e calçadas acessíveis conforme normas vigentes.",
    valorInicial: "R$ 12.750.000,00",
    dataEncerramento: "5 de Janeiro de 2025 às 15:00",
    status: "aberta",
  },
];

const Licitacoes: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todas");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simula um refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Filtrar licitações
  const licitacoesFiltradas = licitacoesMock.filter(licitacao => {
    const matchSearch =
      licitacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacao.contratante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacao.descricao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === "todas" || licitacao.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header com busca */}
      <div className="bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#93BBFB] mb-1">Licitações</h1>
            <p className="text-gray-300 text-sm">Explore e participe das licitações disponíveis</p>
          </div>

          {/* Barra de busca e filtros */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Campo de busca */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar licitações..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#93BBFB]"
              />
            </div>

            {/* Filtro por status */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="select select-bordered bg-white/10 border-white/20 text-white focus:border-[#93BBFB]"
              >
                <option value="todas">Todas</option>
                <option value="aberta">Abertas</option>
                <option value="fechada">Fechadas</option>
                <option value="em-analise">Em Análise</option>
              </select>
            </div>

            {/* Botão Refresh */}
            <button
              onClick={handleRefresh}
              className={`btn btn-primary gap-2 ${isRefreshing ? "loading" : ""}`}
              disabled={isRefreshing}
            >
              <ArrowPathIcon className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de licitações */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Contador de resultados */}
        <div className="mb-3">
          <p className="text-sm text-base-content/60">
            {licitacoesFiltradas.length}{" "}
            {licitacoesFiltradas.length === 1 ? "licitação encontrada" : "licitações encontradas"}
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid gap-4">
          {licitacoesFiltradas.length > 0 ? (
            licitacoesFiltradas.map(licitacao => (
              <div
                key={licitacao.id}
                className="card bg-base-100 border-2 border-base-300 hover:border-[#93BBFB] transition-all duration-300 hover:shadow-xl"
              >
                <div className="card-body p-5">
                  {/* Header do card */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="badge badge-primary badge-sm mt-1">
                          {licitacao.status === "aberta"
                            ? "Aberta"
                            : licitacao.status === "fechada"
                              ? "Fechada"
                              : "Em Análise"}
                        </div>
                        <h2 className="text-lg font-bold text-base-content hover:text-[#93BBFB] transition-colors">
                          {licitacao.nome}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        <span className="font-medium">Contratante:</span>
                        <span className="italic">{licitacao.contratante}</span>
                      </div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-base-content/80 mb-3 leading-relaxed">{licitacao.descricao}</p>

                  {/* Footer do card com informações */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-base-300">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Valor inicial */}
                      <div className="flex items-center gap-2">
                        <div className="bg-[#93BBFB]/10 p-2 rounded-lg">
                          <CurrencyDollarIcon className="w-5 h-5 text-[#93BBFB]" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60">Valor Inicial</p>
                          <p className="font-bold text-base-content">{licitacao.valorInicial}</p>
                        </div>
                      </div>

                      {/* Data de encerramento */}
                      <div className="flex items-center gap-2">
                        <div className="bg-[#93BBFB]/10 p-2 rounded-lg">
                          <ClockIcon className="w-5 h-5 text-[#93BBFB]" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60">Encerra em</p>
                          <p className="font-bold text-base-content">{licitacao.dataEncerramento}</p>
                        </div>
                      </div>
                    </div>

                    {/* Botão de ação */}
                    <Link href={`/licitacoes/${licitacao.id}`}>
                      <button className="btn btn-primary btn-sm gap-2 whitespace-nowrap">
                        Ver Detalhes
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Mensagem quando não há resultados
            <div className="text-center py-12">
              <div className="bg-base-200 rounded-2xl p-8 max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhuma licitação encontrada</h3>
                <p className="text-base-content/60">Tente ajustar os filtros ou termos de busca</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Licitacoes;
