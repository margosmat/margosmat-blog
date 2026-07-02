---
title: "Local Ornith 1.0 setup with the pi agent on a Mac"
description: "Sovereign local AI with frontier model power"
pubDate: 2026-06-28
tags: ["ornith", "ai", "llm", "pi", "agentic", "coding"]
lang: "en"
---

![Ornith cover image](/images/Ornith_cover.png)

## Introduction

At a time when the adjective "sovereign" is appearing more and more often in AI-related writing, whether because of Anthropic's Fable model blockade or the scale of the US monopoly in the frontier AI model market, we have recently received a genuinely interesting open-source model: Ornith 1.0, created by the DeepReinforce.AI lab. In this post, we will try to plug it into the pi harness and test its capabilities locally.

## Why Ornith 1.0?

Ornith 1.0 was built on top of Gemma 4 and Qwen 3.5 models and is available in several sizes: 9B, 31B, 35B-MoE, and 397B-MoE. Here, we will focus on the 9B model for local development. One interesting part of the model's RL process is the self-improvement framework that was used. Thanks to it, instead of following a human-defined scenario for specific types of tasks, the model had two stages at each RL step: 1. creating a solution scenario based on the task category and the previous scenario, 2. implementing the solution. I recommend the creators' [blog post](https://deep-reinforce.com/ornith_1_0.html) for benchmarks and more details about the models themselves.

## MLX-LM

`mlx-lm` is the official inference engine created by Apple for running LLM models locally. If you use a different environment, I recommend taking a look at [Ollama](https://ollama.com/) or [LMStudio](https://lmstudio.ai/).

Assuming you already use the Homebrew package manager, install `uv`, a package and project manager for Python:

```sh
brew install uv
```

Then run:

```sh
uvx --python 3.12 --isolated --from mlx-lm mlx_lm.server
```

`uv` will run the `mlx_lm` server in a virtual environment, pulling in the minimum set of packages required for this library. After that, we have an OpenAI chat completions-compatible `mlx_lm` server running at localhost:8080.

## PI harness

The next step is installing the `pi` agent. For installation instructions, see the [official website](https://pi.dev). Why pi? It is a minimal agent with zero startup overhead that we can extend according to our needs. Its system prompt is only about 200 tokens long, which is especially important when using local, resource-constrained models.

To configure Ornith 1.0 for the `pi` agent, create or edit the `~/.pi/agent/models.json` file using the parameters recommended by the creators:

```json
{
  "providers": {
    "mlx_lm": {
      "baseUrl": "http://localhost:8080/v1",
      "api": "openai-completions",
      "apiKey": "dummy",
      "models": [
        {
          "id": "mlx-community/Ornith-1.0-9B-8bit",
          "temperature": 0.6,
          "top_p": 0.95
        }
      ]
    }
  }
}
```

In my case, this is the model prepared for the MLX architecture by mlx-community, quantized to 8-bit, because I have 36 GB of RAM.

Start the agent:

```sh
pi
```

Select the model with the `/models` command:

![Ornith model selection in pi](/images/ornith_model_selection.png)

And voila! We have configured the `pi` agent with a local Ornith 1.0 model. The first prompt may take a while because the model needs to be downloaded from the repository and loaded.

## Conclusions

As you can see, setting up Ornith 1.0 locally is not especially complicated. You should keep in mind, however, that its behavior will differ from what we are used to when working with Codex or Claude Code. Still, we get a model that runs fully offline, independently of the whims of frontier model providers. Ornith itself has already helped me with a few bugs on the blog. It has hung a couple of times, but I will continue testing its capabilities on my own projects. Remember to test the model in your own workflows and use cases. Benchmarks may look great, but they will not capture how the model performs in your own conditions.

## Update 02.07.26

After testing the local setup as shown above, I recommend installing **oMLX** as the local inference engine instead. It is built on top of mlx-lm, but additionally has a clever KV cache management mechanism, allows adding per-model configuration, and has a sleek dashboard with data. In my testing the model was more stable, and "hanging" occurred less often. More info on the [project site](https://omlx.ai/).

![omlx dashboard](/images/omlx_dashboard.png)
