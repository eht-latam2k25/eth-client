/**
 * Utilitários de Autenticação
 * Gerencia JWT e tipo de usuário
 */

export type UserType = "governo" | "participante";

/**
 * Salva o token JWT no localStorage
 */
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
};

/**
 * Obtém o token JWT do localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

/**
 * Remove o token JWT do localStorage
 */
export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
  }
};

/**
 * Salva o tipo de usuário no localStorage
 */
export const setUserType = (userType: UserType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userType", userType);
  }
};

/**
 * Obtém o tipo de usuário do localStorage
 */
export const getUserType = (): UserType | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userType") as UserType | null;
  }
  return null;
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Verifica se o usuário é do governo
 */
export const isGoverno = (): boolean => {
  return getUserType() === "governo";
};

/**
 * Verifica se o usuário é participante
 */
export const isParticipante = (): boolean => {
  return getUserType() === "participante";
};

/**
 * Faz logout do usuário
 */
export const logout = () => {
  removeAuthToken();
  if (typeof window !== "undefined") {
    window.location.href = "/auth";
  }
};

/**
 * Decodifica um JWT e extrai informações do usuário
 */
export const decodeToken = (
  token: string,
): {
  userId: string;
  username: string;
  walletAddress: string;
  universalAddress: string;
  accessLevel: number;
  userType: UserType;
} | null => {
  try {
    // Decodifica JWT manualmente (parte do payload está entre os pontos)
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    // Decodifica a parte do payload (base64url)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const decoded = JSON.parse(jsonPayload);
    console.log("📊 Token decodificado:", decoded);

    // Converte accessLevel para userType
    // accessLevel 1 = participante (usuário normal)
    // accessLevel 2 = governo (empresa)
    const userType: UserType = decoded.accessLevel === 2 ? "governo" : "participante";

    return {
      userId: decoded.userId,
      username: decoded.username,
      walletAddress: decoded.walletAddress,
      universalAddress: decoded.universalAddress,
      accessLevel: decoded.accessLevel,
      userType,
    };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
};

/**
 * Redireciona para o dashboard correto baseado no tipo de usuário
 */
export const redirectToDashboard = () => {
  const userType = getUserType();

  if (typeof window !== "undefined") {
    if (userType === "governo") {
      window.location.href = "/governo/dashboard";
    } else if (userType === "participante") {
      window.location.href = "/participante/dashboard";
    } else {
      window.location.href = "/auth";
    }
  }
};
