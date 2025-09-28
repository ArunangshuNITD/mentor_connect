// server.js

// 1. Import necessary libraries
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Configure the environment
dotenv.config(); // Load environment variables from .env file
const app = express();
const port = 3000; // You can choose any port

// 3. Set up middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to understand JSON from the request body

// 4. Initialize the Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 5. Create the API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body; // Get the user's message from the request

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // *** Improvement: Add context for the AI ***
    const chatPrompt = `
      You are a friendly and helpful AI assistant for a website called "Mentor Connect". 
      Your goal is to help students and potential mentors who have questions about the platform.
      Keep your answers concise and relevant to mentorship, career guidance, and the features of Mentor Connect.
      
      User's question: "${message}"
    `;

    const result = await model.generateContent(chatPrompt);
    const response = await result.response;
    const text = response.text();

    // Send the AI's response back to the front-end
    res.json({ reply: text });

  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
});

// 6. Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});