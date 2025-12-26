import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  
  
  const errorMessage = error?.statusText || error?.message || "Page not found";
  const errorStatus = error?.status || "404";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-600 mb-4">{errorStatus}</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
        <p className="text-gray-700 mb-6">
          {errorMessage}
        </p>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or an error occurred.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
