interface DetectionResult {
  class: string;
  confidence: number;
  description: string;
}

// Disease information database (keep this part)
export const diseaseDatabase = {
  early_blight: {
    scientificName: 'Alternaria solani',
    severity: 'medium',
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
    scientificName: 'Phytophthora infestans',
    severity: 'high',
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
    scientificName: 'Solanum tuberosum (Healthy)',
    severity: 'none',
    symptoms: [
      'Green, vigorous foliage',
      'No visible lesions or discoloration',
      'Normal growth pattern',
    ],
    treatments: ['Continue regular care and monitoring'],
    prevention: [
      'Maintain proper watering schedule',
      'Provide adequate sunlight',
      'Monitor for early signs of disease',
      'Keep area free of weeds',
    ],
  },
};

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Analyzes a plant image using your custom trained model backend
 * 
 * @param imageFile - The image file to analyze (File object from input)
 * @returns DetectionResult with class, confidence, and description
 */
export async function analyzePlantImage(
  imageFile: File
): Promise<DetectionResult> {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', imageFile);

    // Send to your FastAPI backend
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API error (${response.status})`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Prediction failed');
    }

    // Convert backend response to DetectionResult format
    // The backend returns display_name like "Early blight", "Healthy", "Late blight"
    return {
      class: data.disease, // Already formatted as "Early blight", etc.
      confidence: data.confidence / 100, // Convert from percentage to 0-1 scale
      description: generateDescription(data.disease, data.confidence, data.probabilities),
    };

  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

/**
 * Alternative function if you need to handle base64 images
 * Converts base64 to File object first
 */
export async function analyzePlantImageBase64(
  base64Image: string,
  fileName: string = 'image.jpg'
): Promise<DetectionResult> {
  // Convert base64 to File
  const fetchRes = await fetch(base64Image);
  const blob = await fetchRes.blob();
  const file = new File([blob], fileName, { type: blob.type });
  
  return analyzePlantImage(file);
}

/**
 * Helper function to generate a description from the prediction
 */
function generateDescription(
  disease: string, 
  confidence: number, 
  probabilities?: Record<string, number>
): string {
  const confidenceLevel = confidence >= 80 ? 'high confidence' : 
                         confidence >= 60 ? 'moderate confidence' : 
                         'low confidence';
  
  if (disease.toLowerCase().includes('early blight')) {
    return `Detected Early Blight with ${confidenceLevel} (${confidence}% confidence). Look for brown circular spots with concentric rings on lower leaves.`;
  } else if (disease.toLowerCase().includes('late blight')) {
    return `Detected Late Blight with ${confidenceLevel} (${confidence}% confidence). Watch for water-soaked lesions and rapid spread in wet conditions.`;
  } else if (disease.toLowerCase().includes('healthy')) {
    return `Plant appears Healthy with ${confidenceLevel} (${confidence}% confidence). Continue regular monitoring.`;
  } else {
    return `Analysis complete: ${disease} detected with ${confidence}% confidence.`;
  }
}

/**
 * Gets disease details from the local database based on detected class
 */
export function getDiseaseDetails(detectedClass: string) {
  const key = detectedClass
    .toLowerCase()
    .replace(' ', '_') as keyof typeof diseaseDatabase;
  
  // Handle different possible input formats
  if (diseaseDatabase[key]) {
    return diseaseDatabase[key];
  }
  
  // Try alternative formats
  if (detectedClass.toLowerCase().includes('early')) {
    return diseaseDatabase.early_blight;
  } else if (detectedClass.toLowerCase().includes('late')) {
    return diseaseDatabase.late_blight;
  } else if (detectedClass.toLowerCase().includes('health')) {
    return diseaseDatabase.healthy;
  }
  
  return null;
}

/**
 * Test the API connection
 */
export async function testApiConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'healthy';
  } catch {
    return false;
  }
}