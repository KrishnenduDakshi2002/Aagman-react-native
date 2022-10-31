import React, { useState, createContext, useReducer } from "react";
import { useContext } from "react";
import { POST_QUERY_ACTION_TYPE,QUERY_INITIAL_STATE,PostQueryReducer } from "../utils/PostQuery.Reducer";

const PostQueryState = createContext();
const PostQueryDispatch = createContext();

//custom hook
export function usePostQueryState() {
  return useContext(PostQueryState);
}

export function usePostQueryDispatch() {
  return useContext(PostQueryDispatch);
}

export function PostQueryContextProvider({children}){
  const [state, dispatch] = useReducer(PostQueryReducer, QUERY_INITIAL_STATE);

  return (
    <PostQueryState.Provider value={state}>
        <PostQueryDispatch.Provider value={dispatch}>
            {children}
        </PostQueryDispatch.Provider>
    </PostQueryState.Provider>
  );
};

