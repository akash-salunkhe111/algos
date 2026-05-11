# commands 
```
npm init  -y
mkdir backend
npm i express axios cors
node index.js
```

# backend 
```
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/api/posts", async (req, res) => {
  try {
    console.log('request ======> ');
    
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => {console.log("Server is running on port 4000"); });
```

# Frontend

```
npx create-react-app my-app -  for react
npx create-next-app@latest - for next js
```

```
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:4000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  );
}

```

```
// Custom middleware
function loggerMiddleware(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    
    next(); // move to next middleware/route
}

// Use middleware
app.use(loggerMiddleware);
```


```
fastapi
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn requests

```
