const Dashboard = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Stats</h2>
                <p>GitHub Score: 85</p>
                <p>Twitter Score: 75</p>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">GitHub Chart | Report</h2>
                {/* Add GitHub chart component here */}
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-2">Twitter Chart | Report</h2>
                {/* Add Twitter chart component here */}
            </div>
        </div>
    );
};

export default Dashboard;