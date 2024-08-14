"use client";
import { useState, useEffect } from 'react';
import { MdCopyright } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';

const projects = [
    { 
      id: 1, 
      name: 'The Job Hunting AI Web Tool', 
      description: `
  ## Overview
  The complex landscape of online job searching often leaves job seekers overwhelmed by the vast options and unsure of the best opportunities aligning with their skills and preferences. Traditional job search methodologies rely heavily on manual filtration, leading to unsatisfying matches and inefficiencies for both the job seekers and the employers. The Job Hunting AI Web Tool proposes a solution that takes advantage of AI techniques and statistical modeling to improve the job search process, offering real-time, curated job matching.
  
  ## My Role
  As part of a 3-person cross-functional team, I contributed to:
  - Designing and implementing the AI-driven recommendation system
  - Developing and optimizing the PostgreSQL database
  - Deploying and maintaining the backend infrastructure on AWS and GCP
  - Ensuring data quality and security throughout the application
  
  ## Learnings
  This project provided hands-on experience with:
  - Full-stack development using React and Flask
  - Machine learning implementation in a real-world application
  - Cloud deployment across multiple platforms (AWS and GCP)
  - Database optimization and management
  - Agile development methodologies in a team setting
      `
    }
  ];

const connectOptions = [
  { id: 1, name: 'LinkedIn', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className="h-6 w-6"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>, url: 'https://www.linkedin.com/in/jomar-malpica/' },
  { id: 2, name: 'GitHub', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512" className="h-6 w-6"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>, url: 'https://github.com/jmalp' },
  { id: 3, name: 'Email', icon: <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, url: 'mailto:jmalp.ni@protonmail.com' },
];

const Button = ({ onClick, children, isActive, isTransitioning }) => (
  <a
    href="#_"
    className={`relative inline-flex items-center justify-center py-3 px-4 overflow-hidden font-semibold text-[#313349] transition-all duration-150 ease-in-out rounded bg-[#F2F3E3] group border-2 border-[#313349] w-64 mb-4 ${
      isActive ? 'active-button' : ''
    } ${isTransitioning ? 'pointer-events-none' : ''}`}
    onClick={onClick}
  >
    <span className={`absolute bottom-0 left-0 w-full transition-all duration-150 ease-in-out bg-[#313349] ${
      isActive ? 'h-full' : 'h-0 group-hover:h-2'
    }`}></span>
    <span className={`absolute left-0 pl-2.5 ease-out duration-200 ${
      isActive ? 'translate-x-0' : '-translate-x-12 group-hover:translate-x-0'
    }`}>
      <svg className="w-5 h-5 text-[#F2F3E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </span>
    <span className={`relative w-full text-center transition-all duration-200 ease-in-out ${
      isActive ? 'text-[#F2F3E3]' : ''
    }`}>
      {children}
    </span>
  </a>
);

const ProjectButton = ({ onClick, children, isTransitioning }) => (
  <a
    href="#_"
    className={`relative inline-flex items-center justify-center py-2 px-4 overflow-hidden font-normal text-[#F2F3E3] transition-all duration-150 ease-in-out rounded hover:text-[#313349] bg-transparent group border-2 border-[#F2F3E3] w-2/5 mb-4 ${
      isTransitioning ? 'pointer-events-none' : ''
    }`}
    onClick={onClick}
  >
    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-150 ease-in-out bg-[#F2F3E3] group-hover:h-full"></span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"></span>
    <span className="relative w-full text-center transition-colors duration-200 ease-in-out z-10">
      {children}
    </span>
  </a>
);

const ConnectButton = ({ href, children, icon, isTransitioning }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`relative inline-flex items-center justify-center py-2 px-4 overflow-hidden font-normal text-[#F2F3E3] transition-all duration-150 ease-in-out rounded hover:text-[#313349] bg-transparent group border-2 border-[#F2F3E3] w-2/5 mb-4 ${
      isTransitioning ? 'pointer-events-none' : ''
    }`}
  >
    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-150 ease-in-out bg-[#F2F3E3] group-hover:h-full"></span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
      <span className="[&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
    </span>
    <span className="relative w-full text-center transition-colors duration-200 ease-in-out z-10">
      {children}
    </span>
  </a>
);

const RepositoryButton = ({ onClick, children, isTransitioning }) => (
    <a
      href=""
      className={`relative inline-flex items-center justify-center py-2 px-4 overflow-hidden font-normal text-[#F2F3E3] transition-all duration-150 ease-in-out rounded hover:text-[#313349] bg-transparent group border-2 border-[#F2F3E3] w-1/4 mb-4 ${
        isTransitioning ? 'pointer-events-none' : ''
      }`}
      onClick={onClick}
    >
      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-150 ease-in-out bg-[#F2F3E3] group-hover:h-full"></span>
      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"></span>
      <span className="relative w-full text-center transition-colors duration-200 ease-in-out z-10">
        {children}
      </span>
    </a>
);

const Curtain = ({ isAnimating, direction }) => (
    <div
      className={`absolute inset-0 bg-[#F2F3E3] transition-transform duration-500 ease-in-out z-20 ${
        isAnimating
          ? direction === 'right'
            ? 'translate-x-0'
            : '-translate-x-full'
          : '-translate-x-full'
      }`}
    ></div>
  );

  const MainLayout = () => {
    const [content, setContent] = useState('This a space used as a compilation of information about who I am as a person, my works, and ways to connect with me.');
    const [projectDetails, setProjectDetails] = useState(null);
    const [activeButton, setActiveButton] = useState('Welcome');
    const [isAnimating, setIsAnimating] = useState(false);
    const [curtainDirection, setCurtainDirection] = useState('right');
    const [isProjectAnimating, setIsProjectAnimating] = useState(false);
    const [projectCurtainDirection, setProjectCurtainDirection] = useState('right');
    const [isTransitioning, setIsTransitioning] = useState(false);
  
    const handleButtonClick = (newContent) => {
      if (isTransitioning) return;
      setCurtainDirection('right');
      setIsAnimating(true);
      setIsTransitioning(true);
  
      setTimeout(() => {
        setActiveButton(newContent);
        setProjectDetails(null);
        setContent(newContent);
        
        setCurtainDirection('left');
      }, 450);
  
      setTimeout(() => {
        setIsAnimating(false);
        setIsTransitioning(false);
      }, 500);
    };
  
    const handleProjectClick = (project) => {
      if (isTransitioning) return;
      setProjectCurtainDirection('right');
      setIsProjectAnimating(true);
      setIsTransitioning(true);
  
      setTimeout(() => {
        setProjectDetails(project);
        
        setProjectCurtainDirection('left');
      }, 450);
  
      setTimeout(() => {
        setIsProjectAnimating(false);
        setIsTransitioning(false);
      }, 500);
    };
  
    useEffect(() => {
      const handleClick = (e) => {
        if (!e.target.closest('.left-side-buttons')) {
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);
  
    return (
      <div className="flex min-h-screen">
        {/* Left Side */}
        <div className="w-1/2 bg-[#F2F3E3] flex flex-col items-center p-8">
          <div className="flex-grow flex flex-col items-center justify-center left-side-buttons">
            <Button onClick={() => handleButtonClick('About Me')} isActive={activeButton === 'About Me'} isTransitioning={isTransitioning}>About Me</Button>
            <Button onClick={() => handleButtonClick('Projects')} isActive={activeButton === 'Projects'} isTransitioning={isTransitioning}>Projects</Button>
            <Button onClick={() => handleButtonClick('Connect')} isActive={activeButton === 'Connect'} isTransitioning={isTransitioning}>Connect</Button>
          </div>
          <footer className="text-sm text-[#313349] flex items-center">
            <MdCopyright className="mr-1" /> 2024 Jomar Malpica
          </footer>
        </div>
  
        {/* Right Side */}
        <div className="w-1/2 bg-[#313349] text-[#F2F3E3] flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <Curtain isAnimating={isAnimating} direction={curtainDirection} />
          <Curtain isAnimating={isProjectAnimating} direction={projectCurtainDirection} />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {content === 'Projects' && !projectDetails ? (
              <div className="w-full flex flex-col items-center">
                {projects.map((project) => (
                  <ProjectButton key={project.id} onClick={() => handleProjectClick(project)} isTransitioning={isTransitioning}>
                    {project.name}
                  </ProjectButton>
                ))}
              </div>
            ) : content === 'Connect' && !projectDetails ? (
              <div className="w-full flex flex-col items-center">
                {connectOptions.map((option) => (
                  <ConnectButton key={option.id} href={option.url} icon={option.icon} isTransitioning={isTransitioning}>
                    {option.name}
                  </ConnectButton>
                ))}
              </div>
            ) : projectDetails ? (
                <div className="project-details text-left p-4 overflow-y-auto max-h-full w-full">
                  <h1 className="text-2xl font-semibold mb-4 text-center">{projectDetails.name}</h1>
                  <div className="flex justify-center mb-4">
                    <RepositoryButton onClick={() => window.open('https://github.com/jmalp/The-Job-Hunting-AI-Web-Tool', '_blank')}>
                    Project Repository
                    </RepositoryButton>
                  </div>
                  <div className="markdown-content">
                    <ReactMarkdown>{projectDetails.description}</ReactMarkdown>
                </div>
              </div>
            ) : content === 'About Me' ? (
                <div className="about-me text-left p-4 overflow-y-auto max-h-full w-full">
                  <h1 className="text-2xl text-center font-semibold mb-4">Hello, I'm Jomar Malpica.</h1>
                  <p className="text-lg">Currently a senior Computer Science student at Oregon State University. Interested in all things software engineering, particularly in web and mobile application development, I've honed my programming skills through both academic coursework, extracurricular content, and hands-on projects.
                   I'm passionate about creating efficient, useful, and aesthetically pleasing applications that solve real problems and constantly seeking opportunities to expand my knowledge in these areas. <br></br><br></br> As I approach graduation, I'm eager to embark on a career where I can contribute to innovative projects and continue growing as a developer.</p>
                  <br></br>
                  <p>Outside of tech, I enjoy exploring the outdoors, playing the guitar, and staying up-to-date with the latest technology trends.</p>
                </div>
            ) : (
                <div className="text-center">
                <p>{content}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default MainLayout;
