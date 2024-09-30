const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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
      }
];

let players = [];
let scores = {};
let currentQuestionIndex = 0;
let answersReceived = 0;

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('playerId', socket.id);

    socket.on('ready', (playerName) => {
        if (!players.find(p => p.id === socket.id)) {
            players.push({ id: socket.id, name: playerName });
            scores[socket.id] = 0;
            console.log('Player ready:', playerName);
            
            if (players.length === 1) {
                socket.emit('waitingForPlayer');
            } else if (players.length === 2) {
                io.emit('startGame', players);
                sendNextQuestion();
            }
        }
    });

    socket.on('answer', (answer) => {
        console.log('Answer received:', answer);
        if (answer === questions[currentQuestionIndex - 1].answer) {
            scores[socket.id]++;
        }
        answersReceived++;
        
        io.emit('updateScores', scores);
        
        if (answersReceived === 2) {
            answersReceived = 0;
            setTimeout(sendNextQuestion, 2000);
        }
    });

    socket.on('disconnect', () => {
        players = players.filter(p => p.id !== socket.id);
        delete scores[socket.id];
        console.log('A user disconnected');
        if (players.length === 1) {
            io.emit('waitingForPlayer');
        }
    });
});

function sendNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        console.log('Sending question:', currentQuestionIndex + 1);
        io.emit('newQuestion', questions[currentQuestionIndex]);
        currentQuestionIndex++;
    } else {
        console.log('Game over');
        io.emit('gameOver', scores);
        // Reset game state
        currentQuestionIndex = 0;
        scores = {};
        players = [];
    }
}

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});