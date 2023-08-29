const OpenAI = require('openai');

async function main() {
  const openai = new OpenAI({
    apiKey: "sua chave aqui",
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": `cite 5 nomes (somente os nomes) de filmes sugestão para quem gostou de "Resgate do Soldado Ryan"` }
      ],
    });
    console.log(chatCompletion.choices[0].message);
  } catch (error) {
    console.error(error);
  }
}

main();
