import DashboardNav from "@/components/internal/dashboard-nav.tsx";

const Dashboard = () => {
    return (
        <div className={'mt-6 mx-10'}>
            <DashboardNav parent={'dashboard'} />
        </div>
    );
};

export default Dashboard;