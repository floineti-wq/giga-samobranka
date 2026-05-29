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
        1. ОБЪЕМ ОТВЕТА: Поле "a" (реализация) должно быть развернутым. Минимум 3-4 предложения, максимум 9 строк текста.
        2. СОДЕРЖАНИЕ: Пиши конкретные шаги, детали, секреты реализации. Текст должен быть плотным и полезным.
        3. СТИЛЬ: Используй HTML-теги <strong> для выделения ключевых этапов.
        4. КОНТЕКСТ: Идея должна соответствовать роли "${subject}" и ситуации "${grade}".
        5. ФОРМАТ JSON: Твой ответ должен быть СТРОГО валидным JSON-объектом с ключом "cards", содержащим массив из ${count} объектов.
           - КРИТИЧНО: Используй только двойные кавычки для ключей и строк.
           - КРИТИЧНО: Если внутри текста нужны кавычки, используй только ёлочки « » или экранируй их \".
        6. СТРУКТУРА: {"cards": [{"q": "название идеи", "a": "подробный план реализации"}]}`;

        let userPrompt = `Тема: "${topic}". Сгенерируй ровно ${count} уникальных идей для роли "${subject}".`;
        if (textData && textData.trim() !== "") {
            userPrompt += `\nИспользуй этот дополнительный контекст: "${textData}"`;
        }

        console.log('Calling Groq API with count:', count);
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
                temperature: 0.7,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        let rawContent = data.choices[0].message.content;
        console.log('Raw content from AI:', rawContent);
        
        // Очистка от возможных markdown-оберток
        rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

        // Попытка распарсить JSON
        let cards = [];
        try {
            const parsed = JSON.parse(rawContent);
            if (parsed.cards && Array.isArray(parsed.cards)) {
                cards = parsed.cards;
            } else if (Array.isArray(parsed)) {
                cards = parsed;
            } else {
                // Если пришел объект, но не массив, попробуем найти в нем любой массив
                for (let key in parsed) {
                    if (Array.isArray(parsed[key])) {
                        cards = parsed[key];
                        break;
                    }
                }
            }
        } catch (e) {
            console.error('JSON Parse failed. Attempting manual extraction.');
            const match = rawContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (match) {
                cards = JSON.parse(match[0]);
            }
        }

        if (!cards || cards.length === 0) {
            throw new Error('Не удалось получить список карточек от ИИ. Попробуйте еще раз.');
        }

        // Проверка структуры каждой карточки
        cards = cards.map(c => ({
            q: c.q || c.question || c.title || "Идея без названия",
            a: c.a || c.answer || c.description || c.plan || "План не сгенерирован"
        }));
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(cards)
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
