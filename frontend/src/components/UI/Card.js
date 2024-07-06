const Card = ({ children, className }) => {
    return (
        <div className={`max-w-md mx-auto bg-white rounded-lg shadow-md mt-8 ${className}`}>{children}</div>
    );
}

export default Card;
