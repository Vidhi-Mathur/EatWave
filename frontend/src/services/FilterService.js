export const applyFilter = async(filters) => {
    const url = `${process.env.SERVER_URL}/restaurant/filter`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    };

    try {
        const response = await fetch(url, options);
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
};
