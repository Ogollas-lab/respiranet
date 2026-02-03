import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LiveRecorderProps {
  onRecordingComplete: (file: File) => void;
  onCancel: () => void;
}

const LiveRecorder = ({ onRecordingComplete, onCancel }: LiveRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { toast } = useToast();

  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    setAudioLevel(average / 255);
    
    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
  }, []);

  const startRecording = async () => {
    try {
      setIsPreparing(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });
      
      streamRef.current = stream;
      
      // Set up audio context for level monitoring
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        const extension = mediaRecorder.mimeType.includes('webm') ? 'webm' : 'm4a';
        const file = new File([blob], `lung-recording-${Date.now()}.${extension}`, { 
          type: mediaRecorder.mimeType 
        });
        onRecordingComplete(file);
      };
      
      mediaRecorder.start(100);
      setIsRecording(true);
      setIsPreparing(false);
      setDuration(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
      
      // Start audio level monitoring
      updateAudioLevel();
      
      toast({
        title: "Recording Started",
        description: "Speak or place the microphone near the chest area.",
      });
      
    } catch (error) {
      setIsPreparing(false);
      console.error("Microphone access error:", error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record lung sounds.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Clean up
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      setIsRecording(false);
      setAudioLevel(0);
    }
  }, [isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate waveform bars
  const bars = Array.from({ length: 20 }, (_, i) => {
    const baseHeight = 0.2;
    const variation = Math.sin(Date.now() / 200 + i * 0.5) * 0.3;
    const height = isRecording 
      ? Math.min(1, baseHeight + audioLevel * 2 + variation * audioLevel)
      : baseHeight;
    return height;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">
          Live Recording
        </h3>
        <p className="text-muted-foreground">
          {isRecording 
            ? "Recording in progress. Click stop when finished."
            : "Click the microphone to start recording lung sounds."}
        </p>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center justify-center h-24 gap-1 px-8">
        {bars.map((height, i) => (
          <div
            key={i}
            className={`w-2 rounded-full transition-all duration-75 ${
              isRecording ? "gradient-bg" : "bg-muted"
            }`}
            style={{ 
              height: `${height * 100}%`,
              opacity: isRecording ? 0.6 + height * 0.4 : 0.3
            }}
          />
        ))}
      </div>

      {/* Timer display */}
      <div className="text-center">
        <span className={`font-mono text-4xl font-bold ${
          isRecording ? "text-primary" : "text-muted-foreground"
        }`}>
          {formatTime(duration)}
        </span>
        {isRecording && (
          <p className="text-sm text-muted-foreground mt-2">
            Recommended: 5-30 seconds
          </p>
        )}
      </div>

      {/* Recording controls */}
      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <>
            <Button
              variant="hero"
              size="xl"
              onClick={startRecording}
              disabled={isPreparing}
              className="rounded-full h-20 w-20"
            >
              {isPreparing ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </>
        ) : (
          <Button
            variant="destructive"
            size="xl"
            onClick={stopRecording}
            className="rounded-full h-20 w-20"
          >
            <Square className="h-8 w-8" />
          </Button>
        )}
      </div>

      {/* Cancel button */}
      {!isRecording && (
        <div className="text-center">
          <Button variant="ghost" onClick={onCancel}>
            Back to Upload
          </Button>
        </div>
      )}

      {/* Recording tips */}
      <div className="bg-secondary/50 rounded-lg p-4">
        <h4 className="font-medium text-sm text-foreground mb-2">Recording Tips:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Place the microphone close to the chest area</li>
          <li>• Ensure a quiet environment with minimal background noise</li>
          <li>• Record during normal breathing for best results</li>
          <li>• Aim for 5-30 seconds of clear audio</li>
        </ul>
      </div>
    </div>
  );
};

export default LiveRecorder;
