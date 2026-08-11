import { createContext, useContext, useState, type ReactNode } from "react"

interface FieldContextType {
  crop: string
  location: string
  cropStage: string
  setCrop: (value: string) => void
  setLocation: (value: string) => void
  setCropStage: (value: string) => void
}

const FieldContext = createContext<FieldContextType | undefined>(undefined)

export function FieldProvider({ children }: { children: ReactNode }) {
  const [crop, setCrop] = useState("Tomato")
  const [location, setLocation] = useState("Vijayawada")
  const [cropStage, setCropStage] = useState("Flowering")

  return (
    <FieldContext.Provider
      value={{
        crop,
        location,
        cropStage,
        setCrop,
        setLocation,
        setCropStage,
      }}
    >
      {children}
    </FieldContext.Provider>
  )
}

export function useField() {
  const context = useContext(FieldContext)

  if (!context) {
    throw new Error("useField must be used inside FieldProvider")
  }

  return context
}