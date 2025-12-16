import React, { useState } from 'react';
import { Play, Lock, ChevronRight, BarChart2 } from 'lucide-react';
import { Project } from '../types';

interface LevelCardProps {
  project: Project;
  index: number;
}

const LevelCard: React.FC<LevelCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Stagger animation delay based on index
  const delayClass = `delay-[${index * 100}ms]`;

  return (
    <div 
      className={`relative group w-full mb-8 transition-all duration-500 ease-out ${isExpanded ? 'h-auto' : 'h-64'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connector Line to Next Level (Visual Only) */}
      <div className="absolute left-8 top-full h-8 w-0.5 bg-gray-800 -z-10 group-last:hidden"></div>

      <div 
        onClick={() => !project.locked && setIsExpanded(!isExpanded)}
        className={`
          relative w-full bg-cyber-panel border-l-4 transition-all duration-300 cursor-pointer overflow-hidden
          ${project.locked ? 'border-gray-700 opacity-60 cursor-not-allowed grayscale' : 'border-cyber-primary hover:border-cyber-secondary'}
          ${isExpanded ? 'shadow-[0_0_30px_rgba(0,243,255,0.15)] bg-cyber-dark' : 'hover:translate-x-2'}
        `}
      >
        
        {/* Main Bar Content */}
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Thumbnail / Status Section */}
          <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
             {/* Image with Scanline overlay */}
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.thumbnailUrl})` }}>
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
             
             {/* Level Number */}
             <div className="absolute top-4 left-4 font-display text-4xl font-bold text-white/10 group-hover:text-white/30 transition-colors">
               0{index + 1}
             </div>

             {/* Status Overlay */}
             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className={`px-2 py-0.5 border ${project.locked ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
                        {project.locked ? 'LOCKED' : 'ACTIVE'}
                    </span>
                    <span className="text-gray-400">{project.role.toUpperCase()}</span>
                </div>
             </div>
             
             {project.locked && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                     <Lock className="w-12 h-12 text-gray-500" />
                 </div>
             )}
          </div>

          {/* Info Section */}
          <div className="flex-1 p-6 flex flex-col justify-between relative">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`text-2xl font-display font-bold uppercase tracking-wider mb-2 ${project.locked ? 'text-gray-500' : 'text-white group-hover:text-cyber-primary transition-colors'}`}>
                        {project.title}
                    </h3>
                    <p className="text-gray-400 font-body text-sm max-w-xl">{project.description}</p>
                </div>
                {!project.locked && (
                    <button className={`p-2 border border-cyber-primary/30 rounded-full hover:bg-cyber-primary/20 transition-all ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight className="w-6 h-6 text-cyber-primary" />
                    </button>
                )}
            </div>

            {/* Progress Bar & Stats */}
            <div className="mt-6 space-y-4">
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                    <span>MISSION PROGRESS</span>
                    <span>{project.completion}%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 relative overflow-hidden">
                    <div 
                        className={`absolute top-0 left-0 h-full ${project.locked ? 'bg-gray-600' : 'bg-cyber-secondary'} transition-all duration-1000 ease-out`}
                        style={{ width: `${isHovered ? project.completion : project.completion * 0.8}%` }}
                    ></div>
                    {/* Animated shine on bar */}
                    {!project.locked && <div className="absolute top-0 bottom-0 w-20 bg-white/20 -skew-x-45 animate-[shimmer_2s_infinite]"></div>}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-800">
                    {project.stats.map((stat, i) => (
                        <div key={i}>
                            <div className="text-[10px] text-gray-500 tracking-widest">{stat.label}</div>
                            <div className={`font-mono text-sm ${project.locked ? 'text-gray-600' : 'text-cyber-primary'}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Expanded Content (Video Trailer & Deep Dive) */}
        <div 
            className={`
                bg-black border-t border-cyber-primary/30 overflow-hidden transition-all duration-500
                ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
            `}
        >
            <div className="p-8 grid md:grid-cols-2 gap-8">
                {/* Video Placeholder */}
                <div className="aspect-video bg-gray-900 border border-gray-700 relative group/video cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-16 h-16 rounded-full border-2 border-cyber-primary flex items-center justify-center group-hover/video:bg-cyber-primary/20 transition-all">
                             <Play className="w-6 h-6 text-cyber-primary fill-current ml-1" />
                         </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 text-xs font-mono text-cyber-primary border-l-2 border-cyber-primary">
                        TRAILER_V1.mp4
                    </div>
                    {/* Scanlines on video */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
                </div>

                {/* Detailed Tech Specs */}
                <div className="font-mono text-sm space-y-6">
                    <div>
                        <h4 className="text-cyber-secondary mb-2 border-b border-gray-800 pb-1 flex items-center">
                            <BarChart2 className="w-4 h-4 mr-2" />
                            KEY_DELIVERABLES
                        </h4>
                        <ul className="space-y-2 text-gray-400 list-disc list-inside">
                            <li>Defined core visual pillars for pre-production.</li>
                            <li>Managed a team of 15 senior artists.</li>
                            <li>Implemented dynamic lighting pipeline using UE5.</li>
                            <li>Optimized UI draw calls by 40%.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-cyber-primary mb-2 border-b border-gray-800 pb-1">TECH_STACK</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-900 border border-gray-700 text-xs text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
