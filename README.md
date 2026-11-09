# Progress — Evidence-First, Goal-Adaptive Skill Progression Platform

> **Release**: `v0.2.0-phase2` (Phase 2 Frozen Baseline)

Progress is an evidence-first skill progression platform for Competitive Programming and Data Structures & Algorithms. It shifts tracking from passive logging (*"What did I do?"*) to goal-directed intelligence (*"Where am I relative to my goal, what should I do next, and did the previous plan work?"*).

---

## Architecture & Verification Status

### Phase 1: Evidence Engine (Frozen & Live-Verified)
- **Platforms**: Codeforces (authoritative, strict 1 req / 2s global throttler) and LeetCode (best-effort, bounded history).
- **Normalization**: Canonical topics (12 slugs), discrete & continuous difficulty preservation, standardized verdicts.
- **Deterministic Analytics**: Streak, volume, topic distributions, difficulty bins, contest trends.
- **Contract**: `ProgressContextV1` (`schemaVersion: "1.0.0"`) with freshness and data completeness metadata.

### Phase 2: Adaptive Planning System (Frozen Baseline)
- **Signal Engine**: Deterministic extraction of factual signals (`difficulty_dropoff`, `underexposed_topic`, `difficulty_stagnation`, `contest_trends`, `low_contest_frequency`) with `EvidenceConfidence` guardrails.
- **Contracts**: `AdaptivePlanV1` (`schemaVersion: "1.0.0"`), `PlanTask`, `PlanOutcome`.
- **Task Evidence Matcher**: Deterministic matching of external activity to tasks without double-counting.
- **Evaluation & Adaptation**: Deterministic `PlanOutcome` separating task completion from rating outcome improvement.

### ⚠️ Important Verification Truth (Phase 2 LLM Integration Status)
1. **Deterministic Planner**: **VERIFIED** across unit, failure, boundary, and 3-window historical replay tests.
2. **LLM Provider Abstraction**: **IMPLEMENTED** (supporting Google Gemini and OpenAI).
3. **LLM Structured-Output & Failure Handling**: **TESTED** through simulated responses (malformed JSON, markdown fences, timeouts, HTTP 429/500, refusals, fallback to deterministic planner).
4. **Live LLM Planning with Real Provider Credentials**: **NOT YET VERIFIED**. The system does not claim live LLM verification until a controlled verification against production credentials has been completed.

---

## Tech Stack
- **Framework**: Next.js 15 (App Router), React 19, Tailwind CSS
- **ORM & Database**: Prisma 6, SQLite (local development), PostgreSQL-compatible production schema
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest (161 automated unit, integration, red-team, and production resilience tests)

---

## Production Deployment & Scaling (5–10k Concurrent Users)

The platform is hardened for high-concurrency production deployments (5,000–10,000 live users):

### 1. Database Connection Pooling
- Production must use PostgreSQL (`prisma/schema.postgresql.prisma`).
- Configure pooling via PgBouncer or append connection parameters to `DATABASE_URL`:
  ```
  DATABASE_URL="postgresql://user:password@pg-bouncer-host:6432/progress_db?connection_limit=25&pool_timeout=10"
  ```
- Indexes are provisioned on `[userId, status]`, `[userId, platform, timestamp]`, `[userId, accepted]`, `[userId]`, `[planId]`, and `[expires]` on sessions.

### 2. Multi-Tier Concurrency Protection
- **Sliding-Window Rate Limiting** (`src/lib/rate-limit.ts`):
  - Auth routes (`/api/auth/*`): 10 req/min
  - External sync routes (`/api/platforms/*/sync`): 30 req/min
  - Read routes (`/api/dashboard`, `/api/analytics/*`): 100 req/min
- **External Platform Sync Concurrency Lock** (`src/lib/sync-lock.ts`):
  - Prevents race conditions or external rate limit burns; overlapping syncs return `202 Accepted` immediately.
- **In-Memory TTL Cache** (`src/lib/cache.ts`):
  - Dashboard responses cached per-user for 60s
  - Analytics cached per-user for 300s
  - ProgressContext cached per-goal for 120s
- **Probabilistic Session Cleanup**:
  - Automatically sweeps expired database sessions asynchronously on 1% of validation calls.

### 3. Health & Observability
- **Health Check Endpoint**: `GET /api/health` returns status, database connectivity, latency, and timestamp (ideal for AWS ALB, GCP Cloud Run, or Kubernetes readiness probes).
- **Structured JSON Logging** (`src/lib/logger.ts`):
  - Emits JSON structured logs in production (`NODE_ENV=production`) with request timings, context, and user ids; redacts sensitive credentials.
- **Security Headers & Boundaries**:
  - `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
  - Next.js Error Boundary (`src/app/error.tsx`) and 404 page (`src/app/not-found.tsx`).

### 4. Required Production Environment Variables
```env
NODE_ENV="production"
DATABASE_URL="postgresql://user:password@host:5432/progress_db?connection_limit=25&pool_timeout=10"
AUTH_SECRET="<random-32-byte-hex-secret>"
ALLOW_DEV_DEMO_USER="false"
```

