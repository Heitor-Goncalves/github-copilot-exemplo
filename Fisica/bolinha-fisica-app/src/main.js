document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 80%, 50%)`;
    }

    let balls = [];

    function addBall(x, y) {
        balls.push({
            x: x,
            y: y,
            radius: 20,
            color: getRandomColor(),
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            gravity: 0.5,
            friction: 0.98,
            bounce: 0.7
        });
    }

    function drawBalls() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const ball of balls) {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    function update() {
        for (const ball of balls) {
            ball.vy += ball.gravity;
            ball.x += ball.vx;
            ball.y += ball.vy;

            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.vy *= -ball.bounce;
            }

            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.vx *= -ball.bounce;
            }

            ball.vx *= ball.friction;
            ball.vy *= ball.friction;
        }
        drawBalls();
        requestAnimationFrame(update);
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        addBall(event.clientX - rect.left, event.clientY - rect.top);
    });

    // Inicializa com uma bolinha no centro
    addBall(canvas.width / 2, canvas.height / 2);

    update();
});