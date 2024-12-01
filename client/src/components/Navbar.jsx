import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-white hover:text-gray-400">Landing Page</Link></li>
                <li><Link to="/dashboard" className="text-white hover:text-gray-400">Dashboard</Link></li>
                <li><Link to="/investments" className="text-white hover:text-gray-400">My Investments</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;