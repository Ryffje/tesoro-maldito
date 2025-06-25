import * as readline from 'readline';
import { Game } from '../core/Game';
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function Menu() {
    console.log("\n 🏝️🏴‍☠️ The Cursed Treasure");
    console.log("1. Start the adventure");
    console.log("2. Instructions");
    console.log("3. Exit\n");
    r1.question("Take an option (1–3): ", (option) => {
        switch (option.trim()) {
            case '1':
                console.log(" 🌴 Launching the expedition!");
                r1.close();
                const game = new Game();
                game.start();
                break;
            case '2':
                console.log(`
🎯 Objective:
Find the 3 map pieces and open the treasure before life or turns run out.

🕹️ How to play:
- Move with: up, down, left, right.
- Cells might have traps, gold, map pieces or treasure.
- Start at (0,0) with 100 health and 15 turns.

🏆 Win:
- Find 3 map pieces and then the treasure.

💀 Lose:
- Run out of life or turns.`);
                Menu(); // Re-show menu
                break;
            case '3':
                console.log("👋 Thanks for playing, buajajajaja!");
                r1.close();
                break;
            default:
                console.log("❌ Invalid option. Try again.");
                Menu();
                break;
        }
    });
}
Menu();
