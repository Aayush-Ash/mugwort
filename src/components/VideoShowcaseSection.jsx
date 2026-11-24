import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  Activity, 
  Flame, 
  Clock, 
  Target, 
  ChevronRight 
} from 'lucide-react';
import { RITUAL_VIDEOS } from '../services/bundlesData';
import { useShop } from '../context/ShopContext';

export default function VideoShowcaseSection() {
  const { openCheckoutWithProduct, openVideoModal } = useShop();

  // Active view tab per card ('how' | 'why')
  const [activeTabs, setActiveTabs] = useState({
    0: 'how',
    1: 'how',
    2: 'how',
    3: 'how'
  });

  // Track muted state per video (all start muted for autoplay compliance)
  const [mutedStates, setMutedStates] = useState([true, true, true, true]);
  
  // Track playing state per video
  const [playingStates, setPlayingStates] = useState([true, true, true, true]);

  // Track progress percentages for custom scrubber line
  const [progresses, setProgresses] = useState([0, 0, 0, 0]);

  // Video element refs
  const videoRefs = useRef([]);

  // Active category filter for quick filtering / highlighting
  const [activeFilter, setActiveFilter] = useState('all');

  const setTabForCard = (cardIdx, tab) => {
    setActiveTabs(prev => ({ ...prev, [cardIdx]: tab }));
  };

  const toggleSound = (idx, e) => {
    e.stopPropagation();
    setMutedStates(prev => {
      const next = [...prev];
      const willBeUnmuted = prev[idx]; // currently muted -> will unmute
      
      if (willBeUnmuted) {
        // Mute all others, unmute this one
        const updated = next.map((_, i) => (i === idx ? false : true));
        // Apply directly to DOM video elements
        videoRefs.current.forEach((vid, i) => {
          if (vid) vid.muted = i !== idx;
        });
        return updated;
      } else {
        // Mute this one
        next[idx] = true;
        if (videoRefs.current[idx]) videoRefs.current[idx].muted = true;
        return next;
      }
    });
  };

  const togglePlay = (idx, e) => {
    if (e) e.stopPropagation();
    const vid = videoRefs.current[idx];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPlayingStates(prev => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    } else {
      vid.pause();
      setPlayingStates(prev => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
    }
  };

  const handleTimeUpdate = (idx) => {
    const vid = videoRefs.current[idx];
    if (!vid || !vid.duration) return;
    const pct = (vid.currentTime / vid.duration) * 100;
    setProgresses(prev => {
      const next = [...prev];
      next[idx] = pct;
      return next;
    });
  };

  return (
    <section id="video-showcase" className="py-16 sm:py-24 bg-[#f6f1e8] relative overflow-hidden">
      
      {/* Subtle organic light gradient behind the glass cards */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#e8decb]/50 via-[#dfd3bd]/20 to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 glass-badge-pill px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.24em] uppercase text-[#615448] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#445834]" />
            <span>HOW & WHY WE USE THIS</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1e1711] font-normal leading-[1.15]">
            The Daily Ritual{' '}
            <span className="relative inline-block">
              in Motion.
              {/* Organic hand-drawn brush SVG underline */}
              <svg
                className="absolute left-0 -bottom-2.5 w-full h-3 text-[#445834] overflow-visible"
                viewBox="0 0 240 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9.5C65 2 175 1.5 238 8"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#4f4337] leading-relaxed font-normal max-w-2xl mx-auto">
            See how real practitioners tap away desk stiffness, accelerate post-run leg recovery, deepen yoga mobility, and soothe sore muscles with the warm herbal resonance of wild Artemisia Argyi.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All 4 Rituals' },
              { id: 'desk', label: '01 / Desk Reset' },
              { id: 'runner', label: '02 / Post-Run' },
              { id: 'yoga', label: '03 / Yoga & Mobility' },
              { id: 'gym', label: '04 / Gym & Fitness' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`text-xs px-4 py-1.5 rounded-full cursor-pointer transition-all ${
                  activeFilter === pill.id
                    ? 'bg-[#201813] text-[#ede6dc] shadow-md font-medium'
                    : 'glass-badge-pill text-[#615448] hover:text-[#201813]'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

        </div>

        {/* 4-Column Video Showcase Grid with Glass Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {RITUAL_VIDEOS.map((item, idx) => {
            const isDimmed = activeFilter !== 'all' && 
              ((activeFilter === 'desk' && idx !== 0) ||
               (activeFilter === 'runner' && idx !== 1) ||
               (activeFilter === 'yoga' && idx !== 2) ||
               (activeFilter === 'gym' && idx !== 3));

            const isHowActive = activeTabs[idx] === 'how';

            return (
              <div
                key={item.id}
                className={`glass-card-border rounded-[32px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden group ${
                  isDimmed ? 'opacity-40 scale-[0.98]' : 'opacity-100'
                }`}
              >
                {/* Diagonal glass reflection highlight */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-white/60 via-white/10 to-transparent rounded-full blur-xl" />

                {/* Top Section: Video Container with Glass Frame */}
                <div>
                  
                  {/* Glass Video Bezel Frame */}
                  <div 
                    className="glass-video-wrapper aspect-[9/16] relative overflow-hidden rounded-2xl cursor-pointer group/video"
                    onClick={() => togglePlay(idx)}
                  >
                    
                    {/* The Video Element */}
                    <video
                      ref={el => (videoRefs.current[idx] = el)}
                      src={item.videoSrc}
                      poster={item.poster}
                      playsInline
                      autoPlay
                      loop
                      muted={mutedStates[idx]}
                      onTimeUpdate={() => handleTimeUpdate(idx)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-[1.02]"
                    />

                    {/* Top Overlaid Glass Pill Badges & Controls */}
                    <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
                      
                      {/* Left Badge: Number & Category */}
                      <div className="glass-badge-dark text-[11px] font-semibold tracking-wider uppercase text-white/95 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-auto shadow-md">
                        <span className="w-2 h-2 rounded-full bg-[#8ea77b] animate-pulse" />
                        <span>{item.number} / {item.category.split('&')[0].trim()}</span>
                      </div>

                      {/* Right Control Buttons (Glass Effect) */}
                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        
                        {/* Audio Toggle Button */}
                        <button
                          onClick={(e) => toggleSound(idx, e)}
                          title={mutedStates[idx] ? 'Click to Unmute' : 'Click to Mute'}
                          className={`glass-control-btn w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
                            !mutedStates[idx] ? 'ring-2 ring-[#8ea77b] bg-[#445834]/80' : ''
                          }`}
                        >
                          {mutedStates[idx] ? (
                            <VolumeX className="w-3.5 h-3.5 text-white/80" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                          )}
                        </button>

                        {/* Play/Pause Button */}
                        <button
                          onClick={(e) => togglePlay(idx, e)}
                          title={playingStates[idx] ? 'Pause Video' : 'Play Video'}
                          className="glass-control-btn w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          {playingStates[idx] ? (
                            <Pause className="w-3.5 h-3.5 text-white/90" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-white/90 fill-current ml-0.5" />
                          )}
                        </button>

                        {/* Modal Expand Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openVideoModal(idx);
                          }}
                          title="Open in HD Ritual Guide"
                          className="glass-control-btn w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-white/90" />
                        </button>

                      </div>

                    </div>

                    {/* Center Pause Indicator Overlay */}
                    {!playingStates[idx] && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all">
                        <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-2xl scale-110">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Unmute Hint Banner if currently muted */}
                    {mutedStates[idx] && (
                      <div className="absolute top-14 right-3 z-10 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                        <span className="bg-black/75 backdrop-blur-md text-[10px] text-white px-2.5 py-1 rounded-md border border-white/20 whitespace-nowrap shadow-lg">
                          Tap 🔊 for sound
                        </span>
                      </div>
                    )}

                    {/* Bottom Overlaid Title & Acupoint Information */}
                    <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#120d09]/95 via-[#120d09]/50 to-transparent p-4 pt-10 pointer-events-none">
                      
                      {/* Acupoint Glass Pill */}
                      <div className="inline-flex items-center gap-1.5 glass-badge-dark px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide text-[#ded5c8] mb-1.5 border border-white/20">
                        <Target className="w-3 h-3 text-[#a9c494]" />
                        <span>{item.acupoint}</span>
                      </div>

                      {/* Video Title */}
                      <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal leading-snug drop-shadow-sm">
                        {item.title}
                      </h3>

                    </div>

                    {/* Glass Progress Bar at bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-30">
                      <div 
                        className="h-full bg-[#8ea77b] transition-all duration-150 rounded-r-full"
                        style={{ width: `${progresses[idx]}%` }}
                      />
                    </div>

                  </div>

                  {/* HOW vs WHY Glass Toggle Switcher */}
                  <div className="mt-4 p-1 rounded-2xl bg-[#efe8dc]/80 border border-white/70 shadow-inner flex items-center gap-1">
                    <button
                      onClick={() => setTabForCard(idx, 'how')}
                      className={`flex-1 text-xs py-2 px-3 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        isHowActive
                          ? 'glass-tab-active text-[#1f1711] font-semibold text-xs'
                          : 'text-[#6b5d4f] hover:text-[#2c241c] font-medium'
                      }`}
                    >
                      <Activity className={`w-3.5 h-3.5 ${isHowActive ? 'text-[#445834]' : 'text-[#8c7e70]'}`} />
                      <span>HOW TO USE</span>
                    </button>

                    <button
                      onClick={() => setTabForCard(idx, 'why')}
                      className={`flex-1 text-xs py-2 px-3 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        !isHowActive
                          ? 'glass-tab-active text-[#1f1711] font-semibold text-xs'
                          : 'text-[#6b5d4f] hover:text-[#2c241c] font-medium'
                      }`}
                    >
                      <Leaf className={`w-3.5 h-3.5 ${!isHowActive ? 'text-[#445834]' : 'text-[#8c7e70]'}`} />
                      <span>WHY WE USE THIS</span>
                    </button>
                  </div>

                  {/* Card Content Drawer: Tab 'HOW' vs 'WHY' */}
                  <div className="mt-3.5 min-h-[175px]">
                    {isHowActive ? (
                      /* Tab: HOW TO USE */
                      <div className="space-y-2.5 animate-fadeIn">
                        
                        <div className="flex items-center justify-between text-[11px] text-[#615448] font-semibold tracking-wider uppercase pb-1 border-b border-[#e6dcce]">
                          <span>{item.howHeadline}</span>
                          <span className="flex items-center gap-1 text-[#445834]">
                            <Clock className="w-3 h-3" />
                            {item.runtime} Loop
                          </span>
                        </div>

                        {/* Step items */}
                        <div className="space-y-2 pt-1">
                          {item.howSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2.5 text-xs text-[#3f352c]">
                              <span className="w-5 h-5 rounded-full bg-[#e8decf] border border-[#d6c9b8] font-semibold text-[10px] text-[#2c231a] flex items-center justify-center shrink-0 mt-0.5">
                                {step.step}
                              </span>
                              <div>
                                <span className="font-semibold text-[#1e1711] mr-1">{step.title}:</span>
                                <span className="text-[#514539] leading-relaxed">{step.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    ) : (
                      /* Tab: WHY WE USE THIS */
                      <div className="space-y-2.5 animate-fadeIn">
                        
                        <div className="flex items-center justify-between text-[11px] text-[#615448] font-semibold tracking-wider uppercase pb-1 border-b border-[#e6dcce]">
                          <span>{item.whyHeadline}</span>
                          <span className="flex items-center gap-1 text-[#8c673b]">
                            <Flame className="w-3 h-3" />
                            Aged Mugwort
                          </span>
                        </div>

                        {/* Why Explanation */}
                        <p className="text-xs text-[#4f4337] leading-relaxed font-normal pt-1">
                          {item.whyText}
                        </p>

                        {/* Key Benefits */}
                        <div className="space-y-1.5 pt-1">
                          {item.whyHighlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs text-[#2b221a]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#445834] shrink-0" />
                              <span className="font-medium text-[#3b3127]">{hl}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="mt-5 pt-4 border-t border-[#e8ded0] space-y-2.5">
                  <button
                    onClick={() => openCheckoutWithProduct(item.targetProductId)}
                    className="glow-btn-green w-full text-white text-xs sm:text-[13px] font-medium py-3 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Claim {item.targetProduct}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openVideoModal(idx)}
                    className="w-full text-center text-[11px] text-[#615448] hover:text-[#445834] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Watch Full 15s Guided Ritual</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Practice Banner */}
        <div className="mt-12 glass-card-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white/70 via-white/50 to-white/70">
          
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold tracking-wider uppercase text-[#445834]">
              <Leaf className="w-4 h-4 text-[#445834]" />
              <span>THE HERBAL ART OF ARTEMISIA ARGYI</span>
            </div>
            <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#1e1711] font-normal">
              Why 5-Year Slow-Cured Mugwort Muscle Tappers Beat Electric Massage Guns
            </h4>
            <p className="text-xs sm:text-sm text-[#5a4c3f] max-w-2xl leading-relaxed">
              Vibrating motors shock superficial sensory nerves, triggering unconscious muscle guarding. Rhythmic bamboo spring recoil combined with heated botanical cushion taps directly into meridian points, warming connective tissues without jarring pain.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openVideoModal(0)}
              className="w-full sm:w-auto glass-badge-pill text-[#201813] hover:bg-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full border border-white/80 cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#445834]" />
              <span>Watch Interactive Guide</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('curated-rituals');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto glow-btn-green text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full cursor-pointer shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Explore The Sets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
