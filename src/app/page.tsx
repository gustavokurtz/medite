// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Temporizador from '../components/Temporizador';
import InstrucoesMeditacao from '../components/InstrucoesMeditacao';

export default function PaginaInicial() {
  const [tempoRestante, setTempoRestante] = useState<number>(300); // 5 minutos em segundos
  const [emAndamento, setEmAndamento] = useState<boolean>(false);
  const [pausado, setPausado] = useState<boolean>(false);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Meditação</h1>
        
        <div className="mb-8">
          <Temporizador 
            tempoRestante={tempoRestante} 
            setTempoRestante={setTempoRestante}
            emAndamento={emAndamento}
            pausado={pausado}
            reiniciar={reiniciar}
          />
        </div>
        
        {emAndamento && (
          <div className="mb-8">
            <InstrucoesMeditacao tempoRestante={tempoRestante} />
          </div>
        )}
        
        <div className="flex flex-wrap justify-center gap-3">
          {!emAndamento ? (
            <button 
              onClick={comecar} 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Começar
            </button>
          ) : !pausado ? (
            <button 
              onClick={pausar} 
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Pausar
            </button>
          ) : (
            <button 
              onClick={continuar} 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Continuar
            </button>
          )}
          
          <button 
            onClick={reiniciar} 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500 text-center w-full max-w-md">
        Meditação respiratória para ajudar na concentração e relaxamento.
      </p>
    </div>
  );
}