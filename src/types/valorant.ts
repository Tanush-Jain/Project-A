export interface ValorantTeam {
  id: string;
  name: string;
  region: 'Americas' | 'EMEA' | 'Pacific' | 'China';
  logo: string;
  players: ValorantPlayer[];
  playstyle: 'Aggressive' | 'Defensive' | 'Balanced' | 'Utility-Heavy';
  mapStats: MapStats[];
  pistolTendencies: PistolTendency[];
}

export interface ValorantPlayer {
  ign: string;
  realName: string;
  role: 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel';
  mainAgents: string[];
  stats: {
    acs: number; // Average combat score
    kd: number; // Kill/death ratio
    firstBloodRate: number; // 0-100
    clutchRate: number; // 0-100
    headshotRate: number; // 0-100
    utilityEfficiency: number; // 0-100
  };
  strengths: string[];
  weaknesses: string[];
}

export interface MapStats {
  map: string;
  winRate: number;
  attackWinRate: number;
  defenseWinRate: number;
  avgRoundsPlayed: number;
  commonSites: string[];
}

export interface PistolTendency {
  attack: { buyStrategy: string; stackTendency: { site: string; percentage: number } };
  defense: { buyStrategy: string; stackTendency: { site: string; percentage: number } };
}

export interface StrategyOutput {
  matchupAnalysis: {
    overview: string;
    yourAdvantages: string[];
    opponentThreats: string[];
    winCondition: string;
  };
  agentComposition: AgentPick[];
  pistolRounds: {
    attack: PistolStrategy;
    defense: PistolStrategy;
  };
  roundTimeline: TimelineEvent[];
  counterStrategy: {
    exploitWeaknesses: string[];
    neutralizeStrengths: string[];
    playerMatchups: PlayerMatchup[];
    adaptations: string[];
  };
  economyManagement: {
    forceRounds: number[];
    ecoRounds: number[];
    gunPriority: string[];
    ultimateUsage: string[];
  };
}

export interface AgentPick {
  agent: string;
  assignedTo: string; // Player IGN
  gunPreference: 'Operator' | 'Vandal' | 'Phantom' | 'Spectre';
  reasoning: string;
  responsibilities: string[];
}

export interface TimelineEvent {
  timeRange: string; // "0:00-0:15"
  phase: string;
  positions: { player: string; location: string }[];
  actions: string[];
  decisions: string;
  utilityUsage: UtilityUse[];
  gunSetup: { player: string; gun: string }[];
}

export interface UtilityUse {
  player: string;
  ability: string;
  timestamp: string;
}

export interface PistolStrategy {
  playerPositions: Record<string, string>;
  gunBuys: Record<string, string>;
  armor: Record<string, boolean>;
  utilitySequence: string[];
  plantLocation?: string;
  rotationTriggers?: string[];
  stackDecision?: string;
  retakePlan?: string;
}

export interface PlayerMatchup {
  yourPlayer: string;
  opponentPlayer: string;
  notes: string;
}