import axios from "axios"
import React, { useEffect, useState } from "react"

const AppContext = React.createContext()

// we have access to provider and consumer 

const AppProvider = ({ children }) => {
    // request loading
    const [error, setError] = useState({ show: false, msg: "" })
    const [isSearchLoading, setLoading] = useState(false)
    // const [result, setResult] = useState(false)
    // check request 
    const searchRequest = async (searchTerm) => {
        // toggle error
        setLoading(true)
        const response = await axios.get(`/search/${searchTerm}`)
            .catch((err) => {
                console.log(err)
            })
        if (response) {
            // setResult(response.data)               
            setLoading(false)
            return response.data
        } else {
            toggleError(true, 'There is no result for this search')
            setLoading(false)
        }

    }
    // error
    function toggleError(show, msg) {
        setError({ show, msg })
    }
    // useEffect(searchRequest)

    return <AppContext.Provider value={{ searchRequest, error, isSearchLoading }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider } 