import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOpening, setIsOpening] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Features to cycle through on mobile
  const features = [
    { emoji: '🌮', text: 'Tuoreet Tacot' },
    { emoji: '🌯', text: 'Herkullisia Burritoja' },
    { emoji: '🎊', text: 'Avajaistarjouksia' },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-cycle features on mobile
  useEffect(() => {
    if (isMobile) {
      const featureTimer = setInterval(() => {
        setIsTransitioning(true);
        
        // After fade out animation, change the feature
        setTimeout(() => {
          setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
          setIsTransitioning(false);
        }, 300); // Half of transition duration
        
      }, 3000); // Change every 3 seconds (increased for better readability)

      return () => clearInterval(featureTimer);
    }
  }, [isMobile, features.length]);

  useEffect(() => {
    // Target date: July 11, 2025, 10:30 Helsinki time (UTC+2 in summer)
    const targetDate = new Date('2025-07-11T10:30:00+03:00'); // Helsinki summer time is UTC+3

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsOpening(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsOpening(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Päivää', value: timeLeft.days, color: 'from-red-500 to-orange-500' },
    { label: 'Tuntia', value: timeLeft.hours, color: 'from-orange-500 to-yellow-500' },
    { label: 'Minuuttia', value: timeLeft.minutes, color: 'from-yellow-500 to-green-500' },
    { label: 'Sekuntia', value: timeLeft.seconds, color: 'from-green-500 to-blue-500' },
  ];

  if (isOpening) {
    return (
      <div className="text-center py-16">
        <div className="relative">
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-pulse mb-8">
            OLEMME AUKI!
          </h2>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 blur-3xl opacity-30 animate-pulse"></div>
        </div>
        <p className="text-2xl md:text-3xl text-gray-700 font-medium">
          Tervetuloa nauttimaan herkullisista meksikolaisista makuelämyksistä! 🌮
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🌮</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌯</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🌶️</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🥑</div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-[#4a3c2b] mb-4 drop-shadow-lg font-sans">
          Avaamme Pian!
        </h2>
        <p className="text-xl md:text-2xl text-[#4a3c2b] mb-2 drop-shadow-md font-sans">
          11. Heinäkuuta 2025, klo 10:30
        </p>
        <p className="text-lg text-[#4a3c2b] mb-12 drop-shadow-md opacity-90 font-sans">
          Helsinki, Suomi 🇫🇮
        </p>

        {/* Countdown Display */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-6xl mx-auto mb-12">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative group text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number */}
              <div className="relative text-6xl md:text-8xl lg:text-9xl font-bold text-[#4a3c2b] mb-2 font-sans tracking-tight drop-shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden">
                <span className="relative inline-block">
                  <span className="relative z-10">{unit.value.toString().padStart(2, '0')}</span>
                  {/* Moving lighting gradient - only visible within text */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-200%] animate-shine bg-clip-text text-transparent mix-blend-overlay"></span>
                </span>
              </div>
              {/* Label */}
              <div className="relative text-lg md:text-xl font-medium uppercase tracking-wider text-[#4a3c2b] opacity-80 drop-shadow-lg font-sans">
                <span className="relative inline-block">
                  <span className="relative z-10">{unit.label}</span>
                  {/* Moving lighting gradient for labels - only visible within text */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-200%] animate-shine-slow bg-clip-text text-transparent mix-blend-overlay"></span>
                </span>
              </div>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <div className="w-full h-full bg-gradient-to-r from-orange-300 to-yellow-300 blur-2xl rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#4a3c2b] to-transparent mx-auto mb-8 opacity-60"></div>

        {/* Additional info */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-[#4a3c2b] mb-6 drop-shadow-lg font-sans">
            Mitä odottaa? 🎉
          </h3>
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-8 shadow-xl border-none">
            {isMobile ? (
              // Mobile: Single feature that auto-cycles
              <div className="text-center relative overflow-hidden">
                {/* Background slide animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 opacity-30 transform transition-transform duration-700 ease-in-out"
                     style={{ 
                       transform: `translateX(${isTransitioning ? '100%' : '0%'})` 
                     }}
                />
                
                <div className="group">
                  <div className={`text-6xl mb-4 transform transition-all duration-600 ease-in-out ${
                    isTransitioning 
                      ? 'scale-75 opacity-0 rotate-12 translate-y-4' 
                      : 'scale-100 opacity-100 rotate-0 translate-y-0 animate-pulse'
                  }`}>
                    {features[currentFeatureIndex].emoji}
                  </div>
                  <p className={`font-bold text-xl text-[#4a3c2b] drop-shadow-sm font-sans transition-all duration-600 ease-in-out ${
                    isTransitioning 
                      ? 'opacity-0 translate-x-8 blur-sm' 
                      : 'opacity-100 translate-x-0 blur-0'
                  }`}>
                    {features[currentFeatureIndex].text}
                  </p>
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-6">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${
                        index === currentFeatureIndex 
                          ? 'bg-[#4a3c2b] scale-125 shadow-lg' 
                          : 'bg-[#4a3c2b]/30 scale-100'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                  ))}
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 w-full bg-[#4a3c2b]/20 rounded-full h-1 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4a3c2b] to-orange-500 rounded-full transition-all duration-75 ease-linear"
                    style={{
                      width: isTransitioning ? '100%' : '0%',
                      animation: isTransitioning ? 'none' : 'progress 3000ms linear infinite'
                    }}
                  />
                </div>
              </div>
            ) : (
              // Desktop: All features visible
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="group">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🌮</div>
                  <p className="font-medium text-[#4a3c2b] drop-shadow-sm font-sans">Tuoreet Tacot</p>
                </div>
                <div className="group">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🌯</div>
                  <p className="font-medium text-[#4a3c2b] drop-shadow-sm font-sans">Herkullisia Burritoja</p>
                </div>
                <div className="group">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🎊</div>
                  <p className="font-medium text-[#4a3c2b] drop-shadow-sm font-sans">Avajaistarjouksia</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pulsing notification */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-3 text-[#4a3c2b] font-medium animate-pulse drop-shadow-lg font-sans">
            <span className="w-3 h-3 bg-[#4a3c2b] rounded-full animate-ping opacity-75"></span>
            <span className="text-lg font-sans">Seuraa meitä sosiaalisessa mediassa päivityksistä!</span>
          </div>
        </div>
      </div>
    </div>
  );
};