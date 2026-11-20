export interface CuratedProblem {
  id: string; // e.g. "158A" or "two-sum"
  platform: "codeforces" | "leetcode";
  name: string; // e.g. "Next Round"
  rating: number; // e.g. 800 (for LeetCode: 1 = Easy, 2 = Med, 3 = Hard)
  difficultyTier?: "Easy" | "Medium" | "Hard";
  topics: string[];
  url: string;
}

/**
 * Authentic, curated catalogue of verified practice problems across difficulty brackets and core topics.
 */
export const PROBLEM_CATALOG: CuratedProblem[] = [
  // ==========================================
  // CODEFORCES - Rating 800
  // ==========================================
  // 800 - greedy
  { id: "158A", platform: "codeforces", name: "Next Round", rating: 800, topics: ["greedy", "implementation"], url: "https://codeforces.com/problemset/problem/158/A" },
  { id: "231A", platform: "codeforces", name: "Team", rating: 800, topics: ["greedy", "brute-force"], url: "https://codeforces.com/problemset/problem/231/A" },
  { id: "112A", platform: "codeforces", name: "Petya and Strings", rating: 800, topics: ["greedy", "strings"], url: "https://codeforces.com/problemset/problem/112/A" },
  { id: "282A", platform: "codeforces", name: "Bit++", rating: 800, topics: ["greedy", "implementation"], url: "https://codeforces.com/problemset/problem/282/A" },
  { id: "1742A", platform: "codeforces", name: "Sum", rating: 800, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/1742/A" },
  { id: "1791A", platform: "codeforces", name: "Codeforces Checking", rating: 800, topics: ["greedy", "strings"], url: "https://codeforces.com/problemset/problem/1791/A" },
  { id: "1850A", platform: "codeforces", name: "To My Critics", rating: 800, topics: ["greedy", "sortings"], url: "https://codeforces.com/problemset/problem/1850/A" },
  { id: "1915A", platform: "codeforces", name: "Odd One Out", rating: 800, topics: ["greedy", "bitmasks"], url: "https://codeforces.com/problemset/problem/1915/A" },

  // 800 - two-pointers
  { id: "381A", platform: "codeforces", name: "Sereja and Dima", rating: 800, topics: ["two-pointers", "greedy"], url: "https://codeforces.com/problemset/problem/381/A" },
  { id: "1475A", platform: "codeforces", name: "Odd Divisor", rating: 800, topics: ["two-pointers", "math"], url: "https://codeforces.com/problemset/problem/1475/A" },
  { id: "1742C", platform: "codeforces", name: "Stripes", rating: 800, topics: ["two-pointers", "implementation"], url: "https://codeforces.com/problemset/problem/1742/C" },
  { id: "1807D", platform: "codeforces", name: "Odd Queries", rating: 800, topics: ["two-pointers", "prefix-sum"], url: "https://codeforces.com/problemset/problem/1807/D" },
  { id: "1829B", platform: "codeforces", name: "Blank Space", rating: 800, topics: ["two-pointers", "implementation"], url: "https://codeforces.com/problemset/problem/1829/B" },
  { id: "1985B", platform: "codeforces", name: "Maximum Multiple Sum", rating: 800, topics: ["two-pointers", "math"], url: "https://codeforces.com/problemset/problem/1985/B" },

  // 800 - binary-search / math / implementation
  { id: "4A", platform: "codeforces", name: "Watermelon", rating: 800, topics: ["math", "brute-force"], url: "https://codeforces.com/problemset/problem/4/A" },
  { id: "71A", platform: "codeforces", name: "Way Too Long Words", rating: 800, topics: ["strings", "implementation"], url: "https://codeforces.com/problemset/problem/71/A" },
  { id: "263A", platform: "codeforces", name: "Beautiful Matrix", rating: 800, topics: ["implementation"], url: "https://codeforces.com/problemset/problem/263/A" },
  { id: "1328A", platform: "codeforces", name: "Divisibility Problem", rating: 800, topics: ["math"], url: "https://codeforces.com/problemset/problem/1328/A" },
  { id: "1335A", platform: "codeforces", name: "Candies and Two Sisters", rating: 800, topics: ["math"], url: "https://codeforces.com/problemset/problem/1335/A" },
  { id: "1676B", platform: "codeforces", name: "Equal Candies", rating: 800, topics: ["binary-search", "greedy"], url: "https://codeforces.com/problemset/problem/1676/B" },
  { id: "1703A", platform: "codeforces", name: "YES or YES?", rating: 800, topics: ["implementation", "strings"], url: "https://codeforces.com/problemset/problem/1703/A" },
  { id: "1926A", platform: "codeforces", name: "Vlad and the Best of Five", rating: 800, topics: ["binary-search", "strings"], url: "https://codeforces.com/problemset/problem/1926/A" },

  // ==========================================
  // CODEFORCES - Rating 900
  // ==========================================
  // 900 - greedy
  { id: "96A", platform: "codeforces", name: "Football", rating: 900, topics: ["greedy", "strings"], url: "https://codeforces.com/problemset/problem/96/A" },
  { id: "160A", platform: "codeforces", name: "Twins", rating: 900, topics: ["greedy", "sortings"], url: "https://codeforces.com/problemset/problem/160/A" },
  { id: "318A", platform: "codeforces", name: "Even Odds", rating: 900, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/318/A" },
  { id: "133A", platform: "codeforces", name: "HQ9+", rating: 900, topics: ["greedy", "implementation"], url: "https://codeforces.com/problemset/problem/133/A" },
  { id: "1878A", platform: "codeforces", name: "How Much Does Daytona Cost?", rating: 900, topics: ["greedy"], url: "https://codeforces.com/problemset/problem/1878/A" },
  { id: "1950C", platform: "codeforces", name: "Clock Conversion", rating: 900, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/1950/C" },

  // 900 - two-pointers
  { id: "1475B", platform: "codeforces", name: "New Year's Number", rating: 900, topics: ["two-pointers", "math"], url: "https://codeforces.com/problemset/problem/1475/B" },
  { id: "1692C", platform: "codeforces", name: "Where's the Bishop?", rating: 900, topics: ["two-pointers", "implementation"], url: "https://codeforces.com/problemset/problem/1692/C" },
  { id: "1722C", platform: "codeforces", name: "Word Game", rating: 900, topics: ["two-pointers", "data-structures"], url: "https://codeforces.com/problemset/problem/1722/C" },
  { id: "1850D", platform: "codeforces", name: "Balanced Round", rating: 900, topics: ["two-pointers", "binary-search", "sortings"], url: "https://codeforces.com/problemset/problem/1850/D" },
  { id: "1873D", platform: "codeforces", name: "1D Eraser", rating: 900, topics: ["two-pointers", "greedy"], url: "https://codeforces.com/problemset/problem/1873/D" },

  // 900 - binary-search / math
  { id: "479A", platform: "codeforces", name: "Expression", rating: 900, topics: ["binary-search", "brute-force", "math"], url: "https://codeforces.com/problemset/problem/479/A" },
  { id: "580A", platform: "codeforces", name: "Kefa and First Steps", rating: 900, topics: ["binary-search", "dynamic-programming"], url: "https://codeforces.com/problemset/problem/580/A" },
  { id: "1374B", platform: "codeforces", name: "Multiply by 2, divide by 6", rating: 900, topics: ["math", "binary-search"], url: "https://codeforces.com/problemset/problem/1374/B" },
  { id: "1915C", platform: "codeforces", name: "Can I Square?", rating: 900, topics: ["binary-search", "math"], url: "https://codeforces.com/problemset/problem/1915/C" },

  // ==========================================
  // CODEFORCES - Rating 1000
  // ==========================================
  // 1000 - greedy
  { id: "1A", platform: "codeforces", name: "Theatre Square", rating: 1000, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/1/A" },
  { id: "118A", platform: "codeforces", name: "String Task", rating: 1000, topics: ["greedy", "strings"], url: "https://codeforces.com/problemset/problem/118/A" },
  { id: "131A", platform: "codeforces", name: "cAPS lOCK", rating: 1000, topics: ["greedy", "strings", "implementation"], url: "https://codeforces.com/problemset/problem/131/A" },
  { id: "1703D", platform: "codeforces", name: "Double Strings", rating: 1000, topics: ["greedy", "data-structures"], url: "https://codeforces.com/problemset/problem/1703/D" },
  { id: "1840C", platform: "codeforces", name: "Ski Resort", rating: 1000, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/1840/C" },

  // 1000 - two-pointers & binary-search
  { id: "1791D", platform: "codeforces", name: "Distinct Split", rating: 1000, topics: ["two-pointers", "greedy", "strings"], url: "https://codeforces.com/problemset/problem/1791/D" },
  { id: "1829D", platform: "codeforces", name: "Gold Rush", rating: 1000, topics: ["two-pointers", "dfs-and-similar"], url: "https://codeforces.com/problemset/problem/1829/D" },
  { id: "1676D", platform: "codeforces", name: "X-Sum", rating: 1000, topics: ["binary-search", "implementation"], url: "https://codeforces.com/problemset/problem/1676/D" },
  { id: "1971C", platform: "codeforces", name: "Clock and Strings", rating: 1000, topics: ["binary-search", "geometry"], url: "https://codeforces.com/problemset/problem/1971/C" },

  // ==========================================
  // CODEFORCES - Rating 1100
  // ==========================================
  { id: "158B", platform: "codeforces", name: "Taxi", rating: 1100, topics: ["greedy", "special-problem"], url: "https://codeforces.com/problemset/problem/158/B" },
  { id: "706B", platform: "codeforces", name: "Interesting drink", rating: 1100, topics: ["binary-search", "dp"], url: "https://codeforces.com/problemset/problem/706/B" },
  { id: "1327A", platform: "codeforces", name: "Sum of Odd Integers", rating: 1100, topics: ["math", "greedy"], url: "https://codeforces.com/problemset/problem/1327/A" },
  { id: "1669F", platform: "codeforces", name: "Eating Candies", rating: 1100, topics: ["two-pointers", "binary-search"], url: "https://codeforces.com/problemset/problem/1669/F" },
  { id: "1744C", platform: "codeforces", name: "Traffic Light", rating: 1100, topics: ["two-pointers", "greedy"], url: "https://codeforces.com/problemset/problem/1744/C" },
  { id: "1873E", platform: "codeforces", name: "Building an Aquarium", rating: 1100, topics: ["binary-search"], url: "https://codeforces.com/problemset/problem/1873/E" },
  { id: "1927C", platform: "codeforces", name: "Choose the Different Ones!", rating: 1100, topics: ["greedy", "sortings"], url: "https://codeforces.com/problemset/problem/1927/C" },

  // ==========================================
  // CODEFORCES - Rating 1200
  // ==========================================
  { id: "492B", platform: "codeforces", name: "Vanya and Lanterns", rating: 1200, topics: ["binary-search", "sortings"], url: "https://codeforces.com/problemset/problem/492/B" },
  { id: "466A", platform: "codeforces", name: "Cheap Travel", rating: 1200, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/466/A" },
  { id: "1352B", platform: "codeforces", name: "Same Parity Summands", rating: 1200, topics: ["math", "greedy"], url: "https://codeforces.com/problemset/problem/1352/B" },
  { id: "1520D", platform: "codeforces", name: "Same Differences", rating: 1200, topics: ["two-pointers", "math", "data-structures"], url: "https://codeforces.com/problemset/problem/1520/D" },
  { id: "1676E", platform: "codeforces", name: "Eating Queries", rating: 1200, topics: ["binary-search", "greedy"], url: "https://codeforces.com/problemset/problem/1676/E" },
  { id: "1742E", platform: "codeforces", name: "Scuza", rating: 1200, topics: ["binary-search", "prefix-sum"], url: "https://codeforces.com/problemset/problem/1742/E" },
  { id: "1807G2", platform: "codeforces", name: "Subsequence Addition (Hard)", rating: 1200, topics: ["greedy", "sortings"], url: "https://codeforces.com/problemset/problem/1807/G2" },

  // ==========================================
  // CODEFORCES - Rating 1300
  // ==========================================
  { id: "230B", platform: "codeforces", name: "T-primes", rating: 1300, topics: ["binary-search", "math", "number-theory"], url: "https://codeforces.com/problemset/problem/230/B" },
  { id: "451B", platform: "codeforces", name: "Sort the Array", rating: 1300, topics: ["two-pointers", "sortings"], url: "https://codeforces.com/problemset/problem/451/B" },
  { id: "1360D", platform: "codeforces", name: "Buying Shovels", rating: 1300, topics: ["greedy", "math"], url: "https://codeforces.com/problemset/problem/1360/D" },
  { id: "1352D", platform: "codeforces", name: "Alice, Bob and Candies", rating: 1300, topics: ["two-pointers", "greedy"], url: "https://codeforces.com/problemset/problem/1352/D" },
  { id: "1850F", platform: "codeforces", name: "We Were Both Children", rating: 1300, topics: ["binary-search", "math"], url: "https://codeforces.com/problemset/problem/1850/F" },
  { id: "1703F", platform: "codeforces", name: "Yet Another Problem About Pairs", rating: 1300, topics: ["binary-search", "data-structures"], url: "https://codeforces.com/problemset/problem/1703/F" },

  // ==========================================
  // CODEFORCES - Rating 1400
  // ==========================================
  { id: "279B", platform: "codeforces", name: "Books", rating: 1400, topics: ["two-pointers", "binary-search"], url: "https://codeforces.com/problemset/problem/279/B" },
  { id: "520B", platform: "codeforces", name: "Two Buttons", rating: 1400, topics: ["greedy", "graphs"], url: "https://codeforces.com/problemset/problem/520/B" },
  { id: "1324D", platform: "codeforces", name: "Pair of Topics", rating: 1400, topics: ["two-pointers", "binary-search"], url: "https://codeforces.com/problemset/problem/1324/D" },
  { id: "1343C", platform: "codeforces", name: "Alternating Subsequence", rating: 1400, topics: ["two-pointers", "greedy"], url: "https://codeforces.com/problemset/problem/1343/C" },
  { id: "1538C", platform: "codeforces", name: "Number of Pairs", rating: 1400, topics: ["binary-search", "two-pointers"], url: "https://codeforces.com/problemset/problem/1538/C" },

  // ==========================================
  // CODEFORCES - Rating 1500+
  // ==========================================
  { id: "455A", platform: "codeforces", name: "Boredom", rating: 1500, topics: ["dynamic-programming"], url: "https://codeforces.com/problemset/problem/455/A" },
  { id: "580C", platform: "codeforces", name: "Kefa and Park", rating: 1500, topics: ["graphs", "trees", "dfs-and-similar"], url: "https://codeforces.com/problemset/problem/580/C" },
  { id: "550A", platform: "codeforces", name: "Two Substrings", rating: 1500, topics: ["greedy", "strings"], url: "https://codeforces.com/problemset/problem/550/A" },
  { id: "1398C", platform: "codeforces", name: "Good Subarrays", rating: 1600, topics: ["data-structures", "prefix-sum"], url: "https://codeforces.com/problemset/problem/1398/C" },
  { id: "1526C2", platform: "codeforces", name: "Potions (Hard Version)", rating: 1600, topics: ["greedy", "data-structures"], url: "https://codeforces.com/problemset/problem/1526/C2" },

  // ==========================================
  // LEETCODE
  // ==========================================
  { id: "two-sum", platform: "leetcode", name: "Two Sum", rating: 1, difficultyTier: "Easy", topics: ["arrays", "two-pointers"], url: "https://leetcode.com/problems/two-sum/" },
  { id: "best-time-to-buy-and-sell-stock", platform: "leetcode", name: "Best Time to Buy and Sell Stock", rating: 1, difficultyTier: "Easy", topics: ["greedy", "arrays"], url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: "valid-parentheses", platform: "leetcode", name: "Valid Parentheses", rating: 1, difficultyTier: "Easy", topics: ["strings", "data-structures"], url: "https://leetcode.com/problems/valid-parentheses/" },
  { id: "binary-search", platform: "leetcode", name: "Binary Search", rating: 1, difficultyTier: "Easy", topics: ["binary-search"], url: "https://leetcode.com/problems/binary-search/" },
  { id: "longest-substring-without-repeating-characters", platform: "leetcode", name: "Longest Substring Without Repeating Characters", rating: 2, difficultyTier: "Medium", topics: ["two-pointers", "sliding-window"], url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: "container-with-most-water", platform: "leetcode", name: "Container With Most Water", rating: 2, difficultyTier: "Medium", topics: ["two-pointers", "greedy"], url: "https://leetcode.com/problems/container-with-most-water/" },
  { id: "3sum", platform: "leetcode", name: "3Sum", rating: 2, difficultyTier: "Medium", topics: ["two-pointers", "arrays"], url: "https://leetcode.com/problems/3sum/" },
  { id: "search-in-rotated-sorted-array", platform: "leetcode", name: "Search in Rotated Sorted Array", rating: 2, difficultyTier: "Medium", topics: ["binary-search"], url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { id: "maximum-subarray", platform: "leetcode", name: "Maximum Subarray", rating: 2, difficultyTier: "Medium", topics: ["dynamic-programming", "greedy"], url: "https://leetcode.com/problems/maximum-subarray/" },
  { id: "trapping-rain-water", platform: "leetcode", name: "Trapping Rain Water", rating: 3, difficultyTier: "Hard", topics: ["two-pointers", "data-structures"], url: "https://leetcode.com/problems/trapping-rain-water/" },
];

/**
 * Deterministically retrieves the daily problem for a given platform, difficulty bracket, and topic.
 * The selection rotates automatically every calendar day (UTC) based on date arithmetic.
 */
export function getDailyProblemForCriteria(
  platform: string = "codeforces",
  minDiff?: number,
  maxDiff?: number,
  topics?: string[],
  targetDate: Date = new Date()
): CuratedProblem | null {
  const normPlatform = platform.toLowerCase() === "leetcode" ? "leetcode" : "codeforces";

  // Filter by platform
  let candidates = PROBLEM_CATALOG.filter((p) => p.platform === normPlatform);

  // Filter by difficulty bracket
  if (normPlatform === "codeforces" && (minDiff !== undefined || maxDiff !== undefined)) {
    const min = minDiff ?? 800;
    const max = maxDiff ?? min + 100;
    const diffCandidates = candidates.filter((p) => p.rating >= min && p.rating <= max);
    if (diffCandidates.length > 0) {
      candidates = diffCandidates;
    } else {
      // Find closest rating
      candidates.sort((a, b) => Math.abs(a.rating - min) - Math.abs(b.rating - min));
      const closestRating = candidates[0]?.rating;
      if (closestRating) {
        candidates = candidates.filter((p) => p.rating === closestRating);
      }
    }
  }

  // Filter by topic if possible
  if (topics && topics.length > 0) {
    const topicFiltered = candidates.filter((p) =>
      topics.some((t) => p.topics.includes(t.toLowerCase()))
    );
    if (topicFiltered.length > 0) {
      candidates = topicFiltered;
    }
  }

  if (candidates.length === 0) {
    return PROBLEM_CATALOG[0];
  }

  // Calculate deterministic day seed from calendar date (YYYY-MM-DD)
  const year = targetDate.getUTCFullYear();
  const month = targetDate.getUTCMonth();
  const day = targetDate.getUTCDate();
  const daySeed = Math.floor(Date.UTC(year, month, day) / (1000 * 60 * 60 * 24));

  // Add deterministic salts for topics & difficulty so two tasks on the same day don't pick identical problems
  const topicSalt = (topics && topics[0])
    ? topics[0].split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
    : 17;
  const ratingSalt = minDiff ?? 800;

  const selectedIndex = Math.abs((daySeed * 37) + (topicSalt * 19) + (ratingSalt * 11)) % candidates.length;
  return candidates[selectedIndex];
}

/**
 * Returns a human-friendly date string for the daily challenge badge e.g. "Nov 20"
 */
export function getDailyBadgeLabel(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
