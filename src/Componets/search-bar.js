import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import '../Assets/Styles/search-bar.css'
import '../Assets/Styles/icons.css'
import '../Assets/Styles/input.css'
import { useDispatch, useSelector } from 'react-redux';
import { handleChange, searchCategory } from '../Redux/reducers/categoryReducer';


const SearchBar = () => {
    const dispatch = useDispatch();
    const {search, isLoading}= useSelector((state)=> state.category)
    const handleSearch = (e)=>{
        // islloading check 
        dispatch(handleChange({name: e.target.name, value: e.target.value}))
        dispatch(searchCategory(search))
      };
      
    //   const [search, setSearch] = useState('');
    // const handleKeyPress = (e) => {
    //         if (search.trim()) {
    //             console.log(search)
    //             dispatch(searchCategory())
    //         }
    // }
    return (
        <>
            <div className="search_bar_container">
                <span className='icon'><BsSearch /></span>
                <input className='input' type="text"
                    placeholder='enter search value'
                    value={search}
                    name='search'
                    onChange={handleSearch}
                />
                <span className='shortcut'>Ctlr + K</span>
            </div>
           
        </>

    )
}

export default SearchBar