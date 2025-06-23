import { createReducer, on } from "@ngrx/store";
import { User } from "../models/User";
import { initialUserState } from "./UserState";
import * as UserActions from "./users.action";
export const userReducer = createReducer(initialUserState,
    on(UserActions.LOAD_USERS,state=>({...state, loading: true, error: null })),
    on(UserActions.LOAD_USERS_SUCCESS, (state,{users})=>({...state, users, loading: false, error: null })),
    on(UserActions.LOAD_USERS_FAILURE, (state,{error})=>({...state, loading: false, error })),
    on(UserActions.adduser, (state,{users})=>({...state, users: [...state.users, users], loading: false, error: null })),
)