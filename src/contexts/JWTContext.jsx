//

import { createContext, useEffect, useReducer } from "react";
// sonner-toast
import { toast } from "sonner";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

// ----------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  userRole: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, userRole } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      userRole,
    };
  },
  LOGIN: (state, action) => {
    const { user, userRole } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      userRole,
    };
  },
  REGISTER: (state, action) => {
    const { user, userRole } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      userRole,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    userRole: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const normaliseUserRole = (role) => {
    if (!role) return null;
    else if (role === "ROLE_USER") return "user";
    else if (role === "ROLE_VENDOR") return "vendor";
    else if (role === "ROLE_ADMIN") return "admin";
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const userData = JSON.parse(window.localStorage.getItem("userData"));

        if (accessToken && isValidToken(accessToken) && userData?.email) {
          setSession(accessToken);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: userData,
              userRole: normaliseUserRole(userData?.role[0]?.authority),
            },
          });
        } else {
          setSession(null);
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              userRole: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            userRole: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/public/login", {
      email,
      password,
    });

    if (response.data?.code === 200 && response.data?.data?.email) {
      const { jwt = "", ...rest } = response.data.data;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...rest,
          userRole: normaliseUserRole(rest?.role[0]?.authority),
        })
      );
      localStorage.setItem(
        "userRole",
        normaliseUserRole(rest?.role[0]?.authority)
      );

      setSession(jwt);
      dispatch({
        type: "LOGIN",
        payload: {
          user: rest,
          userRole: normaliseUserRole(rest?.role[0]?.authority),
        },
      });
    }
  };

  const register = async (email, password, firstName, lastName, role) => {
    const response = await axios.post("/public/signup", {
      email,
      password,
      firstName,
      lastName,
      role,
    });

    if (response.data?.code === 200 && response.data?.data?.email) {
      toast.success("Your profile has been created successfully ...!!!");

      const { jwt = "", ...rest } = response.data.data;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...rest,
          userRole: normaliseUserRole(rest?.role[0]?.authority),
        })
      );
      localStorage.setItem(
        "userRole",
        normaliseUserRole(rest?.role[0]?.authority)
      );

      setSession(jwt);
      dispatch({
        type: "REGISTER",
        payload: {
          user: rest,
          userRole: normaliseUserRole(rest?.role[0]?.authority),
        },
      });
    } else {
      toast.error(
        "Oops, We are facing some issues while creating your profile ...!!!"
      );
    }
  };

  const logout = async () => {
    setSession(null);
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem("userRole");
    dispatch({ type: "LOGOUT" });

    toast.success("User has been logged out successfully ...!!!");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
