const axios = require('axios');
require('dotenv').config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL; // Verifique a URL correta da API

async function generateResponse(prompt) {
  try {
    const response = await axios.post(DEEPSEEK_API_URL, {
      model: "deepseek-chat", // Verifique o modelo correto
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error.response?.data || error.message);
    throw new Error('Failed to generate response from DeepSeek API');
  }
}

module.exports = {
  generateResponse
};