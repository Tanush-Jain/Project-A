/**
 * Map Statistics Summary
 * Overall attack/defense win rates across all pro play
 */
export const MAP_METADATA: Record<string, { displayName: string; codeName: string }> = {
  split: { displayName: 'Split', codeName: 'deathmatch' },
  haven: { displayName: 'Haven', codeName: 'triad' },
  bind: { displayName: 'Bind', codeName: 'ascent' },
  ascent: { displayName: 'Ascent', codeName: 'avenue' },
  icebox: { displayName: 'Icebox', codeName: 'range' },
  breeze: { displayName: 'Breeze', codeName: 'district' },
  fracture: { displayName: 'Fracture', codeName: 'beach' },
  pearl: { displayName: 'Pearl', codeName: 'jam' },
}

/**
 * Map Statistics Summary
 * Overall attack/defense win rates across all pro play
 */
export const MAP_WIN_RATES: Record<string, { attack: number; defense: number }> = {
  split: { attack: 50, defense: 50 },
  haven: { attack: 51, defense: 49 },
  bind: { attack: 49, defense: 51 },
  ascent: { attack: 50, defense: 50 },
  icebox: { attack: 49, defense: 51 },
  breeze: { attack: 51, defense: 49 },
  fracture: { attack: 51, defense: 49 },
  pearl: { attack: 50, defense: 50 },
}

/**
 * Map Characteristics
 */
export const MAP_CHARACTERISTICS = {
  split: {
    sites: ['A', 'B'],
    hasMid: true,
    complexity: 'Medium',
    playStyle: 'Balanced, info-focused',
    keyFeatures: ['Mid control', 'Two sites', 'Limited rotation paths'],
  },
  haven: {
    sites: ['A', 'B', 'C'],
    hasMid: true,
    complexity: 'High',
    playStyle: 'Flexible, multi-site',
    keyFeatures: ['Three sites', 'Mid complexity', 'Long rotations'],
  },
  bind: {
    sites: ['A', 'B'],
    hasMid: false,
    complexity: 'Medium',
    playStyle: 'Teleport-focused',
    keyFeatures: ['One-way teleports', 'Aggressive site entries', 'No mid'],
  },
  ascent: {
    sites: ['A', 'B'],
    hasMid: true,
    complexity: 'Medium',
    playStyle: 'Balanced, mid-central',
    keyFeatures: ['Long mid lane', 'Vertical gameplay', 'Elevated positions'],
  },
  icebox: {
    sites: ['A', 'B'],
    hasMid: true,
    complexity: 'High',
    playStyle: 'Utility-heavy',
    keyFeatures: ['Open spaces', 'Ziplines', 'Vertical combat'],
  },
  breeze: {
    sites: ['A', 'B'],
    hasMid: true,
    complexity: 'High',
    playStyle: 'Long-range focused',
    keyFeatures: ['Long sightlines', 'Open combat', 'Limited cover'],
  },
  fracture: {
    sites: ['A', 'B'],
    hasMid: true,
    complexity: 'Medium',
    playStyle: 'Split-focused',
    keyFeatures: ['Large split', 'Two ziplines', 'Central control'],
  },
  pearl: {
    sites: ['A', 'B'],
    hasMid: true,
    complexity: 'Medium',
    playStyle: 'Rotational, info-based',
    keyFeatures: ['Rotational complexity', 'Multiple pathways', 'Util-dependent'],
  },
}

/**
 * Pro player preferences by map
 */
export const PRO_PREFERENCES = {
  split: {
    preferredAttackSite: 'B',
    preferredDefenseSite: 'B',
    criticalControl: 'Mid lane',
  },
  haven: {
    preferredAttackSite: 'A/C',
    preferredDefenseSite: 'B',
    criticalControl: 'Mid to A connector',
  },
  bind: {
    preferredAttackSite: 'B',
    preferredDefenseSite: 'A',
    criticalControl: 'Site entries',
  },
  ascent: {
    preferredAttackSite: 'B',
    preferredDefenseSite: 'A',
    criticalControl: 'Mid lane',
  },
  icebox: {
    preferredAttackSite: 'B',
    preferredDefenseSite: 'A',
    criticalControl: 'Zipline control',
  },
  breeze: {
    preferredAttackSite: 'A',
    preferredDefenseSite: 'B',
    criticalControl: 'Long sightlines',
  },
  fracture: {
    preferredAttackSite: 'B',
    preferredDefenseSite: 'A',
    criticalControl: 'Central control',
  },
  pearl: {
    preferredAttackSite: 'A',
    preferredDefenseSite: 'B',
    criticalControl: 'Rotational timing',
  },
}

export function getMapMetadata(mapName: string) {
  const normalized = mapName.toLowerCase()
  return MAP_METADATA[normalized]
}

export function getMapCharacteristics(mapName: string) {
  const normalized = mapName.toLowerCase()
  return MAP_CHARACTERISTICS[normalized as keyof typeof MAP_CHARACTERISTICS]
}

export function getMapWinRates(mapName: string) {
  const normalized = mapName.toLowerCase()
  return MAP_WIN_RATES[normalized as keyof typeof MAP_WIN_RATES]
}
