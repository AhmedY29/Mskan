import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    mainPhoto: {
        type: String,
    },
    location: {
        type: String,
       
    },
    address: {
        type: String,
       
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    images: [{
        type: String,
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type:{
        type: String,
    },
    rooms:{
        type: Number,
    },
    bathrooms:{
        type: Number,
    },
    livingrooms:{
        type: Number,
    },
    garages:{
        type: Number,
    },
    internet:{
        type: Boolean,
    },
    wifi:{
        type: String,
    },
    size:{
        type: Number,
        // : true,
    },
    floor:{
        type: Number,
        // : true,
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
    },
    payment:{
        type: String,
    },
    paymentWay:{
        type: String,
    },

},{
    timestamps: true
});

const Property = mongoose.model("Property", propertySchema);

export default Property;