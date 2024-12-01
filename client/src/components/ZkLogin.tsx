import { useEnokiFlow, useZkLogin } from "@mysten/enoki/react";

const ZkLogin = () => {
  const CLIENT_ID_GOOGLE =
    "607016077904-lp2hl47jjtj7cmrttjl9mp787nttnb3c.apps.googleusercontent.com";

  const enokiFlow = useEnokiFlow();
  const { address } = useZkLogin();

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
    <>
      <button
        className="bg-[#ffffff] border-black/20 px-6 py-2 text-black font-semibold rounded-full w-full flex items-center gap-x-8"
        onClick={handleSignIn}
      >
        {address
          ? address.slice(0, 6) + "..." + address.slice(-4)
          : "Login with Google"}
      </button>
      {address
        ? console.log(
            `https://suiexplorer.com/address/${address}?network=testnet`
          )
        : null}
    </>
  );
};

export default ZkLogin;
