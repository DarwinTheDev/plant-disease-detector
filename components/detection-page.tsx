'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2, AlertCircle } from 'lucide-react';
import DiseaseResults from '@/components/disease-results';
import { analyzePlantImage } from '@/lib/plant-api';

interface DetectionPageProps {
  onDetectionComplete: (result: any) => void;
}

export default function DetectionPage({ onDetectionComplete }: DetectionPageProps) {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the actual File
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const analyzeImage = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const detectionResult = await analyzePlantImage(file); // Pass File directly
      setResult(detectionResult);
      onDetectionComplete(detectionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    
    // Store both the file and create a preview URL
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
    
    // Analyze the file
    analyzeImage(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleDragAndDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageSelect(file);
  };

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch {
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
    }
    setIsCameraActive(false);
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Convert canvas to blob/File
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        const previewUrl = URL.createObjectURL(file);
        setImage(previewUrl);
        setImageFile(file);
        stopCamera();
        await analyzeImage(file);
      }
    }, 'image/jpeg');
  };

  const resetDetection = () => {
    // Clean up object URLs
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setImageFile(null);
    setResult(null);
    setError(null);
    if (isCameraActive) stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Clean up on unmount
  const cleanup = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  if (result) {
    return (
      <div className="space-y-4">
        <DiseaseResults result={result} image={image} />
        <Button onClick={resetDetection} variant="outline" className="w-full">
          Analyze Another Plant
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Hidden canvas used for camera snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Error banner */}
      {error && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image preview */}
      {image && !isCameraActive && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-primary/30 bg-muted">
              <img
                src={image}
                alt="Plant"
                className="h-full w-full object-cover"
              />
              {/* Overlay spinner while analyzing */}
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm">
                  <Loader2 className="h-10 w-10 animate-spin text-white" />
                  <p className="text-sm font-medium text-white">Analyzing with AI model...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload area */}
      {!image && !isCameraActive && !loading && (
        <>
          <Card
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragAndDrop}
            className="cursor-pointer border-2 border-dashed border-primary/30 bg-primary/5 transition-colors hover:border-primary/50 hover:bg-primary/10"
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
              <div className="rounded-lg bg-primary/20 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Upload or drag image</p>
                <p className="text-sm text-muted-foreground">
                  Drag a plant photo here or click to browse
                </p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                variant="default"
                className="mt-2"
              >
                Select Image
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={startCamera} variant="outline" className="h-24 flex-col gap-2">
              <Camera className="h-5 w-5" />
              <span>Take Photo</span>
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-24 flex-col gap-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Image</span>
            </Button>
          </div>
        </>
      )}

      {/* Camera view */}
      {isCameraActive && (
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={capturePhoto} className="flex-1">
                  <Camera className="mr-2 h-4 w-4" />
                  Capture
                </Button>
                <Button onClick={stopCamera} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}