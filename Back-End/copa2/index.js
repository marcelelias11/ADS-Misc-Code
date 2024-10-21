const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let times = [];
let jogadores = [];
let partidas = [];
let gols = [];

const getArtilheiro = () => {
  const artilheiroMap = {};
  gols.forEach((gol) => {
    if (artilheiroMap[gol.jogador]) {
      artilheiroMap[gol.jogador]++;
    } else {
      artilheiroMap[gol.jogador] = 1;
    }
  });
  let Artilheiro = null;
  let maxGols = 0;
  for (let jogador in artilheiroMap) {
    if (artilheiroMap[jogador] > maxGols) {
      Artilheiro = jogador;
      maxGols = artilheiroMap[jogador];
    }
  }
  return { jogador: Artilheiro, gols: maxGols };
};

app.post("/registerTeam", (req, res) => {
  const { teamName } = req.body;
  if (times.length < 8) {
    let jogadorTime = jogadores.filter((player) => player.team === teamName);
    console.log(jogadorTime.length);
    if (
      jogadorTime.length <= 23 &&
      jogadorTime.length >= 13 &&
      jogadorTime.filter((p) => (p.position == "Goleiro") >= 3)
    ) {
      times.push({ name: teamName, jogadores: jogadorTime });
      res.status(201).send("Time registrado com sucesso!");
    } else {
      res.status(400).send("Time não pode ser registrado.");
    }
  } else {
    res.status(400).send("Capacidade máxima de times alcançada.");
  }
  console.log(times);
  console.log(jogadores);
});

app.post("/registerJogador", (req, res) => {
  const { jogadorName, position, teamName } = req.body;
  const jogador = { name: jogadorName, position, team: teamName };
  jogadores.push(jogador);
  res.status(201).send("Jogador registrado com sucesso!");
  console.log(jogadores);
});

app.post("/scheduleMatch", (req, res) => {
  const { team1, team2 } = req.body;
  if (
    times.find((t) => t.name == team1) &&
    times.find((t) => t.name == team2)
  ) {
    partidas.push({ team1, team2, score1: 0, score2: 0, winner: null });
    res.status(201).send("Partida marcada com sucesso!");
  } else {
    res.status(400).send("Times não encontrados.");
  }
  console.log(times);
  console.log(jogadores);
  console.log(partidas);
});

app.post("/addgol", (req, res) => {
  const { matchId, jogador, team } = req.body;
  const match = partidas[matchId];
  if (
    match &&
    jogadores.find((p) => p.name == jogador) &&
    times.find((t) => t.name == team)
  ) {
    gols.push({ jogador, team });
    if (team === match.team1) {
      match.score1++;
    } else if (team === match.team2) {
      match.score2++;
    }
    res.status(201).send("Gol adicionado com sucesso!");
  } else {
    res.status(400).send("Partida ou jogador inválidos.");
  }
  console.log(times);
  console.log(jogadores);
  console.log(partidas);
  console.log(gols);
});

app.post("/declareWinner", (req, res) => {
  const { matchId } = req.body;
  const match = partidas[matchId];
  if (match) {
    if (match.score1 > match.score2) {
      match.winner = match.team1;
    } else if (match.score2 > match.score1) {
      match.winner = match.team2;
    } else {
      res.status(400).send("Empate!");
      return;
    }
    res.status(201).send(`Vencedor: ${match.winner}!`);
  } else {
    res.status(400).send("Partida não encontrada.");
  }
});

app.get("/Artilheiro", (req, res) => {
  const Artilheiro = getArtilheiro();
  res.status(200).send(Artilheiro);
});

app.get("/champion", (req, res) => {
  const finalMatch = partidas[partidas.length - 1];
  if (finalMatch && finalMatch.winner) {
    res.status(200).send({ champion: finalMatch.winner });
  } else {
    res.status(400).send("Partida final não concluída.");
  }
});

app.get("/partidas/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  const teamPartidas = partidas.filter(
    (match) => match.team1 === teamName || match.team2 === teamName
  );
  res.status(200).send(teamPartidas);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
