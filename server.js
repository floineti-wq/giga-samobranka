const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/api/generate', async (req, res) => {
    try {
        console.log('--- New Request for Groq received ---');
        const { subject, grade, topic, count, textData, difficulty } = req.body;

        if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_key_here') {
            return res.status(500).json({ error: 'Groq API Key is not configured in .env file' });
        }

        const SYSTEM_PROMPT = `Ты — профессиональный креативный консультант. Твоя задача — создавать лаконичные и полезные идеи.

        ПРАВИЛА ГЕНЕРАЦИИ:
        1. СТРОГОЕ СООТВЕТСТВИЕ РОЛИ: Идеи должны быть специфичны для профессии "${subject}".
        2. УЛЬТРА-ЛАКОНИЧНОСТЬ (КРИТИЧНО): 
           - q (идея): СТРОГО не более 8 слов.
           - a (план): СТРОГО не более 15 слов. Если слов больше 15, карточка будет испорчена! Пиши максимально сжато.
        3. ФОРМАТ КАРТОЧКИ:
           - q: Суть идеи.
           - a: Короткий план действий.
        4. ФОРМАТ ОТВЕТА: Только чистый JSON-массив: [{"q": "...", "a": "..."}]`;

        const userPrompt = `Сгенерируй ${count} уникальных идей для роли "${subject}". 
        Тема: "${topic}". 
        Ситуация/Уровень сложности: "${grade}". 
        Дополнительный контекст: ${textData || "нет"}.
        
        ВАЖНО: Идеи должны быть профессиональными для "${subject}". Геймдизайнеру нужны механики, а не ремонт в доме!`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.8
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Groq API Error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        const rawContent = data.choices[0].message.content;
        
        console.log('DEBUG: Groq Raw Response:', rawContent.slice(0, 200));

        const startBracket = rawContent.indexOf('[');
        const endBracket = rawContent.lastIndexOf(']');
        
        if (startBracket === -1 || endBracket === -1) {
            throw new Error('Groq вернул ответ не в формате JSON. Попробуйте еще раз.');
        }

        const jsonStr = rawContent.substring(startBracket, endBracket + 1);
        res.json(JSON.parse(jsonStr));

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
