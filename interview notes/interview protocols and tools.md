# RTMP and DASH use cases in Real time video usecases
1. RTMP (Real-Time Messaging Protocol)
Originally developed by Adobe for Flash player, RTMP is a TCP-based protocol designed for low-latency communication.

How it works: It maintains a persistent connection between the client (encoder) and the server, splitting streams into small packets for fast delivery.

Key Characteristic: Very low latency (fast), but requires a dedicated server connection (stateful) and is no longer supported for playback in modern web browsers.

Use Cases:

First Mile Delivery (Ingest): This is the industry standard for sending video from recording software (like OBS, vMix, or Zoom) to a streaming server (like YouTube or Twitch).

Legacy Systems: Older IP cameras or closed-circuit internal streaming systems.

2. MPEG-DASH (Dynamic Adaptive Streaming over HTTP)
DASH is an open-standard, bit-rate adaptive streaming protocol that runs over standard HTTP web servers.

How it works: It breaks the video into small file chunks (e.g., 2-10 seconds long) and creates a "Manifest" file. The video player requests these chunks one by one. If the user's internet slows down, the player automatically requests lower-quality chunks (Adaptive Bitrate Streaming) to prevent buffering.

Key Characteristic: High reliability, works through standard firewalls (port 80/443), and is codec-agnostic (can use H.264, H.265, VP9, etc.).

Use Cases:

Last Mile Delivery (Playback): Delivering content to end-users on browsers, Smart TVs, and Android devices (Netflix, YouTube, and Hulu use DASH or HLS).

Variable Network Conditions: Streaming to mobile devices where 4G/5G signal strength fluctuates.

Summary: How they work together
In a typical live stream setup, you use RTMP to send the video to the server (because it's fast and stable for upload), and the server converts it to DASH to deliver it to viewers (because it scales well and works on all devices).


***
***
***

What is an HTTP Range Request?

HTTP Range Request is a feature of HTTP that allows a client to request only a specific portion (range) of a file instead of downloading the whole file.


```
  const response = await fetch("https://example.com/video.mp4", {
    headers: {
      "Range": "bytes=0-999999" // Request first 1MB
    }
  });

  // The server should return status 206 (Partial Content)
  console.log(response.status); // 206
```

It uses the HTTP header:

```
Range: bytes=start-end
```

Example:

```
Range: bytes=0-1024
```

This means → “give me the first 1 KB of the file.”

💡 Why do we need it?

Useful for streaming media (audio/video)

Resume downloads

Quickly seek to a certain part of a file

Progressive loading

Avoid downloading huge files fully

🎵 Example (streaming music/video)

A player wants audio from 5 minutes onwards.

It sends:
```
Range: bytes=1000000-
```

The server returns only that chunk.

This is exactly how YouTube, Spotify, Netflix, etc stream content from servers/CDNs.

📡 Server Response

If server supports it, response will be:

HTTP/1.1 206 Partial Content


***
***
***


What is Kafka?

Apache Kafka is a distributed streaming platform used to collect, store, and process large volumes of real-time data.
It works as a high-throughput, fault-tolerant, pub/sub message queue with durable storage.

⭐ Kafka Key Features

High throughput – handles millions of messages/sec

Scalable – add brokers/partitions horizontally

Durable storage – messages stored on disk with replication

Fault tolerant – survives node failures

Real-time streaming – low-latency data pipelines

Replayable messages – consumers can re-read events

Pub/Sub model – multiple apps read the same data independently

Decoupling of services – microservices communication backbone

🚀 Common Use Cases

Real-time data ingestion (logs, IoT, telemetry)

Event-driven microservices

Streaming analytics (fraud detection, monitoring, dashboards)

Log aggregation (replacing Kafka + ELK pipelines)

Messaging backbone for distributed systems

Data pipelines (ETL to warehouses like Snowflake/BigQuery)

Order processing / tracking systems

High-volume IoT data streaming


Kafka uses a pull-based model where consumers fetch data at their own pace.
This avoids backpressure, enables batching, and allows replay by controlling offsets.

Kafka guarantees:
1. At most once – messages may be lost.
2. At least once – no loss, but duplicates possible (default).
3. Exactly once – no loss, no duplicates using idempotent producers + transactions.

Kafka’s durability (disk storage, replication) + offset tracking make it ideal for
high-throughput, fault-tolerant streaming systems.



***
***
***

# Locking for ticket booking, hotel booking to avoid concurrent booking issue
use redis to lock the room with TTL 5 mins, this techinque is called "redis lock"


***
***
***

# apache flink

For logger system like splunk, when we get millions of message in kafka, we need some middleware
to stream all the messages along with parsing and enrichment and valadition service before saving it to db,
for that we can use this

Apache Flink is a distributed stream-processing framework used to process real-time data streams with low latency and exactly-once guarantees.

[Servers / Lambdas]
        ↓
     Kafka
        ↓
     Flink
        ↓
  Storage (Cassandra / S3)
        ↓
     Query Layer
Why this works
Kafka absorbs bursts (millions/sec)

Flink performs:

parsing

enrichment

aggregation

anomaly detection

Storage optimized for fast time-range queries

Splunk itself internally uses similar patterns (stream ingestion + indexing).



***
***
***


# Server-Sent Events (SSE)

Server-Sent Events (SSE) is a technology that allows a server to push realtime updates to the client over a single long-lived HTTP connection.

Unlike WebSockets, SSE is **one-way communication**:
- Server → Client

The client subscribes to an event stream, and the server continuously sends updates whenever new data is available.

---

# How SSE Works

1. Client opens a connection using `EventSource`
2. Server keeps the HTTP connection open
3. Server pushes events continuously
4. Client receives updates instantly without polling

---

# Example

## Client

```javascript
const eventSource = new EventSource('/events');

eventSource.onmessage = (event) => {
  console.log(event.data);
};


***
***
***
