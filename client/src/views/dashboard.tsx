import DashboardNav from "@/components/internal/dashboard-nav.tsx";
import DashboardAnalytics from "@/components/internal/DashboardAnalytics";

const Dashboard = () => {
  return (
    <div className={"mt-6 mx-10"}>
      <DashboardNav parent={"dashboard"} />
      <DashboardAnalytics />
    </div>
  );
};

export default Dashboard;
