import React, { useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { callGemini } from '../../utils/gemini';

const SmartReplyBox = ({ feedbackText, sentiment }) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateReply = async () => {
    setLoading(true);
    setIsOpen(true);
    try {
      const prompt = `Você é um gerente de RH experiente. Escreva uma resposta curta (máximo 2 parágrafos), profissional, empática e anônima para este feedback de funcionário. O sentimento detectado foi "${sentiment}". Feedback original: "${feedbackText}". Fale em primeira pessoa do plural (Nós da empresa...).`;
      const text = await callGemini(prompt);
      setReply(text);
    } catch (e) {
      setReply("Erro ao gerar resposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={generateReply}
        className="mt-3 text-sm flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        <Sparkles size={14} /> Gerar Sugestão de Resposta (Gemini)
      </button>
    );
  }

  return (
    <div className="mt-4 bg-white border border-indigo-100 rounded-lg p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={12} /> Rascunho Sugerido
        </h4>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={14} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-500 text-sm py-4">
          <Loader2 className="animate-spin" size={16} /> Gerando resposta empática...
        </div>
      ) : (
        <>
          <textarea
            value={reply}
            readOnly
            className="w-full text-sm text-slate-600 bg-indigo-50/30 p-3 rounded border border-indigo-100 focus:outline-none h-24 resize-none mb-2"
          />
          <button className="flex items-center gap-2 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition-colors ml-auto">
            <Send size={12} /> Copiar & Usar
          </button>
        </>
      )}
    </div>
  );
};

export default SmartReplyBox;