import React, { useState } from 'react';
import {
  BarChart3,
  MessageSquare,
  PieChart as PieIcon,
  TrendingUp,
  Users,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { COLORS } from '../../constants';
import ExecutiveReportModal from '../ui/ExecutiveReportModal';
import SmartReplyBox from '../ui/SmartReplyBox';

const ManagerDashboard = ({ data, onReset }) => {
  const [showReport, setShowReport] = useState(false);

  // Cálculos para os gráficos
  const sentimentCounts = data.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    {
      name: "Positivo",
      value: sentimentCounts.positive || 0,
      color: COLORS.positive,
    },
    {
      name: "Neutro",
      value: sentimentCounts.neutral || 0,
      color: COLORS.neutral,
    },
    {
      name: "Negativo",
      value: sentimentCounts.negative || 0,
      color: COLORS.negative,
    },
  ].filter((d) => d.value > 0);

  const topicCounts = {};
  data.forEach((item) => {
    item.topics.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  const barData = Object.entries(topicCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 tópicos

  const recentFeedback = [...data].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {showReport && (
        <ExecutiveReportModal
          data={data}
          onClose={() => setShowReport(false)}
        />
      )}

      {/* Header do Dashboard */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <BarChart3 size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Painel do Gestor</h1>
              <p className="text-xs text-slate-500">Visão geral de insights</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReport(true)}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors shadow-sm"
            >
              <Sparkles size={14} /> Gerar Relatório Executivo
            </button>
            <button
              onClick={onReset}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium px-3"
            >
              Sair
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Novo Feedback
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Feedbacks</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{data.length}</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Sentimento Predominante</p>
                <h3 className="text-3xl font-bold text-emerald-600 mt-1">
                  {pieData.sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
                </h3>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Participação</p>
                <h3 className="text-3xl font-bold text-indigo-600 mt-1">Ativa</h3>
              </div>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <PieIcon size={18} className="text-slate-400" /> Distribuição de Sentimento
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topics Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-slate-400" /> Tópicos Recorrentes
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#6366f1"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Feedbacks List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-lg">Feedbacks Recentes & Análise IA</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentFeedback.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-slate-50 transition-colors animate-in fade-in duration-300"
              >
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                        ${
                          item.sentiment === "positive"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.sentiment === "negative"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.sentiment}
                      </span>
                      <span className="text-xs text-slate-400">ID: #{item.id}</span>
                    </div>
                    <p className="text-slate-800 text-lg mb-3 font-medium">
                      "{item.text}"
                    </p>

                    {/* AI Box */}
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                      <div className="flex gap-3 items-start">
                        <BrainCircuit
                          size={18}
                          className="text-indigo-600 mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm text-indigo-900 font-medium mb-1">
                            Análise Gemini:
                          </p>
                          <p className="text-sm text-indigo-700 leading-snug">
                            {item.summary}
                          </p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {item.topics.map((t, i) => (
                              <span
                                key={i}
                                className="text-xs bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-600"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Smart Reply Feature */}
                      <SmartReplyBox
                        feedbackText={item.text}
                        sentiment={item.sentiment}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;