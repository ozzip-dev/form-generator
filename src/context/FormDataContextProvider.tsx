"use client";

import React, { createContext, useContext } from "react";
import { Form, FormSerialized } from "@/types/form";


type FormDataContext = {
    formDataPromise: Promise<Form | null>
}

const FormDataContext = createContext<FormDataContext | null>(null)

type Props = {
    formDataPromise: Promise<Form | null>
    children: React.ReactNode;
}

export const FormDataContextProvider = (props: Props) => {

    return (
        <FormDataContext.Provider value={{ formDataPromise: props.formDataPromise }}>
            {props.children}
        </FormDataContext.Provider>
    )
}

export const useFormData = () => {
    const context = useContext(FormDataContext)
    if (!context) {
        throw new Error("useContext must be used within a UserProvider");
    }
    return context;
}
