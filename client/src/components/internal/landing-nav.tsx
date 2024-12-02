import {Button} from "@/components/ui/button.tsx";
import {ROUTES} from "@/constants/routes.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Logo from "@/components/assets/logo.tsx";
import ZkLogin from "../ZkLogin";

const LandingNav = () => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <div className={'flex items-center justify-between mx-10 z-10  my-6 relative'}>
            <Logo className={'cursor-pointer'} />
            <ZkLogin />
        </div>
    );
};

export default LandingNav;