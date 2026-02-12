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

# Session Based Authentication

```
A traditional authentication method where the **server stores login 
state** in a session.

### 🔄 How it works
1. User logs in with credentials  
2. Server validates username/password  
3. Server creates a **session record** in DB/Memory (Redis)
Example session stored:
```js
{
  sessionId: "abc123xyz",
  userId: 42,
  role: "admin"
}
4. Server sends cookie to browser:
Set-Cookie: sessionId=abc123xyz; HttpOnly; Secure
5. Browser automatically sends cookie on every request:
6. Server looks up session → user authenticated


What happens on Logout?
- Browser requests logout endpoint
- Server deletes session from store
- Server clears cookie:


✅ Pros
  Simple and widely supported
  Easy to revoke sessions instantly
  Secure with HttpOnly cookies

⚠️ Cons
  Server must maintain session storage
  Not ideal for stateless microservices
  Needs Redis/shared session store in distributed apps

```




***
***
***

# OAuth 2

```
OAuth 2.0 is an **authorization framework** that lets users grant apps limited access  
**without sharing passwords**.
### 🌍 Real Example
“Login with Google” / “Import from Drive”

- You don’t give the app your Google password  
- Google shows a consent screen  
- Google issues an **Access Token** for limited access  


## 🔄 OAuth 2.0 Flow (Authorization Code Grant)

1. User clicks **Login with Google**
2. App redirects user to Google consent page
3. User approves permissions
4. Google redirects back with an **Authorization Code**
5. App exchanges code (via backend) for tokens:

```json
{
  "access_token": "ya29.a0AfH6SM...",
  "refresh_token": "1//0gL...",
  "expires_in": 3600
}
6. App calls APIs using token:
Authorization: Bearer <access_token>


🎟️ Token Types
Access Token → short-lived API access
Refresh Token → used to get new access tokens

❓If OAuth is Authorization, why “Login with Google”?
(OpenID Connect (OIDC))
When you click “Login with Google”, it feels like authentication — but what’s actually happening underneath is:
App (e.g., Canva) uses OAuth 2.0 flow to ask Google for permission.
Instead of requesting access to Google Drive, the app asks for your basic profile info (openid, email, profile).

Google returns an ID Token (JWT) — that’s where authentication happens.

```



***
***
***

# SSO (Single Sign-On)

```
SSO means a user logs in **once** and can access **multiple applications**  
without logging in again.

👉 *One identity → many systems*

---

### ⚙️ Why SSO is needed
Without SSO:
- Separate login/password for every app (HR, Email, CRM, etc.)
- Users log in repeatedly
- Admins manage multiple credentials

With SSO:
- User authenticates once with a central **Identity Provider (Identity Provider)**
- Identity Provider issues a trusted token
- All apps rely on that Identity Provider for login

---

## 🔄 SSO Flow (High Level)

1. User tries to open **App A**
2. App redirects user to **Identity Provider** (JumpCloud, Okta, Azure AD)
3. User logs in once (Password + MFA)
4. Identity Provider issues an authentication proof:

- **SAML Assertion** or  
- **JWT ID Token**

5. User is redirected back → App A grants access
6. Later user opens **App B**
7. Identity Provider detects user already logged in → auto-signs in

---
```



***
***
***





***
***
***