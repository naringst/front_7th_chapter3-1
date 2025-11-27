import React from 'react'
import { ThemeProvider } from './shared/contexts/ThemeContext'
import { Header } from './shared/ui/header'
import { ManagementPage } from './pages/ManagementPage'
import './styles/components.css'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--color-semantic-background-normal-normal)] transition-colors">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
