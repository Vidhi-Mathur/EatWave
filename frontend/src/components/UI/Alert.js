export const Alert = ({onConfirm, onCancel}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <p className="mb-4 text-lg font-semibold">Items already in cart</p>
                <p className="mb-6">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                <div className="flex justify-end">
                    <button className="bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-white hover:text-white font-semibold px-4 py-2 mr-2" onClick={onCancel}>Cancel</button>
                    <button className="bg-orange-500 border border-white text-white hover:bg-white hover:border-orange-500 hover:text-orange-500 font-semibold px-4 py-2" onClick={onConfirm}>Yes, Start Afresh</button>
                </div>
            </div>
        </div>
    )
}