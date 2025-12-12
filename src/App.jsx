import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, PlusCircle, Activity, CheckCircle, Menu, X } from 'lucide-react';

const App = () => {
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });

useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://dummyjson.com/quotes');
        const data = await response.json();

        const quotesArray = data.quotes;
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const randomQuote = quotesArray[randomIndex];
        
        setQuote({ 
            quote: randomQuote.quote, 
            author: randomQuote.author
        });
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote({ 
            quote: "Hope is being able to see that there is light despite all of the darkness.", 
            author: "Desmond Tutu" 
        });
      } finally {
        setLoadingQuote(false);
      }
    };

    fetchQuote();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', message: '', consent: false });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      

      <nav className="bg-white py-4 border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            

            <div className="flex items-center gap-2">
              <div className="relative">
                 <PlusCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-700" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg md:text-xl text-blue-700 tracking-wide">JARURAT</span>
                <span className="font-bold text-lg md:text-xl text-blue-700 tracking-wide">CARE</span>
              </div>
            </div>


            <div className="hidden md:flex items-center space-x-8 font-medium text-gray-900">
              <a href="#" className="hover:text-blue-700 transition">Home</a>
              <a href="#" className="hover:text-blue-700 transition">About Us</a>
              <a href="#" className="hover:text-blue-700 transition">Get Involved</a>
              <a href="#" className="hover:text-blue-700 transition">News & Blogs</a>
              <a href="#" className="text-blue-700 font-bold transition">Contact Us</a>
            </div>

            <button className="hidden md:block px-6 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-md text-sm md:text-base">
              Donate Now
            </button>

            <button 
              className="md:hidden p-2 text-gray-600 hover:text-blue-700 transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg z-40">
            <div className="px-4 py-4 space-y-4 flex flex-col font-medium text-gray-900">
              <a href="#" className="block py-2 hover:text-blue-700 transition" onClick={toggleMenu}>Home</a>
              <a href="#" className="block py-2 hover:text-blue-700 transition" onClick={toggleMenu}>About Us</a>
              <a href="#" className="block py-2 hover:text-blue-700 transition" onClick={toggleMenu}>Get Involved</a>
              <a href="#" className="block py-2 hover:text-blue-700 transition" onClick={toggleMenu}>News & Blogs</a>
              <a href="#" className="block py-2 text-blue-700 font-bold" onClick={toggleMenu}>Contact Us</a>
              <button className="w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md mt-2">
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-8 md:py-12 gap-8 px-4 md:px-0">
        
        <div className="max-w-2xl w-full mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-10">
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                    <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-sm md:text-base text-gray-600 mt-2">We are here to help. Send us a message.</p>

            <div className="mt-8 max-w-xl mx-auto">
              {loadingQuote ? (
                <p className="text-gray-400 animate-pulse text-sm">Fetching inspiration...</p>
              ) : (
                <div className="bg-blue-50/50 p-5 md:p-6 rounded-xl border border-blue-100 relative mx-2 md:mx-0">
                  <Activity className="w-4 h-4 text-blue-400 absolute top-4 left-4" />
                  <p className="text-gray-700 italic text-base md:text-lg px-2 md:px-4 mb-2">
                    "{quote?.quote}"
                  </p>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    — {quote?.author}
                  </p>
                </div>
              )}
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You, {formData.name}!</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                Your message has been successfully sent. Our team will review your inquiry and get back to you as soon as possible.
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 space-y-5 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white text-base"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white text-base"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none bg-white text-base"
                  placeholder="How can we help?"
                />
              </div>

              <div className="flex items-start gap-3 mt-2">
                <div className="flex items-center h-5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <div className="text-sm leading-tight">
                  <label htmlFor="consent" className="font-medium text-gray-600 cursor-pointer select-none">
                    Your information will remain confidential and be used to provide you with personalized support.
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 md:py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md text-base mt-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="bg-blue-900 text-blue-100 py-6 md:py-8 text-center mt-auto text-sm md:text-base">
        <p>&copy; Jarurat Care - Assignment by Viswajith S B</p>
      </footer>

    </div>
  );
};

export default App;