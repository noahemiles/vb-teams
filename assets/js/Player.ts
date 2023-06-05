import Gender from "./Genders.js";
import { Team, unassigned } from "./Team.js";

export class Player {
    name: string;
    gender: string;
    tall: boolean;
    team: Team;
    constructor(name = `player-${Date.now()}`, gender = Gender.male, tall = false, team = unassigned) {
        this.name = name;
        this.gender = gender;
        this.tall = tall;
        this.team = team;
    }

    updateName(newName: string) {
        this.name = newName;
    }
    updateGender(newGender: string) {
        this.gender = newGender;
    }
    updateTall(newTall: boolean) {
        this.tall = newTall;
    }

    playerToString() {
        return JSON.stringify(this.playerToObject());
    }

    playerToObject() {
        return { name: this.name, gender: this.gender, tall: this.tall, team: this.team };
    }
}