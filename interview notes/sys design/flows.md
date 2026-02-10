# JWT flow

```
JWT (JSON Web Token) has 3 main parts:

Header - Specifies token type & signing algorithm.

Payload - Contains user data and token info — like userId, role, exp (expiry)

Signature - Ensures token wasn’t tampered with — 
created by hashing Header + Payload with a secret or private key

JWT flow - 

User Login (using username password)
   ↓
Server Validates Credentials
   ↓
JWT Generated + Returned
jwt.sign(
  { userId: 101, role: "admin" },
  SECRET_KEY,
  { expiresIn: "1h" }
);
   ↓
Client Stores Token
   ↓
Client Sends Token with Requests
   ↓
Server Verifies Token
jwt.verify(token, SECRET_KEY);

   ↓
Access Granted or Denied

```

### Are keys same for signing and verifying ?

```
Based on app
| Algorithm Type | Example Algo | Signing Key | Verifying Key |
| -------------- | ------------ | ----------- | ------------- |
| Symmetric      | HS256        | Same Secret | Same Secret   |
| Asymmetric     | RS256        | Private Key | Public Key    |

✅ When to Use What?
HS256 (Secret Key)

✔ Simple apps
✔ Single backend server
❌ Not ideal for distributed systems

RS256 (Public/Private Key)

✔ Large systems
✔ Multiple services verifying token
✔ More secure separation
```

### What is a Refresh Token

```
A refresh token is a long-lived token used to get a new access token (JWT)
after the old one expires — without requiring the user to log in again.

Login
  ↓
Server returns:
Access Token (short)
Refresh Token (long)
  ↓
Client uses Access Token for APIs
  ↓
Access Token expires
  ↓
Client sends Refresh Token to /refresh
  ↓
Server verifies Refresh Token
  ↓
New Access Token issued
  ↓
Client continues API access

Security Best Practices

✅ Store Refresh Token in HTTP-only cookies
✅ Keep Access Token short-lived
✅ Save Refresh Token in DB to allow logout/revoke
✅ Rotate Refresh Tokens (generate new one each refresh and delete old from db,
so if attacker steals old refresh token, that token cannot be used again)

Logout Flow (Refresh Token Revocation)
Server deletes refresh token from DB → user session ends.
We delete main token from user browser (localstorage and cookie)

But still if someone saved main token, that can be used for 10-15 mins ?
- Right, so to avoid this, we need to maintain
Token Blacklisting (Optional)
Server keeps a blacklist of logged-out tokens.
But this defeats the “stateless” advantage.
Most systems don’t do it unless high-security.

```


***
***
***

# When we use lambda for mongodb connections, and mongodb has some defined pool size, but lambdas are triggered in around 1000 at a time, what issue we can face

🚨 The Core Problem

MongoDB has a maximum connection pool size (default ≈ 100–500 depending on server).
But Lambda can easily spawn 1000 separate instances at once.

If each Lambda does this:

const client = new MongoClient(uri);
await client.connect();


It creates a new TCP connection to MongoDB.

💥 1000 Lambdas → 1000 connections
💥 But your MongoDB cluster may allow only ~200–500

This causes connection storm → connection exhaustion.

### ECS completely avoids the Lambda + MongoDB connection storm problem, because ECS runs long-lived containers, not short-lived per-invocation functions. so we can create connection pool and use it

### MongoDB Data API is a serverless, HTTP-based API provided by MongoDB Atlas.

### Create a middleware gateway service like ecs where lambda will request to get data. This service will keep and handle pool of connections


***
***
***

# How video download and upload works in s3

## SECURE VIDEO UPLOAD FLOW
### Client → Server (Upload Request)

Client sends metadata only:

```
{
  "fileName": "video.mp4",
  "fileSize": "2.4GB",
  "fileType": "video/mp4"
}
```

### Security checks at Server

Authenticate user (JWT / session)

Authorize upload permission

Validate file type & size


## Server → S3 (Prepare Multipart Upload)

### Server:
Generates pre-signed URLs for each chunk

URLs are:

Time-limited

Write-only

Object-scoped

Server returns:

```
{
  "uploadId": "abc123",
  "chunkUrls": [url1, url2, url3...]
}
```

## Client → S3 (Direct Chunk Upload)


Client:

Splits video into chunks (5–10MB)

Uploads chunks directly to S3

Parallel uploads + retries

✅ Server never touches video data
✅ Upload is resumable


## Client → Server (Upload Complete)

Client notifies:
```
{
  "uploadId": "abc123"
}
```

## Server → S3 (Finalize Upload)

Server:

Verifies all parts

Completes multipart upload

Stores metadata in DB

📌 Optional async jobs:

Virus scan

Transcoding

Thumbnail generation





# 🔵 SECURE VIDEO DOWNLOAD FLOW (CONFIDENTIAL)

## Client → Server (Access Request)
```
GET /videos/{videoId}/download
Authorization: Bearer <token>
```

## Server (Authorization + Policy Check)

Server verifies:

User identity

Ownership or access rights

Video sensitivity level

🚫 If unauthorized → 403 Forbidden



## Server → S3 (Generate Download URL)

Server generates read-only pre-signed URL:

Expiry: 30–120 seconds

Bound to single object

HTTPS only



## Client → S3 (Direct Download / Stream)

Client:

Streams or downloads video directly

URL expires automatically



***
***
***






***
***
***