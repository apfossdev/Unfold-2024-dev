import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const { projectId } = useParams();

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Project Details</h1>
            <p className="text-lg text-gray-700 mb-4">Project ID: {projectId}</p>
            {/* Fetch and display project details here */}
        </div>
    );
};

export default ProjectDetails;