import { createContext, useState } from "react";

// the UserContext
export const UserContext = createContext("Name Unknown");

// the UserProvider component
export function UserProvider({ children }) {
    const [name, setName] = useState("");

    return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>;
}