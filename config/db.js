const mongoose = require("mongoose");

const dbUrL =
	"mongodb+srv://sumanth:sumanth@cluster0.2vscjkp.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
	try {
		await mongoose.connect(dbUrL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
