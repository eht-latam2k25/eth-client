"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type UserType, isAuthenticated, isGoverno, isParticipante } from "~~/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: UserType;
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, requiredUserType, redirectTo = "/auth" }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Verifica se está autenticado
      if (!isAuthenticated()) {
        console.log("❌ Usuário não autenticado, redirecionando para:", redirectTo);
        router.push(redirectTo);
        return;
      }

      // Se há um tipo de usuário requerido, verifica
      if (requiredUserType) {
        if (requiredUserType === "governo" && !isGoverno()) {
          console.log("❌ Acesso negado: usuário não é do governo");
          router.push("/auth");
          return;
        }

        if (requiredUserType === "participante" && !isParticipante()) {
          console.log("❌ Acesso negado: usuário não é participante");
          router.push("/auth");
          return;
        }
      }

      console.log("✅ Acesso autorizado para:", pathname);
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname, requiredUserType, redirectTo]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autorizado, não renderiza nada (já redirecionou)
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
