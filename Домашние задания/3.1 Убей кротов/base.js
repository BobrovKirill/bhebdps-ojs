(() => {
    let playing = true,
        activeHole = 1,
        deadCount = 0,
        lostCount = 0;

    const stop = () => playing = true,
        getHole = index => document.getElementById(`hole${index}`),
        deactivateHole = index =>
            getHole(index).className = 'hole',
        activateHole = index =>
            getHole(index).className = 'hole hole_has-mole',
        updateStats = () => {
            document.getElementById('dead').textContent = deadCount;
            document.getElementById('lost').textContent = lostCount;
        },
        resetGame = () => {
            deadCount = 0;
            lostCount = 0;
            updateStats();
        },
        checkGameStatus = () => {
            if (deadCount >= 10) {
                alert('Поздравляем! Вы победили!');
                resetGame();
            } else if (lostCount >= 5) {
                alert('Игра окончена! Вы проиграли!');
                resetGame();
            }
        },
        handleHoleClick = (event) => {
            if (!playing) return;

            const hole = event.target;

            if (hole.classList.contains('hole_has-mole')) {
                deadCount++;
            } else {
                lostCount++;
            }

            updateStats();
            checkGameStatus();
        },
        next = () => setTimeout(() => {
            if (!playing) {
                return;
            }
            deactivateHole(activeHole);
            activeHole = Math.floor(1 + Math.random() * 9);
            activateHole(activeHole);
            next();
        }, 800);

    for (let i = 1; i <= 9; i++) {
        const hole = getHole(i);
        hole.onclick = handleHoleClick;
    }

    next();
})();