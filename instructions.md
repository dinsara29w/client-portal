# instructions.md

## Google Antigravity – Client Portal SaaS

**Founder:** MasterSoft
**Product Type:** Multi-Tenant B2B SaaS
**Target Users:** Agencies, Freelancers, Service Businesses

---

# 1. Executive Overview

**Google Antigravity** is a multi-tenant Client Portal SaaS that allows agencies and service providers to:

* Manage clients
* Manage projects
* Share files
* Track tasks
* Communicate in structured threads
* Provide clients with transparent project visibility

The product replaces chaotic communication across WhatsApp, email, and spreadsheets.

---
# 2. Business Plan

## 2.1 Problem

Agencies struggle with:

* Scattered communication
* Clients asking for status updates repeatedly
* No centralized document management
* No structured task visibility
* Lack of professionalism in project reporting

---

## 2.2 Solution

A secure client portal where:

* Agencies manage multiple clients
* Clients log in to see only their projects
* All tasks, files, and updates are centralized
* Communication is structured and traceable

---

## 2.3 Target Market

### Primary

* Web development agencies
* Marketing agencies
* Freelancers
* Software consultancies

### Secondary

* Real estate consultants
* Construction firms
* Digital service providers

---

## 2.4 Revenue Model

### Subscription Tiers

| Plan    | Price     | Limits                         |
| ------- | --------- | ------------------------------ |
| Starter | $9/month  | 5 clients, 10 projects         |
| Pro     | $29/month | 25 clients, unlimited projects |
| Agency  | $79/month | Unlimited + white label        |

---

## 2.5 Go-To-Market Strategy

1. Launch to MasterSoft clients first
2. Offer free beta for 30 days
3. Collect testimonials
4. Target LinkedIn + agency communities
5. Publish productivity comparison content

---

## 2.6 Competitive Advantage

* Simple UI (not bloated like enterprise tools)
* Affordable
* Built specifically for agencies
* Future AI integrations (auto summaries, smart reporting)

---

# 3. Product Architecture Overview

This is a **multi-tenant SaaS system**.

Each agency = one workspace
Each workspace = isolated data

---

# 4. Technical Plan

## 4.1 Recommended Stack

Frontend:

* React (Vite)
* TailwindCSS
* React Router

Backend:

* Node.js (Express) OR Laravel
* REST API architecture

Database:

* PostgreSQL

Authentication:

* Email/password
* Secure HTTP-only cookies
* Role-based access control

File Storage:

* Cloudflare R2 or AWS S3

Payments:

* Stripe subscriptions

Hosting:

* Backend: Render / Fly.io / VPS
* Frontend: Vercel / Netlify

---

# 5. Core System Design

## 5.1 Multi-Tenancy Structure

All tables must include:

```
workspace_id
```

Every query must enforce:

```
WHERE workspace_id = current_user.workspace_id
```

This prevents data leakage between agencies.

---

# 6. Database Schema (MVP)

## Workspaces

* id
* name
* logo_url
* plan
* created_at

## Users

* id
* workspace_id
* name
* email
* password_hash
* role (OWNER | STAFF | CLIENT)
* created_at

## Clients (Optional if separated from Users)

* id
* workspace_id
* company_name
* contact_email
* phone

## Projects

* id
* workspace_id
* client_id
* title
* description
* status (lead | active | paused | completed)
* created_at

## Tasks

* id
* workspace_id
* project_id
* title
* description
* status (todo | doing | done)
* due_date
* priority

## Files

* id
* workspace_id
* project_id
* uploaded_by
* file_url
* file_size
* created_at

## Comments

* id
* workspace_id
* project_id
* user_id
* message
* created_at

## Activity Logs

* id
* workspace_id
* user_id
* action_type
* metadata (JSON)
* created_at

---

# 7. Roles & Permissions

## OWNER

* Full access
* Billing management
* Team management

## STAFF

* Manage projects
* Manage tasks
* Upload files
* Cannot manage billing

## CLIENT

* View assigned projects
* Comment
* Upload files
* View tasks (limited)
* Cannot edit internal tasks

Implement strict middleware:

```
checkWorkspace()
checkRole()
```

---

# 8. Application Pages

## Public Pages

* Landing Page
* Pricing
* Login
* Signup
* Forgot Password

---

## Agency Dashboard

### Overview

* Total projects
* Tasks due soon
* Recent activity

### Clients

* Add client
* Invite client
* Edit client

### Projects

* Create project
* Filter by status
* Assign client

### Project Detail (Core Page)

Tabs:

* Overview
* Tasks
* Files
* Messages
* Activity

### Settings

* Workspace profile
* Team members
* Subscription

---

## Client Dashboard

* Project list
* Project detail
* Tasks view
* File uploads
* Comment thread

---

# 9. API Structure

## Auth

POST /auth/register
POST /auth/login
POST /auth/logout

## Workspace

GET /workspace
PUT /workspace

## Clients

GET /clients
POST /clients
PUT /clients/:id

## Projects

GET /projects
POST /projects
GET /projects/:id
PUT /projects/:id

## Tasks

POST /tasks
PUT /tasks/:id
DELETE /tasks/:id

## Files

POST /files/upload
GET /files/:id

## Comments

POST /comments
GET /comments/project/:id

---

# 10. Security Requirements

* Password hashing (bcrypt)
* JWT or secure cookie sessions
* Input validation
* Rate limit login endpoint
* Signed URLs for file access
* Server-side role verification
* CORS protection

---

# 11. SaaS Essentials

## Subscription Integration

Stripe:

* Create customer
* Create subscription
* Webhook listener
* Update workspace plan

Store in workspace:

* stripe_customer_id
* stripe_subscription_id
* subscription_status

---

# 12. Development Roadmap

## Phase 1 – Core MVP (Weeks 1–3)

* Auth
* Workspace creation
* Role system
* Projects
* Tasks
* File upload
* Comments

Launch Beta

---

## Phase 2 – Monetization (Weeks 4–6)

* Stripe integration
* Plan limits enforcement
* Billing dashboard
* Email notifications

---

## Phase 3 – Differentiator (After Launch)

Choose ONE:

* AI task summary
* Auto status reporting
* Change request workflow
* White label branding

---

# 13. Scaling Strategy

* Add Redis caching
* Add queue system (BullMQ)
* Move to object storage CDN
* Horizontal scaling ready architecture

---

# 14. Long-Term Expansion Ideas

* Invoicing system
* Time tracking
* Internal notes (hidden from client)
* Client feedback rating
* API access
* Mobile app

---

# 15. Key Success Metrics

* Monthly recurring revenue (MRR)
* Churn rate
* Average clients per workspace
* User activation rate
* Daily active workspaces

---

# 16. Core Product Philosophy

* Keep it simple
* Focus on clarity
* Avoid feature bloat
* Make agencies look professional
* Prioritize reliability over flashy UI

---

# 17. Final Founder Notes

This product:

* Aligns with MasterSoft expertise
* Is realistic to build
* Has strong B2B retention potential
* Can scale globally
* Can be built by a small technical team

Focus on execution speed and usability.

---

If you want next, I can generate:

* Full folder structure
* Production-level backend boilerplate layout
* Clean UI layout structure
* Stripe webhook implementation guide
* Multi-tenant middleware example code
