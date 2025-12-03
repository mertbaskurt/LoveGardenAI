import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  User, 
  Couple, 
  Plant, 
  PlantType, 
  CareAction, 
  ViewState, 
  CareType 
} from './types';
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
  PlantFlower,
  PlantBonsai,
  PlantTropical,
  OnboardingIllustration,
  OnboardingIllustrationCare,
  OnboardingIllustrationGrowth
} from './components/Icons';
import { getPlantWisdom, generatePlantImage } from './services/geminiService';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- MOCK STORAGE & HELPER FUNCTIONS ---

const generateId = () => Math.random().toString(36).substr(2, 9);
const generateCode = () => Math.random().toString(36).substr(2, 6).toUpperCase();

// --- COMPONENTS ---

// 1. UI Components
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }> = ({ className, variant = 'primary', ...props }) => {
  const baseStyle = "w-full py-4 rounded-3xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-love-500 text-white shadow-lg shadow-love-200 hover:bg-love-600 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-mint-500 text-white shadow-lg shadow-mint-100 hover:bg-mint-600 disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "border-2 border-love-300 text-love-400 hover:bg-love-50 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost: "text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />;
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className="w-full bg-white px-6 py-4 rounded-2xl text-lg text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-love-200 shadow-sm" {...props} />
);

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-3xl shadow-sm p-6 ${className}`}>{children}</div>
);

// 2. Main App Component
const App = () => {
  // --- STATE ---
  const [view, setView] = useState<ViewState>('onboarding');
  const [user, setUser] = useState<User | null>(null);
  const [couple, setCouple] = useState<Couple | null>(null);
  const [plant, setPlant] = useState<Plant | null>(null);
  const [careHistory, setCareHistory] = useState<CareAction[]>([]);
  
  // Transient State
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [careMessage, setCareMessage] = useState('');
  const [plantWisdom, setPlantWisdom] = useState<string | null>(null);
  const [isLoadingWisdom, setIsLoadingWisdom] = useState(false);
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Image Gen State
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // --- PERSISTENCE & INIT ---
  useEffect(() => {
    const savedUser = localStorage.getItem('lg_user');
    const savedCouple = localStorage.getItem('lg_couple');
    const savedPlant = localStorage.getItem('lg_plant');
    const savedHistory = localStorage.getItem('lg_history');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCouple) setCouple(JSON.parse(savedCouple));
    if (savedPlant) setPlant(JSON.parse(savedPlant));
    if (savedHistory) setCareHistory(JSON.parse(savedHistory));

    // Initial Routing Logic
    if (savedUser) {
      const u = JSON.parse(savedUser);
      if (!u.coupleId) {
        setView('match');
      } else if (savedCouple && !JSON.parse(savedCouple).plantId) {
        setView('plant-select');
      } else {
        setView('garden');
      }
    } else {
      setView('onboarding');
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('lg_user', JSON.stringify(user));
    if (couple) localStorage.setItem('lg_couple', JSON.stringify(couple));
    if (plant) localStorage.setItem('lg_plant', JSON.stringify(plant));
    if (careHistory) localStorage.setItem('lg_history', JSON.stringify(careHistory));
  }, [user, couple, plant, careHistory]);

  // --- ACTIONS ---

  const handleLogin = (nameInput: string) => {
    const newUser: User = { id: generateId(), name: nameInput };
    setUser(newUser);
    setView('match');
  };

  const handleCreateCouple = () => {
    if (!user) return;
    const newCouple: Couple = {
      id: generateId(),
      partner1Id: user.id,
      code: generateCode()
    };
    const updatedUser = { ...user, coupleId: newCouple.id };
    
    setCouple(newCouple);
    setUser(updatedUser);
    setView('plant-select');
  };

  const handleJoinCouple = () => {
    if (!user) return;
    const newCouple: Couple = {
      id: generateId(),
      partner1Id: 'partner_placeholder',
      partner2Id: user.id,
      code: joinCode.toUpperCase()
    };
    const updatedUser = { ...user, coupleId: newCouple.id };
    
    setCouple(newCouple);
    setUser(updatedUser);
    setView('plant-select');
  };

  const handleSelectPlant = (type: PlantType) => {
    if (!couple) return;
    const newPlant: Plant = {
      id: generateId(),
      coupleId: couple.id,
      type,
      level: 1,
      exp: 0,
      maxExp: 100,
      name: 'Love Sprout',
      createdAt: Date.now()
    };
    const updatedCouple = { ...couple, plantId: newPlant.id };
    
    setPlant(newPlant);
    setCouple(updatedCouple);
    setView('garden');
  };

  const handleSendCare = async (type: CareType, content: string) => {
    if (!user || !couple || !plant) return;

    const xpGain = type === 'water' ? 20 : 10;
    const newExp = plant.exp + xpGain;
    let newLevel = plant.level;
    let currentMaxExp = plant.maxExp;

    if (newExp >= currentMaxExp) {
      newLevel += 1;
      currentMaxExp = Math.floor(currentMaxExp * 1.5);
    }

    const updatedPlant = {
      ...plant,
      level: newLevel,
      exp: newExp >= plant.maxExp ? newExp - plant.maxExp : newExp,
      maxExp: currentMaxExp
    };

    const action: CareAction = {
      id: generateId(),
      coupleId: couple.id,
      fromUserId: user.id,
      type,
      message: content,
      createdAt: Date.now(),
      xpGained: xpGain
    };

    setPlant(updatedPlant);
    setCareHistory([action, ...careHistory]);
    
    // Trigger celebration animation
    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 800);

    setView('garden');
    
    setIsLoadingWisdom(true);
    const wisdom = await getPlantWisdom(updatedPlant, [action, ...careHistory]);
    setPlantWisdom(wisdom);
    setIsLoadingWisdom(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCouple(null);
    setPlant(null);
    setCareHistory([]);
    setName('');
    setView('onboarding');
    setOnboardingSlide(0);
  };

  const handleGenerateImage = async () => {
    if (!plant) return;
    
    // Check for API key before generating
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
        await window.aistudio.openSelectKey();
        const hasKeyAfter = await window.aistudio.hasSelectedApiKey();
        if (!hasKeyAfter) return; // User cancelled
    }

    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
        const imageUrl = await generatePlantImage(plant, imageSize);
        setGeneratedImage(imageUrl);
    } catch (e: any) {
        console.error(e);
        // If the key is invalid or not found, prompt to select again
        if (e.message?.includes("Requested entity was not found")) {
            await window.aistudio.openSelectKey();
            alert("API Key refreshed. Please try again.");
        } else {
            alert("Failed to generate image. Please try again.");
        }
    } finally {
        setIsGeneratingImage(false);
    }
  };

  // --- VIEWS ---

  const renderOnboarding = () => {
    const slides = [
      {
        title: "LoveGarden",
        subtitle: "Plant a seed with your partner and water it with love.",
        Illustration: OnboardingIllustration
      },
      {
        title: "Nurture Together",
        subtitle: "Send sweet messages and emojis to help your garden thrive.",
        Illustration: OnboardingIllustrationCare
      },
      {
        title: "Watch it Grow",
        subtitle: "Track your relationship journey as your plant levels up.",
        Illustration: OnboardingIllustrationGrowth
      }
    ];

    const currentSlideData = slides[onboardingSlide];
    const Illustration = currentSlideData.Illustration;

    return (
      <div className="flex flex-col h-full bg-white relative overflow-hidden transition-all duration-500">
        {/* Decorative Background Blobs */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[50%] bg-love-100 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-mint-100 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
            <div className="w-full max-w-xs aspect-square mb-8 relative flex items-center justify-center">
                <Illustration className="w-full h-full drop-shadow-xl animate-grow" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center tracking-tight min-h-[50px]">
                {currentSlideData.title}
            </h1>
            
            <p className="text-gray-500 text-center text-lg leading-relaxed max-w-xs mb-8 min-h-[60px]">
                {currentSlideData.subtitle}
            </p>

            {/* Dots */}
            <div className="flex gap-2 mb-8">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === onboardingSlide ? 'bg-love-500 w-6' : 'bg-gray-200'}`}
                />
              ))}
            </div>
            
            {onboardingSlide < slides.length - 1 ? (
               <Button onClick={() => setOnboardingSlide(prev => prev + 1)} className="w-full max-w-xs shadow-love-300/40">
                  Next <ArrowRight size={20} />
               </Button>
            ) : (
               <Button onClick={() => setView('auth')} className="w-full max-w-xs shadow-love-300/40">
                  Start Growing Together
               </Button>
            )}

            {onboardingSlide < slides.length - 1 && (
               <button onClick={() => setView('auth')} className="mt-4 text-gray-400 text-sm font-medium hover:text-gray-600">
                 Skip
               </button>
            )}
        </div>
      </div>
    );
  };

  const renderAuth = () => {
    return (
      <div className="flex flex-col h-full p-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-2">What's your name?</h2>
        <p className="text-gray-400 mb-8">This is how you'll appear in the garden.</p>
        <Input 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          autoFocus
        />
        <div className="flex-1" />
        <Button onClick={() => handleLogin(name)} disabled={!name}>Continue</Button>
      </div>
    );
  };

  const renderMatch = () => (
    <div className="flex flex-col h-full p-8 bg-white overflow-y-auto">
      <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-8">Connect Partner</h2>
      
      <Card className="mb-8 border-2 border-love-100">
        <h3 className="text-xl font-bold text-love-500 mb-2 flex items-center gap-2">
          <UserPlus size={24} /> Create New
        </h3>
        <p className="text-gray-400 text-sm mb-4">Start a new garden and invite your partner.</p>
        <Button variant="primary" onClick={handleCreateCouple}>Create Code</Button>
      </Card>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-gray-400 text-sm">OR</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <Card className="border-2 border-mint-100">
        <h3 className="text-xl font-bold text-mint-500 mb-2 flex items-center gap-2">
          <Heart size={24} /> Join Partner
        </h3>
        <p className="text-gray-400 text-sm mb-4">Enter the code your partner gave you.</p>
        <Input 
          placeholder="ENTER CODE" 
          className="text-center uppercase tracking-widest mb-4" 
          maxLength={6}
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <Button variant="secondary" onClick={handleJoinCouple} disabled={joinCode.length < 3}>Join Garden</Button>
      </Card>
    </div>
  );

  const renderPlantSelect = () => {
    const plants: {type: PlantType, name: string, desc: string, Component: any}[] = [
      { type: 'flower', name: 'Love Bloom', desc: 'Needs daily attention. Grows fast and beautiful.', Component: PlantFlower },
      { type: 'bonsai', name: 'Eternal Bonsai', desc: 'Slow growing, sturdy, and deeply rooted.', Component: PlantBonsai },
      { type: 'tropical', name: 'Wild Monstera', desc: 'Fun, wild, and grows in unexpected ways.', Component: PlantTropical },
    ];

    return (
      <div className="flex flex-col h-full p-6 bg-love-50">
        <h2 className="text-2xl font-bold text-center text-gray-800 mt-6 mb-2">Choose your Seed</h2>
        <p className="text-center text-gray-400 mb-8">This will grow as you nurture your relationship.</p>
        
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {plants.map((p) => (
            <div 
              key={p.type} 
              onClick={() => handleSelectPlant(p.type)}
              className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-transform active:scale-95 cursor-pointer"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
                <p.Component level={3} className="w-16 h-16" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{p.name}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
              <ArrowRight className="text-love-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGarden = () => {
    if (!plant) return null;
    const PlantIcon = plant.type === 'flower' ? PlantFlower : plant.type === 'bonsai' ? PlantBonsai : PlantTropical;
    const progress = (plant.exp / plant.maxExp) * 100;

    // Animation variables based on level
    const glowIntensity = Math.min(plant.level * 3, 50); // Max 50px glow radius
    const glowColor = "rgba(244, 63, 94, 0.5)"; // Love-500 with opacity
    
    // Dynamic bounce height based on level. 
    // Level 1 -> -15px, Level 10 -> -60px.
    const bounceHeight = `-${Math.min(10 + plant.level * 5, 60)}px`;

    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-white to-love-50 relative overflow-hidden">
        {/* Header */}
        <div className="p-6 flex justify-between items-center z-10">
          <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            <span className="font-bold text-love-500">Lv. {plant.level}</span>
          </div>
          
          <button 
             onClick={() => setView('generate-image')}
             className="bg-white/60 backdrop-blur-md p-2 rounded-full shadow-sm text-love-500 hover:text-love-600 active:scale-95 transition-transform"
             title="Snap a photo"
          >
             <Camera size={20} />
          </button>
        </div>

        {/* AI Wisdom Bubble */}
        {(plantWisdom || isLoadingWisdom) && (
          <div className="absolute top-24 left-6 right-6 z-10 animate-grow">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-tl-none shadow-sm border border-love-100">
              <p className="text-sm text-gray-600 italic leading-relaxed">
                {isLoadingWisdom ? "Listening to the leaves..." : `"${plantWisdom}"`}
              </p>
            </div>
          </div>
        )}

        {/* Plant Area */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute w-64 h-64 bg-love-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute w-48 h-48 bg-mint-200 rounded-full blur-2xl opacity-20 -bottom-10 right-10"></div>
          
          <PlantIcon 
             level={plant.level} 
             className={`w-64 h-64 z-10 transition-all duration-1000 origin-[50%_80%] ${isCelebrating ? 'animate-bounce-care' : 'animate-sway'}`}
             style={{
                filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
                '--bounce-height': bounceHeight
             } as React.CSSProperties} 
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-8 pb-24 z-20">
          <div className="flex justify-between text-sm text-gray-400 mb-2 font-medium">
            <span>XP</span>
            <span>{plant.exp} / {plant.maxExp}</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-love-400 to-love-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <Button onClick={() => setView('send-care')} className="shadow-love-300/50">
            <Heart className="fill-white" /> Send Love
          </Button>
        </div>
      </div>
    );
  };

  const renderGenerateImage = () => {
     return (
        <div className="flex flex-col h-full bg-black p-6 relative">
           <div className="absolute top-6 left-6 z-10">
              <button onClick={() => setView('garden')} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
                <ArrowRight className="transform rotate-180" />
              </button>
           </div>
           
           <h2 className="text-white text-2xl font-bold mt-16 mb-2 text-center">Capture Magic</h2>
           <p className="text-gray-400 text-center text-sm mb-8">Generate a unique 3D keepsake of your garden.</p>

           <div className="flex-1 flex flex-col items-center justify-center">
              {generatedImage ? (
                  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-love-500/20 mb-8 border-4 border-white/10 relative group">
                      <img src={generatedImage} alt="Generated Garden" className="w-full h-full object-cover" />
                      <a href={generatedImage} download="lovegarden-keepsake.png" className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full text-gray-800 shadow-lg hover:bg-white">
                         <Download size={20} />
                      </a>
                  </div>
              ) : (
                  <div className="w-full aspect-square rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center mb-8">
                     {isGeneratingImage ? (
                        <>
                           <Loader className="animate-spin text-love-500 mb-4" size={48} />
                           <p className="text-gray-400 text-sm animate-pulse">Dreaming up your garden...</p>
                        </>
                     ) : (
                        <>
                           <Camera className="text-gray-600 mb-4" size={48} />
                           <p className="text-gray-600 text-sm">Preview will appear here</p>
                        </>
                     )}
                  </div>
              )}
           </div>

           <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <label className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-4 block">Resolution</label>
              <div className="flex gap-2 mb-6">
                 {(['1K', '2K', '4K'] as const).map(size => (
                    <button 
                       key={size}
                       onClick={() => setImageSize(size)}
                       className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${imageSize === size ? 'bg-white text-black' : 'bg-black/40 text-gray-500'}`}
                    >
                       {size}
                    </button>
                 ))}
              </div>
              
              <Button onClick={handleGenerateImage} disabled={isGeneratingImage} variant="primary" className="bg-gradient-to-r from-purple-500 to-love-500 border-none">
                 {isGeneratingImage ? 'Generating...' : 'Generate Photo'}
              </Button>
              <p className="text-xs text-center text-gray-500 mt-4">Requires paid API Key. Powered by Gemini.</p>
           </div>
        </div>
     )
  }

  const renderSendCare = () => (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => setView('garden')} className="p-2 bg-gray-50 rounded-full">
          <ArrowRight className="transform rotate-180 text-gray-500" />
        </button>
        <h2 className="text-xl font-bold text-center flex-1 pr-10">Nurture Plant</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div 
          onClick={() => { setCareMessage('💦'); handleSendCare('water', 'Watered the plant'); }}
          className="aspect-square bg-blue-50 rounded-3xl border-2 border-transparent hover:border-blue-200 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95"
        >
          <Droplets className="w-12 h-12 text-blue-400 mb-2" />
          <span className="font-bold text-blue-500">Water</span>
          <span className="text-xs text-blue-300">+20 XP</span>
        </div>
        <div 
           onClick={() => { setCareMessage('☀️'); handleSendCare('sun', 'Sent sunshine'); }}
           className="aspect-square bg-yellow-50 rounded-3xl border-2 border-transparent hover:border-yellow-200 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95"
        >
          <Sun className="w-12 h-12 text-yellow-400 mb-2" />
          <span className="font-bold text-yellow-500">Sunlight</span>
          <span className="text-xs text-yellow-300">+10 XP</span>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-400">Or send a note</span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-3xl mb-4">
        <textarea 
          className="w-full bg-transparent resize-none focus:outline-none text-gray-700 placeholder-gray-400"
          rows={4}
          placeholder="Write something sweet..."
          value={careMessage}
          onChange={(e) => setCareMessage(e.target.value)}
        />
      </div>

      <div className="flex-1" />
      <Button 
        onClick={() => handleSendCare('water', careMessage)} 
        disabled={!careMessage.trim()}
        variant="secondary"
      >
        Send Note (+20 XP)
      </Button>
    </div>
  );

  const renderTimeline = () => {
    // Prepare Data for Chart
    const chartData = careHistory
      .slice()
      .reverse()
      .map((action, index) => ({
        name: index,
        xp: action.xpGained
      }))
      .slice(-10); // Last 10 actions

    return (
      <div className="flex flex-col h-full bg-white p-6 pb-24">
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-6">Growth History</h2>
        
        {careHistory.length > 0 ? (
          <>
            <div className="h-48 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#F43F5E" 
                    strokeWidth={3} 
                    dot={{ fill: '#F43F5E', strokeWidth: 0, r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h3 className="text-lg font-bold text-gray-600 mb-4">Recent Care</h3>
            <div className="space-y-4 overflow-y-auto">
              {careHistory.map((action) => (
                <div key={action.id} className="flex gap-4 items-start">
                  <div className={`p-3 rounded-2xl ${action.type === 'water' ? 'bg-blue-50 text-blue-400' : 'bg-yellow-50 text-yellow-400'}`}>
                    {action.type === 'water' ? <Droplets size={20} /> : <Sun size={20} />}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-800 font-medium">{action.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(action.createdAt).toLocaleDateString()} • +{action.xpGained} XP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 opacity-50">
            <History size={48} className="mb-4" />
            <p>No history yet.</p>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="flex flex-col h-full bg-white p-6 pb-24">
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-8">Settings</h2>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-love-100 rounded-full flex items-center justify-center text-2xl">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-xl">{user?.name}</h3>
          <p className="text-gray-400 text-sm">Level {plant?.level || 1} Gardener</p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Couple</h3>
      <Card className="mb-6 bg-love-50 border border-love-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 font-medium">Invitation Code</span>
          <Copy className="text-love-400 w-5 h-5 cursor-pointer" />
        </div>
        <p className="text-3xl font-mono font-bold text-love-600 tracking-widest">{couple?.code}</p>
      </Card>

      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Widget</h3>
      <div className="bg-gray-50 rounded-3xl p-4 mb-8 flex items-center gap-4">
        <div className="w-24 h-24 bg-white rounded-2xl shadow-sm p-3 flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <div className="w-8 h-8 bg-love-100 rounded-full flex items-center justify-center">
                 <Sprout size={16} className="text-love-500"/>
               </div>
               <span className="text-[10px] font-bold text-gray-400">Lv.{plant?.level}</span>
            </div>
            <div className="text-[10px] text-gray-500 leading-tight">
               Last: {careHistory[0]?.message || "No Data"}
            </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800">Home Screen Widget</h4>
          <p className="text-xs text-gray-400 mt-1">
            To add the widget on iOS, long press home screen, tap +, and find LoveGarden.
          </p>
        </div>
      </div>
      
      <Button variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600 mt-auto" onClick={handleLogout}>
        <LogOut className="w-5 h-5" /> Sign Out
      </Button>
    </div>
  );

  // --- MAIN RENDER ---
  const showTabBar = ['garden', 'timeline', 'settings'].includes(view);

  return (
    <div className="w-full h-screen bg-black flex justify-center">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md h-full bg-white relative overflow-hidden flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {view === 'onboarding' && renderOnboarding()}
          {view === 'auth' && renderAuth()}
          {view === 'match' && renderMatch()}
          {view === 'plant-select' && renderPlantSelect()}
          {view === 'garden' && renderGarden()}
          {view === 'send-care' && renderSendCare()}
          {view === 'timeline' && renderTimeline()}
          {view === 'settings' && renderSettings()}
          {view === 'generate-image' && renderGenerateImage()}
        </div>

        {/* Tab Bar */}
        {showTabBar && (
          <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-100 flex justify-around items-center px-2 z-30">
            <button 
              onClick={() => setView('garden')}
              className={`p-3 rounded-full transition-all ${view === 'garden' ? 'text-love-500 bg-love-50' : 'text-gray-400'}`}
            >
              <Sprout size={24} />
            </button>
            <button 
              onClick={() => setView('timeline')}
              className={`p-3 rounded-full transition-all ${view === 'timeline' ? 'text-love-500 bg-love-50' : 'text-gray-400'}`}
            >
              <History size={24} />
            </button>
            <button 
              onClick={() => setView('settings')}
              className={`p-3 rounded-full transition-all ${view === 'settings' ? 'text-love-500 bg-love-50' : 'text-gray-400'}`}
            >
              <Settings size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;