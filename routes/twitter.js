const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../middleware/auth");
const { TwitterApi } = require("twitter-api-v2");
const geocoder = require("../utils/geocoder");

router.get("/twitter", auth, async (req, res) => {
	try {
		const profile = await Profile.find({ user: req.user.id }).populate("user", [
			"name",
			"avatar",
		]);
		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}
		const loc = await geocoder.geocode(profile.location.zipcode);
		const lat = loc[0].latitude;
		const lng = loc[0].longitude;

		const geocode = lat + "," + lng + "," + "10km";

		const startTime = new Date(
			Date.now() - 10 * 24 * 60 * 60 * 1000
		).toISOString();
		const endTime = new Date().toISOString();

		const { data, meta } = await client.v2.search(`-is:retweet`, {
			"geo.place_id": geocode,
			start_time: startTime,
			end_time: endTime,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
