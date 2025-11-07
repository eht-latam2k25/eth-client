"use client";

import { CubeTransparentIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useBaseAccount } from "~~/hooks/useBaseAccount";

/**
 * Componente para conectar BASE Account
 * Mostra status da conexão e permite conectar/desconectar
 */
export const BaseAccountConnect = () => {
  const { universalAddress, subAccount, isConnected, isLoading, error, initialize, disconnect } = useBaseAccount();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && universalAddress && subAccount) {
    return (
      <div className="card bg-base-100 border border-primary/30">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2">
              <CubeTransparentIcon className="w-5 h-5 text-primary" />
              BASE Account Conectada
            </h3>
            <button onClick={disconnect} className="btn btn-sm btn-ghost text-error">
              Desconectar
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="bg-base-200 p-3 rounded-lg">
              <div className="text-xs text-base-content/60 mb-1">Universal Account</div>
              <div className="font-mono font-semibold">{formatAddress(universalAddress)}</div>
            </div>

            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <div className="text-xs text-base-content/60 mb-1">Sub Account (App)</div>
              <div className="font-mono font-semibold text-primary">{formatAddress(subAccount.address)}</div>
            </div>
          </div>

          <div className="alert alert-info mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-xs">Transações serão feitas via Sub Account</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 border-2 border-dashed border-base-300">
      <div className="card-body p-6 text-center">
        <CubeTransparentIcon className="w-12 h-12 mx-auto text-primary mb-3" />

        <h3 className="font-bold text-lg mb-2">Conectar BASE Account</h3>
        <p className="text-sm text-base-content/70 mb-4">
          Conecte sua conta BASE para interagir com licitações na blockchain
        </p>

        {error && (
          <div className="alert alert-error mb-4">
            <span className="text-xs">{error}</span>
          </div>
        )}

        <button
          onClick={initialize}
          disabled={isLoading}
          className={`btn btn-primary gap-2 ${isLoading ? "loading" : ""}`}
        >
          {!isLoading && <LinkIcon className="w-5 h-5" />}
          {isLoading ? "Conectando..." : "Conectar BASE Account"}
        </button>

        <p className="text-xs text-base-content/60 mt-3">Será criada uma Sub Account dedicada para esta aplicação</p>
      </div>
    </div>
  );
};
