"use client";

import { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
  
  // Calcula a porcentagem de progresso
  const calcularPorcentagem = (): number => {
    return ((300 - tempoRestante) / 300) * 100;
  };
  
  return (
    <div className="flex flex-col items-center">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center p-6">
          <div className="timer-circle relative w-48 h-48 mb-4 flex items-center justify-center">
            {/* Círculo de progresso SVG customizado */}
            <div className="absolute w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#292929"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#5D5FEF"
                  strokeWidth="6"
                  strokeDasharray={`${calcularPorcentagem() * 2.83} 283`}
                  strokeLinecap="round"
                  className="transform -rotate-90 origin-center transition-all duration-300"
                />
              </svg>
            </div>
            
            {/* Tempo restante */}
            <div className="flex flex-col items-center justify-center z-10">
              <Clock className="h-6 w-6 mb-2 text-[#5D5FEF]" />
              <span className="text-4xl font-bold text-[#EAEAEA]">
                {formatarTempo(tempoRestante)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {tempoRestante === 0 && (
        <div className="mt-4 p-4 rounded-lg bg-[#00C2A8]/20 border border-[#00C2A8] text-center fade-in">
          <p className="text-lg font-medium text-[#EAEAEA]">
            Meditação concluída!
          </p>
        </div>
      )}
    </div>
  );
}