import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface ContextType {
  sideBarFlag: boolean;
  setSideBarFlag: (value: boolean) => void;
}

export const SideBarContextProvider = createContext<ContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const SideBarContext: React.FC<Props> = ({ children }) => {
  const [sideBarFlag, setSideBarFlag] = useState(true);

  return (
    <SideBarContextProvider.Provider value={{ sideBarFlag, setSideBarFlag }}>
      {children}
    </SideBarContextProvider.Provider>
  );
};

export default SideBarContext;
