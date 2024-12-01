import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import MyInvestments from './pages/MyInvestments';
import ProjectDetails from './pages/ProjectDetails';
import AddProject from './pages/AddProject';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/investments" element={<MyInvestments />} />
                <Route path="/investments/add" element={<AddProject />} />
                <Route path="/investments/:projectId" element={<ProjectDetails />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRoutes;