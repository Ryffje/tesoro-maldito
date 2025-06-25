import * as readline from 'readline';
import {Game} from './core/Game';

const r1 = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});

function Menu(){
    console.clear();
    console.log("\n 🏝️💀 The Cursed treasure");
    console.log("1. Start the adventure");
    console.log("2. Instructions");
    console.log("3. Exit \n");

    r1.question("Take a option (1-3): ", (option) =>{
        switch (option.trim()) {
            case '1':
                console.log(" 🌴¡Launching the expedition!");
            r1.close();
            const game = new Game();
            game.start();
            break;
            
            case '2':
                console.log(`
🎯 Objective:
Find the 3 map pieces and then open the treasure before your turns or life run out.

🕹️ How to play:
- Use commands: up, down, left, right to move.
- Each cell can have traps, gold, map pieces, or treasure.
- You start at (0,0) with 100 health and 15 turns.

🏆 How to win:
- Collect 3 map pieces and find the treasure.

💀 How to lose:
- Your life (traps) or turns run out.`);

Menu();
break;
case '3':
    console.log("👋 ¡Thanks for play buajajajajaja !");
    r1.close();
    break;
    default:
        console.log("❌ Invalid option. Retry");
        Menu();
        break;
        }
    });
}

Menu();