import * as readline from 'readline';
import {Game} from './core/Game';

const r1 = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});

function Menu(){
    console.log("\n 🏝️🏴‍☠️The Cursed treasure");
    console.log("1. Start the adventure");
    console.log("2. Instructions");
    console.log("3. Exit \n");

    r1.question("Take a option (1-3):", (option) =>{
        switch (option.trim()) {
            case '1':
                console.log(" 🌴¡Launching the expedition!");
            r1.close();
            const game = new Game();
            game.start();
            break;
            
            case '2':
                console.log()
        }
    })
}