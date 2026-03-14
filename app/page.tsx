'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Camera, History } from 'lucide-react';
import HomePage from '@/components/home-page';
import DetectionPage from '@/components/detection-page';
import HistoryPage from '@/components/history-page';

export default function Page() {
  const [detectionHistory, setDetectionHistory] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('plant-detections');
    if (saved) {
      try {
        setDetectionHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load detection history:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('plant-detections', JSON.stringify(detectionHistory));
    }
  }, [detectionHistory, mounted]);

  const handleNewDetection = (result: any) => {
    const newDetection = {
      ...result,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setDetectionHistory((prev) => [newDetection, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Plant Doctor</h1>
              <p className="text-sm text-muted-foreground">Potato Disease Detection</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="detection" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Detect</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4">
            <HomePage detectionCount={detectionHistory.length} />
          </TabsContent>

          <TabsContent value="detection" className="space-y-4">
            <DetectionPage onDetectionComplete={handleNewDetection} />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <HistoryPage detections={detectionHistory} onClear={() => setDetectionHistory([])} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
