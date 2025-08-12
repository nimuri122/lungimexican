import React, { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Card, CardContent } from "../../components/ui/card";
import { CountdownTimer } from "../../components/CountdownTimer";

export const Desktop = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isPopupAnimating, setIsPopupAnimating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [copyGlow, setCopyGlow] = useState({ x: 50, y: 50, active: false });
  const [dragState, setDragState] = useState<{ dragging: boolean; startX: number; currentX: number; width: number; slideStart: number }>({
    dragging: false,
    startX: 0,
    currentX: 0,
    width: 1,
    slideStart: 0
  });
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);

  const beginDrag = (clientX: number) => {
    if (!carouselTrackRef.current) return;
    const width = carouselTrackRef.current.offsetWidth;
    setDragState({ dragging: true, startX: clientX, currentX: clientX, width, slideStart: currentSlide });
  };
  const updateDrag = (clientX: number) => {
    setDragState(prev => prev.dragging ? { ...prev, currentX: clientX } : prev);
  };
  const endDrag = () => {
    setDragState(prev => {
      if (!prev.dragging) return prev;
      const deltaX = prev.currentX - prev.startX;
      const threshold = prev.width * 0.15;
      if (deltaX > threshold && prev.slideStart > 0) {
        prev.slideStart !== currentSlide && setCurrentSlide(prev.slideStart);
        prev.slideStart > 0 && setCurrentSlide(prev.slideStart - 1);
      } else if (deltaX < -threshold && prev.slideStart < foodImages.length - 1) {
        prev.slideStart !== currentSlide && setCurrentSlide(prev.slideStart);
        prev.slideStart < foodImages.length - 1 && setCurrentSlide(prev.slideStart + 1);
      }
      return { ...prev, dragging: false };
    });
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    beginDrag(e.clientX);
  };
  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragState.dragging) return;
    updateDrag(e.clientX);
  };
  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    endDrag();
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    beginDrag(e.touches[0].clientX);
  };
  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!dragState.dragging) return;
    updateDrag(e.touches[0].clientX);
  };
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    endDrag();
  };

  const navItems = [
    { text: "Etusivu", id: "etusivu" },
    { text: "Menu", id: "menu" },
    { text: "Varaus / Takeaway", id: "varaus-takeaway" },
    { text: "Meistä", id: "meista" },
    { text: "Yhteystiedot", id: "yhteystiedot" },
  ];

  const aboutUsItems = [
    {
      question: "Rento, herkullinen ja täynnä tunnelmaa",
      answer:
        "LUNGI tuo Meksikon maun Helsinkiin – mutta ilman kiirettä. Meillä voit syödä hyvää ruokaa sohvalla istuen tai ottaa mukaan tacot työpäivän piristykseksi.",
    },
  ];

  interface MenuItem { name: string; description: string; price: string; }
  interface MenuCategory { emoji: string; name: string; items: MenuItem[]; note?: string }
  const menuData: Record<string, MenuCategory> = {
    burrito: {
      emoji: "🌯",
      name: "BURRITO",
      items: [
        {
          name: "FRESH CHICKEN BURRITO",
          description: "Nyhtökanaa, riisi, juusto, salaatti, pico de gallo, sitruunamajoneesi ja guacamole",
          price: "12,50€"
        },
        {
          name: "SWEET PORK BURRITO",
          description: "Possunniskaa, riisi, juusto, salaatti, ananas, creme fraiche, salsa verde",
          price: "12,00€"
        },
        {
          name: "BEEFY BEEF BURRITO",
          description: "Naudanlihaa, riisi, juusto, salaatti, sweet corn and bean, chilimajoneesi",
          price: "13,50€"
        },
        {
          name: "GREEN BURRITO",
          description: "Seitan, riisi, juusto, salaatti, pico de gallo ja valkosipulimajoneesi",
          price: "11,00€"
        },
        {
          name: "OMAVALINTA, BURRITO NYHTÖKANALLA",
          description: "",
          price: "12,50€"
        },
        {
          name: "OMAVALINTA, BURRITO POSSUNNISKALLA",
          description: "",
          price: "12,00€"
        },
        {
          name: "OMAVALINTA, BURRITO NAUDANLIHALLA",
          description: "",
          price: "13,50€"
        },
        {
          name: "OMAVALINTA, BURRITO SEITANILLA",
          description: "",
          price: "11,00€"
        }
      ]
    },
    quesadilla: {
      emoji: "🫔",
      name: "QUESADILLA",
      items: [
        {
          name: "FRESH CHICKEN QUESADILLA",
          description: "Nyhtökanaa, juusto, pico de gallo, sitruunamajoneesi ja guacamole",
          price: "12,50€"
        },
        {
          name: "SWEET PORK QUESADILLA",
          description: "Possunniskaa, juusto, ananas, creme fraiche, salsa verde",
          price: "12,00€"
        },
        {
          name: "BEEFY BEEF QUESADILLA",
          description: "Naudanlihaa, juusto, sweet corn and bean ja chilimajoneesi",
          price: "13,50€"
        },
        {
          name: "GREEN QUESADILLA",
          description: "Seitan, juusto, pico de gallo ja valkosipulimajoneesi",
          price: "11,00€"
        },
        {
          name: "OMAVALINTA, QUESADILLA NYHTÖKANALLA",
          description: "",
          price: "12,50€"
        },
        {
          name: "OMAVALINTA, QUESADILLA POSSUNNISKALLA",
          description: "",
          price: "12,00€"
        },
        {
          name: "OMAVALINTA, QUESADILLA NAUDANLIHALLA",
          description: "",
          price: "13,50€"
        },
        {
          name: "OMAVALINTA, QUESADILLA SEITANILLA",
          description: "",
          price: "11,00€"
        }
      ]
    },
    taco: {
      emoji: "🌮",
      name: "TACO",
      items: [
        {
          name: "FRESH CHICKEN TACO",
          description: "Nyhtökanaa, juusto, pico de gallo, sitruunamajoneesi ja guacamole",
          price: "12,50€"
        },
        {
          name: "SWEET PORK TACO",
          description: "Possunniskaa, juusto, ananas, creme fraiche, salsa verde",
          price: "12,00€"
        },
        {
          name: "BEEFY BEEF TACO",
          description: "Naudanlihaa, juusto, sweet corn and bean, chilimajoneesi",
          price: "13,50€"
        },
        {
          name: "GREEN TACO",
          description: "Seitan, juusto, pico de gallo, valkosipulimajoneesi",
          price: "11,00€"
        },
        {
          name: "OMAVALINTA, TACO NYHTÖKANALLA",
          description: "",
          price: "12,50€"
        },
        {
          name: "OMAVALINTA, TACO POSSUNNISKALLA",
          description: "",
          price: "12,00€"
        },
        {
          name: "OMAVALINTA, TACO NAUDANLIHALLA",
          description: "",
          price: "13,50€"
        },
        {
          name: "OMAVALINTA, TACO SEITANILLA",
          description: "",
          price: "11,00€"
        }
      ],
      note: "SISÄLTÄÄ 3 TACOA JA MAISSIN"
    },
    naposteltavat: {
      emoji: "🍟",
      name: "Naposteltavat",
      items: [
        {
          name: "MAISSILASTUT JA DIPPI",
          description: "",
          price: "2,50€"
        },
        {
          name: "JALAPENO POPPERS",
          description: "",
          price: "3,50€"
        }
      ]
    },
    juomat: {
      emoji: "🥤",
      name: "JUOMAT",
      items: [
        {
          name: "0,5L LIMU",
          description: "",
          price: "3,50€"
        },
        {
          name: "0,5L VESI",
          description: "",
          price: "2,00€"
        }
      ]
    },
    dipit: {
      emoji: "🥑",
      name: "DIPIT",
      items: [
        { name: "CHILI", description: "", price: "1€" },
        { name: "VALKOSIPULI", description: "", price: "1€" },
        { name: "CHIPOTLE", description: "", price: "1€" },
        { name: "BBQ", description: "", price: "1€" },
        { name: "PAPRIKA", description: "", price: "1€" },
        { name: "GUACAMOLE", description: "", price: "1€" },
        { name: "SOUR CREAM", description: "", price: "1€" },
      ]
    },
    pienet: {
      emoji: "🍽️",
      name: "PIENET",
      items: [
        { name: "MEKSIKON MAISSI", description: "", price: "5€" }
      ]
    }
  };

  const foodImages = [
    {
      src: "/Food%20Image.png",
      alt: "Lungi annos 1",
      title: "Lungi Annos 1",
      gradient: "from-orange-50 via-amber-50 to-rose-50"
    },
    {
      src: "/Food%20Image%20(1).png",
      alt: "Lungi annos 2",
      title: "Lungi Annos 2",
      gradient: "from-rose-50 via-orange-50 to-yellow-50"
    },
    {
      src: "/Food%20Image%20(2).png",
      alt: "Lungi annos 3",
      title: "Lungi Annos 3",
      gradient: "from-yellow-50 via-orange-50 to-amber-100"
    },
    {
      src: "/Food%20Image%20(3).png",
      alt: "Lungi annos 4",
      title: "Lungi Annos 4",
      gradient: "from-amber-50 via-rose-50 to-orange-50"
    }
  ];

  const socialIcons = [
    { 
      name: "Instagram", 
      emoji: "📷", 
      url: "https://www.instagram.com/lungimexicanfood/",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: "TikTok", 
      emoji: "🎵", 
      url: "https://www.tiktok.com/@lungimexicanfood",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [foodImages.length]);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % foodImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + foodImages.length) % foodImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  const openContactPopup = () => {
    setShowContactPopup(true);
  setIsPopupAnimating(false);
  };

  const closeContactPopup = () => {
    setIsPopupAnimating(false);
    setTimeout(() => {
      setShowContactPopup(false);
  }, 300);
  };

  useEffect(() => {
    if (showContactPopup) {
      setTimeout(() => {
        setIsPopupAnimating(true);
      }, 10);
    }
  }, [showContactPopup]);

  return (
    <React.Fragment>
  <div className="bg-[#f6d590] min-h-screen w-full overflow-x-hidden">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f6d590] transition-opacity duration-500 ease-out opacity-100">
          <div className="text-center">
            <img
              src="/Group 7 (1).png"
              alt="Lungi Restaurant Logo"
              className="h-32 w-auto mx-auto mb-8 animate-pulse"
            />
            <div className="w-16 h-16 border-4 border-t-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-200 to-yellow-200 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/Group 7 (1).png"
                alt="Lungi Restaurant Logo"
                className="h-12 w-auto md:h-16 object-contain"
              />
            </div>

            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={`nav-${index}`}
                  className="text-[#353535] text-lg font-medium hover:text-orange-600 cursor-pointer transition-colors duration-200"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.text}
                </button>
              ))}
            </nav>

            <button 
              className="lg:hidden bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'
                  }`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'mb-1'
                  }`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div 
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeMobileMenu}
        />

        <div 
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-orange-100 to-yellow-100 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img
                  src="/Group 7 (1).png"
                  alt="Lungi Restaurant Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button 
                onClick={closeMobileMenu}
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                aria-label="Close mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={`mobile-nav-${index}`}
                  className="block w-full text-left px-4 py-3 text-lg font-medium text-[#353535] hover:text-orange-600 hover:bg-white/50 rounded-lg transition-all duration-200"
                  onClick={() => {
                    scrollToSection(item.id);
                    closeMobileMenu();
                  }}
                >
                  {item.text}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-orange-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Seuraa meitä:</p>
                <div className="flex justify-center gap-3">
                  {socialIcons.map((icon, index) => (
                    <a
                      key={`mobile-social-${index}`}
                      href={icon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-orange-500 rounded-full shadow-md hover:bg-orange-600 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white p-2"
                    >
                      <div className="w-full h-full">
                        {icon.icon}
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">@lungiravintola</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 space-y-16 pb-16">
        <section id="etusivu" className="text-center py-8">
          <CountdownTimer />
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] mb-6 font-keynord">
            Tervetuloa LUNGIin!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#4a3c2b] mb-12 max-w-4xl mx-auto leading-relaxed">
            LUNGI tarjoaa rennon meksikolaisen ruokaelämyksen Helsingin sydämessä. 
            Tervetuloa nauttimaan tuoreista tacoista, burritoista ja muista herkuista – 
            mukavasti, mutta makua säästelemättä.
          </p>

          <div className="relative max-w-5xl mx-auto py-4 overflow-hidden">
            <div
              className="absolute inset-x-0 md:-inset-x-64 -inset-y-24 -z-10 opacity-80 pointer-events-none
              [mask-image:radial-gradient(circle_at_center,black_0%,black_55%,rgba(0,0,0,0.85)_70%,transparent_96%)]
              bg-[radial-gradient(circle_at_32%_34%,rgba(255,195,120,0.30),transparent_62%),
                  radial-gradient(circle_at_70%_66%,rgba(255,150,60,0.22),transparent_68%),
                  linear-gradient(to_bottom,rgba(255,246,232,0.85),rgba(255,255,255,0.95))]" />
            <div className="overflow-hidden select-none">
              <div
                ref={carouselTrackRef}
                className={`flex transition-transform ${dragState.dragging ? 'duration-0' : 'duration-500'} ease-in-out cursor-${dragState.dragging ? 'grabbing' : 'grab'}`}
                style={{
                  transform: (() => {
                    const base = -currentSlide * 100;
                    if (!dragState.dragging) return `translateX(${base}%)`;
                    const deltaPx = dragState.currentX - dragState.startX;
                    let effectiveDelta = deltaPx;
                    if ((dragState.slideStart === 0 && deltaPx > 0) || (dragState.slideStart === foodImages.length - 1 && deltaPx < 0)) {
                      effectiveDelta = deltaPx * 0.35;
                    }
                    const deltaPercent = (effectiveDelta / dragState.width) * 100;
                    return `translateX(${base + deltaPercent}%)`;
                  })()
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {foodImages.map((image, index) => (
                  <div
                    key={index}
                    aria-label={image.title}
                    className={`w-full flex-shrink-0 relative flex items-center justify-center group py-6 px-2`}
                  >
                    <div className="relative w-full h-[22rem] md:h-[26rem] lg:h-[32rem] flex items-center justify-center overflow-hidden rounded-[2.5rem]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} opacity-60`} />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%)] mix-blend-overlay" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,170,0,0.18),transparent_70%)]" />
                      <div className="absolute -left-12 top-12 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl animate-float-soft" />
                      <div className="absolute -right-10 bottom-10 w-60 h-60 rounded-full bg-rose-300/25 blur-3xl animate-float-soft [animation-delay:2.8s]" />
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="relative z-10 max-h-full w-auto object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.26,1)] group-hover:scale-[1.055] select-none pointer-events-none animate-float-soft"
                        draggable={false}
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,200,120,0.28),transparent_70%)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-orange-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-orange-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {foodImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-orange-600 scale-125' 
                      : 'bg-orange-300 hover:bg-orange-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="hidden md:flex justify-center gap-4 mt-8">
              {foodImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 bg-white/40 backdrop-blur-sm shadow-inner px-1 pt-1 pb-2 flex items-center justify-center ${
                    index === currentSlide 
                      ? 'scale-110 shadow-[0_0_0_3px_rgba(255,140,0,0.4),0_8px_18px_-4px_rgba(0,0,0,0.25)]' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-20 h-16 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                  />
                  {index === currentSlide && (
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.25),transparent_70%)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="py-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] text-center mb-12 font-keynord">
            Menu
          </h2>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  {Object.entries(menuData).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="bg-white/90 rounded-2xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => toggleCategory(categoryKey)}
                        className="w-full p-6 flex items-center justify-between hover:bg-orange-50 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{category.emoji}</span>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">{category.name}</h3>
                        </div>
                        <svg 
                          className={`w-6 h-6 text-orange-600 transition-all duration-500 ease-in-out ${
                            expandedCategory === categoryKey ? 'rotate-180 scale-110' : 'group-hover:scale-110'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          expandedCategory === categoryKey 
                            ? 'max-h-[2000px] opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 border-t border-orange-100">
                          <div className="space-y-4 mt-4">
                            {category.items.map((item, index) => (
                              <div 
                                key={index} 
                                className={`flex justify-between items-start gap-4 p-4 bg-orange-50/50 rounded-lg transform transition-all duration-300 ${
                                  expandedCategory === categoryKey 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-4 opacity-0'
                                }`}
                                style={{ 
                                  transitionDelay: expandedCategory === categoryKey ? `${index * 50}ms` : '0ms' 
                                }}
                              >
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
                                  {item.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <div className="text-lg font-bold text-orange-600 whitespace-nowrap">
                                    {item.price}
                                  </div>
                                )}
                              </div>
                            ))}
                            {category.note && (
                              <div 
                                className={`mt-4 p-3 bg-orange-100 rounded-lg transform transition-all duration-300 ${
                                  expandedCategory === categoryKey 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-4 opacity-0'
                                }`}
                                style={{ 
                                  transitionDelay: expandedCategory === categoryKey ? `${category.items.length * 50}ms` : '0ms' 
                                }}
                              >
                                <p className="text-sm font-medium text-orange-800 text-center">{category.note}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="py-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] text-center mb-12 font-keynord">
            Tilaa kotiin
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Nauti LUNGI-makuja kotona!
                  </h3>
                  <p className="text-lg text-gray-600">
                    Tilaa suosikkiannoksesi suoraan kotiovellesi
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/90 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white text-3xl font-bold">F</span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">Foodora</h4>
                      <p className="text-gray-600 mb-6">
                        Nopea toimitus suoraan kotiovellesi
                      </p>
                      <a
                        href="https://www.foodora.fi/restaurant/ojth/lungi-mexican-food"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <span>🚚</span>
                        Tilaa Foodorasta
                      </a>
                    </div>
                  </div>

                  
                  <div className="relative flex justify-center">
                    <div className="w-[320px] md:w-[340px] lg:w-[360px] bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-cyan-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/10 overflow-hidden flex flex-col items-center">
                      
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />
                      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl" />
                      <div className="text-center relative z-10 w-full">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg ring-2 ring-white/10">
                          <span className="text-white text-2xl font-extrabold tracking-wide">W</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-4 leading-tight">Wolt</h4>
                        <p className="text-blue-100/90 mb-6 font-medium">
                          Luotettava toimitus ympäri Helsinkiä
                        </p>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-7 py-3 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
                        >
                          <span>🛵</span>
                          Tilaa Woltista
                        </a>
                        <p className="text-xs text-blue-100/70 mt-3 tracking-wide uppercase">
                          Tulossa pian
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="bg-orange-100 rounded-2xl p-6">
                    <p className="text-lg text-orange-800 font-medium mb-2">
                      🕐 Toimitusajat: Ma–Su 11:00–21:30
                    </p>
                    <p className="text-gray-600">
                      Seuraa sivujamme saadaksesi tiedon, kun kotiinkuljetus alkaa!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="varaus-takeaway" className="py-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] text-center mb-12 font-keynord">
            Varaus / Takeaway
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl border-none shadow-xl">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Tee pöytävaraus tai tilaa mukaan!
                </h3>
                <div className="bg-white/80 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-3xl">📞</span>
                    <a 
                      href="tel:+358458454258" 
                      className="text-2xl md:text-3xl font-bold text-orange-600 hover:text-orange-700 transition-colors duration-200"
                    >
                      +358 45 845 4258
                    </a>
                  </div>
                  <p className="text-lg text-gray-600">
                    Soita meille ja kerro toiveesi!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="meista" className="py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] text-center mb-12 font-keynord">
              Meistä
            </h2>

            <div className="relative">
              <Card className="bg-[#c068069e] rounded-3xl border-none shadow-xl">
                <CardContent className="p-6 md:p-8 lg:p-12">
                  <div className="space-y-6 md:space-y-8">
                    {aboutUsItems.map((item, index) => (
                      <div key={`about-${index}`} className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#353535] mb-6">
                          {item.question}
                        </h3>
                        <p className="text-lg md:text-xl text-white leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rotate-3 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-base lg:text-lg">LUNGI</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 py-4 rounded-2xl">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {['🌮', '🌯', '🌶️', '🥑', '🌮', '🌯', '🌶️'].map((emoji, index) => (
              <span key={index} className="text-2xl md:text-3xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        </div>

        <section id="yhteystiedot" className="py-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] text-center mb-12 font-keynord">
            Yhteystiedot
          </h2>

          <Card className="bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl border-none shadow-xl mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-500 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg">
                    <span className="text-white text-3xl md:text-4xl">📍</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Kylänvanhimmantie 29</p>
                  <p className="text-lg md:text-xl text-gray-600 mb-4">00640 Helsinki</p>
                  <a 
                    href="https://maps.google.com/?q=Kylänvanhimmantie+29,+00640+Helsinki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors duration-200"
                  >
                    <span>🗺️</span>
                    Avaa Google Mapsissa
                  </a>
                </div>

                <div className="w-full">
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240.43448228745436!2d24.963357916312553!3d60.22850733840459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469209dc3f356df9%3A0xf8227c4264ad16cd!2sLungiMexicanFood!5e1!3m2!1sen!2sfi!4v1751741732448!5m2!1sen!2sfi"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="LUNGI Restaurant Location"
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#4b4b4b] text-center mb-6 font-keynord">
                Aukioloajat
              </h3>
              <Card className="bg-white/80 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-2 text-center">
                    <p className="text-lg md:text-xl text-[#c06806] font-medium">Ma–Pe: 10:30–21:00</p>
                    <p className="text-lg md:text-xl text-[#c06806] font-medium">La: 11:00–22:00</p>
                    <p className="text-lg md:text-xl text-[#c06806] font-medium">Su: 11:00–21:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#4b4b4b] text-center mb-6 font-keynord">
                Ota yhteyttä
              </h3>
              <Card className="bg-white/80 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-lg md:text-xl text-[#c06806] font-medium flex items-center gap-3">
                      <span>📞</span> 
                      <a href="tel:+358458454258" className="hover:text-orange-700 transition-colors duration-200">
                        +358 45 845 4258
                      </a>
                    </p>
                    <p className="text-lg md:text-xl text-[#c06806] font-medium flex items-center gap-3">
                      <span>✉️</span>
                      <a href="mailto:Lungimexcianfood@gmail.com" className="hover:text-orange-700 transition-colors duration-200">
                        Lungimexcianfood@gmail.com
                      </a>
                    </p>
                    <p className="text-lg md:text-xl text-[#c06806] font-medium flex items-start gap-3">
                      <span>📍</span> Kylänvanhimmantie 29, 00640 Helsinki
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-8 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] mb-8">
            Seuraa meitä somessa!
          </h2>

          <div className="flex justify-center gap-6 md:gap-8 mb-6">
            {socialIcons.map((icon, index) => (
              <a
                key={`social-${index}`}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group text-white p-3 md:p-4"
                aria-label={`Follow us on ${icon.name}`}
              >
                <div className="w-full h-full group-hover:animate-bounce">
                  {icon.icon}
                </div>
              </a>
            ))}
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl text-black font-medium">
            @lungimexicanfood
          </p>
        </section>
      </div>

      <footer className="bg-gradient-to-r from-orange-600 to-red-600 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/Snapchat.jpg"
                alt="LUNGI Logo"
                className="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg"
              />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-white text-lg font-medium">Seuraa meitä:</h3>
              <div className="flex gap-4">
                {socialIcons.map((icon, index) => (
                  <a
                    key={`footer-social-${index}`}
                    href={icon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white group p-2"
                    aria-label={`Follow us on ${icon.name}`}
                  >
                    <div className="w-full h-full group-hover:animate-pulse">
                      {icon.icon}
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-white/80 text-sm">@lungimexicanfood</p>
            </div>
            
            <div className="text-center text-white/60 text-sm border-t border-white/20 pt-4 w-full">
              <p>&copy; 2025 LUNGI Mexican Food. Kaikki oikeudet pidätetään.</p>
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={openContactPopup}
                  className="group bg-white/15 hover:bg-white/25 text-white px-5 py-2 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-1 group-hover:rotate-12 transition-transform">⚡</span>
                  <span className="hidden sm:inline">Want a website like this?</span>
                  <span className="sm:hidden">Need a site?</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-lg animate-float glowing-blob"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              '--tw-float-x-25': `${Math.random() * 100 - 50}px`,
              '--tw-float-y-25': `${Math.random() * 100 - 50}px`,
              '--tw-float-x-50': `${Math.random() * 100 - 50}px`,
              '--tw-float-y-50': `${Math.random() * 100 - 50}px`,
              '--tw-float-x-75': `${Math.random() * 100 - 50}px`,
              '--tw-float-y-75': `${Math.random() * 100 - 50}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {showContactPopup && (
        <div
          className={`fixed inset-0 z-[9999] flex items-end md:items-center justify-center px-4 pb-8 md:p-4 transition-all duration-300 ease-out ${
            isPopupAnimating ? 'bg-black/40 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'
          }`}
          onClick={closeContactPopup}
          role="dialog"
          aria-modal="true"
          aria-label="Website inquiry form"
        >
          <div
            className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out ${
              isPopupAnimating
                ? 'translate-y-0 md:scale-100 opacity-100 blur-none'
                : 'translate-y-8 md:scale-95 opacity-0 blur-sm'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden p-5 text-white bg-gradient-to-br from-orange-500 via-red-500 to-amber-500">
              <div className="absolute -inset-8 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
              <div className="flex items-start gap-3 relative z-10">
                <div className="text-3xl leading-none animate-bounce drop-shadow">🚀</div>
                <div className="pr-8">
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-sm">Want a Website Like This?</h3>
                  <p className="text-orange-50/90 text-[13px] font-medium mt-0.5">
                    Modern • Fast • Conversion Focused
                  </p>
                </div>
              </div>
              <div className="h-0.5 mt-4 bg-gradient-to-r from-white/40 via-white/10 to-transparent rounded-full relative z-10" />
              <button
                onClick={closeContactPopup}
                aria-label="Close popup"
                className="absolute top-3 right-3 w-8 h-8 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-5 bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-md">
              <p className="text-gray-700 text-sm leading-relaxed text-center font-medium">
                We craft high‑performance, design‑driven websites that convert visitors into customers.
              </p>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                  <div className="flex items-center gap-1.5 bg-orange-50/80 border border-orange-100 rounded-md px-2 py-1 shadow-sm">
                    <span className="text-[14px]">⚡</span> Fast Load
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50/80 border border-orange-100 rounded-md px-2 py-1 shadow-sm">
                    <span className="text-[14px]">📱</span> Mobile First
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50/80 border border-orange-100 rounded-md px-2 py-1 shadow-sm">
                    <span className="text-[14px]">🧭</span> SEO Ready
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50/80 border border-orange-100 rounded-md px-2 py-1 shadow-sm">
                    <span className="text-[14px]">🛠️</span> Easy Edits
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50/80 border border-orange-100 rounded-md px-2 py-1 shadow-sm col-span-2">
                    <span className="text-[14px]">🎨</span> Fully Custom Design To Your Brand & Needs
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50/80 border border-orange-100 rounded-md px-2 py-1 shadow-sm col-span-2">
                    <span className="text-[14px]">📈</span> Optimized for Local Discovery
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('contact@titledcreations.tech').then(() => {
                      setCopyFeedback(true);
                      setTimeout(() => setCopyFeedback(false), 2000);
                    });
                  }}
                  onMouseEnter={() => setCopyGlow(g => ({ ...g, active: true }))}
                  onMouseLeave={() => setCopyGlow(g => ({ ...g, active: false }))}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    setCopyGlow(g => ({ ...g, x, y }));
                  }}
                  className={`relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm md:text-base font-semibold text-white transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg overflow-hidden group ${copyFeedback ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 hover:brightness-110'}`}
                  aria-live="polite"
                >
                  <span
                    className={`pointer-events-none absolute -inset-px transition-opacity duration-500 mix-blend-screen`}
                    style={{
                      background: `radial-gradient(circle at ${copyGlow.x}% ${copyGlow.y}%, rgba(255,255,255,0.55), rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 70%)`,
                      opacity: copyGlow.active ? 1 : 0,
                    }}
                  />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="relative text-base drop-shadow">{copyFeedback ? '✅' : '📋'}</span>
                  <span className="relative tracking-wide drop-shadow-sm">
                    {copyFeedback ? 'Copied to Clipboard!' : 'Copy Email'}
                  </span>
                </button>
                <p className="text-sm md:text-base font-semibold text-gray-700 text-center select-all">contact@titledcreations.tech</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Analytics />
    <SpeedInsights />
  </React.Fragment>
  );
};