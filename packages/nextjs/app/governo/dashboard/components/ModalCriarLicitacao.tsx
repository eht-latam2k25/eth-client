"use client";

import { useState } from "react";
import { BuildingOfficeIcon, CalendarIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";

type ModalCriarLicitacaoProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalCriarLicitacao = ({ isOpen, onClose }: ModalCriarLicitacaoProps) => {
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
      alert("Licitação criada com sucesso e registrada na blockchain!");
      // Limpar formulário
      setFormData({
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
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Nova Licitação</h2>
                  <p className="text-sm text-white/80">Registro em Blockchain</p>
                </div>
              </div>
              <button onClick={onClose} className="btn btn-sm btn-ghost text-white hover:bg-white/20">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    Informações Básicas
                  </h3>

                  {/* Nome */}
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

                  {/* Contratante */}
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
                        placeholder="Ex: Prefeitura Municipal"
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
                      <span className="label-text font-semibold">Descrição *</span>
                    </label>
                    <textarea
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      placeholder="Descreva o objeto da licitação..."
                      className={`textarea textarea-bordered h-24 ${errors.descricao ? "textarea-error" : ""}`}
                    />
                    {errors.descricao && <span className="text-error text-sm mt-1">{errors.descricao}</span>}
                  </div>
                </div>

                {/* Valores e Prazos */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Valores e Prazos
                  </h3>

                  {/* Valor */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Valor Inicial (R$) *</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60">
                        R$
                      </span>
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

                  {/* Data e Hora */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Data *</span>
                      </label>
                      <input
                        type="date"
                        name="dataEncerramento"
                        value={formData.dataEncerramento}
                        onChange={handleInputChange}
                        className={`input input-bordered w-full ${errors.dataEncerramento ? "input-error" : ""}`}
                      />
                      {errors.dataEncerramento && (
                        <span className="text-error text-sm mt-1">{errors.dataEncerramento}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Hora *</span>
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

                {/* Documentos (Opcional) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Requisitos e Documentos</span>
                    <span className="label-text-alt text-base-content/60">Opcional</span>
                  </label>
                  <textarea
                    name="requisitos"
                    value={formData.requisitos}
                    onChange={handleInputChange}
                    placeholder="Liste requisitos e documentos necessários..."
                    className="textarea textarea-bordered h-20"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-base-300">
                <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary flex-1 gap-2">
                  <DocumentTextIcon className="w-5 h-5" />
                  Criar Licitação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
