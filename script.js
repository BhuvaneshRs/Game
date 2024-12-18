let playerName = '';
let playerScore = 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function startGame() {
    playerName = document.getElementById('username').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('name-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
}

function playRound(playerChoice) {
    const choices = ['stone', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = '';

    if (playerChoice === computerChoice) {
        result = `It's a tie! You both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'stone' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'stone') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${playerChoice} beats ${computerChoice}.`;
        playerScore++;
    } else {
        result = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    document.getElementById('result').textContent = result;

    updateLeaderboard();
}

function updateLeaderboard() {
    const playerEntry = leaderboard.find(entry => entry.name === playerName);
    if (playerEntry) {
        playerEntry.wins = playerScore;
    } else {
        leaderboard.push({ name: playerName, wins: playerScore });
    }

    leaderboard.sort((a, b) => b.wins - a.wins);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    showLeaderboard();
}

function showLeaderboard() {
    document.getElementById('leaderboard-section').classList.remove('hidden');
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = '';

    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const winsCell = document.createElement('td');
        nameCell.textContent = entry.name;
        winsCell.textContent = entry.wins;
        row.appendChild(nameCell);
        row.appendChild(winsCell);
        tbody.appendChild(row);
    });
}
