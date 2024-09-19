# API Endpoints Documentation

## Base URL: `http://localhost:3000`

### 1. Get Health Status

**Endpoint**: `/health`

**Method**: `GET`

**Headers**:

```http
Content-Type: application/json
```

**Response**:

- Returns the current health status of the application.

```json
{ "status": "OK" }
```

---

### 2. Create a New Short URL

**Endpoint**: `/create`

**Method**: `POST`

**Headers**:

```http
Content-Type: application/json
```

**Request Body**:

```json
{
  "url": "https://www.google.com",
  "password": "1234",
  "expiresAt": "2024-10-02"
}
```

**Response**:

```json
{
  "link": "http://localhost:3000/l/PgFi5",
  "target": "https://www.google.com"
}
```

**Description**:

- Creates a short URL from a valid original URL.
- Optional fields: `password` (query param for redirection) and `expiresAt` (expiration date of the short URL).

---

### 3. Redirect to the Original URL

**Endpoint**: `/l/{shortId}?password={password}`

**Method**: `GET`

**Headers**:

```http
Content-Type: application/json
```

**Description**:

- Redirects to the original URL if the link is valid and the correct password is provided (if required).
- Example: `/l/JNu95?password=1234`

---

### 4. Invalidate a Link

**Endpoint**: `/l/{shortId}?password={password}`

**Method**: `PUT`

**Headers**:

```http
Content-Type: application/json
```

**Response**:

```json
{
  "message": "Link invalid",
  "data": {
    "clicks": {
      "success": 3,
      "failed": 4
    },
    "_id": "66eb877580ec87565909dec4",
    "id": "PgFi5",
    "url": "https://www.google.com",
    "expiresAt": "2024-10-02T00:00:00.000Z",
    "valid": false,
    "__v": 0
  }
}
```

**Description**:

- Invalidates a specific short URL, preventing further redirects.
- Example: `/l/JNu95?password=1234`

---

### 5. Get the Stats of a Short URL

**Endpoint**: `/l/{shortId}/stats`

**Method**: `GET`

**Headers**:

```http
Content-Type: application/json
```

**Description**:

- Retrieves statistics on the number of times a specific short URL has been accessed.
- Example: `/l/3zt8I/stats`
  **Response**:

```json
{
  "stats": {
    "success": 3,
    "failed": 4,
    "total": 7
  }
}
```
