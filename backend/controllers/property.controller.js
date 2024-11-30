import mongoose from "mongoose";
import Property from "../models/property.model.js";
import cloudinary from "../config/cloudinary.js"



export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find({})
        .populate('owner')
        res.status(200).json({success: true, data: properties});
    } catch (error) {
        console.error('Error in get properties', error.message || error);
        res.status(500).json({ success: false, msg: "Server Error" });
        
    }
};

export const createProperty = async (req, res) => {
    const property = req.body // user will be passed
    // if(!property.title || !property.description || !property.price || !property.location){
    //     return res.status(400).json({ success:false, msg: "Please provide all required fields" });
    // }
    // let cloudinaryResponse = null
    // if(images){
    //     cloudinaryResponse = await cloudinary.uploader.upload(images , {folder: "properties"})
    // }
    // const newProperty = new Property({...property , images: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url: ''});

    let uploadedImages = [];
    let mainPhotoUrl = "";

    if (property.mainPhoto) {
        const mainPhotoResult = await cloudinary.uploader.upload(property.mainPhoto, {
          folder: property.title + property.type + property.price + property.location + property.nearbyServices + property.adLicense + property.ageforbuild + property.size,
        });
        mainPhotoUrl = mainPhotoResult.secure_url;
      }

    if (property.images && Array.isArray(property.images)) {
      for (const imageBase64 of property.images) {
        const result = await cloudinary.uploader.upload(imageBase64, {
          folder: property.title + property.type + property.price + property.location + property.nearbyServices + property.adLicense + property.ageforbuild + property.size,
        });
        uploadedImages.push(result.secure_url);
      }
    }

    const newProperty = new Property({
      ...property,
      mainPhoto: mainPhotoUrl,
      images: uploadedImages,
    });

    try {
        await newProperty.save();
        res.status(201).json({ success: true, msg: "Property created successfully", data: newProperty });
    } catch (error) {
        console.error('Error in create property', error.message)
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};

// export const deleteProperty = async (req, res) => {
//     const {propertyId} = req.params
//     try {
//         const property = await Property.findById(propertyId);
//         const folderName = property.title;
//         await cloudinary.api.delete_folder(folderName, { invalidate: true });
//         await Property.findByIdAndDelete(propertyId)

//         res.status(200).json({ success: true, msg: "Property deleted successfully" });
//     } catch (error) {
//         res.status(404).json({ success: false, msg: "Error Property not found" });
//     }
// };

export const deleteProperty = async (req, res) => {
    const { propertyId } = req.params;
  
    try {
        // العثور على العقار في قاعدة البيانات
        const property = await Property.findById(propertyId);
        
        // إذا لم يتم العثور على العقار
        if (!property) {
            return res.status(404).json({ success: false, msg: "Property not found" });
        }

        // اسم المجلد الذي يحتوي على الصور
        const folderName = property.title + property.type + property.price + property.location + property.nearbyServices + property.adLicense + property.ageforbuild + property.size;


        await cloudinary.api.delete_resources_by_prefix(folderName, { invalidate: true });
        
        // حذف المجلد من Cloudinary
        await cloudinary.api.delete_folder(folderName, { invalidate: true });

        // حذف العقار من قاعدة البيانات
        await Property.findByIdAndDelete(propertyId);

        // إرسال استجابة بنجاح الحذف
        res.status(200).json({ success: true, msg: "Property and folder deleted successfully" });

    } catch (error) {
        // إرسال رسالة خطأ مفصلة
        console.error('Error in deleting property:', error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};

// export const updateProperties = async (req, res) => {
//     const {propertyId} = req.params
//     const property = req.body

//     if(!mongoose.Types.ObjectId.isValid(propertyId)){
//         return res.status(404).json({ success: false, msg: "Invalid Id" });
//     }

//     try {
//        const updatedProperty = await Property.findByIdAndUpdate(propertyId , property ,{new: true})
//         res.status(200).json({ success: true, data: updatedProperty });
//     } catch (error) {
//         res.status(500).json({ success: false, msg: "Server Error" });
//     }
// };



export const updateProperty = async (req, res) => {
    const { propertyId } = req.params;
    const updatedData = req.body;  
    const newImagesBase64 = req.body.images;   
    const newMainPhotoBase64 = req.body.mainPhoto; 
    const imagesToDelete = req.body.imagesToDelete || [];  

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ success: false, msg: "Property not found" });
        }

        const folderName = property.title + property.type + property.price + property.location + property.nearbyServices + property.adLicense + property.ageforbuild + property.size;
        let updatedImages = property.images || []; 

        if (imagesToDelete.length > 0) {
            try {
                const publicIdsToDelete = imagesToDelete.map((image) => {
                    const publicId = image.split('/').pop().split('.')[0];  // استخراج public_id من الرابط
                    return `${folderName}/${publicId}`; // إضافة اسم المجلد
                });

                // حذف الصور من Cloudinary
                const deleteResult = await cloudinary.api.delete_resources(publicIdsToDelete, { invalidate: true });


                // تحديث قائمة الصور في قاعدة البيانات بعد الحذف
                updatedImages = updatedImages.filter((image) => {
                    const publicId = image.split('/').pop().split('.')[0];
                    return !publicIdsToDelete.includes(`${folderName}/${publicId}`);
                });

            } catch (cloudError) {
                console.error('Error deleting images from Cloudinary:', cloudError);
                return res.status(500).json({
                    success: false,
                    msg: "Error deleting images from Cloudinary",
                    error: cloudError.message,
                });
            }
        }

        // **رفع الصور الجديدة (Base64) إلى Cloudinary**
        if (newImagesBase64 && newImagesBase64.length > 0) {
            try {
                for (let base64Image of newImagesBase64) {
                    const uploadResult = await cloudinary.uploader.upload(base64Image, {
                        folder: folderName,  // تحديد المجلد في Cloudinary
                        use_filename: true,
                        unique_filename: false,
                    });
                    const imageExists = updatedImages.some((imageUrl) => imageUrl === uploadResult.secure_url);
                    if (imageExists) {
                        continue;  // تجاهل هذه الصورة إذا كانت موجودة بالفعل
                    }
                    updatedImages.push(uploadResult.secure_url);  // إضافة رابط الصورة الجديدة إلى قائمة الصور
                }
            } catch (cloudError) {
                console.error('Error handling images in Cloudinary:', cloudError);
                return res.status(500).json({
                    success: false,
                    msg: "Error handling images in Cloudinary",
                    error: cloudError.message,
                });
            }
        
        
            // رفع الصورة الرئيسية الجديدة إلى Cloudinary
            try {
                if (newMainPhotoBase64) {
                    const uploadResult = await cloudinary.uploader.upload(newMainPhotoBase64, {
                        folder: folderName,
                        use_filename: true,
                        unique_filename: false,
                    });
        
                    // تحديث الصورة الرئيسية في قاعدة البيانات
                    updatedData.mainPhoto = uploadResult.secure_url;
                } else {
                    console.error('No valid path for new main photo');
                    return res.status(400).json({
                        success: false,
                        msg: "Invalid path for new main photo",
                    });
                }
            } catch (uploadError) {
                console.error('Error uploading new main photo to Cloudinary:', uploadError);
                return res.status(500).json({ 
                    success: false, 
                    msg: "Error uploading new main photo to Cloudinary", 
                    error: uploadError.message 
                });
            }
        }

        const updatedProperty = await Property.findByIdAndUpdate(propertyId, {
            ...updatedData,
            images: updatedImages, 
        }, { new: true });

        res.status(200).json({ success: true, data: updatedProperty, msg: "Property updated successfully" });

    } catch (error) {
        console.error('Error in updating property:', error);
        res.status(500).json({ success: false, msg: "Server Error", error: error.message });
    }
};



export const getProperty = async (req, res) => {
    const {propertyId} = req.params
    try {
        const property = await Property.findById(propertyId)
        .populate("owner")
        res.status(200).json({ success: true, data: property});
    } catch (error) {
        res.status(404).json({ success: false, msg: "Error Property not found" });
    }
};
