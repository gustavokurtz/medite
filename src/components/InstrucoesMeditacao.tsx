"use client";

import { ArrowDown, ArrowUp, Pause } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface PropsInstrucoesMeditacao {
  tempoRestante: number;
}

export default function InstrucoesMeditacao({ tempoRestante }: PropsInstrucoesMeditacao) {
  // Função para determinar a instrução atual com base no tempo restante
  const obterInstrucaoAtual = (): string => {
    // Inverte a contagem para que seja crescente a partir do início da meditação
    const tempoDecorrido = 300 - tempoRestante;
    // Obtém a posição no ciclo de 16 segundos
    const posicaoNoCiclo = tempoDecorrido % 16;
    
    // Determina a instrução baseada na posição no ciclo de 16 segundos
    if (posicaoNoCiclo < 4) {
      return "Inspire o ar";
    } else if (posicaoNoCiclo < 8) {
      return "Segure o ar";
    } else if (posicaoNoCiclo < 12) {
      return "Expire o ar";
    } else {
      return "Fique sem ar";
    }
  };

  // Seleciona o ícone e cor de fundo com base na instrução atual
  const obterEstiloInstrucao = () => {
    const instrucao = obterInstrucaoAtual();
    
    switch (instrucao) {
      case "Inspire o ar":
        return {
          icone: <ArrowDown className="h-6 w-6" />,
          corFundo: "bg-indigo-800/30 border-indigo-700/30"
        };
      case "Segure o ar":
        return {
          icone: <Pause className="h-6 w-6" />,
          corFundo: "bg-indigo-700/20 border-indigo-600/30"
        };
      case "Expire o ar":
        return {
          icone: <ArrowUp className="h-6 w-6" />,
          corFundo: "bg-teal-800/30 border-teal-700/30"
        };
      case "Fique sem ar":
        return {
          icone: <Pause className="h-6 w-6" />,
          corFundo: "bg-indigo-900/20 border-indigo-800/30"
        };
      default:
        return {
          icone: <Pause className="h-6 w-6" />,
          corFundo: "bg-indigo-800/30 border-indigo-700/30"
        };
    }
  };

  const { icone, corFundo } = obterEstiloInstrucao();

  return (
    <Card className={`border border-opacity-20 shadow-md transition-all duration-700 ${corFundo}`}>
      <CardContent className="flex items-center justify-center p-6 space-x-4">
        <div className="text-[#EAEAEA]">
          {icone}
        </div>
        <span className="text-xl font-medium text-[#EAEAEA]">
          {obterInstrucaoAtual()}
        </span>
      </CardContent>
    </Card>
  );
}