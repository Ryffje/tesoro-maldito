export enum CellContentType {
    Empty = 'Empty',
    Trap = 'Trap',
    Gold = 'Gold',
    MapPieces = 'MapPiece',
    Treasure = 'Treasure'
}

export class Cell {
    content: CellContentType;
    revealed: boolean;

    constructor(content: CellContentType = CellContentType.Empty){
        this.content = content;
        this.revealed = false;
    }


    reveal(): CellContentType{
        this.revealed = true
        return this.content

    }

    isRevealed(): boolean {
        return this.revealed
    }
}

