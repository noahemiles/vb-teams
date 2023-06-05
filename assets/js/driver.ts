import { Game } from "./Game.js";
import { Team } from "./Team.js";
import { Player } from "./Player.js";
import Genders from "./Genders.js";
const g = new Player("Gisela", Genders.female);
const n = new Player("Noah");
const t1 = new Team([g]);
const t2 = new Team([n]);
const g1 = new Game([t1, t2], 2, "Test Game"); //Team(s), teamLimit, Name

console.log(g1.gameToObject());