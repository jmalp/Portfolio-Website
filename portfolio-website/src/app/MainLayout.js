"use client";
import { useState } from 'react';

const projects = [
  { id: 1, name: 'The Job Hunting AI Web Tool', description: 'Description of Project 1' },
  { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  { id: 3, name: 'Project 3', description: 'Description of Project 3' },
];

const MainLayout = () => {
  const [content, setContent] = useState('Welcome');
  const [projectDetails, setProjectDetails] = useState(null);

  const handleButtonClick = (newContent) => {
    setProjectDetails(null);
    setContent(newContent);
  };

  const handleProjectClick = (project) => {
    setProjectDetails(project);
  };

  return (
    <div className="flex min-h-screen">
      {/*Left Side*/}
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col items-center justify-center p-8">
        <div className="w-full flex flex-col items-center">
          <button
            className="block w-2/5 py-2 mb-4 border-2 border-[#3D405B] text-[#3D405B] rounded"
            onClick={() => handleButtonClick('About Me')}
          >
            About Me
          </button>
          <button
            className="block w-2/5 py-2 mb-4 border-2 border-[#3D405B] text-[#3D405B] rounded"
            onClick={() => handleButtonClick('Projects')}
          >
            Projects
          </button>
          <button
            className="block w-2/5 py-2 mb-4 border-2 border-[#3D405B] text-[#3D405B] rounded"
            onClick={() => handleButtonClick('Connect')}
          >
            Connect
          </button>
        </div>
      </div>

      {/*Right Side*/}
      <div className="w-1/2 bg-[#3D405B] text-[#F4F1DE] flex flex-col items-center justify-center p-8">
        {content === 'Projects' && !projectDetails ? (
          <div className="w-full flex flex-col items-center">
            {projects.map((project) => (
              <button
                key={project.id}
                className="block w-2/5 py-2 mb-4 border-2 border-[#F4F1DE] text-[#F4F1DE] rounded"
                onClick={() => handleProjectClick(project)}
              >
                {project.name}
              </button>
            ))}
          </div>
        ) : projectDetails ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{projectDetails.name}</h2>
            <p>{projectDetails.description}</p>
          </div>
        ) : (
          <div className="text-center">
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;