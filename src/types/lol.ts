// Valorant Live Match Analysis Types
// Converted from LoL to Valorant per user request

export interface ValorantTeam {
  id: string;
  name: string;
  region: 'Americas' | 'EMEA' | 'Pacific' | 'China';
  logo: string;
  emoji: string;
}

export interface VideoMetadata {
  videoId: string;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
}

export interface AgentPick {
  agent: string;
  role: 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel';
  player?: string;
}

export interface RoundTimelineEvent {
  round: number; // 1, 2, 3...
  timeRange: string; // "0:00-0:40"
  phase: string; // "Pistol Round", "Buy Round", "Eco Round"
  actions: string[]; // 3-5 specific things happening
  keyDecision: string; // 100+ words strategic breakdown
  scoreAfter: string; // e.g., "2-1"
  economy: {
    yourTeam: number;
    opponentTeam: number;
  };
  plantSite?: 'A' | 'B' | 'C' | null;
  result?: 'win' | 'loss' | 'draw';
}

export interface CoachingPoint {
  round?: number;
  player?: string;
  agent?: string;
  advice: string;
}

export interface ValorantMatchAnalysis {
  matchOverview: {
    yourTeam: string;
    opponentTeam: string;
    map: string;
    result: string;
    finalScore: string; // e.g., "13-9"
    tournament: string;
    yourAgents: AgentPick[];
    opponentAgents: AgentPick[];
    yourSide: 'Attack' | 'Defense';
    opponentSide: 'Attack' | 'Defense';
    summary: string;
  };
  opponentAnalysis: {
    playstyle: string;
    strengths: string[];
    weaknesses: string[];
    dangerousPlayers: string[];
    mapControlStyle: string;
    economyTendencies: string;
  };
  winningStrategy: {
    keyPoints: string[];
    agentsToCounter: string[];
    mapsToTarget: string[];
    economyPlan: string[];
  };
  timeline: RoundTimelineEvent[];
  coachingPoints: CoachingPoint[];
}

// Helper type for team selection
export interface TeamSelectOption {
  label: string;
  value: string;
}
