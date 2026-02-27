const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const getSolution = async (description, category) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful IT support assistant. Provide clear, step-by-step solutions to technical issues. Keep responses concise and actionable."
        },
        {
          role: "user",
          content: `Provide a solution for this ${category} issue: ${description}`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 500
    });

    return chatCompletion.choices[0]?.message?.content || "Unable to generate solution at this time.";
  } catch (error) {
    console.error("AI Service Error:", error.message);
    return "Unable to generate solution at this time. Please contact support.";
  }
};

module.exports = { getSolution };
