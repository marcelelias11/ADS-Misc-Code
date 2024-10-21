import app from "./src/app.js";

const PORT = 3000;

// const rotas = {
//   "/":"Back-End Frameworks",
//   "/livros":"Entrei na rota livros",
//   "/autores": "Entrei na rota autores"
// };

// const server = app.createServer((req, res) => {
//   res.writeHead(200, { "content-type": "text/plane" });
//   res.end(rotas(req.url));
// });

app.listen(PORT, () => {
  console.log("Servidor escutando!");
});
