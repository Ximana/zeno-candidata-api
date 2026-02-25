const { Router } = require("express");
const controlador = require("./candidatura.controlador");

const router = Router();

// GET    /api/candidaturas       → listar todas
// GET    /api/candidaturas/:id   → buscar uma
// POST   /api/candidaturas       → criar
// PUT    /api/candidaturas/:id   → actualizar estado
// DELETE /api/candidaturas/:id   → remover

router.get("/", controlador.listar);
router.get("/:id", controlador.buscarPorId);
router.post("/", controlador.criar);
router.put("/:id", controlador.actualizar);
router.delete("/:id", controlador.remover);

module.exports = router;