require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  if (NODE_ENV === "production") {
    console.log(`Servidor rodando em produção na porta ${PORT}`);
  } else {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  }
});