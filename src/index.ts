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
}

function showInstructions(): void {
    menuElement.style.display = 'none';
    instructionsElement.style.display = 'block';
    gameBoardElement.style.display = 'none';
}

function hideInstructions(): void {
    menuElement.style.display = 'block';
    instructionsElement.style.display = 'none';
    gameBoardElement.style.display = 'none';
}

function backToMenu(): void {
    gameActive = false;
    menuElement.style.display = 'block';
    instructionsElement.style.display = 'none';
    gameBoardElement.style.display = 'none';
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
            showMessage('💀 ¡Caíste en una trampa! -20 vida');
            break;
        case CellContentType.Gold:
            showMessage('🪙 ¡Encontraste oro! +50 monedas');
            break;
        case CellContentType.MapPiece:
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
            return `<svg viewBox="0 0 48 48"><circle cx="24" cy="14" r="7" fill="#f9d29d" stroke="#222" stroke-width="2"/><ellipse cx="24" cy="36" rx="10" ry="8" fill="#222"/><rect x="18" y="21" width="12" height="14" rx="6" fill="#b5651d" stroke="#222" stroke-width="2"/><rect x="20" y="32" width="8" height="10" rx="4" fill="#b5651d" stroke="#222" stroke-width="2"/><rect x="14" y="35" width="6" height="8" rx="3" fill="#b5651d" stroke="#222" stroke-width="2"/><rect x="28" y="35" width="6" height="8" rx="3" fill="#b5651d" stroke="#222" stroke-width="2"/><rect x="21" y="10" width="6" height="6" rx="3" fill="#222"/></svg>`;
        case 'trap':
            return `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="40" rx="18" ry="6" fill="#333"/><polygon points="8,40 12,28 16,40" fill="#b5651d" stroke="#222" stroke-width="2"/><polygon points="20,40 24,28 28,40" fill="#b5651d" stroke="#222" stroke-width="2"/><polygon points="32,40 36,28 40,40" fill="#b5651d" stroke="#222" stroke-width="2"/></svg>`;
        case 'gold':
            return `<svg viewBox="0 0 48 48"><rect x="8" y="28" width="32" height="12" rx="4" fill="#f4d03f" stroke="#b5651d" stroke-width="2"/><ellipse cx="24" cy="28" rx="16" ry="6" fill="#f9e79f" stroke="#b5651d" stroke-width="2"/></svg>`;
        case 'map':
            return `<svg viewBox="0 0 48 48"><rect x="8" y="12" width="32" height="24" rx="6" fill="#fbeec1" stroke="#b5651d" stroke-width="2"/><path d="M12 16 Q24 28 36 16" stroke="#b5651d" stroke-width="2" fill="none"/><circle cx="24" cy="24" r="3" fill="#e67e22"/></svg>`;
        case 'treasure':
            return `<svg viewBox="0 0 48 48"><rect x="8" y="20" width="32" height="16" rx="4" fill="#b5651d" stroke="#222" stroke-width="2"/><rect x="12" y="24" width="24" height="8" rx="2" fill="#f4d03f" stroke="#b5651d" stroke-width="2"/><rect x="8" y="16" width="32" height="8" rx="4" fill="#d2691e" stroke="#222" stroke-width="2"/></svg>`;
        case 'empty':
            return `<svg viewBox="0 0 48 48"><rect x="8" y="32" width="32" height="8" rx="4" fill="#bfa76f"/><ellipse cx="24" cy="36" rx="16" ry="4" fill="#a67c52"/></svg>`;
        case 'hidden':
            return `<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="6" fill="#8b4513" stroke="#222" stroke-width="2"/><text x="24" y="32" text-anchor="middle" font-size="20" fill="#f4d03f" font-family="Arial">?</text></svg>`;
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

// Hacer las funciones disponibles globalmente para el HTML
(window as any).startGame = startGame;
(window as any).showInstructions = showInstructions;
(window as any).hideInstructions = hideInstructions;
(window as any).backToMenu = backToMenu;
(window as any).movePlayer = movePlayer;