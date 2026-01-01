# What Are Parameters in LLMs? (7B, 13B, etc.) – Interview Explanation

In **Large Language Models (LLMs)**, **parameters** are the **learnable values** inside the neural network.

- They are mostly:
  - **Weights**
  - **Biases**
- Learned during **training**
- Stored as numbers (usually floating-point)


More parameters generally mean:

✅ Better ability to:
- Learn complex patterns
- Understand context
- Handle diverse tasks

❌ But also:
- Higher memory usage
- Slower inference
- More expensive training


***
***
***

# What is quantization

Quantization is a technique to reduce the size and memory usage of a large language model by storing its weights using fewer bits (lower precision numbers).

| Type | Bits   | Description               |
| ---- | ------ | ------------------------- |
| FP32 | 32-bit | Very accurate, very large |
| FP16 | 16-bit | Used on GPUs              |
| INT8 | 8-bit  | Common quantization       |
| INT4 | 4-bit  | Very small, very fast     |


Why Quantization is Used

Run LLMs on limited hardware

Laptops

Mobile

Edge devices

Reduce inference cost

Less GPU memory

Lower cloud bills

Faster inference

Smaller data → faster computation


***
***
***

# what is VRAM, and how it is imp for llm processing

VRAM (Video RAM) is high-speed memory located on the GPU (Graphics Processing Unit).

| RAM (CPU)         | VRAM (GPU)                  |
| ----------------- | --------------------------- |
| General purpose   | Optimized for parallel math |
| Slower bandwidth  | Very high bandwidth         |
| Used by OS & apps | Used by ML / graphics       |
| Cheaper           | Expensive                   |

🤖 Why VRAM Is Critical for LLMs
1️⃣ LLMs Must Fit in VRAM

During inference:

Model weights must be loaded into VRAM

If they don’t fit → model won’t run (or becomes extremely slow)

📌 Example:

7B model (FP16) ≈ 14 GB VRAM

7B model (INT4) ≈ 4–5 GB VRAM



***
***
***

# What is Context Window in an LLM? (Interview-friendly)

Context window is the maximum amount of text (tokens) an LLM can read, remember, and reason over at one time — including:

your prompt

system instructions

conversation history

documents you pass in

the model’s own previous replies

🔢 Tokens (not characters)

LLMs don’t count words or characters — they count tokens.

1 token ≈ ¾ of a word (English average)

"Context window" → ~2 tokens

Large code blocks = lots of tokens

📦 Example

If a model has a 8k context window:

Prompt: 2k tokens

Chat history: 3k tokens

Model response: max ~3k tokens left

👉 If you exceed 8k → older content is dropped or truncated

🎯 Why context window matters
1️⃣ Memory of conversation

Larger window → remembers more history

Smaller window → forgets earlier messages

2️⃣ Long documents

Needed for:

PDFs

Research papers

Logs

Codebases

3️⃣ Reasoning quality

More context → better answers (usually)

But more context = more cost + latency

🧠 Simple analogy (interview gold ⭐)

Context window is like RAM for the model — once it’s full, older data gets pushed out.



***
***
***

# What is difference between instruct and normal model

1. Base Models (Non-Instruct)
A Base model is the "raw" version of an LLM. It is trained primarily on a single objective: predict the next word in a sequence.


Behavior: It acts like a sophisticated autocomplete. If you give it a question, it might not answer it; instead, it might provide more questions or a list of similar topics because that’s how the internet data it was trained on is structured.

Example:

Prompt: "What is the capital of France?"

Base Model Output: "...and what is its population? France is a country in Europe..." (It's continuing the text, not necessarily answering).

Best For: Fine-tuning on your own specific data or continuing a creative story where you want the model to mimic a specific writing style without "chatting" back.

2. Instruct Models
An Instruct model is a Base model that has gone through an extra layer of training called Instruction Fine-Tuning (IFT) and often Reinforcement Learning from Human Feedback (RLHF).

Behavior: It is specifically trained to understand that when a human asks a question, it should provide a helpful, direct answer. It follows a "User/Assistant" format.

Example:

Prompt: "What is the capital of France?"

Instruct Model Output: "The capital of France is Paris."

Best For: 99% of everyday tasks—chatbots, summarization, Q&A, and following specific formatting rules (e.g., "Write this in a JSON format").


| Aspect                   | Non-Instruct            | Instruct            |
| ------------------------ | ----------------------- | ------------------- |
| Goal                     | Predict next token      | Follow instructions |
| Understands intent       | ❌ No                    | ✅ Yes               |
| Needs prompt engineering | High                    | Low                 |
| Safe & aligned           | ❌ Less                  | ✅ More              |
| Chat-ready               | ❌ No                    | ✅ Yes               |
| Best for                 | Fine-tuning, embeddings | Apps, assistants    |



***
***
***

# What is difference between reasoning and non reasoning model in llm

1. Non-Reasoning Models (Standard/Generic)
Standard models (like GPT-4o, Claude 3.5, or Gemini 2.0 Flash) operate on "System 1" thinking—intuitive and near-instant.

How they work: They predict the next word in a sequence based on vast pattern recognition. They jump directly from your question to the answer.

Behavior: They are incredibly fast and great for creative writing, chatting, and simple fact retrieval.

The Flaw: Because they don't "pause" to check their work, they are more likely to make logical errors in math or complex coding because they are committed to the first path they start writing.

Best For: Brainstorming, summarization, casual chat, and low-latency tasks.

2. Reasoning Models (Thinking Models)
Reasoning models (like OpenAI o1, DeepSeek-R1, or Gemini 2.0 Thinking) use "System 2" thinking—slow, deliberate, and logical.

How they work: They are trained via Reinforcement Learning to generate a private Chain of Thought (CoT) before they show you the final answer. They "talk to themselves" to test different strategies, catch their own mistakes, and refine their logic.


Behavior: When you ask a question, you’ll see a "Thinking..." status for several seconds. The model is essentially writing a hidden essay to figure out the solution before summarizing it for you.

The Benefit: They are significantly better at complex math, scientific reasoning, and debugging difficult code.

Best For: Coding architecture, advanced physics/math, logic puzzles, and "Deep Research" where accuracy is more important than speed.


***
***
***




***
***
***