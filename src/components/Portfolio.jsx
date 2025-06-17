import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './portfolio.css';

// --- DUMMY DATA --- //
const allProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    description: 'Keng ko‘lamli onlayn-do‘kon platformasi. Foydalanuvchilar uchun qulay interfeys va administratorlar uchun kuchli boshqaruv paneli.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Vue',
    image: 'https://images.unsplash.com/photo-1601597111158-2f918c8121f3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    description: 'Zamonaviy va xavfsiz mobil bank ilovasi. Barcha turdagi bank operatsiyalarini amalga oshirish imkoniyati.',
    tech: ['Vue.js', 'Firebase', 'Swift'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 3,
    title: 'Data Analytics Dashboard',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    description: 'Katta ma’lumotlarni tahlil qilish va vizualizatsiya qilish uchun interaktiv panel. Real vaqtda yangilanadigan grafiklar.',
    tech: ['React', 'D3.js', 'Python', 'Flask'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 4,
    title: 'Project Management Tool',
    category: 'Angular',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    description: 'Jamoalar uchun loyihalarni boshqarish vositasi. Vazifalarni taqsimlash, muddatlarni belgilash va progressni kuzatish.',
    tech: ['Angular', 'TypeScript', 'NestJS'],
    liveLink: '#',
    repoLink: '#',
  },
];

const filterCategories = ['All', 'React', 'Vue', 'Angular'];

// --- COMPONENTS --- //
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="back-button">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      Orqaga
    </button>
  );
};

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <BackButton />
        <h1>Mening Ishlarim</h1>
        <p>Bu yerda eng sara loyihalarim va ishlarim bilan tanishishingiz mumkin.</p>
      </header>

      <div className="filter-bar">
        {filterCategories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {loading 
          ? Array.from({ length: 4 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          : filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)
        }
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="card-image-container">
        <img src={project.image} alt={project.title} className="card-image" />
    </div>
    <div className="card-content">
      <h3>{project.title}</h3>
      <p className="card-description">{project.description}</p>
      <div className="tech-stack">
        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
      </div>
      <div className="card-links">
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  </div>
);

const ProjectCardSkeleton = () => (
    <div className="project-card skeleton-card">
        <div className="skeleton card-image-skeleton"></div>
        <div className="card-content">
            <div className="skeleton skeleton-line w-70"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text w-80"></div>
            <div className="skeleton skeleton-line w-50"></div>
        </div>
    </div>
);

export default Portfolio;
