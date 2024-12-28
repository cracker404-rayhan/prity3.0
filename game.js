let gameStarted = false;

function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const correctPassword = "prity"; // সঠিক পাসওয়ার্ড
    const errorMessage = document.getElementById("errorMessage");

    if (password === correctPassword) {
        gameStarted = true;
        document.getElementById("passwordContainer").style.display = "none";
        document.getElementById("gameContainer").style.display = "block";
        startGame(); // গেম শুরু হবে
    } else {
        errorMessage.textContent = "Incorrect Password! Try again.";
    }
}

// Game logic
function startGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    let snake = [{x: 10, y: 10}]; // Initial snake position
    let food = {x: 15, y: 15}; // Initial food position
    let dx = 1, dy = 0;
    let score = 0;

    // Game loop
    function gameLoop() {
        if (gameStarted) {
            setTimeout(gameLoop, 100);
            updateGame();
        }
    }

    // Update the game state
    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move the snake
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)}; // new food position
        } else {
            snake.pop();
        }

        // Check if snake collides with wall or itself
        if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || checkCollision(head)) {
            alert("Game Over! Your score: " + score);
            gameStarted = false;
            document.getElementById("passwordContainer").style.display = "block";
            document.getElementById("gameContainer").style.display = "none";
        }

        // Draw the snake
        ctx.fillStyle = "green";
        snake.forEach(segment => {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });

        // Draw the food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

        // Display the score
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 20);
    }

    // Check for collision with the snake itself
    function checkCollision(head) {
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return false;
    }

    // Control the snake direction
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && dy === 0) {
            dx = 0;
            dy = -1;
        } else if (event.key === "ArrowDown" && dy === 0) {
            dx = 0;
            dy = 1;
        } else if (event.key === "ArrowLeft" && dx === 0) {
            dx = -1;
            dy = 0;
        } else if (event.key === "ArrowRight" && dx === 0) {
            dx = 1;
            dy = 0;
        }
    });

    gameLoop(); // Start the game loop
}

