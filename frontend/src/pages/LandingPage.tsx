import { useState, useEffect } from 'react';
import { Menu, Clock, AlertCircle, FileX, ArrowRight } from 'lucide-react';
import logo from '../assets/verifiedcc-logo.png';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.sun-3d, .leaf-3d');
      const speed = 0.3;

      parallax.forEach((element) => {
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.card-3d, .animate-fade-in').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 text-deep-ocean">
      <header className="bg-cloud-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#">
            <img src={logo} alt="VerifiedCC Logo" className="h-12 w-auto" />
          </a>
          <nav className="hidden md:flex space-x-8">
            <a href="#problem" className="text-gray-600 hover:text-oasis-green transition-colors">
              The Problem
            </a>
            <a href="#solution" className="text-gray-600 hover:text-oasis-green transition-colors">
              How It Works
            </a>
            <a href="#value" className="text-gray-600 hover:text-oasis-green transition-colors">
              Our Value
            </a>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-block bg-desert-sand text-deep-ocean font-semibold px-5 py-2 rounded-lg hover:brightness-105 transition-transform hover:scale-105"
          >
            Learn More
          </a>
          <button
            id="mobile-menu-button"
            className="md:hidden text-deep-ocean"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 bg-cloud-white">
            <a href="#problem" className="block py-2 text-gray-600 hover:text-oasis-green">
              The Problem
            </a>
            <a href="#solution" className="block py-2 text-gray-600 hover:text-oasis-green">
              How It Works
            </a>
            <a href="#value" className="block py-2 text-gray-600 hover:text-oasis-green">
              Our Value
            </a>
            <a
              href="#contact"
              className="block mt-4 bg-desert-sand text-deep-ocean text-center font-semibold px-5 py-2 rounded-lg hover:brightness-105"
            >
              Learn More
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="hero-3d pt-32 pb-20 md:pt-40 md:pb-28 relative">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="animate-slide-up">
              <p className="text-oasis-green font-semibold mb-2">
                Built for the Hedera Africa Hackathon 2025
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-deep-ocean leading-tight mb-6">
                The Green Energy Economy Has a{' '}
                <span className="text-desert-sand">Multi-Billion Dollar</span> Trust Problem.
              </h2>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-10">
                Introducing VerifiedCC, our "Trust as a Service" platform making it possible for
                Independent Power Producers to unlock the true financial value of their clean energy.
              </p>
              <a
                href="#solution"
                className="inline-block bg-desert-sand text-deep-ocean font-bold px-8 py-4 rounded-lg hover:brightness-105 transition-transform hover:scale-105 shadow-lg shadow-yellow-500/20 animate-glow"
              >
                Discover Our Solution
              </a>
            </div>

            <div
              className="sun-3d top-20 left-10 opacity-60"
              style={{ animationDelay: '-2s' }}
            ></div>
            <div
              className="leaf-3d top-40 right-20 opacity-50"
              style={{ animationDelay: '-4s', animationDuration: '6s' }}
            ></div>
            <div
              className="sun-3d bottom-20 left-1/4 opacity-40"
              style={{
                animationDelay: '-1s',
                animationDuration: '5s',
                width: '80px',
                height: '80px',
              }}
            ></div>
            <div
              className="leaf-3d bottom-32 right-1/3 opacity-45"
              style={{
                animationDelay: '-3s',
                animationDuration: '7s',
                width: '60px',
                height: '75px',
              }}
            ></div>
          </div>
        </section>

        <section id="problem" className="py-20 md:py-28 bg-cloud-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-base font-semibold text-oasis-green uppercase tracking-wider">
                The Problem We Solve
              </h3>
              <h4 className="text-3xl md:text-4xl font-bold text-deep-ocean mt-2 mb-4">
                The $10,000 Audit Bottleneck
              </h4>
              <p className="text-lg text-gray-600">
                Currently, the process for verifying and selling carbon credits is slow, expensive,
                and manual. This bottleneck prevents many renewable energy producers from accessing a
                crucial revenue stream, hindering growth and impact.
              </p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
              <div className="card-3d p-8 rounded-xl border border-gray-200 animate-fade-in">
                <div className="bg-desert-sand text-white rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                  <Clock className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-semibold mt-6 mb-2 text-deep-ocean">Painfully Slow</h5>
                <p className="text-gray-600">
                  Manual verification processes can take months, delaying revenue and creating
                  uncertainty.
                </p>
              </div>
              <div
                className="card-3d p-8 rounded-xl border border-gray-200 animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="bg-oasis-green text-white rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-semibold mt-6 mb-2 text-deep-ocean">
                  Prohibitively Expensive
                </h5>
                <p className="text-gray-600">
                  Audits often cost upwards of $10,000, creating a high barrier to entry for smaller
                  producers.
                </p>
              </div>
              <div
                className="card-3d p-8 rounded-xl border border-gray-200 animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="bg-deep-ocean text-white rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                  <FileX className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-semibold mt-6 mb-2 text-deep-ocean">Prone to Error</h5>
                <p className="text-gray-600">
                  Manual data handling and verification are susceptible to human error and lack
                  transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-base font-semibold text-oasis-green uppercase tracking-wider">
                How VerifiedCC Works
              </h3>
              <h4 className="text-3xl md:text-4xl font-bold text-deep-ocean mt-2 mb-12">
                A New Trust Layer for Green Energy
              </h4>
            </div>
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-desert-sand/20 hover:shadow-xl transition-all duration-300 max-w-sm">
                    <div className="w-16 h-16 bg-desert-sand rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                      1
                    </div>
                    <h5 className="text-xl font-semibold mb-3 text-deep-ocean text-center">
                      Connect & Record
                    </h5>
                    <p className="text-gray-600 text-center leading-relaxed">
                      A lightweight software connector creates a permanent, tamper-proof record for
                      every kilowatt-hour on the Hedera public ledger.
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center opacity-30">
                  <ArrowRight className="w-8 h-8 text-desert-sand" />
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-oasis-green/20 hover:shadow-xl transition-all duration-300 max-w-sm">
                    <div className="w-16 h-16 bg-oasis-green rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                      2
                    </div>
                    <h5 className="text-xl font-semibold mb-3 text-deep-ocean text-center">
                      AI-Powered Verification
                    </h5>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Our AI agent leverages this foundation of verifiable truth to automate the
                      entire verification process, eliminating manual audits.
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center opacity-30">
                  <ArrowRight className="w-8 h-8 text-oasis-green" />
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-deep-ocean/20 hover:shadow-xl transition-all duration-300 max-w-sm">
                    <div className="w-16 h-16 bg-deep-ocean rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                      3
                    </div>
                    <h5 className="text-xl font-semibold mb-3 text-deep-ocean text-center">
                      Autonomous Trading
                    </h5>
                    <p className="text-gray-600 text-center leading-relaxed">
                      The AI autonomously trades the resulting high-integrity carbon credits on the
                      global market, maximizing revenue for our clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="value" className="py-20 md:py-28 bg-cloud-white">
          <div className="container mx-auto px-6">
            <div className="bg-deep-ocean rounded-2xl p-8 md:p-16 text-cloud-white text-center shadow-2xl shadow-blue-900/20">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                From Manual Process to Revenue Machine
              </h3>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                We turn a slow, $10,000 manual audit and sales process into a fast, automated revenue
                stream, building the foundational trust layer for Africa's green revolution.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <a
                  href="mailto:contact@verifiedcc.com?subject=Partnership Inquiry&body=Hi VerifiedCC team,%0D%0A%0D%0AI'm interested in becoming a partner. Please let me know more about partnership opportunities.%0D%0A%0D%0AThank you!"
                  className="bg-desert-sand text-deep-ocean font-bold px-8 py-3 rounded-lg hover:brightness-105 transition-transform hover:scale-105 w-full md:w-auto"
                >
                  Become a Partner
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-500 text-cloud-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors w-full md:w-auto"
                >
                  Read the Whitepaper
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-deep-ocean text-gray-300">
        <div className="container mx-auto px-6 py-12 text-center">
          <img src={logo} alt="VerifiedCC Logo" className="h-10 w-auto mx-auto" />
          <p className="mt-4 mb-6 max-w-md mx-auto">
            Learn more about the future of energy verification and join us in building the trust
            layer for Africa's green revolution.
          </p>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mb-8">
            <a href="#" className="text-gray-400 hover:text-desert-sand">
              #HederaAfricaHackathon
            </a>
            <a href="#" className="text-gray-400 hover:text-desert-sand">
              #CleanTech
            </a>
            <a href="#" className="text-gray-400 hover:text-desert-sand">
              #AI
            </a>
            <a href="#" className="text-gray-400 hover:text-desert-sand">
              #ESG
            </a>
          </div>
          <p className="text-sm">&copy; 2025 VerifiedCC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
