export const ErrorDialog = ({error, onClose}) => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <p className="mb-4 text-lg font-semibold">Error!!!</p>
                    <p className="text-red-500 text-center m-4">{error}</p>
                    <div className="flex justify-end">
                        <button className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:border-white hover:text-white font-semibold px-4 py-2 mr-2" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
}