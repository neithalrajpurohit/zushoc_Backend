const mongoose = require("mongoose");
const secret = process.env.DB_URL;

const connectDB = () => {
    mongoose
        .connect(secret, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Successfully connected to 'zushoc' DB."))
        .catch((err) => console.log(err));
};
module.exports = { connectDB };
