export var CellContentType;
(function (CellContentType) {
    CellContentType["Empty"] = "Empty";
    CellContentType["Trap"] = "Trap";
    CellContentType["Gold"] = "Gold";
    CellContentType["MapPiece"] = "MapPiece";
    CellContentType["Treasure"] = "Treasure";
})(CellContentType || (CellContentType = {}));
export class Cell {
    constructor(content = CellContentType.Empty) {
        this.content = content;
        this.revealed = false;
    }
    reveal() {
        this.revealed = true;
        return this.content;
    }
    isRevealed() {
        return this.revealed;
    }
}
