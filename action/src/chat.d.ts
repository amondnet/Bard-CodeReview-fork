export declare class Chat {
    private apikey;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<any>;
    private sendMessage;
}
