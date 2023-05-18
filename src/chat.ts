// import { ChatGPTAPI } from 'chatgpt';
const fetch = require('node-fetch').default;

export class Chat {
  // private chatAPI: ChatGPTAPI;
  private apikey: string;
  constructor(apikey: string) {
    this.apikey = apikey;
    /*
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
      apiBaseUrl: process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1',
      completionParams: {
        model: process.env.MODEL || 'gpt-3.5-turbo',
        temperature: +(process.env.temperature || 0) || 1,
        top_p: +(process.env.top_p || 0) || 1,
      },
    });*/
  }

  private generatePrompt = (patch: string) => {
    const answerLanguage = process.env.LANGUAGE
      ? `Answer me in ${process.env.LANGUAGE},`
      : '';

    return `Bellow is the code patch, please help me do a brief code review,${answerLanguage} if any bug risk and improvement suggestion are welcome
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.sendMessage(prompt);

    console.timeEnd('code-review cost');
    return res.output;
  };

  private sendMessage = async (prompt: string) => {
    const request = await fetch("https://api.bardapi.dev/chat", {
      headers: { Authorization: `Bearer ${this.apikey}` },
      method: "POST",
      body: JSON.stringify({ input: prompt }),
    });
    const response = await request.json();
    // console.log(response.output);
    return response;
  }
}
