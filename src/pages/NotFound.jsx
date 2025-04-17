import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
