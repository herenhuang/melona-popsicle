import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface Track {
  title: string;
  url: string;
}

const tracks: Track[] = [
  {
    title: "Strutting on the runway, trash bags in my eyes",
    url: "/images/baggy/strutting on the runway, trash bags in my eyes.mp3"
  },
  {
    title: "Taste can't be bought, it is priceless",
    url: "/images/baggy/taste can't be bought, it is priceless.mp3"
  },
  {
    title: "We're all trying our best here",
    url: "/images/baggy/we're all trying our best here.mp3"
  }
];

export const BaggyMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Reset audio and load new track when changing tracks
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsLoaded(false);
      
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing track:', err));
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playNextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    } else {
      setCurrentTrackIndex(0); // Loop back to the first track
    }
  };

  const playPreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
    } else {
      setCurrentTrackIndex(tracks.length - 1); // Go to the last track
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    // Play next track or stop if it's the last one
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className="fixed left-0 right-0 z-50 px-4 bg-white/95 backdrop-blur-sm border-t border-black/10"
      style={{ 
        bottom: '0', 
        position: 'fixed',
        paddingTop: '0.75rem',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
        marginBottom: '0',
        transform: 'translateY(0)',
        willChange: 'transform'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Previous Track Button (Desktop only) */}
        <div className="flex items-center gap-1">
          <button
            onClick={playPreviousTrack}
            className="hidden md:flex w-8 h-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Previous track"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          
          {/* Next Track Button (Desktop only) */}
          <button
            onClick={playNextTrack}
            className="hidden md:flex w-8 h-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Track Info & Progress */}
        <div className="flex-1 min-w-0">
          {/* Track Title */}
          <div className="text-xs font-light tracking-wider truncate mb-1">
            {tracks[currentTrackIndex].title}
          </div>

          {/* Progress Bar */}
          <div 
            ref={progressBarRef}
            className="h-1 bg-black/10 rounded-full cursor-pointer relative"
            onClick={handleProgressBarClick}
          >
            <div 
              className="absolute h-full bg-black rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between text-[10px] text-black/60 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{isLoaded ? formatTime(duration) : '--:--'}</span>
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={playPreviousTrack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Previous track"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={playNextTrack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume Control (Desktop only) */}
        <div className="hidden md:flex items-center gap-2 min-w-[120px]">
          <button
            onClick={toggleMute}
            className="p-1 hover:bg-black/5 rounded transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 appearance-none bg-black/10 rounded-full cursor-pointer"
          />
        </div>

        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex].url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}; 