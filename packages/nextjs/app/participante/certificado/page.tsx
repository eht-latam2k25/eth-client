"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const CertificadoPage: NextPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [formData, setFormData] = useState({
    cnpj: "",
    enterpriseValue: "",
  });
  const [errors, setErrors] = useState({
    cnpj: "",
    enterpriseValue: "",
  });
  const [certificateData, setCertificateData] = useState<{
    cid: string;
    ipfsUrl: string;
    submittedAt: number;
    cnpj: string;
    enterpriseValue: number;
  } | null>(null);

  useEffect(() => {
    // Check certificate status from backend
    const checkCertificateStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/bid/certificate-status`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("📊 Certificate status:", data);

          if (data.hasCertificate && data.certificateStatus) {
            const certificate = {
              cid: data.cid,
              ipfsUrl: `https://ipfs.io/ipfs/${data.cid}`,
              submittedAt: Date.now() / 1000, // Current timestamp as fallback
              cnpj: data.cnpj,
              enterpriseValue: data.enterpriseValue,
            };

            // Update localStorage
            localStorage.setItem("digitalCertificate", JSON.stringify(certificate));
            setCertificateData(certificate);
            setHasCertificate(true);
          } else {
            // Clear localStorage if no certificate on backend
            localStorage.removeItem("digitalCertificate");
            setHasCertificate(false);
            setCertificateData(null);
          }
        }
      } catch (error) {
        console.error("Error checking certificate status:", error);
        // Fallback to localStorage
        const storedCertificate = localStorage.getItem("digitalCertificate");
        if (storedCertificate) {
          try {
            const cert = JSON.parse(storedCertificate);
            setCertificateData(cert);
            setHasCertificate(true);
          } catch (parseError) {
            console.error("Error parsing certificate:", parseError);
          }
        }
      }
    };

    checkCertificateStatus();
  }, []);

  const validateForm = () => {
    const newErrors = {
      cnpj: "",
      enterpriseValue: "",
    };
    let isValid = true;

    // Validate CNPJ (basic validation - 14 digits)
    const cnpjClean = formData.cnpj.replace(/\D/g, "");
    if (!cnpjClean) {
      newErrors.cnpj = "CNPJ is required";
      isValid = false;
    } else if (cnpjClean.length !== 14) {
      newErrors.cnpj = "CNPJ must have 14 digits";
      isValid = false;
    }

    // Validate enterprise value
    if (!formData.enterpriseValue) {
      newErrors.enterpriseValue = "Enterprise value is required";
      isValid = false;
    } else if (isNaN(Number(formData.enterpriseValue)) || Number(formData.enterpriseValue) <= 0) {
      newErrors.enterpriseValue = "Enter a valid value";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmitCertificate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log("🔷 Submitting digital certificate...");

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit a certificate");
        router.push("/auth");
        return;
      }

      const cnpjClean = formData.cnpj.replace(/\D/g, "");

      const response = await fetch(`${API_BASE_URL}/bid/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cnpj: cnpjClean,
          enterpriseValue: Number(formData.enterpriseValue),
          metadata: {
            type: "digital_certificate",
            purpose: "company_qualification",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Error submitting certificate:", data);
        alert(data?.message || data?.error || "Failed to submit certificate");
        return;
      }

      console.log("✅ Certificate submitted successfully!");
      console.log("📊 Certificate data:", data);

      // Store certificate data
      const certificate = {
        cid: data.cid,
        ipfsUrl: data.viewOnIPFS,
        submittedAt: data.submittedAt,
        cnpj: cnpjClean,
        enterpriseValue: Number(formData.enterpriseValue),
      };

      localStorage.setItem("digitalCertificate", JSON.stringify(certificate));
      setCertificateData(certificate);
      setHasCertificate(true);

      alert(
        `Digital Certificate created successfully!\n\nCID: ${data.cid}\n\nYou can now participate in any public bid.`,
      );
    } catch (error) {
      console.error("❌ Error submitting certificate:", error);
      alert(error instanceof Error ? error.message : "Failed to submit certificate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeCertificate = () => {
    if (confirm("Are you sure you want to revoke your certificate? You will need to create a new one.")) {
      localStorage.removeItem("digitalCertificate");
      setCertificateData(null);
      setHasCertificate(false);
      setFormData({ cnpj: "", enterpriseValue: "" });
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.push("/participante/dashboard")}
            className="btn btn-ghost btn-sm gap-2 mb-4 text-white"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="w-10 h-10 text-primary-content" />
            <div>
              <h1 className="text-3xl font-bold text-primary-content">Digital Certificate</h1>
              <p className="text-primary-content/80">Company qualification for public bids</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasCertificate ? (
          <div className="space-y-6">
            {/* Info Card */}
            <div className="alert alert-info">
              <ShieldCheckIcon className="w-6 h-6" />
              <div>
                <h3 className="font-bold">Why do I need a Digital Certificate?</h3>
                <p className="text-sm">
                  The digital certificate is a one-time requirement that qualifies your company to participate in public
                  bids. Once obtained, you can use it for all future bids without needing to resubmit.
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="card bg-base-100 border-2 border-primary shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <DocumentCheckIcon className="w-7 h-7 text-primary" />
                  Obtain Your Certificate
                </h2>

                <p className="text-base-content/70 mb-6">
                  Submit your company information to receive a digital certificate stored on IPFS. This certificate will
                  be permanently associated with your account.
                </p>

                <form onSubmit={handleSubmitCertificate} className="space-y-6">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Company CNPJ</span>
                    </label>
                    <input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      placeholder="00.000.000/0000-00"
                      className={`input input-bordered w-full ${errors.cnpj ? "input-error" : ""}`}
                    />
                    {errors.cnpj && <p className="text-error text-sm mt-1">{errors.cnpj}</p>}
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Your company&apos;s tax identification number
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Enterprise Value (R$)</span>
                    </label>
                    <input
                      type="number"
                      name="enterpriseValue"
                      value={formData.enterpriseValue}
                      onChange={handleInputChange}
                      placeholder="1000000"
                      className={`input input-bordered w-full ${errors.enterpriseValue ? "input-error" : ""}`}
                    />
                    {errors.enterpriseValue && <p className="text-error text-sm mt-1">{errors.enterpriseValue}</p>}
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Your company&apos;s total estimated value
                      </span>
                    </label>
                  </div>

                  <div className="divider"></div>

                  <button type="submit" className="btn btn-primary w-full gap-2 btn-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-md"></span>
                        Creating Certificate...
                      </>
                    ) : (
                      <>
                        <ShieldCheckIcon className="w-6 h-6" />
                        Create Digital Certificate
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Card */}
            <div className="alert alert-success">
              <CheckCircleIcon className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">Certificate Active!</h3>
                <p className="text-sm">Your company is qualified to participate in public bids.</p>
              </div>
            </div>

            {/* Certificate Details Card */}
            <div className="card bg-base-100 border-2 border-success shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <ShieldCheckIcon className="w-7 h-7 text-success" />
                  Your Digital Certificate
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-base-content/60 mb-1">CNPJ</p>
                      <p className="font-mono text-lg font-bold">
                        {certificateData?.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/60 mb-1">Enterprise Value</p>
                      <p className="text-lg font-bold">R$ {certificateData?.enterpriseValue.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-base-content/60 mb-1">Certificate CID</p>
                      <p className="font-mono text-sm break-all bg-base-200 p-2 rounded">{certificateData?.cid}</p>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/60 mb-1">Issued At</p>
                      <p className="text-lg font-bold">
                        {certificateData?.submittedAt
                          ? new Date(certificateData.submittedAt * 1000).toLocaleString("pt-BR")
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={certificateData?.ipfsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary flex-1 gap-2"
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    View on IPFS
                  </a>

                  <button onClick={handleRevokeCertificate} className="btn btn-outline btn-error flex-1 gap-2">
                    Revoke Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body">
                <h3 className="card-title">Next Steps</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Browse available public bids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Submit proposals for bids of your interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Track your proposal status in your dashboard</span>
                  </li>
                </ul>

                <div className="card-actions justify-end mt-4">
                  <button onClick={() => router.push("/licitacoes")} className="btn btn-primary gap-2">
                    Browse Bids
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificadoPage;
