const express = require("express");
const router = express.Router();
const { upload } = require("../cloudConfig");
const {isLoggedIn, isAdmin } = require("../middleware/isAuth");


const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

 
router.post("/",isAdmin,upload.single("img"), createEvent);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put("/:id",isLoggedIn,isAdmin,upload.single("img"), updateEvent);

router.delete("/:id",isAdmin,deleteEvent);

module.exports = router;

