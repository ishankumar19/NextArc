# Evidence-First, Goal-Adaptive Skill Progression Platform
## System Specification (Phase 1 — Amended)

### 1. Vision & Core Philosophy
The platform shifts the paradigm from retrospective logging ("*What have I done?*") to **goal-directed progress intelligence** ("*Where am I now, where do I want to reach, and is my current work actually moving me toward that goal?*").

- **Domain**: Competitive Programming / Data Structures & Algorithms.
- **Evidence Sources**: Codeforces, LeetCode (expandable to CodeChef, AtCoder, GitHub).
- **Core Principle**: Platforms are *evidence sources*, not the core product. The *Goal* is the primary citizen.

---

### 2. Approved Amendments (Milestone 1 Baseline)

1. **PostgreSQL Compatibility with SQLite Local Development**:
   - The Prisma schema is kept strictly PostgreSQL-compatible.
   - Standard data types (`String` -> `text`, `Int` -> `integer`, `Float` -> `double precision`, `Boolean` -> `boolean`, `DateTime` -> `timestamp`, `@default(cuid())`) are used so switching datasource to `postgresql` in production requires no model restructuring.
2. **Global Codeforces Rate Throttling**:
   - Centralized, cross-request throttling layer enforcing the official Codeforces limit of at most **1 request per 2 seconds**.
   - Queue-based serial dispatcher with exponential backoff and retries. Concurrent user syncs must never bypass or flood this shared rate limiter.
3. **Platform Capabilities & LeetCode Best-Effort Tiering**:
   - LeetCode is treated as a partial/best-effort evidence source (no official open API; rate-limited GraphQL and sessionless public endpoints).
   - `PlatformCapabilities` and `DataCompleteness` metadata explicitly identify what metrics are reliably provided vs. estimated/unsupported. Analytics will never imply certainty where data is incomplete.
4. **Versioned `ProgressContext` v1**:
   - Structured payload versioned with `schemaVersion: "1.0.0"`.
   - Includes `generatedAt`, `dataFreshness` (per-platform sync age and freshness category), and `platformCompleteness` / data quality report.
5. **Defensive Submission Uniqueness**:
   - Submissions are uniquely constrained on `[userId, platform, externalSubmissionId]`.

---

### 3. Core Domain Directory Structure
```text
src/
├── core/                         # Domain models, canonical types, error models, and taxonomies
│   ├── types.ts
│   └── errors.ts
├── platforms/                    # External platform adapters & communication
│   ├── platform.types.ts         # Generic PlatformAdapter, PlatformProfile, Raw models
│   ├── capabilities.ts           # PlatformCapabilities, DataCompleteness & quality reports
│   ├── throttler.ts              # Global 1 req / 2s Codeforces throttler with backoff
│   └── adapters/                 # Adapters implemented in Milestone 2
├── normalization/                # Normalizes raw platform objects into canonical entities
│   ├── submission.normalizer.ts  # (Milestone 2)
│   ├── topic.normalizer.ts       # (Milestone 2)
│   └── difficulty.normalizer.ts  # (Milestone 2)
├── sync/                         # Ingestion engine, delta sync, and snapshotting (Milestone 3)
├── analytics/                    # Deterministic facts engine (Milestone 3)
├── goals/                        # Goal domain, supporting evidence & context builder
│   ├── goal.types.ts
│   ├── goal.service.ts
│   └── progress-context.types.ts # ProgressContext v1 specification
├── app/                          # Next.js App Router (UI & API routes)
└── components/                   # UI components
```

---

### 4. Database Schema (Prisma)
- **User**: Primary identity (`id`, `email`, `name`, timestamps).
- **Goal**:
  - `id`, `userId`, `title`, `category`
  - `targetMetric`, `targetValue`, `initialValue`
  - `startDate`, `deadline`, `availableHoursPerWeek`
  - `status` (`active`, `completed`, `abandoned`)
- **PlatformConnection**:
  - `id`, `userId`, `platform` (`codeforces` | `leetcode`), `username`
  - `status` (`connected` | `syncing` | `error`), `lastError`, `lastSyncedAt`, `profileData`
  - Unique constraint: `[userId, platform]`
- **Problem**:
  - `id`, `platform`, `externalProblemId`, `title`, `difficulty`, `numericDifficulty`, `topics`, `rawTags`
  - Unique constraint: `[platform, externalProblemId]`
- **NormalizedSubmission**:
  - `id`, `userId`, `platform`, `externalSubmissionId`
  - `problemId`, `problemTitle`, `verdict`, `accepted`, `language`, `difficulty`, `topics`, `timestamp`, `contestId`
  - Defensive Unique constraint: `[userId, platform, externalSubmissionId]`
- **ContestHistory**:
  - `id`, `userId`, `platform`, `contestId`, `contestName`, `rank`, `oldRating`, `newRating`, `ratingChange`, `timestamp`
  - Unique constraint: `[userId, platform, contestId]`

---

### 5. ProgressContext v1 Schema Definition
- `schemaVersion`: `"1.0.0"`
- `generatedAt`: ISO 8601 string
- `dataFreshness`: Per-platform timestamp and freshness grade (`fresh`, `stale`, `unknown`)
- `platformCompleteness`: Per-platform completeness rating (`complete`, `partial`, `unavailable`) and missing capabilities
- `goal`: Active goal with target, current value, gap (+/-), and days remaining
- `currentState`: Live platform statistics
- `recentActivity`: 7-day and 30-day activity volume, active days, current streak
- `difficultyPerformance`: Codeforces rating bins (800..1500+) and LeetCode tiers (Easy/Medium/Hard)
- `topicPerformance`: Attempted, solved, and acceptance rate per canonical topic
- `contestPerformance`: Contest count, rating deltas, recent contest results
- `supportingEvidence`: Evidence signals indicating goal alignment (target-range problems solved, active days, rating momentum)

---

### 6. Phase 1 Implementation Order
- **Milestone 1**: Foundations, Schema & Contracts (Steps 1–3 + Amendments 1–5) [CURRENT]
- **Milestone 2**: Platform Adapters, Throttler & Normalization (Steps 4–7)
- **Milestone 3**: Sync Engine, Deterministic Analytics & Context Builder (Steps 8–11)
- **Milestone 4**: Goal-First UI, Unified Feed & API Routes (Steps 12–16)
- **Milestone 5**: Verification, Live Testing & Freeze (Steps 17–20)
