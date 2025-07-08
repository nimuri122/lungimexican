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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🌮</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌯</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🌶️</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce" style={{ animationDelay: '1.5s' }}>🥑</div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Avaamme Pian!
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 mb-2">
          11. Heinäkuuta 2025, klo 10:30
        </p>
        <p className="text-lg text-gray-500 mb-12">
          Helsinki, Suomi 🇫🇮
        </p>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glowing background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Main card */}
              <div className={`relative bg-gradient-to-br ${unit.color} rounded-3xl p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                <div className="text-white">
                  <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 font-mono tracking-tight">
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-lg font-medium uppercase tracking-wider opacity-90">
                    {unit.label}
                  </div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Mitä odottaa? 🎉
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🌮</div>
              <p className="font-medium text-gray-700">Tuoreet Tacot</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🌯</div>
              <p className="font-medium text-gray-700">Herkullisia Burritoja</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎊</div>
              <p className="font-medium text-gray-700">Avajaistarjouksia</p>
            </div>
          </div>
        </div>

        {/* Pulsing notification */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium animate-pulse shadow-lg">
            <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
            Seuraa meitä sosiaalisessa mediassa päivityksistä!
          </div>
        </div>
      </div>
    </div>
  );
};