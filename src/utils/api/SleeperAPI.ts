// SleeperAPI.ts
const BASE_URL = "https://api.sleeper.app/v1";

// Function to get league
export const getLeague = async (leagueId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/league/${leagueId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch league");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching league:", error);
    throw error;
  }
};

// Function to get all users in a league
export const getUsers = async (leagueId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/league/${leagueId}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to get rosters for a specific league
export const getRosters = async (leagueId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/league/${leagueId}/rosters`);
    if (!response.ok) {
      throw new Error("Failed to fetch rosters");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rosters:", error);
    throw error;
  }
};

// Function to get matchups for a specific league and week
export const getMatchups = async (leagueId: string, week: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/league/${leagueId}/matchups/${week}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch matchups");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching matchups:", error);
    throw error;
  }
};

// Function to get the NFL state
export const getNflState = async () => {
  try {
    const response = await fetch(`${BASE_URL}/state/nfl`);
    if (!response.ok) {
      throw new Error("Failed to fetch slate");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slate:", error);
    throw error;
  }
};

// Function to get projections for a list of players
export const getPlayerProjections = async (
  week: number,
  season: number,
  playerIds: string[]
) => {
  try {
    const projections = await Promise.all(
      playerIds.map(async (playerId) => {
        const response = await fetch(
          `https://api.sleeper.com/projections/nfl/${playerId}?season_type=regular&season=${season}&week=${week}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch player projections");
        }
        const data = await response.json();
        return { pts: data.stats.pts_ppr, playerId };
      })
    );
    return projections;
  } catch (error) {
    console.error("Error fetching player projections:", error);
    throw error;
  }
};

export const getTransactions = async (leagueId: string, leg: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/league/${leagueId}/transactions/${leg}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
