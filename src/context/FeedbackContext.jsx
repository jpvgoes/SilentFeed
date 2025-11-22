import React, { createContext, useContext, useState } from 'react';
import { INITIAL_DATA } from '../constants';
import { callGemini } from '../utils/gemini';

const FeedbackContext = createContext();

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState(INITIAL_DATA);

  const addFeedback = async (text) => {
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

  const value = {
    feedbacks,
    addFeedback,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;