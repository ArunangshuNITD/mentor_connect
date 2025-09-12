// Simple Express backend for ChatGPT API integration
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ChatGPT API endpoint
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ reply: 'No message provided.' });

    try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
                max_tokens: 256
            })
        });
        const data = await openaiRes.json();
        const reply = data.choices && data.choices[0] && data.choices[0].message.content ? data.choices[0].message.content : 'Sorry, no response.';
        res.json({ reply });
    } catch (err) {
        res.status(500).json({ reply: 'Error connecting to ChatGPT.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
