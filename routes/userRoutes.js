const express = require("express");
const {
  createUser,
  loginUser,
  editUser,
  deleteUser,
  getUserProperties,
    getUserBookings,
  deleteBooking,
} = require("../controllers/userController");
const { loggedInMiddleware } = require("../middleware/loggedInMidellware");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login-user", loginUser);
router.get("/bookings", loggedInMiddleware, getUserBookings);
router.delete("/delete-booking", loggedInMiddleware, deleteBooking);
router.put("/edit-user", loggedInMiddleware, editUser);
router.delete("/delete-user", loggedInMiddleware, deleteUser);
router.get("/:id/properties", loggedInMiddleware, getUserProperties);

module.exports = router;
