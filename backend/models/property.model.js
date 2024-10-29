import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500
    },
    price: {
        type: Number,
        // required: true,
        min: 100,
        max: 10000
    },
    location: {
        type: {
            type: String,
            // enum: ["Point"],
            // required: true
        },
        // coordinates: {
        //     type: [Number],
        //     required: true
        // }
    },
    images: [{
        type: String,
        // required: true
    }],
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     // required: true
    // },
    type:{
        type: String,
        // required: true,
        // enum: ["house", "apartment", "condo"]
    },
    rooms:{
        type: Number,
        // required: true,
        min: 1,
    },
    bathrooms:{
        type: Number,
        // required: true,
        min: 1,
    },
    livingrooms:{
        type: Number,
    },
    garages:{
        type: Number,
    },
    water:{
        type: Boolean,
    },
    electricity:{
        type: Boolean,
    },
    internet:{
        type: Boolean,
    },
    wifi:{
        type: String,
    },
    size:{
        type: Number,
        // required: true,
    },
    floor:{
        type: Number,
        // required: true,
    },
    kitchen:{
        type: Boolean,
    },
    facade:{
        type: String
    },
    a3dimage:{
        type: String,
    },
    video:{
        type: String,
    },
    nearbyServices:{
        type: [String]
    },
    adLicense:{
        type: String,
    },
    ageforbuild:{
        type: Number,
        // required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    }

},{
    timestamps: true
});

const Property = mongoose.model("Property", propertySchema);

export default Property;