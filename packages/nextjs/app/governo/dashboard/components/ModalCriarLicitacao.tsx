"use client";

import { useState } from "react";
import { BuildingOfficeIcon, CalendarIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type ModalCriarLicitacaoProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export const ModalCriarLicitacao = ({ isOpen, onClose, onSuccess }: ModalCriarLicitacaoProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contractingParty: "",
    description: "",
    initialValue: "",
    closingDate: "",
    closingTime: "",
    category: "",
    minRequiredCapacity: "",
    documents: "",
    requirements: "",
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

    if (!formData.name.trim()) newErrors.name = "Bid name is required";
    if (!formData.contractingParty.trim()) newErrors.contractingParty = "Contracting party is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.initialValue) newErrors.initialValue = "Initial value is required";
    if (!formData.closingDate) newErrors.closingDate = "Closing date is required";
    if (!formData.closingTime) newErrors.closingTime = "Closing time is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.minRequiredCapacity) newErrors.minRequiredCapacity = "Minimum capacity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log("🔷 Creating auction on blockchain...");

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create an auction");
        return;
      }

      // Calculate duration in seconds (from closing date/time)
      const closingDateTime = new Date(`${formData.closingDate}T${formData.closingTime}`);
      const now = new Date();
      const durationInSeconds = Math.floor((closingDateTime.getTime() - now.getTime()) / 1000);

      if (durationInSeconds <= 0) {
        alert("Closing date/time must be in the future");
        setIsSubmitting(false);
        return;
      }

      // Convert maxBudget to Wei (assuming value is in ETH or similar)
      // 1 ETH = 10^18 Wei
      const maxBudgetInWei = BigInt(Math.floor(Number(formData.initialValue) * 1e18)).toString();

      const payload = {
        maxBudget: maxBudgetInWei,
        duration: durationInSeconds,
        minRequiredCapacity: Number(formData.minRequiredCapacity),
        description: formData.description,
      };

      console.log("📊 Payload:", payload);

      const response = await fetch(`${API_BASE_URL}/auction/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Error creating auction:", data);
        alert(data?.message || data?.error || "Failed to create auction");
        return;
      }

      console.log("✅ Auction created successfully!");
      console.log("📊 Auction data:", data);

      alert(
        `Auction created successfully!\n\n${data.message || "Auction registered on blockchain"}\n\nCheck the console for details.`,
      );

      // Clear form
      setFormData({
        name: "",
        contractingParty: "",
        description: "",
        initialValue: "",
        closingDate: "",
        closingTime: "",
        category: "",
        minRequiredCapacity: "",
        documents: "",
        requirements: "",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("❌ Error creating auction:", error);
      alert(error instanceof Error ? error.message : "Failed to create auction. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                  <h2 className="text-2xl font-bold text-white">New Bid</h2>
                  <p className="text-sm text-white/80">Blockchain Registration</p>
                </div>
              </div>
              <button onClick={onClose} className="btn btn-sm btn-ghost text-white hover:bg-white/20">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    Basic Information
                  </h3>

                  {/* Name */}
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
                        placeholder="Ex: City Hall"
                        className={`input input-bordered w-full pl-10 ${errors.contractingParty ? "input-error" : ""}`}
                      />
                    </div>
                    {errors.contractingParty && (
                      <span className="text-error text-sm mt-1">{errors.contractingParty}</span>
                    )}
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
                      <span className="label-text font-semibold">Description *</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the subject of the bid..."
                      className={`textarea textarea-bordered h-24 ${errors.description ? "textarea-error" : ""}`}
                    />
                    {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
                  </div>
                </div>

                {/* Values and Deadlines */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Values and Deadlines
                  </h3>

                  {/* Value */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Maximum Budget (ETH) *</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60">
                        ETH
                      </span>
                      <input
                        type="number"
                        name="initialValue"
                        value={formData.initialValue}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className={`input input-bordered w-full pl-12 ${errors.initialValue ? "input-error" : ""}`}
                      />
                    </div>
                    {errors.initialValue && <span className="text-error text-sm mt-1">{errors.initialValue}</span>}
                  </div>

                  {/* Minimum Required Capacity */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Minimum Required Capacity *</span>
                    </label>
                    <input
                      type="number"
                      name="minRequiredCapacity"
                      value={formData.minRequiredCapacity}
                      onChange={handleInputChange}
                      placeholder="500000"
                      min="0"
                      className={`input input-bordered w-full ${errors.minRequiredCapacity ? "input-error" : ""}`}
                    />
                    {errors.minRequiredCapacity && (
                      <span className="text-error text-sm mt-1">{errors.minRequiredCapacity}</span>
                    )}
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Minimum financial capacity required from bidders
                      </span>
                    </label>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Date *</span>
                      </label>
                      <input
                        type="date"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleInputChange}
                        className={`input input-bordered w-full ${errors.closingDate ? "input-error" : ""}`}
                      />
                      {errors.closingDate && <span className="text-error text-sm mt-1">{errors.closingDate}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Time *</span>
                      </label>
                      <input
                        type="time"
                        name="closingTime"
                        value={formData.closingTime}
                        onChange={handleInputChange}
                        className={`input input-bordered w-full ${errors.closingTime ? "input-error" : ""}`}
                      />
                      {errors.closingTime && <span className="text-error text-sm mt-1">{errors.closingTime}</span>}
                    </div>
                  </div>
                </div>

                {/* Documents (Optional) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Requirements and Documents</span>
                    <span className="label-text-alt text-base-content/60">Optional</span>
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="List requirements and necessary documents..."
                    className="textarea textarea-bordered h-20"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-base-300">
                <button type="button" onClick={onClose} className="btn btn-ghost flex-1" disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1 gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating on Blockchain...
                    </>
                  ) : (
                    <>
                      <DocumentTextIcon className="w-5 h-5" />
                      Create Auction
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
