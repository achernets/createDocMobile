
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { ConfigProvider } from 'antd-mobile';
import App from './App.tsx'
import enUS from 'antd-mobile/es/locales/ru-Ru';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/index.ts';


const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #ffffff;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
  }

  #root {
    width: 100%;
    height: 100%;
    background: rgba(217, 217, 217, 0.3);
  }
`;

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={enUS}>
      <GlobalStyle />
      <App />
    </ConfigProvider>
  </QueryClientProvider>,
);
