import { createSlice } from "@reduxjs/toolkit"


const initialState = {
     notificationDialog:false  ,
     searchDialog:false,
     chatNavigation:false
}

export const uiSlice = createSlice({
      initialState,
      name:"uiSlice",
      reducers:{
          setNotificationDialog:(state,action)=>{
              state.notificationDialog = action.payload 
          },
          setSearchDialog:(state,action)=>{
            state.searchDialog = action.payload 
          },
          setChatNavigation:(state,action)=>{
             state.chatNavigation = action.payload 
          }
      }
})


export default uiSlice.reducer 
export const {setNotificationDialog,setSearchDialog,setChatNavigation} = uiSlice.actions 