import React, { useState, useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import type { AuthMessage } from "../lib/types";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {useNotification} from "../context/NotificationContext.tsx";

const AuthPage: React.FC = () => {
    const {notifySuccess} = useNotification();
    const [form, setForm] = useState<"login" | "register">("login");

    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    const [message, setMessage] = useState<AuthMessage | null>(null);

    const navigate = useNavigate();
    const {refresh} = useAuth();

    useEffect(() => {
        document.title = "PopcornON — Auth";
    }, []);

    const handleLoginSuccess = async (msg: AuthMessage) => {
        setMessage(msg);
        setIsLoginLoading(false);

        navigate("/");
        await refresh();
        notifySuccess("Connexion réussie !");
    };

    const handleLoginFailure = (msg: AuthMessage) => {
        setMessage(msg);
        setIsLoginLoading(false);
    };

    const handleRegisterSuccess = async (msg: AuthMessage) => {
        setMessage(msg);
        setIsRegisterLoading(false);

        navigate("/");
        await refresh();
        notifySuccess("Inscription réussie !");
    };

    const handleRegisterFailure = (msg: AuthMessage) => {
        setMessage(msg);
        setIsRegisterLoading(false);
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-10">
            {/* Gradient background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-700/20 via-black to-red-900/30 blur-3xl"></div>

            <div className="w-full max-w-md space-y-8">

                {/* Logo + title */}
                <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                        🍿
                    </div>
                    <h1 className="text-3xl font-bold mt-4 text-white">PopcornON</h1>
                    <p className="text-gray-300">Votre portail cinéma algérien</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-zinc-800/60 p-1 rounded-xl shadow-inner">
                    <button
                        onClick={() => setForm("login")}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                            form === "login"
                                ? "bg-red-600 text-white shadow-lg"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        Se connecter
                    </button>

                    <button
                        onClick={() => setForm("register")}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                            form === "register"
                                ? "bg-red-600 text-white shadow-lg"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        Créer un compte
                    </button>
                </div>

                {/* Form */}
                <div className="bg-zinc-800/60 p-6 rounded-2xl shadow-2xl border border-zinc-700/40 backdrop-blur-sm">

                    {form === "login" ? (
                        <LoginForm
                            isLoading={isLoginLoading}
                            setIsLoading={setIsLoginLoading}
                            onLoginSuccess={handleLoginSuccess}
                            onLoginFailure={handleLoginFailure}
                        />
                    ) : (
                        <RegisterForm
                            isLoading={isRegisterLoading}
                            setIsLoading={setIsRegisterLoading}
                            onRegisterSuccess={handleRegisterSuccess}
                            onRegisterFailure={handleRegisterFailure}
                        />
                    )}
                </div>

                {/* Message */}
                {message && (
                    <div
                        className={`mt-4 p-4 text-center rounded-xl border ${
                            message.type === "success"
                                ? "bg-green-600/20 text-green-300 border-green-600/40"
                                : "bg-red-600/20 text-red-300 border-red-600/40"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
