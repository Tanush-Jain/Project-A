/**
 * STRATEGY GENERATION - USAGE EXAMPLES & INTEGRATION GUIDE
 *
 * This file demonstrates how to integrate the strategy generator
 * into your React components and use the outputs effectively.
 */

import { generateStrategy, type StrategyOutput } from './strategy-generator'
import { searchTeamByName } from './utils'

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 1: GENERATE STRATEGY FOR A MATCHUP
// ═══════════════════════════════════════════════════════════════════

export function exampleGenerateMatchupStrategy() {
  const sentinels = searchTeamByName('sentinels')
  const globalEsports = searchTeamByName('global-esports')

  if (!sentinels || !globalEsports) {
    console.error('Teams not found')
    return
  }

  // Generate complete strategy for Sentinels vs Global Esports on Split
  const strategy = generateStrategy(sentinels, globalEsports, 'Split')

  // ─────────────────────────────────────────────────────────────────
  // ACCESS OVERVIEW DATA
  // ─────────────────────────────────────────────────────────────────

  console.log('=== MATCHUP ANALYSIS ===')
  console.log(strategy.overview.matchupAnalysis)
  console.log('Key Advantages:', strategy.overview.keyAdvantages)
  console.log('Key Threats:', strategy.overview.keyThreats)
  console.log('Recommended Approach:', strategy.overview.recommendedApproach)

  // ─────────────────────────────────────────────────────────────────
  // ACCESS AGENT COMPOSITION
  // ─────────────────────────────────────────────────────────────────

  console.log('\n=== AGENT COMPOSITION ===')
  strategy.agentComposition.agents.forEach((agent) => {
    console.log(`${agent.player} (${agent.role}): ${agent.agent}`)
    console.log(`  Reasoning: ${agent.reasoning}`)
    console.log(`  Responsibilities: ${agent.keyResponsibilities.join(', ')}`)
  })

  console.log('\nComposition Rationale:', strategy.agentComposition.compositionRationale)
  console.log('\nAlternative Compositions:')
  strategy.agentComposition.alternativeComps.forEach((comp) => {
    console.log(`  - ${comp.name}: ${comp.agents.join(', ')} (${comp.whenToUse})`)
  })

  // ─────────────────────────────────────────────────────────────────
  // ACCESS PISTOL ROUND STRATEGIES
  // ─────────────────────────────────────────────────────────────────

  console.log('\n=== DEFENSE PISTOL ===')
  console.log('Strategy:', strategy.pistolRounds.defense.strategy)
  console.log('Setup:')
  strategy.pistolRounds.defense.setup.forEach((player) => {
    console.log(`  ${player.player} (${player.agent}): ${player.position} - ${player.responsibility}`)
  })
  console.log('Win Condition:', strategy.pistolRounds.defense.winCondition)
  console.log('Fallback Plan:', strategy.pistolRounds.defense.fallbackPlan)

  console.log('\n=== ATTACK PISTOL ===')
  console.log('Strategy:', strategy.pistolRounds.attack.strategy)
  console.log('Plant Site:', strategy.pistolRounds.attack.plantSite)
  console.log('Win Condition:', strategy.pistolRounds.attack.winCondition)

  // ─────────────────────────────────────────────────────────────────
  // ACCESS ROUND TIMELINE
  // ─────────────────────────────────────────────────────────────────

  console.log('\n=== ATTACK SIDE GUN ROUND TIMELINE ===')
  strategy.roundTimeline.gunRoundAttack.forEach((interval) => {
    console.log(`\n[${interval.timeRange}] ${interval.phase}`)
    console.log(`Actions: ${interval.actions.join('; ')}`)
    console.log(`Key Decisions: ${interval.keyDecisions.join('; ')}`)
    console.log(`Utility Usage: ${interval.utilityUsage.join('; ')}`)
  })

  // ─────────────────────────────────────────────────────────────────
  // ACCESS COUNTER-STRATEGY
  // ─────────────────────────────────────────────────────────────────

  console.log('\n=== OPPONENT WEAKNESSES ===')
  strategy.counterStrategy.opponentWeaknesses.forEach((weakness) => {
    console.log(`\nWeakness: ${weakness.weakness}`)
    console.log(`Exploit: ${weakness.howToExploit}`)
    console.log(`Timing: ${weakness.timing}`)
  })

  console.log('\n=== ADAPTATION TRIGGERS ===')
  strategy.counterStrategy.adaptationTriggers.slice(0, 3).forEach((trigger) => {
    console.log(`\nSituation: ${trigger.situation}`)
    console.log(`Adjustment: ${trigger.adjustment}`)
  })

  // ─────────────────────────────────────────────────────────────────
  // ACCESS ECONOMY PLAN
  // ─────────────────────────────────────────────────────────────────

  console.log('\n=== ECONOMY PLAN ===')
  console.log('Force Buy Rounds:', strategy.economyPlan.forceBuyRounds)
  console.log('Eco Rounds:', strategy.economyPlan.ecoRounds)
  console.log('Bonus Strategy:', strategy.economyPlan.bonusRoundStrategy)

  return strategy
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 2: USE STRATEGY IN A REACT COMPONENT
// ═══════════════════════════════════════════════════════════════════

/**
 * React Component: Display strategy overview
 * This would be used in StrategyPage or DashboardPage
 */
export function StrategyOverviewComponent({
  yourTeamName,
  opponentTeamName,
  mapName,
}: {
  yourTeamName: string
  opponentTeamName: string
  mapName: string
}) {
  const yourTeam = searchTeamByName(yourTeamName)
  const opponentTeam = searchTeamByName(opponentTeamName)

  if (!yourTeam || !opponentTeam) {
    return <div>Teams not found</div>
  }

  const strategy = generateStrategy(yourTeam, opponentTeam, mapName)

  return (
    <div className="space-y-6 p-6 bg-gray-900 text-white rounded-lg">
      {/* Overview Section */}
      <div className="border-l-4 border-red-500 pl-4">
        <h2 className="text-2xl font-bold mb-2">Matchup Analysis</h2>
        <p className="text-gray-300 mb-4">{strategy.overview.matchupAnalysis}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-green-400 mb-2">Key Advantages</h3>
            <ul className="space-y-1">
              {strategy.overview.keyAdvantages.map((adv, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {adv}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-red-400 mb-2">Key Threats</h3>
            <ul className="space-y-1">
              {strategy.overview.keyThreats.map((threat, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start">
                  <span className="text-red-400 mr-2">✕</span>
                  {threat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-900 rounded">
          <p className="text-sm">
            <span className="font-bold text-blue-300">Approach:</span> {strategy.overview.recommendedApproach}
          </p>
        </div>
      </div>

      {/* Agent Composition Section */}
      <div className="border-l-4 border-yellow-500 pl-4">
        <h2 className="text-2xl font-bold mb-2">Recommended Composition</h2>
        <p className="text-gray-300 mb-4">{strategy.agentComposition.compositionRationale}</p>

        <div className="grid grid-cols-5 gap-2">
          {strategy.agentComposition.agents.map((agent) => (
            <div key={agent.player} className="bg-gray-800 p-3 rounded text-center">
              <div className="text-sm font-bold text-yellow-400">{agent.agent}</div>
              <div className="text-xs text-gray-400 mt-1">{agent.player}</div>
              <div className="text-xs text-gray-500 mt-2">{agent.role}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-gray-300 mb-2">Alternative Compositions:</h3>
          {strategy.agentComposition.alternativeComps.map((comp, i) => (
            <div key={i} className="text-xs text-gray-400 mb-2 p-2 bg-gray-800 rounded">
              <span className="font-bold">{comp.name}:</span> {comp.agents.join(', ')}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 3: DISPLAY PISTOL ROUND STRATEGIES
// ═══════════════════════════════════════════════════════════════════

export function PistolStrategyComponent({
  strategy,
  side,
}: {
  strategy: StrategyOutput
  side: 'attack' | 'defense'
}) {
  const pistolData = strategy.pistolRounds[side]

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">
        {side.toUpperCase()} Pistol Strategy
      </h3>

      {/* Setup visualization */}
      <div className="mb-6">
        <h4 className="font-bold text-blue-400 mb-3">Player Setup</h4>
        <div className="space-y-2">
          {pistolData.setup.map((player) => (
            <div
              key={player.player}
              className="bg-gray-800 p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-bold">{player.player}</div>
                <div className="text-sm text-gray-400">{player.agent}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-yellow-400">{player.position}</div>
                <div className="text-xs text-gray-500">{player.responsibility}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy description */}
      <div className="mb-6 p-4 bg-blue-900 rounded">
        <p className="text-sm">{pistolData.strategy}</p>
      </div>

      {/* Utility sequence timeline */}
      <div className="mb-6">
        <h4 className="font-bold text-green-400 mb-3">Utility Sequence</h4>
        <div className="space-y-2">
          {pistolData.utilitySequence.map((seq) => (
            <div key={seq.time} className="flex gap-4 text-sm bg-gray-800 p-2 rounded">
              <span className="font-bold text-yellow-400 w-12">{seq.time}</span>
              <span className="text-gray-300 flex-1">{seq.player}</span>
              <span className="text-gray-400">{seq.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Win condition & fallback */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-900 p-3 rounded">
          <div className="font-bold text-green-400 mb-1">Win Condition</div>
          <p className="text-xs text-gray-300">{pistolData.winCondition}</p>
        </div>
        <div className="bg-red-900 p-3 rounded">
          <div className="font-bold text-red-400 mb-1">Fallback Plan</div>
          <p className="text-xs text-gray-300">{pistolData.fallbackPlan}</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 4: DISPLAY ROUND TIMELINE WITH PHASES
// ═══════════════════════════════════════════════════════════════════

export function RoundTimelineComponent({
  strategy,
  side,
}: {
  strategy: StrategyOutput
  side: 'attack' | 'defense'
}) {
  const timeline =
    side === 'attack'
      ? strategy.roundTimeline.gunRoundAttack
      : strategy.roundTimeline.gunRoundDefense

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">
        {side.toUpperCase()} Gun Round Timeline
      </h3>

      <div className="space-y-4">
        {timeline.map((interval, idx) => (
          <div key={idx} className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg text-purple-400">{interval.timeRange}</span>
              <span className="text-sm font-bold bg-purple-900 px-2 py-1 rounded">
                {interval.phase}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-bold text-blue-400">Actions:</span>
                <ul className="ml-4 mt-1">
                  {interval.actions.map((action, i) => (
                    <li key={i} className="text-gray-300">
                      • {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-yellow-400">Key Decisions:</span>
                <ul className="ml-4 mt-1">
                  {interval.keyDecisions.map((decision, i) => (
                    <li key={i} className="text-gray-300">
                      • {decision}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-green-400">
                  {side === 'attack' ? 'Utility' : 'Rotation Triggers'}:
                </span>
                <div className="ml-4 mt-1 flex flex-wrap gap-2">
                  {('utilityUsage' in interval
                    ? interval.utilityUsage
                    : 'rotationTriggers' in interval
                      ? interval.rotationTriggers
                      : []
                  ).map((item: string, i: number) => (
                    <span
                      key={i}
                      className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 5: DISPLAY COUNTER-STRATEGY & ADAPTATION
// ═══════════════════════════════════════════════════════════════════

export function CounterStrategyComponent({ strategy }: { strategy: StrategyOutput }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg space-y-6">
      {/* Opponent Weaknesses */}
      <div>
        <h3 className="text-2xl font-bold text-red-400 mb-4">Opponent Weaknesses</h3>
        <div className="space-y-3">
          {strategy.counterStrategy.opponentWeaknesses.map((weakness, idx) => (
            <div key={idx} className="bg-red-900 bg-opacity-30 border border-red-600 p-4 rounded">
              <div className="font-bold text-red-300 mb-1">{weakness.weakness}</div>
              <div className="text-sm text-gray-300 mb-2">
                <span className="text-green-400">How to Exploit:</span> {weakness.howToExploit}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-yellow-400">Timing:</span> {weakness.timing}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opponent Strengths */}
      <div>
        <h3 className="text-2xl font-bold text-blue-400 mb-4">Opponent Strengths</h3>
        <div className="space-y-3">
          {strategy.counterStrategy.opponentStrengths.map((strength, idx) => (
            <div key={idx} className="bg-blue-900 bg-opacity-30 border border-blue-600 p-4 rounded">
              <div className="font-bold text-blue-300 mb-1">{strength.strength}</div>
              <div className="text-sm text-gray-300 mb-2">
                <span className="text-green-400">Neutralize:</span> {strength.howToNeutralize}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-yellow-400">Avoidance:</span> {strength.avoidance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptation Triggers */}
      <div>
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Adaptation Triggers</h3>
        <div className="space-y-3">
          {strategy.counterStrategy.adaptationTriggers.slice(0, 4).map((trigger, idx) => (
            <div key={idx} className="bg-gray-800 p-3 rounded border-l-4 border-yellow-500">
              <div className="text-sm font-bold text-yellow-300 mb-1">
                IF: {trigger.situation}
              </div>
              <div className="text-sm text-gray-300">
                THEN: {trigger.adjustment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 6: ECONOMY PLAN DISPLAY
// ═══════════════════════════════════════════════════════════════════

export function EconomyPlanComponent({ strategy }: { strategy: StrategyOutput }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Economy Plan</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-900 p-4 rounded">
          <h4 className="font-bold text-red-300 mb-2">Force Buy Rounds</h4>
          <div className="text-2xl font-bold text-red-200">
            {strategy.economyPlan.forceBuyRounds.join(', ')}
          </div>
        </div>

        <div className="bg-orange-900 p-4 rounded">
          <h4 className="font-bold text-orange-300 mb-2">Eco Rounds</h4>
          <div className="text-2xl font-bold text-orange-200">
            {strategy.economyPlan.ecoRounds.join(', ')}
          </div>
        </div>
      </div>

      <div className="bg-blue-900 p-4 rounded mb-4">
        <h4 className="font-bold text-blue-300 mb-2">Bonus Round Strategy</h4>
        <p className="text-sm text-gray-300">{strategy.economyPlan.bonusRoundStrategy}</p>
      </div>

      <div className="bg-green-900 p-4 rounded">
        <h4 className="font-bold text-green-300 mb-2">Ultimate Economy Targets</h4>
        <ul className="space-y-1">
          {strategy.economyPlan.ultimateEconomyTargets.map((target, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start">
              <span className="text-green-400 mr-2">→</span>
              {target}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 7: FULL PAGE INTEGRATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Complete strategy page component showing all sections
 */
export function FullStrategyPageComponent({
  yourTeamName,
  opponentTeamName,
  mapName,
}: {
  yourTeamName: string
  opponentTeamName: string
  mapName: string
}) {
  const yourTeam = searchTeamByName(yourTeamName)
  const opponentTeam = searchTeamByName(opponentTeamName)

  if (!yourTeam || !opponentTeam) {
    return <div>Teams not found</div>
  }

  const strategy = generateStrategy(yourTeam, opponentTeam, mapName)

  return (
    <div className="space-y-8 p-6 bg-gray-950 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-500 mb-2">
          {yourTeam.name} vs {opponentTeam.name}
        </h1>
        <p className="text-gray-400 text-xl">{mapName}</p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Matchup Overview</h2>
        <StrategyOverviewComponent
          yourTeamName={yourTeamName}
          opponentTeamName={opponentTeamName}
          mapName={mapName}
        />
      </section>

      {/* Pistol Strategies */}
      <section>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Pistol Rounds</h2>
        <div className="grid grid-cols-2 gap-6">
          <PistolStrategyComponent strategy={strategy} side="defense" />
          <PistolStrategyComponent strategy={strategy} side="attack" />
        </div>
      </section>

      {/* Round Timelines */}
      <section>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Gun Round Timelines</h2>
        <div className="grid grid-cols-2 gap-6">
          <RoundTimelineComponent strategy={strategy} side="defense" />
          <RoundTimelineComponent strategy={strategy} side="attack" />
        </div>
      </section>

      {/* Counter-Strategy */}
      <section>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Counter-Strategy</h2>
        <CounterStrategyComponent strategy={strategy} />
      </section>

      {/* Economy */}
      <section>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Economy Management</h2>
        <EconomyPlanComponent strategy={strategy} />
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EXAMPLE 8: DATA EXPORT & ANALYTICS
// ═══════════════════════════════════════════════════════════════════

export function exportStrategyAsJSON(
  yourTeamName: string,
  opponentTeamName: string,
  mapName: string
) {
  const yourTeam = searchTeamByName(yourTeamName)
  const opponentTeam = searchTeamByName(opponentTeamName)

  if (!yourTeam || !opponentTeam) return null

  const strategy = generateStrategy(yourTeam, opponentTeam, mapName)

  // Create downloadable JSON
  const jsonString = JSON.stringify(strategy, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  // Generate download link
  const link = document.createElement('a')
  link.href = url
  link.download = `strategy-${yourTeamName}-vs-${opponentTeamName}-${mapName}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  console.log('Strategy exported:', strategy)
  return strategy
}

// Usage in React:
// <button onClick={() => exportStrategyAsJSON('sentinels', 'global-esports', 'Split')}>
//   Download Strategy
// </button>

export function analyzeStrategyPerformance(
  yourTeamName: string,
  opponentTeamName: string,
  mapName: string,
  matchResult: 'win' | 'loss' | 'draw'
) {
  const yourTeam = searchTeamByName(yourTeamName)
  const opponentTeam = searchTeamByName(opponentTeamName)

  if (!yourTeam || !opponentTeam) return null

  const strategy = generateStrategy(yourTeam, opponentTeam, mapName)

  return {
    timestamp: new Date().toISOString(),
    teams: {
      your: yourTeam.name,
      opponent: opponentTeam.name,
    },
    map: mapName,
    result: matchResult,
    strategy: {
      recommendedApproach: strategy.overview.recommendedApproach,
      agentComposition: strategy.agentComposition.agents.map((a) => a.agent),
      keyAdvantages: strategy.overview.keyAdvantages.length,
      keyThreats: strategy.overview.keyThreats.length,
    },
  }

}
