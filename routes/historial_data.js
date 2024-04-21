const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	// busy_hours(
	// 	"ChIJ7aVxnOTHwoARxKIntFtakKo",
	// 	"AIzaSyCKaXv_I0ZG33qyfjZt7oKTPjupbPZxjlQ"
	// ).then((data) => {
	//})
	res.send({
		name: "Central Library",
		formatted_address: "123 Main St, Sample City, 10001",
		location: {
			lat: 52.225232,
			lng: 21.0122137,
		},
		week: [
			{
				day: "Mon",
				hours: [
					{
						hour: 6,
						percentage: 10,
					},
					{
						hour: 7,
						percentage: 25,
					},
					{
						hour: 8,
						percentage: 50,
					},
					{
						hour: 9,
						percentage: 75,
					},
					{
						hour: 10,
						percentage: 65,
					},
					{
						hour: 11,
						percentage: 55,
					},
					{
						hour: 12,
						percentage: 40,
					},
					{
						hour: 13,
						percentage: 45,
					},
					{
						hour: 14,
						percentage: 50,
					},
					{
						hour: 15,
						percentage: 60,
					},
					{
						hour: 16,
						percentage: 70,
					},
					{
						hour: 17,
						percentage: 80,
					},
					{
						hour: 18,
						percentage: 75,
					},
					{
						hour: 19,
						percentage: 50,
					},
					{
						hour: 20,
						percentage: 30,
					},
					{
						hour: 21,
						percentage: 15,
					},
				],
			},
			{
				day: "Tue",
				hours: [
					{
						hour: 6,
						percentage: 5,
					},
					{
						hour: 7,
						percentage: 20,
					},
					{
						hour: 8,
						percentage: 45,
					},
					{
						hour: 9,
						percentage: 70,
					},
					{
						hour: 10,
						percentage: 60,
					},
					{
						hour: 11,
						percentage: 50,
					},
					{
						hour: 12,
						percentage: 35,
					},
					{
						hour: 13,
						percentage: 40,
					},
					{
						hour: 14,
						percentage: 45,
					},
					{
						hour: 15,
						percentage: 55,
					},
					{
						hour: 16,
						percentage: 65,
					},
					{
						hour: 17,
						percentage: 75,
					},
					{
						hour: 18,
						percentage: 70,
					},
					{
						hour: 19,
						percentage: 45,
					},
					{
						hour: 20,
						percentage: 25,
					},
					{
						hour: 21,
						percentage: 10,
					},
				],
			},
			// Additional days can follow the same pattern
		],
		now: {
			hour: 12,
			percentage: 30,
		},
	});
});

module.exports = router;
