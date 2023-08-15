import { createSlice } from "@reduxjs/toolkit"
import { getProfileDetails } from "../../api/auth/auth-request";

const initialState = {
    auth:false,
    loading:true,
    user:{

    }
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      start_loading: (state) => {
        state.loading = true;
      },
      stop_loading: (state) => {
        state.loading = false;
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
      add_login_details: (state, action) => {
        state.auth = true;
        state.user = action.payload
      },
      log_out: (state) => {
        state = initialState
      },
    },
  })
  
  export const { start_loading, stop_loading, add_login_details, log_out} = authSlice.actions
  
  export const loginUser = (data) => (dispatch) => {
      dispatch(add_login_details(data))
  }

  export const checkUserLoggedIn = (data) => async (dispatch) => {
            dispatch(start_loading())
            const token = localStorage.getItem("token");
            if(token)
            {
                const getusersDetails = await getProfileDetails()
               // console.log(getusersDetails.profile)
                dispatch(add_login_details(getusersDetails.profile))
                dispatch(stop_loading())
            }
            dispatch(stop_loading())
           // window.location.reload();
           
  }
  // Other code such as selectors can use the imported `RootState` type
  export const user = (state) => state.auth
  
  export default authSlice.reducer