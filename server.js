// Ponto de entrada, inicia o servidor

require("dotenv").config();
const app = require("./src/app");

const PORTA = process.env.PORT || 3001;

app.listen(PORTA, () => {
  console.log(`Servidor a correr em http://localhost:${PORTA}`);
});