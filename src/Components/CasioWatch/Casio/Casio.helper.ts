export const loadFromLocalStorage = (key: string, fallback: any) => {
    const storedData = localStorage.getItem("casioAlarmData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData[key] !== undefined ? parsedData[key] : fallback;
    }
    return fallback;
  };


  export const playCasioSound = async (soundFile: string, volume: number = 1) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    try {
      const response = await fetch(`/sounds/${soundFile}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start();
    } catch(error) {
      console.error("Error playing sound:", error);
    }

  };
  