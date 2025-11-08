"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { getBaseProvider } from "~~/services/base/baseAccountSDK";
import { type UserType, setAuthToken, setUserType } from "~~/utils/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const ensureHexAddress = (address: string, label: string) => {
  if (!address) {
    throw new Error(`${label} is empty`);
  }

  const normalized = address.trim().toLowerCase();

  if (!normalized.startsWith("0x")) {
    throw new Error(`${label} must start with 0x. Received: ${address}`);
  }

  return normalized;
};

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      if (isLogin) {
        console.log("🔐 Iniciando login...");

        try {
          const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          });

          const loginData = await loginResponse.json();

          if (!loginResponse.ok) {
            console.error("❌ Erro ao fazer login:", loginData);
            alert(loginData?.message || loginData?.error || "Failed to login. Please check your credentials.");
            return;
          }

          console.log("✅ Login bem-sucedido!");
          console.log("📊 Dados do usuário:", loginData.user);
          console.log("🔑 Token recebido");

          // Salvar token
          if (loginData.token) {
            setAuthToken(loginData.token);
            localStorage.setItem("token", loginData.token);
          }

          // Salvar dados do usuário
          if (loginData.user) {
            localStorage.setItem("user", JSON.stringify(loginData.user));
            if (loginData.user.walletAddress) {
              localStorage.setItem("subAccount", JSON.stringify({ address: loginData.user.walletAddress }));
            }
            if (loginData.user.universalAddress) {
              localStorage.setItem("universalAddress", loginData.user.universalAddress);
            }
          }

          // Determinar tipo de usuário
          const userType: UserType = formData.username.toLowerCase().startsWith("gov") ? "governo" : "participante";
          setUserType(userType);

          console.log("🎯 Tipo de usuário:", userType);
          console.log("🚀 Redirecionando...");

          window.location.href = userType === "governo" ? "/governo/dashboard" : "/participante/dashboard";
        } catch (error) {
          console.error("❌ Erro ao fazer login:", error);
          alert(
            error instanceof Error ? error.message : "Failed to login. Please check your connection and try again.",
          );
          setIsLoading(false);
        }
      } else {
        console.log("Signup:", {
          username: formData.username,
          password: formData.password,
        });

        try {
          console.log("═══════════════════════════════════════");
          console.log("🔷 CRIANDO CONTA - Processo BASE Account");
          console.log("═══════════════════════════════════════");

          const provider = getBaseProvider();

          // PASSO 1: Conectar conta universal
          console.log("🔄 PASSO 1: Conectando Universal Account...");
          const accounts = (await provider.request({
            method: "eth_requestAccounts",
            params: [],
          })) as string[];

          const universalAddress = ensureHexAddress(accounts[0], "Universal address");
          console.log("✅ Universal Account conectada!");
          console.log("📍 Universal Address:", universalAddress);

          if (typeof window !== "undefined") {
            localStorage.setItem("universalAddress", universalAddress);
          }

          // PASSO 2: Verificar se já existe Sub Account
          console.log("\n🔄 PASSO 2: Verificando Sub Accounts existentes...");
          const result = (await provider.request({
            method: "wallet_getSubAccounts",
            params: [
              {
                account: universalAddress,
                domain: window.location.origin,
              },
            ],
          })) as { subAccounts: Array<{ address: string; type: string }> };

          let subAccountAddress = "";

          if (result.subAccounts && result.subAccounts.length > 0) {
            const existingSub = result.subAccounts[0];
            subAccountAddress = ensureHexAddress(existingSub.address, "Sub account address");

            console.log("✅ Sub Account EXISTENTE encontrada!");
            console.log("📍 Sub Account Address:", subAccountAddress);
            console.log("📦 Dados completos:", existingSub);

            localStorage.setItem("subAccount", JSON.stringify({ ...existingSub, address: subAccountAddress }));
          } else {
            console.log("ℹ️ Nenhuma Sub Account encontrada.");
            console.log("\n🔄 PASSO 3: Criando NOVA Sub Account...");

            const newSubAccount = (await provider.request({
              method: "wallet_addSubAccount",
              params: [
                {
                  account: { type: "create" },
                },
              ],
            })) as { address: string; type: string };

            subAccountAddress = ensureHexAddress(newSubAccount.address, "Sub account address");

            console.log("✅ NOVA Sub Account criada com sucesso!");
            console.log("📍 Sub Account Address:", subAccountAddress);
            console.log("📦 Dados completos:", newSubAccount);

            localStorage.setItem("subAccount", JSON.stringify({ ...newSubAccount, address: subAccountAddress }));
          }

          console.log("\n═══════════════════════════════════════");
          console.log("✅ PROCESSO CONCLUÍDO!");
          console.log("═══════════════════════════════════════");
          console.log("📊 RESUMO:");
          console.log("  • Username:", formData.username);
          console.log("  • Universal Address:", universalAddress);
          console.log("  • Sub Account:", subAccountAddress);
          console.log("═══════════════════════════════════════");

          // Enviar dados para o backend
          const payload = {
            username: formData.username,
            password: formData.password,
            universalAddress,
            walletAddress: subAccountAddress,
          };

          const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const rawResponse = await registerResponse.text();
          let registerData: any = null;
          if (rawResponse) {
            try {
              registerData = JSON.parse(rawResponse);
            } catch (parseError) {
              console.warn("Não foi possível parsear a resposta JSON do backend:", parseError);
            }
          }

          if (!registerResponse.ok) {
            console.error("❌ Erro ao registrar no backend:", registerData ?? rawResponse);
            throw new Error(registerData?.error ?? registerResponse.statusText ?? "Failed to register user in backend");
          }

          console.log("✅ Registro backend concluído:", registerData);

          if (registerData?.token) {
            localStorage.setItem("token", registerData.token);
          }

          const backendUserType = registerData?.userType as UserType | undefined;
          const derivedUserType: UserType = backendUserType
            ? backendUserType
            : formData.username.toLowerCase().startsWith("gov")
              ? "governo"
              : "participante";

          setUserType(derivedUserType);

          alert(
            `Conta criada com sucesso!\n\nSub Account: ${subAccountAddress}\n\nVerifique o console para mais detalhes.`,
          );

          window.location.href = derivedUserType === "governo" ? "/governo/dashboard" : "/participante/dashboard";
        } catch (error) {
          console.error("═══════════════════════════════════════");
          console.error("❌ ERRO ao criar conta e Sub Account:");
          console.error(error);
          console.error("═══════════════════════════════════════");
          alert(
            error instanceof Error
              ? error.message
              : "Erro ao criar conta. Certifique-se de ter uma carteira Web3 instalada (Coinbase Wallet ou MetaMask).",
          );
          setIsLoading(false);
        }
      }
    }
  };

  const toggleMode = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleTabClick = (isLoginMode: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLogin(isLoginMode);
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary py-4 px-6 text-center">
            <h1 className="text-xl font-bold text-primary-content mb-1">
              {isLogin ? "Welcome back!" : "Create your account"}
            </h1>
            <p className="text-sm text-primary-content/80">{isLogin ? "Sign in to continue" : "Join us today"}</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-base-300">
            <button
              type="button"
              onClick={e => handleTabClick(true, e)}
              className={`flex-1 py-3 text-center text-sm font-semibold transition-all ${
                isLogin
                  ? "text-primary border-b-2 border-primary bg-base-200/50"
                  : "text-base-content/60 hover:bg-base-200/30"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={e => handleTabClick(false, e)}
              className={`flex-1 py-3 text-center text-sm font-semibold transition-all ${
                !isLogin
                  ? "text-primary border-b-2 border-primary bg-base-200/50"
                  : "text-base-content/60 hover:bg-base-200/30"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-20">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-11 relative z-0 ${errors.username ? "input-error" : ""}`}
                  placeholder={isLogin ? "Enter your username" : "Choose a username"}
                />
              </div>
              {errors.username && <p className="text-error text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-20">
                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-11 relative z-0 ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field (only for signup) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-20">
                    <LockClosedIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full pl-11 relative z-0 ${errors.confirmPassword ? "input-error" : ""}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Forgot Password Link (only for login) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
                <div className="text-sm">
                  <a href="#" className="link link-primary">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"}</>
              )}
            </button>

            {/* Alternative Action */}
            <div className="text-center">
              <p className="text-sm text-base-content/60">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button type="button" onClick={e => toggleMode(e)} className="link link-primary font-semibold">
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-base-200 px-6 py-4 text-center border-t border-base-300">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-base font-semibold text-base-content/80 hover:text-base-content transition-all duration-200 hover:gap-3"
            >
              <span className="text-lg">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-base-content/60 mt-3">
          By continuing, you agree to our{" "}
          <a href="#" className="link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
