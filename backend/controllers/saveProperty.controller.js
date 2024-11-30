import SaveProperty from "../models/saveProperty.js";

export const getSavedProperties = async (req, res) => {
    const userId = req.userId;  // مستخرج من التوكن أو معلومات المستخدم

    try {
        // البحث عن جميع العقارات المحفوظة من قبل المستخدم
        const savedProperties = await SaveProperty.find({ userId }).populate({
            path: 'propertyId',
            populate: {
              path: 'owner',
              select: '-password',
            },
          });;
        
        if (savedProperties.length === 0) {
            return res.status(404).json({ success: false, message: 'لا توجد عقارات محفوظة' });
        }

        res.status(200).json({ success: true, savedProperties });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء جلب العقارات المحفوظة' });
    }
};

export const checkSave = async (req, res) => {
    const { propertyId } = req.params;  // الحصول على propertyId من المعلمات
    const userId = req.userId;  // مستخرج من التوكن

    try {
        // التحقق إذا كان العقار موجودًا في المحفوظات للمستخدم
        const existingSave = await SaveProperty.findOne({ propertyId, userId });

        if (existingSave) {
            return res.status(200).json({ success: true, isSaved: true });
        } else {
            return res.status(200).json({ success: true, isSaved: false });
        }
    } catch (error) {
        console.log('Error checking save status:', error);
        return res.status(500).json({ success: false, message: 'حدث خطأ أثناء التحقق' });
    }
}

export const saveProperty = async (req, res) => {
    const { propertyId } = req.params;  // أخذ propertyId من معلمات الرابط
    const userId = req.userId;  // مستخرج من التوكن أو معلومات المستخدم

    try {
        // تحقق إذا كان العقار محفوظًا بالفعل
        const existingSave = await SaveProperty.findOne({ propertyId, userId });

        if (existingSave) {
            return res.status(400).json({ success: false, message: 'العقار موجود بالفعل في المحفوظات' });
        }

        // حفظ العقار في المحفوظات
        const newSave = new SaveProperty({
            propertyId,
            userId
        });

        await newSave.save();
        res.status(200).json({ success: true, message: 'تم حفظ العقار في المحفوظات' });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء حفظ العقار' });
    }
};

export const removeProperty = async (req, res) => {
    const { propertyId } = req.params;  // أخذ propertyId من معلمات الرابط
    const userId = req.userId;  // مستخرج من التوكن أو معلومات المستخدم

    try {
        // تحقق إذا كان العقار موجودًا في المحفوظات
        const existingSave = await SaveProperty.findOne({ propertyId, userId });

        if (!existingSave) {
            return res.status(400).json({ success: false, message: 'العقار غير موجود في المحفوظات' });
        }

        await SaveProperty.deleteOne({ propertyId, userId });

        res.status(200).json({ success: true, message: 'تم حذف العقار من المحفوظات' });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء حذف العقار' });
    }
};