import React, { useEffect, useState } from 'react';

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  direction: 'up' | 'down' | 'left' | 'right' | 'diagonal';
}

export const FloatingEmojis: React.FC = () => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const mexicanEmojis = ['🌮', '🌯', '🌶️', '🥑', '🌽', '🫔', '🧄', '🍅', '🧅', '🫘', '🥒', '🍋', '🥭', '🌵', '🎉', '🎊', '💃', '🕺', '🎵', '🎶'];

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    if (windowSize.width === 0) return;

    const generateEmojis = () => {
      const newEmojis: FloatingEmoji[] = [];
      const emojiCount = Math.min(25, Math.floor(windowSize.width / 80)); // Responsive count

      for (let i = 0; i < emojiCount; i++) {
        const directions: FloatingEmoji['direction'][] = ['up', 'down', 'left', 'right', 'diagonal'];
        
        newEmojis.push({
          id: i,
          emoji: mexicanEmojis[Math.floor(Math.random() * mexicanEmojis.length)],
          x: Math.random() * (windowSize.width - 100),
          y: Math.random() * (windowSize.height - 100),
          size: Math.random() * 30 + 20, // 20-50px
          duration: Math.random() * 15 + 10, // 10-25 seconds
          delay: Math.random() * 5, // 0-5 seconds delay
          direction: directions[Math.floor(Math.random() * directions.length)],
        });
      }

      setEmojis(newEmojis);
    };

    generateEmojis();

    // Regenerate emojis periodically
    const interval = setInterval(generateEmojis, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [windowSize]);

  const getAnimationStyle = (emoji: FloatingEmoji) => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      left: `${emoji.x}px`,
      top: `${emoji.y}px`,
      fontSize: `${emoji.size}px`,
      pointerEvents: 'none',
      zIndex: 1,
      userSelect: 'none',
      animationDuration: `${emoji.duration}s`,
      animationDelay: `${emoji.delay}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
      opacity: 0.6,
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
    };

    switch (emoji.direction) {
      case 'up':
        return {
          ...baseStyle,
          animationName: 'floatUp',
        };
      case 'down':
        return {
          ...baseStyle,
          animationName: 'floatDown',
        };
      case 'left':
        return {
          ...baseStyle,
          animationName: 'floatLeft',
        };
      case 'right':
        return {
          ...baseStyle,
          animationName: 'floatRight',
        };
      case 'diagonal':
        return {
          ...baseStyle,
          animationName: 'floatDiagonal',
        };
      default:
        return {
          ...baseStyle,
          animationName: 'floatGentle',
        };
    }
  };

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-20px) rotate(5deg) scale(1.1);
          }
          50% {
            transform: translateY(-40px) rotate(-3deg) scale(0.9);
          }
          75% {
            transform: translateY(-20px) rotate(2deg) scale(1.05);
          }
        }

        @keyframes floatDown {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(20px) rotate(-5deg) scale(1.1);
          }
          50% {
            transform: translateY(40px) rotate(3deg) scale(0.9);
          }
          75% {
            transform: translateY(20px) rotate(-2deg) scale(1.05);
          }
        }

        @keyframes floatLeft {
          0%, 100% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateX(-30px) rotate(10deg) scale(1.1);
          }
          50% {
            transform: translateX(-60px) rotate(-5deg) scale(0.9);
          }
          75% {
            transform: translateX(-30px) rotate(3deg) scale(1.05);
          }
        }

        @keyframes floatRight {
          0%, 100% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateX(30px) rotate(-10deg) scale(1.1);
          }
          50% {
            transform: translateX(60px) rotate(5deg) scale(0.9);
          }
          75% {
            transform: translateX(30px) rotate(-3deg) scale(1.05);
          }
        }

        @keyframes floatDiagonal {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(20px, -20px) rotate(15deg) scale(1.1);
          }
          50% {
            transform: translate(40px, -40px) rotate(-10deg) scale(0.9);
          }
          75% {
            transform: translate(20px, -20px) rotate(5deg) scale(1.05);
          }
        }

        @keyframes floatGentle {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(15px, -15px) rotate(8deg) scale(1.05);
          }
          66% {
            transform: translate(-15px, 15px) rotate(-8deg) scale(0.95);
          }
        }

        @media (max-width: 768px) {
          .floating-emoji {
            opacity: 0.4 !important;
            font-size: 0.8em !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-emoji {
            animation: none !important;
          }
        }
      `}</style>

      {/* Floating Emojis */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="floating-emoji"
          style={getAnimationStyle(emoji)}
          aria-hidden="true"
        >
          {emoji.emoji}
        </div>
      ))}
    </>
  );
};