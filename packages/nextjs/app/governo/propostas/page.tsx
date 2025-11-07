"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  TrophyIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Proposta = {
  id: number;
  empresa: string;
  cnpj: string;
  valor: string;
  prazo: string;
  dataEnvio: string;
  pontuacao: number;
  status: "pendente" | "aprovada" | "rejeitada";
  documentos: number;
};

type Licitacao = {
  id: number;
  nome: string;
  contratante: string;
  valorInicial: string;
  dataEncerramento: string;
  propostas: Proposta[];
};

const licitacoesComPropostas: Licitacao[] = [
  {
    id: 1,
    nome: "Construção de Ponte Rodoviária",
    contratante: "Prefeitura Municipal de Belo Horizonte",
    valorInicial: "R$ 15.000.000,00",
    dataEncerramento: "15/12/2024",
    propostas: [
      {
        id: 1,
        empresa: "Construtora ABC Ltda",
        cnpj: "12.345.678/0001-90",
        valor: "R$ 14.200.000,00",
        prazo: "18 meses",
        dataEnvio: "10/12/2024 14:30",
        pontuacao: 95,
        status: "pendente",
        documentos: 12,
      },
      {
        id: 2,
        empresa: "Engenharia XYZ S.A.",
        cnpj: "98.765.432/0001-10",
        valor: "R$ 14.800.000,00",
        prazo: "16 meses",
        dataEnvio: "09/12/2024 10:15",
        pontuacao: 88,
        status: "pendente",
        documentos: 10,
      },
      {
        id: 3,
        empresa: "Obras Prime Construções",
        cnpj: "11.222.333/0001-44",
        valor: "R$ 13.900.000,00",
        prazo: "20 meses",
        dataEnvio: "11/12/2024 16:45",
        pontuacao: 92,
        status: "pendente",
        documentos: 11,
      },
    ],
  },
  {
    id: 2,
    nome: "Fornecimento de Equipamentos Médicos",
    contratante: "Hospital das Clínicas",
    valorInicial: "R$ 8.500.000,00",
    dataEncerramento: "22/12/2024",
    propostas: [
      {
        id: 4,
        empresa: "MedEquip Tecnologia",
        cnpj: "55.666.777/0001-88",
        valor: "R$ 8.200.000,00",
        prazo: "6 meses",
        dataEnvio: "18/12/2024 09:20",
        pontuacao: 90,
        status: "pendente",
        documentos: 8,
      },
      {
        id: 5,
        empresa: "HealthTech Soluções",
        cnpj: "44.555.666/0001-99",
        valor: "R$ 8.100.000,00",
        prazo: "8 meses",
        dataEnvio: "17/12/2024 15:30",
        pontuacao: 85,
        status: "pendente",
        documentos: 7,
      },
    ],
  },
];

const GovernoPropostas: NextPage = () => {
  const [licitacaoSelecionada, setLicitacaoSelecionada] = useState<Licitacao | null>(licitacoesComPropostas[0]);

  const propostasOrdenadas = licitacaoSelecionada
    ? [...licitacaoSelecionada.propostas].sort((a, b) => b.pontuacao - a.pontuacao)
    : [];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/governo/dashboard"
            className="inline-flex items-center gap-2 text-primary-content hover:text-primary-content/80 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-primary-content mb-2">Propostas Recebidas</h1>
          <p className="text-primary-content/90">Analise e compare as propostas enviadas</p>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna Esquerda - Licitação Selecionada */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 space-y-4">
              {/* Lista de Licitações */}
              <div className="card bg-base-100 border-2 border-base-300">
                <div className="card-body p-4">
                  <h2 className="font-bold mb-3 flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    Selecione uma Licitação
                  </h2>
                  <div className="space-y-2">
                    {licitacoesComPropostas.map(licitacao => (
                      <div
                        key={licitacao.id}
                        onClick={() => setLicitacaoSelecionada(licitacao)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          licitacaoSelecionada?.id === licitacao.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-base-200 hover:bg-base-300 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{licitacao.nome}</h3>
                            <p className="text-xs text-base-content/60">{licitacao.contratante}</p>
                          </div>
                          <span className="badge badge-primary badge-sm">{licitacao.propostas.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detalhes da Licitação Selecionada */}
              {licitacaoSelecionada && (
                <div className="card bg-base-100 border-2 border-primary/30">
                  <div className="card-body p-5">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <DocumentTextIcon className="w-6 h-6 text-primary" />
                      Licitação Selecionada
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-base mb-1">{licitacaoSelecionada.nome}</h3>
                        <p className="text-sm text-base-content/70">{licitacaoSelecionada.contratante}</p>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-base-200 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CurrencyDollarIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs text-base-content/60">Valor Inicial</span>
                          </div>
                          <p className="font-bold text-sm">{licitacaoSelecionada.valorInicial}</p>
                        </div>

                        <div className="bg-base-200 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs text-base-content/60">Encerramento</span>
                          </div>
                          <p className="font-bold text-sm">{licitacaoSelecionada.dataEncerramento}</p>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total de Propostas</span>
                          <span className="text-2xl font-bold text-primary">
                            {licitacaoSelecionada.propostas.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Coluna Direita - Ranking de Propostas */}
          <div className="lg:col-span-7">
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl flex items-center gap-2">
                    <TrophyIcon className="w-6 h-6 text-warning" />
                    Ranking de Propostas
                  </h2>
                  <span className="text-sm text-base-content/60">Ordenado por pontuação</span>
                </div>

                {propostasOrdenadas.length > 0 ? (
                  <div className="space-y-3">
                    {propostasOrdenadas.map((proposta, index) => (
                      <div
                        key={proposta.id}
                        className={`card border-2 transition-all hover:shadow-lg ${
                          index === 0
                            ? "bg-warning/10 border-warning"
                            : index === 1
                              ? "bg-base-200 border-base-300"
                              : "bg-base-100 border-base-300"
                        }`}
                      >
                        <div className="card-body p-4">
                          {/* Header da Proposta */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {/* Posição no Ranking */}
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                  index === 0
                                    ? "bg-warning text-warning-content"
                                    : index === 1
                                      ? "bg-base-300 text-base-content"
                                      : "bg-base-200 text-base-content"
                                }`}
                              >
                                {index + 1}º
                              </div>
                              <div>
                                <h3 className="font-bold">{proposta.empresa}</h3>
                                <p className="text-xs text-base-content/60 font-mono">{proposta.cnpj}</p>
                              </div>
                            </div>

                            {/* Pontuação */}
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">{proposta.pontuacao}</div>
                              <div className="text-xs text-base-content/60">pontos</div>
                            </div>
                          </div>

                          {/* Detalhes da Proposta */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Valor Proposto</div>
                              <div className="font-bold text-sm">{proposta.valor}</div>
                            </div>
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Prazo</div>
                              <div className="font-bold text-sm">{proposta.prazo}</div>
                            </div>
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Data Envio</div>
                              <div className="font-bold text-sm">{proposta.dataEnvio}</div>
                            </div>
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Documentos</div>
                              <div className="font-bold text-sm">{proposta.documentos} anexos</div>
                            </div>
                          </div>

                          {/* Ações */}
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-outline flex-1 gap-2">
                              <EyeIcon className="w-4 h-4" />
                              Ver Detalhes
                            </button>
                            <button className="btn btn-sm btn-success gap-2">
                              <CheckCircleIcon className="w-4 h-4" />
                              Aprovar
                            </button>
                            <button className="btn btn-sm btn-error btn-outline gap-2">
                              <XMarkIcon className="w-4 h-4" />
                              Rejeitar
                            </button>
                          </div>

                          {/* Badge de destaque para o 1º lugar */}
                          {index === 0 && (
                            <div className="mt-2 flex items-center gap-2 text-warning">
                              <TrophyIcon className="w-4 h-4" />
                              <span className="text-xs font-semibold">Melhor Proposta</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DocumentTextIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Nenhuma proposta</h3>
                    <p className="text-base-content/60">Esta licitação ainda não recebeu propostas</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernoPropostas;
