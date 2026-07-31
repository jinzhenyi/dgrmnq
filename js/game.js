class Game2048 {
    constructor() {
        this.size = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('best-score')) || 0;
        this.won = false;
        this.over = false;
        this.init();
    }

    init() {
        this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
        this.score = 0;
        this.won = false;
        this.over = false;
        this.addRandomTile();
        this.addRandomTile();
        this.updateView();
    }

    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
            return { row, col, isNew: true };
        }
        return null;
    }

    move(direction) {
        if (this.over) return false;
        
        const oldGrid = JSON.parse(JSON.stringify(this.grid));
        let merged = Array(this.size).fill(null).map(() => Array(this.size).fill(false));
        let moved = false;

        const rotateGrid = (grid) => {
            const newGrid = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
            for (let row = 0; row < this.size; row++) {
                for (let col = 0; col < this.size; col++) {
                    newGrid[col][this.size - 1 - row] = grid[row][col];
                }
            }
            return newGrid;
        };

        const slideLeft = () => {
            for (let row = 0; row < this.size; row++) {
                let newRow = this.grid[row].filter(cell => cell !== 0);
                for (let i = 0; i < newRow.length - 1; i++) {
                    if (newRow[i] === newRow[i + 1]) {
                        newRow[i] *= 2;
                        this.score += newRow[i];
                        if (newRow[i] === 2048 && !this.won) {
                            this.won = true;
                        }
                        newRow.splice(i + 1, 1);
                        merged[row][i] = true;
                    }
                }
                while (newRow.length < this.size) {
                    newRow.push(0);
                }
                if (JSON.stringify(this.grid[row]) !== JSON.stringify(newRow)) {
                    moved = true;
                }
                this.grid[row] = newRow;
            }
        };

        let rotations = 0;
        switch (direction) {
            case 'up': rotations = 3; break;
            case 'right': rotations = 2; break;
            case 'down': rotations = 1; break;
            case 'left': default: rotations = 0; break;
        }

        for (let i = 0; i < rotations; i++) {
            this.grid = rotateGrid(this.grid);
            merged = rotateGrid(merged);
        }

        slideLeft();

        for (let i = 0; i < (4 - rotations) % 4; i++) {
            this.grid = rotateGrid(this.grid);
            merged = rotateGrid(merged);
        }

        if (moved) {
            this.addRandomTile();
            this.updateView(merged);
            
            if (this.score > this.bestScore) {
                this.bestScore = this.score;
                localStorage.setItem('best-score', this.bestScore.toString());
            }

            if (this.checkGameOver()) {
                this.over = true;
                this.updateView(merged);
            }

            return true;
        }

        if (this.checkGameOver()) {
            this.over = true;
            this.updateView(merged);
        }
        return false;
    }

    checkGameOver() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) return false;
                if (col < this.size - 1 && this.grid[row][col] === this.grid[row][col + 1]) return false;
                if (row < this.size - 1 && this.grid[row][col] === this.grid[row + 1][col]) return false;
            }
        }
        return true;
    }

    updateView(merged = null) {
        const board = document.getElementById('game-board');
        board.innerHTML = '';

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                const value = this.grid[row][col];
                
                if (value !== 0) {
                    cell.textContent = value;
                    cell.setAttribute('data-value', value);
                }

                if (merged && merged[row][col]) {
                    cell.classList.add('merged');
                }

                board.appendChild(cell);
            }
        }

        document.getElementById('score').textContent = this.score;
        document.getElementById('best-score').textContent = this.bestScore;

        const messageEl = document.getElementById('game-message');
        const messageText = document.getElementById('message-text');

        if (this.won && !this.over) {
            messageText.textContent = '恭喜！你赢了！';
            messageEl.classList.add('show');
        } else if (this.over) {
            messageText.textContent = '游戏结束！';
            messageEl.classList.add('show');
        } else {
            messageEl.classList.remove('show');
        }
    }

    newGame() {
        this.init();
        document.getElementById('game-message').classList.remove('show');
    }
}
