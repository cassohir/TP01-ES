import React, { useState } from 'react';
import './Dashboard.css';
import OpenAI from 'openai';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    // Call the OpenAI API with user input
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true 
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `cite 5 nomes (somente os nomes) de filmes sugestão para quem gostou de "${searchTerm}"` }
        ],
      });

      const assistantResponse = chatCompletion.choices[0].message.content;
      setResponse(assistantResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Recomendador de Filmes</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Insira o nome do filme"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Pesquisar</button>
      </div>
      <div className="response-container">
        {response && (
          <div className="response">
            <h2>Filmes Recomendados:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
