"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from "react";
import type { BiodataForm, LamaranForm, MagangForm } from "@/types";

interface FormState {
  biodata: BiodataForm | null;
  lamaran: LamaranForm | null;
  magang: MagangForm | null;
  activeFormType: "biodata" | "lamaran" | "magang" | null;
}

type FormAction =
  | { type: "SET_BIODATA"; payload: BiodataForm }
  | { type: "SET_LAMARAN"; payload: LamaranForm }
  | { type: "SET_MAGANG"; payload: MagangForm }
  | { type: "HYDRATE_STATE"; payload: FormState }
  | { type: "CLEAR_FORM" };

const initialState: FormState = {
  biodata: null,
  lamaran: null,
  magang: null,
  activeFormType: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_BIODATA":
      return {
        ...state,
        biodata: action.payload,
        activeFormType: "biodata",
      };
    case "SET_LAMARAN":
      return {
        ...state,
        lamaran: action.payload,
        activeFormType: "lamaran",
      };
    case "SET_MAGANG":
      return {
        ...state,
        magang: action.payload,
        activeFormType: "magang",
      };
    case "HYDRATE_STATE":
      return action.payload;
    case "CLEAR_FORM":
      return initialState;
    default:
      return state;
  }
};

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  isHydrated: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("suratai_form_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: "HYDRATE_STATE", payload: parsed });
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("suratai_form_draft", JSON.stringify(state));
    }
  }, [state, isMounted]);

  return (
    <FormContext.Provider value={{ state, dispatch, isHydrated: isMounted }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
