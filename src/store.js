import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './Reducer/pasteSlice'


export default configureStore({
  reducer: {
    paste: pasteReducer,
  },
})