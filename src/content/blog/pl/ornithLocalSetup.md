---
title: "Lokalna konfiguracja Ornith 1.0 z agentem pi na Macu"
description: "Suwerenne AI lokalnie z mocą frontier modeli"
pubDate: 2026-06-28
tags: ["ornith", "ai", "llm", "pi", "agentic", "coding"]
lang: "pl"
---

![Ornith cover image](/images/Ornith_cover.png)

## Wstęp

W dobie coraz częściej pojawiającego się przymiotnika "suwerenny" w tekstach dotyczących AI, czy to ze względu na blokadę modelu Fable firmy Anthropic, czy to przez rozmiar monopolu USA na rynku frontier modeli AI, dostaliśmy w ostatnich dniach naprawdę ciekawy model open-source Ornith 1.0, stworzony przez lab DeepReinforce.AI, który postaramy się zaprząc w harness pi i przetestować lokalnie jego możliwości.

## Dlaczego Ornith 1.0?

Ornith 1.0 został stworzony na bazie modeli Gemma 4 i Qwen 3.5, jest dostępny w kilu rozmiarach (9B, 31B, 35B-MoE i 397B-MoE), przy czym my skupimy się na modelu 9B pod lokalny development. Ciekawostką w procesie RL modelu jest użyty framework self-improvement'u, dzięki niemu, zamiast podążać za zdefniniowanym przez człowieka scenariuszem dla konkretnych rodzajów zadań, model w każdym kroku RL miał 2 etapy: 1. stworzenie scenariusza rozwiązania na bazie kategorii zadania i poprzedniego scenariusza, 2. implementacja rozwiązania. Zapraszam na [blog post](https://deep-reinforce.com/ornith_1_0.html) twórców po benchmarki i więcej szczegółów odnośnie samych modeli.

## MLX-LM

`mlx-lm` to oficjalny silnik inferencji stworzony przez Apple do uruchamiania lokalnie modeli LLM. Jeśli korzystasz z innego środowiska polecam przyjrzenie się [Ollama](https://ollama.com/) lub [LMStudio](https://lmstudio.ai/).

Zakładając, że korzystasz już z menadżera paczek Homebrew, zainstaluj menadżera paczek/projektów dla języka Python: uv:

```sh
brew install uv
```

Następnie uruchom komendę

```sh
uvx --python 3.12 --isolated --from mlx-lm mlx_lm.server
```

`uv` uruchomi serwer `mlx_lm` w virtualnym środowisku, zaciągając minimalną wymaganą ilość paczek pod daną bibliotekę. Po tym mamy już uruchomiony server `mlx_lm` zgodny z OpenAI chat completions, pod adresem localhost:8080.

## PI harness

Następnym krokiem będzie instalacja agenta `pi`. Po instrukcję instalacji zapraszam na [oficjalną stronę](pi.dev). Dlaczego pi? Jest to minimalistyczny agent z zerowym narzutem na start, który możemy rozszerzać według naszych potrzeb. Posiada system prompt wielkości jedynie ok. 200 tokenów, co ma szczególne znaczenie przy użyciu lokalnych, ograniczonych zasobów.

Żeby skonfigurować Ornith 1.0 dla agenta `pi` tworzymy/edytujemy plik `~/.pi/agent/models.json`, korzystając z parametrów polecanych przez twórców:
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

W moim przypadku będzie to model przygotowany pod architekturę MLX przez mlx-community, skwantyzowany do 8bit, przez posiadane 36GB RAM.
Odpalamy agenta:

```sh
pi
```

Wybieramy model komendą /models:

![Ornith model selection in pi](/images/ornith_model_selection.png)

I voila! Mamy skonfigurowanego agenta `pi` z lokalnym modelem Ornith 1.0. Pierwszy prompt może chwilę potrwać, bo model musi zostać ściągnięty z repo i załadowany.

## Wnioski

Jak widać lokalna konfiguracja modelu Ornith 1.0 nie jest specjalnie skomplikowana. Trzeba jednak mieć na uwadze, że działanie będzie odbiegać od tego do czego jesteśmy przyzwyczajeni przy korzystaniu z Codex czy Claude Code. Jednak mamy tutaj model w pełni działający offline, niezależnie od kaprysów dostawców frontier modeli. Sam Ornith pomógł mi już w kilku bugach na blogu, parę razy zdarzyło mu się zawiesić, ale będę dalej testował jego możliwości na swoich projektach. Pamiętajcie, żeby testować model w swoich workflow/use-case'ach, benchmarki mogą wyglądać świetnie, ale nie oddadzą tego jak model się sprawdzi w naszych warunkach.
