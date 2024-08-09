import { useState, useEffect, useCallback, useMemo } from "react";
import SearchSharpIcon from '@mui/icons-material/SearchTwoTone';
import { Layout }from "../UI/Layout"
import SearchFood from "../../assets/SearchFood.jpg"
import { SuggestionList } from "../user-related/SuggestionList";
import { SearchList } from "../user-related/SearchList";
import { debounce } from "../../util/debounce";
import { ErrorDialog } from '../UI/ErrorDialog';

export const SearchPage = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [triggerSearch, setTriggerSearch] = useState(false)
    const [errors, setErrors] = useState(null)

    const fetchSuggestions = useCallback(async(q) => {
        if(q.trim() === ''){
            setSuggestions([])
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search/suggestions?query=${q}`)
            const result = await response.json()
            if(!response.ok) {
                const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                setErrors(errorMessages);
                return;
            }
            setSuggestions(result)
            return result
        }
        catch(err){
            setErrors([err.message || "Failed fetching suggestions try again later"])
            return
        }
    }, [])

    const fetchSearchResults = useCallback(async(q) => {
        if(q.trim() === ''){
            setSearchResults([])
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search/results?query=${q}`)
            const result = await response.json()
            if(!response.ok) {
                const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                setErrors(errorMessages);
                return;
            }
            setSearchResults(result)
            return result
        }
        catch(err) {
            setErrors([err.message || "Failed fetching search results try again later"]);
            return
        }
    }, [])

    const debouncedFetchedSuggestions = useMemo(() => debounce(fetchSuggestions, 300), [fetchSuggestions])
    const debouncedFetchedSearchResults = useMemo(() => debounce(fetchSearchResults, 300), [fetchSearchResults])

    useEffect(() => {
        if(!triggerSearch) debouncedFetchedSuggestions(query)
        else debouncedFetchedSearchResults(query)
    }, [query, triggerSearch, debouncedFetchedSuggestions, debouncedFetchedSearchResults])

    const inputChangeHandler = (e) => {
        const searched = e.target.value
        setQuery(searched)
        setTriggerSearch(false)
    }

    const searchHandler = () => {
        setTriggerSearch(true)
    }
    

    const isFeasible = () => {
        return (suggestions.restaurants && suggestions.restaurants.length > 0) || (suggestions.dishes && suggestions.dishes.length > 0)
    }

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    return (
        <>
        <Layout customisedImageUrl={SearchFood}>
        <div className="flex w-full max-w-4xl mx-auto my-5 border border-gray-300 rounded-md overflow-hidden">
            {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
            <input type="search" placeholder="Search for restaurants and food" className="flex-grow px-4 py-3 text-base outline-none" value={query} onChange={inputChangeHandler}/>
            <button className="px-4 py-3 bg-white hover:bg-gray-100 transition-colors" onClick={searchHandler}>
                <SearchSharpIcon color="disabled"/>
            </button>
        </div>
        {triggerSearch? (
            <SearchList searchResults={searchResults} query={query}/>
        ): (
            (isFeasible() || query.length > 0) && <SuggestionList suggestions={suggestions} onSearch={searchHandler} query={query}/>
        )}
        </Layout>
        </>
    )
}