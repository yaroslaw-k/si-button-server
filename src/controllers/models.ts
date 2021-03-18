export type teamColors = 'purple' | 'cyan' | 'yellow' | 'white';
export type  gameType = 'si' | 'chgk' | 'brain';
export type socketEvent = {
    gameType: gameType,
    teams: teamColors[],
    gamePhase: string,
    answeringTeam?: teamColors,
    freezeTeams?: teamColors,
} & any;
