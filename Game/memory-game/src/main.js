document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const cardSize = 180;
    const cardGap = 20;
    const gridSize = 4;
    const cards = [];
    let flippedCards = [];
    let matchedCards = 0;
    let matched = Array(gridSize * gridSize).fill(false);

    // Paleta de cores pastéis para as cartas (16 cartas)
    const pastelColors = [
        '#FFD1DC', '#B5EAD7', '#FFDAC1', '#C7CEEA',
        '#E2F0CB', '#FFB7B2', '#FF9AA2', '#C7CEEA',
        '#B5EAD7', '#FFDAC1', '#FFB7B2', '#FFD1DC',
        '#E2F0CB', '#FFB7B2', '#FFDAC1', '#C7CEEA'
    ];

    // canvas.width e height já definidos no HTML (900x900), mas pode ajustar se quiser
    // canvas.width = gridSize * (cardSize + cardGap) + cardGap;
    // canvas.height = gridSize * (cardSize + cardGap) + cardGap;

    function createCards() {
        const totalCards = Math.floor((gridSize * gridSize) / 2);
        for (let i = 0; i < totalCards; i++) {
            cards.push(i);
            cards.push(i);
        }
        if (cards.length < gridSize * gridSize) {
            cards.push(-1); // carta "vazia" para completar o grid ímpar
        }
        shuffle(cards);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function drawCards() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Centralizar o grid
        const totalGridWidth = gridSize * cardSize + (gridSize + 1) * cardGap;
        const totalGridHeight = gridSize * cardSize + (gridSize + 1) * cardGap;
        const offsetX = (canvas.width - totalGridWidth) / 2 + cardGap;
        const offsetY = (canvas.height - totalGridHeight) / 2 + cardGap;
        for (let i = 0; i < cards.length; i++) {
            const x = (i % gridSize) * (cardSize + cardGap) + offsetX;
            const y = Math.floor(i / gridSize) * (cardSize + cardGap) + offsetY;
            let isFaceUp = flippedCards.includes(i) || matched[i];
            ctx.save();
            ctx.fillStyle = isFaceUp ? pastelColors[cards[i] % pastelColors.length] : '#f3f3f3';
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 4;
            ctx.shadowColor = '#ccc';
            ctx.shadowBlur = 10;
            ctx.fillRect(x, y, cardSize, cardSize);
            ctx.strokeRect(x, y, cardSize, cardSize);
            ctx.restore();
            if (isFaceUp && cards[i] !== -1) {
                ctx.save();
                ctx.fillStyle = '#444';
                ctx.font = 'bold 70px Comic Sans MS, Comic Sans, cursive, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 2;
                ctx.fillText(cards[i], x + cardSize/2, y + cardSize/2);
                ctx.restore();
            }
        }
    }

    function flipCard(index) {
        if (cards[index] === -1 || matched[index]) return;
        if (flippedCards.length < 2 && !flippedCards.includes(index)) {
            flippedCards.push(index);
            drawCards();
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function showCongrats() {
        const congrats = document.getElementById('congrats');
        congrats.style.display = 'flex';
        congrats.style.flexDirection = 'column';
        congrats.style.alignItems = 'center';
        congrats.style.justifyContent = 'center';
        congrats.style.position = 'fixed';
        congrats.style.top = 0;
        congrats.style.left = 0;
        congrats.style.width = '100vw';
        congrats.style.height = '100vh';
        congrats.style.background = 'rgba(255,255,255,0.85)';
        startConfetti();
    }

    function startConfetti() {
        const confettiCanvas = document.getElementById('confettiCanvas');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        const ctx = confettiCanvas.getContext('2d');
        const confettiCount = 200;
        const confetti = [];
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                r: Math.random() * 8 + 4,
                d: Math.random() * confettiCount,
                color: `hsl(${Math.random()*360}, 80%, 70%)`,
                tilt: Math.random() * 10 - 10
            });
        }
        function drawConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            for (let i = 0; i < confettiCount; i++) {
                const c = confetti[i];
                ctx.beginPath();
                ctx.ellipse(c.x, c.y, c.r, c.r/2, c.tilt, 0, 2 * Math.PI);
                ctx.fillStyle = c.color;
                ctx.fill();
            }
            updateConfetti();
            requestAnimationFrame(drawConfetti);
        }
        function updateConfetti() {
            for (let i = 0; i < confettiCount; i++) {
                const c = confetti[i];
                c.y += Math.cos(c.d) + 2 + c.r/2;
                c.x += Math.sin(c.d);
                c.tilt += Math.random() * 0.2 - 0.1;
                if (c.y > confettiCanvas.height) {
                    c.x = Math.random() * confettiCanvas.width;
                    c.y = -10;
                }
            }
        }
        drawConfetti();
    }

    function checkMatch() {
        const [firstIndex, secondIndex] = flippedCards;
        if (cards[firstIndex] === cards[secondIndex]) {
            matched[firstIndex] = true;
            matched[secondIndex] = true;
            matchedCards += 2;
        }
        flippedCards = [];
        drawCards();
        if (matchedCards === cards.length - (cards.includes(-1) ? 1 : 0)) {
            setTimeout(() => showCongrats(), 100);
        }
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        // Usar o mesmo offset do drawCards para calcular o índice
        const totalGridWidth = gridSize * cardSize + (gridSize + 1) * cardGap;
        const totalGridHeight = gridSize * cardSize + (gridSize + 1) * cardGap;
        const offsetX = (canvas.width - totalGridWidth) / 2 + cardGap;
        const offsetY = (canvas.height - totalGridHeight) / 2 + cardGap;
        const x = event.clientX - rect.left - offsetX;
        const y = event.clientY - rect.top - offsetY;
        if (x < 0 || y < 0) return;
        const col = Math.floor(x / (cardSize + cardGap));
        const row = Math.floor(y / (cardSize + cardGap));
        if (col < 0 || col >= gridSize || row < 0 || row >= gridSize) return;
        const index = row * gridSize + col;
        flipCard(index);
    });

    createCards();
    drawCards();
});