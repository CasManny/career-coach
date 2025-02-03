import React from "react";

export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="py-5 bg-muted">
      <div className="container mx-auto">
        <p className="text-center  text-lg font-semibold text-gray-300">
          made with ❣️ by Casmanny {date}
        </p>
        
      </div>
    </footer>
  );
};
