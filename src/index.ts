import { Game } from './core/Game.js';
import { Player } from './core/Player.js';
import { GameMap } from './core/Map.js';
import { CellContentType } from './models/gridCell.js';

// Variables globales para el juego
let game: Game;
let player: Player;
let gameMap: GameMap;
let gameActive = false;

// Elementos del DOM
const menuElement = document.getElementById('menu') as HTMLElement;
const instructionsElement = document.getElementById('instructions') as HTMLElement;
const gameBoardElement = document.getElementById('gameBoard') as HTMLElement;
const gridElement = document.getElementById('grid') as HTMLElement;
const messageElement = document.getElementById('message') as HTMLElement;
const lifeElement = document.getElementById('life') as HTMLElement;
const turnsElement = document.getElementById('turns') as HTMLElement;
const mapPiecesElement = document.getElementById('mapPieces') as HTMLElement;
const goldElement = document.getElementById('gold') as HTMLElement;

// Funciones de la interfaz
function ensureFullscreen() {
    const container = document.querySelector('.game-container') as HTMLElement;
    if (document.fullscreenElement && document.fullscreenElement !== container) {
        container.requestFullscreen();
    }
}

function startGame(): void {
    game = new Game();
    player = game.getPlayer();
    gameMap = game.getGameMap();
    gameActive = true;
    menuElement.style.display = 'none';
    instructionsElement.style.display = 'none';
    gameBoardElement.style.display = 'flex';
    updateUI();
    renderGrid();
    showMessage('🏝️🏴‍☠️ ¡Bienvenido a la aventura! Usa los botones para moverte.');
    if (document.fullscreenElement) ensureFullscreen();
}

function showInstructions(): void {
    menuElement.style.display = 'none';
    instructionsElement.style.display = 'block';
    gameBoardElement.style.display = 'none';
    if (document.fullscreenElement) ensureFullscreen();
}

function hideInstructions(): void {
    menuElement.style.display = 'block';
    instructionsElement.style.display = 'none';
    gameBoardElement.style.display = 'none';
    if (document.fullscreenElement) ensureFullscreen();
}

function backToMenu(): void {
    gameActive = false;
    menuElement.style.display = 'block';
    instructionsElement.style.display = 'none';
    gameBoardElement.style.display = 'none';
    if (document.fullscreenElement) ensureFullscreen();
}

function movePlayer(direction: string): void {
    if (!gameActive) return;
    
    const [oldX, oldY] = player.position;
    player.move(direction);
    const [newX, newY] = player.position;
    
    if (oldX !== newX || oldY !== newY) {
        // El jugador se movió
        const cell = gameMap.getCell(newX, newY);
        
        if (!cell.isRevealed()) {
            const content = cell.reveal();
            handleCellContent(content);
        } else {
            showMessage('🔁 Ya has estado aquí antes.');
        }
        
        updateUI();
        renderGrid();
        
        // Verificar condiciones de fin de juego
        if (!player.isAlive()) {
            showMessage('💀⚰️ ¡Game Over! Se te acabó la vida. ¡JAjaAjaAJAajAa!');
            gameActive = false;
            setTimeout(() => {
                if (confirm('¿Quieres jugar de nuevo?')) {
                    startGame();
                } else {
                    backToMenu();
                }
            }, 2000);
            return;
        }
        
        if (!player.hasTurns()) {
            showMessage('⌛ ¡Se te acabaron los turnos! ¡JAjaAjaAJAajAa!');
            gameActive = false;
            setTimeout(() => {
                if (confirm('¿Quieres jugar de nuevo?')) {
                    startGame();
                } else {
                    backToMenu();
                }
            }, 2000);
            return;
        }
    }
}

function handleCellContent(content: CellContentType): void {
    switch (content) {
        case CellContentType.Trap:
            player.takeDamage(20);
            showMessage('💀 ¡Caíste en una trampa! -20 vida');
            break;
        case CellContentType.Gold:
            player.collectGold(50);
            showMessage('🪙 ¡Encontraste oro! +50 monedas');
            break;
        case CellContentType.MapPiece:
            player.collectMapPiece();
            showMessage('🗺️🧩 ¡Encontraste una pieza del mapa!');
            break;
        case CellContentType.Treasure:
            if (player.hasCompleteMap()) {
                showMessage('🗺️💴 ¡Victoria! Encontraste el tesoro con el mapa completo. ¡Felicidades!');
                gameActive = false;
                setTimeout(() => {
                    if (confirm('¿Quieres jugar de nuevo?')) {
                        startGame();
                    } else {
                        backToMenu();
                    }
                }, 3000);
            } else {
                showMessage('🗺️🚫 Encontraste el tesoro, pero está cerrado. Necesitas las 3 piezas del mapa.');
            }
            break;
        case CellContentType.Empty:
            showMessage('🌾 No hay nada aquí.');
            break;
    }
    updateUI();
}

function updateUI(): void {
    lifeElement.textContent = player.life.toString();
    turnsElement.textContent = player.turns.toString();
    mapPiecesElement.textContent = player.mapPieces.toString();
    goldElement.textContent = player.gold.toString();
}

function getSVG(type: string): string {
    switch (type) {
        case 'player':
            return '<img src="../assets/pirate.png" alt="Player" width="48" height="48">';
        case 'trap':
            return '<img src="../assets/skull.png" alt="Trap" width="48" height="48">';
        case 'gold':
            return '<img src="../assets/gold.png" alt="Gold" width="48" height="48">';
        case 'map':
            return '<img src="../assets/map.png" alt="Map" width="48" height="48">';
        case 'treasure':
            return '<img src="../assets/treasure.png" alt="Treasure" width="48" height="48">';
        case 'puzzle':
            return '<img src="../assets/puzzle.png" alt="Puzzle Piece" width="48" height="48">';
        case 'empty':
            return '<img src="../assets/spade.png" alt="Empty" width="48" height="48">';
        case 'hidden':
            return '<img src="../assets/sand.png" alt="Hidden" width="48" height="48">';
        default:
            return '';
    }
}

function renderGrid(): void {
    gridElement.innerHTML = '';
    const [playerX, playerY] = player.position;
    
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            const cell = gameMap.getCell(x, y);
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            
            // Determinar el contenido visual de la celda
            if (x === playerX && y === playerY) {
                cellElement.innerHTML = getSVG('player');
                cellElement.classList.add('player');
            } else if (cell.isRevealed()) {
                switch (cell.content) {
                    case CellContentType.Trap:
                        cellElement.innerHTML = getSVG('trap');
                        cellElement.classList.add('trap');
                        break;
                    case CellContentType.Gold:
                        cellElement.innerHTML = getSVG('gold');
                        cellElement.classList.add('gold');
                        break;
                    case CellContentType.MapPiece:
                        cellElement.innerHTML = getSVG('map');
                        cellElement.classList.add('map-piece');
                        break;
                    case CellContentType.Treasure:
                        cellElement.innerHTML = getSVG('treasure');
                        cellElement.classList.add('treasure');
                        break;
                    case CellContentType.Empty:
                        cellElement.innerHTML = getSVG('empty');
                        cellElement.classList.add('empty');
                        break;
                }
                cellElement.classList.add('revealed');
            } else {
                cellElement.innerHTML = getSVG('hidden');
            }
            
            // Hacer la celda clickeable para movimiento
            cellElement.onclick = () => {
                if (!gameActive) return;
                
                const [currentX, currentY] = player.position;
                let direction = '';
                
                if (x === currentX - 1 && y === currentY) direction = 'up';
                else if (x === currentX + 1 && y === currentY) direction = 'down';
                else if (x === currentX && y === currentY - 1) direction = 'left';
                else if (x === currentX && y === currentY + 1) direction = 'right';
                
                if (direction) {
                    movePlayer(direction);
                } else {
                    showMessage('⚠️ Solo puedes moverte a celdas adyacentes.');
                }
            };
            
            gridElement.appendChild(cellElement);
        }
    }
}

function showMessage(message: string): void {
    messageElement.textContent = message;
}

function fullscreenGame(): void {
    const container = document.querySelector('.game-container') as HTMLElement;
    const btn = document.getElementById('fullscreenBtn') as HTMLButtonElement;
    const exitBtn = document.getElementById('exitFullscreenBtn') as HTMLButtonElement;
    if (!document.fullscreenElement) {
        container.requestFullscreen();
        container.style.background = "url('assets/isla-fondo.png') center center/cover no-repeat";
        container.style.width = '100vw';
        container.style.height = '100vh';
        btn.style.display = 'none';
        exitBtn.style.display = 'block';
    }
}

function exitFullscreenGame(): void {
    const container = document.querySelector('.game-container') as HTMLElement;
    if (document.fullscreenElement) {
        document.exitFullscreen();
        container.style.background = '';
        container.style.width = '';
        container.style.height = '';
    }
}

document.addEventListener('fullscreenchange', () => {
    const btn = document.getElementById('fullscreenBtn') as HTMLButtonElement;
    const exitBtn = document.getElementById('exitFullscreenBtn') as HTMLButtonElement;
    const container = document.querySelector('.game-container') as HTMLElement;
    if (document.fullscreenElement) {
        btn.style.display = 'none';
        exitBtn.style.display = 'block';
        container.style.background = "url('assets/isla-fondo.png') center center/cover no-repeat";
        container.style.width = '100vw';
        container.style.height = '100vh';
    } else {
        btn.style.display = 'block';
        exitBtn.style.display = 'none';
        container.style.background = '';
        container.style.width = '';
        container.style.height = '';
    }
});

// Hacer las funciones disponibles globalmente para el HTML
(window as any).startGame = startGame;
(window as any).showInstructions = showInstructions;
(window as any).hideInstructions = hideInstructions;
(window as any).backToMenu = backToMenu;
(window as any).movePlayer = movePlayer;
(window as any).fullscreenGame = fullscreenGame;
(window as any).exitFullscreenGame = exitFullscreenGame;
