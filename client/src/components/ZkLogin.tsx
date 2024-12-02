import { useEnokiFlow, useZkLogin } from "@mysten/enoki/react";
import { FiLogOut } from "react-icons/fi";

const ZkLogin = () => {
  const CLIENT_ID_GOOGLE =
    "607016077904-lp2hl47jjtj7cmrttjl9mp787nttnb3c.apps.googleusercontent.com";

  const enokiFlow = useEnokiFlow();
  const { address } = useZkLogin();

  const handleSignout = () => {
    enokiFlow.logout().then(() => {
      window.location.href = "/";
    });
  };

  const handleSignIn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    const redirectUrl = `${protocol}//${host}/login`;

    console.log("redirected login url", redirectUrl);

    enokiFlow
      .createAuthorizationURL({
        provider: "google",
        network: "testnet",
        clientId: CLIENT_ID_GOOGLE!,
        redirectUrl,
        extraParams: {
          scope: ["openid", "email", "profile"],
        },
      })
      .then((url) => {
        window.location.href = url;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        className={`border border-black/20 px-6 py-2 text-black font-semibold rounded-full w-full max-w-xs flex items-center justify-between gap-x-4 ${
          address ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
        onClick={address ? handleSignout : handleSignIn}
      >
        {address ? (
          <>
            <span>{address.slice(0, 6) + "..." + address.slice(-4)}</span>
            <FiLogOut className="text-white" />
          </>
        ) : (
          "Login with Google"
        )}
      </button>
    </div>
  );
};

export default ZkLogin;