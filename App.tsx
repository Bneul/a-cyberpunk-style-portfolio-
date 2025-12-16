import React, { useState, useEffect } from 'react';
import ParticleHero from './components/ParticleHero';
import LevelCard from './components/LevelCard';
import TacticalChat from './components/TacticalChat';
import { PROJECTS } from './constants';
import { ChevronDown, Monitor, Wifi, Battery } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simulate initial system boot
    const timer = setTimeout(() => setLoading(false), 2000);
    
    const handleScroll = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;
        setScrollProgress(Number(scroll));
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center font-mono text-cyber-primary">
        <div className="w-64 mb-4">
            <div className="flex justify-between text-xs mb-1">
                <span>SYSTEM_BOOT</span>
                <span>{(Math.random() * 100).toFixed(2)}%</span>
            </div>
            <div className="h-1 bg-gray-800 w-full">
                <div className="h-full bg-cyber-primary animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
        </div>
        <div className="text-sm animate-pulse">INITIALIZING NEURAL LINK...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-body text-gray-300 selection:bg-cyber-primary selection:text-black overflow-x-hidden">
      <ParticleHero />
      <TacticalChat />

      {/* Sticky HUD Header */}
      <header className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-primary animate-pulse"></div>
                <span className="font-display font-bold text-xl tracking-widest text-white">ALEX_RIVER // CD</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 font-mono text-xs text-cyber-primary/70">
                <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4" />
                    <span>ONLINE</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4" />
                    <span>60 FPS</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4" />
                    <span>100%</span>
                </div>
            </div>
        </div>
        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-cyber-secondary shadow-[0_0_10px_#bd00ff]" style={{ width: `${scrollProgress * 100}%` }}></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-start mb-32 relative">
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-cyber-primary to-transparent opacity-20 hidden lg:block"></div>
            
            <div className="space-y-6 max-w-4xl">
                <div className="inline-block px-3 py-1 border border-cyber-primary/50 bg-cyber-primary/10 text-cyber-primary font-mono text-sm tracking-[0.2em] mb-4">
                    CREATIVE DIRECTOR
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-tight">
                    CRAFTING <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary filter drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                        DIGITAL REALITIES
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl border-l-2 border-cyber-secondary pl-6">
                    Specializing in high-fidelity art direction, immersive UI/UX, and next-gen player experiences.
                </p>
                
                <div className="pt-8 flex space-x-6">
                    <button className="px-8 py-3 bg-cyber-primary text-black font-bold font-display hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all skew-x-[-10deg]">
                        <span className="skew-x-[10deg] block">INITIATE_CONTACT</span>
                    </button>
                    <button className="px-8 py-3 border border-gray-600 hover:border-cyber-secondary hover:text-cyber-secondary transition-all font-mono skew-x-[-10deg]">
                         <span className="skew-x-[10deg] block">DOWNLOAD_RESUME.pdf</span>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
                <ChevronDown className="w-8 h-8" />
            </div>
        </section>

        {/* Case Studies Grid */}
        <section className="mb-32">
            <div className="flex items-end justify-between mb-16 border-b border-gray-800 pb-4">
                <h2 className="text-4xl font-display font-bold text-white">
                    MISSION_LOG
                </h2>
                <div className="font-mono text-cyber-primary text-sm">
                    {PROJECTS.filter(p => p.completion === 100).length} / {PROJECTS.length} COMPLETED
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                {PROJECTS.map((project, index) => (
                    <LevelCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-20 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-mono">
                <div>
                    <span className="text-cyber-primary">© 2024 NEXUS SYSTEMS.</span> ALL RIGHTS RESERVED.
                </div>
                <div className="mt-4 md:mt-0 flex space-x-6">
                    <a href="#" className="hover:text-white transition-colors">TWITTER</a>
                    <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
                    <a href="#" className="hover:text-white transition-colors">ARTSTATION</a>
                </div>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
