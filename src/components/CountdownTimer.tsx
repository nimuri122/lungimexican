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
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🌮</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌯</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🌶️</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🥑</div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-[#f5f5dc] mb-4 drop-shadow-lg">
          Avaamme Pian!
        </h2>
        <p className="text-xl md:text-2xl text-[#f5f5dc] mb-2 drop-shadow-md">
          11. Heinäkuuta 2025, klo 10:30
        </p>
        <p className="text-lg text-[#f5f5dc] mb-12 drop-shadow-md opacity-90">
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
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#f5f5dc] mb-2 font-mono tracking-tight drop-shadow-2xl transform hover:scale-110 transition-all duration-300">
                {unit.value.toString().padStart(2, '0')}
              </div>
              {/* Label */}
              <div className="text-lg md:text-xl font-medium uppercase tracking-wider text-[#f5f5dc] opacity-80 drop-shadow-lg">
                {unit.label}
              </div>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <div className="w-full h-full bg-gradient-to-r from-orange-300 to-yellow-300 blur-2xl rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#f5f5dc] to-transparent mx-auto mb-8 opacity-60"></div>

        {/* Additional info */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-[#f5f5dc] mb-6 drop-shadow-lg">
            Mitä odottaa? 🎉
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="group">
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🌮</div>
              <p className="font-medium text-[#f5f5dc] drop-shadow-md">Tuoreet Tacot</p>
            </div>
            <div className="group">
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🌯</div>
              <p className="font-medium text-[#f5f5dc] drop-shadow-md">Herkullisia Burritoja</p>
            </div>
            <div className="group">
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🎊</div>
              <p className="font-medium text-[#f5f5dc] drop-shadow-md">Avajaistarjouksia</p>
            </div>
          </div>
        </div>

        {/* Pulsing notification */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-3 text-[#f5f5dc] font-medium animate-pulse drop-shadow-lg">
            <span className="w-3 h-3 bg-[#f5f5dc] rounded-full animate-ping opacity-75"></span>
            <span className="text-lg">Seuraa meitä sosiaalisessa mediassa päivityksistä!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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