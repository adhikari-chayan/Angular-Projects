import { createAction, createReducer, on } from "@ngrx/store";

export interface UserState {
    maskUserName: boolean;
    
}

const initialState : UserState ={
    maskUserName:false
};

export const userReducer = createReducer<UserState>(
    initialState,
    on(createAction('[User] Toggle Mask Username'),state=>{
        return{
            ...state,
            maskUserName: !state.maskUserName
        };
    })

);