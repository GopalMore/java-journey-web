
import { CalendarDays, Users, Book, Code, Database, Server, GitBranch, Cpu, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import CourseCard from './CourseCard';

const timelineData = [
  {
    weekNumber: 1,
    title: "Core Java Foundations",
    description: "Master the fundamentals of Java programming and core object-oriented concepts.",
    courses: [
      {
        title: "Introduction & Core Java Basics",
        description: "Overview of the Java programming language and environment setup.",
        topics: ["JDK & Environment Setup", "Variables & Data Types", "Operators & Control Flow"],
        duration: "2 days",
        level: "beginner" as const,
      },
      {
        title: "Object-Oriented Programming",
        description: "Learn the pillars of OOP in Java with practical examples.",
        topics: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
        duration: "3 days",
        level: "beginner" as const,
      },
      {
        title: "Flow Controls & Exceptions",
        description: "Master conditional logic and error handling in Java.",
        topics: ["Control Statements", "Exception Handling", "try-catch-finally Blocks"],
        duration: "2 days",
        level: "beginner" as const,
      },
    ],
    icon: Book,
  },
  {
    weekNumber: 2,
    title: "Advanced Core Java & Multithreading",
    description: "Dive deeper into Java's advanced features and concurrent programming.",
    courses: [
      {
        title: "Advanced Core Java Concepts",
        description: "Expand your knowledge with more advanced Java features.",
        topics: ["Garbage Collection", "Annotations", "Class Structures", "Type Systems"],
        duration: "2 days",
        level: "intermediate" as const,
      },
      {
        title: "Java Multithreading and Concurrency",
        description: "Learn how to write concurrent and parallel code in Java.",
        topics: ["Thread Creation", "Synchronization", "ExecutorService", "Thread Safety"],
        duration: "3 days",
        level: "intermediate" as const,
      },
      {
        title: "Quiz Time (Core Java & Multithreading)",
        description: "Test your knowledge on core Java and multithreading concepts.",
        topics: ["Core Java Quiz", "Multithreading Quiz", "Review & Revision"],
        duration: "2 days",
        level: "intermediate" as const,
      },
    ],
    icon: Cpu,
  },
  {
    weekNumber: 3,
    title: "Collections, Generics & I/O",
    description: "Learn how to work with data structures and file operations in Java.",
    courses: [
      {
        title: "Java Collections & Generics",
        description: "Master Java's powerful data structures and type safety mechanisms.",
        topics: ["Collection Framework", "Lists & Sets", "Maps & Queues", "Generics & Wildcards"],
        duration: "2 days",
        level: "intermediate" as const,
      },
      {
        title: "Java I/O and NIO",
        description: "Learn file handling and I/O operations in Java.",
        topics: ["Java I/O Streams", "Byte/Character Streams", "NIO", "Path & Files APIs"],
        duration: "3 days",
        level: "intermediate" as const,
      },
      {
        title: "Quiz Time (Collections & I/O)",
        description: "Test your knowledge on collections, generics, and I/O.",
        topics: ["Collections Quiz", "Generics Quiz", "I/O & NIO Quiz"],
        duration: "2 days",
        level: "intermediate" as const,
      },
    ],
    icon: Database,
  },
  {
    weekNumber: 4,
    title: "Design Patterns & Persistence",
    description: "Learn software design patterns and database connectivity in Java.",
    courses: [
      {
        title: "Design Patterns",
        description: "Master common software design patterns used in Java applications.",
        topics: ["Singleton Pattern", "Factory Pattern", "Observer Pattern", "Strategy Pattern"],
        duration: "2 days",
        level: "advanced" as const,
      },
      {
        title: "JDBC, JPA, Hibernate",
        description: "Learn database connectivity and ORM technologies in Java.",
        topics: ["JDBC Connections", "JPA Entities", "Hibernate CRUD", "EntityManager"],
        duration: "3 days",
        level: "advanced" as const,
      },
      {
        title: "Quiz Time (Design Patterns, JDBC, Hibernate)",
        description: "Test your knowledge on design patterns and database technologies.",
        topics: ["Design Patterns Quiz", "JDBC Quiz", "Hibernate Quiz"],
        duration: "2 days",
        level: "advanced" as const,
      },
    ],
    icon: Database,
  },
  {
    weekNumber: 5,
    title: "Modern Java Features",
    description: "Explore the modern features introduced in newer Java versions.",
    courses: [
      {
        title: "Java 9 to 23 Features",
        description: "Learn the new features introduced in modern Java versions.",
        topics: ["Java 8 Features", "Modules", "Var Keyword", "Records", "Pattern Matching"],
        duration: "3 days",
        level: "advanced" as const,
      },
      {
        title: "Future and CompletableFuture",
        description: "Master asynchronous programming in Java.",
        topics: ["Asynchronous Processing", "Parallel Tasks", "CompletableFuture Usage"],
        duration: "3 days",
        level: "advanced" as const,
      },
      {
        title: "Hands-On Java Practice",
        description: "Apply your knowledge by solving complex Java problems.",
        topics: ["Coding Challenges", "GitHub Projects", "Code Reviews"],
        duration: "1 day",
        level: "advanced" as const,
      },
    ],
    icon: Code,
  },
  {
    weekNumber: 6,
    title: "Spring Boot Fundamentals",
    description: "Get started with Spring Boot framework for Java applications.",
    courses: [
      {
        title: "Introduction to Spring Boot",
        description: "Learn the basics of the Spring Boot framework.",
        topics: ["Spring Boot Core", "Dependency Injection", "Autowiring", "ApplicationContext"],
        duration: "2 days",
        level: "intermediate" as const,
      },
      {
        title: "Spring Boot Annotations & Actuator",
        description: "Master Spring Boot annotations and monitoring capabilities.",
        topics: ["Common Annotations", "@RestController", "@Autowired", "Spring Boot Actuator"],
        duration: "3 days",
        level: "intermediate" as const,
      },
      {
        title: "Spring Boot Profiles & Environment",
        description: "Learn how to manage different environments in Spring Boot.",
        topics: ["Profiles", "application.properties", "application.yml", "Environment Management"],
        duration: "3 days",
        level: "intermediate" as const,
      },
    ],
    icon: Server,
  },
  {
    weekNumber: 7,
    title: "Advanced Spring Boot",
    description: "Master advanced Spring Boot capabilities for production applications.",
    courses: [
      {
        title: "Building REST APIs in Spring Boot",
        description: "Learn how to build RESTful APIs with Spring Boot.",
        topics: ["RESTful API Design", "HTTP Methods", "ResponseEntity", "@RequestMapping"],
        duration: "2 days",
        level: "advanced" as const,
      },
      {
        title: "Spring Boot Security",
        description: "Secure your Spring Boot applications with Spring Security.",
        topics: ["Authentication", "Authorization", "JWT", "OAuth2"],
        duration: "3 days",
        level: "advanced" as const,
      },
      {
        title: "Spring Boot Testing",
        description: "Learn how to write tests for Spring Boot applications.",
        topics: ["Unit Testing", "Integration Testing", "JUnit", "Mockito"],
        duration: "3 days",
        level: "advanced" as const,
      },
    ],
    icon: Shield,
  },
  {
    weekNumber: 8,
    title: "Production & Interview Preparation",
    description: "Prepare for deployment and job interviews with final polish.",
    courses: [
      {
        title: "Spring Boot Microservices & Deployment",
        description: "Learn microservices architecture and deployment strategies.",
        topics: ["Microservices", "Service Discovery", "Docker", "Kubernetes"],
        duration: "3 days",
        level: "advanced" as const,
      },
      {
        title: "System Design Basics & GIT",
        description: "Learn system design principles and version control.",
        topics: ["System Design", "Scalability", "Kafka", "Git Fundamentals"],
        duration: "2 days",
        level: "advanced" as const,
      },
      {
        title: "Behavioral Interview Preparation",
        description: "Prepare for behavioral interviews with the STAR method.",
        topics: ["STAR Method", "Behavioral Questions", "Example Answers"],
        duration: "2 days",
        level: "advanced" as const,
      },
    ],
    icon: Users,
  },
];

const LearningPathTimeline = () => {
  return (
    <div className="space-y-16 py-8">
      {timelineData.map((week, index) => (
        <div key={week.weekNumber} className="relative">
          {/* Timeline connector */}
          {index < timelineData.length - 1 && (
            <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-border dark:bg-border z-0"></div>
          )}
          
          <div className="flex items-start gap-6">
            {/* Week indicator with icon */}
            <div className="flex flex-col items-center pt-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-java text-white z-10">
                {week.weekNumber}
              </div>
              <div className="mt-2 p-2 rounded-full bg-secondary">
                <week.icon className="h-5 w-5 text-java" />
              </div>
            </div>
            
            {/* Week content */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{week.title}</h3>
                <p className="text-muted-foreground mt-1">{week.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {week.courses.map((course, courseIndex) => (
                  <CourseCard
                    key={courseIndex}
                    title={course.title}
                    description={course.description}
                    topics={course.topics}
                    duration={course.duration}
                    level={course.level}
                    weekNumber={week.weekNumber}
                    className={cn(
                      "lg:transform transition-transform duration-300",
                      courseIndex === 1 && "lg:translate-y-4",
                      courseIndex === 2 && "lg:translate-y-8"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningPathTimeline;
