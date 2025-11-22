import React, { useState } from 'react';
import HomePage from './components/pages/HomePage';
import ClientPage from './components/pages/ClientPage';
import ManagerDashboard from './components/pages/ManagerDashboard';
import { INITIAL_DATA } from './constants';
import { callGemini } from './utils/gemini';

export default function App() {
  const [page, setPage] = useState("home"); // home, client, manager
  const [feedbacks, setFeedbacks] = useState(INITIAL_DATA);

  // Handler principal de submissão
  const handleClientSubmit = async (text, redirectOnly = false) => {
    if (redirectOnly) {
      setPage("manager");
      return;
    }

    // Definição do Schema para o Gemini
    const schema = {
      type: "OBJECT",
      properties: {
        sentiment: {
          type: "STRING",
          enum: ["positive", "neutral", "negative"],
        },
        topics: { type: "ARRAY", items: { type: "STRING" } },
        summary: { type: "STRING" },
      },
      required: ["sentiment", "topics", "summary"],
    };

    // Prompt para análise
    const prompt = `Analise o seguinte feedback anônimo de um funcionário. 
    1. Classifique o sentimento.
    2. Identifique até 3 tópicos principais (ex: Infraestrutura, Salário, Cultura, Gestão).
    3. Escreva um resumo de uma frase em português.
    
    Feedback: "${text}"`;

    try {
      // 1. Chama a API do Gemini
      const analysis = await callGemini(prompt, schema);

      // 2. Cria o novo objeto
      const newFeedback = {
        id: feedbacks.length + 1,
        text: text,
        ...analysis,
      };

      // 3. Adiciona ao estado global
      setFeedbacks((prev) => [...prev, newFeedback]);
      return true; // Sucesso
    } catch (error) {
      console.error("Erro na análise Gemini:", error);
      // Fallback silencioso em caso de erro da API para não travar a demo
      const fallbackFeedback = {
        id: feedbacks.length + 1,
        text: text,
        sentiment: "neutral",
        topics: ["Geral"],
        summary: "Feedback recebido (Análise IA indisponível no momento).",
      };
      setFeedbacks((prev) => [...prev, fallbackFeedback]);
      throw error;
    }
  };

  return (
    <>
      {page === "home" && <HomePage onStart={() => setPage("client")} />}
      {page === "client" && (
        <ClientPage onSubmitFeedback={handleClientSubmit} />
      )}
      {page === "manager" && (
        <ManagerDashboard
          data={feedbacks}
          onReset={() => setPage("home")}
        />
      )}
    </>
  );
}
