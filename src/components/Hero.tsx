
import { ArrowRight, FileCode, BookOpen, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Master Java from <span className="java-text-gradient">Beginner to Advanced</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Comprehensive, structured learning path to help you become a Java expert. Start your coding journey today!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2 bg-java hover:bg-java-dark text-white">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2">
                View Roadmap <FileCode className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                  <BookOpen className="h-4 w-4 text-java" />
                </div>
                <span className="text-sm">8-Week Curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                  <Code className="h-4 w-4 text-java" />
                </div>
                <span className="text-sm">Hands-on Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                  <FileCode className="h-4 w-4 text-java" />
                </div>
                <span className="text-sm">Quiz & Practice</span>
              </div>
            </div>
          </div>
          
          <div className="relative p-4">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="absolute top-0 w-full h-8 bg-gray-800 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-300 font-mono">Main.java</div>
              </div>
              <div className="pt-8 bg-gray-900 text-gray-200 font-mono text-sm p-4 overflow-hidden">
                <pre className="animate-code-pulse">
{`public class HelloJavaJourney {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Journey!");
        
        // Your coding adventure starts here
        learnJava("beginner");
    }
    
    private static void learnJava(String level) {
        switch(level) {
            case "beginner":
                System.out.println("Learning core Java concepts");
                break;
            case "intermediate":
                System.out.println("Exploring data structures");
                break;
            case "advanced":
                System.out.println("Mastering Spring Boot");
                break;
        }
    }
}`}
                </pre>
              </div>
            </div>
            
            <div className="absolute -z-10 top-0 right-0 h-72 w-72 bg-java/20 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 left-0 h-72 w-72 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
