const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Включаем CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { subject, grade, topic, count, textData, difficulty } = JSON.parse(event.body);
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API Key not configured on Netlify' })
            };
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
        
        return {
            statusCode: 200,
            headers,
            body: jsonStr
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
