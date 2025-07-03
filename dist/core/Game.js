import { Player } from "./Player";
import { GameMap } from "./Map";
// import * as readline from 'readline'; // No necesario para versión web
export class Game {
    // private rl: readline.Interface; // No necesario para versión web
    constructor() {
        this.player = new Player();
        this.gameMap = new GameMap();
        // this.rl = readline.createInterface({
        //     input: process.stdin,
        //     output: process.stdout
        // });
    }
    // Métodos para acceder a las propiedades privadas
    getPlayer() {
        return this.player;
    }
    getGameMap() {
        return this.gameMap;
    }
    start() {
        console.log("🏝️🏴‍☠️ ¡Welcome to the Cursed treasure!");
        // this.loop(); // No necesario para versión web
    }
}
