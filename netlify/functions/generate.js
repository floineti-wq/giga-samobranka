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
        console.log('Function started. Body:', event.body);
        const { subject, grade, topic, count, textData, difficulty } = JSON.parse(event.body);
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            console.error('GROQ_API_KEY is missing in process.env');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API Key not configured on Netlify. Please add GROQ_API_KEY in Site Settings -> Environment variables.' })
            };
        }

        const SYSTEM_PROMPT = `Ты — Волшебная Скатерть-Самобранка. Ты должна генерировать ГЛУБОКИЕ и ПОДРОБНЫЕ идеи.
        
        ПРАВИЛА МАГИИ (СТРОГО):
        1. ОБЪЕМ ОТВЕТА: Поле "a" (план) должно быть развернутым. Минимум 3-4 предложения, максимум 9 строк текста. Никаких ответов в одну строчку!
        2. СОДЕРЖАНИЕ: Пиши конкретные шаги, детали, секреты реализации. Текст должен быть плотным и полезным.
        3. СТИЛЬ: Используй HTML-теги <strong> для выделения ключевых этапов. Пиши живым, вдохновляющим языком.
        4. КОНТЕКСТ: Идея должна четко соответствовать роли "${subject}", ситуации "${grade}" и уровню сложности "${difficulty}".
        5. ФОРМАТ КАРТОЧКИ:
           - "q" (название): Яркое и четкое (до 15 слов).
           - "a" (реализация): Развернутый план (от 40 до 80 слов).
        6. ФОРМАТ ОТВЕТА: Только чистый JSON-массив: [{"q": "...", "a": "..."}]`;

        let userPrompt = `Тема: "${topic}". Сгенерируй ${count} уникальных идей.`;
        if (textData && textData.trim() !== "") {
            userPrompt += `\nИспользуй этот дополнительный контекст: "${textData}"`;
        }

        console.log('Calling Groq API...');
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
        console.log('Groq response received:', JSON.stringify(data).substring(0, 200));

        if (data.error) {
            throw new Error(`Groq API Error: ${data.error.message || JSON.stringify(data.error)}`);
        }

        const rawContent = data.choices[0].message.content;
        
        const startBracket = rawContent.indexOf('[');
        const endBracket = rawContent.lastIndexOf(']');
        
        if (startBracket === -1 || endBracket === -1) {
            throw new Error('Failed to parse JSON from AI response');
        }

        const jsonStr = rawContent.substring(startBracket, endBracket + 1);
        
        return {
            statusCode: 200,
            headers,
            body: jsonStr
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
