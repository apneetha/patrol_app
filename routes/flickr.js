const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const geocoder = require("../utils/geocoder");
const flickrSDK = require("flickr-sdk");

const apiKey = "550832b6abfefcfcb6adfcc874f9bcb7";
const apiSecret = "a8fe1410b1ae7a31";

var db = {
	users: new Map(),
	oauth: new Map(),
};

async function getRequestToken(req, res) {
	const { oauth } = flickrSDK.createFlickr({
		consumerKey: apiKey,
		consumerSecret: apiSecret,
		oauthToken: false,
		oauthTokenSecret: false,
	});

	try {
		const { requestToken, requestTokenSecret } = await oauth.request(
			"http://localhost:5001/api/oauth/callback"
		);
		db.oauth.set(requestToken, requestTokenSecret);
		res.statusCode = 302;
		res.setHeader("location", oauth.authorizeUrl(requestToken, "write"));
		res.end();
	} catch (err) {
		console.error(err);
		res.statusCode = 400;
		res.end(err.message);
	}
}

async function verifyRequestToken(req, res) {
	const requestToken = req.query.oauth_token;
	const oauthVerifier = req.query.oauth_verifier;
	console.log(oauthVerifier);

	const requestTokenSecret = db.oauth.get(requestToken);

	const { oauth } = flickrSDK.createFlickr({
		consumerKey: apiKey,
		consumerSecret: apiSecret,
		oauthToken: requestToken,
		oauthTokenSecret: requestTokenSecret,
	});

	try {
		const { nsid, oauthToken, oauthTokenSecret } = await oauth.verify(
			oauthVerifier
		);
		db.users.set(nsid, {
			oauthToken: oauthToken,
			oauthTokenSecret: oauthTokenSecret,
		});
		db.oauth.delete(requestToken);
		console.log("oauth token:", oauthToken);
		console.log("oauth token secret:", oauthTokenSecret);
		const { flickr } = flickrSDK.createFlickr({
			consumerKey: apiKey,
			consumerSecret: apiSecret,
			oauthToken,
			oauthTokenSecret,
		});
		const data = await flickr("flickr.photos.geo.photosForLocation", {
			api_key: apiKey,
			format: "json",
			nojsoncallback: true,
			lat: "34.0549",
			lon: "118.2426",
			accuracy: "3",
		});
		console.log(data);
		res.end(JSON.stringify(data));
	} catch (err) {
		console.error(err);
		res.statusCode = 400;
		res.end(err.message);
	}
}

router.get("/", (req, res) => {
	return getRequestToken(req, res);
});
router.get("/oauth/callback", (req, res) => {
	verifyRequestToken(req, res);
});

// router.get("/", async (req, res) => {
// 	try {
// 		// const loc = await geocoder.geocode(req.query.zipcode);
// 		// const lat = loc[0].latitude;
// 		// const lng = loc[0].longitude;

// 		const url = `https://api.flickr.com/services/rest/`;

// 		//method=flickr.photos.geo.photosForLocation&api_key=${apiKey}&lat=${40}&lon=${40}&format=json&nojsoncallback=1`;
// 		axios
// 			.get(url, {
// 				params: {
// 					method: "flickr.photos.geo.photosForLocation",
// 					api_key: apiKey,
// 					format: "json",
// 					nojsoncallback: true,
// 				},
// 			})
// 			.then((response) => {
// 				res.send(response.data);
// 			})
// 			.catch((error) => {
// 				console.error("Error:", error);
// 			});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

module.exports = router;
