import React from 'react'
import { createContext,ReactNode ,useState} from 'react'

interface ContextType {
    sideBarFlag:boolean, 
    setSideBarFlag:(a:boolean)=>void
}
export const SideBarContextProvider = createContext<ContextType | undefined>(undefined);

interface Props{
    children:ReactNode
}

const SideBarContext:React.FC<Props> = ({children}) => {
    const [sideBarFlag, setSideBarFlag] = useState<boolean>(true);
    return (
    <SideBarContextProvider.Provider value={{sideBarFlag, setSideBarFlag}}>
        {children}
    </SideBarContextProvider.Provider>
  )
}

export default SideBarContext