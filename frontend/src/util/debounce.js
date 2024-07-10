//Function and wait as arguments to limit calling function in case no activity within "wait"
export const debounce = (func, wait) => {
    let timeout;
    return function(...args){
        const context = this;
        //Reset if activity happns
        clearTimeout(timeout)
        //Wait to call
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}