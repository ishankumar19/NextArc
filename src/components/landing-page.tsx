"use client";

import Link from "next/link";
import {
  Target,
  Layers,
  BarChart3,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Zap,
  Flame,
  Award,
  ExternalLink,
  ChevronRight,
  Compass,
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="space-y-24 sm:space-y-32 py-4 sm:py-8 animate-in fade-in duration-300">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="text-center space-y-8 max-w-4xl mx-auto pt-4 sm:pt-10">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F1EB] border border-[#BCE0D4] text-[#145B4D] text-xs font-mono font-medium shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#176B5B] animate-pulse"></span>
          <span>COMPETITIVE PROGRAMMING INTELLIGENCE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172923] tracking-tight leading-[1.12]">
          Solve with purpose. <br className="hidden sm:inline" />
          <span className="text-[#176B5B]">Grow with Progress.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#52665D] max-w-2xl mx-auto leading-relaxed">
          Your competitive programming journey, understood. Connect your Codeforces and LeetCode accounts, uncover your strengths and weaknesses, and get actionable insights to move towards your next rating milestone.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/login?tab=register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#176B5B] hover:bg-[#115246] text-white font-semibold text-sm sm:text-base transition shadow-sm shadow-[#176B5B]/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#F8FAF7] text-[#172923] font-semibold text-sm sm:text-base transition border border-[#E2E8E3] shadow-subtle flex items-center justify-center"
          >
            Explore Features
          </a>
        </div>

        {/* Trust Markers */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#64746C]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#176B5B]" />
            <span>Connects via public handles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#176B5B]" />
            <span>No password required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#176B5B]" />
            <span>Zero vanity metrics</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRODUCT PREVIEW
          ========================================================================= */}
      <section id="preview" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B5B]">
              Workspace Preview
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172923] tracking-tight">
              An evidence-first performance workspace
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F8FAF7] border border-[#E2E8E3] text-[11px] font-mono text-[#52665D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#176B5B]"></span>
            <span>ILLUSTRATIVE INTERACTIVE PREVIEW</span>
          </div>
        </div>

        {/* Main Mockup Container */}
        <div className="bg-white border border-[#E2E8E3] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-elevated space-y-8">
          {/* Top Barometer & Target Milestone */}
          <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-6 lg:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8E3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#176B5B] text-white flex items-center justify-center font-bold shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#52665D] font-semibold">
                    Primary Goal Horizon
                  </div>
                  <div className="text-lg font-bold text-[#172923]">
                    Codeforces Specialist (1400)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-[#E5F1EB] text-[#145B4D] border border-[#BCE0D4] px-3 py-1 rounded-full font-semibold">
                  42 Days Remaining
                </span>
                <span className="text-xs font-mono bg-[#FDF8EE] text-[#96601A] border border-[#F3DCB1] px-3 py-1 rounded-full font-semibold">
                  +258 Rating Deficit
                </span>
              </div>
            </div>

            {/* Visual Barometer Gauge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E2E8E3] rounded-lg p-4">
                <div className="text-xs text-[#52665D] font-medium">Verified Current Rating</div>
                <div className="text-2xl font-extrabold text-[#172923] font-mono mt-1">1142</div>
                <div className="text-[11px] text-[#176B5B] font-medium mt-0.5">Newbie → Pupil</div>
              </div>
              <div className="bg-white border border-[#E2E8E3] rounded-lg p-4">
                <div className="text-xs text-[#52665D] font-medium">Target Milestone Rating</div>
                <div className="text-2xl font-extrabold text-[#176B5B] font-mono mt-1">1400</div>
                <div className="text-[11px] text-[#52665D] font-medium mt-0.5">Specialist Threshold</div>
              </div>
              <div className="bg-white border border-[#E2E8E3] rounded-lg p-4">
                <div className="text-xs text-[#52665D] font-medium">Next Milestone Focus</div>
                <div className="text-sm font-bold text-[#172923] mt-1.5 leading-snug">
                  &gt;=60% solve rate on 1200 rated
                </div>
                <div className="text-[11px] text-[#C58A36] font-medium mt-0.5">Primary bottleneck: DP</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#52665D]">
                <span>Progress towards target milestone</span>
                <span className="font-semibold text-[#172923]">62% Completed</span>
              </div>
              <div className="w-full bg-[#E2E8E3] rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#176B5B] h-2.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>
          </div>

          {/* Grid: Daily Plan Task + Trajectory Chart + Topic Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Today's Curated Practice & Trajectory */}
            <div className="lg:col-span-7 space-y-6">
              {/* Daily Task Card */}
              <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#176B5B]" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#172923]">
                      Today&apos;s Goal-Adaptive Practice
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-[#E5F1EB] text-[#145B4D] px-2 py-0.5 rounded font-medium">
                    ROTATES DAILY
                  </span>
                </div>

                <div className="bg-white border border-[#E2E8E3] rounded-lg p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-semibold text-sm text-[#172923]">
                      1842C — Tenzing and Balls
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F8FAF7] border border-[#E2E8E3] text-[#172923] font-semibold">
                        Rating: 1200
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E5F1EB] text-[#145B4D]">
                        dynamic programming
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#52665D] leading-relaxed">
                    <span className="font-semibold text-[#172923]">Why this problem:</span> Your solve rate at rating 1200 drops to 38%, and dynamic programming has limited recent exposure. Solving this satisfies today&apos;s milestone criteria.
                  </p>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-xs text-[#8E9F97] font-mono">Codeforces • Div. 2 Problem C</span>
                    <span className="text-xs font-semibold text-[#176B5B] flex items-center gap-1 hover:underline cursor-pointer">
                      <span>Solve Problem</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Trajectory Simulation */}
              <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#176B5B]" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#172923]">
                      Codeforces Contest Trajectory
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#52665D]">
                    Current: <strong className="text-[#172923]">1142</strong> • Peak: <strong className="text-[#172923]">1180</strong>
                  </span>
                </div>

                {/* SVG Visual Curve */}
                <div className="h-36 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#176B5B" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#176B5B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#E2E8E3" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#E2E8E3" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#E2E8E3" strokeDasharray="3 3" />
                    {/* Area */}
                    <polygon
                      points="0,110 50,105 120,95 200,80 280,68 360,75 430,45 500,35 500,120 0,120"
                      fill="url(#previewGrad)"
                    />
                    {/* Line */}
                    <polyline
                      fill="none"
                      stroke="#176B5B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,110 50,105 120,95 200,80 280,68 360,75 430,45 500,35"
                    />
                    {/* Target line */}
                    <line x1="0" y1="15" x2="500" y2="15" stroke="#C58A36" strokeWidth="1.5" strokeDasharray="4 4" />
                  </svg>
                  <div className="absolute right-2 top-0 text-[10px] font-mono text-[#96601A] font-semibold bg-[#FDF8EE] px-1.5 py-0.5 rounded border border-[#F3DCB1]">
                    Target: 1400
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Topic Mastery & Recent Submissions */}
            <div className="lg:col-span-5 space-y-6">
              {/* Topic Mastery */}
              <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#176B5B]" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#172923]">
                      Skill Intelligence
                    </span>
                  </div>
                  <span className="text-[11px] text-[#52665D] font-mono">5 Topics Evaluated</span>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#172923]">Implementation</span>
                      <span className="font-mono text-[#176B5B] font-semibold">84% Solve Rate</span>
                    </div>
                    <div className="w-full bg-[#E2E8E3] rounded-full h-1.5">
                      <div className="bg-[#176B5B] h-1.5 rounded-full" style={{ width: "84%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#172923]">Math &amp; Number Theory</span>
                      <span className="font-mono text-[#176B5B] font-semibold">71% Solve Rate</span>
                    </div>
                    <div className="w-full bg-[#E2E8E3] rounded-full h-1.5">
                      <div className="bg-[#176B5B] h-1.5 rounded-full" style={{ width: "71%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#172923]">Two Pointers / Binary Search</span>
                      <span className="font-mono text-[#C58A36] font-semibold">44% Solve Rate</span>
                    </div>
                    <div className="w-full bg-[#E2E8E3] rounded-full h-1.5">
                      <div className="bg-[#C58A36] h-1.5 rounded-full" style={{ width: "44%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#172923]">Dynamic Programming</span>
                      <span className="font-mono text-[#C65D5D] font-semibold">38% (Drop-off)</span>
                    </div>
                    <div className="w-full bg-[#E2E8E3] rounded-full h-1.5">
                      <div className="bg-[#C65D5D] h-1.5 rounded-full" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Submissions Stream */}
              <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#172923]">
                    Recent Evidence Feed
                  </span>
                  <span className="text-[11px] text-[#52665D] font-mono">Live Ingestion</span>
                </div>

                <div className="space-y-2">
                  <div className="bg-white border border-[#E2E8E3] rounded-lg p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#176B5B]"></span>
                      <span className="font-semibold text-[#172923]">1842C</span>
                      <span className="text-[#52665D]">Tenzing and Balls</span>
                    </div>
                    <span className="font-mono text-[#145B4D] bg-[#E5F1EB] px-2 py-0.5 rounded text-[10px] font-semibold">
                      ACCEPTED
                    </span>
                  </div>

                  <div className="bg-white border border-[#E2E8E3] rounded-lg p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#C58A36]" />
                      <span className="font-semibold text-[#172923]">Round #918</span>
                      <span className="text-[#52665D]">Rank 842</span>
                    </div>
                    <span className="font-mono text-[#176B5B] bg-[#E5F1EB] px-2 py-0.5 rounded text-[10px] font-bold">
                      +64 CF RATING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES SECTION
          ========================================================================= */}
      <section id="features" className="space-y-12 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B5B]">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172923] tracking-tight">
            Designed for genuine skill progression
          </h2>
          <p className="text-sm sm:text-base text-[#52665D] leading-relaxed">
            Progress replaces random problem solving with an evidence-based feedback loop that diagnoses your bottlenecks and accelerates your rating gains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 shadow-subtle space-y-4 hover:border-[#CCE4D8] transition">
            <div className="w-12 h-12 rounded-xl bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#172923]">
                1. Goal-Oriented Progression
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                Declare a concrete rating goal and horizon deadline. Progress organizes your entire training cycle around bridging that exact gap rather than aimless grinding.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 shadow-subtle space-y-4 hover:border-[#CCE4D8] transition">
            <div className="w-12 h-12 rounded-xl bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#172923]">
                2. Codeforces &amp; LeetCode Sync
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                Connect both platforms via public handles. Unified ingestion normalizes problem difficulties, submission history, and contest metrics into one evidence pipeline.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 shadow-subtle space-y-4 hover:border-[#CCE4D8] transition">
            <div className="w-12 h-12 rounded-xl bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#172923]">
                3. Evidence-Based Skill Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                Every insight is backed by actual submissions. Discover your precise difficulty drop-off threshold and uncover topic weaknesses with zero vanity metrics.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 shadow-subtle space-y-4 hover:border-[#CCE4D8] transition">
            <div className="w-12 h-12 rounded-xl bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#172923]">
                4. Rating &amp; Activity Analytics
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                Visualize rating trajectories across contests, track daily consistency with a 52-week activity heatmap, and understand your real momentum over time.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 shadow-subtle space-y-4 hover:border-[#CCE4D8] transition md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#172923]">
                5. Personalized Practice Recommendations
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed max-w-xl">
                Every day, Progress curates fresh problems calibrated to your current rating and weak topics, giving you deliberate practice with zero decision fatigue. Direct solve links make daily training effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="space-y-12 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B5B]">
            Three Simple Steps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172923] tracking-tight">
            How Progress accelerates your training
          </h2>
          <p className="text-sm sm:text-base text-[#52665D] leading-relaxed">
            Go from scattered practice to systematic improvement in less than two minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-8 shadow-subtle space-y-5 relative">
            <div className="w-10 h-10 rounded-xl bg-[#176B5B] text-white font-mono font-bold text-base flex items-center justify-center shadow-sm shadow-[#176B5B]/25">
              1
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#172923]">
                Connect your handles
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                Enter your public Codeforces and LeetCode handles. No passwords or tokens are needed. Progress syncs your full submission and contest record safely.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-8 shadow-subtle space-y-5 relative">
            <div className="w-10 h-10 rounded-xl bg-[#176B5B] text-white font-mono font-bold text-base flex items-center justify-center shadow-sm shadow-[#176B5B]/25">
              2
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#172923]">
                Understand your skills
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                The engine evaluates where your solve rate drops across problem difficulties, which topics bottleneck your contests, and what is holding your rating back.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-8 shadow-subtle space-y-5 relative">
            <div className="w-10 h-10 rounded-xl bg-[#176B5B] text-white font-mono font-bold text-base flex items-center justify-center shadow-sm shadow-[#176B5B]/25">
              3
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-[#172923]">
                Follow actionable goals
              </h3>
              <p className="text-xs sm:text-sm text-[#52665D] leading-relaxed">
                Receive curated daily problem tasks tailored to bridge your exact deficit. Every accepted solution updates your verified milestone evidence automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA
          ========================================================================= */}
      <section className="bg-white border border-[#E2E8E3] rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-8 shadow-elevated">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F1EB] border border-[#BCE0D4] text-[#145B4D] text-xs font-mono font-semibold">
            GET STARTED TODAY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172923] tracking-tight leading-tight">
            Your next milestone starts with understanding where you stand.
          </h2>
          <p className="text-sm sm:text-base text-[#52665D] max-w-xl mx-auto leading-relaxed">
            Join competitive programmers who have traded aimless grinding for deliberate, evidence-backed skill advancement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login?tab=register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#176B5B] hover:bg-[#115246] text-white font-semibold text-base transition shadow-md shadow-[#176B5B]/30 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start your journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </Link>
          <Link
            href="/login?tab=login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F8FAF7] hover:bg-[#F0F4F1] text-[#172923] font-semibold text-base transition border border-[#E2E8E3]"
          >
            Sign in to existing account
          </Link>
        </div>

        <div className="text-xs text-[#64746C] pt-2">
          Takes under 60 seconds • Free to use • No credit card required
        </div>
      </section>

      {/* =========================================================================
          PRODUCT PHILOSOPHY & FOOTER
          ========================================================================= */}
      <footer className="pt-8 border-t border-[#E2E8E3] space-y-8 text-xs text-[#52665D]">
        <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-2xl p-6 sm:p-8 text-center space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#176B5B] font-semibold">
            The Progress Philosophy
          </div>
          <p className="text-base sm:text-lg font-medium text-[#172923] italic max-w-2xl mx-auto">
            &ldquo;Don&apos;t just track how many problems someone solves. Understand whether they&apos;re actually getting better.&rdquo;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#176B5B] flex items-center justify-center text-white">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 16.5c1.5 1.26 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0" />
                <path d="M7 11.5L12 6.5L17 11.5" />
                <path d="M12 6.5V17" />
              </svg>
            </div>
            <span className="font-bold text-[#172923]">PROGRESS INTELLIGENCE</span>
            <span className="text-[#8E9F97]">• Evidence-first progression</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#features" className="hover:text-[#176B5B] transition">Features</a>
            <a href="#preview" className="hover:text-[#176B5B] transition">Preview</a>
            <a href="#how-it-works" className="hover:text-[#176B5B] transition">How It Works</a>
            <Link href="/login?tab=login" className="hover:text-[#176B5B] transition">Sign In</Link>
            <Link href="/login?tab=register" className="hover:text-[#176B5B] transition font-semibold text-[#176B5B]">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
