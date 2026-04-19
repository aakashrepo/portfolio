
import React from 'react';
import { PROJECTS } from '../constants';

interface ProjectPageProps {
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ onBack }) => {
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

      <div className="space-y-12">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="group relative border border-white/10 rounded-3xl overflow-hidden bg-[#0a0a0a] hover:border-white/30 transition-all shadow-2xl"
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

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black leading-tight max-w-[80%]">{project.title}</h3>
                <span className="font-mono text-3xl text-white/10 group-hover:text-white/20 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/80">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
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
        ))}
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
