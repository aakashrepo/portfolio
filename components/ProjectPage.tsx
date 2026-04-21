
import React, { useMemo, useState } from 'react';
import { PROJECTS } from '../constants';

interface ProjectPageProps {
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ onBack }) => {
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0]?.id ?? '1');

  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory]
  );

  const selectedProject = useMemo(
    () => filteredProjects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0] ?? PROJECTS[0],
    [filteredProjects, selectedProjectId]
  );

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Projects_Gallery</h1>
          <p className="text-white/40 font-mono text-xs mt-2">TOTAL_RECORDS: {PROJECTS.length}</p>
        </div>
        <button 
          onClick={onBack}
          className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-bold border border-white/10 px-4 py-2 rounded-full transition-all"
        >
          <span>←</span> ESC
        </button>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#101010] overflow-hidden shadow-2xl shadow-black/25 mb-10 min-w-0">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[260px] bg-[#111]">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em]">
                Spotlight
              </span>
              <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/80">
                {selectedProject.category}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 max-w-[92%]">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2 break-words">{selectedProject.title}</h2>
              <p className="text-sm text-white/55 max-w-xl leading-relaxed break-words">{selectedProject.description}</p>
            </div>
          </div>

          <div className="p-6 space-y-5 border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 mb-3">Filter</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        const nextProject = category === 'All'
                          ? PROJECTS[0]
                          : PROJECTS.find((project) => project.category === category) ?? PROJECTS[0];
                        setSelectedProjectId(nextProject.id);
                      }}
                      className={`rounded-full px-4 py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] border transition-all ${isActive ? 'border-white bg-white text-black' : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10'}`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {selectedProject.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-2">{metric.label}</p>
                  <p className="text-lg font-bold text-[#ffde03]">{metric.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 mb-3">Project list</p>
              <p className="text-xs text-white/45 leading-relaxed">
                Click any card below to swap the spotlight view.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {filteredProjects.map((project, index) => {
          const isSelected = selectedProject.id === project.id;

          return (
          <div 
            key={project.id} 
            onClick={() => setSelectedProjectId(project.id)}
            className={`group relative border rounded-3xl overflow-hidden transition-all shadow-2xl cursor-pointer ${isSelected ? 'border-white/30 bg-[#0d0d0d]' : 'border-white/10 bg-[#0a0a0a] hover:border-white/30'}`}
          >
            {/* Project Image Header */}
            <div className="h-48 w-full overflow-hidden bg-[#111]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-[#00f0ff] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl sm:text-2xl font-black leading-tight max-w-[78%] break-words">{project.title}</h3>
                <span className="font-mono text-2xl sm:text-3xl text-white/10 group-hover:text-white/20 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-8 break-words">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/80">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-t border-white/10 pt-8">
                {project.metrics.map(m => (
                  <div key={m.label}>
                    <p className="text-[10px] uppercase text-white/30 mb-2 font-black tracking-widest">{m.label}</p>
                    <p className="text-xl font-bold text-[#ffde03]">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Decorative Element */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#ffde03] transform translate-x-6 -translate-y-6 rotate-45 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300"></div>
          </div>
        );
        })}
      </div>

      <div className="mt-20 flex flex-col items-center">
        <p className="text-white/40 text-xs font-mono mb-6">REACHED_THE_END_OF_LIST</p>
        <button 
          onClick={onBack}
          className="bg-white text-black px-12 py-4 rounded-full font-black text-sm hover:bg-[#ffde03] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
        >
          BACK TO DASHBOARD
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;
