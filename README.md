# SilentFeed 🤫📊

**Coleta anônima. Insights reais. Decisões melhores.**

SilentFeed é uma plataforma de feedback anônimo potencializada por IA que transforma opiniões brutas em insights estratégicos, mantendo a identidade dos colaboradores 100% protegida.

## ✨ Funcionalidades

- **🔒 Feedback 100% Anônimo**: Colaboradores enviam opiniões sem login ou identificação
- **🧠 Análise Inteligente**: Integração com Google Gemini para categorização automática e análise de sentimento
- **📈 Dashboard Estratégico**: Visualizações em tempo real com gráficos e métricas
- **💡 Sugestões de Resposta**: IA gera respostas personalizadas para cada feedback
- **📋 Relatórios Executivos**: Relatórios automáticos gerados por IA para tomada de decisão

## 🚀 Tecnologias

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **IA**: Google Gemini API
- **Estado**: Context API

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/silentfeed.git
cd silentfeed
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Adicione sua chave da API do Gemini no arquivo `.env`:
```
VITE_GEMINI_API_KEY=sua_chave_aqui
```

4. Execute o projeto:
```bash
npm run dev
```

## 📱 Como Usar

1. **Página Inicial** (`/`): Apresentação do produto e suas funcionalidades
2. **Envio de Feedback** (`/feedback`): Interface anônima para colaboradores
3. **Dashboard** (`/dashboard`): Painel gerencial com análises e insights

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── pages/           # Páginas da aplicação
│   ├── layout/          # Componentes de layout
│   └── ui/              # Componentes de interface
├── context/             # Context API para estado global
├── utils/               # Utilitários e integração com APIs
└── constants/           # Constantes e dados mock
```

## 🤖 Integração com IA

O SilentFeed utiliza o Google Gemini para:
- Análise automática de sentimento
- Categorização de feedbacks
- Geração de sugestões de resposta
- Criação de relatórios executivos
- Implementação de retry com exponential backoff

## 🎯 Casos de Uso

- **RH**: Pesquisas de clima organizacional
- **Gestão**: Feedback sobre liderança e processos
- **Produto**: Opiniões sobre ferramentas internas
- **Estratégia**: Insights para tomada de decisão

## 📄 Licença

Este projeto é uma demonstração educacional. Consulte o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ usando React + Vite + Google Gemini**
