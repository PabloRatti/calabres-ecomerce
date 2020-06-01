const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let kennel = new Schema(
    {
        firstName: {
            type: String
        },
        lastNameName: {
            type: String
        }
    },
    { collection: "kennel" }
);

module.exports = mongoose.model("kennels", kennel);