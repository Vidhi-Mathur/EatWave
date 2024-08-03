export const LoadingSpinner = ({size = 32}) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-gray-900`}></div>
        </div>
    )
}