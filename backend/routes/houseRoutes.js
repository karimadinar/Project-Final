const express = require("express");
const router = express.Router();
const {
  createHouse,
  getAllHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
} = require("../controllers/houseController");
    

// Créer une maison
router.post("/", createHouse);

// Obtenir toutes les maisons
router.get("/", getAllHouses);

// Obtenir une maison par ID
router.get("/:id", getHouseById);

// Mettre à jour une maison
router.put("/:id", updateHouse);

// Supprimer une maison
router.delete("/:id", deleteHouse);

module.exports = router;
