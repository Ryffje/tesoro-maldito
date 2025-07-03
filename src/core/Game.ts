import { Player } from "./Player";
import { GameMap } from "./Map";
import { CellContentType } from "../models/gridCell";
// import * as readline from 'readline'; // No necesario para versión web

export class Game {
    private player: Player;
    private gameMap: GameMap;
    // private rl: readline.Interface; // No necesario para versión web

    constructor(){
        this.player = new Player();
        this.gameMap = new GameMap();

        // this.rl = readline.createInterface({
        //     input: process.stdin,
        //     output: process.stdout
        // });
    }

    // Métodos para acceder a las propiedades privadas
    getPlayer(): Player {
        return this.player;
    }

    getGameMap(): GameMap {
        return this.gameMap;
    }

    start(): void {
        console.log("🏝️🏴‍☠️ ¡Welcome to the Cursed treasure!");
        // this.loop(); // No necesario para versión web
    }

    // private loop(): void {
    //     if (!this.player.isAlive()) {
    //         console.log("💀⚰️ Out of the game. Game Over; ¡JAjaAjaAJAajAa!.");
    //         // this.rl.close();
    //         return;
    //     }
        
    //     if (!this.player.hasTurns()) {
    //         console.log("⌛You're out of moves. The game is over for you; ¡JAjaAjaAJAajAa!")
    //         // this.rl.close();
    //         return
    //     }

    //     const [x, y] = this.player.position;
    //     console.log(`📍 in this position (${x},${y}) | ❤️ Life: ${this.player.life} | 🔁 Turns: ${this.player.turns} | 🧩 Map: ${this.player.mapPieces} | 🪙 Gold: ${this.player.gold}`);

    //     // this.rl.question("¿Move? (Up, Down, Left, Right):", (input) => {
    //         this.player.move(input as any);

    //         const [nx, ny] = this.player.position;
    //         const cell = this.gameMap.getCell(nx, ny);

    //         if (!cell.isRevealed()){
    //             const content = cell.reveal();

    //             switch (content){
    //                 case CellContentType.Trap:
    //                     console.log("💀 ¡He fell into the opponent's trap!");
    //                     this.player.takeDamage(20);
    //                     break;
    //                 case CellContentType.Gold:
    //                     console.log("🪙 ¡hunt for gold! +50");
    //                     this.player.collectGold(50);
    //                     break;
    //                 case CellContentType.MapPiece:
    //                     console.log("🗺️🧩 a part of the map");
    //                     this.player.collectMapPiece();
    //                     break;
    //                 case CellContentType.Treasure:
    //                     if(this.player.hasCompleteMap()){
    //                         console.log("🗺️💴 You've discovered the treasure and have the full map! Victory is yours!")
    //                     } else {
    //                         console.log("🗺️🚫You've discovered the treasure, but it's locked")
    //                     }
    //                     // this.rl.close();
    //                     return;
    //                     case CellContentType.Empty:
    //                         console.log("🌾 Nothing here.");
    //                         break;
    //             }

    //         } else {
    //            console.log("🔁 You're here again");
    // ;
    //         }

    //         this.loop();
    //     // });
    // }
}
