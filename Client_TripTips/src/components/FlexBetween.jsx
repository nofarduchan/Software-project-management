// ייבוא רכיב Box מספריית MUI (Material-UI)
import { Box } from "@mui/material";
// ייבוא פונקציית styled מספריית MUI system ליצירת רכיבים מותאמים אישית
import { styled } from "@mui/system";

// יצירת רכיב מותאם אישית בשם FlexBetween
// FlexBetween הוא רכיב מסוג Box עם סגנונות נוספים
const FlexBetween = styled(Box)({
  // הגדרת תכונת התצוגה ל'flex' ליצירת קונטיינר גמיש
  display: "flex",
  // יישור פריטי הילדים כך שיהיו מפוזרים באופן אחיד עם רווחים ביניהם
  justifyContent: "space-between",
  // יישור פריטי הילדים כך שיהיו ממרכזים לאורך הציר המשני (אופקית במקרה זה)
  alignItems: "center",
});

// ייצוא רכיב FlexBetween לשימוש בחלקים אחרים של האפליקציה
export default FlexBetween;
