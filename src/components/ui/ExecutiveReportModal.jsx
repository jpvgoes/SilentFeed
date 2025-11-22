import React, { useState, useEffect } from 'react';
import { FileText, X, Loader2 } from 'lucide-react';
import { callGemini } from '../../utils/gemini';

const ExecutiveReportModal = ({ data, onClose }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateReport = async () => {
      try {
        const feedbacksText = data
          .map((f) => `- (${f.sentiment}) ${f.text}`)
          .join("\n");
        const prompt = `Atue como um Consultor Estratégico de Negócios. Analise a lista de feedbacks anônimos abaixo recebidos pelos funcionários.
        Gere um Relatório Executivo em HTML simples (sem markdown, apenas tags <p>, <ul>, <li>, <strong>, <h3>).
        Estrutura do relatório:
        1. <h3>Resumo Geral</h3>: Uma visão geral do clima.
        2. <h3>Principais Dores</h3>: Lista com bullets points dos problemas mais críticos.
        3. <h3>Plano de Ação Recomendado</h3>: 3 ações práticas para a diretoria tomar nesta semana.
        
        Lista de Feedbacks:
        ${feedbacksText}`;

        const result = await callGemini(prompt);
        setReport(result);
      } catch (e) {
        setReport("<p>Erro ao gerar relatório. Tente novamente mais tarde.</p>");
      } finally {
        setLoading(false);
      }
    };
    generateReport();
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
          <div className="flex items-center gap-2 text-indigo-900">
            <FileText className="text-indigo-600" />
            <h2 className="font-bold text-xl">Relatório Executivo (IA)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
          >
            <X size={20} className="text-indigo-900" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto prose prose-indigo prose-sm max-w-none text-slate-700">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-500">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
              <p>A IA está analisando todos os feedbacks e compilando tendências...</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: report }} />
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800"
          >
            Fechar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveReportModal;