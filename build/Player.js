import Gender from "./Genders.js";
import { unassigned } from "./Team.js";
export class Player {
    constructor(name = `player-${Date.now()}`, gender = Gender.male, tall = false, team = unassigned) {
        this.name = name;
        this.gender = gender;
        this.tall = tall;
        this.team = team;
    }
    updateName(newName) {
        this.name = newName;
    }
    updateGender(newGender) {
        this.gender = newGender;
    }
    updateTall(newTall) {
        this.tall = newTall;
    }
    playerToString() {
        return JSON.stringify(this.playerToObject());
    }
    playerToObject() {
        return { name: this.name, gender: this.gender, tall: this.tall, team: this.team };
    }
}
