const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Use cors middleware
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8081", // Allow your React Native app's origin
    methods: ["GET", "POST"]
  }
});

const questions = [
    {
        text: "What is the SI unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 1,
      },
      {
        text: "Which of these is a good conductor of electricity?",
        options: ["Rubber", "Wood", "Copper", "Plastic"],
        answer: 2,
      },
      {
        text: "What does an ammeter measure?",
        options: ["Voltage", "Current", "Resistance", "Power"],
        answer: 1,
      },
      {
        text: "In which direction does conventional current flow?",
        options: ["Positive to negative", "Negative to positive", "Both directions", "No direction"],
        answer: 0,
      },
      {
        text: "What is the formula for Ohm's Law?",
        options: ["V = IR", "I = VR", "R = VI", "P = VI"],
        answer: 0,
      },
      {
        text: "Which component is used to control the flow of current in a circuit?",
        options: ["Battery", "Bulb", "Switch", "Wire"],
        answer: 2,
      },
      {
        text: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 2,
      },
      {
        text: "Which of these is an insulator?",
        options: ["Silver", "Gold", "Rubber", "Aluminum"],
        answer: 2,
      },
      {
        text: "What does a voltmeter measure?",
        options: ["Current", "Voltage", "Resistance", "Power"],
        answer: 1,
      },
      {
        text: "How are resistors connected in a series circuit?",
        options: ["Side by side", "One after another", "In a triangle", "In a square"],
        answer: 1,
      },
];

let games = new Map();

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinGame', ({ playerId, playerName }) => {
        console.log(`${playerName} (${playerId}) is trying to join a game`);
        let game = findAvailableGame();
        if (!game) {
            game = createNewGame();
        }
        addPlayerToGame(game, playerId, playerName, socket);

        if (game.players.length === 2) {
            startGame(game);
        } else {
            socket.emit('gameJoined', { message: 'Waiting for an opponent' });
        }
    });

    socket.on('submitAnswer', ({ gameId, playerId, answer }) => {
        const game = games.get(gameId);
        if (!game) return;

        console.log(`Received answer from ${playerId} for game ${gameId}: ${answer}`);
        clearTimeout(game.timer);
        game.answersReceived++;

        const currentQuestion = questions[game.currentQuestionIndex];
        const isCorrect = answer === currentQuestion.correctAnswer;
        
        if (isCorrect) {
            game.scores[playerId]++;
        }

        socket.emit('answerResult', { correct: isCorrect });
        io.to(gameId).emit('updateScores', game.scores);

        if (game.answersReceived === 2 || game.answersReceived === 1 && game.players.length === 1) {
            setTimeout(() => sendNextQuestion(game), 1000);
        }
    });

    socket.on('requestQuestion', ({ gameId, playerId }) => {
        console.log(`Player ${playerId} requested a question for game ${gameId}`);
        const game = games.get(gameId);
        if (game) {
            sendQuestion(game);
        }
    });

    socket.on('leaveGame', () => {
        handlePlayerDisconnection(socket);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        handlePlayerDisconnection(socket);
    });
});

function findAvailableGame() {
    for (let [_, game] of games) {
        if (game.players.length === 1) {
            return game;
        }
    }
    return null;
}

function createNewGame() {
    const gameId = `game-${Date.now()}`;
    const game = {
        id: gameId,
        players: [],
        scores: {},
        currentQuestionIndex: 0,
        answersReceived: 0,
        timer: null
    };
    games.set(gameId, game);
    return game;
}

function addPlayerToGame(game, playerId, playerName, socket) {
    game.players.push({ id: playerId, name: playerName, socket: socket });
    game.scores[playerId] = 0;
    socket.join(game.id);
    console.log(`Player ${playerName} (${playerId}) added to game ${game.id}`);
}

function startGame(game) {
    console.log(`Starting game ${game.id} with players:`, game.players.map(p => p.name));
    io.to(game.id).emit('gameStart', { gameId: game.id });
    sendNextQuestion(game);
}

function sendNextQuestion(game) {
    if (game.currentQuestionIndex < questions.length) {
        sendQuestion(game);
        game.currentQuestionIndex++;
    } else {
        endGame(game);
    }
}

function sendQuestion(game) {
    const question = questions[game.currentQuestionIndex];
    const questionData = {
        text: question.text,
        options: question.options,
        questionNumber: game.currentQuestionIndex + 1,
        totalQuestions: questions.length
    };
    console.log(`Sending question ${game.currentQuestionIndex + 1} for game ${game.id}:`, questionData);
    io.to(game.id).emit('newQuestion', questionData);
    startQuestionTimer(game);
}

function startQuestionTimer(game) {
    game.timer = setTimeout(() => {
        game.answersReceived = game.players.length;
        sendNextQuestion(game);
    }, 15000); // 15 seconds per question
}

function endGame(game) {
    console.log(`Game ${game.id} ended. Final scores:`, game.scores);
    io.to(game.id).emit('gameOver', game.scores);
    games.delete(game.id);
}

function handlePlayerDisconnection(socket) {
    for (let [gameId, game] of games) {
        const playerIndex = game.players.findIndex(p => p.socket === socket);
        if (playerIndex !== -1) {
            game.players.splice(playerIndex, 1);
            delete game.scores[socket.id];
            if (game.players.length === 0) {
                games.delete(gameId);
            } else {
                io.to(gameId).emit('playerDisconnected');
            }
            break;
        }
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});