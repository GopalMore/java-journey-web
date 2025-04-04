
import { Coffee, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-java" />
              <span className="font-bold text-xl">Java<span className="text-java">Journey</span></span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              A comprehensive learning path to help you master Java programming from beginner to advanced levels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-java transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-java transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-java transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-java transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-java transition-colors">Home</a></li>
              <li><a href="#learning-path" className="text-muted-foreground hover:text-java transition-colors">Learning Path</a></li>
              <li><a href="#tutorials" className="text-muted-foreground hover:text-java transition-colors">Tutorials</a></li>
              <li><a href="#quiz" className="text-muted-foreground hover:text-java transition-colors">Quiz</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-java transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-java transition-colors">Java Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-java transition-colors">Spring Boot Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-java transition-colors">Interview Preparation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-java transition-colors">Code Examples</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-java transition-colors">Cheat Sheets</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to receive updates on new tutorials and resources.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-l-md w-full border focus:outline-none focus:ring-2 focus:ring-java focus:border-transparent"
              />
              <button 
                type="button" 
                className="bg-java hover:bg-java-dark text-white font-medium py-2 px-4 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} JavaJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
