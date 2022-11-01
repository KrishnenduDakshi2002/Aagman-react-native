import React, { useState, createContext, useReducer } from "react";
import { useContext } from "react";
import { POST_QUERY_ACTION_TYPE,QUERY_INITIAL_STATE,PostQueryReducer } from "../utils/PostQuery.Reducer";

import {POSTANSWER_ACTION_TYPES,PostAnswerReducer,POST_ANSWER_INITIAL_STATE} from '../utils/postAnswer.Reducer'


const PostQueryState = createContext();
const PostQueryDispatch = createContext();
const onPressPostQuestion = createContext();
const PostAnwerContext = createContext();

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
export function usePostAnswerContext(){
  return useContext(PostAnwerContext)
}

export function PostQueryContextProvider({children}){
  const [state, dispatch] = useReducer(PostQueryReducer, QUERY_INITIAL_STATE);
  const [PostAnswerState,PostAnswerDispatch] = useReducer(PostAnswerReducer,POST_ANSWER_INITIAL_STATE);

  const [isPostQuestionPressed, setIsPostQuestionPressed] = useState(false);

  return (
    <PostQueryState.Provider value={state}>
        <PostQueryDispatch.Provider value={dispatch}>
          <onPressPostQuestion.Provider value={{state: isPostQuestionPressed, setState : setIsPostQuestionPressed}}>
            <PostAnwerContext.Provider value={{state:PostAnswerState, setState :PostAnswerDispatch}}>
              {children}
            </PostAnwerContext.Provider>
          </onPressPostQuestion.Provider>
        </PostQueryDispatch.Provider>
    </PostQueryState.Provider>
  );
};

