import React, { useState, useEffect } from "react";
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

  // Navigation menu items
  const navItems = [
    { text: "Etusivu", id: "etusivu" },
    { text: "Menu", id: "menu" },
    { text: "Varaus / Takeaway", id: "varaus-takeaway" },
    { text: "Meistä", id: "meista" },
    { text: "Yhteystiedot", id: "yhteystiedot" },
  ];

  // About us section content
  const aboutUsItems = [
    {
      question: "Rento, herkullinen ja täynnä tunnelmaa",
      answer:
        "LUNGI tuo Meksikon maun Helsinkiin – mutta ilman kiirettä. Meillä voit syödä hyvää ruokaa sohvalla istuen tai ottaa mukaan tacot työpäivän piristykseksi.",
    },
  ];

  // Detailed menu data
  const menuData = {
    burrito: {
      emoji: "🌯",
      name: "BURRITO",
      items: [
        {
          name: "FRESH CHICKEN BURRITO",
          description: "Nyhtokanaa, riisi, cheddarjuusto, salaatti, pico de gallo, sitruunamajonesi ja guacamole",
          price: "12,50€"
        },
        {
          name: "SWEET PORK BURRITO",
          description: "Possunniskaa, riisi, cheddarjuusto, salaatti, ananas, creme fraiche, salsa verde ja paprikamajonesi",
          price: "12,00€"
        },
        {
          name: "BEEFY BEEF BURRITO",
          description: "Naudanlihaa, riisi, cheddarjuusto, salaatti, sweet corn and pea, chilimajonesi",
          price: "13,50€"
        },
        {
          name: "GREEN BURRITO BURRITO",
          description: "Seitan, riisi, cheddarjuusto, salaatti, pico de gallo ja valkosipulimajonesi",
          price: "11,00€"
        },
        {
          name: "OMAVALINTA, BURRITO NYHTOKANALLA",
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
          description: "Nyhtokanaa, cheddarjuusto, pico de gallo, sitruunamajonesi ja guacamole",
          price: "12,50€"
        },
        {
          name: "SWEET PORK QUESADILLA",
          description: "Possunniska, cheddarjuusto, ananas, creme fraiche, salsa verde ja paprikamajonesi",
          price: "12,00€"
        },
        {
          name: "BEEFY BEEF QUESADILLA",
          description: "Naudanliha, cheddarjuusto, sweet corn and pea ja chilimajonesi",
          price: "13,50€"
        },
        {
          name: "GREEN QUESADILLA QUESADILLA",
          description: "Seitan, cheddarjuusto, pico de gallo ja valkosipulimajonesi",
          price: "11,00€"
        },
        {
          name: "OMAVALINTA, QUESADILLA NYHTOKANALLA",
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
          description: "Nyhtokanaa, cheddarjuusto, pico de gallo, sitruunamajonesi ja guacamole",
          price: "12,50€"
        },
        {
          name: "SWEET PORK TACO",
          description: "Possunniska, cheddarjuusto, ananas, creme fraiche, salsa verde ja paprikamajonesi",
          price: "12,00€"
        },
        {
          name: "BEEFY BEEF TACO",
          description: "Naudanliha, cheddarjuusto, sweet corn and pea, chilimajonesi",
          price: "13,50€"
        },
        {
          name: "GREEN TACO TACO",
          description: "Seitan, cheddarjuusto, pico de gallo, valkosipulimajonesi",
          price: "11,00€"
        },
        {
          name: "OMAVALINTA, TACO NYHTOKANALLA",
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
    pihvi: {
      emoji: "🥩",
      name: "PIHVI",
      items: [
        {
          name: "JAUHELIHAPIHVI",
          description: "Uunissa paistettu kanajauhelihapihvi 200g, riisillä, lohkoperunoilla tai leivälla, talon kastike, salaatti",
          price: "13,00€"
        },
        {
          name: "KANAJAUHELIHAPIHVI",
          description: "Uunissa paistettu kanajauhelihapihvi 200g, riisillä, lohkoperunoilla tai leivälla, currykastike, salaatti",
          price: "12,00€"
        },
        {
          name: "CHILI CON CARNE",
          description: "",
          price: ""
        }
      ]
    },
    dipit: {
      emoji: "🥑",
      name: "DIPIT",
      items: [
        {
          name: "CHILI",
          description: "",
          price: "1€"
        },
        {
          name: "VALKOSIPULI",
          description: "",
          price: "1€"
        },
        {
          name: "MEXICANA",
          description: "",
          price: "1€"
        },
        {
          name: "BBQ",
          description: "",
          price: "1€"
        },
        {
          name: "PAPRIKA",
          description: "",
          price: "1€"
        },
        {
          name: "GUACAMOLE",
          description: "",
          price: "1€"
        },
        {
          name: "SOUR CREAM",
          description: "",
          price: "1€"
        }
      ]
    },
    pienet: {
      emoji: "🍽️",
      name: "PIENET",
      items: [
        {
          name: "MEKSIKON MAISSI",
          description: "",
          price: "5€"
        },
        {
          name: "MEKSIKON HERNE",
          description: "",
          price: "5€"
        }
      ]
    },
    juomat: {
      emoji: "🥤",
      name: "JUOMAT",
      items: [
        {
          name: "0,5 PULLO",
          description: "",
          price: "3,50€"
        }
      ]
    },
    ateria: {
      emoji: "🍽️",
      name: "ATERIA / LISUKEET",
      items: [
        {
          name: "MAISSILASTUT JA DIPPI",
          description: "",
          price: "2,50€ (JUOMA 0,5 +1€)"
        },
        {
          name: "JALAPENO POPPERS",
          description: "",
          price: "3,50€ (JUOMA 0,5 +1€)"
        }
      ]
    }
  };

  // Food carousel images
  const foodImages = [
    {
      src: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Quesadilla",
      title: "Quesadilla"
    },
    {
      src: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Tacos standing next to each other",
      title: "Tacos"
    },
    {
      src: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Burrito filled on a plate",
      title: "Burrito"
    },
    {
      src: "https://images.pexels.com/photos/5737241/pexels-photo-5737241.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Mexican nachos",
      title: "Nachos"
    },
    {
      src: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Mexican guacamole",
      title: "Guacamole"
    }
  ];

  // Social media icons
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [foodImages.length]);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  return (
    <div className="bg-[#f6d590] min-h-screen w-full">
      
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
      {/* Header section */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-200 to-yellow-200 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/Group 7 (1).png"
                alt="Lungi Restaurant Logo"
                className="h-12 w-auto md:h-16 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Navigation Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-orange-100 to-yellow-100 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            {/* Mobile Menu Header */}
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

            {/* Mobile Navigation Items */}
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

            {/* Mobile Menu Footer */}
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
        {/* Welcome section */}
        <section id="etusivu" className="text-center py-8">
          {/* Countdown Timer */}
          <CountdownTimer />
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] mb-6 font-keynord">
            Tervetuloa LUNGIin!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#4a3c2b] mb-12 max-w-4xl mx-auto leading-relaxed">
            LUNGI tarjoaa rennon meksikolaisen ruokaelämyksen Helsingin sydämessä. 
            Tervetuloa nauttimaan tuoreista tacoista, burritoista ja muista herkuista – 
            mukavasti, mutta makua säästelemättä.
          </p>

          {/* Food Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {foodImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <img
                      className="w-full h-64 md:h-80 lg:h-96 object-cover"
                      alt={image.alt}
                      src={image.src}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-2xl md:text-3xl font-bold">{image.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stock photo disclaimer */}
            <p className="text-xs text-gray-500 text-center mt-2 opacity-70">
              *Stock images for illustration purposes
            </p>

            {/* Navigation Arrows */}
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

            {/* Dot Indicators */}
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

            {/* Thumbnail Navigation */}
            <div className="hidden md:flex justify-center gap-4 mt-8">
              {foodImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                    index === currentSlide 
                      ? 'ring-4 ring-orange-500 scale-105' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-20 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu section */}
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

        {/* Delivery Services Section */}
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
                  {/* Foodora */}
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
                        href="#"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <span>🚚</span>
                        Tilaa Foodorasta
                      </a>
                      <p className="text-sm text-gray-500 mt-3">
                        Tulossa pian!
                      </p>
                    </div>
                  </div>

                  {/* Wolt */}
                  <div className="bg-white/90 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white text-3xl font-bold">W</span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">Wolt</h4>
                      <p className="text-gray-600 mb-6">
                        Luotettava toimitus ympäri Helsinkiä
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <span>🛵</span>
                        Tilaa Woltista
                      </a>
                      <p className="text-sm text-gray-500 mt-3">
                        Tulossa pian!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
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

        {/* Varaus / Takeaway section */}
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

        {/* About us section */}
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

        {/* Decorative border */}
        <div className="w-full bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 py-4 rounded-2xl">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {['🌮', '🌯', '🌶️', '🥑', '🌮', '🌯', '🌶️'].map((emoji, index) => (
              <span key={index} className="text-2xl md:text-3xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Address and contact section */}
        <section id="yhteystiedot" className="py-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3c2b] text-center mb-12 font-keynord">
            Yhteystiedot
          </h2>

          {/* Address with Google Maps */}
          <Card className="bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl border-none shadow-xl mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Address Info */}
                <div className="text-center lg:text-left">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-500 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg">
                    <span className="text-white text-3xl md:text-4xl">📍</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Kylänvanhimmantie 29, huone 18</p>
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

                {/* Google Maps Embed */}
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

          {/* Contact information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#4b4b4b] text-center mb-6 font-keynord">
                Aukioloajat
              </h3>
              <Card className="bg-white/80 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-2 text-center">
                    <p className="text-lg md:text-xl text-[#c06806] font-medium">Ma–To: 10:00–22:00</p>
                    <p className="text-lg md:text-xl text-[#c06806] font-medium">Pe–La: 10:00–23:00</p>
                    <p className="text-lg md:text-xl text-[#c06806] font-medium">Su: 10:30–22:00</p>
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
                    <p className="text-lg md:text-xl text-[#c06806] font-medium flex items-start gap-3">
                      <span>📍</span> Kylänvanhimmantie 29, huone 18, 00640 Helsinki
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social media section */}
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

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-red-600 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
              <img
                src="/Snapchat.jpg"
                alt="LUNGI Logo"
                className="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg"
              />
            </div>
            
            {/* Social Media Links */}
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
            
            {/* Copyright */}
            <div className="text-center text-white/60 text-sm border-t border-white/20 pt-4 w-full">
              <p>&copy; 2025 LUNGI Mexican Food. Kaikki oikeudet pidätetään.</p>
            </div>
          </div>
        </div>
      </footer>
      {/* Floating Blurred Balls Background */}
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
    </div>
  );
};