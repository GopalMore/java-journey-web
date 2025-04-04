
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Coffee } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <Coffee className="h-8 w-8 text-java" />
              <span className="font-bold text-xl hidden sm:block">Java<span className="text-java">Journey</span></span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="px-3 py-2 text-sm font-medium hover:text-java transition-colors">Home</a>
            <a href="#learning-path" className="px-3 py-2 text-sm font-medium hover:text-java transition-colors">Learning Path</a>
            <a href="#tutorials" className="px-3 py-2 text-sm font-medium hover:text-java transition-colors">Tutorials</a>
            <a href="#quiz" className="px-3 py-2 text-sm font-medium hover:text-java transition-colors">Quiz</a>
            <a href="#about" className="px-3 py-2 text-sm font-medium hover:text-java transition-colors">About</a>
            <div className="ml-2">
              <ThemeToggle />
            </div>
            <Button className="ml-4 bg-java hover:bg-java-dark text-white">Start Learning</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-java"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              href="#learning-path" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-java"
              onClick={toggleMenu}
            >
              Learning Path
            </a>
            <a 
              href="#tutorials" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-java"
              onClick={toggleMenu}
            >
              Tutorials
            </a>
            <a 
              href="#quiz" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-java"
              onClick={toggleMenu}
            >
              Quiz
            </a>
            <a 
              href="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-java"
              onClick={toggleMenu}
            >
              About
            </a>
            <Button className="w-full mt-4 bg-java hover:bg-java-dark text-white">
              Start Learning
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
