import Logo from "@/components/assets/logo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTES} from "@/constants/routes.ts";
import {cn} from "@/lib/utils.ts";
import ZkLogin from "../ZkLogin";

const DashboardNav = ({parent}: { parent: string }) => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <div className={'flex items-center justify-between'}>
            <Logo className={'h-16 w-16'}/>
            <div className={'flex items-center gap-5'}>
                <Button variant={'link'} onClick={() => navigate(ROUTES.home)}>Home</Button>
                <Button variant={'link'} className={cn((parent && parent === "dashboard") && "underline")}
                        onClick={() => navigate(ROUTES.dashboard)}>Dashboard</Button>
                <Button variant={'link'} className={cn((parent && parent === "myInvestments") && "underline")}
                        onClick={() => navigate(ROUTES.myInvestments)}>My Investments</Button>
                {/* <Button variant={'secondary'}>
                    Logout
                </Button> */}
                <ZkLogin />
            </div>
        </div>
    );
};

export default DashboardNav;