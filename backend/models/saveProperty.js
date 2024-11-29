import mongoose from "mongoose";

const savePropertySchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true 
});

const SaveProperty = mongoose.model("SaveProperty", savePropertySchema);

export default SaveProperty;
