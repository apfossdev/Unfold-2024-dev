import { useState } from 'react';

const AddProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        twitterUrl: '',
        githubUrl: '',
        contractAddress: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Add a New Project</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Project Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Twitter URL</label>
                    <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">GitHub URL</label>
                    <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Contract Address</label>
                    <input type="text" name="contractAddress" value={formData.contractAddress} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Project</button>
            </form>
        </div>
    );
};

export default AddProject;