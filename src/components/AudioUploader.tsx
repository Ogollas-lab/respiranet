import { useState, useCallback } from "react";
import { Upload, FileAudio, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveRecorder from "./LiveRecorder";
import AudioPreviewPlayer from "./AudioPreviewPlayer";
interface AudioUploaderProps {
  onUpload: (file: File) => void;
}

const AudioUploader = ({ onUpload }: AudioUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"upload" | "record">("upload");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleRecordingComplete = (file: File) => {
    setSelectedFile(file);
    setMode("upload");
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  if (mode === "record") {
    return (
      <LiveRecorder 
        onRecordingComplete={handleRecordingComplete}
        onCancel={() => setMode("upload")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">
          Upload Lung Sound Recording
        </h3>
        <p className="text-muted-foreground">
          Upload an audio file of lung sounds captured with a digital stethoscope or microphone.
        </p>
      </div>

      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-12 transition-all duration-200
            ${isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-secondary/30"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`
              h-16 w-16 rounded-2xl flex items-center justify-center transition-all
              ${isDragOver ? "gradient-bg scale-110" : "bg-secondary"}
            `}>
              <Upload className={`h-8 w-8 ${isDragOver ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            
            <div className="text-center">
              <p className="font-medium text-foreground mb-1">
                Drag and drop your audio file here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse • WAV, MP3, M4A, OGG supported
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-6 bg-secondary/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl gradient-bg flex items-center justify-center">
                <FileAudio className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type.split("/")[1]?.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <AudioPreviewPlayer file={selectedFile} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="hero"
          size="lg"
          className="flex-1"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          <FileAudio className="h-5 w-5 mr-2" />
          Continue with {selectedFile ? "File" : "Upload"}
        </Button>
        
        <Button 
          variant="clinical" 
          size="lg" 
          className="flex-1"
          onClick={() => setMode("record")}
        >
          <Mic className="h-5 w-5 mr-2" />
          Record Live
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          For best results, use recordings 5-30 seconds long with minimal background noise.
        </p>
      </div>
    </div>
  );
};

export default AudioUploader;
