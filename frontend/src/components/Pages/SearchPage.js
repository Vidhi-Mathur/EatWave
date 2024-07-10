import { useCallback, useEffect, useState } from "react";
import SearchSharpIcon from '@mui/icons-material/SearchTwoTone';
import Layout from "../UI/Layout"
import SearchFood from "../../assets/SearchFood.jpg"
import { SuggestionList } from "../user-related/SuggestionList";
import { SearchList } from "../user-related/SearchList";
import { debounce } from "../../util/debounce";

export const SearchPage = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [triggerSearch, setTriggerSearch] = useState(false)

    const fetchSuggestions = async() => {
        if(query.trim() === ''){
            setSuggestions([])
            return;
        }
        const response = await fetch(`http://localhost:3000/search/suggestions?query=${query}`)
        const result = await response.json()
        setSuggestions(result)
        return result
    }

    const fetchSearchResults = async() => {
        if(query.trim() === ''){
            setSearchResults([])
            return;
        }
        const response = await fetch(`http://localhost:3000/search/results?query=${query}`)
        const result = await response.json()
        setSearchResults(result)
        return result
    }

    const debouncedFetchedSuggestions = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions])
    const debouncedFetchedSearchResults = useCallback(debounce(fetchSearchResults, 300), [fetchSuggestions])

    useEffect(() => {
        if(!triggerSearch) debouncedFetchedSuggestions(query)
    }, [query, triggerSearch, debouncedFetchedSuggestions])

    useEffect(() => {
        if(triggerSearch) debouncedFetchedSearchResults(query)
    }, [query, triggerSearch, debouncedFetchedSearchResults])

    const inputChangeHandler = (e) => {
        const searched = e.target.value
        setQuery(searched)
        setTriggerSearch(false)
    }

    const searchHandler = () => {
        setTriggerSearch(true)
    }

    const isFeasible = (state) => {
        return (state.restaurants && state.restaurants.length > 0) || (state.dishes && state.dishes.length > 0)
    }

    return (
        <>
        <Layout customisedImageUrl={SearchFood}>
        <div className="flex w-full max-w-4xl mx-auto my-5 border border-gray-300 rounded-md overflow-hidden">
            <input type="search" placeholder="Search for restaurants and food" className="flex-grow px-4 py-3 text-base outline-none" value={query} onChange={inputChangeHandler}/>
            <button className="px-4 py-3 bg-white hover:bg-gray-100 transition-colors" onClick={searchHandler}>
                <SearchSharpIcon color="disabled"/>
            </button>
        </div>
        {triggerSearch? (
            isFeasible(searchResults) && <SearchList searchResults={searchResults}/>
        ): (
            (isFeasible(suggestions) || query.length > 0) && <SuggestionList suggestions={suggestions} onSearch={searchHandler} query={query}/>
        )}
        </Layout>
        </>
    )
}