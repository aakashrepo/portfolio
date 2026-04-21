
import React, { useState } from 'react';
import Layout from './components/Layout';
import AIAssistant from './components/AIAssistant';
import ProjectPage from './components/ProjectPage';
import { PROJECTS, SKILLS, EXPERIENCES } from './constants';

const PROOF_POINTS = [
  {
    label: 'Reporting efficiency',
    value: '40%',
    detail: 'Automated monthly financial reports with Python.',
  },
  {
    label: 'Event engagement',
    value: '30%',
    detail: 'Increased participation through CodeChef BU initiatives.',
  },
  {
    label: 'Data scope',
    value: '2023',
    detail: 'Analyzed real-world analytics job posting trends.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Discover',
    text: 'Clarify the problem, audience, and decision the work should support.',
  },
  {
    title: 'Build',
    text: 'Use Python, SQL, BI, or AI tooling to create a focused solution.',
  },
  {
    title: 'Validate',
    text: 'Check the output against metrics, edge cases, and practical use.',
  },
  {
    title: 'Communicate',
    text: 'Package the result so it is easy to explain, trust, and reuse.',
  },
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'projects'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0]?.id ?? '1');

  const featuredProject = PROJECTS.find((project) => project.id === selectedProjectId) ?? PROJECTS[0];

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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-8 break-words">
          Hey, I'm Aakash — <br />
          an <span className="text-[#00f0ff]">AI Data Analyst</span> with a sharp eye for insight.
        </h1>
        <p className="text-base sm:text-lg text-white/60 mb-10 leading-relaxed max-w-xl">
          I turn complex datasets into AI-powered narratives, predictive models, and strategic business recommendations.
        </p>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] items-start">
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
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 w-full max-w-[320px] shadow-xl shadow-black/30">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 mb-3">Character</p>
            <h2 className="text-base sm:text-lg font-bold mb-2 leading-snug">Strategic Data Storyteller</h2>
            <p className="text-white/60 text-sm leading-relaxed break-words">
              I blend AI, analytics, and product thinking to make data feel human and decisions feel confident.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {PROOF_POINTS.map((point) => (
            <div
              key={point.label}
              className="group rounded-[24px] border border-white/10 bg-[#101010] px-5 py-4 shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-[#141414] min-w-0"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">{point.label}</p>
                <span className="text-xl font-black text-white/90 group-hover:text-[#ffde03] transition-colors">
                  {point.value}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/55 break-words">
                {point.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-[#101010] p-6 shadow-xl shadow-black/25">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 mb-2">Working style</p>
              <h2 className="text-xl font-black uppercase tracking-tighter">Process_Trace</h2>
            </div>
            <p className="text-xs text-white/40 max-w-[220px] text-right">
              A simple delivery loop that keeps the work grounded in outcomes.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/30">0{index + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-[#ffde03]"></span>
                </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.22em] mb-2 text-white/90 break-words">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/55 break-words">{step.text}</p>
              </div>
            ))}
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
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="space-y-4">
            {PROJECTS.slice(0, 3).map((project, index) => {
              const isActive = featuredProject?.id === project.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 ${isActive ? 'border-white/30 bg-white/10 shadow-xl shadow-black/25' : 'border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20'}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white/35 mb-2">
                        Case Study {index + 1}
                      </p>
                      <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                    </div>
                    <span className="font-mono text-2xl text-white/15">0{index + 1}</span>
                  </div>
                  <p className="text-white/45 text-xs leading-relaxed mb-4">
                    {project.description.slice(0, 110)}...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded-full text-white/75">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#101010] overflow-hidden shadow-2xl shadow-black/30 min-w-0">
            <div className="relative h-52 overflow-hidden bg-[#111]">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="h-full w-full object-cover opacity-60 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="rounded-full bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em]">
                  Featured
                </span>
                <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/80">
                  {featuredProject.category}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 max-w-[92%]">
                <h3 className="text-xl sm:text-2xl font-black leading-tight mb-2 break-words">{featuredProject.title}</h3>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-white/45">Interactive project preview</p>
              </div>
            </div>

            <div className="p-6 space-y-6 min-w-0">
              <p className="text-white/60 text-sm leading-relaxed break-words">
                {featuredProject.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/80">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {featuredProject.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-2">{metric.label}</p>
                    <p className="text-lg font-bold text-[#ffde03]">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3 pt-2 border-t border-white/10">
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-2">Focus</p>
                  <p className="text-sm font-bold text-white/85 leading-relaxed break-words">
                    {featuredProject.category}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-2">Tools</p>
                  <p className="text-sm font-bold text-white/85 leading-relaxed break-words">
                    {featuredProject.tags.slice(0, 3).join(' • ')}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-2">Evidence</p>
                  <p className="text-sm font-bold text-white/85 leading-relaxed break-words">
                    {featuredProject.metrics.map((metric) => metric.value).join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
