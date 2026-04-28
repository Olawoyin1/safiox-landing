# Safiox Admin API Documentation

**Base URL:** `https://safiox-server-flu1.onrender.com/api/admin`

All admin endpoints require:
- `Authorization: Bearer <accessToken>` header
- The authenticated user must have `role: "admin"`

**Standard Error Responses:**
```json
{ "success": false, "message": "You do not have permission to perform this action" }  // 403
{ "success": false, "message": "Access token required" }  // 401
{ "success": false, "message": "Resource not found" }  // 404
```

---

## 1. ANALYTICS

### Get Platform Analytics
`GET /analytics`

No query params required.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "analytics": {
      "users": { "total": 1240, "newThisWeek": 38 },
      "organizations": { "total": 45, "verified": 30, "pending": 8 },
      "feed": { "totalPosts": 892 },
      "incidents": { "total": 310 },
      "sos": { "active": 2, "resolved": 198 },
      "community": { "activeAlerts": 3, "totalResponders": 120 }
    }
  }
}
```

---

## 2. USER MANAGEMENT

### Get All Users
`GET /users`

| Query Param | Type   | Required | Description                              |
|-------------|--------|----------|------------------------------------------|
| `role`      | String | No       | Filter by role: `personal`, `organization`, `admin`, `all` |
| `search`    | String | No       | Search by name or email                  |
| `page`      | Number | No       | Default `1`                              |
| `limit`     | Number | No       | Default `20`                             |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Olawoyin Gbolahan",
      "username": "gbolahan",
      "email": "gbolahan@example.com",
      "phone": "08077781418",
      "role": "personal",
      "avatar": "",
      "status": "safe",
      "isEmailVerified": true,
      "isDeactivated": false,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1240, "pages": 62 }
}
```

---

### Get Single User
`GET /users/:id`

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Olawoyin Gbolahan",
      "username": "gbolahan",
      "email": "gbolahan@example.com",
      "phone": "08077781418",
      "role": "personal",
      "avatar": "",
      "status": "safe",
      "isEmailVerified": true,
      "isDeactivated": false,
      "settings": { "pushNotifications": true, "emergencyAlerts": true },
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

### Update User Role
`PUT /users/:id/role`

**Request Body:**
```json
{ "role": "admin" }
```
Valid values: `personal`, `organization`, `admin`

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "User role updated",
  "data": { "user": { "_id": "...", "name": "Olawoyin Gbolahan", "role": "admin" } }
}
```

---

### Deactivate a User
`PUT /users/:id/deactivate`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "User deactivated",
  "data": { "user": { "_id": "...", "name": "Olawoyin Gbolahan", "email": "...", "isDeactivated": true } }
}
```

---

### Reactivate a User
`PUT /users/:id/reactivate`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "User reactivated",
  "data": { "user": { "_id": "...", "name": "Olawoyin Gbolahan", "email": "...", "isDeactivated": false } }
}
```

---

## 3. ORGANIZATION MANAGEMENT

### Get All Organizations
`GET /organizations`

| Query Param | Type   | Required | Description                                              |
|-------------|--------|----------|----------------------------------------------------------|
| `status`    | String | No       | `pending`, `verified`, `rejected`, `all`                 |
| `type`      | String | No       | `hospital`, `police`, `fire`, `ambulance`, `other`, `all`|
| `page`      | Number | No       | Default `1`                                              |
| `limit`     | Number | No       | Default `20`                                             |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "69c5a7871098c87c55313e51",
      "name": "Lagos State Hospital",
      "email": "admin@lagoshospital.com",
      "phone": "0801234567",
      "type": "hospital",
      "verificationStatus": "verified",
      "address": "1 Hospital Road, Lagos",
      "location": { "type": "Point", "coordinates": [3.3792, 6.5244] },
      "userId": { "_id": "...", "name": "Dr. Adewale", "email": "adewale@example.com" },
      "createdAt": "2026-02-01T08:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 45, "pages": 3 }
}
```

---

### Get Pending Organizations
`GET /organizations/pending`

No query params. Returns all orgs with `verificationStatus: "pending"`.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "organizations": [
      {
        "_id": "69c5a7871098c87c55313e51",
        "name": "Rapid Response Security",
        "type": "police",
        "verificationStatus": "pending",
        "verificationDocuments": ["https://res.cloudinary.com/..."],
        "userId": { "_id": "...", "name": "Emeka Obi", "email": "emeka@example.com" },
        "createdAt": "2026-04-01T10:00:00.000Z"
      }
    ],
    "count": 8
  }
}
```

---

### Approve Organization
`PUT /organizations/:id/approve`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Organization approved",
  "data": {
    "organization": {
      "_id": "69c5a7871098c87c55313e51",
      "name": "Rapid Response Security",
      "verificationStatus": "verified"
    }
  }
}
```
> Sends an approval email to the org and creates an in-app notification for the org admin.

---

### Reject Organization
`PUT /organizations/:id/reject`

**Request Body:**
```json
{ "reason": "Submitted documents are incomplete or unverifiable." }
```

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Organization rejected",
  "data": {
    "organization": {
      "_id": "69c5a7871098c87c55313e51",
      "name": "Rapid Response Security",
      "verificationStatus": "rejected",
      "verificationRejectionReason": "Submitted documents are incomplete or unverifiable."
    }
  }
}
```
> Creates an in-app notification for the org admin with the rejection reason.

---

## 4. FEED / CONTENT MODERATION

### Get All Posts
`GET /posts`

| Query Param | Type   | Required | Description                                        |
|-------------|--------|----------|----------------------------------------------------|
| `removed`   | String | No       | `true` = removed only, `false` = active only, omit = all |
| `search`    | String | No       | Search post content                                |
| `page`      | Number | No       | Default `1`                                        |
| `limit`     | Number | No       | Default `20`                                       |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "69d8299661f2311ac65097fc",
      "content": "Suspicious activity spotted near the market",
      "media": [{ "url": "https://res.cloudinary.com/...", "type": "image" }],
      "isLive": false,
      "isRemoved": false,
      "likes": ["64f1...", "64f2..."],
      "commentCount": 4,
      "authorId": { "_id": "...", "name": "Kehinde Martins", "username": "kehinde", "avatar": "" },
      "removedBy": null,
      "removalReason": null,
      "createdAt": "2026-04-09T22:35:02.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 892, "pages": 45 }
}
```

---

### Remove a Post (Takedown)
`PUT /posts/:id/remove`

**Request Body:**
```json
{ "reason": "Misinformation / violates community guidelines" }
```
`reason` is optional — defaults to `"Violation of community guidelines"`.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Post removed",
  "data": {
    "post": {
      "_id": "69d8299661f2311ac65097fc",
      "isRemoved": true,
      "removedAt": "2026-04-12T09:00:00.000Z",
      "removalReason": "Misinformation / violates community guidelines"
    }
  }
}
```
> Sends an in-app notification to the post author.

---

### Restore a Removed Post
`PUT /posts/:id/restore`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Post restored",
  "data": {
    "post": { "_id": "69d8299661f2311ac65097fc", "isRemoved": false }
  }
}
```

---

### Remove a Comment
`PUT /comments/:id/remove`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Comment removed",
  "data": { "comment": { "_id": "...", "isRemoved": true } }
}
```

---

## 5. SOS MANAGEMENT

### Get All Active SOS Alerts
`GET /sos/active`

No query params. Returns alerts with status `active` or `escalated`.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "alerts": [
      {
        "_id": "69c8fb32e052499bf7a4757f",
        "status": "active",
        "trackingToken": "abc123xyz",
        "location": { "type": "Point", "coordinates": [3.3792, 6.5244] },
        "userId": { "_id": "...", "name": "Olawoyin Gbolahan", "phone": "08077781418", "avatar": "" },
        "createdAt": "2026-04-12T08:30:00.000Z"
      }
    ],
    "count": 2
  }
}
```

---

### Get SOS History
`GET /sos/history`

| Query Param | Type   | Required | Description                                              |
|-------------|--------|----------|----------------------------------------------------------|
| `status`    | String | No       | `active`, `escalated`, `resolved`, `cancelled`, `all`    |
| `from`      | String | No       | ISO date string — start of date range e.g. `2026-01-01`  |
| `to`        | String | No       | ISO date string — end of date range e.g. `2026-04-12`    |
| `page`      | Number | No       | Default `1`                                              |
| `limit`     | Number | No       | Default `20`                                             |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "69c8fb32e052499bf7a4757f",
      "status": "resolved",
      "trackingToken": "abc123xyz",
      "location": { "type": "Point", "coordinates": [3.3792, 6.5244] },
      "userId": { "_id": "...", "name": "Olawoyin Gbolahan", "phone": "08077781418", "avatar": "" },
      "createdAt": "2026-04-10T08:30:00.000Z",
      "updatedAt": "2026-04-10T09:15:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 198, "pages": 10 }
}
```

---

### Admin Force-Resolve SOS Alert
`PUT /sos/:id/resolve`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "SOS alert resolved by admin",
  "data": { "alert": { "_id": "...", "status": "resolved" } }
}
```
> Emits a real-time socket event to all trackers and notifies emergency contacts.

---

## 6. INCIDENTS OVERSIGHT

### Get All Incidents (Cross-Org)
`GET /incidents`

| Query Param | Type   | Required | Description                                              |
|-------------|--------|----------|----------------------------------------------------------|
| `status`    | String | No       | `Pending`, `Responding`, `On-Scene`, `Resolved`, `all`   |
| `type`      | String | No       | `SOS`, `Medical`, `Fire`, `Security`, `Report`, `all`    |
| `orgId`     | String | No       | Filter by a specific organization ID                     |
| `page`      | Number | No       | Default `1`                                              |
| `limit`     | Number | No       | Default `20`                                             |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "69d6c11c747526fee143bc54",
      "type": "Security",
      "severity": "Medium",
      "status": "Pending",
      "outcome": "",
      "description": "Suspicious activity near the market",
      "location": {
        "type": "Point",
        "coordinates": [3.485835, 6.656785],
        "address": "Shoprite, Lekki"
      },
      "media": [{ "url": "https://res.cloudinary.com/...", "type": "image" }],
      "userName": "Kehinde Martins",
      "userPhone": "08168028145",
      "organizationId": { "_id": "69c5a7871098c87c55313e51", "name": "Lagos Police Command", "type": "police" },
      "userId": { "_id": "...", "name": "Kehinde Martins", "phone": "08168028145", "avatar": "" },
      "timeline": [
        { "action": "received", "timestamp": "2026-04-08T20:57:00.000Z", "note": "Incident reported by user" }
      ],
      "createdAt": "2026-04-08T20:57:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 310, "pages": 16 }
}
```

---

### Get Single Incident Detail (Admin)
`GET /incidents/:id`

No query params.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "incident": {
      "_id": "69d6c11c747526fee143bc54",
      "type": "Security",
      "severity": "Medium",
      "status": "Responding",
      "outcome": "",
      "description": "Suspicious activity near the market",
      "location": {
        "type": "Point",
        "coordinates": [3.485835, 6.656785],
        "address": "Shoprite, Lekki"
      },
      "media": [{ "url": "https://res.cloudinary.com/...", "type": "image" }],
      "userName": "Kehinde Martins",
      "userPhone": "08168028145",
      "organizationId": {
        "_id": "69c5a7871098c87c55313e51",
        "name": "Lagos Police Command",
        "type": "police",
        "phone": "0801234567",
        "address": "Police HQ, Lagos"
      },
      "userId": { "_id": "...", "name": "Kehinde Martins", "phone": "08168028145", "avatar": "" },
      "assignedUnitId": { "_id": "...", "unitName": "Unit Alpha", "type": "Patrol Car", "status": "Responding" },
      "assignedStaffId": { "_id": "...", "name": "Sgt. Bello", "role": "Field Officer" },
      "timeline": [
        { "action": "received", "timestamp": "2026-04-08T20:57:00.000Z", "note": "Incident reported by user" },
        { "action": "dispatched", "timestamp": "2026-04-08T21:05:00.000Z", "note": "Unit Alpha dispatched" }
      ],
      "createdAt": "2026-04-08T20:57:00.000Z",
      "updatedAt": "2026-04-08T21:05:00.000Z"
    }
  }
}
```

---

## 7. COMMUNITY RESPONDERS

### Get Community Stats
`GET /community/stats`

No query params.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "stats": {
      "alerts": { "total": 42, "active": 3, "completed": 35, "cancelled": 4 },
      "responders": { "total": 120, "available": 87, "verified": 45 },
      "avgRespondersPerAlert": "2.4"
    }
  }
}
```

---

### Get All Community Alerts
`GET /community/alerts`

| Query Param | Type   | Required | Description                                    |
|-------------|--------|----------|------------------------------------------------|
| `status`    | String | No       | `active`, `completed`, `cancelled`, `all`      |
| `page`      | Number | No       | Default `1`                                    |
| `limit`     | Number | No       | Default `20`                                   |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "description": "Someone collapsed near Shoprite",
      "status": "active",
      "radius": 3000,
      "visibility": "anonymous",
      "alertOfficialServices": ["hospital"],
      "location": { "type": "Point", "coordinates": [3.3792, 6.5244] },
      "responders": [
        { "userId": "...", "name": "John Doe", "status": "accepted", "eta": "5 mins" }
      ],
      "userId": { "_id": "...", "name": "Jane Smith", "email": "jane@example.com", "avatar": "" },
      "createdAt": "2026-04-12T10:05:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 42, "pages": 3 }
}
```

---

### Get Single Community Alert
`GET /community/alerts/:id`

No query params. Returns full alert with complete responder list.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "alert": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "description": "Someone collapsed near Shoprite",
      "status": "active",
      "radius": 3000,
      "visibility": "anonymous",
      "alertOfficialServices": ["hospital", "ambulance"],
      "notifyEmergencyContacts": false,
      "shareLocation": true,
      "location": { "type": "Point", "coordinates": [3.3792, 6.5244] },
      "responders": [
        {
          "userId": "64f1...",
          "name": "John Doe",
          "status": "accepted",
          "eta": "5 mins",
          "distance": "1.2 km",
          "acceptedAt": "2026-04-12T10:07:00.000Z"
        },
        {
          "userId": "64f2...",
          "name": "Amaka Obi",
          "status": "viewed"
        }
      ],
      "userId": { "_id": "...", "name": "Jane Smith", "email": "jane@example.com", "avatar": "" },
      "duration": 0,
      "createdAt": "2026-04-12T10:05:00.000Z"
    }
  }
}
```

---

### Admin Force-Resolve Community Alert
`PUT /community/alerts/:id/resolve`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Community alert resolved by admin",
  "data": {
    "alert": { "_id": "...", "status": "completed", "completedAt": "2026-04-12T11:00:00.000Z" }
  }
}
```
> Emits `community:alert-completed` with `{ resolvedBy: "admin" }` to the alert's socket room.

---

### Admin Force-Cancel Community Alert
`PUT /community/alerts/:id/cancel`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Community alert cancelled by admin",
  "data": null
}
```
> Emits `community:alert-cancelled` with `{ cancelledBy: "admin" }` to the alert's socket room.

---

### Get All Community Responders
`GET /community/responders`

| Query Param | Type   | Required | Description                        |
|-------------|--------|----------|------------------------------------|
| `available` | String | No       | `true` or `false` to filter        |
| `page`      | Number | No       | Default `1`                        |
| `limit`     | Number | No       | Default `20`                       |

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "specialty": "First Aid / CPR",
      "available": true,
      "verified": false,
      "rating": 4.5,
      "totalResponses": 12,
      "location": { "type": "Point", "coordinates": [3.381, 6.526] },
      "userId": { "_id": "...", "name": "John Doe", "email": "john@example.com", "avatar": "" },
      "createdAt": "2026-03-01T09:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 120, "pages": 6 }
}
```

---

### Verify / Unverify a Responder
`PUT /community/responders/:id/verify`

**Request Body:**
```json
{ "verified": true }
```
Set `verified: false` to revoke verification.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Responder verified",
  "data": {
    "responder": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "verified": true,
      "userId": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
    }
  }
}
```
> Sends an in-app notification to the responder.

---

### Delete a Responder Profile
`DELETE /community/responders/:id`

No request body.

**Sample Response `200`:**
```json
{
  "success": true,
  "message": "Responder profile removed",
  "data": null
}
```

---

## 8. AUTHENTICATION NOTES

All admin endpoints sit behind two middleware layers:

1. `authenticateToken` — validates the JWT from the `Authorization` header and attaches `req.user`
2. `authorizeRole('admin')` — rejects any user whose `role` is not `admin`

To get an admin token, log in via `POST /api/auth/login` with an account that has `role: "admin"`. The response returns `accessToken` and `refreshToken`.

**Login Request:**
```json
POST /api/auth/login
{
  "email": "admin@safiox.com",
  "password": "yourpassword"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "_id": "...", "name": "Admin", "role": "admin" }
  }
}
```

Use the `accessToken` in every subsequent request:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Access tokens expire — use `POST /api/auth/refresh` with the `refreshToken` to get a new one.

---

## 9. QUICK REFERENCE

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics` | Platform-wide stats |
| GET | `/users` | List all users |
| GET | `/users/:id` | Single user detail |
| PUT | `/users/:id/role` | Change user role |
| PUT | `/users/:id/deactivate` | Deactivate user |
| PUT | `/users/:id/reactivate` | Reactivate user |
| GET | `/organizations` | List all orgs |
| GET | `/organizations/pending` | Orgs awaiting verification |
| PUT | `/organizations/:id/approve` | Approve org |
| PUT | `/organizations/:id/reject` | Reject org |
| GET | `/posts` | List all feed posts |
| PUT | `/posts/:id/remove` | Remove a post |
| PUT | `/posts/:id/restore` | Restore a removed post |
| PUT | `/comments/:id/remove` | Remove a comment |
| GET | `/sos/active` | Active SOS alerts |
| GET | `/sos/history` | Paginated SOS history |
| PUT | `/sos/:id/resolve` | Force-resolve SOS |
| GET | `/incidents` | All incidents (cross-org) |
| GET | `/incidents/:id` | Single incident detail |
| GET | `/community/stats` | Community feature stats |
| GET | `/community/alerts` | All community alerts |
| GET | `/community/alerts/:id` | Single community alert |
| PUT | `/community/alerts/:id/resolve` | Force-resolve alert |
| PUT | `/community/alerts/:id/cancel` | Force-cancel alert |
| GET | `/community/responders` | All responder profiles |
| PUT | `/community/responders/:id/verify` | Verify/unverify responder |
| DELETE | `/community/responders/:id` | Delete responder profile |
