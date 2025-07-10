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
      {/* Jumping Emojis around the sides */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Left side emojis */}
        <div className="absolute left-4 top-20 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🌮</div>
        <div className="absolute left-8 top-40 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌯</div>
        <div className="absolute left-2 top-60 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🌶️</div>
        <div className="absolute left-6 top-80 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🥑</div>
        <div className="absolute left-4 bottom-80 text-3xl animate-bounce" style={{ animationDelay: '2s' }}>🌽</div>
        <div className="absolute left-8 bottom-60 text-4xl animate-bounce" style={{ animationDelay: '2.5s' }}>🫔</div>
        <div className="absolute left-2 bottom-40 text-3xl animate-bounce" style={{ animationDelay: '3s' }}>🧄</div>
        <div className="absolute left-6 bottom-20 text-4xl animate-bounce" style={{ animationDelay: '3.5s' }}>🍅</div>

        {/* Right side emojis */}
        <div className="absolute right-4 top-20 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌮</div>
        <div className="absolute right-8 top-40 text-3xl animate-bounce" style={{ animationDelay: '0.7s' }}>🌯</div>
        <div className="absolute right-2 top-60 text-3xl animate-bounce" style={{ animationDelay: '1.2s' }}>🌶️</div>
        <div className="absolute right-6 top-80 text-4xl animate-bounce" style={{ animationDelay: '1.7s' }}>🥑</div>
        <div className="absolute right-4 bottom-80 text-3xl animate-bounce" style={{ animationDelay: '2.2s' }}>🌽</div>
        <div className="absolute right-8 bottom-60 text-4xl animate-bounce" style={{ animationDelay: '2.7s' }}>🫔</div>
        <div className="absolute right-2 bottom-40 text-3xl animate-bounce" style={{ animationDelay: '3.2s' }}>🧄</div>
        <div className="absolute right-6 bottom-20 text-4xl animate-bounce" style={{ animationDelay: '3.7s' }}>🍅</div>
      </div>
    </div>
  );
};