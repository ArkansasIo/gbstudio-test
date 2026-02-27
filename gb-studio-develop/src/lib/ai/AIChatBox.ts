// AIChatBox.ts
// AI chat box system for editor integration

export interface AIProvider {
  id: string;
  name: string;
  apiKey: string;
  endpoint: string;
  description?: string;
}

export class AIChatBox {
  providers: AIProvider[] = [];
  maxProviders = 5;

  constructor(providers?: AIProvider[]) {
    if (providers) {
      this.providers = providers.slice(0, this.maxProviders);
    }
  }

  addProvider(provider: AIProvider) {
    if (this.providers.length < this.maxProviders) {
      this.providers.push(provider);
    }
  }

  removeProvider(id: string) {
    this.providers = this.providers.filter(p => p.id !== id);
  }

  getProvider(id: string): AIProvider | undefined {
    return this.providers.find(p => p.id === id);
  }

  sendMessage(providerId: string, _message: string): Promise<string> {
    // Example: send message to AI provider
    const provider = this.getProvider(providerId);
    if (!provider) return Promise.reject("Provider not found");
    // Implement API call logic here
    return Promise.resolve("AI response (mock)");
  }
}

// Example AI providers
export const DefaultAIProviders: AIProvider[] = [
  { id: "openai", name: "OpenAI GPT", apiKey: "", endpoint: "https://api.openai.com/v1/chat/completions" },
  { id: "anthropic", name: "Anthropic Claude", apiKey: "", endpoint: "https://api.anthropic.com/v1/complete" },
  { id: "google", name: "Google Gemini", apiKey: "", endpoint: "https://api.google.com/v1/gemini" },
  { id: "microsoft", name: "Microsoft Copilot", apiKey: "", endpoint: "https://api.microsoft.com/v1/copilot" },
  { id: "custom", name: "Custom AI", apiKey: "", endpoint: "" },
];
