// components/Temporizador.tsx
"use client";

import { useEffect } from 'react';

interface PropsTemporizador {
  tempoRestante: number;
  setTempoRestante: React.Dispatch<React.SetStateAction<number>>;
  emAndamento: boolean;
  pausado: boolean;
  reiniciar: () => void;
}

export default function Temporizador({ 
  tempoRestante, 
  setTempoRestante, 
  emAndamento, 
  pausado,
  reiniciar
}: PropsTemporizador) {
  
  // Efeito para diminuir o tempo quando o temporizador estiver em andamento e não pausado
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    
    if (emAndamento && !pausado && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante(tempoAnterior => {
          if (tempoAnterior <= 1) {
            clearInterval(intervalo);
            setTimeout(() => reiniciar(), 1000); // Reinicia após 1 segundo quando acabar
            return 0;
          }
          return tempoAnterior - 1;
        });
      }, 1000);
    }
    
    // Limpa o intervalo quando o componente é desmontado ou quando o estado muda
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [emAndamento, pausado, tempoRestante, setTempoRestante, reiniciar]);
  
  // Formata o tempo de segundos para minutos:segundos
  const formatarTempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };
  
  // Calcula a porcentagem de progresso para a barra circular
  const calcularProgresso = (): number => {
    return ((300 - tempoRestante) / 300) * 100;
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        {/* Círculo de fundo */}
        <div className="absolute w-full h-full rounded-full border-8 border-gray-200"></div>
        
        {/* Círculo de progresso */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${calcularProgresso() * 2.89} 289`}
            strokeLinecap="round"
            className="text-indigo-600 transform -rotate-90 origin-center"
          />
        </svg>
        
        {/* Tempo restante */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-indigo-700">
            {formatarTempo(tempoRestante)}
          </span>
        </div>
      </div>
      
      {tempoRestante === 0 && (
        <p className="mt-4 text-lg font-medium text-green-600">
          Meditação concluída!
        </p>
      )}
    </div>
  );
}