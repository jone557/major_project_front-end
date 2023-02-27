import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import '../Assets/Styles/search-bar.css'
import '../Assets/Styles/icons.css'
import '../Assets/Styles/input.css'
import { AppContext, AppProvider } from '../context/context'
import Spinner from './spinner'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [isListVisible, setIsListVisible] = useState(false);
    const listContainerRef = useRef(null);
    const inputRef = useRef(null);

    const { searchRequest, error, isSearchLoading } = React.useContext(AppContext)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (searchTerm) {
            const results = await searchRequest(searchTerm)
            if (results) {
                console.log('result********')
                console.log(results.message.data)
                setSearchResult(results.message.data)
                setIsListVisible(true);
            }
        }
    }

    const handleClickOutside = (e) => {
        if (listContainerRef.current && !listContainerRef.current.contains(e.target)) {
            setIsListVisible(false);
        }
    };

    const handleShortcut = (e) => {
        if (e.keyCode === 75 && e.ctrlKey) {
            e.preventDefault();
            inputRef.current.focus();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <form onSubmit={handleSearch}>
                <div className="search_bar_container">
                    <span className='icon'><BsSearch /></span>
                    <input className='input' type="text"
                        placeholder='enter search value'
                        value={searchTerm}
                        name='search'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        ref={inputRef}
                        onKeyDown={handleShortcut}
                    />
                    {
                        !isSearchLoading && (
                            <button type='submit'>
                                <span className='shortcut'>Ctlr + K</span>
                            </button>
                        )
                    }
                </div>
            </form>

            {searchResult.length > 0 && isListVisible && (
                
                <div className='list_container flex col 'ref={listContainerRef} >
                    <div>
                        <p className='m-1'>Component Categories <hr /></p>
                   
                        {
                        searchResult?.map(result => (
                            <Link className='m-1' to={'/components/category/' + (result.id)} key={result.id}><h5 >{result.title}</h5></Link>
                            ))
                        }
                    </div>
                </div>
            )
            }
        </>

    )
}

export default SearchBar