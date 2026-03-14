'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface HomePageProps {
  detectionCount: number;
}

export default function HomePage({ detectionCount }: HomePageProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-0 bg-gradient-to-r from-primary/20 to-primary/10">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Welcome to Plant Doctor</h2>
            <p className="text-muted-foreground">
              Detect potato plant diseases using AI-powered image analysis. Take a photo or upload an image to get instant disease detection and treatment recommendations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-secondary/30">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/20 p-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Detections</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{detectionCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-accent/20">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-accent/30 p-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </div>
              <p className="text-lg font-bold text-foreground">Ready</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How It Works</CardTitle>
          <CardDescription>3 simple steps to detect disease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                1
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">Capture or Upload</p>
              <p className="text-sm text-muted-foreground">
                Take a photo with your camera or upload an existing image of a potato plant leaf.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                2
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">AI Analysis</p>
              <p className="text-sm text-muted-foreground">
                Our deep learning model analyzes the image to detect diseases and assess plant health.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                3
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">Get Recommendations</p>
              <p className="text-sm text-muted-foreground">
                Receive detailed disease information and treatment recommendations for your plant.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Potato Diseases</CardTitle>
          <CardDescription>What we can detect</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Early Blight</p>
              <p className="text-xs text-muted-foreground">Brown spots with concentric rings on lower leaves</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Late Blight</p>
              <p className="text-xs text-muted-foreground">Water-soaked lesions that spread rapidly in wet conditions</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Healthy</p>
              <p className="text-xs text-muted-foreground">No disease detected - plant is in good condition</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
