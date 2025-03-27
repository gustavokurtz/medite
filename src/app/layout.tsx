// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../../styles/Animacoes.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App de Meditação',
  description: 'Aplicativo de meditação com temporizador e instruções respiratórias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}