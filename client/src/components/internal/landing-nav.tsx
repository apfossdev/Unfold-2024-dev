import Logo from "@/components/assets/logo.tsx";
import ZkLogin from "../ZkLogin";

const LandingNav = () => {
    return (
        <div className={'flex items-center justify-between mx-10 z-10  my-6 relative'}>
            <Logo className={'cursor-pointer h-16 w-16'} />
            <ZkLogin />
        </div>
    );
};

export default LandingNav;