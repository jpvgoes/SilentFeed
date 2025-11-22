import React from "react";
import { useNavigate } from "react-router-dom";
import {
    MessageSquare,
    BarChart3,
    BrainCircuit,
    ArrowRight,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const HomePage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/feedback");
    };

    const features = [
        {
            icon: ShieldCheck,
            title: "100% Anônimo",
            text: "O colaborador envia sua opinião sem login, rastreamento ou identificação.",
        },
        {
            icon: BrainCircuit,
            title: "Análise Gemini",
            text: "Nossa IA lê, categoriza e extrai o sentimento de cada comentário automaticamente em tempo real.",
        },
        {
            icon: BarChart3,
            title: "Dashboard Estratégico",
            text: "O gestor recebe sugestões de resposta e relatórios executivos gerados por IA.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <nav className="px-8 py-6 flex justify-between items-center bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                        <MessageSquare size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        SilentFeed
                    </span>
                </div>
                <button
                    onClick={handleStart}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    Acessar Demo
                </button>
            </nav>

            <main className="flex-1 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 border border-indigo-100">
                    <Sparkles size={16} />
                    <span>Potencializado por Gemini AI</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl">
                    Coleta anônima.{" "}
                    <span className="text-indigo-600">Insights reais.</span>{" "}
                    <br className="hidden md:block" />
                    Decisões melhores.
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                    Veja como sua empresa pode transformar feedbacks brutos em
                    ações estratégicas com o poder do Gemini — mantendo a
                    identidade dos colaboradores 100% protegida.
                </p>

                <button
                    onClick={handleStart}
                    className="group bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-1"
                >
                    Experimentar Demo
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="grid md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl text-left">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 transition-colors"
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200">
                © 2025 SilentFeed Demo. Powered by Google Gemini.
            </footer>
        </div>
    );
};

export default HomePage;
