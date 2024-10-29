export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <title>تأكيد البريد الالكتروني</title>
</head>
<body  style="font-family: Rubik, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; direction:rtl">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">تأكيد البريد الالكتروني</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h5>مرحبا بك في مسكن</h5>
    <h5>شكرًا لإختيارك مسكن!<br><br> كود تفعيل حسابك:</h5>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <h5>أدخل هذا الرمز في صفحة تأكيد البريد الالكتروني.</h5>
    <h5>هذا الكود ستنتهي صلاحيته خلال 20 دقيقة لإسباب امنية.</h5>
    <h5>اذا لم تقم بإنشاءء الحساب ، تجاهل الايميل.</h5>
    <h5>مع أطيب التحيات،<br>فريق مسكن</h5>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <h5>هذه رسالة آلية ، يرجى عدم الرد على هذا البريد الإلكتروني.</h5>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE =`
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <title>مرحبا بك في مسكن</title>
</head>
<body style="font-family: Rubik, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">مرحبا بك في مسكن</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h4>مرحباً {name}،</h4>
    <h4>نحن سعداء جداً بانضمامك إلينا !</h4>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        🎉
      </div>
    </div>
    <h4>إذا كان لديك أي استفسارات، لا تتردد في التواصل مع فريق الدعم لدينا.</h4>
    <h4>نوصي بأن تقوم بما يلي للاستفادة القصوى من الموقع:</h4>
    <ul>
      <li>استكشاف الميزات المتاحة</li>
      <li>تخصيص إعدادات الحساب حسب احتياجاتك</li>
      <li>البقاء على اطلاع بأحدث العروض العقارية</li>
    </ul>
    <h4>شكراً لانضمامك إلينا!</h4>
    <h4>مع أطيب التحيات،<br>فريق مسكن</h4>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <h4>هذه رسالة آلية، يرجى عدم الرد على هذا البريد الإلكتروني.</h4>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <title>استرجاع كلمة المرور</title>
</head>
<body style="font-family: Rubik, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">استرجاع كلمة المرور</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h5>مرحبًا،</h5>
    <h5>لقد تلقينا طلب استرجاع كلمة المرور لحسابك... <br> اذا لم تقم بهذا الطلب، تجاهل هذه الرسالة.</h5>
    <h5>لـ إعادة كلمة المرور الخاصة بك، اضغط على الزر:</h5>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">إعادة كلمة المرور</a>
    </div>
    <h5>تنتهي صلاحية هذا الرابط بعد ساعة لأسباب امنية.</h5>
    <h5>مع أطيب التحيات،<br>فريق مسكن</h5>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <h5>هذه رسالة آلية ، يرجى عدم الرد على هذا البريد الإلكتروني.</h5>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إعادة تعيين كلمة المرور ناجحة</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">إعادة تعيين كلمة المرور ناجحة</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h5>مرحباً،</h5>
    <h5>نكتب لك لتأكيد أن كلمة المرور الخاصة بك قد تم إعادة تعيينها بنجاح.</h5>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <h5>إذا لم تكن أنت من قام ببدء عملية إعادة تعيين كلمة المرور، يرجى الاتصال بفريق الدعم لدينا على الفور.</h5>
    <h5>لأسباب أمنية، نوصي بأن تقوم بـ:</h5>
    <ul>
      <li>استخدام كلمة مرور قوية وفريدة</li>
      <li>تجنب استخدام نفس كلمة المرور عبر مواقع متعددة</li>
    </ul>
    <h5>شكراً لمساعدتك في الحفاظ على أمان حسابك.</h5>
    <h5>مع أطيب التحيات،<br>فريق مسكن</h5>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <h5>هذه رسالة آلية، يرجى عدم الرد على هذا البريد الإلكتروني.</h5>
  </div>
</body>
</html>

`;
