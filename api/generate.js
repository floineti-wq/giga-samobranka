const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Включаем CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { subject, grade, topic, count, textData, difficulty } = req.body;
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            return res.status(500).json({ error: 'API Key not configured on server' });
        }

        const SYSTEM_PROMPT = `Ты — профессиональный креативный консультант. Твоя задача — создавать лаконичные и полезные идеи.
        ПРАВИЛА ГЕНЕРАЦИИ:
        1. СТРОГОЕ СООТВЕТСТВИЕ РОЛИ: Идеи должны быть специфичны для профессии "${subject}".
        2. УЛЬТРА-ЛАКОНИЧНОСТЬ (КРИТИЧНО): 
           - q (идея): СТРОГО не более 8 слов.
           - a (план): СТРОГО не более 15 слов.
        3. ФОРМАТ КАРТОЧКИ:
           - q: Суть идеи.
           - a: Короткий план действий.
        4. ФОРМАТ ОТВЕТА: Только чистый JSON-массив: [{"q": "...", "a": "..."}]`;

        const userPrompt = `Сгенерируй ${count} уникальных идей для роли "${subject}". Тема: "${topic}".`;

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

        const data = await response.json();
        const rawContent = data.choices[0].message.content;
        
        const startBracket = rawContent.indexOf('[');
        const endBracket = rawContent.lastIndexOf(']');
        const jsonStr = rawContent.substring(startBracket, endBracket + 1);
        
        res.status(200).json(JSON.parse(jsonStr));

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
