"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const CriarLicitacao: NextPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    contratante: "",
    descricao: "",
    valorInicial: "",
    dataEncerramento: "",
    horaEncerramento: "",
    categoria: "",
    documentos: "",
    requisitos: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome da licitação é obrigatório";
    if (!formData.contratante.trim()) newErrors.contratante = "Órgão contratante é obrigatório";
    if (!formData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    if (!formData.valorInicial) newErrors.valorInicial = "Valor inicial é obrigatório";
    if (!formData.dataEncerramento) newErrors.dataEncerramento = "Data de encerramento é obrigatória";
    if (!formData.horaEncerramento) newErrors.horaEncerramento = "Hora de encerramento é obrigatória";
    if (!formData.categoria) newErrors.categoria = "Categoria é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Licitação criada:", formData);
      alert("Licitação criada com sucesso!");
      // Redirecionar para lista de licitações
      window.location.href = "/governo/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/governo/dashboard"
            className="inline-flex items-center gap-2 text-primary-content hover:text-primary-content/80 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-primary-content mb-2">Criar Nova Licitação</h1>
          <p className="text-primary-content/80">Preencha os dados da licitação pública</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card - Informações Básicas */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-primary" />
                Informações Básicas
              </h2>

              {/* Nome da Licitação */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Nome da Licitação *</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Ex: Construção de Ponte Rodoviária"
                  className={`input input-bordered w-full ${errors.nome ? "input-error" : ""}`}
                />
                {errors.nome && <span className="text-error text-sm mt-1">{errors.nome}</span>}
              </div>

              {/* Órgão Contratante */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Órgão Contratante *</span>
                </label>
                <div className="relative">
                  <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                  <input
                    type="text"
                    name="contratante"
                    value={formData.contratante}
                    onChange={handleInputChange}
                    placeholder="Ex: Prefeitura Municipal de Belo Horizonte"
                    className={`input input-bordered w-full pl-10 ${errors.contratante ? "input-error" : ""}`}
                  />
                </div>
                {errors.contratante && <span className="text-error text-sm mt-1">{errors.contratante}</span>}
              </div>

              {/* Categoria */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Categoria *</span>
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className={`select select-bordered w-full ${errors.categoria ? "select-error" : ""}`}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="obras">Obras e Construção Civil</option>
                  <option value="equipamentos">Equipamentos e Materiais</option>
                  <option value="servicos">Serviços Gerais</option>
                  <option value="tecnologia">Tecnologia e TI</option>
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="transporte">Transporte e Logística</option>
                  <option value="outros">Outros</option>
                </select>
                {errors.categoria && <span className="text-error text-sm mt-1">{errors.categoria}</span>}
              </div>

              {/* Descrição */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Descrição Detalhada *</span>
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva detalhadamente o objeto da licitação, incluindo especificações técnicas, quantidade, prazo de execução, etc."
                  className={`textarea textarea-bordered h-32 ${errors.descricao ? "textarea-error" : ""}`}
                />
                {errors.descricao && <span className="text-error text-sm mt-1">{errors.descricao}</span>}
              </div>
            </div>
          </div>

          {/* Card - Valores e Prazos */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                Valores e Prazos
              </h2>

              {/* Valor Inicial */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Valor Inicial Estimado (R$) *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60">R$</span>
                  <input
                    type="number"
                    name="valorInicial"
                    value={formData.valorInicial}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                    className={`input input-bordered w-full pl-10 ${errors.valorInicial ? "input-error" : ""}`}
                  />
                </div>
                {errors.valorInicial && <span className="text-error text-sm mt-1">{errors.valorInicial}</span>}
              </div>

              {/* Data e Hora de Encerramento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Data de Encerramento *</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                    <input
                      type="date"
                      name="dataEncerramento"
                      value={formData.dataEncerramento}
                      onChange={handleInputChange}
                      className={`input input-bordered w-full pl-10 ${errors.dataEncerramento ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.dataEncerramento && (
                    <span className="text-error text-sm mt-1">{errors.dataEncerramento}</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Hora de Encerramento *</span>
                  </label>
                  <input
                    type="time"
                    name="horaEncerramento"
                    value={formData.horaEncerramento}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full ${errors.horaEncerramento ? "input-error" : ""}`}
                  />
                  {errors.horaEncerramento && (
                    <span className="text-error text-sm mt-1">{errors.horaEncerramento}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card - Requisitos e Documentos */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Requisitos e Documentação</h2>

              {/* Requisitos */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Requisitos para Participação</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <textarea
                  name="requisitos"
                  value={formData.requisitos}
                  onChange={handleInputChange}
                  placeholder="Liste os requisitos necessários para participar desta licitação (certificações, experiência prévia, etc.)"
                  className="textarea textarea-bordered h-24"
                />
              </div>

              {/* Documentos Necessários */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Documentos Necessários</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <textarea
                  name="documentos"
                  value={formData.documentos}
                  onChange={handleInputChange}
                  placeholder="Liste os documentos que devem ser apresentados pelos participantes"
                  className="textarea textarea-bordered h-24"
                />
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/governo/dashboard">
              <button type="button" className="btn btn-ghost w-full sm:w-auto">
                Cancelar
              </button>
            </Link>
            <button type="submit" className="btn btn-primary w-full sm:w-auto gap-2">
              <DocumentTextIcon className="w-5 h-5" />
              Criar Licitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarLicitacao;
