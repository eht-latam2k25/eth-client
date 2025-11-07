"use client";

import { useState } from "react";
import Link from "next/link";
import { ModalCriarLicitacao } from "../dashboard/components/ModalCriarLicitacao";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type LicitacaoGoverno = {
  id: number;
  nome: string;
  contratante: string;
  valorInicial: string;
  dataEncerramento: string;
  status: "aberta" | "fechada" | "em-analise";
  propostas: number;
};

const licitacoesGovernoMock: LicitacaoGoverno[] = [
  {
    id: 1,
    nome: "Construção de Ponte Rodoviária",
    contratante: "Prefeitura Municipal de Belo Horizonte",
    valorInicial: "R$ 15.000.000,00",
    dataEncerramento: "15/12/2024",
    status: "aberta",
    propostas: 3,
  },
  {
    id: 2,
    nome: "Fornecimento de Equipamentos Médicos",
    contratante: "Hospital das Clínicas",
    valorInicial: "R$ 8.500.000,00",
    dataEncerramento: "22/12/2024",
    status: "aberta",
    propostas: 5,
  },
  {
    id: 3,
    nome: "Reforma de Escola Municipal",
    contratante: "Secretaria de Educação",
    valorInicial: "R$ 2.300.000,00",
    dataEncerramento: "10/11/2024",
    status: "fechada",
    propostas: 8,
  },
];

const GovernoLicitacoes: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todas");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const licitacoesFiltradas = licitacoesGovernoMock.filter(licitacao => {
    const matchSearch = licitacao.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "todas" || licitacao.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/governo/dashboard"
            className="inline-flex items-center gap-2 text-primary-content hover:text-primary-content/80 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar ao Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-content mb-2">Minhas Licitações</h1>
              <p className="text-primary-content/80">Gerencie todas as licitações criadas</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary gap-2">
              <PlusIcon className="w-5 h-5" />
              Nova Licitação
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-base-100 py-4 px-4 sm:px-6 lg:px-8 border-b border-base-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Busca */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                placeholder="Buscar licitações..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Filtro por status */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-base-content/40" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="select select-bordered"
              >
                <option value="todas">Todas</option>
                <option value="aberta">Abertas</option>
                <option value="fechada">Fechadas</option>
                <option value="em-analise">Em Análise</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de licitações */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <p className="text-sm text-base-content/60">
            {licitacoesFiltradas.length}{" "}
            {licitacoesFiltradas.length === 1 ? "licitação encontrada" : "licitações encontradas"}
          </p>
        </div>

        <div className="space-y-4">
          {licitacoesFiltradas.length > 0 ? (
            licitacoesFiltradas.map(licitacao => (
              <div
                key={licitacao.id}
                className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Info da licitação */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`badge badge-sm ${
                            licitacao.status === "aberta"
                              ? "badge-success"
                              : licitacao.status === "fechada"
                                ? "badge-error"
                                : "badge-warning"
                          }`}
                        >
                          {licitacao.status === "aberta"
                            ? "Aberta"
                            : licitacao.status === "fechada"
                              ? "Fechada"
                              : "Em Análise"}
                        </span>
                        <h3 className="font-bold text-lg">{licitacao.nome}</h3>
                      </div>
                      <p className="text-sm text-base-content/70 mb-2">{licitacao.contratante}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-base-content/60">Valor: </span>
                          <span className="font-semibold">{licitacao.valorInicial}</span>
                        </div>
                        <div>
                          <span className="text-base-content/60">Encerra em: </span>
                          <span className="font-semibold">{licitacao.dataEncerramento}</span>
                        </div>
                        <div>
                          <span className="text-base-content/60">Propostas: </span>
                          <span className="font-semibold text-primary">{licitacao.propostas}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-sm btn-outline gap-2">
                        <EyeIcon className="w-4 h-4" />
                        Ver
                      </button>
                      <button className="btn btn-sm btn-outline gap-2">
                        <PencilIcon className="w-4 h-4" />
                        Editar
                      </button>
                      <Link href={`/governo/propostas/${licitacao.id}`}>
                        <button className="btn btn-sm btn-primary gap-2">Ver Propostas ({licitacao.propostas})</button>
                      </Link>
                      <button className="btn btn-sm btn-error btn-outline gap-2">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-base-200 rounded-2xl p-8 max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhuma licitação encontrada</h3>
                <p className="text-base-content/60 mb-4">Você ainda não criou nenhuma licitação</p>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Criar Primeira Licitação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criar Licitação */}
      <ModalCriarLicitacao isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GovernoLicitacoes;
