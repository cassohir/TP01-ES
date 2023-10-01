
import axios from "axios";
import OpenAI from "openai";


export const ServerConfig = {
  apiUrl: 'http://localhost:3333',
  apiKey: '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',
}

export const server = axios.create({
  baseURL: ServerConfig.apiUrl,
})

const { apiKey } = ServerConfig;

export const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true 
});