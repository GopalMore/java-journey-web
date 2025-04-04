
import { useState } from 'react';
import { CheckCircle2, ChevronRight, ArrowLeft, BookOpen, Code, FileText, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Quiz data for Day 1-2
const javaBascisQuiz = [
  {
    id: 'q1',
    question: 'What is the main function of JVM?',
    options: [
      { id: 'a', text: 'Compile Java code' },
      { id: 'b', text: 'Convert Java code to bytecode' },
      { id: 'c', text: 'Execute Java bytecode' },
      { id: 'd', text: 'Run Java source code' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 'q2',
    question: 'Which of these is NOT a feature of Java?',
    options: [
      { id: 'a', text: 'Platform independence' },
      { id: 'b', text: 'Multiple inheritance via classes' },
      { id: 'c', text: 'Garbage collection' },
      { id: 'd', text: 'Dynamic memory allocation' }
    ],
    correctAnswer: 'b'
  }
];

// Quiz data for Day 3-5
const oopQuiz = [
  {
    id: 'q1',
    question: 'Which OOP principle ensures data hiding?',
    options: [
      { id: 'a', text: 'Inheritance' },
      { id: 'b', text: 'Encapsulation' },
      { id: 'c', text: 'Polymorphism' },
      { id: 'd', text: 'Abstraction' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'q2',
    question: 'What is the output of this code?\n\nclass A {\n    void show() { System.out.println("A class"); }\n}\nclass B extends A {\n    void show() { System.out.println("B class"); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        A obj = new B();\n        obj.show();\n    }\n}',
    options: [
      { id: 'a', text: 'A class' },
      { id: 'b', text: 'B class' },
      { id: 'c', text: 'Compilation Error' },
      { id: 'd', text: 'Runtime Error' }
    ],
    correctAnswer: 'b'
  }
];

// Quiz data for Day 6-7
const exceptionQuiz = [
  {
    id: 'q1',
    question: 'What will be the output?\n\ntry {\n    int a = 5 / 0;\n} catch (Exception e) {\n    System.out.println("Error Occurred");\n}',
    options: [
      { id: 'a', text: 'Error Occurred' },
      { id: 'b', text: 'Compilation Error' },
      { id: 'c', text: 'ArithmeticException' },
      { id: 'd', text: 'None of the above' }
    ],
    correctAnswer: 'a'
  }
];

// Interview questions
const interviewQuestions = {
  'day1-2': [
    'What is the difference between JDK, JRE, and JVM?',
    'Why is Java platform-independent?',
    'Explain Java\'s memory management process.',
    'What is Just-In-Time (JIT) Compiler?',
    'How does JVM load and execute a Java class?'
  ],
  'day3-5': [
    'Explain Encapsulation with an example.',
    'How does Java implement Multiple Inheritance?',
    'What is the difference between Overloading and Overriding?',
    'Can a constructor be Overloaded?',
    'What is the use of the super keyword in Java?'
  ],
  'day6-7': [
    'What is the difference between Checked & Unchecked Exceptions?',
    'Can you have multiple catch blocks?',
    'How does finally block work?'
  ]
};

// Code samples
const codeSamples = {
  'day1-2': `// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
  'day3-5': {
    encapsulation: `class Student {
    private String name; // Private variable (Data hiding)

    // Getter and Setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}`,
    inheritance: `class Animal {
    void makeSound() { System.out.println("Animal makes sound"); }
}

class Dog extends Animal {
    void bark() { System.out.println("Dog barks!"); }
}

public class Test {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.makeSound();  // Inherited from Animal class
        d.bark();
    }
}`,
    polymorphism: `class MathUtils {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; } // Method Overloading
}

class Parent {
    void show() { System.out.println("Parent class method"); }
}

class Child extends Parent {
    @Override
    void show() { System.out.println("Child class method"); } // Method Overriding
}`
  },
  'day6-7': `try {
    int num = 10 / 0; // Throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("Execution Completed.");
}`
};

// Topic completion tracking
type TopicType = {
  id: string;
  title: string;
  completed: boolean;
};

const initialTopics: {[key: string]: TopicType[]} = {
  'day1-2': [
    { id: 'java-intro', title: 'What is Java?', completed: false },
    { id: 'java-features', title: 'Key Features of Java', completed: false },
    { id: 'java-architecture', title: 'Java Architecture (JVM, JDK, JRE)', completed: false },
    { id: 'compilation', title: 'Compilation & Execution Process', completed: false },
    { id: 'bytecode', title: 'Understanding Bytecode', completed: false }
  ],
  'day3-5': [
    { id: 'oop-intro', title: 'OOP Principles Overview', completed: false },
    { id: 'encapsulation', title: 'Encapsulation', completed: false },
    { id: 'inheritance', title: 'Inheritance', completed: false },
    { id: 'polymorphism', title: 'Polymorphism', completed: false },
    { id: 'abstraction', title: 'Abstraction', completed: false }
  ],
  'day6-7': [
    { id: 'exception-types', title: 'Types of Exceptions', completed: false },
    { id: 'try-catch', title: 'try-catch-finally', completed: false },
    { id: 'custom-exceptions', title: 'Custom Exceptions', completed: false }
  ]
};

const LearningPage = () => {
  const [selectedDay, setSelectedDay] = useState('day1-2');
  const [topics, setTopics] = useState(initialTopics);
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{[key: string]: boolean}>({});
  const [quizResults, setQuizResults] = useState<{[key: string]: boolean}>({});
  const [activeTab, setActiveTab] = useState('theory');
  
  // Get the current quiz based on selected day
  const getCurrentQuiz = () => {
    switch(selectedDay) {
      case 'day1-2': return javaBascisQuiz;
      case 'day3-5': return oopQuiz;
      case 'day6-7': return exceptionQuiz;
      default: return [];
    }
  };
  
  // Calculate progress for current day
  const calculateProgress = () => {
    const currentTopics = topics[selectedDay];
    if (!currentTopics) return 0;
    
    const completed = currentTopics.filter(topic => topic.completed).length;
    return (completed / currentTopics.length) * 100;
  };
  
  // Toggle topic completion
  const toggleTopic = (topicId: string) => {
    setTopics(prev => {
      const newTopics = {...prev};
      const dayTopics = [...newTopics[selectedDay]];
      const topicIndex = dayTopics.findIndex(t => t.id === topicId);
      
      if (topicIndex !== -1) {
        dayTopics[topicIndex] = {
          ...dayTopics[topicIndex],
          completed: !dayTopics[topicIndex].completed
        };
        newTopics[selectedDay] = dayTopics;
      }
      
      // Save to localStorage
      localStorage.setItem('javaTopics', JSON.stringify(newTopics));
      
      return newTopics;
    });
  };
  
  // Handle quiz answer selection
  const handleQuizAnswer = (questionId: string, answerId: string) => {
    if (quizSubmitted[selectedDay]) return;
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  // Submit quiz
  const submitQuiz = () => {
    const currentQuiz = getCurrentQuiz();
    const results: {[key: string]: boolean} = {};
    let score = 0;
    
    currentQuiz.forEach(question => {
      const userAnswer = quizAnswers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      results[question.id] = isCorrect;
      if (isCorrect) score++;
    });
    
    setQuizResults(results);
    setQuizSubmitted(prev => ({...prev, [selectedDay]: true}));
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    toast(`Quiz Score: ${percentage}% (${score}/${currentQuiz.length})`, {
      description: percentage >= 70 ? "Great job!" : "Keep studying to improve!",
      action: {
        label: "Review",
        onClick: () => setActiveTab('quiz')
      }
    });
  };
  
  // Reset quiz
  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(prev => ({...prev, [selectedDay]: false}));
    setQuizResults({});
  };
  
  // Get day title
  const getDayTitle = () => {
    switch(selectedDay) {
      case 'day1-2': return 'Day 1-2: Introduction & Core Java Basics';
      case 'day3-5': return 'Day 3-5: Object-Oriented Programming (OOP) in Java';
      case 'day6-7': return 'Day 6-7: Flow Controls & Exception Handling';
      default: return '';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-secondary/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Week 1: Core Java Fundamentals</h1>
            <p className="text-muted-foreground mt-2">Mastering the foundational concepts of Java programming</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Day selection */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4">Week 1 Schedule</h3>
                    <div className="space-y-2">
                      <Button 
                        variant={selectedDay === 'day1-2' ? 'default' : 'outline'} 
                        className="w-full justify-start" 
                        onClick={() => setSelectedDay('day1-2')}
                      >
                        <span className="flex items-center gap-2">
                          Day 1-2: Java Basics
                          {calculateProgress() === 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </span>
                      </Button>
                      <Button 
                        variant={selectedDay === 'day3-5' ? 'default' : 'outline'} 
                        className="w-full justify-start" 
                        onClick={() => setSelectedDay('day3-5')}
                      >
                        <span className="flex items-center gap-2">
                          Day 3-5: OOP
                          {calculateProgress() === 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </span>
                      </Button>
                      <Button 
                        variant={selectedDay === 'day6-7' ? 'default' : 'outline'} 
                        className="w-full justify-start" 
                        onClick={() => setSelectedDay('day6-7')}
                      >
                        <span className="flex items-center gap-2">
                          Day 6-7: Exceptions
                          {calculateProgress() === 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Progress */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4">Your Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>{getDayTitle()}</span>
                          <span>{Math.round(calculateProgress())}%</span>
                        </div>
                        <Progress value={calculateProgress()} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="font-medium text-sm mb-2">Topics:</h4>
                        <div className="space-y-2">
                          {topics[selectedDay]?.map(topic => (
                            <div key={topic.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={topic.id} 
                                checked={topic.completed}
                                onCheckedChange={() => toggleTopic(topic.id)}
                              />
                              <Label 
                                htmlFor={topic.id}
                                className={topic.completed ? "line-through text-muted-foreground" : ""}
                              >
                                {topic.title}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-6">{getDayTitle()}</h2>
              
              <Tabs defaultValue="theory" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="theory" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Theory</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="interview" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Interview</span>
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline">Quiz</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Theory Content */}
                <TabsContent value="theory" className="space-y-6">
                  {selectedDay === 'day1-2' && (
                    <>
                      <section className="space-y-4">
                        <h3 className="text-xl font-semibold">What is Java?</h3>
                        <p>
                          Java is a <strong>high-level, class-based, object-oriented programming language</strong> developed by <strong>Sun Microsystems</strong> (now owned by <strong>Oracle</strong>).
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Official Documentation: <a href="https://docs.oracle.com/en/java/javase/17/" className="text-java underline hover:no-underline" target="_blank" rel="noopener noreferrer">Java SE Docs</a>
                        </p>
                        
                        <div className="bg-secondary/50 p-4 rounded-md border mt-4">
                          <h4 className="font-medium mb-2">Key Features of Java</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-java shrink-0 mt-0.5" />
                              <span><strong>Platform Independent</strong> → Write Once, Run Anywhere (WORA)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-java shrink-0 mt-0.5" />
                              <span><strong>Object-Oriented</strong> → Uses Classes & Objects</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-java shrink-0 mt-0.5" />
                              <span><strong>Robust & Secure</strong> → Automatic Memory Management (Garbage Collection)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-java shrink-0 mt-0.5" />
                              <span><strong>Multi-threaded</strong> → Supports Concurrent Programming</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-java shrink-0 mt-0.5" />
                              <span><strong>Rich API</strong> → Collections, Concurrency, Networking, File Handling</span>
                            </li>
                          </ul>
                        </div>
                      </section>
                      
                      <section className="space-y-4 pt-4">
                        <h3 className="text-xl font-semibold">Java Architecture (JVM, JDK, JRE)</h3>
                        <p>
                          <strong>JDK (Java Development Kit)</strong> → For developing Java applications (Includes Compiler, JRE, and Tools)<br />
                          <strong>JRE (Java Runtime Environment)</strong> → Required to run Java programs (Includes JVM)<br />
                          <strong>JVM (Java Virtual Machine)</strong> → Converts Java bytecode to machine code
                        </p>
                        
                        <div className="bg-secondary/50 p-4 rounded-md border mt-4">
                          <h4 className="font-medium mb-2">Compilation & Execution Process</h4>
                          <ol className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-java text-white text-sm shrink-0">1</div>
                              <span><strong>Write Code</strong> → Save as <code>.java</code></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-java text-white text-sm shrink-0">2</div>
                              <span><strong>Compile</strong> → <code>javac MyProgram.java</code> → Generates <code>.class</code> (Bytecode)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-java text-white text-sm shrink-0">3</div>
                              <span><strong>Run</strong> → <code>java MyProgram</code> → Executes in JVM</span>
                            </li>
                          </ol>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="font-medium mb-2">Understanding Bytecode</h4>
                          <p>
                            Java <strong>compiles source code</strong> into <strong>bytecode</strong>, which runs on JVM, making Java platform-independent.
                          </p>
                        </div>
                      </section>
                    </>
                  )}
                  
                  {selectedDay === 'day3-5' && (
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold">OOP Principles in Java</h3>
                      <p>
                        Java follows <strong>four core OOP principles:</strong>
                      </p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="encapsulation">
                          <AccordionTrigger>Encapsulation – Wrapping data & methods in a single unit</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                Encapsulation is the mechanism of wrapping the data (variables) and code acting on the data (methods) together as a single unit.
                              </p>
                              <p>
                                <strong>Benefits:</strong>
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Data Hiding: Restricts direct access to data members</li>
                                <li>Increased Flexibility: Can change implementation without affecting other code</li>
                                <li>Reusability: Encapsulated code can be reused</li>
                              </ul>
                              <p>
                                <strong>Example:</strong> Using private fields with public getter and setter methods.
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="inheritance">
                          <AccordionTrigger>Inheritance – One class acquiring properties of another</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                Inheritance is a mechanism wherein a new class (subclass) acquires the properties and behaviors of an existing class (superclass).
                              </p>
                              <p>
                                <strong>Benefits:</strong>
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Code Reusability: Reuse fields and methods of the existing class</li>
                                <li>Method Overriding: Ability to provide specific implementation of a method</li>
                                <li>Extensibility: Easily extend functionality of existing classes</li>
                              </ul>
                              <p>
                                <strong>Types:</strong> Single, Multilevel, Hierarchical
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="polymorphism">
                          <AccordionTrigger>Polymorphism – Many forms (Overloading & Overriding)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                Polymorphism refers to the ability of a variable, function or object to take on multiple forms.
                              </p>
                              <p>
                                <strong>Types of Polymorphism:</strong>
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Compile-time/Static Polymorphism</strong>: Method Overloading</li>
                                <li><strong>Runtime/Dynamic Polymorphism</strong>: Method Overriding</li>
                              </ul>
                              <p>
                                <strong>Method Overloading</strong>: Same method name with different parameters
                              </p>
                              <p>
                                <strong>Method Overriding</strong>: Same method name, same parameters, different implementation in subclass
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="abstraction">
                          <AccordionTrigger>Abstraction – Hiding implementation details</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                Abstraction means hiding the complexity and showing only the essential features of the object.
                              </p>
                              <p>
                                <strong>Ways to achieve Abstraction:</strong>
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Abstract Classes</strong>: Cannot be instantiated, can have abstract methods</li>
                                <li><strong>Interfaces</strong>: All methods are abstract by default</li>
                              </ul>
                              <p>
                                <strong>Benefits:</strong>
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Reduces complexity by hiding unnecessary details</li>
                                <li>Makes the application more maintainable</li>
                                <li>Increases security as implementation details are hidden</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </section>
                  )}
                  
                  {selectedDay === 'day6-7' && (
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold">Exception Handling in Java</h3>
                      
                      <div className="bg-secondary/50 p-4 rounded-md border">
                        <h4 className="font-medium mb-2">Types of Exceptions</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium">Checked Exception</p>
                            <p className="text-sm text-muted-foreground">
                              These are the exceptions that are checked at compile-time. Examples: IOException, SQLException
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Unchecked Exception</p>
                            <p className="text-sm text-muted-foreground">
                              These are the exceptions that are not checked at compile-time but at runtime. Examples: NullPointerException, ArithmeticException
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Error</p>
                            <p className="text-sm text-muted-foreground">
                              These are not exceptions at all, but problems that arise beyond the control of the user or the programmer. Examples: StackOverflowError, OutOfMemoryError
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium mb-3">try-catch-finally Example</h4>
                        <p className="mb-3">
                          The try-catch-finally statement is used to handle exceptions in Java. The try block contains code that might throw an exception. The catch block contains code that handles the exception. The finally block contains code that is always executed, regardless of whether an exception is thrown or not.
                        </p>
                        <div className="code-block">
                          <pre>{`try {
    int num = 10 / 0; // Throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("Execution Completed.");
}`}</pre>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium mb-3">Custom Exceptions</h4>
                        <p>
                          You can create your own exceptions by extending the Exception class or any of its subclasses.
                        </p>
                        <div className="code-block mt-3">
                          <pre>{`// Custom exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Using custom exception
class BankAccount {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Not enough funds!");
        }
        balance -= amount;
    }
}`}</pre>
                        </div>
                      </div>
                    </section>
                  )}
                </TabsContent>
                
                {/* Code Examples */}
                <TabsContent value="code" className="space-y-6">
                  {selectedDay === 'day1-2' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Your First Java Program</h3>
                      <div className="bg-secondary/30 p-4 rounded-md mb-4">
                        <p className="font-medium mb-2">Task: Write a simple Java program and compile it manually.</p>
                      </div>
                      <div className="code-block">
                        <pre>{codeSamples['day1-2']}</pre>
                      </div>
                      <div className="mt-4 bg-secondary/30 p-4 rounded-md">
                        <p className="font-medium mb-2">Steps to Run:</p>
                        <pre className="bg-secondary/70 dark:bg-secondary/30 p-2 rounded text-sm overflow-x-auto">
                          {`javac HelloWorld.java   # Compiling Java File
java HelloWorld         # Running the Program`}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {selectedDay === 'day3-5' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Encapsulation Example</h3>
                        <div className="code-block">
                          <pre>{codeSamples['day3-5'].encapsulation}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Inheritance Example</h3>
                        <div className="code-block">
                          <pre>{codeSamples['day3-5'].inheritance}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Polymorphism Example (Overloading & Overriding)</h3>
                        <div className="code-block">
                          <pre>{codeSamples['day3-5'].polymorphism}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedDay === 'day6-7' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Exception Handling Example</h3>
                      <div className="code-block">
                        <pre>{codeSamples['day6-7']}</pre>
                      </div>
                      
                      <div className="mt-6 p-4 bg-secondary/30 rounded-md">
                        <h4 className="font-medium mb-2">Expected Output:</h4>
                        <pre className="bg-secondary/70 dark:bg-secondary/30 p-2 rounded text-sm">
                          {`Cannot divide by zero!
Execution Completed.`}
                        </pre>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Interview Questions */}
                <TabsContent value="interview" className="space-y-6">
                  <div className="bg-secondary/30 p-4 rounded-md mb-6">
                    <h3 className="font-semibold mb-2">Interview Questions for {getDayTitle()}</h3>
                    <p className="text-muted-foreground text-sm">
                      Practice these questions to prepare for your Java interview. They range from beginner to advanced level.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {interviewQuestions[selectedDay]?.map((question, index) => (
                      <Accordion key={index} type="single" collapsible className="w-full border rounded-md">
                        <AccordionItem value={`item-${index}`} className="border-none">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="text-left font-medium">
                              <span className="text-java mr-2">Q{index + 1}.</span> {question}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="bg-secondary/30 px-4 py-3 text-sm border-t">
                            <div className="flex items-start gap-2">
                              <div className="bg-java text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">ANSWER</div>
                              <div className="space-y-2">
                                {selectedDay === 'day1-2' && index === 0 && (
                                  <p>
                                    <strong>JDK (Java Development Kit):</strong> It's a software development environment used for developing Java applications. It includes JRE along with development tools like compiler, debugger, etc.<br />
                                    <strong>JRE (Java Runtime Environment):</strong> It's an implementation of JVM that provides a runtime environment to execute Java bytecode. It includes class libraries, JVM, and other supporting files.<br />
                                    <strong>JVM (Java Virtual Machine):</strong> It's an abstract machine that provides a runtime environment in which Java bytecode can be executed. It is responsible for converting bytecode to machine-specific code.
                                  </p>
                                )}
                                {selectedDay === 'day3-5' && index === 0 && (
                                  <p>
                                    Encapsulation is the process of wrapping code and data together into a single unit. In Java, it is implemented using private access modifier which restricts access to class fields and providing public getter and setter methods.<br /><br />
                                    <strong>Example:</strong><br />
                                    <code>
                                      class Student {<br />
                                      &nbsp;&nbsp;private String name; // private variable<br />
                                      &nbsp;&nbsp;public String getName() { return name; } // getter<br />
                                      &nbsp;&nbsp;public void setName(String name) { this.name = name; } // setter<br />
                                      }
                                    </code>
                                  </p>
                                )}
                                {selectedDay === 'day6-7' && index === 0 && (
                                  <p>
                                    <strong>Checked Exceptions:</strong><br />
                                    - These are the exceptions that are checked at compile-time.<br />
                                    - Examples: IOException, SQLException<br />
                                    - These exceptions must be either caught or declared in the method signature with 'throws' clause.<br /><br />
                                    <strong>Unchecked Exceptions:</strong><br />
                                    - These are the exceptions that are not checked at compile-time but at runtime.<br />
                                    - Examples: NullPointerException, ArithmeticException<br />
                                    - These exceptions are not required to be caught or declared.
                                  </p>
                                )}
                                {!(selectedDay === 'day1-2' && index === 0) && 
                                  !(selectedDay === 'day3-5' && index === 0) && 
                                  !(selectedDay === 'day6-7' && index === 0) && (
                                  <p className="italic">
                                    Click to see complete answer... (Full answer would be provided in a real application)
                                  </p>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Quiz */}
                <TabsContent value="quiz" className="space-y-6">
                  <div className="bg-secondary/30 p-4 rounded-md mb-6">
                    <h3 className="font-semibold mb-2">Quiz: {getDayTitle()}</h3>
                    <p className="text-muted-foreground text-sm">
                      Test your knowledge of the concepts covered in this section.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {getCurrentQuiz().map((question, index) => (
                      <div key={question.id} className="border rounded-md p-4">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-java text-white text-sm shrink-0">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">{question.question}</p>
                            {question.question.includes('\n') && (
                              <div className="code-block mt-2">
                                <pre>{question.question.split('\n').slice(1).join('\n')}</pre>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <RadioGroup 
                          value={quizAnswers[question.id]} 
                          onValueChange={(value) => handleQuizAnswer(question.id, value)}
                          className="pl-9 space-y-2"
                          disabled={quizSubmitted[selectedDay]}
                        >
                          {question.options.map(option => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={option.id} 
                                id={`${question.id}-${option.id}`}
                                className={quizSubmitted[selectedDay] ? 
                                  quizResults[question.id] && option.id === question.correctAnswer ? 
                                    "border-green-500 text-green-500" : 
                                    quizAnswers[question.id] === option.id && option.id !== question.correctAnswer ? 
                                      "border-red-500 text-red-500" : "" 
                                  : ""}
                              />
                              <Label 
                                htmlFor={`${question.id}-${option.id}`}
                                className={quizSubmitted[selectedDay] ? 
                                  option.id === question.correctAnswer ? 
                                    "text-green-500 font-medium" : 
                                    quizAnswers[question.id] === option.id && option.id !== question.correctAnswer ? 
                                      "text-red-500" : "" 
                                  : ""}
                              >
                                {option.text}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        
                        {quizSubmitted[selectedDay] && (
                          <div className={`mt-4 p-3 rounded-md ${quizResults[question.id] ? 'bg-green-500/10 border border-green-500/50' : 'bg-red-500/10 border border-red-500/50'}`}>
                            <p className={`text-sm font-medium ${quizResults[question.id] ? 'text-green-500' : 'text-red-500'}`}>
                              {quizResults[question.id] ? 'Correct! ✓' : 'Incorrect ✗'}
                            </p>
                            <p className="text-sm mt-1">
                              {quizResults[question.id] ? 
                                'Great job! You got this question right.' : 
                                `The correct answer is: ${question.options.find(o => o.id === question.correctAnswer)?.text}`
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex justify-center gap-4 pt-4">
                      {!quizSubmitted[selectedDay] ? (
                        <Button 
                          onClick={submitQuiz} 
                          disabled={getCurrentQuiz().length !== Object.keys(quizAnswers).filter(
                            k => getCurrentQuiz().some(q => q.id === k)
                          ).length}
                          className="bg-java hover:bg-java-dark"
                        >
                          Submit Quiz
                        </Button>
                      ) : (
                        <Button 
                          onClick={resetQuiz} 
                          variant="outline"
                        >
                          Reset Quiz
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningPage;
