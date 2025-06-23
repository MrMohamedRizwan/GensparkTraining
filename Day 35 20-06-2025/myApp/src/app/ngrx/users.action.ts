import { createAction, props } from "@ngrx/store";
import { User } from "../models/User";

export const LOAD_USERS = createAction('[Users] Load Users');
export const LOAD_USERS_SUCCESS = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const LOAD_USERS_FAILURE = createAction('[Users] Load Users Failure', props<{ error: string }>());
export const adduser = createAction('[Users] Add User', props<{ users: User }>());