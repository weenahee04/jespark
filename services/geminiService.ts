import { GoogleGenAI, Type } from "@google/genai";
import { KnowledgeGraphData } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const generateHealthAdvice = async (
  prompt: string, 
  onChunk: (text: string) => void
): Promise<string> => {
  if (!apiKey) {
    const errorMsg = "API Key is missing. Please configure process.env.API_KEY.";
    onChunk(errorMsg);
    return errorMsg;
  }

  try {
    // Using the recommended flash model for quick text tasks
    const model = 'gemini-3-flash-preview';
    
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, professional, and empathetic Thai healthcare assistant for a Wellness Rewards app. Keep answers concise, encouraging, and use polite Thai (adding 'ครับ/ค่ะ'). Focus on general wellness, nutrition, and explaining medical terms simply. Do not provide medical diagnosis.",
      }
    });

    let fullText = '';
    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;

  } catch (error) {
    console.error("Gemini API Error:", error);
    const errorMsg = "ขออภัยครับ ระบบขัดข้องชั่วคราว (Sorry, temporary system error).";
    onChunk(errorMsg);
    return errorMsg;
  }
};

export const extractKnowledgeGraph = async (conversationText: string): Promise<KnowledgeGraphData> => {
  if (!apiKey) return { nodes: [], edges: [] };

  try {
    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze the following health consultation text and extract a Knowledge Graph. 
      Identify entities such as Symptoms, Diseases/Conditions, Medicines/Treatments, Locations/Clinics, and others.
      Create relationships between them (e.g., CAUSES, TREATED_BY, LOCATED_AT).
      
      Text to analyze: "${conversationText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING, description: "Short display label, e.g. 'Headache'" },
                  type: { 
                    type: Type.STRING, 
                    enum: ['symptom', 'disease', 'medicine', 'location', 'other'] 
                  }
                },
                required: ['id', 'label', 'type']
              }
            },
            edges: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING, description: "id of the source node" },
                  target: { type: Type.STRING, description: "id of the target node" },
                  relation: { type: Type.STRING, description: "Relationship label, e.g. 'TREATS'" }
                },
                required: ['source', 'target', 'relation']
              }
            }
          },
          required: ['nodes', 'edges']
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as KnowledgeGraphData;
      return data;
    }
    return { nodes: [], edges: [] };

  } catch (error) {
    console.error("Knowledge Graph Extraction Error:", error);
    return { nodes: [], edges: [] };
  }
};