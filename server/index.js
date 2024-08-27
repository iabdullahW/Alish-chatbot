const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

const groq = new Groq(process.env.GROQ_API_KEY);

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        { "role": "system", "content": "you are a chatbot" },
        { "role": "user", "content": message }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

    const responseText = chatCompletion.choices[0].message.content;
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error creating chat completion:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
