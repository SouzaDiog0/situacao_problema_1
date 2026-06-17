import { useCallback, useEffect, useRef, useState } from "react";

export const useSpeech = () => {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    setCaption(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    const ptVoice = voicesRef.current.find(
      (v) => v.lang.startsWith("pt-BR") || v.lang.startsWith("pt")
    );
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onend = () => setCaption("");
    utterance.onerror = () => setCaption("");

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setCaption("");
    }
  }, []);

  const isSupported = "speechSynthesis" in window;

  return { speak, stop, isSupported, caption };
};
