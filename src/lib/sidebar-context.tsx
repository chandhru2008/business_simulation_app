import { useSimulation } from "@/components/simulation/simulation-context";
import React, { createContext, useContext, useEffect, useState } from "react";


interface SidebarContextType {
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
}
const SideBarContext = createContext<SidebarContextType>({
    showSidebar: true,
    setShowSidebar: () => { }
});


export function SideBarContextProvider({ children }: { children: React.ReactNode }) {
    const { simulation } = useSimulation();
    const [showSidebar, setShowSidebar] = useState<boolean>(true);
    useEffect(() => {
        if (simulation) {
            setShowSidebar(true);
        }
    }, [simulation]);
    return (
        <SideBarContext.Provider value={{ showSidebar, setShowSidebar }}>
            {children}
        </SideBarContext.Provider>
    )
}


export function useSidebar() {
    const context = useContext(SideBarContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}