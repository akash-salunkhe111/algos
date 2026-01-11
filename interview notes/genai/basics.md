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

Understanding Quantization
### Definition
Quantization is the process of conversion from a higher memory format to a lower memory format. This is primarily used to optimize large models like Llama 2 (70 Billion parameters) which otherwise require massive resources and high costs.

The Core Mechanism
Weights to Matrix: Neural network weights are stored in matrices.

Floating Points: These weights are typically stored as FP32 (Full Precision / Single Precision), where each value takes up 32 bits.

The Conversion: Quantization reduces these 32-bit floating points into smaller formats, such as int8 (8-bit integers).

### Why Quantization Matters
Reducing the bit-width of model parameters leads to several advantages:

Inference Efficiency: Smaller models run much faster and require less computational power.

Hardware Compatibility: It enables high-perf ormance models to run on resource-constrained devices, such as:

Mobile Phones

Edge Devices

Resource Management: Helps mitigate the high cost and heavy resource requirements associated with massive models.


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

# Prompting techniques


- **Zero-shot prompting**  
  Asking the model to perform a task with **no examples**, relying purely on its pre-trained knowledge.

- **Few-shot prompting**  
  Providing **a small number of examples** in the prompt to guide the model’s behavior and output format.

- **Chain-of-Thought prompting**  
  Encouraging the model to **reason step by step** before giving the final answer, improving accuracy on complex tasks. like we do in dspy attribute sorter, with example we add reasoning like why this is the output

***
***
***

# What are dimensions
In a vector database, each data point (such as a word or an image) is transformed into a vector containing multiple values, and the number of these values is called the dimensionality or dimensions of the vector.dataknobs​
For example, word embeddings often use 300 dimensions, meaning each word is represented as a 300-dimensional vector where each dimension captures a specific aspect of the word's meaning or context.developers.cloudflare+1​
The choice of dimensionality affects the precision of similarity searches and computational performance—higher dimensions capture more data features but may require more resources, while lower dimensions are more efficient yet might lose nuanced relationships.


***
***
***

# How vector search works

Each data object, such as a document, image, or sentence, is transformed into a vector embedding—a numerical representation capturing the object's key features and semantics.

When a query is issued, it is also converted into a vector using the same embedding model, ensuring that comparison happens in the same vector space.weaviate​

The core of vector search is finding the vectors in the database that are most similar to the query vector. This is achieved by calculating the distance (such as Euclidean distance, cosine similarity, or dot product) between the query vector and each stored vector.



***
***
***

How to reduce costs in llms
1 - semantic/ vector caching -
If query has very similar similarity with previous query vector then we can reuse the output of similar query, we can cache it as vectors as keys and value as op from llm for that query
2 - using low cost model
3 - minimizing tokens passed to llm, maybe use reranker to get top docs to send to llm
4 - Rate limiting user 
https://interviewready.io/learn/ai-engineering/what-is-a-large-language-model/llm-improvements




***
***
***




***
***
***




***
***
***




***
***
***