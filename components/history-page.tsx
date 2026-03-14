'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Trash2, Download, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Detection {
  id: number;
  timestamp: string;
  class: string;
  confidence: number;
}

interface HistoryPageProps {
  detections: Detection[];
  onClear: () => void;
}

export default function HistoryPage({ detections, onClear }: HistoryPageProps) {
  const [filterType, setFilterType] = useState<string>('all');

  const getDiseaseIcon = (className: string) => {
    if (className.toLowerCase().includes('healthy')) {
      return <CheckCircle className="h-5 w-5 text-primary" />;
    }
    return <AlertCircle className="h-5 w-5 text-accent" />;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const filteredDetections = filterType === 'all' 
    ? detections 
    : detections.filter((d) => 
        d.class.toLowerCase() === filterType.toLowerCase() || 
        (filterType === 'healthy' && d.class.toLowerCase().includes('healthy'))
      );

  const handleExport = () => {
    const csv = [
      ['Date', 'Time', 'Disease', 'Confidence'],
      ...detections.map((d) => {
        const { date, time } = formatDate(d.timestamp);
        return [date, time, d.class, `${Math.round(d.confidence * 100)}%`];
      }),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plant-detection-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDeleteDetection = (id: number) => {
    // This would need to be implemented with state management in the parent
    console.log('Delete detection:', id);
  };

  return (
    <div className="space-y-4">
      {detections.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="rounded-lg bg-muted p-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">No detections yet</p>
              <p className="text-sm text-muted-foreground">
                Go to the Detection tab to analyze your first plant image
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground font-medium">Total Scans</p>
                <p className="text-2xl font-bold text-primary mt-1">{detections.length}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-accent/5">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground font-medium">Avg. Confidence</p>
                <p className="text-2xl font-bold text-accent mt-1">
                  {Math.round(
                    (detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length) * 100
                  )}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filter and Export */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Filter by disease" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="early_blight">Early Blight</SelectItem>
                    <SelectItem value="late_blight">Late Blight</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleExport} variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detection History List */}
          <div className="space-y-3">
            {filteredDetections.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">No results match your filter</p>
                </CardContent>
              </Card>
            ) : (
              filteredDetections.map((detection) => {
                const { date, time } = formatDate(detection.timestamp);
                const confidence = Math.round(detection.confidence * 100);

                return (
                  <Card key={detection.id} className="border-primary/20">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3 flex-1 min-w-0">
                          <div className="flex-shrink-0 mt-1">
                            {getDiseaseIcon(detection.class)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <p className="font-medium text-foreground">{detection.class}</p>
                              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                {confidence}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {date} at {time}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDeleteDetection(detection.id)}
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Clear All */}
          {detections.length > 0 && (
            <Button
              onClick={onClear}
              variant="outline"
              className="w-full text-destructive hover:bg-destructive/10"
            >
              Clear All History
            </Button>
          )}
        </>
      )}
    </div>
  );
}
