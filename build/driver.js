import { Game } from "./Game.js";
import { Team } from "./Team.js";
import { Player } from "./Player.js";
import Genders from "./Genders.js";
//function test() {
const tall = true, notTall = false;
// name, gender, tall, team?
const g = new Player("Gisela", Genders.female, notTall);
const g1 = new Player("Gisela", Genders.female, notTall);
const g2 = new Player("Gisela", Genders.female, notTall);
const g3 = new Player("Gisela", Genders.female, notTall);
const g4 = new Player("Gisela", Genders.female, notTall);
const g5 = new Player("Gisela", Genders.female, notTall);
const n = new Player("Noah");
const n1 = new Player("Noah");
const n2 = new Player("Noah");
const n3 = new Player("Noah");
const n4 = new Player("Noah");
const n5 = new Player("Noah");
//players[], name
const t1 = new Team([g, g1, g2, g3, g4, g5]);
const t2 = new Team([n, n1, n2, n3, n4, n5]);
//teams[], team#Limit, name
const game1 = new Game([t1, t2], 2, "Game 1"); //Team(s), teamLimit, Name
const game2 = new Game([t1, t2], 2, "Game 2"); //Team(s), teamLimit, Name
const game3 = new Game([t1, t2], 2, "Game 3"); //Team(s), teamLimit, Name
const game4 = new Game([t1, t2], 2, "Game 4"); //Team(s), teamLimit, Name
//console.log(game1.gameToObject());
//}
//test();
class Instance {
    constructor() {
        this.games = [];
    }
    getGames() {
        return this.games;
    }
    hasGames() {
        return this.games.length > 0;
    }
    addGame(game) {
        this.games.push(game);
        this.render();
    }
    removeGame(gameName) {
        this.games.forEach((game, index) => {
            if (game.name === gameName) {
                this.games.splice(index, 1);
                this.render(true);
                return;
            }
        });
    }
    render(remove = false) {
        const games = document.getElementById('games');
        if (remove) {
            games.innerHTML = "";
        }
        this.games.forEach(game => {
            const gameName = document.getElementById(game.name);
            if (!gameName) {
                let newGames = this.buildGameUI(game);
                games.appendChild(newGames);
            }
        });
    }
    buildGameUI(game) {
        const mainDiv = document.createElement('div'), title = document.createElement('h2'), teamsDiv = document.createElement('div');
        teamsDiv.classList.add('teams');
        teamsDiv.classList.add('flex');
        mainDiv.id = game.name;
        title.innerHTML = game.name;
        mainDiv.classList.add("game");
        mainDiv.appendChild(title);
        game.teams.forEach(team => {
            const teamDiv = document.createElement('div'), teamUl = document.createElement('ul'), teamName = document.createElement('h3');
            teamName.innerHTML = team.teamName;
            teamDiv.classList.add('team');
            teamDiv.id = team.teamName;
            team.players.forEach(player => {
                const li = document.createElement('li');
                li.innerHTML = player.name;
                li.classList.add('no-list');
                teamUl.appendChild(li);
            });
            teamDiv.appendChild(teamName);
            teamDiv.appendChild(teamUl);
            teamsDiv.appendChild(teamDiv);
        });
        mainDiv.appendChild(teamsDiv);
        return mainDiv;
    }
}
const UI = new Instance();
UI.addGame(game1);
//UI.addGame(game2);
//UI.addGame(game3);
//UI.addGame(game4);
//console.log(UI.getGames());
//UI.removeGame(game2.name);
//console.log(UI.getGames());
