import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Analyzes a specific regulatory concern using Gemini (SocialFi Expert Response).
 */
export const analyzeConcern = async (concernTitle: string, concernDescription: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please set process.env.API_KEY.";

  try {
    const prompt = `
      As an expert insurer on the ELIXIR SocialFi platform, analyze this user concern.
      ELIXIR mission: Make insurance accessible and trustworthy in Cambodia.
      
      Concern: ${concernTitle}
      Details: ${concernDescription}
      
      Provide a helpful, trust-building response (2 sentences max) suggesting a solution or explaining how ELIXIR's technology (Parametric/Smart Contract) helps.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error analyzing concern. Please try again later.";
  }
};

/**
 * Explains a complex insurance term for the Education module.
 */
export const explainPolicyTerm = async (term: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const prompt = `
      Explain the insurance term "${term}" to a complete beginner in simple, jargon-free language.
      Use an analogy if possible. Keep it under 50 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Definition unavailable.";
  } catch (error) {
    console.error("Gemini Explain Error:", error);
    return "Could not retrieve definition at this time.";
  }
};

/**
 * Chat with ELIXIR-AI (Updated with robust persona and context).
 */
export const chatWithAdvisor = async (history: {role: string, parts: {text: string}[]}[], message: string, contextData: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are ELIXIR-AI, an expert Cambodian insurance consultant.
        
        Your Goal:
        Provide structured, easy-to-read answers with real examples, regulations, and comparisons from Cambodia's insurance market (Forte, AIA, Prudential, etc.).
        
        Rules:
        1. Use simple, clear English.
        2. If discussing policies, mention "Smart Contracts" or "Parametric Claims" where relevant to ELIXIR.
        3. Always end your answer with **one helpful follow-up question** to keep the user engaged.
        
        Platform Context:
        ${contextData}
        
        Style Guide (Strictly Follow):
        - Use "## Header Title" for section headers.
        - Use "- Item" for bullet points.
        - Use **bold** for emphasis only inline.
        - Do not use asterisks for headers, use ## instead.
        - Be empathetic and trustworthy.`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am currently experiencing connection issues. Please try again.";
  }
};