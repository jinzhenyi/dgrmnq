let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new Game2048();

    document.addEventListener('keydown', (e) => {
        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'w': 'up',
            's': 'down',
            'a': 'left',
            'd': 'right'
        };

        if (keyMap[e.key]) {
            e.preventDefault();
            game.move(keyMap[e.key]);
        }
    });

    document.getElementById('new-game-btn').addEventListener('click', () => {
        game.newGame();
    });

    document.getElementById('try-again-btn').addEventListener('click', () => {
        game.newGame();
    });

    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > 30) {
                const direction = deltaX > 0 ? 'right' : 'left';
                game.move(direction);
            }
        } else {
            if (Math.abs(deltaY) > 30) {
                const direction = deltaY > 0 ? 'down' : 'up';
                game.move(direction);
            }
        }

        touchStartX = 0;
        touchStartY = 0;
    }, { passive: false });
});
