import mongoose from "mongoose";
import Property from "../models/property.model.js";




export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find({});
        res.status(200).json({success: true, data: properties});
    } catch (error) {
        console.error('Error in get properties', error.msg)
        res.status(500).json({ success: false, msg: "Server Error" });
        
    }
};

export const createProperty = async (req, res) => {
    const property = req.body // user will be passed

    if(!property.title || !property.description || !property.price || !property.location){
        return res.status(400).json({ success:false, msg: "Please provide all required fields" });
    }

    const newProperty = new Property(property);

    try {
        await newProperty.save();
        res.status(201).json({ success: true, msg: "Property created successfully", data: newProperty });
    } catch (error) {
        console.error('Error in create property', error.msg)
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};

export const deleteProperty = async (req, res) => {
    const {propertyId} = req.params
    try {
        await Property.findByIdAndDelete(propertyId)
        res.status(200).json({ success: true, msg: "Property deleted successfully" });
    } catch (error) {
        res.status(404).json({ success: false, msg: "Error Property not found" });
    }
};


export const updateProperties = async (req, res) => {
    const {propertyId} = req.params
    const property = req.body

    if(!mongoose.Types.ObjectId.isValid(propertyId)){
        return res.status(404).json({ success: false, msg: "Invalid Id" });
    }

    try {
       const updatedProperty = await Property.findByIdAndUpdate(propertyId , property ,{new: true})
        res.status(200).json({ success: true, data: updatedProperty });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};