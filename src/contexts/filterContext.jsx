import React, { useState, createContext, useReducer } from "react";
import { useContext } from "react";
import {
  INITIAL_STATE,
  ACTION_TYPES,
  CheckBoxReducer,
} from "../utils/filterCheckBoxReducer";

export const SearchFilterContext = createContext();
export const SearchFilterUpdateFunctionContext = createContext();

//custom hook
export function useFilterState() {
  return useContext(SearchFilterContext);
}

export function useFilterDispatchFunction() {
  return useContext(SearchFilterUpdateFunctionContext);
}

export function SearchFilterContextProvider({children}){
  const [state, dispatch] = useReducer(CheckBoxReducer, INITIAL_STATE);

  return (
    <SearchFilterContext.Provider value={state}>
        <SearchFilterUpdateFunctionContext.Provider value={dispatch}>
            {children}
        </SearchFilterUpdateFunctionContext.Provider>
    </SearchFilterContext.Provider>
  );
};

