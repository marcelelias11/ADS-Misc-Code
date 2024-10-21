// Importing required modules
const express = require('express'); // Importing Express.js to create the server and handle routes.
const bodyParser = require('body-parser'); // Importing body-parser to parse incoming request bodies.
const app = express(); // Creating an instance of an Express app.
const PORT = 3000; // Defining the port number where the server will run.

// Using body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Data structures to store teams, players, matches, and goals
let teams = []; // Array to store the teams.
let players = []; // Array to store the players.
let matches = []; // Array to store the matches.
let goals = []; // Array to store the goals scored.

// Function to find top scorer
const getTopScorer = () => {
    const scorerMap = {}; // Object to store player names as keys and their goal counts as values.
    goals.forEach(goal => {
        if (scorerMap[goal.player]) {
            scorerMap[goal.player]++;
        } else {
            scorerMap[goal.player] = 1;
        }
    });
    let topScorer = null; // Variable to store the top scorer's name.
    let maxGoals = 0; // Variable to store the maximum number of goals.
    for (let player in scorerMap) {
        if (scorerMap[player] > maxGoals) {
            topScorer = player;
            maxGoals = scorerMap[player];
        }
    }
    return { player: topScorer, goals: maxGoals };
};

// Route to register a team
app.post('/registerTeam', (req, res) => {
    const { teamName } = req.body; // Extracting the team name from the request body.
    if (teams.length < 8) {
        teams.push({ name: teamName, players: [] }); // Adding the team to the teams array.
        res.status(201).send('Team registered successfully.');
    } else {
        res.status(400).send('Maximum of 8 teams already registered.');
    }
});

// Route to register a player
app.post('/registerPlayer', (req, res) => {
    const { playerName, position, teamName } = req.body; // Extracting player details from the request body.
    const team = teams.find(t => t.name === teamName); // Finding the team the player belongs to.
    if (team && players.length < 23 && (position !== 'Goalkeeper' || team.players.filter(p => p.position === 'Goalkeeper').length < 3)) {
        const player = { name: playerName, position }; // Creating a new player object.
        team.players.push(player); // Adding the player to the team's players array.
        players.push(player); // Adding the player to the global players array.
        res.status(201).send('Player registered successfully.');
    } else {
        res.status(400).send('Could not register player.');
    }
});

// Route to schedule a match
app.post('/scheduleMatch', (req, res) => {
    const { team1, team2 } = req.body; // Extracting match details from the request body.
    if (teams.find(t => t.name === team1) && teams.find(t => t.name === team2)) {
        matches.push({ team1, team2, score1: 0, score2: 0, winner: null }); // Adding the match to the matches array.
        res.status(201).send('Match scheduled successfully.');
    } else {
        res.status(400).send('Teams not found.');
    }
});

// Route to add goals
app.post('/addGoal', (req, res) => {
    const { matchId, player, team } = req.body; // Extracting goal details from the request body.
    const match = matches[matchId]; // Finding the match by its ID.
    if (match && players.find(p => p.name === player) && teams.find(t => t.name === team)) {
        goals.push({ player, team }); // Adding the goal to the goals array.
        if (team === match.team1) {
            match.score1++; // Incrementing the score for team1.
        } else if (team === match.team2) {
            match.score2++; // Incrementing the score for team2.
        }
        res.status(201).send('Goal added successfully.');
    } else {
        res.status(400).send('Invalid match or player.');
    }
});

// Route to declare winner of a match
app.post('/declareWinner', (req, res) => {
    const { matchId } = req.body; // Extracting match ID from the request body.
    const match = matches[matchId]; // Finding the match by its ID.
    if (match) {
        if (match.score1 > match.score2) {
            match.winner = match.team1; // Setting the winner to team1.
        } else if (match.score2 > match.score1) {
            match.winner = match.team2; // Setting the winner to team2.
        } else {
            res.status(400).send('Match is a draw.');
            return;
        }
        res.status(201).send(`Winner declared: ${match.winner}`);
    } else {
        res.status(400).send('Match not found.');
    }
});

// Route to get top scorer
app.get('/topScorer', (req, res) => {
    const topScorer = getTopScorer(); // Getting the top scorer.
    res.status(200).send(topScorer);
});

// Route to get the champion (winner of the final match)
app.get('/champion', (req, res) => {
    const finalMatch = matches[matches.length - 1]; // Assuming the last match is the final.
    if (finalMatch && finalMatch.winner) {
        res.status(200).send({ champion: finalMatch.winner });
    } else {
        res.status(400).send('Final match not concluded.');
    }
});

// Route to get all matches of a particular team
app.get('/matches/:teamName', (req, res) => {
    const teamName = req.params.teamName; // Extracting team name from the request parameters.
    const teamMatches = matches.filter(match => match.team1 === teamName || match.team2 === teamName); // Filtering matches involving the team.
    res.status(200).send(teamMatches);
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});