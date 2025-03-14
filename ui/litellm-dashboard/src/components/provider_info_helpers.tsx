import OpenAI from "openai";
import React from "react";

export enum Providers {
    OpenAI = "OpenAI",
    OpenAI_Compatible = "OpenAI-Compatible Endpoints (Together AI, etc.)",
    OpenAI_Text = "OpenAI Text Completion",
    OpenAI_Text_Compatible = "OpenAI-Compatible Text Completion Models (Together AI, etc.)",
    Azure = "Azure",
    Azure_AI_Studio = "Azure AI Foundry (Studio)",
    Anthropic = "Anthropic",
    Vertex_AI = "Vertex AI (Anthropic, Gemini, etc.)",
    Google_AI_Studio = "Google AI Studio",
    Bedrock = "Amazon Bedrock",
    Groq = "Groq",
    MistralAI = "Mistral AI",
    Deepseek = "Deepseek",
    Cohere = "Cohere",
    Databricks = "Databricks",
    Ollama = "Ollama",
    xAI = "xAI",
    AssemblyAI = "AssemblyAI",
    Cerebras = "Cerebras",
    Sambanova = "Sambanova",
    Perplexity = "Perplexity",
    TogetherAI = "TogetherAI",
    Openrouter = "Openrouter",
    FireworksAI = "Fireworks AI"

  }
  
export const provider_map: Record<string, string> = {
    OpenAI: "openai",
    OpenAI_Text: "text-completion-openai",
    Azure: "azure",
    Azure_AI_Studio: "azure_ai",
    Anthropic: "anthropic",
    Google_AI_Studio: "gemini",
    Bedrock: "bedrock",
    Groq: "groq",
    MistralAI: "mistral",
    Cohere: "cohere_chat",
    OpenAI_Compatible: "openai",
    OpenAI_Text_Compatible: "text-completion-openai",
    Vertex_AI: "vertex_ai",
    Databricks: "databricks",
    xAI: "xai",
    Deepseek: "deepseek",
    Ollama: "ollama",
    AssemblyAI: "assemblyai",
    Cerebras: "cerebras",
    Sambanova: "sambanova",
    Perplexity: "perplexity",
    TogetherAI: "togetherai",
    Openrouter: "openrouter",
    FireworksAI: "fireworks_ai"
};

export const providerLogoMap: Record<string, string> = {
    [Providers.OpenAI]: "https://artificialanalysis.ai/img/logos/openai_small.svg",
    [Providers.OpenAI_Text]: "https://artificialanalysis.ai/img/logos/openai_small.svg",
    [Providers.OpenAI_Text_Compatible]: "https://artificialanalysis.ai/img/logos/openai_small.svg",
    [Providers.OpenAI_Compatible]: "https://artificialanalysis.ai/img/logos/openai_small.svg",
    [Providers.Azure]: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
    [Providers.Azure_AI_Studio]: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
    [Providers.Anthropic]: "https://artificialanalysis.ai/img/logos/anthropic_small.svg",
    [Providers.Google_AI_Studio]: "https://artificialanalysis.ai/img/logos/google_small.svg",
    [Providers.Bedrock]: "https://artificialanalysis.ai/img/logos/aws_small.png",
    [Providers.Groq]: "https://artificialanalysis.ai/img/logos/groq_small.png",
    [Providers.MistralAI]: "https://artificialanalysis.ai/img/logos/mistral_small.png",
    [Providers.Cohere]: "https://artificialanalysis.ai/img/logos/cohere_small.png",
    [Providers.Vertex_AI]: "https://artificialanalysis.ai/img/logos/google_small.svg",
    [Providers.Databricks]: "https://artificialanalysis.ai/img/logos/databricks_small.png",
    [Providers.Ollama]: "https://artificialanalysis.ai/img/logos/ollama_small.svg",
    [Providers.xAI]: "https://artificialanalysis.ai/img/logos/xai_small.svg",
    [Providers.Deepseek]: "https://artificialanalysis.ai/img/logos/deepseek_small.jpg",
    [Providers.AssemblyAI]: "https://artificialanalysis.ai/img/logos/assemblyai_small.png",
    [Providers.Cerebras]: "https://artificialanalysis.ai/img/logos/cerebras_small.png",
    [Providers.Sambanova]: "https://artificialanalysis.ai/img/logos/sambanova_small.webp",
    [Providers.Perplexity]: "https://artificialanalysis.ai/img/logos/perplexity_small.png",
    [Providers.TogetherAI]: "https://artificialanalysis.ai/img/logos/togetherai_small.svg",
    [Providers.Openrouter]: "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://openrouter.ai/chat&size=256",
    [Providers.FireworksAI]: "https://artificialanalysis.ai/img/logos/fireworks_small_revised.png"

};

export const getProviderLogoAndName = (providerValue: string): { logo: string, displayName: string } => {
    if (!providerValue) {
        return { logo: "", displayName: "-" };
    }

    // Handle special case for "gemini" provider value
    if (providerValue.toLowerCase() === "gemini") {
        const displayName = Providers.Google_AI_Studio;
        const logo = providerLogoMap[displayName];
        return { logo, displayName };
    }

    // Find the enum key by matching provider_map values
    const enumKey = Object.keys(provider_map).find(
        key => provider_map[key].toLowerCase() === providerValue.toLowerCase()
    );

    if (!enumKey) {
        return { logo: "", displayName: providerValue };
    }

    // Get the display name from Providers enum and logo from map
    const displayName = Providers[enumKey as keyof typeof Providers];
    const logo = providerLogoMap[displayName as keyof typeof providerLogoMap];

    return { logo, displayName };
};

export const getPlaceholder = (selectedProvider: string): string => {
    if (selectedProvider === Providers.Vertex_AI) {
      return "gemini-pro";
    } else if (selectedProvider == Providers.Anthropic) {
      return "claude-3-opus";
    } else if (selectedProvider == Providers.Bedrock) {
      return "claude-3-opus";
    } else if (selectedProvider == Providers.Google_AI_Studio) {
      return "gemini-pro";
    } else if (selectedProvider == Providers.Azure_AI_Studio) {
      return "azure_ai/command-r-plus";
    } else if (selectedProvider == Providers.Azure) {
      return "azure/my-deployment";
    } else {
      return "gpt-3.5-turbo";
    }
  };

  export const getProviderModels = (provider: Providers, modelMap: any): Array<string> => {
    let providerKey = provider;
    console.log(`Provider key: ${providerKey}`);
    let custom_llm_provider = provider_map[providerKey];
    console.log(`Provider mapped to: ${custom_llm_provider}`);
    
    let providerModels: Array<string> = [];
    
    if (providerKey && typeof modelMap === "object") {
      Object.entries(modelMap).forEach(([key, value]) => {
        if (
          value !== null &&
          typeof value === "object" &&
          "litellm_provider" in (value as object) &&
          ((value as any)["litellm_provider"] === custom_llm_provider ||
            (value as any)["litellm_provider"].includes(custom_llm_provider))
        ) {
          providerModels.push(key);
        }
      });
  
      // Special case for cohere_chat
      // we need both cohere_chat and cohere models to show on dropdown
      if (providerKey == Providers.Cohere) {
        console.log("Adding cohere chat models");
        Object.entries(modelMap).forEach(([key, value]) => {
          if (
            value !== null &&
            typeof value === "object" &&
            "litellm_provider" in (value as object) &&
            ((value as any)["litellm_provider"] === "cohere")
          ) {
            providerModels.push(key);
          }
        });
      }
    }
  
    return providerModels;
  };
