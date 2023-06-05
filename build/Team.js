export class Team {
    constructor(players = [], teamName = `team-${Date.now()}`) {
        this.teamName = teamName;
        if (typeof players === 'object') {
            if (players.length) {
                this.players = players;
            }
            else {
                this.players = [];
                Object.keys(players).forEach(index => {
                    this.players.push(players[index]);
                });
            }
        }
        else if (typeof players === 'string') {
            this.players = [players];
        }
    }
    addPlayer(player) {
        //check if in team
    }
    removePlayer(playerName) {
    }
    updateTeamName(newTeamName) {
        this.teamName = newTeamName;
    }
    checkIfOnTeam(newPlayer) {
        this.players.forEach((player, index) => {
            if (player.playerToString() === newPlayer.playerToString()) {
                return index;
            }
        });
        return -1;
    }
}
;
export const unassigned = new Team([], 'unassigned');
