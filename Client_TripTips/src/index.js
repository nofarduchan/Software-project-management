import React from "react";
import ReactDOM from "react-dom/client"; // ייבוא של ReactDOM ליצירת root לאפליקציה
import "./index.css"; // ייבוא קובץ ה-CSS הראשי
import App from "./App.js"; // ייבוא הקומפוננטה הראשית של האפליקציה
import authReducer from "./state"; // ייבוא ה-reducer של האימות שנוצר ב-state
import { configureStore } from "@reduxjs/toolkit"; // ייבוא של פונקציית יצירת ה-store מ-Redux Toolkit
import { Provider } from "react-redux"; // ייבוא של Provider ל-redux
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // ייבוא כלים ל-persistence מ-redux-persist
import storage from "redux-persist/lib/storage/index.js"; // ייבוא סוג ה-storage לשימוש עם redux-persist
import { PersistGate } from "redux-persist/integration/react"; // ייבוא של PersistGate לאינטגרציה עם React

// הגדרת קונפיגורציה ל-persist (שימור)
const persistConfig = { key: "root", storage, version: 1 };

// יצירת reducer מתמשך (persisted)
const persistedReducer = persistReducer(persistConfig, authReducer);

// הגדרת ה-store עם ה-reducer המתמשך והגדרת המידלוור המתאים
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // התעלמות מפעולות שלא ניתנות לסיריאליזציה
      },
    }),
});

// יצירת root לאפליקציה ב-ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// הרצת האפליקציה בתוך StrictMode עם Provider ל-redux ו-PersistGate
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
