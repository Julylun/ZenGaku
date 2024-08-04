import * as Assistant from '../../components/ZenGakuWidget/ZenGakuAssistant.js';


export {
    getGeminiReply,
    showReply
}

const getGeminiReply = async (message) => {
    const geminiApiKey = "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";
    const geminiApiUrl = "https://api.groq.com/openai/v1/chat/completions";
    console.log("mess: " + message);
    const geminiRequestBody = {
        messages: [
            {
                role: "user",
                content:  message,
            },
        ],
        model: "mixtral-8x7b-32768",
    };

    try {
        const response = await fetch(geminiApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${geminiApiKey}`,
            },
            body: JSON.stringify(geminiRequestBody),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return null; // or handle the error appropriately
    }
};


const showReply = async (message) => {
    const reply = await getGeminiReply(message+" ");
    Assistant.addMessage('assistant',reply,(localStorage.getItem('userName') == null) ? 'Guest' : localStorage.getItem('userName'));
    // window.scrollTo(0, document.getElementById('zengaku-assistant-message-container').scrollHeight);
    return reply;
};