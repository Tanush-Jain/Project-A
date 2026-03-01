/**
 * Complete Riot Games API Integration
 * Supports both VALORANT and League of Legends APIs
 * 
 * Features:
 * - Base URLs per region
 * - API key management
 * - Rate limiting (100 req/2min dev, 1000 req/10min prod)
 * - In-memory caching (5 min TTL)
 * - Comprehensive error handling
 * - TypeScript types
 */

// ============================================================================
// Types
// ============================================================================

export class RiotAPIError extends Error {
  constructor(
    public statusCode: number,
    public body: string,
    public endpoint: string
  ) {
    super(`Riot API Error (${statusCode}): ${endpoint}`);
    this.name = 'RiotAPIError';
  }
}

export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  revisionDate: number;
}

export interface ValorantMatch {
  matchId: string;
  mapId: string;
  gameVersion: string;
  gameLength: number;
  gameStartMillis: number;
  provisioningFlowId: string;
  gameMode: string;
  isRanked: boolean;
  seasonId: string;
  players: ValorantPlayer[];
  bots: ValorantBot[];
  teams: ValorantTeam[];
  roundResults: RoundResult[];
}

export interface ValorantPlayer {
  puuid: string;
  gameName: string;
  tagLine: string;
  teamId: string;
  partyId: string;
  characterId: string;
  agent: string;
  stats: PlayerStats;
  competitiveTier: number;
  isObserver: boolean;
  playerCard: string;
  playerTitle: string;
}

export interface PlayerStats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
  damage: DamageStats[];
}

export interface DamageStats {
  receiver: string;
  damage: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
}

export interface ValorantBot {
  puuid: string;
  gameName: string;
  tagLine: string;
  teamId: string;
  characterId: string;
  agent: string;
  stats: PlayerStats;
}

export interface ValorantTeam {
  teamId: string;
  won: boolean;
  roundsPlayed: number;
  roundsWon: number;
}

export interface RoundResult {
  roundNum: number;
  roundResult: string;
  roundCeremony: string;
  winningTeam: string;
  bombPlanted: boolean;
  bombDefused: boolean;
  plantSite: string | null;
  plantPlayerPuuid: string | null;
  defusePlayerPuuid: string | null;
  players: RoundPlayerResult[];
}

export interface RoundPlayerResult {
  puuid: string;
  gameName: string;
  tagLine: string;
  teamId: string;
  characterId: string;
  agent: string;
  stats: PlayerRoundStats;
  economy: PlayerEconomy;
  ability: AbilityUsage;
}

export interface PlayerRoundStats {
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
}

export interface PlayerEconomy {
  weapon: string;
  armor: string;
  spent: number;
  remaining: number;
}

export interface AbilityUsage {
  grenadeEffects: string | null;
  ability1Effects: string | null;
  ability2Effects: string | null;
  ultimateEffects: string | null;
}

export interface ValorantLeaderboard {
  actId: string;
  totalPlayers: number;
  players: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  puuid: string;
  gameName: string;
  tagLine: string;
  leaderboardRank: number;
  rankedRating: number;
  numberOfWins: number;
  numberOfGames: number;
}

export interface PlayerStatsSummary {
  gamesPlayed: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  headshots: number;
  headshotPct: number;
  acs: number;
  winRate: number;
  kd: number;
  topAgents: { agent: string; games: number; wins: number }[];
  topMaps: { map: string; games: number; wins: number }[];
}

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface LeagueMatch {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: LeagueParticipant[];
    platformId: string;
    queueId: number;
    teams: LeagueTeam[];
    tournamentCode: string;
  };
}

export interface LeagueParticipant {
  allInPings: number;
  assistMePings: number;
  assists: number;
  baronKills: number;
  basicPings: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  commandPings: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  holdPings: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  missionPings: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusTakedowns: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantId: number;
  pentaKills: number;
  perks: Perks;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  pushPings: number;
  puuid: string;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: number;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionClearedPings: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

export interface Perks {
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  };
  styles: PerkStyle[];
}

export interface PerkStyle {
  description: string;
  style: number;
  substyles: PerkSubStyle[];
}

export interface PerkSubStyle {
  description: string;
  perks: number[];
  style: number;
}

export interface LeagueTeam {
  teamId: number;
  win: boolean;
  alliance: boolean;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  firstBlood: boolean;
  firstTower: boolean;
  towerKills: number;
  towerTakedowns: number;
  towersLost: number;
  baronKills: number;
  dragonKills: number;
  harpiesKills: number;
  riftHeraldKills: number;
}

export interface RankedEntry {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface MatchList {
  startIndex: number;
  totalGames: number;
  games: MatchReference[];
}

export interface MatchReference {
  gameId: number;
  champion: number;
  platformId: string;
  queue: number;
  season: number;
  timestamp: number;
  role: string;
  lane: string;
}

// ============================================================================
// Rate Limiter
// ============================================================================

class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number, timeWindowSeconds: number) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowSeconds * 1000;
  }

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    );

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      console.log(`Rate limit reached, waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.requests.push(Date.now());
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    );
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  reset(): void {
    this.requests = [];
  }
}

// ============================================================================
// Simple Cache
// ============================================================================

class SimpleCache {
  private cache = new Map<string, { data: unknown; expires: number }>();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  set<T>(key: string, data: T, ttlSeconds: number): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + (ttlSeconds * 1000)
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// ============================================================================
// Base URL Configuration
// ============================================================================

const VALORANT_REGIONS = {
  americas: 'https://americas.api.riotgames.com',
  asia: 'https://asia.api.riotgames.com',
  europe: 'https://europe.api.riotgames.com',
  sea: 'https://sea.api.riotgames.com'
} as const;

const LEAGUE_REGIONS = {
  br1: 'https://br1.api.riotgames.com',
  eun1: 'https://eun1.api.riotgames.com',
  euw1: 'https://euw1.api.riotgames.com',
  jp1: 'https://jp1.api.riotgames.com',
  kr: 'https://kr.api.riotgames.com',
  la1: 'https://la1.api.riotgames.com',
  la2: 'https://la2.api.riotgames.com',
  na1: 'https://na1.api.riotgames.com',
  oc1: 'https://oc1.api.riotgames.com',
  ph2: 'https://ph2.api.riotgames.com',
  ru: 'https://ru.api.riotgames.com',
  sg2: 'https://sg2.api.riotgames.com',
  th2: 'https://th2.api.riotgames.com',
  tr1: 'https://tr1.api.riotgames.com',
  tw2: 'https://tw2.api.riotgames.com',
  vn2: 'https://vn2.api.riotgames.com'
} as const;

export type ValorantRegion = keyof typeof VALORANT_REGIONS;
export type LeagueRegion = keyof typeof LEAGUE_REGIONS;

// ============================================================================
// Valorant API
// ============================================================================

export class ValorantAPI {
  private apiKey: string;
  private region: ValorantRegion;
  private rateLimiter: RateLimiter;
  private cache: SimpleCache;
  
  // Development vs Production rate limits
  private static readonly DEV_RATE_LIMIT = 100;
  private static readonly DEV_TIME_WINDOW = 120; // 2 minutes
  private static readonly PROD_RATE_LIMIT = 1000;
  private static readonly PROD_TIME_WINDOW = 600; // 10 minutes
  private static readonly CACHE_TTL = 300; // 5 minutes

  constructor(apiKey?: string, region: ValorantRegion = 'americas', isProduction = false) {
    this.apiKey = apiKey || process.env.RIOT_API_KEY || '';
    this.region = region;
    
    const maxRequests = isProduction 
      ? ValorantAPI.PROD_RATE_LIMIT 
      : ValorantAPI.DEV_RATE_LIMIT;
    const timeWindow = isProduction 
      ? ValorantAPI.PROD_TIME_WINDOW 
      : ValorantAPI.DEV_TIME_WINDOW;
    
    this.rateLimiter = new RateLimiter(maxRequests, timeWindow);
    this.cache = new SimpleCache();
  }

  private get baseUrl(): string {
    return VALORANT_REGIONS[this.region];
  }

  private async makeRequest<T>(endpoint: string, cacheKey?: string): Promise<T> {
    // Check cache first
    if (cacheKey) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        console.log(`Cache hit for: ${cacheKey}`);
        return cached;
      }
    }

    // Check rate limit
    await this.rateLimiter.waitIfNeeded();

    const url = `${this.baseUrl}${endpoint}`;
    console.log(`Making request to: ${url}`);

    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': this.apiKey
      }
    });

    if (!response.ok) {
      await this.handleError(response, endpoint);
    }

    const data = await response.json();

    // Cache the response
    if (cacheKey) {
      this.cache.set(cacheKey, data, ValorantAPI.CACHE_TTL);
    }

    return data as T;
  }

  private async handleError(response: Response, endpoint: string): Promise<never> {
    const body = await response.text();
    
    switch (response.status) {
      case 400:
        throw new RiotAPIError(400, 'Bad request - invalid parameters', endpoint);
      case 401:
        throw new RiotAPIError(401, 'Unauthorized - check your API key', endpoint);
      case 403:
        throw new RiotAPIError(403, 'Forbidden - API key may be banned', endpoint);
      case 404:
        throw new RiotAPIError(404, `Resource not found: ${endpoint}`, endpoint);
      case 415:
        throw new RiotAPIError(415, 'Unsupported media type', endpoint);
      case 429:
        // Rate limited - wait and retry
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
        console.log(`Rate limited, waiting ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        throw new RiotAPIError(429, `Rate limited, retry after ${waitTime}ms`, endpoint);
      case 500:
      case 502:
      case 503:
      case 504:
        throw new RiotAPIError(response.status, 'Riot server error - retry with backoff', endpoint);
      default:
        throw new RiotAPIError(response.status, body, endpoint);
    }
  }

  // Get player account by Riot ID
  async getPlayerByRiotId(gameName: string, tagLine: string): Promise<RiotAccount> {
    const endpoint = `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
    return this.makeRequest<RiotAccount>(endpoint, `account:${gameName}:${tagLine}`);
  }

  // Get match history
  async getMatchHistory(puuid: string, count = 20): Promise<MatchList> {
    const endpoint = `/val/match/v1/matchlists/by-puuid/${puuid}?size=${count}`;
    return this.makeRequest<MatchList>(endpoint, `matchlist:${puuid}:${count}`);
  }

  // Get match details
  async getMatchDetails(matchId: string): Promise<ValorantMatch> {
    const endpoint = `/val/match/v1/matches/${matchId}`;
    return this.makeRequest<ValorantMatch>(endpoint, `match:${matchId}`);
  }

  // Get recent matches
  async getRecentMatches(puuid: string): Promise<{ matchIds: string[] }> {
    const endpoint = `/val/match/v1/recent-matches/by-puuid/${puuid}`;
    return this.makeRequest<{ matchIds: string[] }>(endpoint, `recent:${puuid}`);
  }

  // Get leaderboard
  async getLeaderboard(actId: string, size = 50): Promise<ValorantLeaderboard> {
    const endpoint = `/val/ranked/v1/leaderboards/by-act/${actId}?size=${size}`;
    return this.makeRequest<ValorantLeaderboard>(endpoint, `leaderboard:${actId}`);
  }

  // Get player stats from matches
  async getPlayerStats(puuid: string, matchCount = 10): Promise<PlayerStatsSummary> {
    const matches = await this.getMatchHistory(puuid, matchCount);
    
    const stats: PlayerStatsSummary = {
      gamesPlayed: matches.games?.length || 0,
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      headshots: 0,
      headshotPct: 0,
      acs: 0,
      winRate: 0,
      kd: 0,
      topAgents: [],
      topMaps: []
    };

    const agentGames = new Map<string, { games: number; wins: number }>();
    const mapGames = new Map<string, { games: number; wins: number }>();

    for (const matchRef of matches.games || []) {
      try {
        const match = await this.getMatchDetails(matchRef.gameId.toString());
        
        // Find player in match
        const player = match.players.find(p => p.puuid === puuid);
        
        if (player) {
          stats.kills += player.stats.kills;
          stats.deaths += player.stats.deaths;
          stats.assists += player.stats.assists;
          stats.headshots += player.stats.headshots;
          stats.acs += player.stats.score;

          // Track agent stats
          const agentName = player.agent || 'Unknown';
          const agentStats = agentGames.get(agentName) || { games: 0, wins: 0 };
          agentStats.games++;
          if (match.teams.find(t => t.teamId === player.teamId && t.won)) {
            stats.wins++;
            agentStats.wins++;
          } else {
            stats.losses++;
          }
          agentGames.set(agentName, agentStats);

          // Track map stats
          const mapName = match.matchId.split(':')[0] || 'Unknown';
          const mapStats = mapGames.get(mapName) || { games: 0, wins: 0 };
          mapStats.games++;
          mapGames.set(mapName, mapStats);
        }
      } catch (error) {
        console.error(`Error fetching match ${matchRef.gameId}:`, error);
      }
    }

    // Calculate derived stats
    if (stats.gamesPlayed > 0) {
      stats.acs = Math.round(stats.acs / stats.gamesPlayed);
      stats.winRate = Math.round((stats.wins / stats.gamesPlayed) * 100);
      stats.kd = stats.deaths > 0 ? Math.round((stats.kills / stats.deaths) * 100) / 100 : stats.kills;
      stats.headshotPct = stats.kills > 0 
        ? Math.round((stats.headshots / (stats.kills + stats.headshots)) * 100)
        : 0;
    }

    // Get top agents
    stats.topAgents = Array.from(agentGames.entries())
      .map(([agent, data]) => ({ agent, games: data.games, wins: data.wins }))
      .sort((a, b) => b.games - a.games)
      .slice(0, 5);

    // Get top maps
    stats.topMaps = Array.from(mapGames.entries())
      .map(([map, data]) => ({ map, games: data.games, wins: data.wins }))
      .sort((a, b) => b.games - a.games)
      .slice(0, 5);

    return stats;
  }

  // Get content (maps, agents, etc.)
  async getContent(): Promise<{
    characters: { id: string; name: string }[];
    maps: { id: string; name: string }[];
    acts: { id: string; name: string }[];
  }> {
    const endpoint = '/val/content/v1/contents';
    return this.makeRequest(endpoint, 'content');
  }

  // Get rate limiter status
  getRateLimitStatus(): { remaining: number; max: number } {
    return {
      remaining: this.rateLimiter.getRemainingRequests(),
      max: 100 // Dev limit
    };
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// ============================================================================
// League of Legends API
// ============================================================================

export class LeagueAPI {
  private apiKey: string;
  private region: LeagueRegion;
  private rateLimiter: RateLimiter;
  private cache: SimpleCache;
  
  private static readonly DEV_RATE_LIMIT = 100;
  private static readonly DEV_TIME_WINDOW = 120;
  private static readonly PROD_RATE_LIMIT = 1000;
  private static readonly PROD_TIME_WINDOW = 600;
  private static readonly CACHE_TTL = 300;

  constructor(apiKey?: string, region: LeagueRegion = 'na1', isProduction = false) {
    this.apiKey = apiKey || process.env.RIOT_API_KEY || '';
    this.region = region;
    
    const maxRequests = isProduction 
      ? LeagueAPI.PROD_RATE_LIMIT 
      : LeagueAPI.DEV_RATE_LIMIT;
    const timeWindow = isProduction 
      ? LeagueAPI.PROD_TIME_WINDOW 
      : LeagueAPI.DEV_TIME_WINDOW;
    
    this.rateLimiter = new RateLimiter(maxRequests, timeWindow);
    this.cache = new SimpleCache();
  }

  private get baseUrl(): string {
    return LEAGUE_REGIONS[this.region];
  }

  private async makeRequest<T>(endpoint: string, cacheKey?: string): Promise<T> {
    if (cacheKey) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) return cached;
    }

    await this.rateLimiter.waitIfNeeded();

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: { 'X-Riot-Token': this.apiKey }
    });

    if (!response.ok) {
      const body = await response.text();
      throw new RiotAPIError(response.status, body, endpoint);
    }

    const data = await response.json();
    if (cacheKey) this.cache.set(cacheKey, data, LeagueAPI.CACHE_TTL);
    return data as T;
  }

  // Get summoner by name
  async getSummonerByName(summonerName: string): Promise<Summoner> {
    const endpoint = `/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`;
    return this.makeRequest<Summoner>(endpoint, `summoner:${summonerName}`);
  }

  // Get summoner by PUUID
  async getSummonerByPUUID(puuid: string): Promise<Summoner> {
    const endpoint = `/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    return this.makeRequest<Summoner>(endpoint, `summoner-puuid:${puuid}`);
  }

  // Get ranked stats
  async getRankedStats(summonerId: string): Promise<RankedEntry[]> {
    const endpoint = `/lol/league/v4/entries/by-summoner/${summonerId}`;
    return this.makeRequest<RankedEntry[]>(endpoint, `ranked:${summonerId}`);
  }

  // Get match IDs
  async getMatchIds(puuid: string, count = 20): Promise<string[]> {
    const endpoint = `/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`;
    return this.makeRequest<string[]>(endpoint, `matchids:${puuid}:${count}`);
  }

  // Get match details
  async getMatchDetails(matchId: string): Promise<LeagueMatch> {
    const endpoint = `/lol/match/v5/matches/${matchId}`;
    return this.makeRequest<LeagueMatch>(endpoint, `match:${matchId}`);
  }

  // Get mastery scores
  async getChampionMastery(summonerId: string): Promise<unknown[]> {
    const endpoint = `/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`;
    return this.makeRequest(endpoint, `mastery:${summonerId}`);
  }

  // Get league entries
  async getLeagueEntries(queue: string, tier: string, division: string): Promise<RankedEntry[]> {
    const endpoint = `/lol/league/v4/entries/${queue}/${tier}/${division}?page=1`;
    return this.makeRequest<RankedEntry[]>(endpoint, `league:${queue}:${tier}:${division}`);
  }

  // Get rate limiter status
  getRateLimitStatus(): { remaining: number; max: number } {
    return {
      remaining: this.rateLimiter.getRemainingRequests(),
      max: LeagueAPI.DEV_RATE_LIMIT
    };
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// ============================================================================
// Default Instances
// ============================================================================

export const defaultValorantAPI = new ValorantAPI();
export const defaultLeagueAPI = new LeagueAPI();

