import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { authApi } from './api/authApi'
import {tripApi} from "./api/tripApi"
import { userApi } from './api/userApi'
import { groupApi } from './api/groupApi'
import uiReducer from './slices/uiSlice'

const store = configureStore({ 

     reducer:{
        auth:userReducer, 
        ui:uiReducer,
        [authApi.reducerPath]:authApi.reducer,
        [tripApi.reducerPath]:tripApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [groupApi.reducerPath]:groupApi.reducer,
     },

     middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat([
        authApi.middleware  ,
        tripApi.middleware,
        userApi.middleware,
        groupApi.middleware 
    ])
 })

 

 export default store