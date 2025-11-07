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
    name: "",
    contractingParty: "",
    description: "",
    initialValue: "",
    closingDate: "",
    closingTime: "",
    category: "",
    documents: "",
    requirements: "",
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

    if (!formData.name.trim()) newErrors.name = "Bid name is required";
    if (!formData.contractingParty.trim()) newErrors.contractingParty = "Contracting party is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.initialValue) newErrors.initialValue = "Initial value is required";
    if (!formData.closingDate) newErrors.closingDate = "Closing date is required";
    if (!formData.closingTime) newErrors.closingTime = "Closing time is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Bid created:", formData);
      alert("Bid created successfully!");
      // Redirect to bids list
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
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-primary-content mb-2">Create New Bid</h1>
          <p className="text-primary-content/80">Fill in the public bid data</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card - Basic Information */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-primary" />
                Basic Information
              </h2>

              {/* Bid Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Bid Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Highway Bridge Construction"
                  className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && <span className="text-error text-sm mt-1">{errors.name}</span>}
              </div>

              {/* Contracting Party */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Contracting Party *</span>
                </label>
                <div className="relative">
                  <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                  <input
                    type="text"
                    name="contractingParty"
                    value={formData.contractingParty}
                    onChange={handleInputChange}
                    placeholder="Ex: City Hall of Belo Horizonte"
                    className={`input input-bordered w-full pl-10 ${errors.contractingParty ? "input-error" : ""}`}
                  />
                </div>
                {errors.contractingParty && <span className="text-error text-sm mt-1">{errors.contractingParty}</span>}
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category *</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`}
                >
                  <option value="">Select a category</option>
                  <option value="obras">Works and Civil Construction</option>
                  <option value="equipamentos">Equipment and Materials</option>
                  <option value="servicos">General Services</option>
                  <option value="tecnologia">Technology and IT</option>
                  <option value="saude">Health</option>
                  <option value="educacao">Education</option>
                  <option value="transporte">Transport and Logistics</option>
                  <option value="outros">Others</option>
                </select>
                {errors.category && <span className="text-error text-sm mt-1">{errors.category}</span>}
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Detailed Description *</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe in detail the subject of the bid, including technical specifications, quantity, execution deadline, etc."
                  className={`textarea textarea-bordered h-32 ${errors.description ? "textarea-error" : ""}`}
                />
                {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
              </div>
            </div>
          </div>

          {/* Card - Values and Deadlines */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                Values and Deadlines
              </h2>

              {/* Initial Value */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Estimated Initial Value (R$) *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60">R$</span>
                  <input
                    type="number"
                    name="initialValue"
                    value={formData.initialValue}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                    className={`input input-bordered w-full pl-10 ${errors.initialValue ? "input-error" : ""}`}
                  />
                </div>
                {errors.initialValue && <span className="text-error text-sm mt-1">{errors.initialValue}</span>}
              </div>

              {/* Closing Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Closing Date *</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                    <input
                      type="date"
                      name="closingDate"
                      value={formData.closingDate}
                      onChange={handleInputChange}
                      className={`input input-bordered w-full pl-10 ${errors.closingDate ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.closingDate && (
                    <span className="text-error text-sm mt-1">{errors.closingDate}</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Closing Time *</span>
                  </label>
                  <input
                    type="time"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full ${errors.closingTime ? "input-error" : ""}`}
                  />
                  {errors.closingTime && (
                    <span className="text-error text-sm mt-1">{errors.closingTime}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card - Requirements and Documents */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Requirements and Documentation</h2>

              {/* Requirements */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Participation Requirements</span>
                  <span className="label-text-alt text-base-content/60">Optional</span>
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="List the requirements needed to participate in this bid (certifications, previous experience, etc.)"
                  className="textarea textarea-bordered h-24"
                />
              </div>

              {/* Required Documents */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Required Documents</span>
                  <span className="label-text-alt text-base-content/60">Optional</span>
                </label>
                <textarea
                  name="documents"
                  value={formData.documents}
                  onChange={handleInputChange}
                  placeholder="List the documents that must be submitted by participants"
                  className="textarea textarea-bordered h-24"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/governo/dashboard">
              <button type="button" className="btn btn-ghost w-full sm:w-auto">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn btn-primary w-full sm:w-auto gap-2">
              <DocumentTextIcon className="w-5 h-5" />
              Create Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarLicitacao;
