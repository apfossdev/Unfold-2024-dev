import './App.css'
import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import SuspenseWrapper from "@/components/internal/suspenseWrapper.tsx";
import {ROUTES} from "@/constants/routes.ts";
import LoginLoader from './views/login-loader';
const LandingPage = lazy(() => import('@/views/landing.tsx'));
const Page404 = lazy(() => import('@/views/page-404.tsx'));
const Dashboard = lazy(() => import('@/views/dashboard.tsx'));
const MyInvestments = lazy(() => import('@/views/my-investments.tsx'));

function App() {

    return (
        <>
            <Routes>
                <Route path={ROUTES.home} element={<SuspenseWrapper><LandingPage/></SuspenseWrapper>}/>
                <Route path={ROUTES.dashboard} element={<SuspenseWrapper><Dashboard /></SuspenseWrapper>}/>
                <Route path={ROUTES.myInvestments} element={<SuspenseWrapper><MyInvestments /></SuspenseWrapper>}/>
                <Route path={ROUTES.login} element={<SuspenseWrapper><LoginLoader /></SuspenseWrapper>}/>
                <Route path="*" element={<SuspenseWrapper><Page404/></SuspenseWrapper>}/>
            </Routes>
        </>
    )
}

export default App
