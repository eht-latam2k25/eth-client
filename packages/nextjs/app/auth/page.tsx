"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { baseProvider } from "~~/services/base/baseAccountSDK";
import { type UserType, setUserType } from "~~/utils/auth";

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
      if (isLogin) {
        console.log("Login:", { username: formData.username, password: formData.password });

        // TODO: Aqui você fará a requisição para o backend
        // const response = await fetch('/api/auth/login', { ... });
        // const { token, userType } = response.json();
        // localStorage.setItem('token', token);

        // Mock: Simula resposta do JWT
        // Para teste: usernames começando com "gov" redirecionam para governo
        const userType: UserType = formData.username.toLowerCase().startsWith("gov") ? "governo" : "participante";
        setUserType(userType);

        // Redireciona baseado no tipo de usuário do JWT
        window.location.href = userType === "governo" ? "/governo/dashboard" : "/participante/dashboard";
      } else {
        console.log("Signup:", {
          username: formData.username,
          password: formData.password,
        });

        try {
          console.log("═══════════════════════════════════════");
          console.log("🔷 CRIANDO CONTA - Processo BASE Account");
          console.log("═══════════════════════════════════════");

          // PASSO 1: Conectar conta universal
          console.log("🔄 PASSO 1: Conectando Universal Account...");
          const accounts = (await baseProvider.request({
            method: "eth_requestAccounts",
            params: [],
          })) as string[];

          const universalAddress = accounts[0];
          console.log("✅ Universal Account conectada!");
          console.log("📍 Universal Address:", universalAddress);

          // PASSO 2: Verificar se já existe Sub Account
          console.log("\n🔄 PASSO 2: Verificando Sub Accounts existentes...");
          const result = (await baseProvider.request({
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
            // Já existe Sub Account
            const existingSub = result.subAccounts[0];
            subAccountAddress = existingSub.address;

            console.log("✅ Sub Account EXISTENTE encontrada!");
            console.log("📍 Sub Account Address:", subAccountAddress);
            console.log("📦 Dados completos:", existingSub);

            // Salva no localStorage
            localStorage.setItem("subAccount", JSON.stringify(existingSub));
          } else {
            // Criar nova Sub Account
            console.log("ℹ️ Nenhuma Sub Account encontrada.");
            console.log("\n🔄 PASSO 3: Criando NOVA Sub Account...");

            const newSubAccount = (await baseProvider.request({
              method: "wallet_addSubAccount",
              params: [
                {
                  account: { type: "create" },
                },
              ],
            })) as { address: string; type: string };

            subAccountAddress = newSubAccount.address;

            console.log("✅ NOVA Sub Account criada com sucesso!");
            console.log("📍 Sub Account Address:", subAccountAddress);
            console.log("📦 Dados completos:", newSubAccount);

            // Salva no localStorage
            localStorage.setItem("subAccount", JSON.stringify(newSubAccount));
          }

          console.log("\n═══════════════════════════════════════");
          console.log("✅ PROCESSO CONCLUÍDO!");
          console.log("═══════════════════════════════════════");
          console.log("📊 RESUMO:");
          console.log("  • Username:", formData.username);
          console.log("  • Universal Address:", universalAddress);
          console.log("  • Sub Account:", subAccountAddress);
          console.log("═══════════════════════════════════════");

          // TODO: Salvar no backend
          // await fetch('/api/auth/signup', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     username: formData.username,
          //     password: formData.password,
          //     universalAddress: universalAddress,
          //     subAccountAddress: subAccountAddress
          //   })
          // });

          // Mock: Simula resposta do JWT após cadastro
          // Usernames começando com "gov" são governo
          const userType: UserType = formData.username.toLowerCase().startsWith("gov") ? "governo" : "participante";
          setUserType(userType);

          alert(
            `Conta criada com sucesso!\n\nSub Account: ${subAccountAddress}\n\nVerifique o console para mais detalhes.`,
          );

          // Redireciona baseado no tipo de usuário
          window.location.href = userType === "governo" ? "/governo/dashboard" : "/participante/dashboard";
        } catch (error) {
          console.error("═══════════════════════════════════════");
          console.error("❌ ERRO ao criar conta e Sub Account:");
          console.error(error);
          console.error("═══════════════════════════════════════");
          alert("Erro ao criar conta. Certifique-se de ter uma carteira Web3 instalada (Coinbase Wallet ou MetaMask).");
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
            <button type="submit" className="btn btn-primary w-full">
              {isLogin ? "Sign In" : "Create Account"}
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
