import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";
import AlertBox from "../../components/AlertBox";

export const userAuthenticate = createAsyncThunk(
  "user/authenticateUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      return await apiRequest("/user/authenticate", "POST", userCredentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      return await apiRequest("/user/profile", "GET", null, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loadSignInFlagFromStorage = () => {
  try {
    const token = localStorage.getItem("tkn");
    if (token) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const loadTokenFromStorage = () => {
  try {
    const token = localStorage.getItem("tkn");
    if (token) {
      return token;
    }
  } catch (error) {}
  return "";
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {
      email: "",
      password: "",
    },
    token: loadTokenFromStorage() || "",
    emailError: "",
    passwordError: "",
    userPwdFlag: false,
    userEmailFlag: false,
    userProfile: {},
    signIn: loadSignInFlagFromStorage() || false,
  },
  reducers: {
    emailChange: (state, action) => {
      const email = action.payload;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email !== "") {
        if (!emailPattern.test(email)) {
          state.emailError = "*Invalid email address";
          state.userEmailFlag = false;
        } else {
          state.emailError = "";
          state.userEmailFlag = true;
        }
      } else {
        state.emailError = "";
      }
      state.userDetails.email = email;
    },
    passwordChange: (state, action) => {
      const password = action.payload;
      if (password !== "") {
        if (password.length < 8) {
          state.passwordError = "*Password must be at least 8 characters long";
          state.userPwdFlag = false;
        } else {
          state.passwordError = "";
          state.userPwdFlag = true;
        }
      } else {
        state.passwordError = "";
      }
      state.userDetails.password = password;
    },
    signOut: (state) => {
      localStorage.removeItem("tkn");
      state.signIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthenticate.fulfilled, (state, action) => {
        state.userDetails = {
          email: "",
          password: "",
        };
        state.token = action.payload;
        localStorage.setItem("tkn", state.token);
        state.signIn = true;
      })
      .addCase(userAuthenticate.rejected, (state, action) => {
        state.userDetails = {
          email: "",
          password: "",
        };
        AlertBox("error", "Error", action.payload);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      });
  },
});

export const { emailChange, passwordChange, signOut } = userSlice.actions;

export default userSlice.reducer;
