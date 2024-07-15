export const ErrorDialog = ({errors, onClose}) => {
    return (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                <div className="bg-red-500 px-4 py-2">
                    <h2 className="text-white text-xl font-bold">Error</h2>
                </div>
                <div className="p-6">
                    <ul className="list-disc list-inside space-y-2 mb-4 max-h-60 overflow-y-auto">
                        {Array.isArray(errors) ? errors.map((error, index) => (
                        <li key={index} className="text-gray-700 text-base">{error}</li>
                        )) : (
                        <li className="text-gray-700 text-base">{errors}</li>
                        )}
                    </ul>
                    <div className="flex justify-end">
                        <button className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:border-white hover:text-white font-semibold px-4 py-2 mr-2" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}