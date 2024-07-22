export const Content = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col py-8">
      <div className={`bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto`}>{children}</div>
    </div>
  );
}