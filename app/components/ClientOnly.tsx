'use client';

import { Children, useEffect, useState } from "react";

interface ClientOnlyProps {
    children : React.ReactNode;
}





const ClientOnly: React.FC<ClientOnlyProps> =  ({
    children
}) => {
    const [hasMountedm , setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true)
    },[]);
    
    if (!hasMountedm) {
        return null;
    }
    return ( 
        <>
            {children}
        </>
     );
}
 
export default ClientOnly;