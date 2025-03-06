// components/InstrucoesMeditacao.tsx
"use client";

interface PropsInstrucoesMeditacao {
  tempoRestante: number;
}

export default function InstrucoesMeditacao({ tempoRestante }: PropsInstrucoesMeditacao) {
  // Função para determinar a instrução atual com base no tempo restante
  const obterInstrucaoAtual = (): string => {
    // Calcula o tempo no ciclo de 16 segundos
    // Como estamos contando regressivamente de 300 até 0, precisamos ajustar a lógica
    // para garantir que comece com "Respire fundo" quando o tempo é 300
    
    // Inverte a contagem para que seja crescente a partir do início da meditação
    const tempoDecorrido = 300 - tempoRestante;
    // Obtém a posição no ciclo de 16 segundos
    const posicaoNoCiclo = tempoDecorrido % 16;
    
    // Determina a instrução baseada na posição no ciclo de 16 segundos
    if (posicaoNoCiclo < 4) {
      return "Respire fundo";
    } else if (posicaoNoCiclo < 8) {
      return "Segure o ar";
    } else if (posicaoNoCiclo < 12) {
      return "Expire o ar";
    } else {
      return "Fique sem ar";
    }
  };

  // Seleciona o ícone e cor de fundo com base na instrução atual
  const obterEstiloInstrucao = (): { icone: string; corFundo: string } => {
    const instrucao = obterInstrucaoAtual();
    
    switch (instrucao) {
      case "Respire fundo":
        return { 
          icone: "↓", 
          corFundo: "bg-blue-100 text-blue-700" 
        };
      case "Segure o ar":
        return { 
          icone: "⏸", 
          corFundo: "bg-green-100 text-green-700" 
        };
      case "Expire o ar":
        return { 
          icone: "↑", 
          corFundo: "bg-purple-100 text-purple-700" 
        };
      case "Fique sem ar":
        return { 
          icone: "⏸", 
          corFundo: "bg-amber-100 text-amber-700" 
        };
      default:
        return { 
          icone: "?", 
          corFundo: "bg-gray-100 text-gray-700" 
        };
    }
  };

  const { icone, corFundo } = obterEstiloInstrucao();

  return (
    <div className={`p-4 rounded-lg ${corFundo} flex items-center justify-center transition-all duration-500`}>
      <div className="text-3xl mr-3">{icone}</div>
      <span className="text-xl font-medium">{obterInstrucaoAtual()}</span>
    </div>
  );
}