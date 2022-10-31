import React, { useState, createContext, useReducer } from "react";
import { useContext } from "react";
import { POST_QUERY_ACTION_TYPE,QUERY_INITIAL_STATE,PostQueryReducer } from "../utils/PostQuery.Reducer";

const PostQueryState = createContext();
const PostQueryDispatch = createContext();
const onPressPostQuestion = createContext();

//custom hook
export function usePostQueryState() {
  return useContext(PostQueryState);
}

export function usePostQueryDispatch() {
  return useContext(PostQueryDispatch);
}

export function useOnPressedPostQuestion(){
  return useContext(onPressPostQuestion)
}

export function PostQueryContextProvider({children}){
  const [state, dispatch] = useReducer(PostQueryReducer, QUERY_INITIAL_STATE);
  const [isPostQuestionPressed, setIsPostQuestionPressed] = useState(false);

  return (
    <PostQueryState.Provider value={state}>
        <PostQueryDispatch.Provider value={dispatch}>
          <onPressPostQuestion.Provider value={{state: isPostQuestionPressed, setState : setIsPostQuestionPressed}}>
            {children}
          </onPressPostQuestion.Provider>
        </PostQueryDispatch.Provider>
    </PostQueryState.Provider>
  );
};

