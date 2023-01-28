import React from 'react'
import '../Assets/Styles/autoOpen.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function AutoOpen() {
    const categorystore = useSelector((state) => state.category)
    const results = categorystore.si_category


    console.log(results)
    // console.log(searchs)
    if (results.length === 0) {
        return ('')
    }
    return (
        <div className='list_container flex col ' >
            {results?.map(result => (
                <Link to={'/components/category/'+ (result.id)} key={result.id}><h4 >{result.title}</h4></Link>
            ))
            }
        </div>
    )
}

export default AutoOpen