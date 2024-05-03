import React from 'react';

const Content = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-h-[calc(100vh-98px)] overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md">{children}</div>
    </div>
  );
}

export default Content;