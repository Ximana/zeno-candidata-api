const { Router } = require("express");
const controlador = require("./candidato.controlador");
const { upload } = require("../../config/cloudinary");

const router = Router();

// O upload.single("foto") intercepta o campo "foto" do FormData
// e coloca o ficheiro em req.file antes de chegar ao controlador

router.get("/", controlador.listar);
router.get("/:id", controlador.buscarPorId);
router.post("/", upload.single("foto"), controlador.criar);
router.put("/:id", upload.single("foto"), controlador.actualizar);
router.delete("/:id", controlador.remover);

// Rotas de formações
router.get("/:id/formacoes", controlador.listarFormacoes);
router.post("/:id/formacoes", controlador.adicionarFormacao);
router.put("/:id/formacoes/:formacaoId", controlador.actualizarFormacao);
router.delete("/:id/formacoes/:formacaoId", controlador.removerFormacao);

module.exports = router;