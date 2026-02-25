import axios from 'axios'

const RIOT_API_BASE = 'https://na1.api.riotgames.com'
const RIOT_API_KEY = (process.env.RIOT_API_KEY as string) || ''

const riotClient = axios.create({
  baseURL: RIOT_API_BASE,
  headers: {
    'X-Riot-Token': RIOT_API_KEY,
  },
})

export async function getPlayerByName(gameName: string, tagLine: string) {
  try {
    const response = await riotClient.get(
      `/riot/account/v1/accounts/by-game-name/${gameName}/${tagLine}`
    )
    return response.data
  } catch (error) {
    console.error('Riot API Error:', error)
    throw new Error('Failed to fetch player')
  }
}

export async function getPlayerByPUUID(puuid: string) {
  try {
    const response = await riotClient.get(
      `/lol/summoner/v4/summoners/by-puuid/${puuid}`
    )
    return response.data
  } catch (error) {
    console.error('Riot API Error:', error)
    throw new Error('Failed to fetch summoner')
  }
}

export async function getMatchHistory(puuid: string, count: number = 20) {
  try {
    const response = await riotClient.get(
      `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`
    )
    return response.data
  } catch (error) {
    console.error('Riot API Error:', error)
    throw new Error('Failed to fetch match history')
  }
}

export async function getMatchDetails(matchId: string) {
  try {
    const response = await riotClient.get(
      `/lol/match/v5/matches/${matchId}`
    )
    return response.data
  } catch (error) {
    console.error('Riot API Error:', error)
    throw new Error('Failed to fetch match details')
  }
}

export async function getRankedStats(summonerId: string) {
  try {
    const response = await riotClient.get(
      `/lol/league/v4/entries/by-summoner/${summonerId}`
    )
    return response.data
  } catch (error) {
    console.error('Riot API Error:', error)
    throw new Error('Failed to fetch ranked stats')
  }
}

export async function getChampionMastery(summonerId: string) {
  try {
    const response = await riotClient.get(
      `/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`
    )
    return response.data
  } catch (error) {
    console.error('Riot API Error:', error)
    throw new Error('Failed to fetch champion mastery')
  }
}

export async function getChampionStats(championId: number) {
  try {
    // This would need CDragon API or your own stats database
    const response = await axios.get(
      `https://cdn.jsdelivr.net/gh/CommunityDragon/Data@master/champion/${championId}.json`
    )
    return response.data
  } catch (error) {
    console.error('Champion Stats Error:', error)
    throw new Error('Failed to fetch champion stats')
  }
}
