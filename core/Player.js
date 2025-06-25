export class Player {
    constructor() {
        this.life = 100;
        this.turns = 15;
        this.position = [0, 0];
        this.gold = 0;
        this.mapPieces = 0;
    }
    move(direction) {
        let [x, y] = this.position;
        const original = [x, y];
        switch (direction.toLowerCase()) {
            case 'up':
                if (x > 0)
                    x--;
                break;
            case 'down':
                if (x < 4)
                    x++;
                break;
            case 'left':
                if (y > 0)
                    y--;
                break;
            case 'right':
                if (y < 4)
                    y++;
                break;
            default:
                console.log("❌ Invalid direction. Use: up, down, left, right.");
                return;
        }
        if (x !== original[0] || y !== original[1]) {
            this.position = [x, y];
            this.turns--;
        }
        else {
            console.log("⚠️ You can't go further in that direction.");
        }
    }
    takeDamage(amount) {
        this.life -= amount;
    }
    collectGold(amount) {
        this.gold += amount;
    }
    collectMapPiece() {
        this.mapPieces++;
    }
    hasCompleteMap() {
        return this.mapPieces >= 3;
    }
    isAlive() {
        return this.life > 0;
    }
    hasTurns() {
        return this.turns > 0;
    }
}
