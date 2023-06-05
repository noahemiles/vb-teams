import { Player } from "./Player.js";
export class Team {
    teamName: string;
    players: Array<Player>;
    constructor(players = [], teamName = `team-${Date.now()}`) {
        this.teamName = teamName;
        if (typeof players === 'object') {
            if (players.length) {
                this.players = players;
            } else {
                this.players = [];
                Object.keys(players).forEach(index => { // { 0: {player0}, 1: {player1} ... }
                    this.players.push(players[index]);
                });
            }
        } else if (typeof players === 'string') {
            this.players = [players];
        }
    }

    addPlayer(player: Player) {
        //check if in team
    }

    removePlayer(playerName: string) {

    }

    updateTeamName(newTeamName: string) {
        this.teamName = newTeamName;
    }

    checkIfOnTeam(newPlayer: Player) {
        this.players.forEach((player, index) => {
            if (player.playerToString() === newPlayer.playerToString()) {
                return index;
            }
        });
        return -1;
    }
};

export const unassigned = new Team([], 'unassigned');