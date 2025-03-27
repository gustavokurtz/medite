"use client";

import { useState } from 'react';
import { Play, Pause, RefreshCw, Brain, Activity, Lightbulb, Cpu, Atom } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Temporizador from '../components/Temporizador';
import InstrucoesMeditacao from '../components/InstrucoesMeditacao';
import AudioPlayer from '../components/AudioPlayer';

export default function PaginaInicial() {
  const [tempoRestante, setTempoRestante] = useState(300); // 5 minutos em segundos
  const [emAndamento, setEmAndamento] = useState(false);
  const [pausado, setPausado] = useState(false);
  
  const comecar = () => {
    setEmAndamento(true);
    setPausado(false);
  };
  
  const pausar = () => {
    setPausado(true);
  };
  
  const continuar = () => {
    setPausado(false);
  };
  
  const reiniciar = () => {
    setTempoRestante(300);
    setEmAndamento(false);
    setPausado(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a40] to-[#121212] flex flex-col justify-center items-center p-4 md:p-6">
      <Card className="w-full max-w-md shadow-lg border-none bg-[#1F1F1F]">
      <CardHeader className="border-b border-[#EAEAEA]/10">
      <div className="flex justify-center gap-4">
  <Brain className="w-10 h-10 text-[#5D5FEF] animate-float" />
  <Activity className="w-10 h-10 text-[#5D5FEF] animate-float delay-[100ms]" />
  <Lightbulb className="w-10 h-10 text-[#5D5FEF] animate-float delay-[200ms]" />
  <Cpu className="w-10 h-10 text-[#5D5FEF] animate-float delay-[300ms]" />
  <Atom className="w-10 h-10 text-[#5D5FEF] animate-float delay-[400ms]" />
</div>
</CardHeader>
        
        <CardContent className="pt-6 pb-2 space-y-6">
          <div className="flex justify-center">
            <Temporizador
              tempoRestante={tempoRestante}
              setTempoRestante={setTempoRestante}
              emAndamento={emAndamento}
              pausado={pausado}
              reiniciar={reiniciar}
            />
          </div>
          
          {emAndamento && (
            <div className="mt-6 slide-up">
              <InstrucoesMeditacao tempoRestante={tempoRestante} />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-wrap justify-center gap-3 pt-2 pb-6">
          {!emAndamento ? (
            <Button
              onClick={comecar}
              size="lg"
              className="bg-[#5D5FEF] hover:bg-[#5D5FEF]/90 text-[#121212] font-medium"
            >
              <Play className="mr-2 h-5 w-5" /> Começar
            </Button>
          ) : !pausado ? (
            <Button
              onClick={pausar}
              size="lg"
              className="bg-[#5D5FEF] hover:bg-[#5D5FEF]/90 text-[#EAEAEA] font-medium"
            >
              <Pause className="mr-2 h-5 w-5" /> Pausar
            </Button>
          ) : (
            <Button
              onClick={continuar}
              size="lg"
              className="bg-[#5D5FEF] hover:bg-[#5D5FEF]/90 text-[#121212] font-medium"
            >
              <Play className="mr-2 h-5 w-5" /> Continuar
            </Button>
          )}
          
          <Button
            onClick={reiniciar}
            size="lg"
            variant="outline"
            className="border border-[#5D5FEF]/50 hover:bg-[#5D5FEF]/10 text-[#EAEAEA]"
          >
            <RefreshCw className="mr-2 h-5 w-5" /> Reiniciar
          </Button>
        </CardFooter>
      </Card>
      
      <p className="mt-6 text-sm text-[#888888] text-center w-full max-w-md">
        Meditação respiratória para ajudar na concentração e relaxamento.
      </p>
      
      <AudioPlayer />
    </div>
  );
}