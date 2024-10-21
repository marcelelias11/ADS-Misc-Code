import express from "express";

const app = express();

app.use(express.json());
function Falecido(nome, data) {
  this.nome = nome;
  this.data = data;
}
function Sepultura(responsavel) {
  this.responsavel = responsavel;
  this.cova = [];
}
let rua = [];
function novarua() {
  if (rua.length >= 5) {
    let rua2 = rua;
    rua = [];
    console.log(rua2);
  } else {
    //console.log(`Ainda tem ${5 - rua.length} espaços na rua anterior!`);
    //console.log(rua);
    return false;
  }
}
let novacova = null;
function criarsepultura(nome, data, responsavel) {
  if (rua.length >= 5) {
    console.log("Essa rua está cheia!");
    return false;
  } else {
    let defunto = new Falecido(nome, data);
    novacova = new Sepultura(responsavel);
    novacova.cova.push(defunto);
    rua.push(novacova);
    console.log(defunto);
    console.log(novacova);
  }
}
function atualizarsepultura(nome, data) {
  if (Sepultura.cova.length >= 3) {
    console.log("A sepultura está cheia!");
    return false;
  } else {
    let defunto = new Falecido(nome, data);
    Sepultura.sepultura.push(defunto);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/criarsepultura", (req, res) => {
  res.send(novacova);
});
app.get("/criarrua", (req, res) => {
  res.send(rua);
});
app.post("/criarrua", (req, res) => {
  novarua();
  if (rua.length <= 5) {
    res
      .status(400)
      .send(`Ainda tem ${5 - rua.length} espaços na rua anterior!`);
  } else {
    res.status(201).send("Rua Cadastrada!");
  }
});
app.post("/criarsepultura", (req, res) => {
  criarsepultura(req.body.nome, req.body.data, req.body.responsavel);
  res.status(201).send("Sepultura Cadastrada!");
});
app.post("/atualizarsepultura:id", (req, res) => {
  atualizarsepultura(req.body.nome, req.body.data);
  res.status(201).send("Sepultura Cadastrada!");
});

export default app;
