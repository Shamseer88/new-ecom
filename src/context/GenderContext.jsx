import { createContext, useContext, useState } from "react";

const GenderContext = createContext();

export const GenderProvider = ({ children }) => {
  const [gender, setGender] = useState("Men");
  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};

export const useGender = () => useContext(GenderContext);
