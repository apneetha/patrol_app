const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const date = req.query.date;
		const country = req.query.country;
		const response = await axios.get(
			`https://covid-api.com/api/reports?date=${date}&ISO=${country}`
		);
		res.send(response.data);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
