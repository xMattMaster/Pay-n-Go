import dynamic from 'next/dynamic'
import React from 'react' 

function NoSSRWrapper({ children } : {children : React.ReactNode}) { 
    return (
    <React.Fragment>{children}</React.Fragment> 
    );
}
export default dynamic(() => Promise.resolve(NoSSRWrapper), { 
    ssr: false 
})