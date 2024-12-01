import { Link } from 'react-router-dom';

const MyInvestments = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">My Investments</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Replace with dynamic project cards */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">Project Name</h3>
                        <p className="text-gray-700 mb-4">Details...</p>
                        <Link to="/investments/1" className="text-blue-500 hover:underline">Preview Project</Link>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Add a New Project</h2>
                <Link to="/investments/add" className="text-blue-500 hover:underline">Add Project</Link>
            </div>
        </div>
    );
};

export default MyInvestments;