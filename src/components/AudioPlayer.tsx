"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      // Tentar reproduzir o áudio automaticamente quando o componente for montado
      audioRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
        setIsPlaying(false);
      });
    }
  }, []);
  
  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src="/meditation-sound.mp3" loop preload="auto" />
      
      <Button
        onClick={toggleSound}
        size="icon"
        className="h-12 w-12 rounded-full shadow-md bg-[#5D5FEF] hover:bg-[#5D5FEF]/90 transition-all duration-200"
        aria-label={isPlaying ? "Desativar som" : "Ativar som"}
      >
        {isPlaying ? 
          <Volume2 className="h-6 w-6 text-[#121212]" /> : 
          <VolumeX className="h-6 w-6 text-[#121212]" />
        }
      </Button>
    </div>
  );
}