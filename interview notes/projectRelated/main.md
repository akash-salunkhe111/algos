# Vespa.ai
### Embedding model used
```
embeddinggemma-300m
Parameters	~308 Million
Quantized Size	8 bit (INT8)
Dimensions	768 (Output vector size)
Context Length	2,048 tokens
```

### we can use MRL scaling in vespa
```
In a standard embedding model, the information is spread out across all dimensions. 
If you have a 768-dimension vector and you cut it in half, 
you lose about half the meaning, making the search results inaccurate.

In an MRL-trained model, the model is specifically taught to "front-load" 
the most important, high-level information into the first few dimensions. 
The later dimensions only add finer details.
```

### Vespa details
```
It has "field" where we can define our data type and index type.
There are 3 phases - 

First Phase
Where it runs: Content Nodes (distributed across the cluster).

Documents Processed: All matching documents (potentially millions of records).

Purpose: To perform fast, lightweight scoring to narrow down the massive 
list of matches to the most promising candidates.

Common Functions: nativeRank, bm25, or simple linear mathematical expressions 
(e.g., attribute(popularity) + fieldMatch(title)).

Performance: Must be extremely efficient since it executes for every single 
document that passes the query filters.

Second PhaseWhere it runs: Content Nodes (locally on the data).Documents 
Processed: The Top $K$ documents (typically 100–1,000) as determined by the 
First Phase scores.Purpose: 
To apply more "expensive" and complex logic to a smaller, higher-quality subset of results.

Global PhaseWhere it runs: Stateless Container (the entry point/gateway).
Documents Processed: The Final Top $N$ results.Purpose: 
This phase runs after the results from all individual content nodes 
have been merged into a single global list. 
It is used for "all-field" re-ranking or logic that requires a 
global view of the results.

```



***
***
***

# Finetune Embedding model

```
2. PROJECT SUMMARY (For Interviews)
-----------------------------------
"I built a pipeline to fine-tune a Google embedding model (Gemma-300m) 
using Sentence Transformers. The goal was to improve semantic search 
by training the model to understand that a user's 'search query' and 
a 'clicked product title' are semantically similar.

```
### Training dataset eg - 
```
5. TRIPLET EXAMPLE (ANCHOR, POSITIVE, HARD NEGATIVE)
----------------------------------------------------
Although our dataset only provides pairs, understanding "Hard Negatives" is key.

* Anchor (Query):    "safety trainers size 9"
* Positive (Target): "Viper S1P Safety Trainers"
* Hard Negative:     "Nike Running Trainers" 
  (Why 'Hard'? Because it shares the word 'Trainers' and might look relevant 
   to a basic model, but it lacks the 'Safety' attribute required by the user.)
```

# What we used to train it
```
4. WHAT IS SENTENCE TRANSFORMER?
--------------------------------
In short: It is a Python framework built on top of Hugging Face Transformers.
While standard BERT models produce embeddings for *words*, SentenceTransformers
are specially tuned to produce a single, meaningful vector (embedding) for
an *entire sentence or paragraph*. This makes it possible to compare two
sentences (like a query and a product title) using simple cosine similarity.
```

### Before and after training eg
```
3. EXAMPLES: BEFORE vs AFTER TRAINING
-------------------------------------
Imagine the user searches for: "protection for eyes"

* BEFORE Training (General Knowledge):
  - The model might match it to generic texts about eyes or health.
  - It might NOT rank specific industrial safety gear highly if the words don't overlap much.
  - Top Result might be: "Eye drops for dry eyes" (Semantically related to 'eyes', but wrong intent).

* AFTER Training (Domain Specific):
  - The model learns from our dataset that "protection for eyes" often leads to 
  clicking "Safety Goggles" or "Visor".
  - It understands the *intent* of safety equipment.
  - Top Result becomes: "V-Gard Standard Visor Frame" (Even though 'protection' 
  isn't in the title, the embedding vector is now close).
  ```

### loss function used
```
TripletLoss
Core Concept:
TripletLoss teaches the model to position embeddings in vector space such that:
Anchor and Positive are close together
Anchor and Negative are far apart
```

***
***
***

# Finetune Reranker

### Basic flow
```

Query => embedding => Document Matching => Results => Reranking => LLm or other

```

### Model used - mixedbread-ai mxbai-rerank-large-v2

### problem with base model - 
```
The base model was trained on general web data and academic datasets like MS MARCO, 
which made it struggle with domain-specific queries in our
 e-commerce/industrial safety equipment catalog."
```

### Technique used
```
"What technique/approach did you use?"
> "I used supervised fine-tuning with labeled query-document-relevance triplets. 
The model is a cross-encoder based on a transformer architecture 
(likely BERT or DeBERTa-based), which I fine-tuned using relevance labels 
from our production data - specifically clicks and conversions from search sessions."

Key points:
Cross-Encoder Architecture (processes query + document together with cross-attention)
Supervised Learning (labeled relevance scores)
Transfer Learning (starting from pre-trained weights)
```

### dataset format
```
{
    "query": "hard hat with visor",
    "clicked_documents": [
        {
            "text": "V-Gard Full Brim Hard Hat with Face Shield",
            "clicked": True,
            "purchased": True,
            "dwell_time": 45
        },
        {
            "text": "MSA V-Gard Hard Hat with Visor Attachment",
            "clicked": True,
            "purchased": False,
            "dwell_time": 20
        },
        {
            "text": "3M SecureFit Safety Helmet with Face Shield",
            "clicked": True,
            "purchased": False,
            "dwell_time": 8
        }
    ],
    "not_clicked": [
        {
            "text": "Construction Hard Hat Storage Rack",
            "clicked": False
        }
    ]
}
```

### loss function
```
Weighted BCE Loss

Since you have rich metadata (clicked, purchased, dwell_time), you can weight the loss:

    if metadata.get('purchased'):
        return 2.0  # Strong positive signal
    elif metadata.get('clicked') and metadata.get('dwell_time', 0) > 30:
        return 1.5  # Medium positive signal (clicked + stayed)
    elif metadata.get('clicked'):
        return 1.0  # Weak positive signal (just clicked)
    else:
        return 1.



```

```
OP format for both embedding and reranker model is ONNX
```

***
***
***


# DSPY tagging of hazordous products

### model used - Llama 3.2 3B Q4 variant

### What is dspy
```
Prompt Automation: It replaces "trial-and-error" prompting. You don't write the prompt; 
the framework finds the best prompt for you.

Model Agnostic: If you switch from GPT-4 to Llama-3, you don't have to rewrite your prompts. 
You just click "Compile," and DSPy optimizes a new prompt specifically for the new model.

Structured AI: It turns "brittle strings" into "robust code." Your LLM app becomes a
 maintainable software program rather than a collection of hidden text files.
```


### dspy flow

```
Define Signatures (The "What"): Instead of writing a long prompt, you define a Signature. 
This is just a declarative specification of the input and output.

Example: question -> answer. You don't tell the model how to answer; you just tell it what 
the input and output look like.

Build Modules (The "How"): You choose a module to implement your signature. DSPy provides 
pre-built modules like dspy.Predict (simple), dspy.ChainOfThought (reasoning), o
r dspy.ReAct (agentic). This is like choosing a layer in a neural network.

Define Metrics & Data (The "Goal"): You provide a small dataset (e.g., 20–50 examples) 
and a Metric (a function that scores the output, like "Is the answer factually correct?").

Compile with an Optimizer (The "Magic"): You run a Teleprompter (Optimizer). 
This algorithm runs your program multiple times, tries different prompts and 
"few-shot" examples, and keeps the ones that score highest on your metric. 
It "compiles" your code into the best possible prompt for that specific model.

```




***
***
***

# NDCG

```
NDCG (Normalized Discounted Cumulative Gain) is one of the most popular metrics for
 evaluating the quality of ranking systems, such as search engines and recommendation algorithms.

Unlike simple metrics like Accuracy or Precision, NDCG understands that the order
 of results matters—a relevant item at the top is much more valuable than the same item at the bottom.
```

```
2. Basic Inputs for NDCG
Relevance Scores (Ground Truth): A set of "labels" for each item relative to a query. 
These are typically provided by human raters or gathered from user behavior (clicks, buys)

Predicted Ranking: The specific order of items returned by your AI/Search model.

Cutoff Point ($k$): Usually denoted as NDCG@k (e.g., NDCG@10).17 This tells the formula to 
only look at the top 18$k$ results, as users rarely scroll past the first page.19
```


***
***
***

# Recommendation system

## WRITE PATH – User Events Ingestion & Processing
```
Client (Web / Mobile)
        ↓
AWS API Gateway
        ↓
Lambda (Auth, validation, enrichment)
        ↓
Kinesis Data Streams  ←── High-throughput event ingestion
        ↓
Lambda / ECS Consumers
        ↓
Cassandra (User events – hot write store)
        ↓
SNS (fan-out notifications)
        ↓
SQS (buffered async jobs)
        ↓
BigQuery (Offline analytics & ML training)

```

## READ PATH – Serving Recommendations (Low Latency)
```
Client (Web / Mobile)
        ↓
API Gateway
        ↓
ECS Recommendation Service (Stateless)
        ↓
Cassandra (Precomputed recommendations)
        ↓
Response (Top-N items)

```


***
***
***