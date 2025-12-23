import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { checkAuth, logout as logoutApi } from "../../Api/endpoints/auth";
import type { UserI } from "../../types/user";

interface AuthState {
    user: UserI | null;
    isLoading: boolean;
    isAdmin: boolean;
}

const initialState: AuthState = {
    user: (() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    })(),
    isLoading: true,
    isAdmin: (() => {
        const stored = localStorage.getItem("user");
        const user = stored ? JSON.parse(stored) : null;
        return user ? user.role === "admin" : false;
    })(),
};

export const refreshAuth = createAsyncThunk(
    "auth/refresh",
    async (): Promise<UserI | null> => {
        try {
            const res = await checkAuth();
            if (res.success && "data" in res && res.data) {
                return res.data as UserI;
            }
            return null;
        } catch {
            return null;
        }
    }
);

export const logoutAuth = createAsyncThunk("auth/logout", async () => {
    logoutApi();
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserI | null>) => {
            state.user = action.payload;
            state.isAdmin = action.payload ? action.payload.role === "admin" : false;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(refreshAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAdmin = action.payload
                    ? action.payload.role === "admin"
                    : false;
                if (action.payload) {
                    localStorage.setItem("user", JSON.stringify(action.payload));
                } else {
                    localStorage.removeItem("user");
                }
            })
            .addCase(refreshAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAdmin = false;
                localStorage.removeItem("user");
            })
            .addCase(logoutAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutAuth.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAdmin = false;
            })
            .addCase(logoutAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAdmin = false;
            });
    },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
