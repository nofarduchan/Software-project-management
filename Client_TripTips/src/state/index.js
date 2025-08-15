import { createSlice } from "@reduxjs/toolkit";


//הגדרת המצב הראשוני של ה-state ;
const initialState = {
  mode: "light", // מצב התאורה (אור/חושך)
  user: null, // משתמש מחובר
  token: null, // טוקן לאימות
  posts: [], // רשימת פוסטים
};

// יצירת slice עבור האימות (authentication)
export const authSlice = createSlice({
  name: "auth", // שם ה-slice
  initialState, // המצב הראשוני
  reducers: {
    // פעולה לשינוי מצב התאורה
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // פעולה להתחברות (login) והגדרת המשתמש והטוקן
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // פעולה להתנתקות (logout) והסרת המשתמש והטוקן
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  
    // פעולה להגדרת רשימת חברים של המשתמש
    setFriends: (state, action) => {
      if (state.user) 
      {
        state.user.friends = action.payload.friends;
      } 
      else 
      {
        console.error("user friends non-existent :("); // הודעת שגיאה אם אין משתמש
      }
    },

    setFollowing: (state, action) => {
      if (state.user) 
      {
        state.user.following = action.payload.following;
      } 
      else 
      {
        console.error("user following non-existent :("); // הודעת שגיאה אם אין משתמש
      }
    },

    setFollowers: (state, action) => {
      if (state.user) 
      {
        state.user.followers = action.payload.followers;
      } 
      else 
      {
        console.error("user followers non-existent :("); // הודעת שגיאה אם אין משתמש
      }
    },


    // פעולה להגדרת רשימת הפוסטים
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // פעולה לעדכון פוסט ספציפי ברשימת הפוסטים
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// ייצוא הפעולות (actions) לייבוא ושימוש בקומפוננטות אחרות
export const { setMode, setLogin, setLogout, setUser, setFriends, setFollowers, setFollowing, setPosts, setPost} =
  authSlice.actions;

// ייצוא ה-reducer לשימוש בקונפיגורציית ה-store
export default authSlice.reducer;
