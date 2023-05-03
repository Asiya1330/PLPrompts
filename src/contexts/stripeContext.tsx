import React from 'react'
import { createContext } from 'vm'

export const StripeContext = createContext({

})


const StripeProvider = ({ children }: any) => {

    return (
        <StripeContext.Provider value={{}}>
            {children}
        </StripeContext.Provider>
    )
}

export default StripeProvider
