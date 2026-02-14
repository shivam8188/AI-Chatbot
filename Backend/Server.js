
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;


//const port = "https://ai-chatbot-frontend-e4bb.onrender.com/";


app.use(cors(

  {
  origin: "https://ai-chatbot-frontend-e4bb.onrender.com",
  methods: ["GET", "POST"],
  credentials: true
}
));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  
});


