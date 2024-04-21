const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const Profile = require("../models/Profile");
const User = require("../models/User");

router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.post("/", auth, async (req, res) => {
	const { youtube, twitter, instagram, linkedin, facebook, ...rest } = req.body;
	const profileFields = {
		user: req.user.id,
		...rest,
	};
	const socialFields = { youtube, twitter, instagram, linkedin, facebook };
	for (const [key, value] of Object.entries(socialFields)) {
		if (value && value.length > 0)
			socialFields[key] = normalize(value, { forceHttps: true });
	}
	profileFields.social = socialFields;

	try {
		let profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileFields },
			{ new: true, upsert: true, setDefaultsOnInsert: true }
		);
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		await Promise.all([
			//Post.deleteMany({ user: req.user.id }),
			Profile.findOneAndRemove({ user: req.user.id }),
			User.findOneAndRemove({ _id: req.user.id }),
		]);

		res.json({ msg: "User deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
