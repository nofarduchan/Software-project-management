// ייצוא צבעים
export const colorTokens = {
  grey: {
    0: "#FFFFFF",     // לבן
    10: "#F6F6F6",    // אפור מאוד בהיר
    50: "#F0F0F0",    // אפור בהיר
    100: "#E0E0E0",   // אפור בהיר
    200: "#C2C2C2",   // אפור בהיר
    300: "#A3A3A3",   // אפור
    400: "#858585",   // אפור
    500: "#666666",   // אפור כהה
    600: "#4D4D4D",   // אפור כהה
    700: "#333333",   // אפור כהה מאוד
    800: "#1A1A1A",   // אפור כהה מאוד
    900: "#0A0A0A",   // אפור כמעט שחור
    1000: "#000000",  // שחור
  },
  primary: {
    50: "#E6FBFF",    // תכלת בהיר מאוד
    100: "#CCF7FE",   // תכלת בהיר
    200: "#99EEFD",   // תכלת
    300: "#66E6FC",   // תכלת כהה
    400: "#33DDFB",   // תכלת כהה יותר
    500: "#00D5FA",   // תכלת כהה מאוד
    600: "#00A0BC",   // כחול בהיר
    700: "#006B7D",   // כחול
    800: "#00353F",   // כחול כהה
    900: "#001519",   // כחול כהה מאוד
    1000:"#4caf50", // ירוק כהה מאוד
  },
  green:{
    100: "#a5d6a7",  // ירוק בהיר מאוד
    200: "#81c784",  // ירוק בהיר
    300: "#66bb6a",  // ירוק כהה מעט
    400: "#4caf50",  // ירוק ראשי
    500: "#43a047",  // ירוק כהה
    600: "#388e3c",  // ירוק כהה יותר
    700: "#2e7d32",  // ירוק כהה מאוד
    800: "#1b5e20",  // ירוק כהה ביותר
    900: "#0a3d12",  // ירוק כהה ביותר
  },
};
  
// הגדרות נושא MUI
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // ערכי פלטה למצב כהה
            primary: {
              dark: colorTokens.primary[200],    // צבע ראשי כהה
              main: colorTokens.primary[500],    // צבע ראשי
              light: colorTokens.primary[800],   // צבע ראשי בהיר
            },
            green: {
              main: colorTokens.green[300], 
            },
            neutral: {
              dark: colorTokens.grey[100],       // צבע נייטרלי כהה
              main: colorTokens.grey[200],       // צבע נייטרלי
              mediumMain: colorTokens.grey[300], // צבע נייטרלי בינוני
              medium: colorTokens.grey[400],     // צבע נייטרלי בינוני יותר
              light: colorTokens.grey[700],      // צבע נייטרלי בהיר
            },
            background: {
              default: colorTokens.grey[900],    // רקע ברירת מחדל כהה
              alt: colorTokens.grey[800],        // רקע חלופי כהה
            },
          }
        : {
            // ערכי פלטה למצב בהיר
            primary: {
              dark: colorTokens.primary[700],    // צבע ראשי כהה
              main: colorTokens.primary[500],    // צבע ראשי
              light: colorTokens.primary[50],    // צבע ראשי בהיר
            },
            neutral: {
              dark: colorTokens.grey[700],       // צבע נייטרלי כהה
              main: colorTokens.grey[500],       // צבע נייטרלי
              mediumMain: colorTokens.grey[400], // צבע נייטרלי בינוני
              medium: colorTokens.grey[300],     // צבע נייטרלי בינוני יותר
              light: colorTokens.grey[50],       // צבע נייטרלי בהיר
            },
            background: {
              default: colorTokens.grey[10],     // רקע ברירת מחדל בהיר
              alt: colorTokens.grey[0],          // רקע חלופי בהיר
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן
      fontSize: 12,                                  // גודל גופן ברירת מחדל
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן לכותרת 1
        fontSize: 40,                                  // גודל גופן לכותרת 1
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן לכותרת 2
        fontSize: 32,                                  // גודל גופן לכותרת 2
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן לכותרת 3
        fontSize: 24,                                  // גודל גופן לכותרת 3
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן לכותרת 4
        fontSize: 20,                                  // גודל גופן לכותרת 4
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן לכותרת 5
        fontSize: 16,                                  // גודל גופן לכותרת 5
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // משפחת גופן לכותרת 6
        fontSize: 14,                                  // גודל גופן לכותרת 6
      },
    },
  };
};
