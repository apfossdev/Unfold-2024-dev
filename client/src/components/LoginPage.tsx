import React from "react";
import Loader from "./Loader";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Loader />
      <div className="mt-4 text-xl font-semibold text-gray-700">LoginPage</div>
    </div>
  );
};

export default LoginPage;
