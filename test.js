import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.OPENAI_API_KEY)
const config = new Configuration({
	apiKey: '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'
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:
        {
            "Q": "question",
            "A": "answer"
        }
    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
	console.log("Answer: ", parsedResponse.A);
};

runPrompt();