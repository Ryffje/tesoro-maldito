import { Cell, CellContentType } from "../models/gridCell.js";
export class GameMap {
    constructor() {
        this.grid = this.generateMap();
    }
    generateMap() {
        const grid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => new Cell()));
        const availablePositions = [];
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (!(x === 0 && y === 0)) {
                    availablePositions.push([x, y]);
                }
            }
        }
        function placeRandom(type, count) {
            for (let i = 0; i < count; i++) {
                const idx = Math.floor(Math.random() * availablePositions.length);
                const [x, y] = availablePositions.splice(idx, 1)[0];
                grid[x][y] = new Cell(type);
            }
        }
        ;
        placeRandom(CellContentType.Treasure, 1);
        placeRandom(CellContentType.MapPiece, 3);
        placeRandom(CellContentType.Trap, 4);
        placeRandom(CellContentType.Gold, 4);
        return grid;
    }
    getCell(x, y) {
        return this.grid[x][y];
    }
    printMapDebug() {
        console.log(this.grid.map(row => row.map(cell => cell.content[0]).join(' ')).join('\n'));
    }
}
