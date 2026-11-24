import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Leaf, 
  ArrowRight, 
  Target, 
  Activity 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { RITUAL_VIDEOS } from '../services/bundlesData';

export default function RitualVideoModal() {
  const { 
    isRitualVideoOpen, 
    setIsRitualVideoOpen, 
    openCheckoutWithProduct, 
    selectedProductId,
    activeVideoIndex = 0,
    setActiveVideoIndex 
  } = useShop();

  const [currentIdx, setCurrentIdx] = useState(activeVideoIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Unmuted in modal by default so user can hear the voice/sound
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const videoRef = useRef(null);

  // Sync index when modal opens
  useEffect(() => {
    if (isRitualVideoOpen) {
      setCurrentIdx(activeVideoIndex || 0);
      setIsPlaying(true);
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // If browser policy blocks unmuted autoplay, mute and continue
          setIsMuted(true);
          if (videoRef.current) videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        });
      }
    }
  }, [isRitualVideoOpen, activeVideoIndex]);

  // Handle video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIdx]);

  if (!isRitualVideoOpen) return null;

  const currentVideo = RITUAL_VIDEOS[currentIdx] || RITUAL_VIDEOS[0];

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 10;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#140e0a]/85 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Dialog Card with Glass Effect Border */}
      <div className="relative w-full max-w-4xl glass-card-border bg-[#faf7f2]/95 rounded-[32px] shadow-2xl p-5 sm:p-7 overflow-hidden my-auto border-2 border-white/80">
        
        {/* Subtle glass reflection highlight */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-white/70 via-white/10 to-transparent rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={() => {
            setIsRitualVideoOpen(false);
            if (videoRef.current) videoRef.current.pause();
          }}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#ece5d8] hover:bg-[#dfd5c4] text-[#3e342a] flex items-center justify-center cursor-pointer transition-colors z-30 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Header */}
        <div className="text-center space-y-1 mb-5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#615448]">
            <Sparkles className="w-3 h-3 text-[#445834]" />
            <span>THE GUIDED MERIDIAN PRACTICE</span>
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1e1711] font-normal">
            {currentVideo.title}
          </h3>
          <p className="text-xs text-[#5e5043]">
            {currentVideo.category} · Acupoint: <span className="font-semibold text-[#3b3024]">{currentVideo.acupoint}</span>
          </p>
        </div>

        {/* Ritual Video Switcher Tabs (Glass Effect) */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {RITUAL_VIDEOS.map((vid, i) => (
            <button
              key={vid.id}
              onClick={() => {
                setCurrentIdx(i);
                if (setActiveVideoIndex) setActiveVideoIndex(i);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full cursor-pointer transition-all ${
                currentIdx === i
                  ? 'bg-[#201813] text-[#ede6dc] font-medium shadow-md'
                  : 'glass-badge-pill text-[#615448] hover:text-[#201813]'
              }`}
            >
              {vid.number}. {vid.category.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Main Split Grid: Left Video / Right How & Why Guide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Glass Framed Vertical Video (9:16) */}
          <div className="md:col-span-5 flex justify-center">
            
            <div className="glass-video-wrapper w-full max-w-[280px] aspect-[9/16] relative rounded-2xl overflow-hidden shadow-2xl">
              
              <video
                ref={videoRef}
                src={currentVideo.videoSrc}
                poster={currentVideo.poster}
                playsInline
                autoPlay
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Overlaid Sound Toggle Button */}
              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  className={`glass-control-btn w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${
                    !isMuted ? 'ring-2 ring-[#8ea77b] bg-[#445834]/80' : ''
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-white animate-pulse" />}
                </button>
              </div>

              {/* Overlay Play Indicator when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-2xl">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Bottom Scrubber & Time Bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6">
                
                <div className="flex items-center justify-between text-[11px] text-white/90 font-mono mb-1.5">
                  <span>00:{Math.floor(currentTime) < 10 ? `0${Math.floor(currentTime)}` : Math.floor(currentTime)}</span>
                  <span>00:{Math.floor(duration) < 10 ? `0${Math.floor(duration)}` : Math.floor(duration)}</span>
                </div>

                <div className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#8ea77b] transition-all duration-100 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: In-Depth How & Why Guidance */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Playback Controls Strip */}
            <div className="glass-badge-pill p-2.5 rounded-2xl flex items-center justify-between">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#2c231b] hover:text-[#445834] bg-white px-3 py-1.5 rounded-xl shadow-xs border border-[#ded5c7] cursor-pointer transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={restartVideo}
                  className="flex items-center gap-1 text-xs text-[#5e5043] hover:text-[#2c231b] px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1 text-xs text-[#445834] font-medium bg-[#e7eddF] px-2.5 py-1.5 rounded-xl cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#736353]" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                  <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                </button>
              </div>

            </div>

            {/* How to Practice Block */}
            <div className="bg-white/70 border border-[#e5dcce] rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#445834] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  {currentVideo.howHeadline}
                </span>
                <span className="text-[11px] text-[#736555] font-medium">{currentVideo.runtime} Daily Loop</span>
              </div>

              <div className="space-y-2 pt-1">
                {currentVideo.howSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3d3329]">
                    <span className="w-5 h-5 rounded-full bg-[#ede5d8] border border-[#d6cab8] font-semibold text-[10px] text-[#2c231a] flex items-center justify-center shrink-0 mt-0.5">
                      {step.step}
                    </span>
                    <div>
                      <strong className="text-[#1f1711] mr-1">{step.title}:</strong>
                      <span className="text-[#514539] leading-relaxed">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Works Block */}
            <div className="bg-white/70 border border-[#e5dcce] rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8c673b] flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                {currentVideo.whyHeadline}
              </span>
              <p className="text-xs text-[#4f4337] leading-relaxed">
                {currentVideo.whyText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {currentVideo.whyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#2f251d]">
                    <CheckCircle2 className="w-3 h-3 text-[#445834] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Product CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#5e5043] text-center sm:text-left">
                Paired with <strong className="text-[#1f1711]">{currentVideo.targetProduct}</strong>
              </div>

              <button
                onClick={() => {
                  setIsRitualVideoOpen(false);
                  if (videoRef.current) videoRef.current.pause();
                  openCheckoutWithProduct(currentVideo.targetProductId);
                }}
                className="glow-btn-green w-full sm:w-auto text-white font-medium text-xs sm:text-sm py-3 px-6 rounded-full cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span>Claim {currentVideo.targetProduct}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
