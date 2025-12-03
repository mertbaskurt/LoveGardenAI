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

// --- CUSTOM HIGH-FIDELITY PLANT ILLUSTRATIONS ---

export const PlantFlower: React.FC<{ level: number, className?: string, style?: React.CSSProperties }> = ({ level, className, style }) => {
  const scale = Math.min(1 + (level * 0.1), 1.5);
  
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FCD34D" />
        </radialGradient>
        <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FECDD3" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      <g transform={`translate(100, 160) scale(${scale}) translate(-100, -160)`}>
        
        {/* Pot */}
        <g filter="url(#shadow)">
            <path d="M75 160 L125 160 L120 190 Q100 195 80 190 Z" fill="url(#potGradient)" />
            <ellipse cx="100" cy="160" rx="25" ry="5" fill="#881337" opacity="0.3" /> {/* Inner soil shadow */}
            <path d="M73 160 L75 155 L125 155 L127 160 Z" fill="#FECDD3" /> {/* Rim */}
        </g>

        {/* Stem */}
        <path d="M100 160 Q105 130 100 110" stroke="url(#stemGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Leaves */}
        {level > 1 && (
            <g transform="translate(100, 140) rotate(-20)">
                <path d="M0 0 Q-20 -10 -25 -5 Q-15 5 0 0" fill="url(#leafGradient)" />
            </g>
        )}
        {level > 2 && (
            <g transform="translate(100, 130) rotate(20) scale(-1, 1)">
                <path d="M0 0 Q-20 -10 -25 -5 Q-15 5 0 0" fill="url(#leafGradient)" />
            </g>
        )}

        {/* Flower Head */}
        <g transform="translate(100, 110)">
            {/* Petals - Layer 1 */}
            <circle cx="0" cy="-12" r="10" fill="url(#petalGradient)" />
            <circle cx="10" cy="-5" r="10" fill="url(#petalGradient)" />
            <circle cx="8" cy="8" r="10" fill="url(#petalGradient)" />
            <circle cx="-8" cy="8" r="10" fill="url(#petalGradient)" />
            <circle cx="-10" cy="-5" r="10" fill="url(#petalGradient)" />
            
            {/* Center */}
            <circle cx="0" cy="0" r="8" fill="url(#flowerCenter)" />
            <circle cx="2" cy="-2" r="2" fill="white" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
};

export const PlantBonsai: React.FC<{ level: number, className?: string, style?: React.CSSProperties }> = ({ level, className, style }) => {
  const scale = Math.min(1 + (level * 0.1), 1.5);
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="50%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <radialGradient id="leafCloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="80%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#14532D" />
        </radialGradient>
        <linearGradient id="ceramicPot" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
         <filter id="shadowBonsai" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>

      <g transform={`translate(100, 160) scale(${scale}) translate(-100, -160)`}>
         {/* Pot */}
         <g filter="url(#shadowBonsai)">
             <path d="M70 170 L130 170 L125 185 Q100 190 75 185 Z" fill="url(#ceramicPot)" />
             <rect x="68" y="165" width="64" height="5" rx="2" fill="#94A3B8" />
         </g>

         {/* Trunk - Organic shape */}
         <path 
           d="M100 170 C100 160 110 150 100 140 C90 130 80 125 85 110 C90 95 110 100 115 90" 
           fill="none" 
           stroke="url(#woodGradient)" 
           strokeWidth="8" 
           strokeLinecap="round"
         />
         {/* Branch */}
         <path d="M100 140 C110 135 120 140 125 135" stroke="url(#woodGradient)" strokeWidth="5" strokeLinecap="round" />

         {/* Foliage Clouds */}
         <g>
            <circle cx="85" cy="110" r="18" fill="url(#leafCloud)" />
            <circle cx="75" cy="100" r="15" fill="url(#leafCloud)" />
            <circle cx="95" cy="105" r="15" fill="url(#leafCloud)" />
            
            <circle cx="115" cy="90" r="12" fill="url(#leafCloud)" />
            <circle cx="125" cy="135" r="10" fill="url(#leafCloud)" />
            
            {level > 3 && <circle cx="100" cy="80" r="10" fill="url(#leafCloud)" />}
         </g>
      </g>
    </svg>
  );
};

export const PlantTropical: React.FC<{ level: number, className?: string, style?: React.CSSProperties }> = ({ level, className, style }) => {
  const scale = Math.min(1 + (level * 0.1), 1.5);
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="basketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="20%" stopColor="#EA580C" />
          <stop offset="40%" stopColor="#FDBA74" />
          <stop offset="60%" stopColor="#EA580C" />
          <stop offset="80%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="monsteraLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
           <stop offset="0%" stopColor="#10B981" />
           <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
         <filter id="shadowTrop" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      <g transform={`translate(100, 160) scale(${scale}) translate(-100, -160)`}>
         {/* Pot (Basket) */}
         <g filter="url(#shadowTrop)">
             <path d="M80 160 L120 160 L115 190 Q100 195 85 190 Z" fill="url(#basketGradient)" />
             <path d="M80 165 L120 165" stroke="#9A3412" strokeWidth="1" opacity="0.5" />
             <path d="M82 175 L118 175" stroke="#9A3412" strokeWidth="1" opacity="0.5" />
         </g>

         {/* Stems */}
         <path d="M100 160 Q100 130 80 100" stroke="#059669" strokeWidth="3" fill="none" />
         <path d="M100 160 Q100 140 120 110" stroke="#059669" strokeWidth="3" fill="none" />
         {level > 1 && <path d="M100 160 Q100 120 100 80" stroke="#059669" strokeWidth="3" fill="none" />}

         {/* Leaf 1 (Left) */}
         <g transform="translate(80, 100) rotate(-30)">
             <path d="M0 0 C-15 -20 -30 -10 -30 10 C-30 30 -10 30 0 0" fill="url(#monsteraLeaf)" />
             <ellipse cx="-15" cy="5" rx="2" ry="4" fill="#065F46" opacity="0.3" transform="rotate(20)" /> {/* Hole */}
         </g>

         {/* Leaf 2 (Right) */}
         <g transform="translate(120, 110) rotate(30)">
             <path d="M0 0 C15 -25 35 -15 35 10 C35 35 10 35 0 0" fill="url(#monsteraLeaf)" />
             <ellipse cx="15" cy="5" rx="3" ry="5" fill="#065F46" opacity="0.3" transform="rotate(-20)" />
             <ellipse cx="18" cy="15" rx="2" ry="3" fill="#065F46" opacity="0.3" transform="rotate(-20)" />
         </g>

         {/* Leaf 3 (Center - Level > 1) */}
         {level > 1 && (
             <g transform="translate(100, 80) rotate(0)">
                 <path d="M0 0 C-20 -30 20 -30 0 0 Z" fill="none" /> {/* Hidden control */}
                 <path d="M0 0 C-20 -25 -30 0 -5 10 C0 0 0 0 0 0 C5 10 30 0 20 -25 Z" fill="url(#monsteraLeaf)" transform="translate(0, -10)" />
             </g>
         )}
      </g>
    </svg>
  );
};

// --- REALISTIC ONBOARDING ILLUSTRATIONS ---

export const OnboardingIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF1F2" />
        <stop offset="100%" stopColor="#FFE4E6" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
         <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.4" />
         <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="soil" x1="0%" y1="0%" x2="100%" y2="0%">
         <stop offset="0%" stopColor="#78350F" />
         <stop offset="100%" stopColor="#451A03" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#skyGradient)" />
    <circle cx="200" cy="150" r="60" fill="url(#sunGlow)" />

    <g transform="translate(100, 80)">
       {/* Soil Mound */}
       <path d="M40 220 Q100 200 160 220 L160 240 L40 240 Z" fill="url(#soil)" />

       {/* Sprout 1 */}
       <path d="M90 220 Q90 160 60 140" stroke="#22C55E" strokeWidth="6" fill="none" strokeLinecap="round" />
       <path d="M60 140 C50 130 60 110 70 120 C80 130 60 140 60 140" fill="#4ADE80" />
       
       {/* Sprout 2 */}
       <path d="M110 220 Q110 160 140 140" stroke="#22C55E" strokeWidth="6" fill="none" strokeLinecap="round" />
       <path d="M140 140 C150 130 140 110 130 120 C120 130 140 140 140 140" fill="#4ADE80" />
       
       {/* Heart joining them */}
       <path 
         d="M100 100 C80 80 70 110 100 130 C130 110 120 80 100 100" 
         fill="#F43F5E" 
         filter="url(#softGlow)"
       >
          <animate attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" additive="sum" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
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
      <linearGradient id="waterCan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="200" r="160" fill="url(#skyGradient2)" />
    
    <g transform="translate(200, 200)">
        {/* Watering Can */}
        <g transform="translate(-80, -60) rotate(-10)">
            <path d="M0 40 L60 40 L55 90 Q30 95 5 90 Z" fill="url(#waterCan)" />
            <path d="M60 50 L90 20" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
            <path d="M15 40 Q5 10 30 10" stroke="#3B82F6" strokeWidth="6" fill="none" />
            <rect x="85" y="15" width="10" height="10" fill="#2563EB" /> {/* Spout tip */}
            
            {/* Water Drops */}
            <circle cx="85" cy="40" r="4" fill="#3B82F6" opacity="0.8">
                <animate attributeName="cy" from="40" to="120" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="95" cy="50" r="3" fill="#3B82F6" opacity="0.6">
                <animate attributeName="cy" from="50" to="130" dur="1s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.6;0" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="90" cy="30" r="2" fill="#3B82F6" opacity="0.5">
                <animate attributeName="cy" from="30" to="110" dur="0.9s" repeatCount="indefinite" />
            </circle>
        </g>
        
        {/* Sun */}
        <g transform="translate(60, -80)">
            <circle cx="0" cy="0" r="30" fill="#FCD34D" />
            <g opacity="0.6">
                <circle cx="0" cy="0" r="38" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
            </g>
            {/* Smile */}
            <path d="M-12 -5 Q0 5 12 -5" stroke="#B45309" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="-10" cy="-12" r="3" fill="#B45309" />
            <circle cx="10" cy="-12" r="3" fill="#B45309" />
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
      <linearGradient id="treeTrunk" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="200" r="160" fill="url(#skyGradient3)" />
    
    <g transform="translate(100, 100)">
        {/* Big Tree Trunk */}
        <path d="M80 200 L120 200 L115 100 Q100 50 100 20" stroke="url(#treeTrunk)" strokeWidth="16" fill="none" strokeLinecap="round" />
        
        {/* Leaves / Canopy */}
        <circle cx="100" cy="20" r="50" fill="#C084FC" opacity="0.6" />
        <circle cx="70" cy="50" r="40" fill="#E879F9" opacity="0.5" />
        <circle cx="130" cy="40" r="45" fill="#A855F7" opacity="0.5" />
        
        {/* Growth Chart Line */}
        <path d="M40 200 C60 180 80 150 100 120 S140 80 180 60" stroke="#F43F5E" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="8 6" />
        <circle cx="40" cy="200" r="6" fill="#F43F5E" />
        <circle cx="180" cy="60" r="6" fill="#F43F5E" />
        
        {/* Floating Hearts */}
        <path d="M170 50 L180 40 L190 50 L180 60 Z" fill="#F43F5E">
             <animate attributeName="transform" type="translate" from="0 0" to="0 -15" dur="2.5s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="1;0" dur="2.5s" repeatCount="indefinite" />
        </path>
    </g>
  </svg>
);
