import React, { useState } from 'react';
import { MessageSquare, CheckCircle, Loader2, Sparkles } from 'lucide-react';

const ClientPage = ({ onSubmitFeedback }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle"); // idle, analyzing, success, error

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus("analyzing");

    try {
      await onSubmitFeedback(text);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare /> Enviar Feedback
          </h2>
          <p className="text-indigo-100 opacity-90 mt-1">
            Sua identidade está protegida. Fale abertamente.
          </p>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Insight Enviado!
              </h3>
              <p className="text-slate-600 mb-8">
                O Gemini processou seu texto e anonimizou os dados com sucesso.
              </p>
              <button 
                onClick={() => onSubmitFeedback(null, true)} // true flag means "go to dashboard"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Ver Visão do Gestor
              </button>
            </div>
          ) : (
            <>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Como cliente/colaborador, digite seu feedback:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ex: O atendimento foi rápido, mas achei o preço um pouco alto..."
                className="w-full h-40 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-slate-700 bg-slate-50 mb-6"
                disabled={status === "analyzing"}
              />
              
              {status === "error" && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  Ocorreu um erro ao analisar. Tente novamente.
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!text.trim() || status === "analyzing"}
                className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all
                  ${!text.trim() ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl'}
                `}
              >
                {status === "analyzing" ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Gemini Analisando...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Enviar Insight Anônimo
                  </>
                )}
              </button>
            </>
          )}
        </div>
        <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-slate-100">
          Ambiente de Simulação • Powered by Google Gemini API
        </div>
      </div>
    </div>
  );
};

export default ClientPage;