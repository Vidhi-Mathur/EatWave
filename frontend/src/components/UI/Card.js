export const Card = ({ children, className }) => {
    return (
        <div className={`max-w-md mx-auto bg-white rounded-lg shadow-lg mt-8 ${className}`}>{children}</div>
    );
}
