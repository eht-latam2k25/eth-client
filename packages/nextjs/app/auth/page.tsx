"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirme sua senha";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (isLogin) {
        console.log("Login:", { email: formData.email, password: formData.password });
        // Aqui você pode adicionar a lógica de login
        // Redirecionar para seleção de perfil
        window.location.href = "/selecionar-perfil";
      } else {
        console.log("Signup:", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        // Aqui você pode adicionar a lógica de cadastro
        // Redirecionar para seleção de perfil
        window.location.href = "/selecionar-perfil";
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      name: "",
      email: "",
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
              {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
            </h1>
            <p className="text-sm text-primary-content/80">
              {isLogin ? "Faça login para continuar" : "Junte-se a nós hoje"}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-base-300">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center text-sm font-semibold transition-all ${
                isLogin
                  ? "text-primary border-b-2 border-primary bg-base-200/50"
                  : "text-base-content/60 hover:bg-base-200/30"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
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
            {/* Name Field (only for signup) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""}`}
                    placeholder="João Silva"
                  />
                </div>
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""}`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field (only for signup) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full pl-10 ${errors.confirmPassword ? "input-error" : ""}`}
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
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              {isLogin ? "Entrar" : "Criar Conta"}
            </button>

            {/* Alternative Action */}
            <div className="text-center">
              <p className="text-sm text-base-content/60">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                <button type="button" onClick={toggleMode} className="link link-primary font-semibold">
                  {isLogin ? "Cadastre-se" : "Faça login"}
                </button>
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-base-200 px-6 py-3 text-center">
            <Link href="/" className="link link-primary text-xs">
              ← Voltar para Home
            </Link>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-base-content/60 mt-3">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="link">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="#" className="link">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
