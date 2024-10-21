import express from "express";

const app = express();
app.use(express.json());
const livros = [
  {
    id: 1,
    titulo: "Harry Potter e a Pedra Filosofal",
    precoCompra: 0,
    precoVenda: 0,
    estoque: 0,
  },
  {
    id: 2,
    titulo: "Harry Potter e a Câmara Secreta",
    precoCompra: 0,
    precoVenda: 0,
    estoque: 0,
  },
];
app.get("/", (req, res) => {
  res.status(200).send("back-end");
});
app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});
app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});
app.get("/livros/:id", (req, res) => {
  let index = buscarLivro(req.params.id);
  res.status(200).json(livros[index]);
});
/*app.post("/livros/:id", (req, res) => {
  let index = req.params.id;
  livros[index].valorcompra = req.body;
  livros[index].valorvenda = parseFloat(req.body) * 1.35;
  res.status(201).send("Valor cadastrado com sucesso!");
});*/
app.put("/livros/:id", (req, res) => {
  let index = buscarLivro(req.params.id);
  livros[index].precoCompra = Number(req.body.precoCompra);
  livros[index].precoVenda = Number(req.body.precoCompra) * 1.35;
  livros[index].estoque = Number(req.body.estoque);
  res.status(200).json(livros[index]);
});
app.put("/vender/:id", (req, res) => {
  venda(req.params.id);
  res.status(200).json(livros[index]);
});
/*app.put("/livros/:id", (req, res) => {
  let index = buscarLivro(req.params.id);
  
  res.status(200).json(livros[index]);
});*/
function venda(id) {
  let index = buscarLivro(req.params.id);
  if (livros[index].estoque <= 0) {
    return null;
  }
  livros[index].estoque = livros[index]--;
  return livros[index];
}
function buscarLivro(id) {
  return livros.findIndex((livros) => {
    return livros.id === Number(id);
  });
}
export default app;
