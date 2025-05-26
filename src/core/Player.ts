export class Player {
    life: number;
    turns: number;
    position: [number, number];
    gold: number;
    mapPieces: number;

    constructor(){
        this.life = 100;
        this.turns = 15;
        this.position = [0,0]
        this.gold = 0;
        this.mapPieces = 0;
    }

    move(direction: 'up' | 'down' | 'left' | 'right'): void{
        let [x, y] = this.position;

        switch(direction){
            case 'up': if (x > 0) x--; break;
            case 'down': if (x < 4) x++; break;
            case 'left': if (y > 0) y--; break;
            case 'right': if (y < 4) y++; break;
        }

        this.position = [x, y];
        this.turns--;

    }

    takeDamage(amount: number): void{
        this.life -= amount
    }

    collectGold(amount: number): void{
        this.gold += amount
    }

    collectMapPieces(): void{
        this.mapPieces++
    }

    hasCompleteMapPieces(): boolean {
        return this.mapPieces >= 3
    }

    isAlive(): boolean {
        return this.life > 0
    }

    hasTurns(): boolean {
        return this.turns > 0
    }
}