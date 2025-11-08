"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// Mock bid data - In production, this would come from an API
const bidsMock: Record<
  string,
  {
    id: number;
    name: string;
    contractingParty: string;
    description: string;
    initialValue: string;
    closingDate: string;
    status: string;
    requirements: string[];
    documents: string[];
  }
> = {
  "1": {
    id: 1,
    name: "Highway Bridge Construction",
    contractingParty: "City Hall of Belo Horizonte",
    description:
      "Construction of a highway bridge over the Velhas River, including environmental impact studies, executive design and construction execution. The bridge will be 450 meters long with capacity for heavy traffic.",
    initialValue: "R$ 15.000.000,00",
    closingDate: "December 15, 2024 at 14:00",
    status: "open",
    requirements: [
      "Valid CNPJ registration",
      "Technical qualification certificate",
      "Financial capacity proof",
      "Previous experience in similar projects",
      "Environmental compliance certificate",
    ],
    documents: [
      "Technical proposal",
      "Price proposal",
      "Company registration documents",
      "Technical team qualification",
      "Work execution schedule",
    ],
  },
  "2": {
    id: 2,
    name: "Medical Equipment Supply",
    contractingParty: "Hospital das Clínicas",
    description:
      "Acquisition of hospital medical equipment including 5 magnetic resonance imaging machines, 10 computed tomography scanners and ICU equipment. Includes installation, training and 3-year warranty.",
    initialValue: "R$ 8.500.000,00",
    closingDate: "December 22, 2024 at 16:30",
    status: "open",
    requirements: [
      "Valid CNPJ registration",
      "Medical equipment supplier certification",
      "ISO 9001 quality certificate",
      "Authorized distributor certificate",
      "Technical support team proof",
    ],
    documents: [
      "Equipment technical specifications",
      "Price proposal with warranty",
      "Installation and training plan",
      "Company registration documents",
      "After-sales support plan",
    ],
  },
  "3": {
    id: 3,
    name: "Municipal School Renovation",
    contractingParty: "Education Department",
    description:
      "Complete renovation of Santos Dumont Municipal School, including modernization of classrooms, construction of computer lab, covered sports court and full accessibility.",
    initialValue: "R$ 2.300.000,00",
    closingDate: "January 10, 2025 at 10:00",
    status: "open",
    requirements: [
      "Valid CNPJ registration",
      "Construction company certification",
      "Previous school renovation experience",
      "Safety and health compliance",
      "Environmental license",
    ],
    documents: [
      "Technical proposal",
      "Price proposal",
      "Work execution schedule",
      "Technical team qualification",
      "Safety plan",
    ],
  },
  "4": {
    id: 4,
    name: "LED Public Lighting System",
    contractingParty: "City Hall of São Paulo",
    description:
      "Replacement of 50,000 public lighting points with LED technology throughout the city, including preventive and corrective maintenance for 5 years. System with remote control and monitoring.",
    initialValue: "R$ 45.000.000,00",
    closingDate: "December 28, 2024 at 11:00",
    status: "open",
    requirements: [
      "Valid CNPJ registration",
      "Electrical systems certification",
      "ISO 9001 quality certificate",
      "Previous large-scale project experience",
      "Technical support team proof",
    ],
    documents: [
      "Technical proposal with LED specifications",
      "Price proposal with maintenance plan",
      "Implementation schedule",
      "Monitoring system documentation",
      "Warranty and support plan",
    ],
  },
  "5": {
    id: 5,
    name: "Urban Road Paving",
    contractingParty: "City Hall of Contagem",
    description:
      "Asphalt paving of 25km of urban roads in various city neighborhoods, including drainage, horizontal and vertical signage, and accessible sidewalks according to current standards.",
    initialValue: "R$ 12.750.000,00",
    closingDate: "January 5, 2025 at 15:00",
    status: "open",
    requirements: [
      "Valid CNPJ registration",
      "Road construction certification",
      "Previous paving experience",
      "Environmental compliance",
      "Safety and health compliance",
    ],
    documents: [
      "Technical proposal",
      "Price proposal",
      "Work execution schedule",
      "Technical team qualification",
      "Environmental management plan",
    ],
  },
};

const BidDetails: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const bidId = params?.id as string;
  const bid = bidsMock[bidId as keyof typeof bidsMock];

  const [hasCertificate, setHasCertificate] = useState(false);
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
      if (!token) {
        // If not logged in, check localStorage as fallback
        const storedCertificate = localStorage.getItem("digitalCertificate");
        if (storedCertificate) {
          try {
            const cert = JSON.parse(storedCertificate);
            setCertificateData(cert);
            setHasCertificate(true);
          } catch (error) {
            console.error("Error parsing certificate:", error);
          }
        }
        return;
      }

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

          if (data.hasCertificate && data.certificateStatus && data.canBid) {
            const certificate = {
              cid: data.cid,
              ipfsUrl: `https://ipfs.io/ipfs/${data.cid}`,
              submittedAt: Date.now() / 1000,
              cnpj: data.cnpj,
              enterpriseValue: data.enterpriseValue,
            };

            // Update localStorage
            localStorage.setItem("digitalCertificate", JSON.stringify(certificate));
            setCertificateData(certificate);
            setHasCertificate(true);
          } else {
            // Clear localStorage if no valid certificate on backend
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

  if (!bid) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bid not found</h1>
          <button onClick={() => router.push("/licitacoes")} className="btn btn-primary">
            Back to Bids
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => router.push("/licitacoes")} className="btn btn-ghost btn-sm gap-2 mb-4 text-white">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Bids
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="badge badge-success">Open</span>
                <h1 className="text-3xl font-bold text-primary-content">{bid.name}</h1>
              </div>
              <div className="flex items-center gap-2 text-primary-content/80">
                <BuildingOfficeIcon className="w-5 h-5" />
                <span>{bid.contractingParty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-3">Description</h2>
                <p className="text-base-content/80 leading-relaxed">{bid.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {bid.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base-content/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Documents */}
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-3">Required Documents</h2>
                <ul className="space-y-2">
                  {bid.documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base-content/80">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bid info */}
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body">
                <h3 className="font-bold text-lg mb-4">Bid Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/60">Initial Value</p>
                      <p className="font-bold">{bid.initialValue}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <ClockIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/60">Closes on</p>
                      <p className="font-bold">{bid.closingDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/60">Status</p>
                      <p className="font-bold capitalize">{bid.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate status */}
            <div className="card bg-base-100 border-2 border-primary">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-lg">Digital Certificate</h3>
                </div>

                {!hasCertificate ? (
                  <>
                    <div className="alert alert-warning mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-bold">Certificate Required</h4>
                        <p className="text-sm">You need a digital certificate to submit proposals.</p>
                      </div>
                    </div>

                    <p className="text-sm text-base-content/70 mb-4">
                      Obtain your digital certificate once and use it for all public bids. The certificate is stored on
                      IPFS and permanently associated with your account.
                    </p>

                    <button
                      onClick={() => router.push("/participante/certificado")}
                      className="btn btn-primary w-full gap-2"
                    >
                      <ShieldCheckIcon className="w-5 h-5" />
                      Get Digital Certificate
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="alert alert-success">
                      <CheckCircleIcon className="w-6 h-6" />
                      <div>
                        <h4 className="font-bold">Certificate Active!</h4>
                        <p className="text-sm">You&apos;re qualified to submit proposals.</p>
                      </div>
                    </div>

                    <div className="bg-base-200 p-3 rounded-lg space-y-2">
                      <div>
                        <p className="text-xs text-base-content/60">CNPJ</p>
                        <p className="font-mono text-sm">
                          {certificateData?.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-base-content/60">Certificate CID</p>
                        <p className="font-mono text-xs break-all">{certificateData?.cid}</p>
                      </div>
                    </div>

                    <a
                      href={certificateData?.ipfsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm w-full gap-2"
                    >
                      <DocumentTextIcon className="w-4 h-4" />
                      View Certificate
                    </a>

                    <div className="divider"></div>

                    <button className="btn btn-primary w-full gap-2 btn-lg">
                      <DocumentCheckIcon className="w-6 h-6" />
                      Submit Proposal
                    </button>
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

export default BidDetails;
