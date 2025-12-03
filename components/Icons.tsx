import React from 'react';

// Using Lucide React for UI Icons
import { 
  Heart, 
  Sprout, 
  History, 
  Settings, 
  Droplets, 
  Sun, 
  ArrowRight, 
  Copy, 
  UserPlus, 
  LogOut, 
  Info,
  Camera,
  Loader,
  Download,
  Wand
} from 'lucide-react';

export { 
  Heart, 
  Sprout, 
  History, 
  Settings, 
  Droplets, 
  Sun, 
  ArrowRight, 
  Copy, 
  UserPlus, 
  LogOut, 
  Info,
  Camera,
  Loader,
  Download,
  Wand
};

// Custom Plant Illustrations (Simple SVG)

export const PlantFlower: React.FC<{ level: number, className?: string, style?: React.CSSProperties }> = ({ level, className, style }) => {
  const scale = Math.min(1 + (level * 0.1), 1.5);
  
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g transform={`translate(100, 150) scale(${scale}) translate(-100, -150)`}>
        {/* Pot */}
        <path d="M70 160 L130 160 L120 190 L80 190 Z" fill="#ECA6A6" />
        {/* Stem */}
        <path d="M100 160 Q100 120 100 100" stroke="#86EFAC" strokeWidth="6" fill="none" />
        {/* Leaves */}
        {level > 1 && <path d="M100 140 Q130 130 140 150" stroke="#86EFAC" strokeWidth="4" fill="none" />}
        {level > 2 && <path d="M100 130 Q70 120 60 140" stroke="#86EFAC" strokeWidth="4" fill="none" />}
        
        {/* Flower Head */}
        <g transform="translate(100, 90)">
          <circle cx="0" cy="0" r="15" fill="#FECDD3" /> {/* Center */}
          <circle cx="0" cy="-20" r="15" fill="#F43F5E" opacity="0.8" />
          <circle cx="18" cy="-10" r="15" fill="#F43F5E" opacity="0.8" />
          <circle cx="18" cy="10" r="15" fill="#F43F5E" opacity="0.8" />
          <circle cx="0" cy="20" r="15" fill="#F43F5E" opacity="0.8" />
          <circle cx="-18" cy="10" r="15" fill="#F43F5E" opacity="0.8" />
          <circle cx="-18" cy="-10" r="15" fill="#F43F5E" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
};

export const PlantBonsai: React.FC<{ level: number, className?: string, style?: React.CSSProperties }> = ({ level, className, style }) => {
  const scale = Math.min(1 + (level * 0.1), 1.5);
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(100, 150) scale(${scale}) translate(-100, -150)`}>
        {/* Pot */}
        <rect x="60" y="170" width="80" height="20" rx="5" fill="#78350F" />
        {/* Trunk */}
        <path d="M90 170 Q90 130 70 110 T100 60" stroke="#92400E" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* Foliage */}
        <circle cx="70" cy="110" r={20 + level * 2} fill="#166534" opacity="0.9" />
        <circle cx="110" cy="70" r={25 + level * 2} fill="#15803d" opacity="0.9" />
        {level > 3 && <circle cx="50" cy="90" r={15} fill="#166534" opacity="0.8" />}
      </g>
    </svg>
  );
};

export const PlantTropical: React.FC<{ level: number, className?: string, style?: React.CSSProperties }> = ({ level, className, style }) => {
  const scale = Math.min(1 + (level * 0.1), 1.5);
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(100, 150) scale(${scale}) translate(-100, -150)`}>
         {/* Pot */}
         <path d="M75 160 L125 160 L125 185 Q125 195 115 195 L85 195 Q75 195 75 185 Z" fill="#FDBA74" />
         {/* Leaves */}
         <path d="M100 160 Q100 100 60 80" stroke="#059669" strokeWidth="2" fill="none" />
         <ellipse cx="60" cy="80" rx="15" ry="30" transform="rotate(-20 60 80)" fill="#10B981" />
         
         <path d="M100 160 Q100 90 140 70" stroke="#059669" strokeWidth="2" fill="none" />
         <ellipse cx="140" cy="70" rx="20" ry="40" transform="rotate(30 140 70)" fill="#34D399" />
         
         {level > 1 && (
            <>
            <path d="M100 160 Q100 120 100 60" stroke="#059669" strokeWidth="2" fill="none" />
            <ellipse cx="100" cy="60" rx="18" ry="35" fill="#047857" />
            </>
         )}
      </g>
    </svg>
  );
};

// --- ONBOARDING ILLUSTRATIONS ---

export const OnboardingIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF1F2" />
        <stop offset="100%" stopColor="#FFE4E6" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#skyGradient)" opacity="0.6" />
    <circle cx="50" cy="50" r="20" fill="#F43F5E" opacity="0.05" />

    <g transform="translate(100, 80)">
       <path d="M60 220 L140 220 L130 260 L70 260 Z" fill="#FDA4AF" />
       <rect x="55" y="210" width="90" height="10" rx="5" fill="#FB7185" />
       
       <path d="M100 210 Q100 150 70 130 T100 80" stroke="#86EFAC" strokeWidth="8" fill="none" strokeLinecap="round" />
       <path d="M100 210 Q100 150 130 130 T100 80" stroke="#86EFAC" strokeWidth="8" fill="none" strokeLinecap="round" />
       
       <circle cx="70" cy="130" r="10" fill="#4ADE80" />
       <circle cx="130" cy="130" r="10" fill="#4ADE80" />
       
       <path d="M100 80 C60 40 40 90 100 130 C160 90 140 40 100 80" fill="#F43F5E" filter="url(#glow)" />
       
       <path d="M60 60 C50 50 45 60 60 70 C75 60 70 50 60 60" fill="#FB7185" opacity="0.6">
         <animate attributeName="transform" type="translate" from="0 0" to="0 -20" dur="3s" repeatCount="indefinite" />
         <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
       </path>
    </g>
  </svg>
);

export const OnboardingIllustrationCare: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
     <defs>
      <linearGradient id="skyGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F0FDF4" />
        <stop offset="100%" stopColor="#DCFCE7" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="200" r="160" fill="url(#skyGradient2)" opacity="0.6" />
    
    <g transform="translate(200, 200)">
        {/* Watering Can */}
        <g transform="translate(-80, -60) rotate(-10)">
            <path d="M0 40 L60 40 L55 90 L5 90 Z" fill="#93C5FD" />
            <path d="M60 50 L90 20" stroke="#93C5FD" strokeWidth="8" strokeLinecap="round" />
            <path d="M15 40 Q5 10 30 10" stroke="#93C5FD" strokeWidth="6" fill="none" />
            <circle cx="90" cy="20" r="5" fill="#60A5FA" />
            
            {/* Water Drops */}
            <circle cx="85" cy="40" r="4" fill="#3B82F6" opacity="0.6">
                <animate attributeName="cy" from="40" to="100" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="95" cy="50" r="3" fill="#3B82F6" opacity="0.6">
                <animate attributeName="cy" from="50" to="110" dur="1.2s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.6;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
        </g>
        
        {/* Sun */}
        <g transform="translate(60, -80)">
            <circle cx="0" cy="0" r="30" fill="#FCD34D" />
            <circle cx="0" cy="0" r="40" stroke="#FCD34D" strokeWidth="4" strokeDasharray="10 10" fill="none" opacity="0.5">
               <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
            </circle>
            {/* Sun Face */}
            <path d="M-10 -5 Q0 0 10 -5" stroke="#B45309" strokeWidth="2" fill="none" />
            <circle cx="-10" cy="-10" r="2" fill="#B45309" />
            <circle cx="10" cy="-10" r="2" fill="#B45309" />
        </g>
    </g>
  </svg>
);

export const OnboardingIllustrationGrowth: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FAF5FF" />
        <stop offset="100%" stopColor="#F3E8FF" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="200" r="160" fill="url(#skyGradient3)" opacity="0.6" />
    
    <g transform="translate(100, 100)">
        {/* Big Tree Trunk */}
        <path d="M80 200 L120 200 L110 100 Q100 50 100 20" stroke="#A78BFA" strokeWidth="12" fill="none" strokeLinecap="round" />
        
        {/* Leaves */}
        <circle cx="100" cy="20" r="40" fill="#C084FC" opacity="0.4" />
        <circle cx="80" cy="40" r="30" fill="#C084FC" opacity="0.5" />
        <circle cx="120" cy="30" r="35" fill="#C084FC" opacity="0.5" />
        
        {/* Chart Line winding around */}
        <path d="M40 200 Q70 180 80 150 T120 120 T160 80" stroke="#F43F5E" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="10 5" />
        <circle cx="40" cy="200" r="5" fill="#F43F5E" />
        <circle cx="160" cy="80" r="5" fill="#F43F5E" />
        
        {/* Floating Hearts */}
        <path d="M160 80 L170 70 L180 80 L170 90 Z" fill="#F43F5E">
             <animate attributeName="transform" type="translate" from="0 0" to="0 -10" dur="2s" repeatCount="indefinite" />
        </path>
    </g>
  </svg>
);
