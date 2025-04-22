const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["HR_MANAGER", "ADMIN"],
        default: "HR_MANAGER",
    },
});

module.exports = mongoose.model("User", UserSchema);
