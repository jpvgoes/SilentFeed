# Estrutura do Projeto SilentFeed

## Organização dos Componentes

```
src/
├── components/
│   ├── pages/
│   │   ├── HomePage.jsx          # Página inicial com apresentação
│   │   ├── ClientPage.jsx        # Página de envio de feedback
│   │   └── ManagerDashboard.jsx  # Dashboard do gestor
│   ├── ui/
│   │   ├── SmartReplyBox.jsx     # Componente de resposta inteligente
│   │   └── ExecutiveReportModal.jsx # Modal do relatório executivo
│   └── index.js                  # Exportações centralizadas
├── constants/
│   └── index.js                  # Dados iniciais e constantes
├── utils/
│   └── gemini.js                 # Utilitários da API Gemini
├── App.jsx                       # Componente principal
├── main.jsx                      # Ponto de entrada
└── index.css                     # Estilos Tailwind
```

## Componentes

### Páginas (Pages)
- **HomePage**: Página de apresentação do produto
- **ClientPage**: Interface para envio de feedback anônimo
- **ManagerDashboard**: Dashboard com análises e insights

### UI Components
- **SmartReplyBox**: Gera sugestões de resposta usando IA
- **ExecutiveReportModal**: Modal com relatório executivo gerado por IA

### Utilitários
- **gemini.js**: Funções para integração com a API do Google Gemini
- **constants/index.js**: Dados mock e configurações

## Tecnologias
- React 19
- Tailwind CSS
- Recharts (gráficos)
- Lucide React (ícones)
- Google Gemini API