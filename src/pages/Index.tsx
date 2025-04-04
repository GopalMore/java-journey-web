
import { ChevronDown, PanelRight, BookOpen, FileText, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LearningPathTimeline from '@/components/LearningPathTimeline';
import ProgressTracker from '@/components/ProgressTracker';
import Footer from '@/components/Footer';

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning Path",
    description: "Follow our carefully designed 8-week curriculum to learn Java from fundamentals to advanced topics."
  },
  {
    icon: FileText,
    title: "Comprehensive Topics",
    description: "Cover everything from Core Java and OOP to Spring Boot, Microservices, and Interview Preparation."
  },
  {
    icon: CheckCircle2,
    title: "Quiz & Practice",
    description: "Reinforce your learning with regular quizzes and hands-on coding practice."
  },
  {
    icon: Calendar,
    title: "Time-Bound Learning",
    description: "Complete your Java journey in just 8 weeks with our structured day-by-day schedule."
  }
];

const learningTabs = [
  {
    value: "core-java",
    title: "Core Java",
    description: "Master the fundamentals of Java programming language and core concepts.",
    topics: ["Variables & Data Types", "OOP Concepts", "Exception Handling", "Collections & Generics", "Multithreading"]
  },
  {
    value: "advanced-java",
    title: "Advanced Java",
    description: "Take your Java skills to the next level with advanced concepts and techniques.",
    topics: ["Design Patterns", "Java I/O & NIO", "JDBC & JPA", "Modern Java Features", "Concurrency"]
  },
  {
    value: "spring-boot",
    title: "Spring Boot",
    description: "Learn how to build production-ready applications using Spring Boot framework.",
    topics: ["Spring Core", "REST APIs", "Spring Security", "Spring Data", "Microservices"]
  },
  {
    value: "interview-prep",
    title: "Interview Prep",
    description: "Prepare for Java developer interviews with practice questions and tips.",
    topics: ["Technical Questions", "Coding Challenges", "System Design", "Behavioral Questions", "Mock Interviews"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="section-container bg-white dark:bg-transparent">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="java-text-gradient">JavaJourney</span>?
            </h2>
            <p className="text-muted-foreground">
              Our structured learning approach helps you master Java programming efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-java/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-java" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                document.getElementById('learning-path')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore the Learning Path <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </section>
        
        {/* Learning Path Section */}
        <section id="learning-path" className="section-container bg-secondary/30">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your 8-Week <span className="java-text-gradient">Learning Path</span>
            </h2>
            <p className="text-muted-foreground">
              Follow our structured curriculum to transform from a beginner to a job-ready Java developer.
            </p>
          </div>
          
          <LearningPathTimeline />
        </section>
        
        {/* Learning Tabs Section */}
        <section className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Tabs defaultValue="core-java" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                  {learningTabs.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {learningTabs.map(tab => (
                  <TabsContent key={tab.value} value={tab.value} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{tab.title}</h3>
                      <p className="text-muted-foreground">{tab.description}</p>
                    </div>
                    
                    <div className="bg-card rounded-lg border p-6">
                      <h4 className="font-medium mb-4">What You'll Learn:</h4>
                      <ul className="space-y-3">
                        {tab.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-java shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="mt-6 bg-java hover:bg-java-dark text-white">
                        Start Learning
                      </Button>
                    </div>
                    
                    <div className="code-block">
                      {tab.value === "core-java" && (
                        <pre>{`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, Java Journey!");
  }
}`}</pre>
                      )}
                      
                      {tab.value === "advanced-java" && (
                        <pre>{`import java.util.concurrent.CompletableFuture;

public class AsyncExample {
  public static void main(String[] args) {
    CompletableFuture<String> future = CompletableFuture
      .supplyAsync(() -> "Hello")
      .thenApply(s -> s + " Advanced")
      .thenApply(s -> s + " Java!");
      
    System.out.println(future.join());
  }
}`}</pre>
                      )}
                      
                      {tab.value === "spring-boot" && (
                        <pre>{`@RestController
@RequestMapping("/api")
public class JavaController {
  
  @GetMapping("/hello")
  public ResponseEntity<String> hello() {
    return ResponseEntity.ok("Hello Spring Boot!");
  }
}`}</pre>
                      )}
                      
                      {tab.value === "interview-prep" && (
                        <pre>{`// Common Java Interview Question
/*
  Q: What's the difference between
  ArrayList and LinkedList?
  
  A: ArrayList uses dynamic array,
  LinkedList uses doubly linked list.
  ArrayList is faster for random access,
  LinkedList is better for insertions.
*/`}</pre>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div>
              <ProgressTracker />
              
              <Card className="mt-8">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <PanelRight className="h-5 w-5 text-java" />
                    Study Resources
                  </h3>
                  
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-java transition-colors">
                        <span className="h-2 w-2 rounded-full bg-java"></span>
                        Java Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-java transition-colors">
                        <span className="h-2 w-2 rounded-full bg-java"></span>
                        Oracle Java Tutorials
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-java transition-colors">
                        <span className="h-2 w-2 rounded-full bg-java"></span>
                        Spring Framework Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-java transition-colors">
                        <span className="h-2 w-2 rounded-full bg-java"></span>
                        Java Design Patterns
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-java transition-colors">
                        <span className="h-2 w-2 rounded-full bg-java"></span>
                        Java Concurrency in Practice
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-container bg-gradient-to-b from-primary/5 via-java/5 to-background">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your <span className="java-text-gradient">Java Journey</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Begin your transformation into a Java expert today with our structured 8-week learning path.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-java hover:bg-java-dark text-white">
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline">
                View Learning Path
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
