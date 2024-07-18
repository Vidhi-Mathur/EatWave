const base_url = "http://localhost:3000/restaurant";

export  const getSortUrl = (sortedType) => {
    switch(sortedType){
        case "Relevance (default)": 
            return `${base_url}/sort/default`
        case "Ratings": 
            return `${base_url}/sort/ratings`

        case "Cost: Low To High": 
            return `${base_url}/sort/cost-low-to-high`

        case "Cost: High To Low": 
            return `${base_url}/sort/cost-high-to-low`
        default: 
            return null
    }
}

const getFilterConfiguration = (filterType, filterData) => {
    let url, method, body
    switch(filterType) {
        case 'Sort':
            url = getSortUrl(filterData);
            method = 'GET';
            break;
        case 'Cuisines':
            url = `${base_url}/filter/cuisines`;
            body = JSON.stringify({ cuisines: filterData });
            method = 'POST';
            break;
        case 'Ratings':
            url = `${base_url}/filter/ratings`;
            body = JSON.stringify({ ratings: filterData });
            method = 'POST';
            break;
        case 'Food Preference':
            url = `${base_url}/filter/preference`;
            body = JSON.stringify({ preference: filterData });
            method = 'POST';
            break;
        case 'Cost For Two':
            url = `${base_url}/filter/cost-for-two`;
            body = JSON.stringify({ costForTwo: filterData });
            method = 'POST';
            break;
        default:
            return { error: "Invalid filter type" };
        }
    return { url, body, method };
}

export const applyFilter  = async(filterType, filterData) => {
    const configuration = getFilterConfiguration(filterType, filterData)

    if(configuration.error) return configuration

    if(!configuration.url) return { error: "Failed filtering, try again later" }

    const options = {
        method: configuration.method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(configuration.body){
        options.body = configuration.body
    }

    try {
        const response = await fetch(configuration.url, options);
        const result = await response.json();
        if (!response.ok) {
            const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
            return { error: errorMessages };
        }
        return result;
    } 
    catch (err) {
        return { error: [err.message || "Network error, please try again later."] };
    }
}