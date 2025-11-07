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
 * Decodifica um JWT (mock - substitua com biblioteca real)
 * TODO: Use jwt-decode ou outra biblioteca para decodificar JWT real
 */
export const decodeToken = (token: string): { userType: UserType; email: string } | null => {
  try {
    // MOCK: Em produção, use jwt-decode
    // const decoded = jwtDecode(token);
    // return decoded;

    // Por enquanto, retorna mock (token será usado quando implementar jwt-decode)
    console.log("Token recebido:", token);
    return {
      userType: "participante",
      email: "user@example.com",
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
