import { Team, unassigned } from "./Team.js";

export class Game {
    name: string;
    teams: Array<Team>;
    numberOfTeamsLimit: number;
    constructor(teams = [new Team()], limit = 2, name = `game-${Date.now()}`) {
        this.name = name;
        this.numberOfTeamsLimit = limit;
        this.teams = teams;
    }

    addTeam(newTeam: Team) {
        let status = true;
        if (this.teams.length < this.numberOfTeamsLimit && this.checkIfInGame(newTeam) > -1) {
            this.teams.push(newTeam);
        } else {
            status = false;
        }
        return status;
    }

    removeTeam(teamToRemove: Team) {
        const teamIndex = this.checkIfInGame(teamToRemove);
        if (teamIndex > -1) {
            this.teams.splice(teamIndex, 1);
        }
    }

    checkIfInGame(teamToCheck: Team) {
        this.teams.forEach((team, index) => {
            if (JSON.stringify(teamToCheck) === JSON.stringify(team)) {
                return index;
            }
        });
        return -1;
    }

    gameToString() {
        return JSON.stringify(this.gameToObject());
    }

    gameToObject() {
        return { name: this.name, numberOfTeamsLimit: this.numberOfTeamsLimit, teams: this.teams };
    }
}