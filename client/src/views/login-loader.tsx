import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";

const LoginLoader = () => {
  const { handled } = useAuthCallback();

  useEffect(() => {
    if (handled) {
      window.location.href = "/my-investments";
    }
  }, [handled]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default LoginLoader;
