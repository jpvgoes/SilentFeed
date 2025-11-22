# Estrutura do Projeto SilentFeed

## Organização dos Componentes

```
src/
├── components/
│   ├── pages/
│   │   ├── HomePage.jsx          # Página inicial com apresentação
│   │   ├── ClientPage.jsx        # Página de envio de feedback
│   │   ├── ManagerDashboard.jsx  # Dashboard do gestor
│   │   └── NotFound.jsx          # Página 404
│   ├── layout/
│   │   └── Layout.jsx            # Layout principal com navegação
│   ├── ui/
│   │   ├── SmartReplyBox.jsx     # Componente de resposta inteligente
│   │   ├── ExecutiveReportModal.jsx # Modal do relatório executivo
│   │   └── Navigation.jsx        # Componente de navegação
│   └── index.js                  # Exportações centralizadas
├── context/
│   └── FeedbackContext.jsx       # Context para gerenciar feedbacks
├── constants/
│   └── index.js                  # Dados iniciais e constantes
├── utils/
│   └── gemini.js                 # Utilitários da API Gemini
├── App.jsx                       # Componente principal com roteamento
├── main.jsx                      # Ponto de entrada
└── index.css                     # Estilos Tailwind
```

## Componentes

### Páginas (Pages)
- **HomePage**: Página de apresentação do produto (`/`)
- **ClientPage**: Interface para envio de feedback anônimo (`/feedback`)
- **ManagerDashboard**: Dashboard com análises e insights (`/dashboard`)
- **NotFound**: Página 404 para rotas não encontradas

### Layout
- **Layout**: Layout principal com navegação global
- **Navigation**: Componente de navegação responsivo

### UI Components
- **SmartReplyBox**: Gera sugestões de resposta usando IA
- **ExecutiveReportModal**: Modal com relatório executivo gerado por IA

### Context
- **FeedbackContext**: Gerencia estado global dos feedbacks

### Utilitários
- **gemini.js**: Funções para integração com a API do Google Gemini
- **constants/index.js**: Dados mock e configurações

## Rotas
- `/` - Página inicial
- `/feedback` - Envio de feedback
- `/dashboard` - Dashboard do gestor
- `/*` - Página 404

## Tecnologias
- React 19
- React Router DOM
- Context API
- Tailwind CSS
- Recharts (gráficos)
- Lucide React (ícones)
- Google Gemini API