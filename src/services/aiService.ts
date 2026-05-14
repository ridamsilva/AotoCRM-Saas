import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getSmartReply(conversationId: string, lastMessages: any[]) {
  const prompt = `
    Você é um assistente comercial de uma loja de veículos premium.
    Baseado no histórico de conversa abaixo, sugira 3 respostas curtas e profissionais para o vendedor enviar ao cliente via WhatsApp.
    Mantenha o tom empático e focado em converter a venda ou agendar uma visita.
    
    Histórico:
    ${lastMessages.map(m => `${m.sender}: ${m.text}`).join('\n')}
    
    Retorne apenas um array JSON com as 3 sugestões, como no exemplo:
    ["Sugestão 1", "Sugestão 2", "Sugestão 3"]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
    });
    const text = response.text || '';
    // Clean JSON if needed
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error getting smart reply:", error);
    return [];
  }
}

export async function scoreLead(leadData: any) {
  const prompt = `
    Analise o lead automotivo abaixo e atribua um score de 0 a 100 baseado na probabilidade de fechamento.
    Considere a fonte, o interesse e o comportamento (se disponível).
    
    Lead:
    ${JSON.stringify(leadData)}
    
    Retorne apenas o número do score (ex: 85).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
    });
    const text = response.text || '';
    return parseInt(text.trim(), 10) || 50;
  } catch (error) {
    console.error("Error scoring lead:", error);
    return 50;
  }
}

export async function summarizeConversation(messages: any[]) {
  const prompt = `
    Resuma a negociação abaixo em um parágrafo curto, destacando:
    1. Veículo de interesse
    2. Principal dúvida ou objeção do cliente
    3. Próximo passo combinado
    
    Mensagens:
    ${messages.map(m => `${m.sender}: ${m.text}`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
    });
    return response.text || "Não foi possível gerar o resumo.";
  } catch (error) {
    console.error("Error summarizing conversation:", error);
    return "Não foi possível gerar o resumo.";
  }
}
