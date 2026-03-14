'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, TrendingDown, Sprout, Droplet, Sun, Bug } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DiseaseResultsProps {
  result: any;
  image: string | null;
}

const diseaseDetails: Record<string, any> = {
  early_blight: {
    name: 'Early Blight',
    severity: 'medium',
    icon: AlertCircle,
    description: 'Early blight is a fungal disease caused by Alternaria solani.',
    symptoms: [
      'Brown circular spots with concentric rings (target-like pattern)',
      'Spots appear first on lower leaves',
      'Yellow halo around infected areas',
      'Spots can reach 1 cm in diameter',
      'Affected leaves eventually yellow and drop',
    ],
    treatments: [
      'Remove affected lower leaves',
      'Apply copper or chlorothalonil fungicide',
      'Ensure good air circulation',
      'Avoid overhead watering',
      'Space plants properly',
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Rotate crops',
      'Remove dead plant material',
      'Monitor plant health regularly',
      'Reduce humidity in growing area',
    ],
  },
  late_blight: {
    name: 'Late Blight',
    severity: 'high',
    icon: AlertCircle,
    description: 'Late blight is caused by Phytophthora infestans and is highly destructive.',
    symptoms: [
      'Water-soaked lesions on leaves and stems',
      'Lesions start at leaf tips and margins',
      'White fungal growth on leaf undersides',
      'Rapid spread in cool, wet conditions',
      'Can destroy entire plants in days',
    ],
    treatments: [
      'Apply systemic fungicides immediately',
      'Remove affected plant parts',
      'Destroy infected plant material',
      'Apply protective fungicides',
      'Consider removing entire plant if heavily infected',
    ],
    prevention: [
      'Plant resistant varieties',
      'Use disease-free seed potatoes',
      'Maintain proper spacing',
      'Avoid excess moisture',
      'Monitor weather for favorable conditions',
    ],
  },
  healthy: {
    name: 'Healthy',
    severity: 'none',
    icon: CheckCircle,
    description: 'Your potato plant appears to be in good health.',
    symptoms: ['Green, vigorous foliage', 'No visible lesions or discoloration', 'Normal growth pattern'],
    treatments: ['Continue regular care and monitoring'],
    prevention: [
      'Maintain proper watering schedule',
      'Provide adequate sunlight',
      'Monitor for early signs of disease',
      'Keep area free of weeds',
    ],
  },
};

export default function DiseaseResults({ result, image }: DiseaseResultsProps) {
  const diseaseKey = result.class?.toLowerCase().replace(' ', '_') || 'healthy';
  const details = diseaseDetails[diseaseKey] || diseaseDetails.healthy;
  const confidence = Math.round((result.confidence || 0) * 100);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  const Icon = details.icon;

  return (
    <div className="space-y-4">
      {/* Result Summary */}
      <Card className={`border-0 ${details.severity === 'high' ? 'bg-destructive/5' : details.severity === 'medium' ? 'bg-accent/5' : 'bg-primary/5'}`}>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className={`rounded-lg p-3 ${details.severity === 'high' ? 'bg-destructive/20' : details.severity === 'medium' ? 'bg-accent/20' : 'bg-primary/20'}`}>
              <Icon className={`h-8 w-8 ${getSeverityColor(details.severity)}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${getSeverityColor(details.severity)}`}>
                {details.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{details.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidence Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detection Confidence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
            <span className="text-lg font-bold text-primary">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </CardContent>
      </Card>

      {/* Plant Image */}
      {image && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Analyzed Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
              <img src={image} alt="Analyzed plant" className="h-full w-full object-cover" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Symptoms</CardTitle>
          <CardDescription>What to look for</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {details.symptoms.map((symptom: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 rounded-full bg-primary/20 w-5 h-5 flex items-center justify-center text-xs font-semibold text-primary">
                  •
                </span>
                <span className="text-muted-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Treatment Plan */}
      {details.severity !== 'none' && (
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Droplet className="h-5 w-5 text-accent" />
              Treatment Plan
            </CardTitle>
            <CardDescription>Recommended actions</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {details.treatments.map((treatment: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 rounded-full bg-accent/30 w-6 h-6 flex items-center justify-center text-xs font-semibold text-accent">
                    {idx + 1}
                  </span>
                  <span className="text-muted-foreground">{treatment}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Prevention Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            Prevention Tips
          </CardTitle>
          <CardDescription>Protect your plants</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {details.prevention.map((tip: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 rounded-full bg-primary/20 w-5 h-5 flex items-center justify-center text-xs font-semibold text-primary">
                  ✓
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Care Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plant Care Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <div className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3">
            <Sun className="h-5 w-5 text-accent flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Sunlight</p>
              <p className="text-xs text-muted-foreground">6-8 hours daily</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3">
            <Droplet className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Water</p>
              <p className="text-xs text-muted-foreground">Consistent moisture</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
