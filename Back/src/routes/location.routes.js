const express = require("express");
const router = express.Router();

const {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} = require("../controllers/location.controllers");
const auth = require("../middlewares/auth");

router.post("/", auth, createLocation);
router.get("/", getLocations);
router.get("/:id", getLocationById);
router.put("/:id", auth, updateLocation);
router.delete("/:id", auth, deleteLocation);

module.exports = router;