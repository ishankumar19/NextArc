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
- **Testing**: Vitest (134 automated unit, integration, and red-team tests)
