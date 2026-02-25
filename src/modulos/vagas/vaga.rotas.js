const { Router } = require("express");
const controlador = require("./vaga.controlador");

const router = Router();

// GET    /api/vagas       → listar todas
// GET    /api/vagas/:id   → buscar uma
// POST   /api/vagas       → criar
// PUT    /api/vagas/:id   → actualizar
// DELETE /api/vagas/:id   → remover

router.get("/", controlador.listar);
router.get("/:id", controlador.buscarPorId);
router.post("/", controlador.criar);
router.put("/:id", controlador.actualizar);
router.delete("/:id", controlador.remover);

module.exports = router;