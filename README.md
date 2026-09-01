# 🚀 System Design & LLD Master Learning Kit — 2-Month Master Plan

> **The Ultimate Production & Interview Mastery Framework**  
> Designed for software engineers preparing for tech interviews (FAANG, Indian Product Companies, Deloitte, Cloud Consultancies) and building production systems at scale.

---

## 📑 Table of Contents
1. [Overview & Key Features](#-overview--key-features)
2. [How the Website is Structured](#-how-the-website-is-structured)
3. [📅 2-Month (8-Week) Study Plan: Zero to Advanced](#-2-month-8-week-study-plan-zero-to-advanced)
   - [Month 1: Core Fundamentals, Databases & LLD (Weeks 1–4)](#month-1-core-fundamentals-databases--lld-weeks-14)
   - [Month 2: High-Level System Design Case Studies & Production Mastery (Weeks 5–8)](#month-2-high-level-system-design-case-studies--production-mastery-weeks-58)
4. [💡 Daily & Weekly Study Routines](#-daily--weekly-study-routines)
5. [🛠️ How to Use the Interactive Dashboard Features](#%EF%B8%8F-how-to-use-the-interactive-dashboard-features)
6. [💻 How to Run Locally](#-how-to-run-locally)

---

## 🎯 Overview & Key Features

This platform is a **single-page interactive master application** containing everything required to master System Design, Low-Level Design (LLD), Cloud Architecture, Testing, and Behavioral interviews:

- **10-Phase Step-by-Step Roadmap**: From network protocols and database internals to CQRS, Event Sourcing, and Distributed Systems.
- **20+ Production Case Studies**: Real-world breakdowns (Netflix, Uber, WhatsApp, Twitter, Instagram, TinyURL, etc.) with clarification questions, architecture components, real bottlenecks, and tricky follow-ups.
- **Building Blocks Library**: Deep dives into Load Balancers, API Gateways, Redis, Kafka, Cassandra, PostGIS, Service Mesh, etc.
- **Low-Level Design (LLD) & SOLID**: SOLID principles with code violations/fixes, 10 classic LLD problems (Parking Lot, Elevator, Splitwise, Vending Machine, Uber LLD, Swiggy LLD), and GoF design pattern cheatsheet.
- **Complete Technology Decision Master Table**: 40 architectural trade-off decisions (e.g. SQL vs NoSQL, WebSockets vs SSE, Kafka vs SQS) with "First Consideration", "Valid Alternative", and "What to NEVER Use Blindly".
- **Cloud Architecture Matrix**: Multi-cloud mapping across **AWS vs Azure vs GCP** for transferable system architecture skills.
- **Testing Strategies & CI/CD**: 10 testing types (Unit, Integration, Contract, E2E, Load, Chaos, Mutation) + 10-step CI/CD deployment pipeline.
- **45-Minute Interview Framework & Deloitte Advice**: Exact time management breakdown, top 6 interviewer questions, and Deloitte/Enterprise consulting guidance.
- **Behavioral STAR Stories**: 9 fully-worked STAR scenarios + top 10 behavioral question prep.
- **Real Engineering Blogs**: 35 curated engineering blogs (Netflix, Stripe, Uber, Discord, Cloudflare, Figma, Notion) with must-read article links.
- **Interactive Architecture Decision Wizard**: Input system constraints (QPS, Data Shape, Availability, Async) to auto-generate production-grade blueprints and safety checklists.

---

## 🧭 How the Website is Structured

The dashboard is divided into 10 distinct navigation tabs:

| Tab | Purpose | What You Learn |
| --- | --- | --- |
| 🗺️ **10-Phase Roadmap** | Structured learning journey | Fundamental networking, databases, caching, message queues, scaling, reliability, and advanced patterns. |
| 🧱 **Building Blocks** | Core infrastructure components | Detailed specs, use cases, anti-patterns, and study links for 15+ building blocks. |
| 💼 **Case Studies** | Production system breakdowns | 20+ architectural blueprints with bottleneck solutions and tricky Q&A. |
| ☁️ **Cloud Matrix** | AWS vs Azure vs GCP | Cloud-agnostic concepts mapped to concrete cloud vendor services. |
| 📊 **Tech Decision Table** | 40 Architectural Trade-offs | Justifying tool choices using trade-offs instead of tech trends. |
| 🧪 **Testing Strategies** | Quality & Resilience | Testing pyramid, k6 load testing, chaos engineering, and 10-step CI/CD pipeline. |
| 📐 **LLD & Design Patterns** | Object-Oriented & SOLID | SOLID principles, 10 LLD interview problems, and 23 GoF patterns. |
| 🎯 **Interview Prep** | 45-Min Framework | Step-by-step 45-min interview flow, golden Q&A, and Deloitte enterprise advice. |
| 💬 **Behavioral (STAR)** | Behavioral Round Mastery | Worked STAR examples for outages, scaling, team conflicts, and tight deadlines. |
| 📰 **Engineering Blogs** | Real-world production blogs | Direct links to engineering blogs that write about real outages and scaling. |

---

## 📅 2-Month (8-Week) Study Plan: Zero to Advanced

Follow this structured 8-week timeline to systematically master system design.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        2-MONTH SYSTEM DESIGN ROADMAP                   │
├───────────────────────────────────┬────────────────────────────────────┤
│   MONTH 1: FUNDAMENTALS & LLD    │  MONTH 2: HLD, CLOUD & INTERVIEW   │
│  - Week 1: Networking & Math      │ - Week 5: Warm-up Case Studies     │
│  - Week 2: Databases & Storage    │ - Week 6: Advanced Case Studies    │
│  - Week 3: Caching, Queues, Mesh  │ - Week 7: Cloud, Tech Trade-offs   │
│  - Week 4: SOLID & LLD Problems   │ - Week 8: Mock Prep & Behavioral   │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

### Month 1: Core Fundamentals, Databases & LLD (Weeks 1–4)

#### 🔹 **Week 1: Internet Fundamentals & Back-of-Envelope Math**
- **Goal**: Understand how data moves across the web and master fast estimation math.
- **Tasks**:
  1. Open **10-Phase Roadmap → Phase 1 (How the Internet Works)**.
  2. Study *URL lifecycle*, *TCP vs UDP*, *HTTP/1.1 vs HTTP/2 vs HTTP/3*, and *TLS 1.3 Handshake*.
  3. Practice *Back-of-Envelope Estimation* (calculate QPS, storage for 10M DAU, and memory cache sizes using Pareto's 80/20 rule).
  4. Read the recommended resource links under Phase 1.
- **Checklist Item**: Mark Phase 1 topics as completed in the dashboard.

#### 🔹 **Week 2: Databases, Storage Engines & Data Modeling**
- **Goal**: Build deep database intuition (SQL vs NoSQL, Indexing, Transactions).
- **Tasks**:
  1. Study **Roadmap → Phase 2 (Databases: Deep Foundation)** and **Phase 3 (Scaling Databases)**.
  2. Learn *B-Trees*, *Composite Indexes*, *WAL (Write-Ahead Log)*, *ACID Isolation Levels* (Read Committed vs Repeatable Read vs Serializable).
  3. Study database scaling strategies: *Read Replicas*, *Connection Pooling (PgBouncer)*, *Consistent Hashing*, and *Database Sharding*.
  4. Go to **Building Blocks** tab: review *PostgreSQL*, *MongoDB*, *Cassandra*, *DynamoDB*, and *Redis*.
- **Checklist Item**: Mark Phase 2, Phase 3, and DB Building Blocks complete.

#### 🔹 **Week 3: Caching, Asynchronous Messaging & Microservice Communication**
- **Goal**: Learn how high-throughput distributed systems handle traffic spikes.
- **Tasks**:
  1. Study **Roadmap → Phase 4 (Caching & CDNs)** and **Phase 5 (Asynchronous Architectures)**.
  2. Understand cache invalidation strategies (*Cache-Aside*, *Write-Through*, *Write-Behind*) and cache eviction (*LRU*, *LFU*).
  3. Differentiate *Message Queues (AWS SQS, RabbitMQ)* vs *Event Streaming (Apache Kafka)*.
  4. Explore *Load Balancers*, *API Gateways*, *WebSockets*, and *Server-Sent Events (SSE)* in the **Building Blocks** tab.
- **Checklist Item**: Complete Phase 4 & 5 topics.

#### 🔹 **Week 4: Low-Level Design (LLD), SOLID Principles & Design Patterns**
- **Goal**: Master Object-Oriented Design, SOLID principles, and class diagrams.
- **Tasks**:
  1. Open **LLD & Design Patterns** tab.
  2. Study the **5 SOLID Principles**: review the definition, violation code example, and correct approach for each (SRP, OCP, LSP, ISP, DIP).
  3. Work through **10 Classic LLD Problems**:
     - *Parking Lot System* (Strategy + Factory + Singleton)
     - *Elevator Control System* (State + Observer + LOOK algorithm)
     - *LRU Cache* (O(1) HashMap + DoublyLinkedList)
     - *Splitwise* (Expense Manager + Debt simplification min-cash-flow algorithm)
     - *Chess / Vending Machine / Ride-Share LLD*
  4. Review the **23 GoF Design Patterns** reference table (Creational, Structural, Behavioral).
- **Checklist Item**: Mark SOLID principles and LLD problems as completed.

---

### Month 2: High-Level System Design Case Studies & Production Mastery (Weeks 5–8)

#### 🔹 **Week 5: Warm-Up & Core System Design Case Studies**
- **Goal**: Learn how to structure real system design problems end-to-end.
- **Tasks**:
  1. Open **Case Studies** tab.
  2. Study the core warm-up systems:
     - **Design TinyURL / URL Shortener**: Base62 encoding, Key Generation Service (KGS), 301 vs 302 redirects.
     - **Design Rate Limiter**: Token Bucket, Leaky Bucket, Sliding Window Log in Redis.
     - **Design Web Crawler**: BFS, Robots.txt, URL Frontier, DNS resolution caching.
     - **Design WhatsApp / Real-time Chat**: WebSocket gateways, ZooKeeper session registry, sequence ordering.
     - **Design Instagram / Photo Sharing**: Direct S3 presigned URL uploads, CDN caching, sharded counters.
  3. Click into each Case Study modal to read the *Deep-Dive Q&A*.
- **Checklist Item**: Check off the first 7 case studies.

#### 🔹 **Week 6: Complex & Advanced System Architecture Case Studies**
- **Goal**: Master high-concurrency, geospatial, and exabyte-scale architectures.
- **Tasks**:
  1. Study advanced case studies in the **Case Studies** tab:
     - **Design Netflix / Video Streaming**: Adaptive Bitrate Streaming (ABR/DASH), Open Connect CDN, FFmpeg transcoding clusters.
     - **Design Uber / Ride-Hailing**: H3 hexagonal spatial indexing, Kafka driver location streams, Redis GEOADD, surge pricing.
     - **Design Twitter / X Feed**: Fan-out on Write vs Fan-out on Read (the celebrity problem), Redis sorted sets, Snowflake IDs.
     - **Design Distributed Unique ID Generator**: Snowflake algorithm vs Ticket Server vs UUIDv4.
     - **Design Distributed Notification System**: FCM/APNs, idempotency keys, rate limiting per user.
     - **Design Payment System (Stripe/Razorpay)**: Two-phase commit vs SAGA pattern, idempotency headers, ledger reconciliation.
- **Checklist Item**: Complete advanced case studies.

#### 🔹 **Week 7: Cloud Matrix, Technology Trade-offs & Production Testing**
- **Goal**: Learn to justify tech choices like a Principal Engineer and understand cloud architecture.
- **Tasks**:
  1. Open **Tech Decision Table** tab: read all **40 Technology Decisions**. Focus on *First Consideration*, *Valid Alternative*, and *What to NEVER Use Blindly*.
  2. Open **Cloud Matrix** tab: memorize the multi-cloud service mapping across **AWS, Azure, and GCP**.
  3. Open **Testing Strategies** tab: study the 10 testing types (Unit, Integration, Contract, E2E, Load/k6, Chaos, Mutation) and the **10-Step CI/CD Pipeline**.
  4. Use the **⚡ Interactive Architecture Decision Wizard** tab: test different combinations of system requirements to analyze generated production blueprints.
- **Checklist Item**: Complete Tech Decisions, Cloud Matrix, and Testing tabs.

#### 🔹 **Week 8: Interview Framework, Deloitte Enterprise Prep & Behavioral STAR**
- **Goal**: Polish communication, interview timing, and behavioral responses.
- **Tasks**:
  1. Open **Interview Prep** tab:
     - Memorize the **5-Step 45-Minute Interview Structure** (Requirements 0-5m → Estimation 5-10m → Architecture 10-20m → Deep Dive 20-35m → Failures 35-45m).
     - Prepare crisp answers for the **6 Golden Interviewer Questions**.
     - Review **Deloitte Consulting Advice**: CapEx vs OpEx, legacy Strangler Fig pattern, multi-tenant SaaS isolation, regulatory compliance (GDPR/PCI-DSS).
  2. Open **Behavioral (STAR)** tab:
     - Review the 9 worked STAR stories (Production Outages, Technical Disagreements, Latency Incidents, Ambiguity, Tight Deadlines, Mistakes).
     - Prepare your own 4–5 personal STAR stories using the checklist.
  3. Explore **Engineering Blogs** tab: read at least 2 real engineering blog posts per week (e.g., *Discord's ScyllaDB migration*, *Stripe's Idempotency*, *Netflix Chaos Engineering*).
- **Checklist Item**: Complete Interview Prep and Behavioral sections. Celebrate reaching 100% progress!

---

## 💡 Daily & Weekly Study Routines

To maximize retention during your 2-month plan, stick to this simple weekly routine:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WEEKLY STUDY SCHEDULE                           │
├───────────┬────────────────────────────────────────────────────────────┤
│ Mon - Wed │ Study 2 Topics / Case Studies (Read, take notes, check off) │
│ Thursday  │ LLD / SOLID Principles or Code Practice                     │
│ Friday    │ Review Tech Decision Table & Cloud Matrix                   │
│ Saturday  │ Run 1 Mock Interview using the 45-Minute Framework         │
│ Sunday    │ Read 1 Real Engineering Blog Post & Review Dashboard Stats │
└───────────┴────────────────────────────────────────────────────────────┘
```

---

## 🛠️ How to Use the Interactive Dashboard Features

1. **Progress Tracking**:
   - Click the checkmark (`✓`) on any topic, case study, or problem to mark it complete.
   - The global header progress bar automatically updates your total percentage.
2. **Bookmarks / Saved List**:
   - Click the star (`★`) icon on any card or table row to save it for quick review before an interview.
   - Use the **★ Saved** filter chip at the top to view only your bookmarked items.
3. **Global Search (`Ctrl+K` / `Cmd+K`)**:
   - Type any keyword (e.g., `Redis`, `Kafka`, `Uber`, `ACID`, `SAGA`, `Idempotency`) in the top search bar to instantly filter across all sections.
4. **Level Filter Chips**:
   - Filter content by difficulty: **Beginner**, **Intermediate**, **Advanced**, or **Expert**.
5. **Interactive Architecture Decision Wizard**:
   - Select your project constraints (Traffic QPS, Data Shape, Real-time need, Availability SLA, Async Queue).
   - Click **🚀 Generate My Architecture Blueprint** to get an instant, justified cloud architecture blueprint with a production safety checklist.
6. **Reset & Export Progress**:
   - Click **Reset Progress** in the header to clear all checkboxes for a fresh practice run.
   - Click **Export Data** to backup your progress to JSON.

---

## 💻 How to Run Locally

This application is built with vanilla HTML, CSS, and JavaScript. No build step or `npm install` is required.

### Method 1: Direct File Open
Simply double-click `index.html` or open it directly in any modern web browser:
```bash
file:///d:/projects/systemdesign/index.html
```

### Method 2: Local HTTP Server
If using VS Code, use the **Live Server** extension, or run a simple local HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .
```

Then open `http://localhost:8000` in your browser.

---

*Happy Architecting! Master the trade-offs, lead with confidence in your interviews, and build great software.* 🚀
