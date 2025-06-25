import { Cell, CellContentType } from "../models/gridCell.js";
export class GameMap {
    grid: Cell [][];

    constructor(){
        this.grid = this.generateMap();
    }


    private generateMap(): Cell [][] { 
        const grid: Cell [][] = Array.from({length: 5}, () =>
        Array.from({length: 5}, () => new Cell())
    );

    const availablePositions: [number, number][] = [];

    for(let x = 0; x < 5; x++){
        for(let y = 0; y < 5; y++){
            if(!(x === 0 && y === 0)){
                availablePositions.push([x,y]);
            }
        }
    }


    function placeRandom(type: CellContentType, count: number){
        for(let i = 0; i < count; i++){
            const idx = Math.floor(Math.random() * availablePositions.length);
            const [x, y] = availablePositions.splice(idx, 1)[0];
            grid[x][y] = new Cell(type);
        }

    };

    placeRandom(CellContentType.Treasure, 1);
    placeRandom(CellContentType.MapPiece, 3);
    placeRandom(CellContentType.Trap, 4);
    placeRandom(CellContentType.Gold, 4);

    return grid
}

getCell(x: number, y: number): Cell {
    return this.grid[x][y]
}

printMapDebug(): void {
    console.log(this.grid.map(row => 
        row.map(cell => cell.content[0]).join(' ')
    ).join('\n'));
}

}

