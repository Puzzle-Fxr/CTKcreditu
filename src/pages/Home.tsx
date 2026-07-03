import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, Phone, Mail, MapPin, Clock, ChevronRight, ChevronLeft,
  Building2, Users, Shield, TrendingUp, Award, Heart,
  Linkedin, Twitter, Facebook, BanknoteArrowUp, 
  BanknoteArrowDown, Handshake, HandCoins 
} from 'lucide-react';

{/* TypeScript Interfaces */}
// TypeScript Interface for Executives
interface Executive {
  image: string;
  name: string;
  title: string;
  bio: string;
}

export const ExecutiveCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeExecutive, setActiveExecutive] = useState<number | null>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const executives: Executive[] = [
    {
      image: '/images/Nancy.jpg',
      name: 'Mrs Nancy Tomani',
      title: 'Board Chairperson',
      bio: 'Extensive experience in credit union governance and community leadership.',
    },
    {
      image: '/images/Etse.jpg',
      name: 'Mr. Hipolaitus Etse Equagoo',
      title: 'Vice Chairperson',
      bio: 'Formal expertise in multiple financial domains.',
    },
    {
      image: '/images/executive-3.jpg',
      name: 'Mr Charles Owusu',
      title: 'Treasurer',
      bio: 'Years in financial management.',
    },
    {
      image: '/images/Micheal.jpg',
      name: 'Mr. Michael Owusu',
      title: 'Secretary',
      bio: 'Passionate and dedicated leader.',
    },
    {
      image: '/images/executive-1.jpg',
      name: 'Mrs. Clare Naanibo',
      title: 'General Manager',
      bio: 'Passionate about member service.',
    },
    {
      image: '/images/executive-3.jpg',
      name: 'Mr. William Paul Ayitey',
      title: 'Marketing Personnel',
      bio: 'Led digital transformation initiatives.',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardElement = carouselRef.current.firstElementChild as HTMLElement;
      if (cardElement) {
        const cardWidth = cardElement.getBoundingClientRect().width;
        const gap = 32;
        const scrollAmount = cardWidth + gap;
        carouselRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    if (isDragging || isHovered || activeExecutive !== null) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft: currentScroll, scrollWidth, clientWidth } = carouselRef.current;
        const isAtEnd = currentScroll + clientWidth >= scrollWidth - 10;

        if (isAtEnd) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging, isHovered, activeExecutive]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div 
      className="relative w-full group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-4 flex justify-center items-center gap-6">
        <button
          onClick={() => scroll('left')}
          className="w-15 h-15 rounded-full border border-cream-100/20 bg-navy-900/40 text-cream-50 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-colors duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-15 h-15 rounded-full border border-cream-100/20 bg-navy-900/40 text-cream-50 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-colors duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-8 overflow-x-auto pb-4 no-scrollbar select-none
          ${isDragging 
            ? 'snap-none scroll-auto cursor-grabbing' 
            : 'snap-x snap-mandatory scroll-smooth cursor-grab'
          }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {executives.map((exec, i) => (
          <div
            key={i}
            onClick={() => setActiveExecutive(i)}
            className={`w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)] shrink-0 snap-start group rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
              activeExecutive === i
                ? 'border-gold-400 bg-navy-800/80 shadow-[0_0_0_1px_rgba(244,199,95,0.4),0_20px_45px_rgba(0,0,0,0.25)] scale-[1.01]'
                : 'border-transparent bg-navy-800/50 backdrop-blur-sm hover:bg-navy-800/70 hover:border-gold-400/40'
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl mb-4 pointer-events-none">
              <img
                src={exec.image}
                alt={exec.name}
                draggable={false}
                className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80 " />
            </div>

            <h4 className="font-serif text-xl font-semibold text-cream-50">{exec.name}</h4>
            <p className="text-gold-400 font-medium text-xl mb-2">{exec.title}</p>
            <p className="text-cream-100/60 text-sm line-clamp-3">{exec.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Announcement Banner Component
export const AnnouncementBanner: React.FC = () => {
  const announcements = [
    "🎉 Welcome to Christ The King Credit Union!",
    "📢 We are Launching our New Website!",
    "💰 Fast loan approval for members!",
    "💰 Competitive Rates - Visit Us Today!",
    "🏆 40+ years of trusted service!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 8000); // Change announcement every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const styles = `
    @keyframes slideInLeft {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutLeft {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(-100%);
        opacity: 0;
      }
    }

    .banner-text {
      animation: slideInLeft 0.8s ease-out;
    }

    .banner-text.exiting {
      animation: slideOutLeft 0.8s ease-in;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 py-2 px-4 overflow-hidden">
        <div className="flex items-center justify-center h-4">
          <div 
            key={currentIndex}
            className="banner-text font-semibold text-sm md:text-base text-center max-w-4xl"
          >
            {announcements[currentIndex]}
          </div>
        </div>
      </div>
    </>
  );
};

// Milestone Carousel Component
export const MilestoneCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const milestones = [
    {
      year: '1983',
      event: 'Our Union was established',
      image: '/images/milestone-1.jpg',
      description: 'Founded on the principles of mutual cooperation'
    },
    {
      year: '1998',
      event: 'On October 14th, we were officially registered',
      image: '/images/milestone-2.jpg',
      description: 'Official recognition as a cooperative credit union'
    },
    {
      year: '2024',
      event: 'Credit Union Association (CUA) affiliation',
      image: '/images/milestone-3.jpg',
      description: 'Joining a network of credit unions nationwide'
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % milestones.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, milestones.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % milestones.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  return (
    <div className="card-glass rounded-3xl overflow-hidden">
      <div className="relative w-full h-96 group">
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={milestone.image}
                alt={milestone.event}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-cream-50">
          <div className="transform transition-all duration-500">
            <span className="font-serif text-5xl font-bold text-gold-400 block mb-2">
              {milestones[currentIndex].year}
            </span>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              {milestones[currentIndex].event}
            </h3>
            <p className="text-cream-100/80">
              {milestones[currentIndex].description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-navy-900/60 hover:bg-gold-400 text-cream-50 hover:text-navy-900 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Previous milestone"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-navy-900/60 hover:bg-gold-400 text-cream-50 hover:text-navy-900 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Next milestone"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="bg-navy-900/50 backdrop-blur-sm px-8 py-6 flex items-center justify-between">
        <div className="flex gap-3">
          {milestones.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gold-400 w-8'
                  : 'bg-cream-100/30 w-2 hover:bg-cream-100/50'
              }`}
              aria-label={`Go to milestone ${index + 1}`}
            />
          ))}
        </div>
        <span className="text-cream-100/70 text-sm font-medium">
          {currentIndex + 1} / {milestones.length}
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const heroImages: string[] = [
    '/images/hero-bank.jpg',
    '/images/hero-bank-2.jpg',
    '/images/hero-bank-3.jpg',
    '/images/hero-bank-4.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const modelContext = (navigator as any).modelContext;
    if (!modelContext?.provideContext) return;

    const tools = [
      {
        name: 'scrollToSection',
        description: 'Scroll the homepage to a specific section, such as services or location.',
        inputSchema: {
          type: 'object',
          properties: {
            section: {
              type: 'string',
              enum: ['home', 'about', 'services', 'testimonials', 'leadership', 'location'],
            },
          },
          required: ['section'],
          additionalProperties: false,
        },
        execute: async (input: { section: string }) => {
          const section = input?.section;
          if (typeof section !== 'string') {
            return { status: 'error', message: 'section is required' };
          }
          scrollToSection(section);
          return { status: 'success', section };
        },
      },
      {
        name: 'viewServices',
        description: 'Scroll to the services section so agents can review available financial offerings.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        execute: async () => {
          scrollToSection('services');
          return { status: 'success' };
        },
      },
      {
        name: 'contactCreditUnion',
        description: 'Open the contact section so members can see phone, email, and location details.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        execute: async () => {
          scrollToSection('location');
          return { status: 'success' };
        },
      },
    ];

    try {
      modelContext.provideContext({ tools });
    } catch (error) {
      console.warn('WebMCP provideContext failed:', error);
    }
  }, []);


{/* Main Home Component JSX */}
  return (
    <>
      {/* Announcement Banner - Fixed at top */}
      <AnnouncementBanner />
      
      <div className="min-h-screen bg-navy-900 pt-10">
        {/* Navigation */}
        <nav className={`fixed top-7 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img src="/images/creditunionlogo.png" alt="Company Logo" style={{ width: '70px' }} />
              <div>
                <h1 className="font-serif text-xl font-semibold text-cream-50">Accra Christ The King</h1>
                <p className="text-xs font-bold text-gold-600 tracking-widest uppercase">Cooperative Credit Union</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'About', 'Testimonials', 'Leadership', 'Location'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-cream-100/80 hover:text-gold-400 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('location')} 
                className="btn-gold px-6 py-2.5 rounded-full font-semibold"
              >
                Become a Member
              </button>
            </div>

            <button
              className="lg:hidden text-cream-50 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-navy-800/95 backdrop-blur-lg border-t border-gold-400/20">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'About', 'Testimonials', 'Leadership', 'Location'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-cream-100 hover:text-gold-400 py-2 font-medium"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('location')} 
                className="btn-gold w-full px-6 py-3 rounded-full font-semibold mt-4"
              >
                Become a Member
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${image})`,
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
        </div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <div className="inline-flex items-center space-x-2 bg-navy-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/30 mb-8">
                <Award className="w-4 h-4 text-gold-600" />
                <span className="text-sm text-gold-600 font-medium">Trusted Since 1983</span>
              </div>
            </div>

            <div className="card-glass rounded-2xl px-6 py-3 text-center mb-12">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-50 leading-tight mb-6">
                Credit Union,
                <span className="text-gradient-gold"> Happy Family!</span>
              </h1>
                     
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <p className="text-2xl text-cream-100/60 max-w-2xl mb-10 leading-relaxed" style={{ textAlign: 'center' }}>
                  The Accra Christ The King Cooperative Credit Union is a member-focused financial 
                  cooperative dedicated to promoting a strong savings culture and providing 
                  accessible loan facilities to its members to support their financial growth 
                  and future security.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4" style={{ justifyContent: 'center' }}>
              <button 
                className="btn-gold px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center group"
                onClick={() => scrollToSection('location')}
              >
                Start Your Journey
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="btn-outline-gold px-8 py-4 rounded-full font-semibold text-lg"
                onClick={() => scrollToSection('services')}
              >
                Explore Services
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gold-400">
              {[
                { value: '40+', label: 'Years of Service' },
                { value: '₵1.5M', label: 'Assets Managed' },
                { value: '100+', label: 'Members' },
                { value: '4.8★', label: 'Member Rating' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-600">{stat.value}</p>
                  <p className="text-cream-100/60 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold-600 rounded-full" />
          </div>
        </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="relative py-24 lg:py-32 bg-navy-800/50 inset-0 bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hands.png)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-medium tracking-widest uppercase mb-4">Our Story</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              A Legacy of Trust & Service
            </h2>
            <div className="decorative-line mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="font-serif text-3xl font-semibold text-cream-50 mb-6">
                Founded on Principles That Endure
              </h3>
              <p className="text-cream-100/80 leading-relaxed mb-6">
                The Accra Christ The King Cooperative Credit Union was established on 
                6th February 1983 and was officially registered on 14th October 1998. 
                It later became affiliated with the Credit Union Association 
                (CUA) on 2nd August 2024.
              </p>
              <p className="text-cream-100/80 leading-relaxed mb-6">
                Since then, we have grown into a full-service financial institution, 
                yet our founding principle remains unchanged: 
                <span className="text-gold-400 font-medium"> people helping people</span>.
              </p>
              <p className="text-cream-100/80 leading-relaxed">
                Today, we continue to honor the vision of our founders by providing 
                personalized financial solutions and competitive rates, with reliable  
                service.
              </p>
            </div>
            
            <MilestoneCarousel />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-gradient-radial from-navy-800/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-medium tracking-widest uppercase mb-4">What We Offer</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              Comprehensive Financial Solutions
            </h2>
            <div className="decorative-line mx-auto" />
            <p className="text-cream-100/70 mt-6 max-w-2xl mx-auto">
              From savings accounts to business loans, we provide a full range of 
              financial products designed to meet the unique needs of our members.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BanknoteArrowUp, title: 'Savings Accounts', desc: 'Providing secure savings. Deposit money and earn interest over time.' },
              { icon: HandCoins, title: 'Loan Facilities', desc: 'Personal, business and emergency loans to qualified customers.' },
              { icon: TrendingUp, title: 'Investments', desc: 'Invest funds for a fixed period at agreed interest rates.' },
              { icon: Users, title: 'Current Accounts', desc: 'Providing transactional accounts for daily financial activities, withdrawals and payments.' },
              { icon: Shield, title: 'Financial Advice', desc: 'Guiding customers on savings plans, debt management, and financial planning.' },
              { icon: Handshake, title: 'Salary and Payroll Services', desc: 'Managing salary payments and payroll solutions for organizations and employees.' },
              { icon: BanknoteArrowDown, title: 'Money Transfers', desc: 'Facilitating local money transfers (and mobile money alternatives) and other financial transactions.' },
              { icon: Heart, title: 'Microfinance', desc: 'Providing financial assistance and credit solutions to small businesses and entrepreneurs.' },
            ].map((service, i) => (
              <div key={i} className="card-glass rounded-2xl p-6 hover:border-gold-400/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center mb-4 group-hover:bg-gold-400/20 transition-colors">
                  <service.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-cream-50 mb-2">{service.title}</h4>  
                <p className="text-cream-100/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" 
        className="relative py-24 lg:py-32 bg-navy-800/50 inset-0 bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hands.png)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-medium tracking-widest uppercase mb-4">Testimonials</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              Stories From Our Members
            </h2>
            <div className="decorative-line mx-auto" />
            <p className="text-cream-100/70 mt-6 max-w-2xl mx-auto">
              Don't just take our word for it—hear from the families and businesses 
              who have made Accra Christ The King Credit Union their financial home.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: '/images/testimonial-1.jpg',
                name: 'Kofi Mensah',
                role: 'Small Business Owner',
                quote: 'When other banks turned me down for a business loan, CTK credit Union took the time to understand my vision. They didn\'t just see numbers—they saw potential. My restaurant is now thriving.',
              },
              {
                image: '/images/testimonial-2.jpg',
                name: 'Robert & Linda Ofori',
                role: 'Retired Educators',
                quote: 'We\'ve been members for 10 years. CTK credit Union helped us buy our first home, put our kids through college, and now they\'re helping us enjoy a comfortable retirement.',
              },
              {
                image: '/images/testimonial-3.jpg',
                name: 'Jessica Williams',
                role: 'Freelance Graphic Designer',
                quote: 'What I really love is that I can walk into a branch and be greeted by name. CTK credit Union combines modern convenience with old-fashioned personal service.',
              },
            ].map((testimonial, i) => (
              <div key={i} className="card-glass rounded-3xl p-8 relative overflow-hidden group hover:border-gold-400/30 transition-all">
                <div className="absolute top-6 right-6 text-gold-400/20">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold-400/30"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-cream-50">{testimonial.name}</h4>
                    <p className="text-gold-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-cream-100/80 leading-relaxed italic">"{testimonial.quote}"</p>
                
                <div className="flex space-x-1 mt-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 lg:py-32 bg-gradient-radial from-navy-800/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gold-400 font-medium tracking-widest uppercase mb-4">Leadership</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              Meet Our Executive Team
            </h2>
            <div className="decorative-line mx-auto" />
            <p className="text-cream-100/70 mt-6 max-w-2xl mx-auto pb-10 leading-relaxed">
              Our leadership team brings a combined experience in banking, 
              finance, and community service to guide Accra Christ the King Credit Union into the future.
            </p>
          </div>

          <ExecutiveCarousel />
        </div>
      </section>

      {/* Location Section */}
      <section id="location" 
        className="relative py-24 lg:py-32 bg-navy-800/50 inset-0 bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hands.png)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-medium tracking-widest uppercase mb-4">Visit Us</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              Our Location
            </h2>
            <div className="decorative-line mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="card-glass rounded-3xl p-8">
                <h3 className="font-serif text-2xl font-semibold text-cream-50 mb-6">Headquarters</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream-50 mb-1">Main Office</h4>
                      <p className="text-cream-100/70">30 Liberation Road<br />Accra - Ghana<br />GPS: GL-061-6791</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream-50 mb-1">Phone</h4>
                      <p className="text-cream-100/70">(233) 302-776-578</p>
                      <p className="text-cream-100/70">(233) 256-104-632</p>
                      <p className="text-cream-100/70">(233) 203-415-799</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream-50 mb-1">Email</h4>
                      <p className="text-cream-100/70">accrachristtk.cu@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream-50 mb-1">Hours</h4>
                      <p className="text-cream-100/70">Mon-Fri: 8:00 AM - 4:30 PM</p>
                      <p className="text-cream-100/70">Sundays: 7:30 AM - 2:30 PM</p>
                      <p className="text-cream-100/70">Saturdays & Public Holidays: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="https://maps.app.goo.gl/DuFAqiLpTUTEDg539" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-6 py-4 rounded-xl font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Get Directions</span>
                </a>
                <a 
                  href="tel:+233302776578"
                  className="btn-outline-gold px-6 py-4 rounded-xl font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gold-400/20 h-[500px]">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1885110139846802%2C5.5767879919849825%2C-0.18279254436492923%2C5.58012487464749&amp;layer=mapnik&amp;marker=5.57845376618276%2C-0.1856517791748047"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Accra Christ the King Credit Union Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <img src="/images/creditunionlogo.png" alt="Company Logo" style={{ width: '80px' }} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-cream-50">Accra Christ The King</h3>
                  <p className="text-xs text-gold-400 tracking-widest uppercase">Cooperative Credit Union</p>
                </div>
              </div>
              <p className="text-cream-100/60 max-w-md mb-6">
                Federally approved by the National Credit Union Administration.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-400/20 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-cream-100/60" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-right md:col-span-2">
              <h4 className="font-serif text-lg font-semibold text-cream-50 mb-4">Legal</h4>
              <ul className="space-y-3">
                {[ { name: 'Privacy Policy', path: '/terms-of-service' },
                    { name: 'Terms of Service', path: '/terms-of-service' }
                  ].map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => navigate(link.path)}
                      className="hover:text-gold-400 transition-colors text-cream-100/60 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gold-400/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-cream-100/40 text-sm">
              © 2026 Accra Christ the King Cooperative Credit Union. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <img 
                src="/cualogo.svg" 
                alt="CUA Approved"
                className="h-8 opacity-60"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
