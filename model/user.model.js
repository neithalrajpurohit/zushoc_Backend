const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please enter your name"],
            text: true,
        },
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Please enter your username"],
            text: true,
        },
        email: {
            type: String,
            required: [true, "please enter your e-mail"],
            unique: true,
            lowercase: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLen: 280,
        },
        profileURL: {
            type: String,
            maxLen: 180,
        },
        password: {
            type: String,
            required: [true, "please enter your password"],
            minLength: [
                6,
                "your password must have atleast 6 characters of minimum length",
            ],
        },
        followingList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followersList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error("Incorrect password");
    }
    throw new Error("Incorrect Email ID");
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
