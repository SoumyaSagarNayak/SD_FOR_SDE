// ==========================================================================
// mySystemDesign — Complete Data: 20+ Case Studies, Building Blocks w/ Resources,
//   Behavioral, Cloud Matrix, LLD Patterns, Testing, Tech Decision Table
// ==========================================================================

const SD = {

  // =========================================================================
  // 10 PHASES — ROADMAP
  // =========================================================================
  phases: [
    {
      id: "phase-1", number: 1, title: "How the Internet Works", level: "Beginner", color: "#38bdf8",
      tagline: "You can't design systems without knowing how data moves across networks.",
      topics: [
        {
          id: "p1-url", title: "What Happens When You Type a URL?",
          description: "Full lifecycle: Browser DNS cache → OS DNS cache → Recursive resolver → Root NS → TLD NS → Authoritative NS → IP returned → TCP 3-way handshake → TLS 1.3 handshake → HTTP GET → HTML parse → JS/CSS/images fetched in parallel (HTTP/2 multiplexing).",
          whyItMatters: "Every system design interview can start with 'trace a request end-to-end.' If you can't do this, you cannot credibly design distributed systems.",
          resources: [
            { label: "What happens when you type google.com? (GitHub)", url: "https://github.com/alex/what-happens-when", type: "code" },
            { label: "MDN: HTTP Overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", type: "doc" },
            { label: "How DNS Works — Visual Comic", url: "https://howdns.works/", type: "blog" },
            { label: "Cloudflare Learning Center (free, excellent)", url: "https://www.cloudflare.com/learning/", type: "blog" },
            { label: "Hussein Nasser: Networking for Developers (YouTube)", url: "https://www.youtube.com/results?search_query=hussein+nasser+networking", type: "video" }
          ]
        },
        {
          id: "p1-tcp-udp", title: "TCP vs UDP — When Each Is Right",
          description: "TCP: 3-way handshake (SYN→SYN-ACK→ACK), guaranteed ordered delivery, congestion control (slow start, AIMD), HOL blocking. UDP: connectionless, no delivery guarantee, low overhead. HTTP/3 uses QUIC (UDP-based) to solve TCP's HOL blocking. Use TCP for chat/payments, UDP for DNS/video/gaming.",
          whyItMatters: "Chat apps need TCP. Video streaming tolerates UDP packet loss. DNS uses UDP (fast, fits in one packet). Your protocol choice must be justified.",
          resources: [
            { label: "Cloudflare: TCP vs UDP", url: "https://www.cloudflare.com/learning/ddos/glossary/tcp-vs-udp/", type: "blog" },
            { label: "Hussein Nasser: TCP Deep Dive (YouTube)", url: "https://www.youtube.com/watch?v=qqRYkcazgSA", type: "video" },
            { label: "Cloudflare: What is QUIC / HTTP/3?", url: "https://www.cloudflare.com/learning/performance/what-is-http3/", type: "blog" }
          ]
        },
        {
          id: "p1-http", title: "HTTP 1.1 vs HTTP/2 vs HTTP/3 — The Evolution",
          description: "HTTP/1.1: one request per connection, HOL blocking, text-based headers, keep-alive connections. HTTP/2: multiplexing (multiple streams on one TCP connection), binary framing, header compression (HPACK), server push. HTTP/3: QUIC over UDP, 0-RTT connection setup, independent streams (no HOL blocking), mandatory TLS 1.3.",
          whyItMatters: "gRPC requires HTTP/2. Understanding HTTP/2 multiplexing explains why it's better for microservice communication. Senior engineers know this.",
          resources: [
            { label: "High Performance Browser Networking (Free Book — O'Reilly)", url: "https://hpbn.co/", type: "doc" },
            { label: "Cloudflare: HTTP/2 vs HTTP/1.1", url: "https://www.cloudflare.com/learning/performance/http2-vs-http1.1/", type: "blog" }
          ]
        },
        {
          id: "p1-tls", title: "TLS Handshake, HTTPS & Certificate Chains",
          description: "TLS 1.3: ClientHello (cipher suites, key share) → ServerHello + Certificate → Client verifies cert against CA chain → Master secret derived via ECDHE → Encrypted application data. Certificate: domain validated (DV), org validated (OV), extended validation (EV). SNI (Server Name Indication) allows one IP to serve many domains. HSTS: force HTTPS via response header. Certificate pinning: mobile apps only trust specific cert.",
          whyItMatters: "Where to terminate TLS (at load balancer vs end-to-end) is a real design decision with security trade-offs. Interviewers ask this.",
          resources: [
            { label: "Cloudflare: What is TLS?", url: "https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/", type: "blog" },
            { label: "TLS 1.3 Explained (Visual, Illustrated TLS)", url: "https://tls13.xargs.org/", type: "blog" }
          ]
        },
        {
          id: "p1-estimation", title: "Back-of-Envelope Estimation — The Engineering Skill",
          description: "Latencies: L1 cache 1ns, RAM 100ns, SSD 100μs, 1GB network 10ms, cross-region 150ms. Storage: 1 char=1B, UUID=16B, avg photo=300KB, 1 min video=50MB, tweet=280B. Formula: 1M DAU × 10 req/day = 10M req/day ÷ 86,400s = ~115 QPS avg → 300 QPS peak (3×). Memory: 20% of data gets 80% of reads (Pareto). 1 server handles ~10k connections (Node.js), 1k CPU-bound req/s.",
          whyItMatters: "Interviewers judge whether you're comfortable with order-of-magnitude reasoning. Practice until you can estimate in 3 minutes.",
          resources: [
            { label: "Napkin Math — Simon Eskildsen (GitHub)", url: "https://github.com/sirupsen/napkin-math", type: "code" },
            { label: "ByteByteGo: Estimation Deep Dive (YouTube)", url: "https://www.youtube.com/results?search_query=bytebytego+back+of+envelope+estimation", type: "video" },
            { label: "Latency Numbers Every Dev Should Know (Gist)", url: "https://gist.github.com/jboner/2841832", type: "doc" }
          ]
        }
      ]
    },
    {
      id: "phase-2", number: 2, title: "Databases: Deep Foundation", level: "Beginner", color: "#a78bfa",
      tagline: "Most system failures are database design failures in disguise.",
      topics: [
        {
          id: "p2-sql-nosql", title: "SQL vs NoSQL — The Real Decision Framework",
          description: "SQL: normalized schema, ACID transactions, complex JOINs, strong consistency, vertical scaling primary. NoSQL: flexible schema, BASE model, horizontal scaling native, eventual consistency. Choose SQL when: relational data, ACID required, complex queries. Choose NoSQL when: document/hierarchical data, write volume > 100k/s, horizontal scale critical. Don't choose MongoDB just because 'flexible schema sounds good.'",
          whyItMatters: "The most-asked database question. Must articulate WHEN each wins based on data shape, access patterns, and consistency requirements.",
          resources: [
            { label: "Martin Fowler: NoSQL Databases Guide", url: "https://martinfowler.com/articles/nosql.html", type: "blog" },
            { label: "Use The Index, Luke — Free Indexing Book", url: "https://use-the-index-luke.com/", type: "doc" },
            { label: "Fireship: SQL vs NoSQL in 100 Seconds (YouTube)", url: "https://www.youtube.com/watch?v=W2Z7fbCLSTw", type: "video" },
            { label: "CMU 15-445: Database Systems (Free Lectures)", url: "https://15445.courses.cs.cmu.edu/", type: "doc" }
          ]
        },
        {
          id: "p2-indexes", title: "Database Indexes — B-Tree, Hash, Composite, Covering",
          description: "B-Tree: O(log n) lookup, range queries, most common default. Hash: O(1) exact lookup, no range, in-memory only in PostgreSQL. Composite: column ORDER matters (leftmost prefix rule). Covering index: all query columns in index (no table heap access). Partial index: index subset of rows. GiST/GIN: full-text, geometric, array data. Too many indexes = slow writes (index must be updated on every write).",
          whyItMatters: "Slow query in production? 90% chance it's a missing index. Interviewers probe with 'how would you speed up this query?'",
          resources: [
            { label: "Use The Index, Luke: B-Tree Fundamentals", url: "https://use-the-index-luke.com/sql/anatomy", type: "doc" },
            { label: "Hussein Nasser: Database Indexing Explained (YouTube)", url: "https://www.youtube.com/watch?v=-qNSXK7s7_w", type: "video" },
            { label: "PostgreSQL: Index Types", url: "https://www.postgresql.org/docs/current/indexes-types.html", type: "doc" }
          ]
        },
        {
          id: "p2-acid", title: "ACID, Isolation Levels & Phantom Reads",
          description: "Atomicity: all or nothing (WAL/undo log). Consistency: constraints always satisfied. Isolation levels: READ UNCOMMITTED (dirty reads) < READ COMMITTED (default in PG/MySQL) < REPEATABLE READ (default in MySQL InnoDB, prevents non-repeatable) < SERIALIZABLE (no phantoms, slowest). Optimistic locking: version column, check on update. Pessimistic: SELECT FOR UPDATE locks rows.",
          whyItMatters: "Payment systems, booking systems, inventory deductions all require knowing which isolation level prevents which anomaly.",
          resources: [
            { label: "PostgreSQL Docs: Transaction Isolation", url: "https://www.postgresql.org/docs/current/transaction-iso.html", type: "doc" },
            { label: "DDIA Ch.7: Transactions (Designing Data-Intensive Applications)", url: "https://dataintensive.net/", type: "doc" }
          ]
        },
        {
          id: "p2-replication", title: "Database Replication — Sync vs Async, Read Replicas",
          description: "Primary-replica: all writes to primary, reads distributed across replicas. Sync replication: primary waits for replica WAL flush before ACKing write (strong consistency, +20ms latency). Async: primary ACKs immediately, replica catches up (low latency, potential data loss on crash). Read replicas: horizontal read scaling. Replication lag causes stale reads. Multi-primary: conflict resolution required.",
          whyItMatters: "99.99% SLA requires you to know the failover path. Read replicas are the first step before sharding.",
          resources: [
            { label: "AWS RDS Read Replicas Docs", url: "https://aws.amazon.com/rds/features/read-replicas/", type: "doc" },
            { label: "Arpit Bhayani: Master-Slave Replication Deep Dive", url: "https://arpitbhayani.me/blogs", type: "blog" }
          ]
        },
        {
          id: "p2-sharding", title: "Sharding Strategies — Last Resort, Not First Choice",
          description: "Hash sharding: uniform distribution, range queries cross-shard (expensive). Range sharding: range queries easy, hotspot risk (all new users in same shard). Directory sharding: lookup table flexible, extra network hop. Consistent hashing: minimal key remapping on node change. Shard key choice is critical: choose high-cardinality, uniform distribution key. Cross-shard transactions = distributed transactions (SAGA/2PC).",
          whyItMatters: "Interviewers ask sharding when scale requires it. Saying 'add more read replicas and cache first' before jumping to sharding shows maturity.",
          resources: [
            { label: "Vitess: Sharding MySQL at Scale (YouTube, Planet-Scale)", url: "https://vitess.io/", type: "doc" },
            { label: "Instagram: Sharding IDs at Scale", url: "https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c", type: "blog" }
          ]
        },
        {
          id: "p2-nosql-types", title: "4 NoSQL Types — Know Which Does What",
          description: "Key-Value (Redis, DynamoDB): O(1) lookup by key, sessions, cache, leaderboards. Document (MongoDB, Firestore): nested JSON/BSON, flexible schema, product catalogs. Wide-Column (Cassandra, HBase, Bigtable): partition key + clustering column, massive write throughput, time-series, multi-datacenter. Graph (Neo4j, AWS Neptune): vertex+edge traversal, social graphs, fraud detection.",
          whyItMatters: "Choosing MongoDB for a social graph is wrong. Cassandra for analytics time-series is right. Know the right tool by data shape.",
          resources: [
            { label: "AWS DynamoDB: Best Practices", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html", type: "doc" },
            { label: "DataStax: Cassandra Architecture", url: "https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html", type: "doc" },
            { label: "Neo4j: Graph Database Concepts", url: "https://neo4j.com/docs/getting-started/", type: "doc" }
          ]
        }
      ]
    },
    {
      id: "phase-3", number: 3, title: "Caching, CDN & Storage", level: "Beginner", color: "#00e676",
      tagline: "Most performance wins come from caching, not optimization. Cache first.",
      topics: [
        {
          id: "p3-cache-patterns", title: "5 Cache Patterns — Know All Five",
          description: "Cache-Aside (Lazy): app reads cache → miss → read DB → populate cache → return. Default choice. Write-Through: write goes to cache AND DB synchronously → consistent but write latency doubles. Write-Back: write to cache → async to DB later → fast writes, risk data loss on crash. Write-Around: skip cache, write directly to DB → reduces cache pollution for infrequent data. Read-Through: cache layer handles DB read automatically.",
          whyItMatters: "Cache-Aside is the most common. Write-Through for banking. Write-Back for gaming leaderboards. Interviewers ask which pattern and why.",
          resources: [
            { label: "Caching Strategies Explained (ByteByteGo Blog)", url: "https://blog.bytebytego.com/p/a-crash-course-in-caching-part-2", type: "blog" },
            { label: "Redis Docs: Patterns", url: "https://redis.io/docs/latest/develop/use/patterns/", type: "doc" },
            { label: "Gaurav Sen: Caching Strategies (YouTube)", url: "https://www.youtube.com/results?search_query=gaurav+sen+caching", type: "video" }
          ]
        },
        {
          id: "p3-redis", title: "Redis Deep Dive — 8 Data Structures & Use Cases",
          description: "Strings: counter (INCR atomic), cache value, rate limiter. Hashes: user profile (HMGET for partial reads). Lists: activity feed (LPUSH/LRANGE), job queue. Sets: unique users, tags, mutual friends (SINTERCARD). Sorted Sets: leaderboard (ZADD score member, ZRANGE). Pub/Sub: real-time notifications. Streams: event log (XADD/XREAD). Bitmaps: user presence tracking (SETBIT). Redis Cluster: 16384 hash slots, resharded automatically.",
          whyItMatters: "Redis is mentioned in every system design answer. Knowing the right data structure for each problem shows depth beyond 'it's a cache'.",
          resources: [
            { label: "Redis Data Types — Official Docs", url: "https://redis.io/docs/latest/develop/data-types/", type: "doc" },
            { label: "Arpit Bhayani: Redis Internals (Blog)", url: "https://arpitbhayani.me/blogs?category=redis", type: "blog" },
            { label: "Redis University: Free Courses", url: "https://university.redis.com/", type: "doc" }
          ]
        },
        {
          id: "p3-cache-problems", title: "Cache Stampede, Thundering Herd & Cache Poisoning",
          description: "Cache Stampede: TTL expires → all 10,000 concurrent requests miss → DB overloaded. Fix: Probabilistic Early Expiration (PER) — randomly expire early before actual TTL. Or mutex lock: only first request rebuilds, others wait. Thundering Herd: service restart → all caches cold simultaneously. Fix: staggered TTLs (add random jitter). Cache Poisoning: malicious or corrupted data in cache. Fix: validation on cache read, signed cache keys.",
          whyItMatters: "Senior interview question. Shows you think about production edge cases, not just happy paths.",
          resources: [
            { label: "Cloudflare: Cache Stampede Explained", url: "https://www.cloudflare.com/learning/performance/what-is-cache-stampede/", type: "blog" }
          ]
        },
        {
          id: "p3-cdn", title: "CDN Architecture — Pull vs Push, Edge Logic",
          description: "Pull CDN: origin serves on first request, edge caches for TTL. Simpler, lazy. Push CDN: you upload content to CDN before requests come. Good for large static assets. Cache-Control headers: max-age, s-maxage, stale-while-revalidate. Vary header: cache separate copies per header (e.g. Accept-Encoding). Purge API: invalidate by URL, tag, or path prefix. Edge compute: Cloudflare Workers, Lambda@Edge — run logic at CDN edge (auth, personalization, A/B testing).",
          whyItMatters: "CDN is the first answer to global latency. Knowing edge compute (Cloudflare Workers) shows senior-level design knowledge.",
          resources: [
            { label: "Cloudflare CDN Docs", url: "https://developers.cloudflare.com/cache/", type: "doc" },
            { label: "AWS CloudFront Best Practices", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/best-practices.html", type: "doc" }
          ]
        },
        {
          id: "p3-object-storage", title: "Object Storage vs File System vs Block Storage",
          description: "Object Storage (S3/GCS/Azure Blob): flat namespace, key=value-for-blobs, unlimited scale, 11 nines durability, cheap. File Storage (NFS/EFS): hierarchical, POSIX interface, multiple instances share. Block Storage (EBS, SAN): raw disk, lowest latency, databases use this. Pattern: DB stores file metadata + S3 URL. Client uploads directly to S3 via pre-signed URL (bypasses your servers, saves bandwidth + cost). Multipart upload for >100MB files.",
          whyItMatters: "Any system with user media (Instagram, Dropbox, Google Drive) uses object storage. Pre-signed URL pattern is expected in design.",
          resources: [
            { label: "AWS S3 Developer Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/", type: "doc" },
            { label: "Dropbox: Magic Pocket (Building Their Own Object Store)", url: "https://dropbox.tech/infrastructure/-testing-our-new-storage-system-s3-like-performance", type: "blog" }
          ]
        }
      ]
    },
    {
      id: "phase-4", number: 4, title: "APIs, Communication & Real-Time", level: "Intermediate", color: "#f59e0b",
      tagline: "How services talk to each other is as important as what they say.",
      topics: [
        {
          id: "p4-rest", title: "REST API Design — Resources, Verbs, Status Codes",
          description: "Resources are nouns (not verbs): /orders not /getOrders. Verbs: GET (idempotent), POST (create, not idempotent), PUT (full replace, idempotent), PATCH (partial update), DELETE (idempotent). Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Rate Limited, 500 Server Error. Versioning: URL path (/v1/) or Accept header. HATEOAS: include links to related actions in response.",
          whyItMatters: "You'll design REST APIs in every interview. CRUD is entry-level. Idempotency, proper status codes, and versioning strategy are senior-level.",
          resources: [
            { label: "REST API Best Practices — Pragmatic Guide", url: "https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api", type: "blog" },
            { label: "HTTP Status Codes Glossary", url: "https://httpstatuses.com/", type: "doc" },
            { label: "OpenAPI Specification (Swagger)", url: "https://swagger.io/specification/", type: "doc" }
          ]
        },
        {
          id: "p4-grpc-graphql", title: "gRPC vs GraphQL vs REST vs WebSockets",
          description: "REST: simple, universal, verbose JSON, request-response. gRPC: Protocol Buffers (5-7× smaller than JSON), HTTP/2 multiplexing, streaming (client/server/bi-directional), strong typing via .proto contracts, code generation for multiple languages. Ideal: internal microservices. GraphQL: client specifies query shape, single endpoint, no over/under-fetching, N+1 query risk on server. Ideal: public APIs with diverse mobile/web clients. WebSockets: persistent duplex channel, ideal: chat, live dashboards.",
          whyItMatters: "Deloitte and enterprise interviewers ask about internal service communication. gRPC for microservices, REST for public, GraphQL for BFF pattern.",
          resources: [
            { label: "gRPC Introduction — Official", url: "https://grpc.io/docs/what-is-grpc/introduction/", type: "doc" },
            { label: "GraphQL vs REST — Shopify Engineering", url: "https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching", type: "blog" },
            { label: "Hussein Nasser: gRPC Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=Yw4rkaTc0f8", type: "video" }
          ]
        },
        {
          id: "p4-websockets", title: "WebSockets vs SSE vs Long Polling — Decision Matrix",
          description: "Short Polling: GET every N seconds — simple but wastes bandwidth when no updates. Long Polling: server holds request until data or timeout — better but complex server state. SSE: server pushes events over persistent HTTP, auto-reconnect, text protocol, browser native EventSource API, works through HTTP/2 multiplexing. WebSocket: bidirectional, binary or text, custom protocol, requires WebSocket-aware infrastructure (LBs, proxies). Rule: SSE for 1-way push, WS for 2-way real-time.",
          whyItMatters: "Chat → WebSockets. Notification feed → SSE. Email check interval → polling. Wrong choice wastes infrastructure and engineering effort.",
          resources: [
            { label: "MDN: Server-Sent Events", url: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events", type: "doc" },
            { label: "WebSockets vs SSE — Ably Blog", url: "https://ably.com/blog/websockets-vs-sse", type: "blog" },
            { label: "Hussein Nasser: WebSockets (YouTube)", url: "https://www.youtube.com/watch?v=2Nt-ZrNP22A", type: "video" }
          ]
        },
        {
          id: "p4-api-gateway", title: "API Gateway — What It Does & Why",
          description: "API Gateway sits at the edge handling: TLS termination, authentication/authorization (JWT validation), rate limiting, request routing (path-based to microservices), protocol translation (REST→gRPC), request/response transformation, logging, IP allowlisting, circuit breaking. Kong: open-source, plugin system. AWS API Gateway: serverless, pay-per-call. Apigee: enterprise, analytics. Risk: single point of failure — mitigate with HA deployment across AZs.",
          whyItMatters: "Every microservices design includes an API Gateway. Interviewers expect it. Explaining what it does (not just naming it) earns points.",
          resources: [
            { label: "Kong API Gateway Architecture", url: "https://docs.konghq.com/gateway/latest/", type: "doc" },
            { label: "AWS API Gateway Docs", url: "https://docs.aws.amazon.com/apigateway/", type: "doc" },
            { label: "Microservices: API Gateway Pattern (Martin Fowler)", url: "https://microservices.io/patterns/apigateway.html", type: "blog" }
          ]
        },
        {
          id: "p4-auth", title: "Auth: Sessions, JWT, OAuth2, OIDC, RBAC",
          description: "Session+Cookie: server stores session in Redis (distributed), cookie holds session ID — simple, server-controlled revocation. JWT: stateless, self-contained (header.payload.signature), verify without DB hit — but cannot revoke before expiry (use short TTL 15min + refresh tokens with rotation). OAuth2: delegated authorization (user grants 3rd-party access to their resources). OIDC: OAuth2 + identity layer (ID token = who the user is). RBAC: roles (Admin/Editor/Viewer) → permissions → resources.",
          whyItMatters: "Every system has auth. Choosing JWT without revocation strategy is a security flaw most candidates miss.",
          resources: [
            { label: "Auth0: OAuth2 and OIDC Explained", url: "https://auth0.com/docs/authenticate/protocols/openid-connect-protocol", type: "doc" },
            { label: "JWT.io — Debugger + Docs", url: "https://jwt.io/introduction", type: "doc" },
            { label: "OWASP: Session Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html", type: "doc" }
          ]
        }
      ]
    },
    {
      id: "phase-5", number: 5, title: "Scaling, Load Balancing & High Availability", level: "Intermediate", color: "#fb923c",
      tagline: "Design for failure first. Then design for 10× traffic.",
      topics: [
        {
          id: "p5-scaling", title: "Vertical vs Horizontal Scaling — Rules & Trade-offs",
          description: "Vertical: add more CPU/RAM/SSD to one machine. Simple, no code changes, but hardware ceiling exists and single point of failure remains. Horizontal: add more machines, distribute load. Requires stateless services (session in Redis, not in-process). Stateful services (DBs) are harder to scale horizontally. Rule: databases → scale vertically first + read replicas. App servers → scale horizontally immediately (stateless). Never premature horizontal scaling of DBs.",
          whyItMatters: "Foundational concept. Every scaling question — 10× traffic, 100× traffic — builds on understanding which tier to scale and how.",
          resources: [
            { label: "AWS: Scaling Your Web Application", url: "https://aws.amazon.com/blogs/architecture/scale-your-web-application-one-step-at-a-time/", type: "blog" },
            { label: "ByteByteGo: Horizontal vs Vertical Scaling (YouTube)", url: "https://www.youtube.com/results?search_query=bytebytego+horizontal+vertical+scaling", type: "video" }
          ]
        },
        {
          id: "p5-lb", title: "Load Balancer Algorithms & L4 vs L7",
          description: "L4 (Transport): operates on TCP/UDP, no HTTP inspection, extremely fast, used for non-HTTP protocols (AWS NLB). L7 (Application): HTTP header/path/cookie routing, SSL termination, content-based routing (AWS ALB, Nginx). Algorithms: Round Robin (simple, even), Least Connections (prevents overload on slow servers), IP Hash (sticky sessions — same client → same server), Weighted (tiered hardware), Least Response Time (smart, monitors real performance). Health checks: remove unhealthy instances in 10-30s.",
          whyItMatters: "Drawing 'Load Balancer' is expected. Explaining which type, which algorithm, and why is senior-level differentiation.",
          resources: [
            { label: "NGINX Load Balancing Guide", url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/", type: "doc" },
            { label: "AWS ELB vs ALB vs NLB Guide", url: "https://aws.amazon.com/elasticloadbalancing/features/", type: "doc" },
            { label: "Gaurav Sen: Load Balancers Explained (YouTube)", url: "https://www.youtube.com/watch?v=K0Ta65OqQkY", type: "video" }
          ]
        },
        {
          id: "p5-consistent-hashing", title: "Consistent Hashing — The Cache Distribution Algorithm",
          description: "Problem: N nodes → modulo hash means nearly all keys remapped when N changes. Solution: hash ring 0→2^32. Both nodes and keys hashed to ring positions. Each key routes to nearest clockwise node. Only K/N keys remapped when node joins/leaves. Virtual nodes: each physical node has V positions on ring (V=150 typical) for uniform distribution. Used in: Redis Cluster, Cassandra token ring, CDN request routing, DynamoDB partition routing.",
          whyItMatters: "Cache distribution, data partitioning, CDN edge routing — all use consistent hashing. A must-know for distributed system design questions.",
          resources: [
            { label: "Consistent Hashing Animation (Visual)", url: "https://www.toptal.com/big-data/consistent-hashing", type: "blog" },
            { label: "Gaurav Sen: Consistent Hashing (YouTube)", url: "https://www.youtube.com/watch?v=zaRkONvyGr8", type: "video" }
          ]
        },
        {
          id: "p5-rate-limiting", title: "Rate Limiting: 5 Algorithms, Redis Implementation",
          description: "Fixed Window: counter per minute, resets at boundary — vulnerable to 2× burst across window boundary. Sliding Window Log: per-request timestamps stored (precise, memory heavy). Sliding Window Counter: weighted average of current + previous window (efficient, approximate). Token Bucket: bucket refills at R tokens/sec, max B burst — most common, allows controlled bursts, used by AWS API Gateway. Leaky Bucket: requests exit at constant rate, excess dropped — smooth but no bursts. Redis INCR + EXPIRE for distributed rate limiting (atomic Lua script for race safety).",
          whyItMatters: "Rate limiter design is a standalone 45-minute interview question at mid-senior level at every FAANG company.",
          resources: [
            { label: "System Design: Rate Limiter (GeeksForGeeks)", url: "https://www.geeksforgeeks.org/system-design/rate-limiting-in-system-design/", type: "blog" },
            { label: "Figma: Alternative Approach to Rate Limiting", url: "https://www.figma.com/blog/an-alternative-approach-to-rate-limiting/", type: "blog" },
            { label: "Redis: Rate Limiting Pattern", url: "https://redis.io/glossary/rate-limiting/", type: "doc" }
          ]
        },
        {
          id: "p5-ha", title: "High Availability — SLAs, Active-Active, Multi-Region",
          description: "99% = 87.6h/year downtime. 99.9% = 8.76h/year. 99.99% = 52min/year. 99.999% = 5.26min/year. Each additional 9 is ~10× more expensive. Single Region Multi-AZ: replicate across 3 AZs, auto-failover in 60s, covers hardware/AZ failure. Multi-Region Active-Active: all regions serve traffic (Route53 latency routing), global DB replication (Aurora Global, Spanner). Multi-Region Active-Passive: standby region, ~5min failover. RTO: max downtime. RPO: max data loss. Design for 99.99% by default, 99.999% only when justified by business cost.",
          whyItMatters: "Non-functional requirement discussions. '99.99% available' means specific architectural choices at specific cost. Know what each 9 requires.",
          resources: [
            { label: "AWS: Building Mission-Critical Applications", url: "https://aws.amazon.com/resilience/", type: "doc" },
            { label: "Google SRE Book: Service Level Objectives", url: "https://sre.google/sre-book/service-level-objectives/", type: "doc" }
          ]
        }
      ]
    },
    {
      id: "phase-6", number: 6, title: "Async Processing: Queues, Kafka & Events", level: "Intermediate", color: "#e879f9",
      tagline: "Decouple everything that doesn't need to be synchronous. Most things don't.",
      topics: [
        {
          id: "p6-queue-kafka", title: "Queue vs Kafka — The Most Important Messaging Decision",
          description: "Message Queue (RabbitMQ, SQS): FIFO task execution. Message consumed and deleted. One consumer per message. No replay. Good for: email, PDF generation, image resize, notifications, any background job. Kafka: append-only immutable event log. Messages retained (7 days default, configurable forever). Consumer groups each get full log independently. Good for: event sourcing, analytics, microservice decoupling, CDC (Change Data Capture), audit trail. Mental model: Queue = 'Do this task'. Kafka = 'This event occurred, here's the record forever'.",
          whyItMatters: "Kafka for simple background jobs is over-engineering with operational cost. SQS for event replay is wrong. This distinction is tested directly.",
          resources: [
            { label: "Confluent Kafka 101 (Free Course)", url: "https://developer.confluent.io/courses/apache-kafka/events/", type: "doc" },
            { label: "Confluent: Kafka Fundamentals (YouTube Playlist)", url: "https://www.youtube.com/playlist?list=PLa7VYi0yPIH0KbnJQcMv5N9iW8HkZHztH", type: "video" },
            { label: "Jay Kreps: The Log (LinkedIn Engineering)", url: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying", type: "blog" }
          ]
        },
        {
          id: "p6-kafka-internals", title: "Kafka Internals: Topics, Partitions, Offsets, Consumer Groups",
          description: "Topic: named stream of records. Partition: ordered append-only log segment (key determines partition). Offset: monotonic sequence number per partition. Consumer Group: multiple instances share partition assignments (1 partition → 1 consumer in group). Replication Factor: number of broker copies (set to 3). Leader election: one broker per partition handles reads/writes. ISR (In-Sync Replicas): replicas caught up to leader. Exactly-once semantics (EOS): transactional producer + idempotent consumer.",
          whyItMatters: "Kafka consumer lag, partition hot-spots, and consumer rebalancing are real production problems you'll be asked about.",
          resources: [
            { label: "Apache Kafka Documentation", url: "https://kafka.apache.org/documentation/", type: "doc" },
            { label: "Kafka: The Definitive Guide (Free O'Reilly PDF)", url: "https://www.confluent.io/resources/kafka-the-definitive-guide-v2/", type: "doc" }
          ]
        },
        {
          id: "p6-idempotency", title: "Idempotency — The Most Critical Payment Pattern",
          description: "Idempotent: calling N times = calling once. Required for: payments (double-charge), order creation (double order), booking (double seat). HTTP: GET/PUT/DELETE idempotent by design. POST is NOT. Pattern: client generates UUID4 Idempotency-Key header → server stores in idempotency_table (key, request_hash, response, created_at) → on duplicate key: return cached response immediately. Redis for fast deduplication check. DB unique constraint as final safety net. Stripe uses this pattern — their API is the reference implementation.",
          whyItMatters: "Double-charge in payments is a company-ending bug and lawsuit. This pattern is non-negotiable for fintech.",
          resources: [
            { label: "Stripe: Designing Robust Idempotent APIs", url: "https://stripe.com/blog/idempotency", type: "blog" },
            { label: "Microservices.io: SAGA Pattern", url: "https://microservices.io/patterns/data/saga.html", type: "doc" }
          ]
        },
        {
          id: "p6-async-patterns", title: "Async Patterns: Fan-Out, Fan-In, Competing Consumers, DLQ",
          description: "Competing Consumers: multiple workers consume from one queue — natural horizontal scaling for CPU-bound work (set worker count to vCPU count). Fan-Out: one event triggers N independent consumers (OrderCreated → PaymentService, InventoryService, EmailService, AnalyticsService in parallel). Fan-In: merge N event streams into one (aggregate metrics from many sensors). Outbox Pattern: write event to outbox table in same DB transaction as business data → separate process publishes to Kafka (prevents dual-write inconsistency). Dead Letter Queue (DLQ): after N retries, message moved to DLQ for inspection/replay.",
          whyItMatters: "Fan-out for order processing, DLQ for payment failures — these patterns appear directly in system design answers.",
          resources: [
            { label: "AWS: SQS Dead Letter Queues", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html", type: "doc" },
            { label: "Transactional Outbox Pattern", url: "https://microservices.io/patterns/data/transactional-outbox.html", type: "blog" }
          ]
        }
      ]
    },
    {
      id: "phase-7", number: 7, title: "Distributed Systems Theory", level: "Advanced", color: "#f43f5e",
      tagline: "Why everything is harder when machines don't share memory or a clock.",
      topics: [
        {
          id: "p7-cap", title: "CAP Theorem, PACELC & Real-World Database Choices",
          description: "CAP: in presence of network Partition (always possible in real networks), choose Consistency (every read gets most recent write) OR Availability (every request gets some response). CP databases: HBase, ZooKeeper, etcd — refuse requests during partition rather than return stale data. AP databases: Cassandra, DynamoDB, CouchDB — return stale data during partition but stay available. PACELC extends CAP: even normally (no partition), trade-off between Latency (L) and Consistency (C). Cassandra: PA/EL (favors availability + low latency). PostgreSQL with sync replication: PC/EC.",
          whyItMatters: "Saying 'I'll use Cassandra for the banking ledger' fails the interview. CAP tells you exactly why.",
          resources: [
            { label: "Martin Kleppmann: Distributed Systems Video Lectures (Cambridge)", url: "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", type: "video" },
            { label: "DDIA Chapter 9: Consistency and Consensus (Free Chapter)", url: "https://dataintensive.net/", type: "doc" },
            { label: "Jepsen: Consistency Models Visual Guide", url: "https://jepsen.io/consistency", type: "blog" }
          ]
        },
        {
          id: "p7-saga", title: "Distributed Transactions: 2PC vs SAGA",
          description: "2PC (Two-Phase Commit): coordinator sends PREPARE to all participants (locks resources) → all reply OK → coordinator sends COMMIT. Blocking: coordinator crash leaves participants locked. Not used in modern microservices. SAGA Choreography: each service publishes success/failure event, next service reacts — decoupled but hard to trace. SAGA Orchestration: central Saga Orchestrator directs each step, knows the full workflow state — easier to trace and debug. Compensating transactions: undo already-completed steps on failure (refund payment, release seat).",
          whyItMatters: "Booking seat → charging payment → sending confirmation: any failure needs rollback. That's a textbook SAGA.",
          resources: [
            { label: "Microservices.io: SAGA Pattern", url: "https://microservices.io/patterns/data/saga.html", type: "doc" },
            { label: "Chris Richardson: SAGA Talk (YouTube)", url: "https://www.youtube.com/watch?v=xDuwrtwYHu8", type: "video" }
          ]
        },
        {
          id: "p7-locks", title: "Distributed Locks — Redis Redlock & ZooKeeper",
          description: "Problem: two services simultaneously claim one resource. Redis SET NX EX: atomic single-node lock. Redlock: acquire lock on ⌈N/2⌉+1 independent Redis nodes within validity time — resistant to single node failure. Release: Lua script (check owner, then delete atomically — prevents releasing another client's lock). ZooKeeper: ephemeral sequential znodes for fair distributed locks. TTL expiry prevents deadlocks. Caution: GC pauses, clock skew, and network delays can still defeat locks — design for idempotency as defense-in-depth.",
          whyItMatters: "Inventory reservation, seat selection, ticket booking — all require distributed locking. Know both the pattern and its failure modes.",
          resources: [
            { label: "Martin Kleppmann: How to Do Distributed Locking", url: "https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html", type: "blog" },
            { label: "Redis: Redlock Algorithm", url: "https://redis.io/docs/latest/develop/use/patterns/distributed-locks/", type: "doc" }
          ]
        },
        {
          id: "p7-consensus", title: "Consensus: Raft, Paxos & Leader Election",
          description: "Leader Election: one node becomes leader, coordinates writes, follower nodes replicate. Raft: simpler than Paxos. Leader receives client requests → replicates to majority (quorum) of followers → commits when majority ACKs → responses. Leader election: follower times out → becomes candidate → RequestVote → wins majority → becomes new leader. Used in: etcd (Kubernetes), CockroachDB, TiKV, Consul. ZooKeeper: Zab protocol (similar to Raft). Paxos: mathematically proven but implementation is notoriously complex.",
          whyItMatters: "Understanding why etcd exists, why Kubernetes needs it, and how leader election works underpins all distributed coordination.",
          resources: [
            { label: "The Raft Consensus Algorithm (Animated Visual)", url: "https://raft.github.io/", type: "doc" },
            { label: "MIT 6.824: Distributed Systems Labs (Raft)", url: "https://pdos.csail.mit.edu/6.824/", type: "doc" }
          ]
        }
      ]
    },
    {
      id: "phase-8", number: 8, title: "Microservices, Docker & Kubernetes", level: "Advanced", color: "#38bdf8",
      tagline: "A monolith isn't a dirty word. Know when NOT to use microservices.",
      topics: [
        {
          id: "p8-monolith", title: "Monolith → Modular Monolith → Microservices Evolution",
          description: "Monolith: single process, shared DB, simple deploy — right for teams < 10 engineers. Problems: long build times, tightly coupled, can't scale parts independently. Modular Monolith: enforced internal module boundaries (separate packages/folders, no cross-module DB access) — single deploy, but cleaner architecture, easier to later split. Microservices: independently deployable, own DB per service, polyglot, separate teams — right when team > 50 engineers with clear bounded contexts. Segment.com: moved FROM microservices back to monolith (read their blog post).",
          whyItMatters: "Jumping to microservices without justification is a career-limiting move. Interviewers who hear 'let's use microservices' without justification immediately probe.",
          resources: [
            { label: "Segment: Goodbye Microservices (Real Story)", url: "https://segment.com/blog/goodbye-microservices/", type: "blog" },
            { label: "Martin Fowler: Microservices Pattern", url: "https://martinfowler.com/articles/microservices.html", type: "blog" },
            { label: "Sam Newman: Building Microservices (O'Reilly)", url: "https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/", type: "doc" }
          ]
        },
        {
          id: "p8-resilience", title: "Resilience Patterns: Circuit Breaker, Bulkhead, Retry",
          description: "Circuit Breaker: Closed (normal) → trips to Open (too many failures, reject fast without calling downstream) → half-Open (allow 1 probe request to test recovery). Prevents cascade failures. Bulkhead: separate thread pools per downstream service — failure in one doesn't starve threads for others. Retry: exponential backoff with jitter — 1s, 2s, 4s + random(0-1s). Only retry idempotent operations. Timeout: every external call must have timeout (default in frameworks is often infinite!). Fallback: cached result, default value, or graceful degradation.",
          whyItMatters: "Cascading failure is the #1 cause of microservice outages. Netflix's Hystrix library popularized circuit breakers — now Resilience4j is the standard.",
          resources: [
            { label: "Netflix: Fault Tolerance in a High-Volume Distributed System", url: "https://netflixtechblog.com/fault-tolerance-in-a-high-volume-distributed-system-91ab4faae74a", type: "blog" },
            { label: "Resilience4j: Circuit Breaker Docs", url: "https://resilience4j.readme.io/docs/circuitbreaker", type: "doc" },
            { label: "Microsoft: Cloud Design Patterns", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/", type: "doc" }
          ]
        },
        {
          id: "p8-docker", title: "Docker — Container Best Practices",
          description: "Container = process isolation via Linux namespaces (PID, network, mount, user) + cgroups (CPU/memory limits). Dockerfile: multi-stage builds (build in heavy image, copy artifact to slim alpine/distroless runtime — reduces image from 1.5GB to 100MB). Layer caching: COPY package.json → npm install → COPY source (changes rarely → often → rarely, optimizes cache). .dockerignore: exclude node_modules, .git. Health check: HEALTHCHECK CMD curl -f localhost/health. Never run as root — add USER node.",
          whyItMatters: "Docker is table stakes for every modern backend role. Multi-stage builds and security best practices separate engineers who understand it from those who copy Dockerfiles from Stack Overflow.",
          resources: [
            { label: "Docker Best Practices — Official", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/", type: "doc" },
            { label: "TechWorld with Nana: Docker Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=pg19Z8LL06w", type: "video" }
          ]
        },
        {
          id: "p8-k8s", title: "Kubernetes — Deployments, Services, Autoscaling, Ingress",
          description: "Pod: 1+ containers sharing network namespace. Deployment: manages pod replicas, rolling updates (maxSurge, maxUnavailable), rollback. Service: stable DNS + load balancing (ClusterIP/NodePort/LoadBalancer). Ingress: HTTP routing, TLS termination (Nginx ingress, Traefik). HPA: scale pods on CPU/memory/custom metrics. VPA: adjust resource requests/limits. ConfigMap: non-sensitive config. Secret: base64-encoded secrets (use sealed-secrets or external-secrets for real security). PersistentVolumeClaim: stateful storage for databases.",
          whyItMatters: "Kubernetes powers most cloud-native production systems. Enterprise consulting work (Deloitte) heavily involves K8s-based deployments.",
          resources: [
            { label: "TechWorld with Nana: Kubernetes Full Course (YouTube)", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video" },
            { label: "Kubernetes Official Docs — Concepts", url: "https://kubernetes.io/docs/concepts/", type: "doc" },
            { label: "Kubernetes The Hard Way (Kelsey Hightower)", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", type: "code" }
          ]
        }
      ]
    },
    {
      id: "phase-9", number: 9, title: "Reliability, Observability & Security", level: "Advanced", color: "#34d399",
      tagline: "A system you can't observe is a system you can't operate.",
      topics: [
        {
          id: "p9-observability", title: "Logs, Metrics, Traces — Three Pillars of Observability",
          description: "Logs: structured JSON events (never use string concatenation). Include: correlation-ID, service-name, trace-ID, user-ID, duration. Log levels: DEBUG (dev), INFO (important business events), WARN (recoverable issues), ERROR (needs attention). Metrics: counters, gauges, histograms, summaries. Export via Prometheus /metrics endpoint. Alert on symptoms (high error rate, high latency) not causes. Traces: span tree showing request time in each service. OpenTelemetry SDK instruments code automatically. Correlation ID propagated via B3/W3C TraceContext header.",
          whyItMatters: "'System is slow' is unsolvable. 'p99 /checkout took 4.2s, trace shows DB query on line 247 taking 3.8s, missing index on (user_id, created_at)' is solvable.",
          resources: [
            { label: "OpenTelemetry — Official Docs", url: "https://opentelemetry.io/docs/", type: "doc" },
            { label: "Google SRE Book: Monitoring Distributed Systems", url: "https://sre.google/sre-book/monitoring-distributed-systems/", type: "doc" },
            { label: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/", type: "doc" }
          ]
        },
        {
          id: "p9-failure", title: "Timeout, Retry, Backoff & Fallback Patterns",
          description: "Timeout: every HTTP client call MUST set a timeout. Default in many libraries is INFINITE — this causes thread pool exhaustion leading to full outages. Rule: set timeout < SLA of your API. Retry: only for transient errors (503, network timeout). Never retry on 400/401/404 (client errors). Exponential Backoff: wait = 2^attempt × base. Jitter: add random(0, wait) to desynchronize retries from multiple instances. Max retries: 3-5. Circuit breaker wraps retry logic. Fallback: cached result, empty list, or default value.",
          whyItMatters: "Missing timeouts caused multiple famous outages. GitHub, Amazon S3, CrowdStrike cascades all trace back to missing timeout/circuit breaker patterns.",
          resources: [
            { label: "AWS: Exponential Backoff and Jitter", url: "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/", type: "blog" },
            { label: "Google SRE: Handling Overload", url: "https://sre.google/sre-book/handling-overload/", type: "doc" }
          ]
        },
        {
          id: "p9-security", title: "Security: OWASP Top 10, Secrets & Zero-Trust",
          description: "OWASP Top 10 (2021): Broken Access Control (#1), Cryptographic Failures (#2), Injection — SQL/NoSQL/LDAP (#3), Insecure Design (#4), Security Misconfiguration (#5), Vulnerable Components (#6), Auth Failures (#7), Integrity Failures (#8), Logging Failures (#9), SSRF (#10). Secrets: NEVER in code or env vars → AWS Secrets Manager / HashiCorp Vault / Doppler. Zero-Trust: every service-to-service call must be authenticated (mTLS or SPIFFE). WAF: filter OWASP attacks at edge. Container scanning: Trivy in CI pipeline.",
          whyItMatters: "Deloitte consulting involves security reviews. OWASP knowledge + secrets management + defense-in-depth is expected of any engineer touching enterprise systems.",
          resources: [
            { label: "OWASP Top 10 — 2021", url: "https://owasp.org/www-project-top-ten/", type: "doc" },
            { label: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/", type: "doc" },
            { label: "HashiCorp Vault Introduction", url: "https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-intro", type: "doc" }
          ]
        },
        {
          id: "p9-cicd", title: "CI/CD Pipelines & Deployment Strategies",
          description: "CI stages: lint → unit tests → integration tests (Testcontainers) → SAST (Snyk/SonarQube) → Docker build → image scan (Trivy) → push to registry. CD stages: deploy to staging → smoke tests → E2E tests → manual approval gate → production. Deployment strategies: Blue-Green (two production environments, instant traffic switch via LB, instant rollback). Canary (5% → 20% → 100% traffic, monitor error rate and p99 latency per step, auto-rollback on breach). Rolling (replace pods one at a time, max surge + max unavailable control speed).",
          whyItMatters: "Enterprise clients (Deloitte) use CI/CD heavily. Understanding deployment strategies prevents costly rollback situations.",
          resources: [
            { label: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "doc" },
            { label: "GitLab CI/CD Docs", url: "https://docs.gitlab.com/ee/ci/", type: "doc" },
            { label: "AWS CodePipeline Docs", url: "https://docs.aws.amazon.com/codepipeline/", type: "doc" }
          ]
        }
      ]
    },
    {
      id: "phase-10", number: 10, title: "Advanced Patterns & Real-World Architectures", level: "Expert", color: "#fbbf24",
      tagline: "The depth that differentiates senior candidates from exceptional ones.",
      topics: [
        {
          id: "p10-cqrs-es", title: "CQRS & Event Sourcing",
          description: "CQRS: separate write model (Command: enforces business rules, normalized DB) from read model (Query: denormalized, optimized for display, can be materialized views or read DB). Event Sourcing: store sequence of events, not current state. Current state = replay all events. Benefits: complete audit log, time-travel queries (what was the state at time T?), event replay for projections. Cost: eventual consistency, complex queries, storage growth. Used in: financial ledgers, git (every commit is an immutable event), collaborative editors.",
          whyItMatters: "Financial systems, audit trails, event-driven architectures — CQRS+ES appears in senior design rounds at Stripe, Razorpay, financial firms.",
          resources: [
            { label: "Martin Fowler: CQRS", url: "https://martinfowler.com/bliki/CQRS.html", type: "blog" },
            { label: "Martin Fowler: Event Sourcing", url: "https://martinfowler.com/eaaDev/EventSourcing.html", type: "blog" },
            { label: "Greg Young: CQRS and Event Sourcing (YouTube)", url: "https://www.youtube.com/watch?v=JHGkaShoyNs", type: "video" }
          ]
        },
        {
          id: "p10-search", title: "Search at Scale: Elasticsearch & Inverted Index",
          description: "Inverted Index: maps term → sorted list of document IDs. TF-IDF scoring + BM25 ranking. Elasticsearch: distributed Lucene, shards (primary + replica), refresh interval (1s = near-real-time). Pattern: dual-write to PostgreSQL (source of truth) + Elasticsearch (search). Better: CDC via Debezium captures PostgreSQL WAL → Kafka → Elasticsearch connector. Autocomplete: Edge N-gram tokenizer. Faceted search: aggregations. Index lifecycle: hot → warm → cold → delete based on age.",
          whyItMatters: "Any system with user-facing search (e-commerce, job boards, social) needs Elasticsearch. Dual-write vs CDC is a design choice interviewers probe.",
          resources: [
            { label: "Elastic: Getting Started Guide", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html", type: "doc" },
            { label: "Elasticsearch: The Definitive Guide (Free Online)", url: "https://www.elastic.co/guide/en/elasticsearch/guide/current/index.html", type: "doc" }
          ]
        },
        {
          id: "p10-geo", title: "Geospatial Systems — Uber, Swiggy, Google Maps",
          description: "Geohash: encode lat/long into alphanumeric string (6 chars ≈ ±0.6km). Adjacent cells share prefixes (prefix search for proximity). PostGIS: GEOGRAPHY type, ST_DWithin for radius queries. Redis GEOADD/GEORADIUS: O(N+log M) proximity search. H3 (Uber): hexagonal hierarchical grid at 15 resolutions, uniform cell area (no distortion at poles). S2 (Google): sphere-based hierarchical cells. Real-time location: WebSocket streams driver GPS every 5s → Redis for current position (with 30s expiry if no update) → Kafka for analytics.",
          whyItMatters: "Uber, Swiggy, Ola, Zomato, Google Maps — all heavy geospatial. Food delivery / ride-hailing design ALWAYS includes geospatial indexing.",
          resources: [
            { label: "Uber: H3 Hexagonal Geospatial Indexing System", url: "https://www.uber.com/blog/h3/", type: "blog" },
            { label: "PostGIS Documentation", url: "https://postgis.net/documentation/", type: "doc" }
          ]
        },
        {
          id: "p10-feed", title: "Social Media Feed: Fan-Out on Write vs Read",
          description: "Fan-out on Write (Push Model): when user posts, immediately push to all followers' feed caches. Reads are O(1) — just read own feed cache. Problem: celebrity (Justin Bieber, Virat Kohli with 100M followers) causes 100M cache writes per post. Fan-out on Read (Pull Model): at read time, fetch posts from N followed users and merge. Problem: 1000 followed users = 1000 DB reads. Hybrid (Instagram/Twitter approach): push to normal users (<10k followers), pull for celebrity accounts, merge at read time. Redis sorted set (timestamp as score) stores feed per user.",
          whyItMatters: "Twitter, Instagram, Facebook timeline — every social system uses this pattern. The celebrity problem is the classic interview follow-up.",
          resources: [
            { label: "Instagram: Sharding & IDs at Scale", url: "https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c", type: "blog" },
            { label: "Twitter: Timelines at Scale (InfoQ Talk)", url: "https://www.infoq.com/presentations/Twitter-Timeline-Scalability/", type: "blog" }
          ]
        }
      ]
    }
  ],

  // =========================================================================
  // BUILDING BLOCKS with STUDY RESOURCES
  // =========================================================================
  buildingBlocks: [
    {
      name: "Load Balancer", category: "Traffic", level: "Foundation",
      whatItDoes: "Distributes incoming traffic across multiple backend servers. Provides health checking, automatic failover, and connection draining on instance removal.",
      whenToUse: "Any horizontally-scaled backend with more than one server instance.",
      whenNotToUse: "Single-instance internal tools with trivial, predictable traffic.",
      tools: "Nginx, AWS ALB/NLB, HAProxy, Envoy, Traefik",
      resources: [
        { label: "NGINX Load Balancing Guide", url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/", type: "doc" },
        { label: "Gaurav Sen: Load Balancers Explained (YouTube)", url: "https://www.youtube.com/watch?v=K0Ta65OqQkY", type: "video" },
        { label: "AWS: Elastic Load Balancing Features", url: "https://aws.amazon.com/elasticloadbalancing/features/", type: "doc" }
      ]
    },
    {
      name: "API Gateway", category: "Traffic", level: "Core",
      whatItDoes: "Single entry point for all clients. Handles TLS termination, auth, rate limiting, request routing to microservices, protocol translation (REST→gRPC), logging, and response aggregation.",
      whenToUse: "Microservices with multiple external client types (web, mobile, third-party APIs).",
      whenNotToUse: "Small monolith where it adds unnecessary 1ms latency hop with no benefit.",
      tools: "Kong, AWS API Gateway, Apigee, KrakenD, Envoy",
      resources: [
        { label: "Kong API Gateway Docs", url: "https://docs.konghq.com/gateway/latest/", type: "doc" },
        { label: "Microservices: API Gateway Pattern", url: "https://microservices.io/patterns/apigateway.html", type: "blog" }
      ]
    },
    {
      name: "CDN (Content Delivery Network)", category: "Traffic", level: "Core",
      whatItDoes: "Distributed network of edge servers that cache static content geographically close to users. Reduces origin server load and user latency dramatically.",
      whenToUse: "Static assets (images, video, JS, CSS), global users experiencing high latency, DDoS protection.",
      whenNotToUse: "Highly personalized, real-time transactional data that cannot be safely cached.",
      tools: "Cloudflare, AWS CloudFront, Fastly, Akamai",
      resources: [
        { label: "Cloudflare CDN Docs", url: "https://developers.cloudflare.com/cache/", type: "doc" },
        { label: "AWS CloudFront Developer Guide", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", type: "doc" }
      ]
    },
    {
      name: "Redis Cache", category: "Caching", level: "Core",
      whatItDoes: "In-memory key-value store with rich data structures (strings, hashes, lists, sets, sorted sets, pub/sub, streams). Sub-millisecond latency for reads.",
      whenToUse: "Read-heavy data (product catalog, user sessions, rate limiting counters, leaderboards, real-time pub/sub).",
      whenNotToUse: "Financial source-of-truth data that requires guaranteed durability — Redis AOF/RDB are not as durable as WAL-based databases.",
      tools: "Redis, Valkey, DragonFly, KeyDB, AWS ElastiCache",
      resources: [
        { label: "Redis Documentation", url: "https://redis.io/docs/latest/", type: "doc" },
        { label: "Redis University: Free Courses", url: "https://university.redis.com/", type: "doc" },
        { label: "Arpit Bhayani: Redis Internals (Blog)", url: "https://arpitbhayani.me/blogs", type: "blog" }
      ]
    },
    {
      name: "PostgreSQL / RDBMS", category: "Database", level: "Foundation",
      whatItDoes: "ACID-compliant relational database. Supports complex JOINs, transactions, foreign keys, stored procedures, triggers, and full-text search via pg_trgm/tsvector.",
      whenToUse: "Financial data, user accounts, orders, inventory — any data with clear relational structure needing ACID guarantees.",
      whenNotToUse: "Unstructured JSON documents with unpredictable schema or write rates > 100k ops/sec requiring horizontal sharding.",
      tools: "PostgreSQL, MySQL, AWS Aurora, CockroachDB, PlanetScale",
      resources: [
        { label: "PostgreSQL Official Documentation", url: "https://www.postgresql.org/docs/current/", type: "doc" },
        { label: "CMU 15-445: Database Systems Lectures (Free)", url: "https://15445.courses.cs.cmu.edu/", type: "video" },
        { label: "Use The Index, Luke — Free Indexing Book", url: "https://use-the-index-luke.com/", type: "doc" }
      ]
    },
    {
      name: "MongoDB (Document DB)", category: "Database", level: "Core",
      whatItDoes: "Schema-flexible JSON/BSON document store. Native support for nested documents, arrays, and embedded data. Horizontal sharding built-in (mongos router).",
      whenToUse: "Product catalogs, user profiles, CMS, event logs with variable structure — when data shape evolves frequently.",
      whenNotToUse: "Financial transactions requiring ACID across multiple documents — MongoDB multi-document ACID requires careful setup.",
      tools: "MongoDB Atlas, AWS DocumentDB, Firestore, CouchDB",
      resources: [
        { label: "MongoDB Documentation", url: "https://www.mongodb.com/docs/", type: "doc" },
        { label: "MongoDB University: Free Courses", url: "https://learn.mongodb.com/", type: "doc" }
      ]
    },
    {
      name: "Cassandra / Wide-Column DB", category: "Database", level: "Advanced",
      whatItDoes: "Write-optimized, multi-datacenter wide-column store. Partition key determines node, clustering column determines sort order within partition. Tunable consistency (ONE/QUORUM/ALL). No JOINs.",
      whenToUse: "Time-series data, chat message history, IoT telemetry, user activity logs — massive write throughput, multi-datacenter.",
      whenNotToUse: "Complex relational queries, low-cardinality partition keys (hotspot risk), systems needing strong consistency.",
      tools: "Apache Cassandra, ScyllaDB, AWS Keyspaces, DataStax",
      resources: [
        { label: "Cassandra: Data Modeling Guide", url: "https://cassandra.apache.org/doc/latest/cassandra/data_modeling/", type: "doc" },
        { label: "Discord: How We Store Trillions of Messages", url: "https://discord.com/category/engineering", type: "blog" }
      ]
    },
    {
      name: "Elasticsearch / Search Engine", category: "Database", level: "Core",
      whatItDoes: "Distributed Lucene-based search with inverted index. Full-text search, faceted navigation, aggregations, autocomplete (edge n-gram), geospatial search, and near-real-time (NRT) indexing.",
      whenToUse: "Product search, content search, log analytics (ELK stack), autocomplete, faceted filtering on large datasets.",
      whenNotToUse: "Source of truth for transactional data — always sync from a primary database via CDC or dual-write.",
      tools: "Elasticsearch, OpenSearch, Typesense, MeiliSearch, Algolia",
      resources: [
        { label: "Elastic: Getting Started", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html", type: "doc" },
        { label: "Elasticsearch: The Definitive Guide (Free)", url: "https://www.elastic.co/guide/en/elasticsearch/guide/current/index.html", type: "doc" }
      ]
    },
    {
      name: "Object Storage (S3)", category: "Storage", level: "Core",
      whatItDoes: "Flat-namespace blob storage for any size unstructured data. 99.999999999% (11 nines) durability. Unlimited capacity. Pre-signed URLs for secure, direct browser uploads.",
      whenToUse: "Images, videos, PDFs, user uploads, backups, data lake, ML training datasets, static website hosting.",
      whenNotToUse: "Random-access block device workloads (databases need block storage like EBS), very low-latency file serving without CDN.",
      tools: "AWS S3, GCS, Azure Blob Storage, MinIO (self-hosted), Cloudflare R2",
      resources: [
        { label: "AWS S3 Developer Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/", type: "doc" },
        { label: "Cloudflare R2 (S3-compatible, zero egress fees)", url: "https://developers.cloudflare.com/r2/", type: "doc" }
      ]
    },
    {
      name: "Message Queue (SQS/RabbitMQ)", category: "Messaging", level: "Core",
      whatItDoes: "Async task queue between producers and consumer workers. Decouples services, absorbs traffic spikes, enables retry with backoff. Messages consumed and deleted after processing.",
      whenToUse: "Email sending, PDF generation, image processing, notification dispatch, any background job that doesn't need immediate response.",
      whenNotToUse: "Synchronous request-response (client waits for result). Event replay or multiple-consumer fan-out (use Kafka instead).",
      tools: "AWS SQS, RabbitMQ, Redis BullMQ, Azure Service Bus",
      resources: [
        { label: "AWS SQS Developer Guide", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/", type: "doc" },
        { label: "RabbitMQ Tutorials", url: "https://www.rabbitmq.com/tutorials/", type: "doc" }
      ]
    },
    {
      name: "Apache Kafka", category: "Messaging", level: "Advanced",
      whatItDoes: "Distributed, durable, ordered, partitioned append-only event log. Multiple consumer groups each independently read full log. Configurable retention (days/weeks/forever). Supports exactly-once semantics (EOS).",
      whenToUse: "Event-driven microservices, real-time analytics, audit logs, CDC (Change Data Capture), event sourcing, multiple independent consumers.",
      whenNotToUse: "Simple task queues where a message queue is sufficient. Low-throughput systems that don't need event replay.",
      tools: "Apache Kafka, Redpanda, AWS MSK, Confluent Cloud",
      resources: [
        { label: "Confluent: Apache Kafka 101 (Free Course)", url: "https://developer.confluent.io/courses/apache-kafka/events/", type: "doc" },
        { label: "Kafka Documentation", url: "https://kafka.apache.org/documentation/", type: "doc" },
        { label: "Kafka: The Definitive Guide (Free PDF)", url: "https://www.confluent.io/resources/kafka-the-definitive-guide-v2/", type: "doc" }
      ]
    },
    {
      name: "WebSocket Gateway", category: "Real-Time", level: "Core",
      whatItDoes: "Manages persistent bidirectional TCP connections for real-time communication. Client and server can send messages at any time without request-response overhead.",
      whenToUse: "Chat applications, live collaboration, multiplayer games, trading dashboards, real-time collaborative editing.",
      whenNotToUse: "One-directional server updates (SSE is simpler and works through HTTP/2 multiplexing, proxies, and load balancers without issues).",
      tools: "Socket.io, ws (Node.js), SignalR (.NET), Ably, Pusher",
      resources: [
        { label: "WebSockets — MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", type: "doc" },
        { label: "WebSockets vs SSE — Ably Blog", url: "https://ably.com/blog/websockets-vs-sse", type: "blog" }
      ]
    },
    {
      name: "Service Mesh (Istio)", category: "Microservices", level: "Expert",
      whatItDoes: "Infrastructure layer for microservice-to-service communication. Sidecar proxy (Envoy) alongside each pod handles mTLS encryption, circuit breaking, retries, load balancing, distributed tracing, and traffic shaping.",
      whenToUse: "Large microservice deployments (50+ services) where cross-cutting concerns (security, observability, traffic management) need centralized control.",
      whenNotToUse: "Small teams or simple deployments where sidecar overhead (extra container, latency, complexity) isn't justified.",
      tools: "Istio, Linkerd, Consul Connect, AWS App Mesh",
      resources: [
        { label: "Istio Documentation", url: "https://istio.io/latest/docs/", type: "doc" },
        { label: "Envoy Proxy Docs", url: "https://www.envoyproxy.io/docs/envoy/latest/", type: "doc" }
      ]
    },
    {
      name: "Kubernetes", category: "Orchestration", level: "Advanced",
      whatItDoes: "Container orchestration platform. Manages scheduling, scaling, self-healing (restarts failed pods), rolling deployments, service discovery, configuration management, and autoscaling.",
      whenToUse: "Production containerized workloads needing autoscaling, self-healing, declarative deployment, and complex networking.",
      whenNotToUse: "Small startup MVPs — ECS Fargate or Lambda is simpler. K8s operational overhead requires dedicated DevOps expertise.",
      tools: "AWS EKS, GKE, AKS, K3s (lightweight), Minikube (local dev)",
      resources: [
        { label: "Kubernetes Official Docs", url: "https://kubernetes.io/docs/", type: "doc" },
        { label: "TechWorld with Nana: K8s Full Tutorial (YouTube)", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video" },
        { label: "Kubernetes The Hard Way (Kelsey Hightower)", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", type: "code" }
      ]
    },
    {
      name: "Circuit Breaker", category: "Resilience", level: "Advanced",
      whatItDoes: "Prevents cascading failures by detecting when a downstream service is unhealthy and short-circuiting calls to it (returning cached response or error immediately) until it recovers.",
      whenToUse: "Any microservice that makes synchronous calls to external services or other microservices that can fail.",
      whenNotToUse: "Asynchronous messaging (queues handle this differently via DLQ). Internal in-memory function calls.",
      tools: "Resilience4j (Java), Polly (.NET), opossum (Node.js), AWS App Mesh (built-in)",
      resources: [
        { label: "Martin Fowler: Circuit Breaker Pattern", url: "https://martinfowler.com/bliki/CircuitBreaker.html", type: "blog" },
        { label: "Resilience4j: Circuit Breaker Docs", url: "https://resilience4j.readme.io/docs/circuitbreaker", type: "doc" }
      ]
    }
  ],

  // =========================================================================
  // 20 CASE STUDIES (with GFG links where available)
  // =========================================================================
  caseStudies: [
    {
      id: "case-tinyurl",
      title: "Design TinyURL / URL Shortener",
      category: "Classic Warm-up",
      level: "Warm-up",
      scale: "100M URLs stored, 10B redirects/day (~115k QPS reads)",
      clarify: "Custom alias? URL expiry TTL (default 5yr)? Click analytics? Multi-tenant (per-user quotas)? Maximum URL length?",
      components: "API Gateway → Key Generation Service (KGS) with pre-generated key pool in Redis → DynamoDB/Cassandra (url_id → original_url) → Redis cache (hot URLs) → 301/302 redirect handler",
      bottleneck: "Key collision under concurrent KGS load. 115k read QPS requires cache (Pareto: 20% of URLs = 80% of traffic). 10B redirects → CDN edge caching 301 responses.",
      deepDive: [
        { q: "Why Base62 over UUID for short keys?", a: "Base62 (a-z + A-Z + 0-9 = 62 chars) produces 7-char strings (62^7 = 3.5T unique keys). UUID is 36 chars — too long for a URL shortener. Base62 is URL-safe (no special characters)." },
        { q: "HTTP 301 vs 302 redirect — which do you choose and why?", a: "301 (Permanent): browser caches the redirect permanently. Reduces server load but breaks analytics (browser goes directly to destination). 302 (Temporary): every request hits your server — enables accurate click counting. Use 302 if analytics matter, 301 if reducing server load matters." },
        { q: "How do you prevent KGS race condition when two workers pick the same key?", a: "KGS pre-generates batches of unused keys and moves them to a 'used' set atomically. Each KGS instance checks out a range from ZooKeeper (distributed counter). Or: use PostgreSQL SERIAL + atomic SELECT FOR UPDATE SKIP LOCKED." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-url-shortening-service/"
    },
    {
      id: "case-netflix",
      title: "Design Netflix / Video Streaming Platform",
      category: "Streaming",
      level: "Advanced",
      scale: "230M subscribers, 200M hours streamed/day, 15% of global internet traffic",
      clarify: "VOD only or live streaming? What resolutions/bitrates? Global CDN? Offline download? Multiple device types? Recommendation engine scope?",
      components: "OCA (Open Connect Appliance) CDN → AWS S3 (master video files) → Transcoding Service (FFmpeg clusters, adaptive bitrate — DASH/HLS) → API Gateway → Microservices (User, Catalog, Recommendation, Playback, Billing) → Cassandra (user activity) → Elasticsearch (search) → Apache Spark (offline ML)",
      bottleneck: "Transcoding: 1 hour of 4K video = 50GB source → 400 versions (codec × resolution × bitrate). CDN cache hit rate must be >90% to not overload origin S3. Recommendation: real-time vs batch ML trade-off.",
      deepDive: [
        { q: "How does Netflix ensure smooth playback with variable internet speeds?", a: "Adaptive Bitrate Streaming (ABR): video encoded at 10-15 different quality levels. Client player (JS/native) monitors bandwidth every 2s and switches quality segments seamlessly. DASH (Dynamic Adaptive Streaming over HTTP) or HLS protocol. Buffering ahead by 10-30 seconds." },
        { q: "How does the Open Connect CDN work?", a: "Netflix ships physical servers (OCAs) directly into ISP data centers globally. ISPs host them for free (saves peering costs). 95% of traffic served from OCAs. OCAs pre-cache popular content daily. Uncommon content falls back to AWS CloudFront → S3." },
        { q: "How does Netflix's recommendation engine work at high level?", a: "Collaborative filtering: 'users like you also watched'. Matrix factorization: decompose user-item matrix. Real-time features: current session behavior, time of day, device. Spark MLlib for batch training. Apache Flink for real-time feature serving. A/B test thumbnails (they A/B test 30,000 variations simultaneously)." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-netflix-a-complete-architecture/"
    },
    {
      id: "case-uber",
      title: "Design Uber / Ride-Hailing System",
      category: "Real-Time Location",
      level: "Advanced",
      scale: "15M trips/day, 5M drivers online, 50+ countries, 500k GPS updates/minute",
      clarify: "Ride types (UberPool, UberGo, Black)? Surge pricing logic? ETA accuracy requirement? Driver matching algorithm (nearest, ratings, acceptance rate)? Cancellation window?",
      components: "Driver App → WebSocket/HTTP gateway → Location Service (Kafka streams, H3 grid indexing, Redis GEOADD) → Matching Service → Trip Service (Cassandra) → Pricing Service → Payment Service → Notification Service (FCM/APNs)",
      bottleneck: "1M GPS pings/min from active drivers. Real-time proximity matching at sub-second latency. Surge pricing calculation requires aggregating driver supply and rider demand by H3 hex cell in real-time.",
      deepDive: [
        { q: "How do you efficiently find the nearest 10 available drivers to a rider location?", a: "H3 hexagonal indexing: rider's location maps to H3 hex cell. Redis GEOADD stores all driver positions. GEORADIUS returns drivers within R km in O(N+log M). For city-scale: check smaller hex first, expand to neighbors if insufficient results. Uber's own spatial engine: Ringpop (consistent hash ring) for driver location sharding." },
        { q: "How do you handle 500k GPS updates per minute without overloading the database?", a: "Driver location updates go to Kafka (not directly to DB). Location Service consumes from Kafka, updates Redis GEOADD (current position, TTL=30s to auto-expire offline drivers). Cassandra receives batch aggregated location history for analytics. Redis is the live view; Cassandra is the historical record." },
        { q: "How does surge pricing work technically?", a: "Stream processing (Kafka + Apache Flink): for each H3 hex cell, compute rider_demand / driver_supply in a 5-minute sliding window. Surge multiplier = f(demand/supply ratio). Pre-computed surge map broadcast to driver apps every 30s. Riders shown surge estimate before booking." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-of-uber-app-uber-system-architecture/"
    },
    {
      id: "case-twitter",
      title: "Design Twitter / X Feed & Timeline",
      category: "Social Media",
      level: "Advanced",
      scale: "350M users, 500M tweets/day, Elon Musk tweet = 1M followers = fan-out bottleneck",
      clarify: "Timeline content (follows only vs algorithmic)? Real-time vs eventual consistency for feed? Character limit? Media handling? Trending topics? Search?",
      components: "Tweet Service → Fanout Service → Feed Cache (Redis sorted set per user, tweet_id as score) → Timeline API → Media Service (S3 + CloudFront CDN) → Trending Service (Apache Storm, sliding window count) → Search Service (Elasticsearch)",
      bottleneck: "Celebrity fan-out: when @elonmusk tweets, fanning out to 150M followers synchronously would take hours. Solution: hybrid model — push to normal users, pull for celebrity tweets at read time, merge at API layer.",
      deepDive: [
        { q: "How does Twitter's timeline fan-out work?", a: "Hybrid fan-out: Tweet created → stored in Tweet DB → Fanout Service checks follower count. Normal user (< 5k followers): push tweet_id to each follower's Redis feed (sorted set, score = timestamp). Celebrity (> 5k followers): don't fan-out. At read time, fetch celebrity tweets you follow and merge with your cached feed. Merge happens in the Timeline API layer." },
        { q: "How do you implement trending topics in real-time?", a: "Apache Storm topology: tweet stream → tokenize → count hashtags in sliding 24h window per region → top K hashtags (Count-Min Sketch for approximate counting at scale, reduces memory from O(N) to O(epsilon) for approximate frequency). Store trending list in Redis, refresh every 30s." },
        { q: "How do you handle tweet IDs at 500M/day globally?", a: "Twitter Snowflake: 64-bit ID. 41 bits = timestamp (milliseconds since epoch 2010-11-04). 10 bits = machine ID. 12 bits = sequence per machine per millisecond (4096 IDs/ms/machine). Sortable by creation time. No coordination needed (machine IDs assigned centrally once)." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-twitter-a-system-design-interview-question/"
    },
    {
      id: "case-whatsapp",
      title: "Design WhatsApp / Real-Time Chat",
      category: "Messaging",
      level: "Core",
      scale: "2B users, 100B messages/day, 2B minutes of calls/day",
      clarify: "1:1 and/or group chat? Max group size? Read receipts (sent/delivered/read)? End-to-end encryption? Offline delivery? Voice/video calls? Media sharing?",
      components: "Client → WebSocket Gateway cluster (sticky via LB) → ZooKeeper (user_id → gateway mapping) → Chat Service → HBase/Cassandra (messages by conversation_id + timestamp) → Redis (presence/sessions) → FCM/APNs (offline push) → S3 (media)",
      bottleneck: "2B open WebSocket connections across gateway cluster. Message ordering (vector clocks or server-side monotonic sequence). Group chat fan-out to 1024 members per message.",
      deepDive: [
        { q: "How does Server A route a message to a user connected to Server B?", a: "ZooKeeper session registry: user_id → WebSocket_gateway_ip. When user connects, gateway registers (user_id, gateway_address) in ZooKeeper. Sender's gateway looks up recipient's gateway, sends via internal gRPC. If user is offline: store in inbox table in Cassandra, deliver on reconnect via sequence-number sync." },
        { q: "How do you guarantee message ordering?", a: "Server-side: atomic INCR in Redis per conversation → monotonic message_sequence_number. Client stores last received sequence. On reconnect, client sends last_sequence → server streams all messages since then. Cassandra schema: partition_key = conversation_id, clustering_key = (sequence_number DESC) for fast range reads." },
        { q: "How does end-to-end encryption work at WhatsApp scale?", a: "Signal Protocol: each client generates identity key pair + signed pre-key bundle. Before first message, sender fetches recipient's pre-key bundle from WhatsApp key server. Derive shared session key via X3DH (Extended Triple Diffie-Hellman). All messages encrypted client-side; WhatsApp servers never see plaintext. Group: sender sends encrypted key to each member separately." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-notification-system/"
    },
    {
      id: "case-instagram",
      title: "Design Instagram / Photo Sharing",
      category: "Social Media",
      level: "Core",
      scale: "2B users, 95M photos/day uploaded, 4.2B likes/day",
      clarify: "Feed algorithmic or chronological? Stories (24hr TTL)? Video support (Reels)? Comments/likes? DMs? Explore/Search? Hashtags?",
      components: "Upload: Client → API Gateway → Media Service → S3 (original) → Transcoding Queue → S3 (thumbnails/compressed) → CloudFront CDN. Feed: Post created → Fanout Service → Redis feed per user. Explore: Elasticsearch + ML ranking.",
      bottleneck: "Photo storage at 95M uploads/day = 28TB/day. Feed generation for 2B users. Like counter at 4.2B/day = sharded counter (avoid hot row). Celebrity fan-out same problem as Twitter.",
      deepDive: [
        { q: "How do you efficiently store and serve 95M photos per day?", a: "Upload path: presigned S3 URL generated by API → client uploads directly to S3 (bypasses your servers). S3 triggers Lambda → image processed (resize, HEIC→JPEG conversion, strip EXIF) → multiple versions stored in S3 (thumbnail 150×150, medium 640px, original). CloudFront CDN serves all versions with long cache TTL (1 year for immutable content)." },
        { q: "How do likes work at 4.2B/day without database bottlenecks?", a: "Sharded counter: like_count stored in Redis (INCR is atomic, sub-microsecond). Async write to DB in batches (Redis → Kafka → DB writes every 10 minutes). To get like status for current user: Redis set per post stores user_ids who liked (SISMEMBER O(1)). For posts with > 10M likes, approximate count is fine." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-instagram-as-a-system-design-interview/"
    },
    {
      id: "case-google-drive",
      title: "Design Google Drive / Dropbox File Storage",
      category: "File Storage",
      level: "Core",
      scale: "1B users, 15GB free storage each, 2 billion files synced daily",
      clarify: "File versioning? Shared folders? Offline access? Conflict resolution on concurrent edits? File size limits? Real-time sync?",
      components: "Client Sync Agent → Block Storage Service (deduplicate blocks via SHA-256 hash) → S3 (block storage) → Metadata DB (PostgreSQL: file tree, block IDs, version history) → Sync Service (notify connected clients on changes) → Redis (session, notification queue)",
      bottleneck: "Bandwidth for large file uploads. Block-level deduplication (same block across users stored once). Conflict resolution when same file edited on multiple offline clients.",
      deepDive: [
        { q: "How do you minimize bandwidth for large file uploads?", a: "Block chunking: split file into 4MB chunks. Hash each chunk (SHA-256). Before upload, client sends chunk hashes to server. Server replies: 'I already have these 5 blocks, just upload the 3 new ones.' Delta sync: only modified blocks re-uploaded on future saves. Compression per block (gzip/zstd). Background upload on WiFi only (mobile)." },
        { q: "How do you handle concurrent edits (conflict resolution)?", a: "Optimistic locking: file has version number. Two users edit offline → both try to upload → first succeeds → second gets 409 Conflict with server version. Client shows 'conflicted copy' (like Dropbox). For collaborative documents: operational transforms or CRDTs (like Google Docs). For binary files: create conflicted copy, let user choose." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-dropbox-a-system-design-interview-question/"
    },
    {
      id: "case-rate-limiter",
      title: "Design an API Rate Limiter",
      category: "Infrastructure",
      level: "Warm-up",
      scale: "10M API calls/day, 10k QPS peak, distributed across 50 app servers",
      clarify: "Per-user or per-IP limiting? Global limit or per-endpoint? Hard block (429) or queue? Fixed window or sliding? Redis or local memory?",
      components: "API Gateway middleware → Redis cluster (INCR + EXPIRE or Lua sliding window script) → Token bucket counter per {user_id:endpoint} → 429 Too Many Requests response with Retry-After header",
      bottleneck: "Distributed race conditions in Redis counters. Clock skew across multi-region rate limiters. Redis latency adding 1-2ms to every request. What happens when Redis is unavailable?",
      deepDive: [
        { q: "Token Bucket vs Sliding Window Counter — when to choose which?", a: "Token Bucket: allows controlled bursts (e.g., 100 req/hr but 20 in a burst). Natural for API quotas. Sliding Window Counter: smooth limit, prevents boundary gaming (user maxes out at 11:59 and again at 12:00 in fixed window). Use sliding window for stricter enforcement." },
        { q: "What if Redis goes down? Design the failover strategy.", a: "Fail-open: allow all requests when Redis is down (risk: brief abuse window). Fail-closed: deny all requests (safer but causes outage). Practical choice: fail-open with in-process local rate limiting as fallback (each server enforces N/server_count limit locally). Log all rate limit decisions during degraded mode for audit." },
        { q: "How do you implement rate limiting without adding latency to every request?", a: "Lua script in Redis: atomic check-and-increment in single round-trip. Pipeline multiple Redis commands. Or: use Redis in sidecar proxy (Nginx + Redis via OpenResty) — rate limit at proxy level, before request reaches app server. Latency target: < 1ms additional overhead per request." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/rate-limiting-in-system-design/"
    },
    {
      id: "case-bookmyshow",
      title: "Design BookMyShow / Ticket Booking",
      category: "High-Concurrency",
      level: "Advanced",
      scale: "5M bookings/day, 100k concurrent users during peak (blockbuster release)",
      clarify: "Seat selection (specific seat) or just count? Seat lock TTL (how long before releasing)? Payment timeout window? Multiple concurrent shows/screens?",
      components: "Seat Inventory Service → Redis distributed lock (SET seat_A12 user_X NX EX 600) → Booking Service → SAGA Orchestrator → Payment Gateway (async webhook) → Confirmation Service → PostgreSQL (final booking record)",
      bottleneck: "100k users clicking Seat A12 simultaneously at 10:00:00 AM. Need Redis atomic lock to ensure exactly one wins. Payment timeout handling — what if payment webhook never arrives?",
      deepDive: [
        { q: "Walk through the exact seat locking implementation.", a: "Client selects seat A12 for Show #123. POST /lock: Redis command: SET show_123_seat_A12 {user_id} NX EX 600. NX = only set if key doesn't exist (atomic). EX 600 = auto-expire in 10 minutes. If returns nil: seat already locked by someone else → return 409. If returns OK: seat locked → proceed to payment. Payment success → write to PostgreSQL → release Redis lock (or let TTL expire). Payment fail or timeout → release Redis lock." },
        { q: "What if the payment webhook never arrives after seat is locked?", a: "Booking has state machine: SEAT_LOCKED → PAYMENT_INITIATED → PAYMENT_CONFIRMED → BOOKING_CONFIRMED. Background reconciliation job runs every 2 minutes. For bookings stuck in PAYMENT_INITIATED beyond 12 minutes: query payment gateway API for status. If payment succeeded: confirm booking. If failed: release Redis lock (or it auto-expires), send user refund. If gateway unreachable: leave in pending, retry on next reconciliation cycle." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-of-book-my-show-and-similar-apps-movieticketbooking/"
    },
    {
      id: "case-swiggy",
      title: "Design Swiggy / Food Delivery",
      category: "Real-Time Logistics",
      level: "Advanced",
      scale: "1.5M orders/day, 300k delivery partners, 200k restaurant partners",
      clarify: "Real-time delivery tracking? Estimated delivery time (ETA) accuracy? Dynamic pricing/surge? Restaurant recommendation? Live order status updates?",
      components: "Order Service → Restaurant Service → Delivery Partner Assignment (geospatial + Redis GEORADIUS) → Route Optimization Service (Google Maps Distance Matrix API + internal cache) → Real-time Tracking Service (WebSocket → Kafka → location updates) → ETA Prediction Service (ML model)",
      bottleneck: "Real-time location updates from 300k delivery partners. Restaurant ETA = preparation time (ML prediction) + delivery distance / average speed + buffer. Delivery partner assignment must be sub-second.",
      deepDive: [
        { q: "How does Swiggy predict delivery ETA accurately?", a: "ETA = restaurant_prep_time + pickup_travel_time + delivery_travel_time + buffer. Restaurant prep time: ML model trained on restaurant historical data, time-of-day, order complexity, queue depth (from restaurant acknowledged orders). Delivery travel time: Google Maps API with real-time traffic. Update ETA every 30s as delivery partner moves. ETA shown to customer is P90 (90th percentile) to manage expectations." },
        { q: "How do you assign the optimal delivery partner?", a: "For each new order: GEORADIUS in Redis to find all available partners within 3km. Score each by: distance (primary), acceptance rate (secondary), current route efficiency (if partner has another delivery, does this order add <15% to their route?). Assign best-scored partner. If reject: re-run algorithm with next best. Fallback: expand radius to 5km. Partners shown on a bidding system (first to accept within 30s gets the order)." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-of-swiggy/"
    },
    {
      id: "case-google-maps",
      title: "Design Google Maps",
      category: "Maps & Navigation",
      level: "Expert",
      scale: "1B+ MAU, 1 billion km navigated daily, real-time traffic for entire road network",
      clarify: "Turn-by-turn navigation? Real-time traffic? Offline maps? POI search? Transit routing? ETA prediction? Multiple transport modes?",
      components: "Map Tile Service (pre-rendered tiles at multiple zoom levels, stored in object storage, served via CDN) → Graph Service (road network as weighted directed graph) → Routing Engine (Dijkstra/A*/Contraction Hierarchies) → Traffic Service (anonymized GPS pings from users → aggregated speed by road segment) → ETA ML Model → Search/POI Service (Elasticsearch)",
      bottleneck: "Map tiles: 20 zoom levels × entire earth = petabytes of tiles. Routing algorithm across billion-edge graph must return result in < 100ms. Real-time traffic aggregation from billions of GPS pings per hour.",
      deepDive: [
        { q: "How do you find the shortest path across a billion-node road network in < 100ms?", a: "Basic Dijkstra is O(E log V) — too slow for billion-edge graph. Optimizations: A* with geographic heuristic (straight-line distance to destination). Contraction Hierarchies (CH): pre-process graph offline by 'contracting' (shortcutting) less important nodes, creating a hierarchy. Query: bidirectional search from source and destination simultaneously. CH achieves 1000× speedup over Dijkstra. Result: < 1ms for continental routing." },
        { q: "How does Google collect and process real-time traffic?", a: "Anonymized, aggregated GPS data from Android phones (with permission). Every phone reports: location, speed, timestamp every few seconds. Google aggregates speed readings by road segment (OSM-matched) in sliding 5-minute windows. Segments classified as green/yellow/red based on speed vs free-flow speed. Machine learning predicts future traffic from historical patterns + current conditions. Incidents (accidents, construction) detected from sudden speed drops on a segment." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-google-maps/"
    },
    {
      id: "case-youtube",
      title: "Design YouTube / Video Sharing Platform",
      category: "Video Platform",
      level: "Advanced",
      scale: "2.7B users, 500 hours of video uploaded per minute, 1B hours watched daily",
      clarify: "Upload, transcoding, streaming? Comment system? Like/dislike counter? Subscriptions/notifications? Search? Recommendations? Live streaming?",
      components: "Upload Service → S3 (raw video) → Transcoding Queue (AWS MediaConvert/custom FFmpeg workers) → S3 (multiple formats/resolutions) → CDN (CloudFront) → Metadata DB (PostgreSQL: video, channel, view count) → Search (Elasticsearch) → Recommendations (Apache Spark ML)",
      bottleneck: "500 hrs video/minute = 180TB/day raw video ingested. Transcoding: 1 hr video → 400+ versions (H.264, VP9, AV1 × multiple resolutions). CDN cache miss on long-tail videos. Like counter hot-row problem.",
      deepDive: [
        { q: "How does YouTube transcode 500 hours of video per minute at scale?", a: "Distributed transcoding pipeline: raw video stored in S3 → Kafka event triggers worker pool → each worker processes one 'chunk' of video in parallel (GOP-based parallelization — video split into Groups of Pictures, each chunk transcoded independently by separate worker) → chunks re-assembled → output stored in S3. Adaptive streaming: multiple profiles generated (240p, 480p, 720p, 1080p, 4K) in H.264 and VP9." },
        { q: "How do you handle the view count at 1B hours/day without DB bottlenecks?", a: "Don't update view count in PostgreSQL on every view — that's a hot row bottleneck. Instead: Redis INCR per video_id (atomic, sub-microsecond). Batch flush to PostgreSQL every 5-10 minutes via background job. For display: serve from Redis (within 5-10s eventual consistency is fine for view count)." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-youtube-a-system-design-interview-question/"
    },
    {
      id: "case-amazon",
      title: "Design Amazon E-Commerce",
      category: "E-Commerce",
      level: "Advanced",
      scale: "300M customers, 350M products, Black Friday: 50k orders/minute, $1.4T GMV/year",
      clarify: "Product catalog, search, cart, checkout, payment, inventory, order fulfillment, notifications? Warehouse/logistics? Seller marketplace? Recommendation engine?",
      components: "Product Catalog Service (Elasticsearch for search + DynamoDB for catalog) → Inventory Service (distributed locks for stock reservation) → Cart Service (Redis, TTL 30 days) → Order Service (PostgreSQL + Kafka) → Payment Service (SAGA pattern) → Warehouse Management System → Notification Service",
      bottleneck: "Inventory reservation during flash sales (concurrent buyers for last unit). Product search across 350M items. Cart persistence across sessions. SAGA for order → payment → inventory → fulfillment chain.",
      deepDive: [
        { q: "How do you prevent overselling the last unit of inventory?", a: "Optimistic locking: inventory table has version column. UPDATE inventory SET stock=stock-1, version=version+1 WHERE product_id=X AND stock>0 AND version=V. If rows_updated=0: someone else bought it (version changed or stock=0). Retry or show 'out of stock'. For flash sales: pre-allocate tokens in Redis. 1000 units = 1000 Redis slots. Atomic DECR. When 0: reject all subsequent requests without hitting DB." },
        { q: "How does Amazon handle product search across 350M items?", a: "Elasticsearch with sharding by category. Custom relevance scoring: sales rank, review rating, Prime eligibility, sponsored products, personalization. A9 algorithm (Amazon's search ranking). Faceted search: price range, brand, rating, delivery speed. Autocomplete: Redis sorted set with prefix scoring, updated every hour from search query logs. Search results pre-computed for top 10k queries per category." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-amazon-a-system-design-interview-question/"
    },
    {
      id: "case-paytm",
      title: "Design Paytm / UPI Payment System",
      category: "FinTech",
      level: "Advanced",
      scale: "350M users, 1.4B UPI transactions/month, peak 4000 TPS during festive",
      clarify: "P2P transfers? Merchant payments? Bill payments? Wallet vs direct bank? Transaction limits (₹1L/day UPI)? Refunds? Dispute resolution? Regulatory compliance (RBI)?",
      components: "Payment Gateway → UPI Switch (NPCI integration) → Transaction Service (idempotency) → Ledger Service (double-entry bookkeeping in PostgreSQL) → Fraud Detection Service (ML, real-time) → Notification Service → Reconciliation Service",
      bottleneck: "Idempotency (prevent double debit). NPCI UPI switch latency. Fraud detection in < 200ms before transaction confirmation. Ledger consistency across distributed services.",
      deepDive: [
        { q: "How do you prevent double-charging in a UPI payment?", a: "Idempotency-Key header = UUID4 generated by client at payment initiation. Transaction Service stores (idempotency_key, status, response) in DB with unique constraint. On duplicate request: return cached response immediately (same 200 or 400 as original). Additional: Redis deduplication check for fast path (check before DB). NPCI UPI has its own deduplication via RRN (Reference Reference Number)." },
        { q: "How does real-time fraud detection work without adding latency?", a: "ML model inference must complete in < 50ms. Features: transaction amount vs historical average (Zscore), velocity (how many transactions in last 10 min), geolocation anomaly, device fingerprint. Feature store (Redis): pre-computed features per user, updated in near-real-time by separate Kafka consumer. Model served via dedicated ML inference service (TensorFlow Serving). Rules engine for fast simple rules (> ₹50k first transaction → flag). Parallel to main payment flow — can block or allow with risk score." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-of-paytm-payment-gateway-and-wallet/"
    },
    {
      id: "case-search-engine",
      title: "Design a Web Search Engine (Google-like)",
      category: "Search",
      level: "Expert",
      scale: "8.5B searches/day, 130 trillion web pages indexed, < 100ms response",
      clarify: "Web crawling depth? Result ranking (PageRank + ML)? Index freshness (real-time news vs static pages)? Personalization? Geographic results? Image/video results?",
      components: "Web Crawler (Politeness: robots.txt, rate limiting per domain) → URL Frontier (BFS queue, Redis + HBase for visited set) → Document Store (raw HTML in S3/Bigtable) → Indexer (tokenize → inverted index) → PageRank (distributed MapReduce/Spark) → Query Processor → Ranking Model (ML, BERT) → Serving Layer",
      bottleneck: "Crawling 130T pages efficiently. Inverted index size (petabytes). Near-duplicate page detection (SimHash). Index freshness vs computation cost trade-off.",
      deepDive: [
        { q: "How does a web crawler scale to crawl 130 trillion pages?", a: "Distributed crawler: thousands of machines, each handling a partition of the URL frontier (frontier = priority queue of unvisited URLs, partitioned by domain hash). Politeness: max 1 request/second per domain. BFS-like traversal but prioritized by PageRank estimate, freshness, and importance. Visited URL set stored in HBase (100B+ entries). Re-crawl schedule: high-traffic news sites every hour, static pages monthly." },
        { q: "How does the inverted index work at web scale?", a: "Inverted index: word → posting list (sorted list of doc_ids containing that word, with term frequency and position). Stored in SSTable format (sorted, immutable). Sharded: hash of word determines which shard holds its posting list. Merge at query time: AND query intersects posting lists (most selective term first to prune early). Tiered index: hot (frequent queries) in RAM, cold (rare queries) on SSD." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-google-search-a-system-design-interview-question/"
    },
    {
      id: "case-slack",
      title: "Design Slack / Team Messaging",
      category: "Messaging",
      level: "Core",
      scale: "20M DAU, 5B messages/day, 750k organizations, 2k+ app integrations",
      clarify: "Workspaces (multi-tenant isolation)? Channels (public/private/DM)? Threading? Search? File sharing? App integrations (webhooks, slash commands)? Message edit/delete history?",
      components: "WebSocket Gateway (connection maintained per client) → Channel Service → Message Service (Cassandra: workspace_id + channel_id + message_id clustering) → Search Service (Elasticsearch per workspace) → Notification Service → App Integration Platform (webhook delivery, OAuth)",
      bottleneck: "Multi-tenant isolation (workspace_id must be first partition key everywhere). Message search across millions of channels. @channel notifications fan-out to all channel members. File upload bandwidth.",
      deepDive: [
        { q: "How does Slack handle multi-tenant data isolation?", a: "Schema design: every table has workspace_id as the first column in the primary key / partition key. This ensures: Cassandra partitions data by workspace (no cross-workspace hotspots). Query performance: all workspace data co-located. Data deletion on workspace cancellation: delete by workspace_id partition (fast). Elasticsearch: separate index per workspace (allows per-workspace quota, retention policies)." },
        { q: "How do you deliver messages to 50k channel members instantly?", a: "#general channel with 50k members: fan-out via Redis Pub/Sub (gateway subscribes to channel topic, Pub/Sub broadcasts to all subscribed gateways). Each gateway delivers to its connected members. For offline users: store in notification table, send FCM/APNs push. Large channels use async fan-out — some members receive message with 1-2 second delay (acceptable for channel broadcast vs DM)." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-slack-system-design-slack/"
    },
    {
      id: "case-notification-system",
      title: "Design a Notification System (10M Users)",
      category: "Infrastructure",
      level: "Core",
      scale: "10M users, 50M notifications/day, sub-second for push/FCM, eventual for email",
      clarify: "Push (FCM/APNs), Email, SMS, WhatsApp, In-App? Priority levels? User preference/opt-out? Deduplication? Scheduling future notifications? Delivery receipts?",
      components: "Notification API → Notification Router (reads user preferences) → Priority Queue per channel (Kafka topics: push-high, push-normal, email, sms) → Channel Workers (Push Worker → FCM/APNs, Email Worker → SendGrid, SMS Worker → Twilio) → Delivery Tracking (MongoDB: notification_id, status, retry_count) → DLQ for permanent failures",
      bottleneck: "FCM/APNs rate limits per app. Email deliverability (SPF/DKIM/DMARC). SMS cost at scale. Deduplication to prevent user from getting same notification 10 times due to upstream retry storm.",
      deepDive: [
        { q: "How do you design the notification routing to respect user preferences?", a: "User preference table: (user_id, channel, notification_type, enabled, quiet_hours_start, quiet_hours_end). On each notification request: load user preferences from cache (Redis TTL 5min). Filter channels: only send via enabled channels. Check quiet hours: if in quiet hours, schedule notification for after quiet_hours_end (delayed queue with Redis ZADD using timestamp as score). Route to appropriate Kafka topic per channel." },
        { q: "How do you prevent duplicate notifications?", a: "Deduplication key: (notification_type, entity_id, user_id, window). Example: for 'order shipped' notification, dedup key = ('order_shipped', order_123, user_456, 'today'). Check Redis SET NX with TTL before publishing. If key exists: suppress notification. If not: set key, publish notification. Idempotency-Key also passed to FCM/SendGrid — they deduplicate at their level too." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-notification-system/"
    },
    {
      id: "case-distributed-cache",
      title: "Design a Distributed Cache (Redis-like)",
      category: "Infrastructure",
      level: "Advanced",
      scale: "1M operations/second, < 1ms p99 latency, 100TB total cache size",
      clarify: "In-memory only or persistent? Eviction policies? Replication? Cluster vs standalone? Key expiry? Pub/Sub support?",
      components: "Cache Cluster (sharded by consistent hashing) → Gossip Protocol (cluster membership, node discovery) → WAL (Write-Ahead Log for persistence) → Master-Replica replication (async) → Client Library (connection pooling, retry, key routing) → Monitoring (memory usage, hit rate, latency percentiles)",
      bottleneck: "Memory management (jemalloc). Single-threaded event loop limits throughput per core (Redis solution: cluster mode + multiple instances). Consistent hashing for minimal key remapping on node join/leave.",
      deepDive: [
        { q: "Why is Redis single-threaded and how does it achieve high throughput?", a: "Redis event loop (libevent-based) handles commands sequentially — no lock contention (every operation is already atomic). Single thread at 100k+ ops/sec because: all data in RAM (no disk I/O blocking), epoll/kqueue I/O multiplexing (one thread handles thousands of connections via OS event notifications), simple operations (INCR is 10 CPU instructions). Redis 6.0 added I/O threads for network reading/writing (still single threaded for command execution)." },
        { q: "How does the LRU eviction work in Redis?", a: "Redis doesn't scan all keys for LRU (too expensive). Approximated LRU: on each write when memory is full, randomly sample 16 keys, evict the one with oldest last-access time (stored in object header as Unix timestamp, granularity 10s). Result: approximates true LRU at O(1) cost. allkeys-lru: evict any key. volatile-lru: only evict keys with TTL set." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-a-distributed-cache-system/"
    },
    {
      id: "case-typeahead",
      title: "Design Typeahead / Search Autocomplete",
      category: "Search",
      level: "Core",
      scale: "10B searches/day, autocomplete in < 100ms, personalized suggestions",
      clarify: "Top-K results? Personalized vs global? Multiple languages? Fuzzy matching (typo tolerance)? Trending queries? Safe search filtering?",
      components: "Query Service → Trie (prefix tree) or Redis sorted set (ZRANGEBYLEX) → Aggregation Service (stream query logs → count per prefix → update trie) → Kafka (query log stream) → Spark batch job (nightly recompute global top-K per prefix) → Personalization Layer (user's recent searches blend with global top-K)",
      bottleneck: "Trie stored in memory — sharded by prefix character. Nightly recompute vs real-time updates for trending topics. Read:write ratio overwhelmingly read-heavy (10B queries vs much fewer distinct prefixes).",
      deepDive: [
        { q: "How do you implement autocomplete in < 100ms at 10B searches/day?", a: "Pre-computed top-K suggestions per prefix stored in Redis sorted set: key='sea', members=[{score:search_count, member:'search engine'}, ...]. ZREVRANGEBYSCORE returns top 5 instantly. Cache hit = O(log N). Each keystroke = separate API call to autocomplete service. Request coalesced: debounce 100ms (don't fire on every keystroke). CDN edge caching: top 10,000 common prefixes cached at edge (English 'th' → suggestions cached globally)." },
        { q: "How do you keep suggestions fresh with real-time trending?", a: "Kafka: every search query published as event. Count-Min Sketch: approximate frequency count per prefix in real-time (sub-second). Hourly Spark job: recompute top-K from exact counts in Hadoop. Redis atomic update: ZADD NX (add new, don't update if already higher score) — prevents flash viral query from permanently overriding historical frequency." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-a-typeahead-search-or-autocomplete-system/"
    },
    {
      id: "case-zepto",
      title: "Design Zepto / 10-Minute Quick Commerce",
      category: "Quick Commerce",
      level: "Advanced",
      scale: "1M orders/day, delivery in 10 minutes, dark stores 1-3km from user, India focus",
      clarify: "Hyperlocal delivery radius? Dark store inventory management? Real-time stock visibility? Multiple riders assignment? ETA accuracy? Surge pricing? COD support?",
      components: "User App → API Gateway → Product Catalog Service (inventory per dark store, varies by location) → Cart Service → Order Service → Inventory Service (pessimistic locking per dark store) → Rider Assignment Service (geospatial) → Dark Store WMS (Warehouse Management System) → Payment Service",
      bottleneck: "Inventory per dark store (not global): 3km radius means only showing products available in YOUR nearest dark store. Sub-second rider assignment. Handling out-of-stock after order placed (substitute item or cancel line item with refund).",
      deepDive: [
        { q: "How do you show accurate inventory specific to the user's nearest dark store?", a: "Geolocation → nearest dark store mapping at session start. All subsequent catalog API calls include dark_store_id. Inventory service maintains per-dark-store SKU counts in Redis (fast reads). User sees product with stock > 0 in their dark store only. Stock reservation: pessimistic lock on dark_store_id+sku_id row in PostgreSQL (SELECT FOR UPDATE) during checkout. Batch inventory updates from dark store WMS every 30 seconds." },
        { q: "How do you guarantee 10-minute delivery consistently?", a: "P2P time budget: Order accepted (0s) → picker receives notification (5s) → picking starts (<2min) → packed (< 3min) → rider picks up (< 5min from order) → delivers (remaining 5min = within 3km at ~30kmph = 6min max). SLA monitoring: alert if any dark store breaches P90 of any stage. Predictive throttling: if dark store picker queue too deep → temporarily pause new orders from that store." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/system-design-of-zomato/"
    },
    {
      id: "case-zoom",
      title: "Design Zoom / Video Conferencing",
      category: "Real-Time Media",
      level: "Expert",
      scale: "300M meeting participants/day, peak 300M concurrent in 2020, 500ms latency target",
      clarify: "Max participants per call? Recording? Screen sharing? Breakout rooms? Background blur (ML on device)? Closed captions (real-time speech-to-text)? Security (end-to-end encryption)?",
      components: "WebRTC Signaling Server (SDP offer/answer, ICE candidates) → TURN/STUN Servers (NAT traversal) → SFU (Selective Forwarding Unit — receive all streams, forward only subscribed ones) → MCU for recording (Multipoint Control Unit — mix all streams) → Media Gateway → Kafka (recording pipeline)",
      bottleneck: "NAT traversal (80% of internet behind NAT). Video codec (VP8/VP9/AV1) and bitrate adaptation. Jitter buffer and packet loss concealment. Recording mixing (CPU intensive). End-to-end encryption with > 2 participants (key distribution).",
      deepDive: [
        { q: "What's the difference between SFU and MCU in video conferencing?", a: "MCU (Multipoint Control Unit): server mixes all video streams into a single composite stream → each participant receives one mixed stream. Pros: simple client, low client bandwidth. Cons: very high server CPU (real-time video mixing × N participants). SFU (Selective Forwarding Unit): server forwards individual streams without mixing → each participant receives N separate streams, client mixes/renders. Pros: much lower server CPU. Cons: higher client bandwidth (N streams). Zoom uses SFU for live calls. MCU for recording." },
        { q: "How does WebRTC handle peer connection through NAT?", a: "STUN server: client discovers its public IP:port (needed to share with remote peer). ICE: try direct peer-to-peer connection first (UDP). If blocked by symmetric NAT: fall back to TURN relay server (all media proxied through Zoom's TURN servers — adds latency but ensures connectivity). TURN bandwidth cost = 2× all media traffic. Zoom: 80%+ connections use direct P2P or STUN, only ~15% need TURN relay." }
      ],
      gfgLink: "https://www.geeksforgeeks.org/system-design/design-video-conferencing-system/"
    }
  ],

  // =========================================================================
  // CLOUD MATRIX (expanded to 20 rows)
  // =========================================================================
  cloudMatrix: [
    { concept: "Virtual Machines", aws: "EC2", azure: "Azure VMs", gcp: "Compute Engine (GCE)", useCase: "Full OS control, legacy lift-and-shift, custom software, ML training nodes.", learnMore: "https://aws.amazon.com/ec2/" },
    { concept: "Containers (Managed K8s)", aws: "EKS (Elastic K8s Service)", azure: "AKS (Azure K8s Service)", gcp: "GKE (Google K8s Engine)", useCase: "Deploy containerized microservices with auto-scaling and self-healing. GKE is the most mature (Google invented K8s).", learnMore: "https://kubernetes.io/docs/concepts/overview/" },
    { concept: "Serverless Compute (FaaS)", aws: "Lambda", azure: "Azure Functions", gcp: "Cloud Functions / Cloud Run", useCase: "Event-driven, pay-per-invocation, auto-scales to zero. Cloud Run: containerized serverless (more flexible than Lambda).", learnMore: "https://aws.amazon.com/lambda/" },
    { concept: "Serverless Containers", aws: "ECS Fargate", azure: "Azure Container Apps", gcp: "Cloud Run", useCase: "Run containers without managing cluster nodes. Middle ground between K8s complexity and Lambda limits.", learnMore: "https://aws.amazon.com/fargate/" },
    { concept: "Managed SQL (PostgreSQL/MySQL)", aws: "RDS / Aurora", azure: "Azure SQL Database", gcp: "Cloud SQL / Spanner", useCase: "Managed relational DB with automated backups, read replicas, failover. Aurora: 5× faster than standard MySQL.", learnMore: "https://aws.amazon.com/rds/" },
    { concept: "Managed NoSQL (Key-Value)", aws: "DynamoDB", azure: "Cosmos DB", gcp: "Firestore / Bigtable", useCase: "Low-latency global KV/document store. DynamoDB: single-digit millisecond. Cosmos DB: multi-model. Bigtable: HBase-compatible, great for time-series.", learnMore: "https://aws.amazon.com/dynamodb/" },
    { concept: "Object Storage (Blob)", aws: "S3", azure: "Blob Storage", gcp: "Cloud Storage (GCS)", useCase: "Store unlimited files, images, video, backups. 11 nines durability. Serve via CDN for public assets.", learnMore: "https://aws.amazon.com/s3/" },
    { concept: "Block Storage (Disk)", aws: "EBS (Elastic Block Store)", azure: "Azure Managed Disks", gcp: "Persistent Disk", useCase: "Low-latency persistent disk for databases and EC2 instances. Not shareable across instances (unlike EFS/NFS).", learnMore: "https://aws.amazon.com/ebs/" },
    { concept: "Shared File Storage (NFS)", aws: "EFS (Elastic File System)", azure: "Azure Files", gcp: "Filestore", useCase: "NFS shared across multiple EC2/compute instances. For shared application state, CMS media, shared ML datasets.", learnMore: "https://aws.amazon.com/efs/" },
    { concept: "CDN", aws: "CloudFront", azure: "Azure Front Door / CDN", gcp: "Cloud CDN", useCase: "Edge caching at 400+ PoPs globally. CloudFront: tightest S3+Lambda@Edge integration. Cloudflare is vendor-agnostic alternative.", learnMore: "https://aws.amazon.com/cloudfront/" },
    { concept: "L7 Load Balancer (HTTP)", aws: "ALB (Application LB)", azure: "Application Gateway", gcp: "Cloud Load Balancing (HTTP/S)", useCase: "Path-based routing, SSL termination, host-based routing, WebSocket support. ALB natively integrates with ECS, Lambda.", learnMore: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/" },
    { concept: "L4 Load Balancer (TCP/UDP)", aws: "NLB (Network LB)", azure: "Azure Load Balancer", gcp: "Cloud Load Balancing (TCP/UDP)", useCase: "Ultra-low latency TCP/UDP load balancing. Static IP support. Use for non-HTTP protocols, gaming, IoT.", learnMore: "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/" },
    { concept: "Message Queue (SQS-type)", aws: "SQS", azure: "Service Bus (Queue)", gcp: "Cloud Tasks", useCase: "Async task decoupling, background job buffering. SQS FIFO: exactly-once processing. Standard: at-least-once, higher throughput.", learnMore: "https://aws.amazon.com/sqs/" },
    { concept: "Event Streaming (Kafka-type)", aws: "Kinesis / MSK (managed Kafka)", azure: "Event Hubs (Kafka-compatible)", gcp: "Pub/Sub", useCase: "High-throughput real-time event streaming. MSK: fully managed Apache Kafka. Kinesis: AWS-native, simpler setup, 7-day retention default.", learnMore: "https://aws.amazon.com/kinesis/" },
    { concept: "In-Memory Cache (Redis)", aws: "ElastiCache for Redis", azure: "Azure Cache for Redis", gcp: "Memorystore for Redis", useCase: "Managed Redis with cluster mode, automatic failover, backup. ElastiCache: deep AWS VPC integration, no egress fees for EC2→ElastiCache.", learnMore: "https://aws.amazon.com/elasticache/" },
    { concept: "DNS & Traffic Routing", aws: "Route 53", azure: "Azure DNS + Traffic Manager", gcp: "Cloud DNS + Cloud Load Balancing", useCase: "Domain management, GeoDNS, latency-based routing, weighted routing for canary deploys, health-check based failover.", learnMore: "https://aws.amazon.com/route53/" },
    { concept: "Secrets Management", aws: "Secrets Manager + SSM Parameter Store", azure: "Azure Key Vault", gcp: "Secret Manager", useCase: "Secure storage, automatic rotation of DB passwords, API keys. Secrets Manager: auto-rotation built-in. SSM: cheaper, for simple configs.", learnMore: "https://aws.amazon.com/secrets-manager/" },
    { concept: "Monitoring & Observability", aws: "CloudWatch + X-Ray (traces)", azure: "Azure Monitor + App Insights", gcp: "Cloud Monitoring + Cloud Trace", useCase: "Metrics, logs, distributed traces, dashboards, alerting. Use with OpenTelemetry SDK for vendor-agnostic instrumentation.", learnMore: "https://aws.amazon.com/cloudwatch/" },
    { concept: "Container Image Registry", aws: "ECR (Elastic Container Registry)", azure: "ACR (Azure Container Registry)", gcp: "Artifact Registry / GCR", useCase: "Private Docker image storage. ECR: geo-replicated, IAM-integrated, image scanning for CVEs. Pull images from ECR into EKS/ECS.", learnMore: "https://aws.amazon.com/ecr/" },
    { concept: "Infrastructure as Code", aws: "CloudFormation / AWS CDK", azure: "Bicep / ARM Templates", gcp: "Deployment Manager / Terraform", useCase: "Terraform is cloud-agnostic standard (use for multi-cloud). CDK: define AWS infra in TypeScript/Python. Infrastructure versioned in Git = GitOps.", learnMore: "https://developer.hashicorp.com/terraform/docs" }
  ],

  // =========================================================================
  // TECH DECISION TABLE (40 rows, expanded)
  // =========================================================================
  decisionTable: [
    { problem: "Web UI (SPA)", primary: "React", alternative: "Vue.js", avoid: "Microfrontends for team < 10 engineers", learnMore: "https://react.dev/" },
    { problem: "SEO-critical public web app", primary: "Next.js (SSR/SSG)", alternative: "Remix / Nuxt", avoid: "Pure client-side SPA with empty HTML shell (Google struggles to index)", learnMore: "https://nextjs.org/docs" },
    { problem: "Cross-platform mobile", primary: "Flutter (Dart, single codebase)", alternative: "React Native", avoid: "Cordova/Ionic webview for performance-sensitive screens", learnMore: "https://flutter.dev/docs" },
    { problem: "Public REST API backend", primary: "Node.js + Express (JS ecosystem) / FastAPI (Python, auto-docs)", alternative: "Go (high concurrency), NestJS (enterprise Node)", avoid: "50 microservices on day 1 with 3 engineers", learnMore: "https://fastapi.tiangolo.com/" },
    { problem: "Enterprise Java backend", primary: "Spring Boot", alternative: "Quarkus (lighter, GraalVM native image)", avoid: "Plain Java Servlets in 2024", learnMore: "https://spring.io/projects/spring-boot" },
    { problem: "Relational / financial data", primary: "PostgreSQL", alternative: "MySQL / CockroachDB (distributed)", avoid: "MongoDB for multi-table ACID bank transactions", learnMore: "https://www.postgresql.org/docs/" },
    { problem: "Flexible document data", primary: "MongoDB Atlas", alternative: "PostgreSQL JSONB column", avoid: "Complex JOIN queries across MongoDB collections", learnMore: "https://www.mongodb.com/docs/" },
    { problem: "Massive write-heavy time-series", primary: "Apache Cassandra / ScyllaDB", alternative: "TimescaleDB (Postgres extension for time-series)", avoid: "Sharding PostgreSQL before considering Cassandra", learnMore: "https://cassandra.apache.org/" },
    { problem: "Session & rate limiting state", primary: "Redis Cluster", alternative: "Memcached (simpler, no persistence)", avoid: "Storing sessions in PostgreSQL (slow, scaling problem)", learnMore: "https://redis.io/docs/" },
    { problem: "Full-text product/content search", primary: "Elasticsearch / OpenSearch", alternative: "Typesense (simpler ops), Algolia (managed)", avoid: "LIKE '%query%' on 50M-row SQL table", learnMore: "https://www.elastic.co/guide/en/elasticsearch/reference/current/" },
    { problem: "Two-way real-time (chat, games)", primary: "WebSockets", alternative: "gRPC bi-directional streaming (for backend services)", avoid: "500ms HTTP polling loop burning server connections", learnMore: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
    { problem: "Server → client live updates", primary: "Server-Sent Events (SSE)", alternative: "WebSockets (if you later need bidirectional)", avoid: "Heavy WS connection for one-directional feed updates", learnMore: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" },
    { problem: "Background async tasks", primary: "AWS SQS + worker Lambda/ECS", alternative: "Redis BullMQ (Node.js), Celery (Python)", avoid: "Blocking synchronous HTTP call for 30s PDF generation", learnMore: "https://aws.amazon.com/sqs/" },
    { problem: "High-throughput event stream", primary: "Apache Kafka / Redpanda", alternative: "AWS Kinesis (simpler setup, less operational burden)", avoid: "Kafka for simple 5 msg/sec background jobs", learnMore: "https://kafka.apache.org/documentation/" },
    { problem: "File / image / video storage", primary: "AWS S3 / GCS / Azure Blob", alternative: "Cloudflare R2 (zero egress), MinIO (self-hosted)", avoid: "Storing 500MB video BLOBs directly in PostgreSQL", learnMore: "https://aws.amazon.com/s3/" },
    { problem: "Global static content delivery", primary: "Cloudflare CDN (with WAF)", alternative: "AWS CloudFront + S3", avoid: "Hitting origin server for every CSS/JS/image request globally", learnMore: "https://developers.cloudflare.com/cache/" },
    { problem: "Container packaging", primary: "Docker with multi-stage build", alternative: "Podman (daemonless)", avoid: "Deploying raw zip files to unmanaged VMs in production", learnMore: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" },
    { problem: "Container orchestration at scale", primary: "Kubernetes (EKS/GKE/AKS)", alternative: "AWS ECS Fargate (simpler, serverless containers)", avoid: "K8s cluster for 3-person startup with 1k users", learnMore: "https://kubernetes.io/docs/concepts/" },
    { problem: "DB read scaling", primary: "Read replicas + Redis cache layer", alternative: "PgBouncer connection pooling", avoid: "DB sharding before exhausting read replicas and caching", learnMore: "https://aws.amazon.com/rds/features/read-replicas/" },
    { problem: "Infrastructure provisioning", primary: "Terraform (cloud-agnostic IaC)", alternative: "AWS CDK (TypeScript/Python, AWS-only)", avoid: "Manually clicking in AWS Console for production infrastructure", learnMore: "https://developer.hashicorp.com/terraform/docs" },
    { problem: "Secrets & credentials", primary: "AWS Secrets Manager / HashiCorp Vault", alternative: "Doppler / Infisical (developer-friendly)", avoid: "Committing API keys to GitHub repository 💀", learnMore: "https://developer.hashicorp.com/vault/docs" },
    { problem: "User authentication (web)", primary: "Session + HttpOnly SameSite cookie + Redis session store", alternative: "JWT (access token 15min TTL + refresh token rotation)", avoid: "Long-lived JWT (1 year) with no revocation strategy", learnMore: "https://owasp.org/www-community/attacks/Session_hijacking_attack" },
    { problem: "User authentication (mobile API)", primary: "JWT with short TTL + refresh tokens in secure storage", alternative: "Opaque tokens + database validation", avoid: "Storing JWT in localStorage (XSS vulnerable)", learnMore: "https://jwt.io/introduction" },
    { problem: "Third-party login (Google/GitHub)", primary: "OAuth2 / OIDC (Auth0, Keycloak, Cognito)", alternative: "Supabase Auth / Firebase Auth (BaaS)", avoid: "Building custom OAuth2 provider from scratch", learnMore: "https://auth0.com/docs" },
    { problem: "Authorization (who can do what)", primary: "RBAC (Role-Based Access Control)", alternative: "ABAC (Attribute-Based) for fine-grained policies", avoid: "No authorization layer — all users access all data", learnMore: "https://www.ory.sh/docs/keto/concepts/permission-and-roles" },
    { problem: "API rate limiting", primary: "Token Bucket in Redis (per user+endpoint)", alternative: "Cloudflare Rate Limiting Rules (edge, before origin)", avoid: "Unlimited public endpoints with no throttling at all", learnMore: "https://redis.io/glossary/rate-limiting/" },
    { problem: "Cascade failure prevention", primary: "Circuit Breaker (Resilience4j / Polly)", alternative: "Bulkhead pattern + timeout", avoid: "Infinite synchronous retry without backoff (amplifies failures)", learnMore: "https://resilience4j.readme.io/" },
    { problem: "Distributed transactions", primary: "SAGA Pattern (orchestration)", alternative: "SAGA Choreography for simpler flows", avoid: "Two-Phase Commit (2PC) across microservices — blocking, coordinator SPOF", learnMore: "https://microservices.io/patterns/data/saga.html" },
    { problem: "Payment idempotency", primary: "Idempotency-Key header stored in DB/Redis", alternative: "Request fingerprinting + dedup window", avoid: "Assuming 'users won't double-click Pay' 💀", learnMore: "https://stripe.com/blog/idempotency" },
    { problem: "Observability stack", primary: "OpenTelemetry SDK → Prometheus (metrics) + Jaeger (traces) + ELK (logs)", alternative: "DataDog / New Relic (managed, expensive but turnkey)", avoid: "console.log() + SSH grep as production debugging strategy", learnMore: "https://opentelemetry.io/docs/" },
    { problem: "Zero-downtime DB schema migration", primary: "Expand-Contract pattern (backward-compatible migrations)", alternative: "Blue-Green database deployment", avoid: "ALTER TABLE on 100M-row table during peak hours (full table lock)", learnMore: "https://martinfowler.com/bliki/ParallelChange.html" },
    { problem: "Deployment strategy (zero downtime)", primary: "Blue-Green deployment (instant rollback)", alternative: "Canary deployment (gradual traffic shift with monitoring)", avoid: "SSH into production server + git pull + restart 💀", learnMore: "https://martinfowler.com/bliki/BlueGreenDeployment.html" },
    { problem: "Testing API contracts between services", primary: "Consumer-Driven Contract Tests (Pact)", alternative: "OpenAPI schema validation in CI", avoid: "No contract testing — breaking changes discovered in production", learnMore: "https://docs.pact.io/" },
    { problem: "E2E browser testing", primary: "Playwright (modern, fast, auto-wait)", alternative: "Cypress (developer-friendly, DOM testing)", avoid: "100% Selenium coverage with zero unit/integration tests", learnMore: "https://playwright.dev/docs/intro" },
    { problem: "Real-time proximity search", primary: "Redis GEOADD + GEORADIUS (O(N+log M))", alternative: "PostGIS ST_DWithin (PostgreSQL)", avoid: "Fetching all records and filtering lat/long in application code", learnMore: "https://redis.io/docs/latest/commands/georadius/" },
    { problem: "Recommendation engine", primary: "Collaborative Filtering + Graph DB for social recommendations", alternative: "Elasticsearch k-NN search for content similarity", avoid: "SQL query 'users who bought X also bought Y' at millions of products", learnMore: "https://www.tensorflow.org/recommenders" },
    { problem: "Social feed (read-heavy)", primary: "Fan-out on Write (push to Redis sorted set per user)", alternative: "Hybrid: push for normal users, pull for celebrities at read time", avoid: "Pull all followed-user posts and JOIN at read time", learnMore: "https://www.infoq.com/presentations/Twitter-Timeline-Scalability/" },
    { problem: "Offline-first mobile app", primary: "SQLite locally + background sync (conflict resolution)", alternative: "PouchDB / WatermelonDB (cross-platform local DB)", avoid: "No local storage — app unusable without internet", learnMore: "https://www.sqlite.org/docs.html" },
    { problem: "GraphQL N+1 query problem", primary: "DataLoader (batch + cache per request)", alternative: "Join Monster for SQL-backed GraphQL", avoid: "Naive resolver executing N DB queries for N parent objects", learnMore: "https://github.com/graphql/dataloader" },
    { problem: "Multi-tenant SaaS data isolation", primary: "Row-Level Security (PostgreSQL) — all tenants in shared DB", alternative: "Schema-per-tenant or DB-per-tenant (stronger isolation, higher cost)", avoid: "Application-level WHERE tenant_id=X filtering without RLS (bug risk)", learnMore: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html" }
  ],

  // =========================================================================
  // TESTING TYPES (12 types with study resources)
  // =========================================================================
  testingTypes: [
    {
      type: "Unit Testing", what: "Tests individual functions and classes in isolation with all dependencies mocked.", when: "Every function containing business logic. Aim for 80%+ branch coverage of domain code.", tools: "Jest, Vitest, pytest, JUnit 5, Mockito, Go testing, NUnit",
      resources: [
        { label: "Jest Docs", url: "https://jestjs.io/docs/getting-started", type: "doc" },
        { label: "pytest Getting Started", url: "https://docs.pytest.org/en/stable/getting-started.html", type: "doc" }
      ]
    },
    {
      type: "Integration Testing", what: "Tests interaction between your code and real external systems: actual DB, cache, message queue.", when: "All API endpoints, DB repository layer, message queue consumers. Use Testcontainers for disposable Docker-based DB.", tools: "Testcontainers, Supertest (Node.js), pytest with real DB, Spring Boot Test, RestAssured",
      resources: [
        { label: "Testcontainers Docs", url: "https://testcontainers.com/guides/getting-started/", type: "doc" },
        { label: "Supertest (Node.js HTTP testing)", url: "https://github.com/ladjs/supertest", type: "code" }
      ]
    },
    {
      type: "API / Contract Testing", what: "Validates API responses match their documented contract (OpenAPI spec, Protobuf). Consumer-driven: consumer defines expectations, provider must satisfy them.", when: "Before any service deployment that other teams consume. Critical in microservices.", tools: "Pact, Postman/Newman, Dredd, Schemathesis, Hurl",
      resources: [
        { label: "Pact: Consumer-Driven Contract Testing", url: "https://docs.pact.io/", type: "doc" },
        { label: "Postman Newman Docs", url: "https://learning.postman.com/docs/collections/using-newman-cli/", type: "doc" }
      ]
    },
    {
      type: "End-to-End (E2E) Testing", what: "Simulates real user journeys in a headless browser: login → search → add to cart → checkout → payment confirmation.", when: "Critical user flows only (3-5 flows maximum — slow to write and maintain). Run in pre-production.", tools: "Playwright (recommended: fast, auto-wait, multi-browser), Cypress, Selenium, Puppeteer",
      resources: [
        { label: "Playwright Docs", url: "https://playwright.dev/docs/intro", type: "doc" },
        { label: "Cypress Documentation", url: "https://docs.cypress.io/", type: "doc" }
      ]
    },
    {
      type: "Load Testing", what: "Validates system maintains target performance (< 200ms p99, < 0.1% error rate) at expected peak QPS sustained for 30+ minutes.", when: "Before every major feature launch, quarterly capacity reviews, before planned traffic spikes.", tools: "k6 (scripting in JS, open-source, excellent CI integration), Apache JMeter, Locust (Python), Gatling",
      resources: [
        { label: "k6 Documentation", url: "https://grafana.com/docs/k6/latest/", type: "doc" },
        { label: "Apache JMeter User Manual", url: "https://jmeter.apache.org/usermanual/", type: "doc" }
      ]
    },
    {
      type: "Stress Testing", what: "Drives system beyond design capacity to find exact breaking points, failure modes, and recovery behavior. Answers: 'At what QPS do we start dropping requests?'", when: "Before major events (IPL, Black Friday, product launch). After major architectural changes.", tools: "k6 (ramp up script), Locust, AWS Load Testing Solution, Artillery",
      resources: [
        { label: "k6: Stress Testing Guide", url: "https://grafana.com/docs/k6/latest/testing-guides/test-types/stress-testing/", type: "doc" }
      ]
    },
    {
      type: "Soak / Endurance Testing", what: "Runs moderate load for 24-72 hours to detect memory leaks (heap growth over time), connection pool exhaustion, disk space filling, and gradual performance degradation.", when: "Before any service that will run for months without restart. New services with complex state management.", tools: "k6 with long duration, JMeter with long test plan, Grafana monitoring during test",
      resources: [
        { label: "k6: Soak Testing", url: "https://grafana.com/docs/k6/latest/testing-guides/test-types/soak-testing/", type: "doc" }
      ]
    },
    {
      type: "Security Testing (SAST + DAST)", what: "SAST (Static Application Security Testing): scans source code for vulnerabilities (SQL injection patterns, hardcoded secrets, known CVEs in dependencies). DAST (Dynamic): scans running application via simulated attacks.", when: "SAST: in every CI pipeline, block deploy on Critical/High findings. DAST: quarterly or before major releases.", tools: "Snyk (dependency CVEs), SonarQube (code quality + SAST), OWASP ZAP (DAST), Trivy (container scanning), Semgrep",
      resources: [
        { label: "OWASP ZAP: Web App Scanner", url: "https://www.zaproxy.org/", type: "doc" },
        { label: "Snyk: Dependency Security Scanning", url: "https://docs.snyk.io/", type: "doc" },
        { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "doc" }
      ]
    },
    {
      type: "Chaos / Resilience Testing", what: "Intentionally inject failures into production (with automated safeguards and monitoring) to find weaknesses before they cause real outages.", when: "After architecture changes. Quarterly game days for critical services. Mandatory for 99.99% SLA systems.", tools: "Netflix Chaos Monkey, AWS Fault Injection Simulator (FIS), Gremlin, Chaos Mesh (K8s), LitmusChaos",
      resources: [
        { label: "Netflix: Chaos Engineering Principles", url: "https://principlesofchaos.org/", type: "blog" },
        { label: "AWS Fault Injection Simulator", url: "https://aws.amazon.com/fis/", type: "doc" }
      ]
    },
    {
      type: "Performance Profiling", what: "Identifies CPU hotspots (which function consumes most CPU), memory allocation patterns, N+1 DB query problems, garbage collection pauses, and flame graph analysis.", when: "When p99 latency is degrading and load tests don't explain why. After releasing new code that 'should be' fast.", tools: "Pyroscope (continuous profiling), Node.js clinic.js, Go pprof, JVM Flight Recorder, async-profiler (Java)",
      resources: [
        { label: "Pyroscope: Continuous Profiling", url: "https://grafana.com/docs/pyroscope/latest/", type: "doc" },
        { label: "Go pprof profiling", url: "https://pkg.go.dev/runtime/pprof", type: "doc" }
      ]
    },
    {
      type: "Mutation Testing", what: "Verifies your test suite actually catches bugs by automatically introducing small code mutations (flipping < to >, removing if-conditions) and checking if tests fail. Low mutation score = weak tests.", when: "For critical business logic (payment calculations, pricing formulas, security checks). Quarterly audit.", tools: "PIT Mutation Testing (Java), Mutmut (Python), Stryker (JS/TS/C#)",
      resources: [
        { label: "Stryker Mutator: JavaScript/TypeScript Mutation Testing", url: "https://stryker-mutator.io/docs/stryker-js/getting-started/", type: "doc" }
      ]
    },
    {
      type: "A/B Testing / Feature Flags", what: "Controlled experiments routing percentage of traffic to different versions. Measure statistical significance of change on key business metrics (conversion, retention).", when: "Every major UI/UX change. New recommendation algorithm. Pricing change. Checkout flow optimization.", tools: "LaunchDarkly, AWS CloudWatch Evidently, Optimizely, Unleash (open-source), Statsig",
      resources: [
        { label: "LaunchDarkly: Feature Flags Docs", url: "https://docs.launchdarkly.com/", type: "doc" },
        { label: "Booking.com: Controlled Experiments at Scale", url: "https://booking.ai/", type: "blog" }
      ]
    }
  ],

  // =========================================================================
  // LLD PROBLEMS (expanded to 12)
  // =========================================================================
  lldProblems: [
    {
      id: "lld-parking", title: "Parking Lot System", level: "Foundation",
      classes: ["Vehicle (Car, Bike, Truck)", "ParkingSpot (Compact, Regular, Large, EV)", "ParkingFloor", "ParkingLot (Singleton)", "Ticket (entry_time, vehicle)", "PaymentStrategy (Cash, Card, UPI)", "FeeCalculator (hourly, flat)"],
      patterns: ["Strategy (PaymentStrategy, FeeCalculator)", "Factory (SpotFactory.findAvailable)", "Singleton (ParkingLot)", "Facade (ParkingLotFacade)"],
      concurrency: "ReentrantLock on spot assignment. AtomicInteger for available spot count. ConcurrentHashMap<SpotType, Queue<ParkingSpot>> for O(1) spot discovery per type.",
      tricky: "How to find nearest available spot efficiently? Per-floor priority queue sorted by spot number (Min-Heap). O(log N) instead of O(N) linear scan.",
      resources: [{ label: "Awesome-LLD: Parking Lot Solution", url: "https://github.com/ashishps1/awesome-low-level-design/tree/main/designs/parking-lot", type: "code" }]
    },
    {
      id: "lld-elevator", title: "Elevator Control System", level: "Foundation",
      classes: ["ElevatorCar (current_floor, direction, state, door)", "ElevatorController (manages all cars)", "Request (floor, direction: UP/DOWN)", "ElevatorState (IDLE, MOVING, DOOR_OPEN)", "Direction (UP, DOWN, IDLE)", "DispatchAlgorithm (LOOK, SCAN, SSTF)"],
      patterns: ["State Machine (ElevatorState transitions)", "Observer (floors observe controller events)", "Strategy (dispatch algorithm is swappable)", "Command (Button press as Command object)"],
      concurrency: "ConcurrentLinkedQueue for pending requests per car. Synchronized state transitions. Thread per elevator car running LOOK algorithm loop.",
      tricky: "LOOK algorithm: elevator moves in one direction until no more requests in that direction, then reverses. More efficient than SCAN (full sweep to end). Solves starvation better than SSTF (shortest-seek-time-first).",
      resources: [{ label: "Awesome-LLD: Elevator System", url: "https://github.com/ashishps1/awesome-low-level-design", type: "code" }]
    },
    {
      id: "lld-lru", title: "LRU Cache (O(1) All Operations)", level: "Foundation",
      classes: ["LRUCache (capacity, HashMap<K, DLLNode>, DoublyLinkedList)", "DLLNode (key, value, prev, next)", "DoublyLinkedList (head_dummy, tail_dummy, size)"],
      patterns: ["No classic GoF pattern — pure data structure composition"],
      concurrency: "ConcurrentHashMap + ReentrantReadWriteLock (read lock for get, write lock for put). Java LinkedHashMap(capacity, 0.75, true) as built-in LRU (accessOrder=true).",
      tricky: "All operations O(1): HashMap provides O(1) node lookup by key. DoublyLinkedList provides O(1) node remove (prev/next pointers) and O(1) insert at head. Most-recent = head. Least-recent = tail → evict tail.",
      resources: [{ label: "LeetCode 146: LRU Cache", url: "https://leetcode.com/problems/lru-cache/", type: "code" }]
    },
    {
      id: "lld-splitwise", title: "Splitwise / Expense Splitter", level: "Intermediate",
      classes: ["User", "Group", "Expense (amount, paidBy, description, splits)", "Split (EqualSplit, PercentSplit, ExactSplit)", "Balance (Map<User, Map<User, Double>>)", "ExpenseManager (Singleton)", "SettleStrategy"],
      patterns: ["Strategy (SplitStrategy: equal/percent/exact)", "Observer (notify users of new expense)", "Singleton (ExpenseManager)"],
      concurrency: "Optimistic locking on balance updates (version column). Idempotency key on expense creation to prevent duplicate submissions.",
      tricky: "Debt simplification algorithm: convert N-way pairwise debts to minimum N-1 transactions using max-heap of net balances. O(N log N). Each step: max-creditor receives from max-debtor.",
      resources: [{ label: "Awesome-LLD: Splitwise Design", url: "https://github.com/ashishps1/awesome-low-level-design", type: "code" }]
    },
    {
      id: "lld-chess", title: "Chess Game", level: "Advanced",
      classes: ["Board (8×8 Cell[][] grid)", "Cell (position, Optional<Piece>)", "Piece (abstract: King, Queen, Rook, Bishop, Knight, Pawn)", "Player (White/Black, timer)", "Game", "Move (from, to, piece, captured)", "MoveValidator", "MoveHistory (for undo/redo)"],
      patterns: ["Strategy (MoveValidator per piece type)", "Command (Move object enables undo history)", "Observer (check/checkmate detection observers)", "Iterator (board traversal)"],
      concurrency: "N/A for local game. Online chess: WebSocket for real-time moves, optimistic locking on game state (version number). Redis TTL for abandoned games.",
      tricky: "En passant (pawn captures diagonally after opponent's double pawn advance), castling (king + rook move together, only if neither has moved and no check), pawn promotion (auto-queen or player choice) — these are the 3 rules most candidates forget that interviewers specifically ask about.",
      resources: [{ label: "Refactoring Guru: Strategy Pattern (for piece moves)", url: "https://refactoring.guru/design-patterns/strategy", type: "doc" }]
    },
    {
      id: "lld-hotel", title: "Hotel Room Booking System", level: "Intermediate",
      classes: ["Hotel", "Room (Standard/Deluxe/Suite, price, amenities)", "Booking (check_in, check_out, guest, room, status)", "Guest", "SearchService", "PaymentService", "NotificationService", "AvailabilityCalendar"],
      patterns: ["Builder (BookingBuilder for complex booking creation)", "Strategy (PaymentStrategy)", "Observer (NotificationService on booking events)", "Repository (RoomRepository, BookingRepository)"],
      concurrency: "SELECT FOR UPDATE on room_availability row during booking creation. Optimistic locking with version field. Saga for booking → payment → confirmation (compensating rollback on payment failure).",
      tricky: "Availability check and booking must be atomic. Without transaction: two users check availability (both see room free), both proceed to book → race condition. Solution: SELECT FOR UPDATE in same transaction as INSERT booking.",
      resources: [{ label: "Awesome-LLD: Hotel Booking", url: "https://github.com/ashishps1/awesome-low-level-design", type: "code" }]
    },
    {
      id: "lld-library", title: "Library Management System", level: "Foundation",
      classes: ["Library", "Book (ISBN, title, author, genre)", "BookItem (barcode, physical copy)", "Member (library card)", "Librarian", "Loan (borrowed_at, due_date, fine)", "Reservation (queue position)", "Catalog (SearchStrategy: byTitle/Author/ISBN/Genre)", "FineCalculator"],
      patterns: ["Facade (LibraryService), Strategy (SearchStrategy, FineStrategy)", "Observer (notify reserved members on return)", "Factory (CatalogSearch factory)", "Chain of Responsibility (overdue reminder escalation)"],
      concurrency: "BookItem reservation uses optimistic lock (version) for multi-branch shared catalog. Reservation queue: Redis sorted set (position as score).",
      tricky: "Reservation queue notification on return: Observer pattern — when BookItem returned, trigger notification to first-in-queue member. If they don't collect in 24h, move to next in queue.",
      resources: [{ label: "GFG: Library Management System Design", url: "https://www.geeksforgeeks.org/design-library-management-system/", type: "blog" }]
    },
    {
      id: "lld-vending", title: "Vending Machine", level: "Intermediate",
      classes: ["VendingMachine (State machine, inventory)", "Item (name, price, quantity)", "Slot (item, code)", "State (IdleState, ItemSelectedState, HasMoneyState, DispensingState, OutOfStockState)", "PaymentProcessor (Cash, Card, UPI)", "Display"],
      patterns: ["State Pattern (state object determines behavior)", "Strategy (PaymentProcessor)", "Singleton (VendingMachine)"],
      concurrency: "State transitions must be atomic (synchronized or AtomicReference<State>). CAS (Compare-And-Swap) for inventory decrement: AtomicInteger.decrementAndGet() → check >= 0.",
      tricky: "Change calculation: greedy algorithm for standard denomination sets. But greedy fails for non-standard denominations (e.g., coins: 1, 3, 4 — for 6, greedy gives 4+1+1=3 coins, optimal is 3+3=2 coins → dynamic programming).",
      resources: [{ label: "Awesome-LLD: Vending Machine", url: "https://github.com/ashishps1/awesome-low-level-design", type: "code" }]
    },
    {
      id: "lld-ride-share", title: "Ride-Share / Cab Booking (Uber LLD)", level: "Advanced",
      classes: ["Driver (location, status, rating)", "Rider", "Trip (origin, destination, status, fare, route)", "MatchingService", "PricingStrategy (NormalPricing, SurgePricingDecorator)", "LocationService", "NotificationService", "TripState (REQUESTED/MATCHED/PICKUP/STARTED/COMPLETED/CANCELLED)"],
      patterns: ["Observer (TripState events notify all interested parties)", "Strategy (MatchingAlgorithm, PricingStrategy)", "State Machine (TripState)", "Decorator (SurgePricingDecorator wraps NormalPricing)"],
      concurrency: "Distributed lock on driver assignment: Redis SET driver_{id}_status ASSIGNED NX EX 60. Prevents two riders from claiming same driver simultaneously.",
      tricky: "Race condition: two riders request same millisecond, same driver matches both. Redis SET NX (atomic, only succeeds for one requester) on driver status flip AVAILABLE→ASSIGNED prevents double-assignment without application-level locks.",
      resources: [{ label: "Awesome-LLD: Ride Sharing", url: "https://github.com/ashishps1/awesome-low-level-design", type: "code" }]
    },
    {
      id: "lld-atm", title: "ATM Machine Design", level: "Intermediate",
      classes: ["ATM (location, bank_id)", "ATMState (IdleState, CardInsertedState, PINEnteredState, TransactionState)", "Card", "Account", "Transaction (Withdrawal, Deposit, Transfer, BalanceInquiry)", "CashDispenser (denomination slots)", "CardReader", "NetworkInterface (connects to bank)"],
      patterns: ["State Machine (ATM states)", "Command (Transaction commands with undo for partial failures)", "Template Method (generic transaction flow with specific implementations)"],
      concurrency: "Account balance update requires DB transaction with SELECT FOR UPDATE. Distributed locking if multiple ATMs connected to same account. Idempotency on transaction (prevent double debit if network times out).",
      tricky: "What if cash dispenses but DB update fails? Solution: log dispensed amount first (WAL-style), then update DB. Reconciliation process runs nightly to detect and correct discrepancies. Same as airline overbooking resolution.",
      resources: [{ label: "GFG: ATM Machine Design", url: "https://www.geeksforgeeks.org/design-atm-machine/", type: "blog" }]
    },
    {
      id: "lld-food-delivery", title: "Food Delivery App (Swiggy LLD)", level: "Advanced",
      classes: ["Restaurant (menu, hours, location)", "MenuItem (name, price, category, tags)", "Order (items, status, rider, restaurant)", "Customer", "DeliveryRider", "OrderStatus (PLACED/ACCEPTED/PREPARING/READY/PICKED/DELIVERED/CANCELLED)", "Cart", "AddressService", "RatingService"],
      patterns: ["Observer (OrderStatus events → Customer notification + Rider notification)", "State Machine (OrderStatus)", "Strategy (DeliveryFeeStrategy: flat/distance-based/surge)", "Builder (OrderBuilder)"],
      concurrency: "Optimistic locking on MenuItem.availability (items can go out of stock during peak). Distributed lock for rider assignment (same as Uber LLD). Order creation must be atomic with initial stock reservation.",
      tricky: "MenuItem stock management: when restaurant marks item 'sold out', all active sessions viewing that item must see updated status immediately (WebSocket push or SSE from restaurant dashboard to customer app).",
      resources: [{ label: "Awesome-LLD: Food Delivery", url: "https://github.com/ashishps1/awesome-low-level-design", type: "code" }]
    },
    {
      id: "lld-inventory", title: "Inventory Management System (Amazon Warehouse)", level: "Intermediate",
      classes: ["Warehouse (location, capacity)", "Product (SKU, name, dimensions, weight)", "InventoryItem (product, quantity, location_code, status)", "StockMovement (IN/OUT/TRANSFER/ADJUST)", "ReceivingOrder (PO number, expected_items)", "PickList (for fulfillment)", "ReorderPolicy (min_stock, reorder_quantity)"],
      patterns: ["Observer (low stock alert → auto reorder)", "Strategy (ReorderPolicy: fixed-quantity vs EOQ vs JIT)", "Repository (ProductRepository, InventoryRepository)", "Facade (WarehouseManagementFacade)"],
      concurrency: "Pessimistic lock (SELECT FOR UPDATE) on InventoryItem when reserving for order. AtomicInteger for available_quantity to support concurrent reservation checks without full row lock.",
      tricky: "FIFO vs LIFO vs FEFO (First Expired First Out) for expiry-date sensitive products (food, medicine). Storage location optimization: fast-moving products near shipping dock (reduces picker travel time — 'slotting optimization').",
      resources: [{ label: "GFG: Inventory Management Design", url: "https://www.geeksforgeeks.org/system-design/inventory-management-system-design/", type: "blog" }]
    }
  ],

  // =========================================================================
  // SOLID PRINCIPLES (5)
  // =========================================================================
  solidPrinciples: [
    {
      name: "S — Single Responsibility Principle (SRP)",
      definition: "A class should have only one reason to change. Each class does exactly one thing, for one actor.",
      violation: "UserService class that: validates input, saves to DB, sends welcome email, generates PDF report, AND logs to file. Every feature touches this one class.",
      fix: "Split into: UserValidator (validation), UserRepository (DB persistence), EmailService (email sending), ReportService (PDF generation), AuditLogger (logging). Each class changes for only one reason.",
      interviewAngle: "Tell me about a time you refactored a God class. What principles guided the split?",
      resources: [{ label: "Clean Code: Chapter 9 — Classes", url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/", type: "doc" }]
    },
    {
      name: "O — Open/Closed Principle (OCP)",
      definition: "Software entities should be open for extension but closed for modification. Add new behavior without changing existing, tested code.",
      violation: "PaymentService with if/else chain: if (type == 'CARD') { ... } else if (type == 'UPI') { ... } else if (type == 'WALLET') { ... }. Adding a new payment method requires modifying this class and re-testing all branches.",
      fix: "PaymentStrategy interface with process(amount) method. CardPaymentStrategy, UPIPaymentStrategy, WalletPaymentStrategy each implement it. Adding a new method = adding a new class, zero changes to PaymentService.",
      interviewAngle: "How would you add Bitcoin payment to an existing payment service without touching current working code?",
      resources: [{ label: "Refactoring Guru: OCP", url: "https://refactoring.guru/design-patterns/catalog", type: "blog" }]
    },
    {
      name: "L — Liskov Substitution Principle (LSP)",
      definition: "Subclasses must be substitutable for their base class without breaking program correctness. If S is a subtype of T, objects of type T may be replaced with objects of type S without altering program behavior.",
      violation: "Square extends Rectangle. setWidth(5) on a Square also sets height=5 (squares have equal sides). But code that sets width and height independently to different values breaks when given a Square.",
      fix: "Don't inherit Square from Rectangle. Use a Shape interface with area() method. Square and Rectangle implement Shape independently. Or: model with immutable objects where squares don't need to be a subtype.",
      interviewAngle: "Classic LSP violation: explain why Square should NOT extend Rectangle.",
      resources: [{ label: "Refactoring Guru: LSP Explained", url: "https://refactoring.guru/solid-principles/liskov-substitution-principle", type: "blog" }]
    },
    {
      name: "I — Interface Segregation Principle (ISP)",
      definition: "Clients should not be forced to depend on interfaces they don't use. Create small, focused interfaces rather than fat general-purpose ones.",
      violation: "Animal interface with: fly(), swim(), run(), climb(). Dog implements Animal → forced to implement fly() and climb() → throws UnsupportedOperationException (runtime error).",
      fix: "Separate interfaces: IFlyable (fly()), ISwimmable (swim()), IRunnable (run()), IClimbable (climb()). Dog implements ISwimmable + IRunnable only. Eagle implements IFlyable + IRunnable. Duck implements all three swimming ones.",
      interviewAngle: "Why is a 20-method interface a design smell? What happens when you add a new method to it?",
      resources: [{ label: "Refactoring Guru: ISP", url: "https://refactoring.guru/solid-principles/interface-segregation-principle", type: "blog" }]
    },
    {
      name: "D — Dependency Inversion Principle (DIP)",
      definition: "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.",
      violation: "OrderService directly instantiates: new MySQLOrderRepository(). Switching to MongoDB requires modifying OrderService. OrderService cannot be tested without a real MySQL database running.",
      fix: "OrderService depends on IOrderRepository interface (abstraction). MySQLOrderRepository and MongoOrderRepository both implement IOrderRepository. Pass via constructor injection. Now: swap implementations without changing OrderService. Mock IOrderRepository in tests (no DB needed).",
      interviewAngle: "How do you make your code testable without hitting a real database? (Dependency injection via interfaces)",
      resources: [{ label: "Refactoring Guru: DIP", url: "https://refactoring.guru/solid-principles/dependency-inversion-principle", type: "blog" }]
    }
  ],

  // =========================================================================
  // BEHAVIORAL SCENARIOS (9 fully-worked STAR stories)
  // =========================================================================
  behavioralScenarios: [
    {
      id: "beh-outage", category: "Production Crisis",
      question: "Tell me about a time you dealt with a production incident or system outage.",
      situation: "Our Redis cluster ran out of memory at 11 PM on Friday before our biggest client's product launch. The checkout API was failing for 30% of users because sessions could not be created. Revenue impact: ~₹80k/hour.",
      task: "I was on-call. SLA required restoration within 15 minutes or we'd breach the contract.",
      action: "Step 1: Pulled CloudWatch dashboard — saw Redis memory at 100%, eviction rate spiking. Step 2: Immediately set maxmemory-policy to allkeys-lru (was 'noeviction' — caused OOM refusal). Step 3: Scaled Redis instance vertically (+30 seconds downtime). Step 4: While scaling, traced which key prefix consumed most memory — found one feature team caching 50MB serialized objects. Step 5: Added 1KB size limit validation to cache library. Step 6: Filed post-mortem with 3 action items: cache size CI check, 75% memory alert, Redis cluster sharding plan.",
      result: "Service restored in 11 minutes (within SLA). Zero recurrence. Cache size validation check caught 2 similar bugs the following quarter.",
      lessonLearned: "Monitoring on the right metric (memory %) not just 'is it up?' would have given 30 minutes of warning. Alerting on 75% threshold was the most valuable action item."
    },
    {
      id: "beh-disagreement", category: "Technical Disagreement",
      question: "Tell me about a time you disagreed with a senior engineer or architect on a technical decision.",
      situation: "Senior architect proposed building a dedicated image processing microservice: new K8s deployment, PostgreSQL database, separate monitoring stack, 3-week estimate. I believed AWS Lambda would solve the same problem for $47/month vs. estimated $600/month infrastructure.",
      task: "Make the case for a different technical approach without creating personal conflict or appearing to challenge authority.",
      action: "Built a proof-of-concept Lambda function over the weekend. Wrote a clear comparison document: Lambda (cold start 800ms, processing identical, $47/month, zero ops burden) vs. microservice ($600/month, 3-week implementation, dedicated ops). Framed it as 'additional option with trade-off analysis' in a team meeting, explicitly acknowledging the architect's experience. Asked: 'What concerns would you have about the Lambda approach that I haven't considered?'",
      result: "Architect appreciated the PoC data approach. We ran a Lambda PoC for 3 months with an agreed review. Still running 18 months later. Architect adopted the PoC-first approach for evaluating future architectural decisions.",
      lessonLearned: "Build the PoC first. Data beats opinion in every engineering discussion. Framing as 'additional option to consider' rather than 'you're wrong' keeps the relationship intact."
    },
    {
      id: "beh-scale", category: "Performance Crisis",
      question: "Describe a significant performance problem you investigated and resolved.",
      situation: "The product listing API p99 latency hit 4.2 seconds for our largest retail client. Users were abandoning the search page at 68% rate (vs. 12% baseline). Black Friday was 3 weeks away.",
      task: "Find root cause and get p99 below 500ms within 2 weeks — without major architectural changes.",
      action: "Day 1: Added OpenTelemetry tracing to production. Trace revealed: 3.1 of 4.2 seconds was one PostgreSQL query on a 50M-row products table. EXPLAIN ANALYZE: full table scan. Added composite index on (category_id, is_active, price). Day 2: Discovered N+1 query in ORM — 500 products each triggering separate DB call for images. Batched with single JOIN. Day 3: Added Redis cache for top-1000 category searches (5-minute TTL, invalidate on product update).",
      result: "p99 dropped from 4.2s to 168ms. Search abandonment rate: 68% → 13%. DB CPU: 78% → 11%. Cache hit ratio: 87%. Black Friday handled 8× normal traffic without incident.",
      lessonLearned: "Instrument BEFORE optimizing. 3 days of guessing preceded the 3-hour fix once we had distributed traces. OpenTelemetry is now in every new service from day 1."
    },
    {
      id: "beh-ambiguity", category: "Ambiguous Requirements",
      question: "Tell me about a time you had to make technical decisions with incomplete or ambiguous requirements.",
      situation: "Product manager asked for 'a real-time logistics tracking dashboard' with no further specification. No user count, no update frequency, no latency requirements, no stakeholder list.",
      task: "Deliver a working system without waiting months for perfect requirements, while avoiding gold-plating.",
      action: "Wrote a 1-page assumptions document and called a 30-minute sync with Product, Ops, and one power user. Discovered: 50 internal ops users (not 50,000 customers), updates every 30 seconds (not millisecond real-time), map visualization required. Built with: SSE (simpler than WebSockets for one-directional updates), PostgreSQL (sufficient for 50 users), Leaflet.js map. Explicitly documented each assumption in the ticket and PR.",
      result: "Working PoC in 5 days. Product validated 9/10 assumptions. One changed: update frequency became 5 seconds (not 30). SSE handled this without architectural change.",
      lessonLearned: "Write your assumptions down explicitly. Discovering wrong assumptions at planning is free. Discovering them after building is expensive and demoralizing."
    },
    {
      id: "beh-deadline", category: "Delivery Under Pressure",
      question: "Tell me about a time you had to deliver under an extremely tight deadline.",
      situation: "Our payment gateway provider announced they were shutting down the API we depended on in 14 days. We had 45,000 active recurring subscriptions that would stop processing if we didn't migrate.",
      task: "As lead engineer: design the migration, integrate new payment provider, migrate all 45k subscription records, run parallel validation, cut over — all in 14 days.",
      action: "Day 1: Created dependency map — where payment gateway was called (7 places across 3 services). Day 2-5: New payment provider integration (Razorpay). Day 6-7: Migration script for subscription data (made idempotent — safe to re-run). Day 8-10: Testing, parallel charging (charge via both providers, compare results, discard duplicate). Day 11-12: Gradual migration (10% → 50% → 100% of new subscriptions). Day 13: Cut over. Day 14: Buffer.",
      result: "Cutover completed 1 day early. Zero failed subscription charges during migration. Parallel run caught 3 discrepancies — all were test accounts. Zero customer complaints.",
      lessonLearned: "Idempotent migration scripts remove 90% of the stress. Parallel run period is non-negotiable for payment migrations. The 'buffer day' plan saved us when our VP requested a demo on day 13."
    },
    {
      id: "beh-failure", category: "Own Failure / Learning",
      question: "Tell me about your biggest technical mistake and what you learned from it.",
      situation: "I ran an ALTER TABLE ... ADD COLUMN ... NOT NULL DEFAULT '' on a 30-million-row table in production at peak hours. PostgreSQL locks the entire table during this operation. Table was locked for 8 minutes.",
      task: "I had estimated the migration would take 30 seconds based on small-scale testing. I was wrong by 16×.",
      action: "Immediately: identified table lock from pg_locks, coordinated rollback to previous deployment (old columns still existed), communicated to stakeholders honestly about cause and timeline. Resolved in 9 minutes total. Post-incident: researched the proper approach — Expand-Contract Migration Pattern: (1) add nullable column, (2) backfill in batches of 1000 rows with SELECT FOR UPDATE SKIP LOCKED, (3) add NOT NULL constraint separately. Wrote team migration checklist (4 required checks before any DDL in production).",
      result: "8-minute outage. Wrote and presented the post-mortem myself. The migration checklist has been used 40+ times since. Zero similar incidents in 18 months.",
      lessonLearned: "Test migrations on a production-size clone. PostgreSQL's ALTER TABLE timing is not linear — it depends on row count, indexes, constraints, and concurrent activity. Never assume small-scale test predicts large-scale time."
    },
    {
      id: "beh-mentoring", category: "Leadership & Mentoring",
      question: "Tell me about a time you mentored or helped a junior engineer grow significantly.",
      situation: "A junior engineer on my team was consistently writing code that worked but required extensive refactoring in code review. They were frustrated by the review feedback loop taking 2-3 days per PR.",
      task: "Help them internalize the design principles rather than just fixing each PR individually.",
      action: "Set up weekly 1:1 'design sessions': instead of reviewing their code after writing, we'd spend 20 minutes at the whiteboard before they wrote any code for new features. Explained SOLID principles using their own code as examples (not abstract theory). Pair-programmed on one feature per sprint. Introduced them to refactoring.guru for pattern references. Created a personal PR checklist together that they owned.",
      result: "After 8 weeks: average PR review round-trips dropped from 4 to 1.2. Their code review comments to others became more constructive. They presented a design document independently for the first time. Promoted to mid-level engineer 6 months later.",
      lessonLearned: "Fixing the code is faster but teaches nothing. Explaining the principle once, with their own code as the example, is remembered permanently."
    },
    {
      id: "beh-cross-team", category: "Cross-Team Collaboration",
      question: "Tell me about a time you had to collaborate across multiple teams to deliver a project.",
      situation: "A major checkout redesign required: Frontend team (new UI), Backend API team (new endpoints), Payments team (new payment methods), DevOps team (new infrastructure), and Data team (new analytics events). 4-week deadline for a scheduled marketing campaign.",
      task: "Coordinate across 5 teams with different sprint cycles, tech stacks, and priorities.",
      action: "Organized a day-1 kickoff with all 5 teams. Created a shared dependency graph showing which team blocked which. Proposed API contracts upfront (OpenAPI spec written in week 1) — teams could develop in parallel against the contract. Set up a shared Slack channel with daily standup message posted by each team. Identified the critical path: Payments team was the blocker — lobbied their manager to prioritize this work. Created a shared launch-readiness checklist checked daily.",
      result: "Launched 2 days before deadline. 3 of 5 teams finished ahead of schedule. API contract prevented 2 breaking changes from shipping. Data team had all analytics events from day 1 (unusual — normally missing for weeks post-launch).",
      lessonLearned: "Define API contracts at the start — this single action allowed 4 teams to work in parallel rather than sequentially. The API contract is the most valuable artifact in multi-team projects."
    },
    {
      id: "beh-process-improvement", category: "Process Improvement",
      question: "Tell me about a time you improved a development process that was slowing your team down.",
      situation: "Our CI pipeline took 45 minutes to complete. Developers were context-switching away from code review while waiting, or merging without waiting (causing more failures). Average cycle time from PR open to merge was 3.2 days.",
      task: "Reduce CI time and improve developer experience — without sacrificing test coverage.",
      action: "Profiled the CI pipeline: 34 minutes was integration tests using a shared staging DB (contention). Introduced Testcontainers — each test run gets its own throwaway DB container (10x parallelism possible). Parallelized unit tests (was sequential, now 16 parallel threads). Added change-detection: only run tests related to changed modules (via module dependency graph). Split pipeline: fast tests (unit + lint) in 3 minutes, full integration tests only on merge to main.",
      result: "PR CI check: 45 minutes → 6 minutes. Full CI on main: 14 minutes (down from 45). Developer cycle time: 3.2 days → 1.4 days. Team shipped 2.3× more features per sprint in the following quarter.",
      lessonLearned: "Measure first. We assumed the slow tests were just 'big'. Profiling revealed it was DB contention, not test count. Testcontainers solved a problem we didn't know we had."
    }
  ],

  // =========================================================================
  // INTERVIEW FRAMEWORK
  // =========================================================================
  interviewFramework: {
    steps: [
      {
        id: "step-1", time: "0–5 min", phase: "Requirements Clarification",
        doThis: [
          "Ask: 'Who are the primary users and what problem does this solve for them?'",
          "Establish functional requirements: the core user actions the system must support",
          "Establish non-functional requirements: scale (DAU, QPS), latency (< Xms p99), availability (99.9%? 99.99%?), consistency",
          "Clarify read vs write ratio, geographic distribution, mobile vs web vs API clients",
          "Explicitly state: 'Let me note my assumptions: I'm assuming X, Y, Z — correct me if wrong'"
        ],
        avoid: "Starting to draw before you've clarified. Jumping to the whiteboard in silence. Senior candidates who skip this step fail at Google."
      },
      {
        id: "step-2", time: "5–10 min", phase: "Scale Estimation",
        doThis: [
          "Daily Active Users × requests_per_day = daily total requests",
          "Daily requests ÷ 86,400 seconds = average QPS. Peak = average × 3",
          "Storage: users × data_per_user × retention_period",
          "Memory cache: 20% of data = 80% of traffic (Pareto). Cache = hot 20%",
          "Speak your estimates out loud: 'I'm assuming 10M DAU. At 100 requests each, that's 1B requests/day = ~11k QPS average, ~35k QPS peak'"
        ],
        avoid: "Refusing to estimate ('I need more information'). Precise numbers aren't the goal — comfortable order-of-magnitude reasoning is."
      },
      {
        id: "step-3", time: "10–20 min", phase: "High-Level Architecture",
        doThis: [
          "Draw end-to-end: Client → CDN → Load Balancer → API Gateway → Core Services → DB + Cache",
          "Identify 3-4 core services only (don't over-granularize at this stage)",
          "Choose and justify primary database (SQL vs NoSQL — why?)",
          "Identify what can be cached and what cannot (transactional data vs reference data)",
          "Identify async vs synchronous operations: what can be queued?"
        ],
        avoid: "Adding Kafka just because it sounds impressive. Every component must have a justified reason for existing."
      },
      {
        id: "step-4", time: "20–35 min", phase: "Deep Dive (The Real Interview)",
        doThis: [
          "Drive to the #1 technical bottleneck for this specific system (seat locking, fan-out, partition key, idempotency)",
          "Explain database schema: table names, key columns, indexes, and why",
          "Design API contract for 2-3 critical endpoints (request, response, error cases)",
          "Address the hardest concurrency or consistency problem in the system",
          "Propose a solution AND the trade-off of the alternative you rejected"
        ],
        avoid: "Staying at surface level. Interviewers WANT you to go deep on one component. Shallow on all = failing response."
      },
      {
        id: "step-5", time: "35–45 min", phase: "Failures, Scale-Up & Wrap-Up",
        doThis: [
          "Proactively volunteer single points of failure in YOUR design — shows production maturity",
          "Discuss what happens at 10× current scale (which tier breaks first, how to fix)",
          "Mention monitoring: 3 alerts you'd set up for this system and why",
          "Mention one thing you'd design differently with more time"
        ],
        avoid: "Waiting for the interviewer to find failures in your design. Senior engineers find their own design's weaknesses first."
      }
    ],
    goldenQuestions: [
      { q: "Why did you choose this database?", howToAnswer: "Data shape + access pattern + consistency requirement. Never 'it's popular' or 'it's what I know'." },
      { q: "What's the bottleneck in your design?", howToAnswer: "Name it before they ask. Show you've already thought about where it will fail." },
      { q: "What if Redis goes down?", howToAnswer: "Circuit breaker falls back to DB (accept higher latency). Redis AOF persistence reduces data loss on restart." },
      { q: "How do you handle duplicate requests?", howToAnswer: "Idempotency key (UUID4 from client) stored in DB with unique constraint. Return cached response on duplicate." },
      { q: "How does this scale to 10× traffic?", howToAnswer: "Add read replicas → add cache tier → add Kafka for async → add more stateless app servers → DB sharding as last resort." },
      { q: "How would you test this system?", howToAnswer: "Unit → Integration (Testcontainers) → Contract (Pact) → E2E (Playwright) → Load (k6) → Chaos (FIS/Gremlin)." }
    ],
    deloitteSpecific: [
      "Cloud migration pitch: CapEx (on-premise hardware) vs OpEx (cloud pay-as-you-go). TCO analysis over 5 years including staffing costs.",
      "Multi-tenant SaaS: row-level security (PostgreSQL RLS) vs schema-per-tenant vs DB-per-tenant. Trade-offs: isolation, cost, ops overhead.",
      "Legacy system integration: Strangler Fig pattern (gradually replace monolith behind same API), Anti-Corruption Layer, REST adapter wrapping SOAP/COBOL.",
      "Regulatory compliance: GDPR (data residency — EU data must stay in EU), PCI-DSS (payment card data), SOC 2 (security controls audit), RBI guidelines (for financial data in India).",
      "Hybrid cloud architecture: on-premise + AWS via Direct Connect / Azure ExpressRoute. Latency, security, data sovereignty considerations.",
      "Enterprise API Management: Apigee / AWS API Management for developer portal, versioning, deprecation policy, SLA enforcement, analytics.",
      "Change management: phased rollout with parallel run, stakeholder communication plan, rollback decision criteria, post-go-live support model (hypercare period).",
      "Total Cost of Ownership (TCO) calculator: help clients justify cloud migration budget. Include: infrastructure, licensing, training, migration, ongoing support.",
      "Reference architecture: Deloitte uses Microsoft Azure heavily (partnership). Know AKS, Azure SQL, Cosmos DB, Event Hubs, Azure API Management.",
      "DevSecOps: embedding security in CI/CD pipeline (shift-left). Snyk, SonarQube, Trivy integration — not just end-of-cycle penetration testing."
    ]
  },

  // =========================================================================
  // ENGINEERING BLOGS (35)
  // =========================================================================
  engineeringBlogs: [
    { id: "b-netflix", company: "Netflix Tech Blog", topics: "Streaming, chaos engineering, microservices, personalisation at scale", why: "The most consistently excellent engineering blog. Start with the chaos engineering and recommendation system posts.", link: "https://netflixtechblog.com/", mustRead: "https://netflixtechblog.com/tagged/chaos-engineering" },
    { id: "b-uber", company: "Uber Engineering", topics: "Real-time matching, geospatial (H3), data platform, migration from Postgres to other DBs", why: "H3 hexagonal grid post and schemaless DB migration are directly interview-relevant.", link: "https://www.uber.com/en-IN/blog/engineering/", mustRead: "https://www.uber.com/blog/h3/" },
    { id: "b-airbnb", company: "Airbnb Engineering", topics: "Search ranking, payments, data infrastructure, service migration stories", why: "Excellent honest writing on splitting a monolith. Payment idempotency posts.", link: "https://medium.com/airbnb-engineering", mustRead: "https://medium.com/airbnb-engineering/avoiding-double-payments-in-a-distributed-payments-system-2981f6b070bb" },
    { id: "b-meta", company: "Meta Engineering", topics: "Scale, TAO (graph storage), Haystack (photo storage), networking, WhatsApp", why: "Read TAO and Haystack posts for social graph and photo storage design at trillion-edge scale.", link: "https://engineering.fb.com/", mustRead: "https://engineering.fb.com/2013/06/25/core-infra/tao-the-power-of-the-graph/" },
    { id: "b-discord", company: "Discord Engineering", topics: "Real-time messaging, Cassandra→ScyllaDB migration, Elixir at scale", why: "The clearest public writing anywhere on storing trillions of messages. ScyllaDB migration is remarkable.", link: "https://discord.com/category/engineering", mustRead: "https://discord.com/blog/how-discord-stores-trillions-of-messages" },
    { id: "b-stripe", company: "Stripe Engineering", topics: "Payment API design, idempotency, financial correctness, API versioning", why: "The definitive writing on idempotency. Must-read for anyone building payment or booking systems.", link: "https://stripe.com/blog/engineering", mustRead: "https://stripe.com/blog/idempotency" },
    { id: "b-shopify", company: "Shopify Engineering", topics: "Flash sales, MySQL sharding, Rails at scale, BFCM (Black Friday, Cyber Monday)", why: "Black Friday scaling posts are the best public case study on handling 10×-100× traffic spikes.", link: "https://shopify.engineering/", mustRead: "https://shopify.engineering/shopify-bfcm-2020-recap" },
    { id: "b-cloudflare", company: "Cloudflare Blog", topics: "Network engineering, DDoS mitigation, edge computing, outage post-mortems", why: "Their outage post-mortems are the most transparent and detailed public incident write-ups available.", link: "https://blog.cloudflare.com/", mustRead: "https://blog.cloudflare.com/cloudflare-incident-on-june-21-2022" },
    { id: "b-linkedin", company: "LinkedIn Engineering", topics: "Kafka (originated here), feed, graph, data infrastructure", why: "The original Kafka announcement post and Jay Kreps' 'The Log' essay are distributed systems classics.", link: "https://www.linkedin.com/blog/engineering", mustRead: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" },
    { id: "b-figma", company: "Figma Engineering", topics: "Multiplayer CRDTs, WebAssembly, browser performance, real-time collaboration", why: "The definitive public writing on real-time collaborative editing architecture. CRDT implementation.", link: "https://www.figma.com/blog/engineering/", mustRead: "https://www.figma.com/blog/how-figmas-multiplayer-technology-works/" },
    { id: "b-notion", company: "Notion Engineering", topics: "Data model (blocks as primitives), sharding PostgreSQL monolith", why: "Their Postgres sharding post is one of the most detailed real-world database migration write-ups.", link: "https://www.notion.so/blog/topic/tech", mustRead: "https://www.notion.so/blog/sharding-postgres-at-notion" },
    { id: "b-dropbox", company: "Dropbox Tech Blog", topics: "Exabyte-scale storage (Magic Pocket), sync protocol, migration from AWS", why: "Magic Pocket posts on building their own object storage system are extraordinary engineering writing.", link: "https://dropbox.tech/", mustRead: "https://dropbox.tech/infrastructure/inside-the-magic-pocket" },
    { id: "b-spotify", company: "Spotify Engineering", topics: "Data platform, event delivery, backend for frontend pattern, squad model", why: "Event delivery reliability posts and their Backend For Frontend pattern are directly applicable.", link: "https://engineering.atspotify.com/", mustRead: "https://engineering.atspotify.com/2019/09/understanding-spotifys-approach-to-curation/" },
    { id: "b-instagram", company: "Instagram Engineering", topics: "Feed at scale, photo storage, scaling with a small team", why: "Famous for reaching 100M users with only 12 engineers. Efficiency and simplicity lessons.", link: "https://instagram-engineering.com/", mustRead: "https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c" },
    { id: "b-github", company: "GitHub Engineering", topics: "Git at scale, MySQL sharding, multi-datacenter deployment, availability", why: "Scaling the tool every developer uses daily. Very honest about their HA challenges.", link: "https://github.blog/category/engineering/", mustRead: "https://github.blog/2021-09-27-partitioning-githubs-relational-databases-scale/" },
    { id: "b-segment", company: "Segment Engineering", topics: "The famous microservices-to-monolith reversal, event pipeline reliability", why: "Read this BEFORE blindly advocating microservices. The most important counterargument in engineering.", link: "https://segment.com/blog/engineering/", mustRead: "https://segment.com/blog/goodbye-microservices/" },
    { id: "b-zerodha", company: "Zerodha Tech Blog", topics: "Trading systems, boring technology choices, high-reliability engineering", why: "Most honest public engineering blog about choosing the right tool (not the hyped one). Contrarian and valuable.", link: "https://zerodha.tech/", mustRead: "https://zerodha.tech/blog/being-future-ready-at-zerodha/" },
    { id: "b-hotstar", company: "Hotstar Engineering", topics: "Record concurrency (50M+) during IPL/Cricket, streaming at India scale", why: "The highest concurrent streaming viewership numbers ever recorded. Engineering constraints are fascinating.", link: "https://blog.hotstar.com/", mustRead: "https://blog.hotstar.com/building-a-massive-event-streaming-platform-at-hotstar-9bed4fd2a6aa" },
    { id: "b-swiggy", company: "Swiggy Engineering", topics: "Real-time logistics, ETA prediction, peak load, hyperlocal supply-demand", why: "Directly relevant to food delivery design case study. Their surge pricing architecture is exceptional.", link: "https://bytes.swiggy.com/", mustRead: "https://bytes.swiggy.com/the-swiggy-delivery-challenge-part-one-6a2abb4f82f6" },
    { id: "b-razorpay", company: "Razorpay Engineering", topics: "Payments at scale, reliability engineering, UPI infrastructure, financial correctness", why: "Payment correctness articles with Indian regulatory context. Their reliability engineering posts are deep.", link: "https://engineering.razorpay.com/", mustRead: "https://engineering.razorpay.com/" },
    { id: "b-canva", company: "Canva Engineering", topics: "Consumer-scale design tool, WebAssembly, real-time collaboration, media processing", why: "Frontend and backend engineering at 150M+ consumer scale. WebAssembly adoption story is excellent.", link: "https://www.canva.dev/blog/engineering/", mustRead: "https://www.canva.dev/blog/engineering/" },
    { id: "b-highscalability", company: "High Scalability Blog", topics: "Archive of hundreds of real company architecture breakdowns", why: "One place with case studies for every major technology company from 2006 to present.", link: "https://highscalability.com/", mustRead: "https://highscalability.com/all-time-favorites/" },
    { id: "b-bytebytego", company: "ByteByteGo Blog (Alex Xu)", topics: "Visual system design explanations, weekly newsletter on distributed systems", why: "Best visual diagrams for concepts that are hard to understand from text alone.", link: "https://blog.bytebytego.com/", mustRead: "https://blog.bytebytego.com/p/ep49-api-gateway-vs-load-balancer" },
    { id: "b-jepsen", company: "Jepsen Analyses (Kyle Kingsbury)", topics: "Rigorous testing of distributed database consistency claims", why: "What databases ACTUALLY guarantee vs what they CLAIM. Sobering and important. Read before choosing any DB.", link: "https://jepsen.io/analyses", mustRead: "https://jepsen.io/consistency" },
    { id: "b-arpit", company: "Arpit Bhayani's Blog", topics: "Databases, distributed systems, backend engineering with Indian context", why: "Rigorous technical depth. The best in-depth distributed systems explanation blog in India.", link: "https://arpitbhayani.me/blogs", mustRead: "https://arpitbhayani.me/blogs/redisONredis" }
  ],

  // ===========================================================================
  // CLOUD MATRIX
  // ===========================================================================
  cloudMatrix: [
    { concept: "Relational Database (Managed)", aws: "Amazon RDS / Aurora", azure: "Azure SQL Database", gcp: "Cloud SQL / Cloud Spanner", useCase: "Transactional ACID workloads (orders, users, payments)." },
    { concept: "NoSQL Document Store", aws: "DynamoDB / DocumentDB", azure: "Cosmos DB (MongoDB API)", gcp: "Firestore / Datastore", useCase: "Schema-flexible, high-throughput document data." },
    { concept: "Object Storage", aws: "Amazon S3", azure: "Azure Blob Storage", gcp: "Google Cloud Storage (GCS)", useCase: "Unstructured files, images, videos, backups, static assets." },
    { concept: "In-Memory Cache", aws: "ElastiCache (Redis / Memcached)", azure: "Azure Cache for Redis", gcp: "Memorystore", useCase: "Sub-millisecond read caching, session store, rate limiting." },
    { concept: "Message Queue", aws: "Amazon SQS", azure: "Azure Queue Storage / Service Bus", gcp: "Cloud Pub/Sub", useCase: "Asynchronous task processing, decoupling producer/consumer." },
    { concept: "Event Streaming / Log", aws: "Amazon Kinesis / MSK (Kafka)", azure: "Event Hubs", gcp: "Pub/Sub / Managed Kafka", useCase: "High-throughput event-driven pipeline, log streaming." },
    { concept: "Serverless Compute", aws: "AWS Lambda", azure: "Azure Functions", gcp: "Cloud Functions / Cloud Run", useCase: "Event-driven background jobs, microservices auto-scaling to zero." },
    { concept: "Container Orchestration", aws: "Amazon EKS / ECS", azure: "Azure Kubernetes Service (AKS)", gcp: "Google Kubernetes Engine (GKE)", useCase: "Production microservice container management at scale." },
    { concept: "API Gateway", aws: "Amazon API Gateway", azure: "Azure API Management", gcp: "Apigee / Cloud API Gateway", useCase: "Rate limiting, TLS termination, auth, routing for client APIs." },
    { concept: "CDN & Edge Security", aws: "Amazon CloudFront + WAF", azure: "Azure Front Door / CDN", gcp: "Cloud CDN + Armor", useCase: "Geographic edge caching, DDoS mitigation, global acceleration." },
    { concept: "Secrets Management", aws: "AWS Secrets Manager", azure: "Azure Key Vault", gcp: "Secret Manager", useCase: "Secure storage of API keys, DB credentials, TLS certificates." }
  ],

  // ===========================================================================
  // TECH DECISION MASTER TABLE (40 Decisions)
  // ===========================================================================
  decisionTable: [
    { problem: "Web UI (SPA)", primary: "React", alternative: "Vue.js", avoid: "Microfrontends for team < 10 engineers" },
    { problem: "SEO-critical public web app", primary: "Next.js (SSR/SSG)", alternative: "Remix / Nuxt", avoid: "Pure client-side SPA with empty HTML shell (Google struggles to index)" },
    { problem: "Cross-platform mobile", primary: "Flutter (Dart, single codebase)", alternative: "React Native", avoid: "Cordova/Ionic webview for performance-sensitive screens" },
    { problem: "Public REST API backend", primary: "Node.js + Express / FastAPI", alternative: "Go (high concurrency), NestJS", avoid: "50 microservices on day 1 with 3 engineers" },
    { problem: "Enterprise Java backend", primary: "Spring Boot", alternative: "Quarkus (lighter, GraalVM native)", avoid: "Plain Java Servlets in 2024" },
    { problem: "Relational / financial data", primary: "PostgreSQL", alternative: "MySQL / CockroachDB", avoid: "MongoDB for multi-table ACID bank transactions" },
    { problem: "Flexible document data", primary: "MongoDB Atlas", alternative: "PostgreSQL JSONB column", avoid: "Complex JOIN queries across MongoDB collections" },
    { problem: "Massive write-heavy time-series", primary: "Apache Cassandra / ScyllaDB", alternative: "TimescaleDB (Postgres extension)", avoid: "Sharding PostgreSQL before considering Cassandra" },
    { problem: "Session & rate limiting state", primary: "Redis Cluster", alternative: "Memcached (simpler, no persistence)", avoid: "Storing sessions in PostgreSQL (slow, scaling problem)" },
    { problem: "Full-text product/content search", primary: "Elasticsearch / OpenSearch", alternative: "Typesense (simpler ops), Algolia", avoid: "LIKE '%query%' on 50M-row SQL table" },
    { problem: "Two-way real-time (chat, games)", primary: "WebSockets", alternative: "gRPC bi-directional streaming", avoid: "500ms HTTP polling loop burning server connections" },
    { problem: "Server → client live updates", primary: "Server-Sent Events (SSE)", alternative: "WebSockets (if bidirectional needed)", avoid: "Heavy WS connection for one-directional feed updates" },
    { problem: "Background async tasks", primary: "AWS SQS + worker Lambda/ECS", alternative: "Redis BullMQ, Celery", avoid: "Blocking synchronous HTTP call for 30s PDF generation" },
    { problem: "High-throughput event stream", primary: "Apache Kafka / Redpanda", alternative: "AWS Kinesis", avoid: "Kafka for simple 5 msg/sec background jobs" },
    { problem: "File / image / video storage", primary: "AWS S3 / GCS / Azure Blob", alternative: "Cloudflare R2 (zero egress), MinIO", avoid: "Storing 500MB video BLOBs directly in PostgreSQL" },
    { problem: "Global static content delivery", primary: "Cloudflare CDN (with WAF)", alternative: "AWS CloudFront + S3", avoid: "Hitting origin server for every CSS/JS/image request globally" },
    { problem: "Container packaging", primary: "Docker with multi-stage build", alternative: "Podman (daemonless)", avoid: "Deploying raw zip files to unmanaged VMs in production" },
    { problem: "Container orchestration at scale", primary: "Kubernetes (EKS/GKE/AKS)", alternative: "AWS ECS Fargate", avoid: "K8s cluster for 3-person startup with 1k users" },
    { problem: "DB read scaling", primary: "Read replicas + Redis cache layer", alternative: "PgBouncer connection pooling", avoid: "DB sharding before exhausting read replicas and caching" },
    { problem: "Infrastructure provisioning", primary: "Terraform (cloud-agnostic IaC)", alternative: "AWS CDK (TypeScript/Python)", avoid: "Manually clicking in AWS Console for production infrastructure" },
    { problem: "Secrets & credentials", primary: "AWS Secrets Manager / HashiCorp Vault", alternative: "Doppler / Infisical", avoid: "Committing API keys to GitHub repository 💀" },
    { problem: "User authentication (web)", primary: "Session + HttpOnly SameSite cookie + Redis", alternative: "JWT (access token 15min TTL + refresh rotation)", avoid: "Long-lived JWT (1 year) with no revocation strategy" },
    { problem: "User authentication (mobile API)", primary: "JWT with short TTL + refresh in secure storage", alternative: "Opaque tokens + database validation", avoid: "Storing JWT in localStorage (XSS vulnerable)" },
    { problem: "Third-party login (Google/GitHub)", primary: "OAuth2 / OIDC (Auth0, Keycloak)", alternative: "Supabase Auth / Firebase Auth", avoid: "Building custom OAuth2 provider from scratch" },
    { problem: "Authorization (who can do what)", primary: "RBAC (Role-Based Access Control)", alternative: "ABAC (Attribute-Based) policies", avoid: "No authorization layer — all users access all data" },
    { problem: "API rate limiting", primary: "Token Bucket in Redis (per user+endpoint)", alternative: "Cloudflare Rate Limiting Rules", avoid: "Unlimited public endpoints with no throttling at all" },
    { problem: "Cascade failure prevention", primary: "Circuit Breaker (Resilience4j / Polly)", alternative: "Bulkhead pattern + timeout", avoid: "Infinite synchronous retry without backoff (amplifies failures)" },
    { problem: "Distributed transactions", primary: "SAGA Pattern (orchestration)", alternative: "SAGA Choreography for simpler flows", avoid: "Two-Phase Commit (2PC) across microservices — blocking SPOF" },
    { problem: "Payment idempotency", primary: "Idempotency-Key header stored in DB/Redis", alternative: "Request fingerprinting + dedup window", avoid: "Assuming 'users won't double-click Pay' 💀" },
    { problem: "Observability stack", primary: "OpenTelemetry → Prometheus + Jaeger + ELK", alternative: "DataDog / New Relic", avoid: "console.log() + SSH grep as production debugging strategy" },
    { problem: "Zero-downtime DB schema migration", primary: "Expand-Contract pattern", alternative: "Blue-Green database deployment", avoid: "ALTER TABLE on 100M-row table during peak hours" },
    { problem: "Deployment strategy (zero downtime)", primary: "Blue-Green deployment", alternative: "Canary deployment", avoid: "SSH into production server + git pull + restart 💀" },
    { problem: "Testing API contracts between services", primary: "Consumer-Driven Contract Tests (Pact)", alternative: "OpenAPI schema validation in CI", avoid: "No contract testing — breaking changes discovered in production" },
    { problem: "E2E browser testing", primary: "Playwright (modern, fast, auto-wait)", alternative: "Cypress (developer-friendly)", avoid: "100% Selenium coverage with zero unit/integration tests" },
    { problem: "Real-time proximity search", primary: "Redis GEOADD + GEORADIUS", alternative: "PostGIS ST_DWithin (PostgreSQL)", avoid: "Fetching all records and filtering lat/long in application code" },
    { problem: "Recommendation engine", primary: "Collaborative Filtering + Graph DB", alternative: "Elasticsearch k-NN search", avoid: "SQL query 'users who bought X also bought Y' at millions of products" },
    { problem: "Social feed (read-heavy)", primary: "Fan-out on Write (push to Redis sorted set)", alternative: "Hybrid: push normal, pull celebrities", avoid: "Pull all followed-user posts and JOIN at read time" },
    { problem: "Offline-first mobile app", primary: "SQLite locally + background sync", alternative: "PouchDB / WatermelonDB", avoid: "No local storage — app unusable without internet" },
    { problem: "GraphQL N+1 query problem", primary: "DataLoader (batch + cache per request)", alternative: "Join Monster for SQL-backed GraphQL", avoid: "Naive resolver executing N DB queries for N parent objects" },
    { problem: "Multi-tenant SaaS data isolation", primary: "Row-Level Security (PostgreSQL RLS)", alternative: "Schema-per-tenant or DB-per-tenant", avoid: "Application-level WHERE tenant_id=X filtering without RLS (bug risk)" }
  ],

  // ===========================================================================
  // TESTING TYPES
  // ===========================================================================
  testingTypes: [
    { type: "Unit Testing", what: "Tests individual functions and classes in isolation with all dependencies mocked.", when: "Every function containing business logic. Aim for 80%+ branch coverage.", tools: "Jest, Vitest, pytest, JUnit 5, Mockito, Go testing, NUnit" },
    { type: "Integration Testing", what: "Tests interaction between your code and real external systems: actual DB, cache, message queue.", when: "All API endpoints, DB repository layer, message queue consumers. Use Testcontainers.", tools: "Testcontainers, Supertest, pytest with real DB, Spring Boot Test, RestAssured" },
    { type: "API / Contract Testing", what: "Validates API responses match their documented contract (OpenAPI spec, Protobuf). Consumer-driven.", when: "Before any service deployment that other teams consume. Critical in microservices.", tools: "Pact, Postman/Newman, Dredd, Schemathesis, Hurl" },
    { type: "End-to-End (E2E) Testing", what: "Simulates real user journeys in a headless browser: login → search → cart → checkout → payment.", when: "Critical user flows only (3-5 flows maximum — slow to maintain). Run in pre-production.", tools: "Playwright, Cypress, Selenium, Puppeteer" },
    { type: "Load Testing", what: "Validates system maintains target performance (< 200ms p99, < 0.1% error rate) at expected peak QPS.", when: "Before every major feature launch, quarterly capacity reviews, before traffic spikes.", tools: "k6, Apache JMeter, Locust, Gatling" },
    { type: "Stress Testing", what: "Drives system beyond design capacity to find exact breaking points and failure recovery behavior.", when: "Before major events (IPL, Black Friday, product launch). After architectural changes.", tools: "k6, Locust, AWS Load Testing Solution, Artillery" },
    { type: "Soak / Endurance Testing", what: "Runs moderate load for 24-72 hours to detect memory leaks, connection pool exhaustion, disk space issues.", when: "Before any service that runs for months without restart. New services with complex state.", tools: "k6 with long duration, JMeter, Grafana monitoring during test" },
    { type: "Security Testing (SAST + DAST)", what: "SAST scans source code for vulnerabilities (SQLi, secrets, CVEs). DAST scans running app via simulated attacks.", when: "SAST: in every CI pipeline. DAST: quarterly or before major releases.", tools: "Snyk, SonarQube, OWASP ZAP, Trivy, Semgrep" },
    { type: "Chaos / Resilience Testing", what: "Intentionally inject failures into production (with safeguards) to find weaknesses before real outages.", when: "After architecture changes. Quarterly game days. Mandatory for 99.99% SLA systems.", tools: "Netflix Chaos Monkey, AWS FIS, Gremlin, Chaos Mesh, LitmusChaos" },
    { type: "Performance Profiling", what: "Identifies CPU hotspots, memory allocation patterns, N+1 queries, GC pauses, flame graph analysis.", when: "When p99 latency degrades and load tests don't explain why. After releasing new code.", tools: "Pyroscope, Node.js clinic.js, Go pprof, JVM Flight Recorder, async-profiler" },
    { type: "Mutation Testing", what: "Verifies test suite catches bugs by introducing small code mutations (< to >, removing if) and checking if tests fail.", when: "For critical business logic (payment calculations, pricing formulas, security checks).", tools: "PIT Mutation Testing (Java), Mutmut (Python), Stryker (JS/TS/C#)" },
    { type: "A/B Testing / Feature Flags", what: "Controlled experiments routing traffic percentage to different versions. Measure statistical impact.", when: "Every major UI/UX change. New recommendation algorithm. Pricing or checkout changes.", tools: "LaunchDarkly, AWS CloudWatch Evidently, Optimizely, Unleash, Statsig" }
  ]
};
