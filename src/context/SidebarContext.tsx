
import { ReactNode, createContext, useContext, useState } from "react";

interface SidebarContextProps{
    isLargeOpen: boolean,
    isSmallOpen: boolean,
    toggle: () => void,
    close:() =>void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

export function useSidebarContext() {
    const value = useContext(SidebarContext)
    
    if (value === null) throw Error('Cannot use outside of Sidebar')
    
    return value
}

interface SidebarProviderProps{
    children:ReactNode,
}
export const SidebarProvider = ({ children }: SidebarProviderProps)=>{
    const [isLargeOpen, setIsLargeOpen] = useState(true)
    const [isSmallOpen, setIsSmallOpen] = useState(false)
    
    function isScreenSmall() {
        return window.innerWidth < 1024
    }

    const toggle = () => {
        if (isScreenSmall()) setIsSmallOpen(s => !s)
    
        else {
            setIsLargeOpen(l => !l)
            
        
        }
    }

    const close = () => {
        if (isScreenSmall()) setIsSmallOpen(false)
        
        else setIsLargeOpen(false)
    }

    return (
        <SidebarContext.Provider value = {{isLargeOpen,isSmallOpen,toggle,close}}>
            {children}
       </SidebarContext.Provider>
        
    )

}