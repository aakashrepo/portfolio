
import React, { useState } from 'react';
import Layout from './components/Layout';
import AIAssistant from './components/AIAssistant';
import ProjectPage from './components/ProjectPage';
import { PROJECTS, SKILLS, EXPERIENCES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'projects'>('home');

  if (view === 'projects') {
    return (
      <Layout 
        onBack={() => setView('home')} 
        showNav={false} 
        activeId="projects"
      >
        <ProjectPage onBack={() => setView('home')} />
        <AIAssistant />
      </Layout>
    );
  }

  return (
    <Layout activeId="home">
      {/* Intro Section */}
      <section id="intro" className="min-h-[70vh] flex flex-col justify-center animate-fade-up">
        <div className="inline-flex flex-wrap items-center gap-3 mb-5">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#00f0ff] font-bold">AI Data Analyst</span>
          <span className="hidden md:inline-block h-[1px] w-14 bg-white/10"></span>
          <span className="text-white/50 text-xs uppercase tracking-[0.3em]">data stories & intelligent systems</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8">
          Hey, I'm Aakash — <br />
          an <span className="text-[#00f0ff]">AI Data Analyst</span> with a sharp eye for insight.
        </h1>
        <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
          I turn complex datasets into AI-powered narratives, predictive models, and strategic business recommendations.
        </p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setView('projects')}
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#ffde03] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
            >
              View Projects ↗
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
              Resume.pdf
            </button>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 max-w-[260px] shadow-xl shadow-black/30">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 mb-3">Character</p>
            <h2 className="text-lg font-bold mb-2">Strategic Data Storyteller</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              I blend AI, analytics, and product thinking to make data feel human and decisions feel confident.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section id="projects" className="py-20 border-t border-white/10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Quick_Look</h2>
            <div className="h-1 w-8 bg-[#ffde03] mt-2"></div>
          </div>
          <button 
            onClick={() => setView('projects')}
            className="text-[#00f0ff] text-xs font-bold hover:underline"
          >
            SEE ALL PROJECTS →
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.slice(0, 2).map((project) => (
            <div key={project.id} className="border border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/[0.08] transition-colors">
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-white/40 text-xs mb-4">{project.description.slice(0, 100)}...</p>
              <div className="flex gap-2">
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-t border-white/10">
        <div className="space-y-2 mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Experience</h2>
          <div className="h-1 w-8 bg-[#00f0ff]"></div>
        </div>
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="border border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/[0.08] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <p className="text-[#00f0ff] font-mono text-sm">{exp.company}</p>
                </div>
                <span className="text-white/40 text-xs font-mono">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((point, idx) => (
                  <li key={idx} className="text-white/60 text-sm flex gap-3">
                    <span className="text-[#ffde03] flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Pill Cloud */}
      <section id="skills" className="py-20 border-t border-white/10">
        <div className="space-y-2 mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Toolkit</h2>
          <div className="h-1 w-8 bg-[#00f0ff]"></div>
        </div>
        <div className="flex flex-wrap gap-3">
          {SKILLS.map(skill => (
            <div key={skill.name} className="bg-white/10 px-5 py-2 rounded-full flex items-center gap-3 group hover:bg-white transition-colors">
              <span className="font-bold text-sm group-hover:text-black transition-colors">{skill.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffde03] group-hover:bg-black"></span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Pill */}
      <section id="contact" className="py-20 border-t border-white/10">
        <div className="bg-[#ff5c00] rounded-[32px] p-10 text-black text-center shadow-xl shadow-[#ff5c00]/20">
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">Let's Connect</h2>
          <p className="font-bold mb-8">Currently available for internships and data projects.</p>
          <a href="mailto:workwithaakash17@gmail.com" className="inline-block bg-black text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform">
            Send Message ↗
          </a>
        </div>
      </section>

      <AIAssistant />
    </Layout>
  );
};

export default App;
