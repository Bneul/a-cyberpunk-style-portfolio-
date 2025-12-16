import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    title: 'NEON PROTOCOL',
    role: 'Lead Director',
    completion: 100,
    description: 'A cyberpunk open-world RPG focused on verticality and hacking mechanics. Directed art style and core loop.',
    tags: ['Art Direction', 'UX Design', 'World Building'],
    thumbnailUrl: 'https://picsum.photos/800/450?random=1',
    stats: [
      { label: 'PLAYERS', value: '2.5M+' },
      { label: 'RATING', value: '9.2/10' },
      { label: 'AWARDS', value: '3' }
    ]
  },
  {
    id: 'PRJ-002',
    title: 'VOID DRIFTER',
    role: 'Creative Lead',
    completion: 85,
    description: 'High-octane space racing simulator with procedural track generation. Oversaw vehicle design and physics tuning.',
    tags: ['Vehicle Design', 'Procedural Gen', 'VFX'],
    thumbnailUrl: 'https://picsum.photos/800/450?random=2',
    stats: [
      { label: 'SPEED', value: 'MACH 10' },
      { label: 'TRACKS', value: '∞' },
      { label: 'ENGAGEMENT', value: 'HIGH' }
    ]
  },
  {
    id: 'PRJ-003',
    title: 'ECHO CHAMBER',
    role: 'UI/UX Director',
    completion: 60,
    description: 'Psychological horror puzzle game reliant on audio cues. Designed the diegetic interface and accessible audio visualization.',
    tags: ['UI/UX', 'Accessibility', 'Audio Design'],
    thumbnailUrl: 'https://picsum.photos/800/450?random=3',
    stats: [
      { label: 'SCARES', value: 'CRITICAL' },
      { label: 'IMMERSION', value: '100%' },
      { label: 'STATUS', value: 'ALPHA' }
    ]
  },
  {
    id: 'PRJ-004',
    title: 'PROJECT: TITAN',
    role: 'Executive Producer',
    completion: 0,
    description: 'Classified unannounced title. Clearance level insufficient.',
    tags: ['Strategy', 'Multiplayer', 'Classified'],
    thumbnailUrl: 'https://picsum.photos/800/450?random=4',
    stats: [
      { label: 'CLEARANCE', value: 'RESTRICTED' },
      { label: 'BUDGET', value: 'AAA' },
      { label: 'LAUNCH', value: '2026' }
    ],
    locked: true
  }
];

export const SYSTEM_PROMPT = `
You are NEXUS, a tactical AI assistant for a Portfolio Website of a high-end Gaming Creative Director.
Your tone is robotic, efficient, slightly cyberpunk, and helpful.
Use terminology like "Affirmative", "Processing", "Data retrieved", "Visuals loaded".
Keep answers concise (under 100 words) as if displaying on a HUD.
The Creative Director specializes in: Art Direction, UI/UX for Games, and Creative Strategy.
If asked about contact info, suggest opening a "Comms Link" (email).
`;
