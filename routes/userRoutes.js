const express = require("express");
const { getUsers, getProfile, deleteUser, updateUser, uploadProfileImage } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/profile", auth, getProfile);
router.post("/upload-profile-image", auth, upload.single("profileImage"), uploadProfileImage);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, authorize("admin"), deleteUser);

module.exports = router;