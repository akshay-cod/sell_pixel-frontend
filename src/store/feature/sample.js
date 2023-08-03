import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0,
  }

export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1
      },
      decrement: (state) => {
        state.value -= 1
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
    },
  })
  
  export const { increment, decrement, incrementByAmount } = counterSlice.actions
  
  export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    }, 1000)
  }

  // Other code such as selectors can use the imported `RootState` type
  export const selectCount = (state) => state.counter.value
  
  export default counterSlice.reducer