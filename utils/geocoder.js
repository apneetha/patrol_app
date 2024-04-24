const NodeGeocoder = require("node-geocoder");

const options = {
	provider: "mapquest",
	httpAdapter: "http",
	apiKey: "MljS30GjwqTCNKlkslekQBUtXHgNugwC",
	formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
