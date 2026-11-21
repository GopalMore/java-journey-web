
import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ArrowLeft, BookOpen, Code, FileText, Play, ChevronDown } from 'lucide-react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  },
  {
    id: 'q3',
    question: 'What type of memory is used for method invocation in Java?',
    options: [
      { id: 'a', text: 'Heap' },
      { id: 'b', text: 'Stack' },
      { id: 'c', text: 'Both' },
      { id: 'd', text: 'None' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'q4',
    question: 'What happens when a stack is full in Java?',
    options: [
      { id: 'a', text: 'Stack Overflow' },
      { id: 'b', text: 'Memory Leak' },
      { id: 'c', text: 'Garbage Collection' },
      { id: 'd', text: 'Stack Underflow' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'q5',
    question: 'What does the static keyword in the main method signify?',
    options: [
      { id: 'a', text: 'It can be accessed without creating an instance of the class' },
      { id: 'b', text: 'It is a class-level method' },
      { id: 'c', text: 'It is non-returnable' },
      { id: 'd', text: 'It is available only within the class' }
    ],
    correctAnswer: 'a'
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
  },
  {
    id: 'q3',
    question: 'What is the main purpose of the static keyword in Java?',
    options: [
      { id: 'a', text: 'To create variables and methods that belong to the class itself' },
      { id: 'b', text: 'To prevent inheritance' },
      { id: 'c', text: 'To hide implementation details' },
      { id: 'd', text: 'To ensure thread safety' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'q4',
    question: 'Can an abstract class be instantiated?',
    options: [
      { id: 'a', text: 'Yes' },
      { id: 'b', text: 'No' },
      { id: 'c', text: 'Sometimes' },
      { id: 'd', text: 'Only if it has no abstract methods' }
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
  },
  {
    id: 'q2',
    question: 'Which of the following is immutable in Java?',
    options: [
      { id: 'a', text: 'String' },
      { id: 'b', text: 'StringBuilder' },
      { id: 'c', text: 'StringBuffer' },
      { id: 'd', text: 'All of the above' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'q3',
    question: 'What does Java use when passing arguments to methods?',
    options: [
      { id: 'a', text: 'Pass-by-reference' },
      { id: 'b', text: 'Pass-by-value' },
      { id: 'c', text: 'Both, depending on the argument type' },
      { id: 'd', text: 'Neither' }
    ],
    correctAnswer: 'b'
  }
];

// Interview questions
const interviewQuestions = {
  'day1-2': [
    'What is the difference between JDK, JRE, and JVM?',
    'Why is Java platform-independent?',
    'Explain Java\'s memory management process.',
    'What is Just-In-Time (JIT) Compiler?',
    'How does JVM load and execute a Java class?',
    'What is the difference between stack and heap memory in Java?',
    'How does memory management differ between stack and heap in Java?',
    'Why is the main method in Java declared as public static void main(String[] args)?',
    'What is the purpose of the void keyword in Java?',
    'Explain the different access modifiers available in Java.'
  ],
  'day3-5': [
    'Explain Encapsulation with an example.',
    'How does Java implement Multiple Inheritance?',
    'What is the difference between Overloading and Overriding?',
    'Can a constructor be Overloaded?',
    'What is the use of the super keyword in Java?',
    'What is the purpose of the static keyword in Java?',
    'What is the difference between an abstract class and a concrete class?',
    'Can a final class be inherited?',
    'What happens if you try to reassign a final variable?'
  ],
  'day6-7': [
    'What is the difference between Checked & Unchecked Exceptions?',
    'Can you have multiple catch blocks?',
    'How does finally block work?',
    'What is the difference between pass-by-value and pass-by-reference? How does Java handle this concept?',
    'What will happen if you modify an object\'s state inside a method?',
    'What is the difference between String, StringBuffer, and StringBuilder?',
    'Why is String immutable in Java?'
  ]
};

// Code samples
const codeSamples = {
  'day1-2': {
    basics: `// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
    stackHeap: `public class MemoryExample {
    public static void main(String[] args) {
        int num = 5;  // Stored in Stack
        Person person = new Person(); // Reference in Stack, Person object in Heap
    }
}

class Person {
    String name = "John"; // Field stored in Heap
}`,
    mainMethod: `public class MainMethodExample {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Using command line arguments
        for(int i = 0; i < args.length; i++) {
            System.out.println("Argument " + i + ": " + args[i]);
        }
    }
}`,
    voidMethod: `public class VoidExample {
    public static void main(String[] args) {
        printMessage("Hello");
    }

    public static void printMessage(String message) {
        System.out.println(message); // No return value
    }
}`,
    accessModifiers: `public class AccessModifiersExample {
    public String publicVar = "Public Variable";
    private String privateVar = "Private Variable";
    protected String protectedVar = "Protected Variable";
    String defaultVar = "Default Variable"; // Package-private

    public static void main(String[] args) {
        AccessModifiersExample obj = new AccessModifiersExample();
        System.out.println(obj.publicVar);
    }
}`,
    stringImmutability: `public class ImmutableStringExample {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = str1; // Both reference same String object
        
        str1 = str1.concat(" World"); // Creates a new String object
        
        System.out.println("str1: " + str1);  // "Hello World"
        System.out.println("str2: " + str2);  // "Hello" (unchanged)
    }
}`
  },
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
}`,
    staticKeyword: `class StaticExample {
    static int staticVariable = 10;
    static void staticMethod() {
        System.out.println("Inside staticMethod: staticVariable = " + staticVariable);
    }
}

public class StaticKeywordExample {
    public static void main(String[] args) {
        System.out.println("Static variable: " + StaticExample.staticVariable);
        StaticExample.staticMethod(); // Can call without creating object
    }
}`,
    abstractKeyword: `abstract class AbstractExample {
    abstract void abstractMethod(); // Abstract method - no implementation
    
    // Concrete method in abstract class
    void concreteMethod() {
        System.out.println("Concrete method in abstract class");
    }
}

class ConcreteExample extends AbstractExample {
    // Must implement all abstract methods
    void abstractMethod() {
        System.out.println("Implementation of abstract method");
    }
}

public class AbstractKeywordExample {
    public static void main(String[] args) {
        // AbstractExample abstract = new AbstractExample(); // Error: Cannot instantiate
        ConcreteExample concrete = new ConcreteExample();
        concrete.abstractMethod();
        concrete.concreteMethod();
    }
}`,
    finalKeyword: `class FinalExample {
    final int finalVariable = 20; // Cannot be reassigned
    
    final void finalMethod() { // Cannot be overridden
        System.out.println("Inside finalMethod: finalVariable = " + finalVariable);
    }
}

final class FinalClass { // Cannot be extended
    void display() {
        System.out.println("Inside final class");
    }
}

public class FinalKeywordExample {
    public static void main(String[] args) {
        FinalExample finalExample = new FinalExample();
        System.out.println("Final variable: " + finalExample.finalVariable);
        finalExample.finalMethod();
        
        FinalClass finalClass = new FinalClass();
        finalClass.display();
    }
}`
  },
  'day6-7': {
    exceptionHandling: `try {
    int num = 10 / 0; // Throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("Execution Completed.");
}`,
    passByValue: `public class PassByValueExample {
    public static void main(String[] args) {
        int num = 10;
        System.out.println("Before calling modifyValue: num = " + num);
        
        // Passing a primitive type (int) by value
        modifyValue(num);
        
        System.out.println("After calling modifyValue: num = " + num);
        
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("Before calling modifyReference: sb = " + sb);
        
        // Passing an object (StringBuilder) by value (passing reference by value)
        modifyReference(sb);
        
        System.out.println("After calling modifyReference: sb = " + sb);
    }
    
    public static void modifyValue(int num) {
        num += 5; // Changes only the local copy
        System.out.println("Inside modifyValue: num = " + num);
    }
    
    public static void modifyReference(StringBuilder sb) {
        sb.append(" World"); // Modifies the actual object
        System.out.println("Inside modifyReference: sb = " + sb);
    }
}`,
    stringClasses: `public class StringExample {
    public static void main(String[] args) {
        // String Example (Immutable)
        String str = "Hello";
        str = str + " World";  // Creates a new String object
        System.out.println("Modified String: " + str);

        // StringBuffer Example (Mutable, Thread-safe)
        StringBuffer stringBuffer = new StringBuffer("Hello");
        stringBuffer.append(" World");
        System.out.println("Modified StringBuffer: " + stringBuffer);

        // StringBuilder Example (Mutable, Not Thread-safe)
        StringBuilder stringBuilder = new StringBuilder("Hello");
        stringBuilder.append(" World");
        System.out.println("Modified StringBuilder: " + stringBuilder);
    }
}`
  }
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
    { id: 'bytecode', title: 'Understanding Bytecode', completed: false },
    { id: 'stack-heap', title: 'Stack vs Heap Memory', completed: false },
    { id: 'main-method', title: 'Main Method in Java', completed: false },
    { id: 'void-type', title: 'Void Type in Java', completed: false },
    { id: 'access-modifiers', title: 'Access Modifiers', completed: false },
    { id: 'string-immutability', title: 'String Immutability', completed: false }
  ],
  'day3-5': [
    { id: 'oop-intro', title: 'OOP Principles Overview', completed: false },
    { id: 'encapsulation', title: 'Encapsulation', completed: false },
    { id: 'inheritance', title: 'Inheritance', completed: false },
    { id: 'polymorphism', title: 'Polymorphism', completed: false },
    { id: 'abstraction', title: 'Abstraction', completed: false },
    { id: 'static-keyword', title: 'Static Keyword', completed: false },
    { id: 'abstract-keyword', title: 'Abstract Keyword', completed: false },
    { id: 'final-keyword', title: 'Final Keyword', completed: false }
  ],
  'day6-7': [
    { id: 'exception-types', title: 'Types of Exceptions', completed: false },
    { id: 'try-catch', title: 'try-catch-finally', completed: false },
    { id: 'custom-exceptions', title: 'Custom Exceptions', completed: false },
    { id: 'pass-by-value', title: 'Java as Pass-by-Value Language', completed: false },
    { id: 'string-classes', title: 'String, StringBuffer & StringBuilder', completed: false }
  ]
};

const CourseContentPage = () => {
  const [selectedDay, setSelectedDay] = useState('day1-2');
  const [topics, setTopics] = useState(initialTopics);
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{[key: string]: boolean}>({});
  const [quizResults, setQuizResults] = useState<{[key: string]: boolean}>({});
  const [activeTab, setActiveTab] = useState('theory');
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedTopics = localStorage.getItem('javaTopics');
    const savedQuizAnswers = localStorage.getItem('javaQuizAnswers');
    const savedQuizSubmitted = localStorage.getItem('javaQuizSubmitted');
    const savedQuizResults = localStorage.getItem('javaQuizResults');
    
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
    
    if (savedQuizAnswers) {
      setQuizAnswers(JSON.parse(savedQuizAnswers));
    }
    
    if (savedQuizSubmitted) {
      setQuizSubmitted(JSON.parse(savedQuizSubmitted));
    }
    
    if (savedQuizResults) {
      setQuizResults(JSON.parse(savedQuizResults));
    }
  }, []);
  
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
    
    setQuizAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: answerId
      };
      
      localStorage.setItem('javaQuizAnswers', JSON.stringify(newAnswers));
      
      return newAnswers;
    });
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
    
    const newQuizResults = {...quizResults, ...results};
    const newQuizSubmitted = {...quizSubmitted, [selectedDay]: true};
    
    setQuizResults(newQuizResults);
    setQuizSubmitted(newQuizSubmitted);
    
    localStorage.setItem('javaQuizResults', JSON.stringify(newQuizResults));
    localStorage.setItem('javaQuizSubmitted', JSON.stringify(newQuizSubmitted));
    
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
    const newQuizAnswers = {...quizAnswers};
    getCurrentQuiz().forEach(question => {
      delete newQuizAnswers[question.id];
    });
    
    const newQuizSubmitted = {...quizSubmitted, [selectedDay]: false};
    const newQuizResults = {...quizResults};
    getCurrentQuiz().forEach(question => {
      delete newQuizResults[question.id];
    });
    
    setQuizAnswers(newQuizAnswers);
    setQuizSubmitted(newQuizSubmitted);
    setQuizResults(newQuizResults);
    
    localStorage.setItem('javaQuizAnswers', JSON.stringify(newQuizAnswers));
    localStorage.setItem('javaQuizSubmitted', JSON.stringify(newQuizSubmitted));
    localStorage.setItem('javaQuizResults', JSON.stringify(newQuizResults));
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
        <div className="bg-gradient-to-r from-java/20 to-java/5 py-8">
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
            <h1 className="text-3xl md:text-4xl font-bold java-text-gradient">Week 1: Core Java Fundamentals</h1>
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
                <Card className="border-java/20 shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4 text-java">Week 1 Schedule</h3>
                    <div className="space-y-2">
                      <Button 
                        variant={selectedDay === 'day1-2' ? 'default' : 'outline'} 
                        className={`w-full justify-start ${selectedDay === 'day1-2' ? 'bg-java hover:bg-java-dark' : ''}`}
                        onClick={() => setSelectedDay('day1-2')}
                      >
                        <span className="flex items-center gap-2">
                          Day 1-2: Java Basics
                          {calculateProgress() === 100 && selectedDay === 'day1-2' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </span>
                      </Button>
                      <Button 
                        variant={selectedDay === 'day3-5' ? 'default' : 'outline'} 
                        className={`w-full justify-start ${selectedDay === 'day3-5' ? 'bg-java hover:bg-java-dark' : ''}`}
                        onClick={() => setSelectedDay('day3-5')}
                      >
                        <span className="flex items-center gap-2">
                          Day 3-5: OOP
                          {calculateProgress() === 100 && selectedDay === 'day3-5' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </span>
                      </Button>
                      <Button 
                        variant={selectedDay === 'day6-7' ? 'default' : 'outline'} 
                        className={`w-full justify-start ${selectedDay === 'day6-7' ? 'bg-java hover:bg-java-dark' : ''}`}
                        onClick={() => setSelectedDay('day6-7')}
                      >
                        <span className="flex items-center gap-2">
                          Day 6-7: Exceptions
                          {calculateProgress() === 100 && selectedDay === 'day6-7' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Progress */}
                <Card className="border-java/20 shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4 text-java">Your Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-medium">{getDayTitle()}</span>
                          <span className="text-java font-bold">{Math.round(calculateProgress())}%</span>
                        </div>
                        <Progress value={calculateProgress()} className="h-2 bg-gray-200" indicatorClassName="bg-java" />
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="font-medium text-sm mb-2">Topics:</h4>
                        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                          {topics[selectedDay]?.map(topic => (
                            <div key={topic.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={topic.id} 
                                checked={topic.completed}
                                onCheckedChange={() => toggleTopic(topic.id)}
                                className={topic.completed ? "bg-java border-java" : ""}
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
              <h2 className="text-2xl font-bold mb-6 text-java">{getDayTitle()}</h2>
              
              <Tabs defaultValue="theory" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8 bg-secondary/70">
                  <TabsTrigger value="theory" className="flex items-center gap-1 data-[state=active]:bg-java data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Theory</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-1 data-[state=active]:bg-java data-[state=active]:text-white">
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="interview" className="flex items-center gap-1 data-[state=active]:bg-java data-[state=active]:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Interview</span>
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="flex items-center gap-1 data-[state=active]:bg-java data-[state=active]:text-white">
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline">Quiz</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Theory Content */}
                <TabsContent value="theory" className="space-y-6">
                  {selectedDay === 'day1-2' && (
                    <>
                      <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-java">What is Java?</h3>
                        <p>
                          Java is a <strong>high-level, class-based, object-oriented programming language</strong> developed by <strong>Sun Microsystems</strong> (now owned by <strong>Oracle</strong>).
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Official Documentation: <a href="https://docs.oracle.com/en/java/javase/17/" className="text-java underline hover:no-underline" target="_blank" rel="noopener noreferrer">Java SE Docs</a>
                        </p>
                        
                        <div className="bg-secondary/50 p-4 rounded-md border border-java/10 mt-4">
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
                        <h3 className="text-xl font-semibold text-java">Java Architecture (JVM, JDK, JRE)</h3>
                        <p>
                          <strong>JDK (Java Development Kit)</strong> → For developing Java applications (Includes Compiler, JRE, and Tools)<br />
                          <strong>JRE (Java Runtime Environment)</strong> → Required to run Java programs (Includes JVM)<br />
                          <strong>JVM (Java Virtual Machine)</strong> → Converts Java bytecode to machine code
                        </p>
                        
                        <div className="bg-secondary/50 p-4 rounded-md border border-java/10 mt-4">
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

                      <Accordion type="single" collapsible className="w-full rounded-md border border-java/10 shadow-sm">
                        <AccordionItem value="stack-heap" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Difference Between Stack and Heap Memory
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <div>
                              <h5 className="font-semibold">Stack Memory:</h5>
                              <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>Stores method invocation information, local variables, and references to objects.</li>
                                <li>Each thread has its own stack.</li>
                                <li>Follows Last In, First Out (LIFO) order for memory allocation and deallocation.</li>
                                <li>Limited in size. A StackOverflowError occurs when the stack is full.</li>
                                <li>Memory is automatically managed. Variables are removed when their method finishes execution.</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold">Heap Memory:</h5>
                              <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>Used for dynamic memory allocation where objects are stored.</li>
                                <li>Shared by all threads in the program.</li>
                                <li>Managed by garbage collection to reclaim unused memory.</li>
                                <li>Typically larger and slower to access compared to stack memory.</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="main-method" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Main Method in Java: public static void main(String[] args)
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <ul className="list-disc pl-5 space-y-2">
                              <li><strong>public:</strong> Makes the method accessible from outside the class.</li>
                              <li><strong>static:</strong> The method is called without needing an instance of the class.</li>
                              <li><strong>void:</strong> The method does not return a value.</li>
                              <li><strong>String[] args:</strong> Array to accept command-line arguments.</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="void-type" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Void Type in Java
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground">
                            <p>The void type means that a method doesn't return any value. It indicates that the method performs some action but doesn't need to return anything to the caller.</p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="access-modifiers" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Access Modifiers in Java
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <ul className="list-disc pl-5 space-y-2">
                              <li><strong>Public:</strong> Accessible from anywhere.</li>
                              <li><strong>Private:</strong> Accessible only within the same class.</li>
                              <li><strong>Protected:</strong> Accessible within the same package and by subclasses.</li>
                              <li><strong>Default (Package-Private):</strong> Accessible only within the same package.</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="string-immutability" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            String Immutability
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <p>A String in Java is immutable, meaning its state cannot be modified after creation. This is beneficial for:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li><strong>Thread safety:</strong> Immutable objects don't need synchronization.</li>
                              <li><strong>Memory efficiency:</strong> String literals are stored in the string pool.</li>
                              <li><strong>Security:</strong> Immutable strings are safer in sensitive scenarios.</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </>
                  )}
                  
                  {selectedDay === 'day3-5' && (
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-java">OOP Principles in Java</h3>
                      <p>
                        Java follows <strong>four core OOP principles:</strong>
                      </p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="encapsulation" className="border rounded-md px-4 mb-4 shadow-sm border-java/10">
                          <AccordionTrigger className="hover:no-underline text-lg font-medium text-java hover:text-java-dark">Encapsulation – Wrapping data & methods in a single unit</AccordionTrigger>
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
                        
                        <AccordionItem value="inheritance" className="border rounded-md px-4 mb-4 shadow-sm border-java/10">
                          <AccordionTrigger className="hover:no-underline text-lg font-medium text-java hover:text-java-dark">Inheritance – One class acquiring properties of another</AccordionTrigger>
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
                        
                        <AccordionItem value="polymorphism" className="border rounded-md px-4 mb-4 shadow-sm border-java/10">
                          <AccordionTrigger className="hover:no-underline text-lg font-medium text-java hover:text-java-dark">Polymorphism – Many forms (Overloading & Overriding)</AccordionTrigger>
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
                        
                        <AccordionItem value="abstraction" className="border rounded-md px-4 mb-4 shadow-sm border-java/10">
                          <AccordionTrigger className="hover:no-underline text-lg font-medium text-java hover:text-java-dark">Abstraction – Hiding implementation details</AccordionTrigger>
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

                      <Accordion type="single" collapsible className="w-full rounded-md border border-java/10 shadow-sm mt-6">
                        <AccordionItem value="static-keyword" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Static Keyword
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <p>Used for class-level variables and methods. A static member belongs to the class itself rather than to any instance.</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Static variables are shared among all instances of a class</li>
                              <li>Static methods can be called without creating an object</li>
                              <li>Static blocks are executed when the class is loaded</li>
                              <li>Cannot access non-static members directly from static context</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="abstract-keyword" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Abstract Keyword
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <p>Used to declare classes and methods that must be implemented by subclasses. Abstract classes cannot be instantiated directly.</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Abstract methods have no implementation</li>
                              <li>A class with at least one abstract method must be declared abstract</li>
                              <li>Abstract classes can have both abstract and concrete methods</li>
                              <li>Subclasses must implement all abstract methods unless they are also abstract</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="final-keyword" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Final Keyword
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <p>Used to restrict modifications:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li><strong>Final variables:</strong> Cannot be reassigned after initialization</li>
                              <li><strong>Final methods:</strong> Cannot be overridden in subclasses</li>
                              <li><strong>Final classes:</strong> Cannot be extended (subclassed)</li>
                            </ul>
                            <p>Final variables must be initialized when declared or in the constructor.</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </section>
                  )}
                  
                  {selectedDay === 'day6-7' && (
                    <section className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-java mb-4">Exception Handling in Java</h3>
                        
                        <div className="bg-secondary/50 p-4 rounded-md border border-java/10">
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
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">try-catch-finally Example</h4>
                        <p className="mb-3">
                          The try-catch-finally statement is used to handle exceptions in Java. The try block contains code that might throw an exception. The catch block contains code that handles the exception. The finally block contains code that is always executed, regardless of whether an exception is thrown or not.
                        </p>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                          <pre className="text-sm overflow-x-auto">{codeSamples['day6-7'].exceptionHandling}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Custom Exceptions</h4>
                        <p>
                          You can create your own exceptions by extending the Exception class or any of its subclasses.
                        </p>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md mt-3 border border-java/10">
                          <pre className="text-sm overflow-x-auto">{`// Custom exception
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

                      <Accordion type="single" collapsible className="w-full rounded-md border border-java/10 shadow-sm">
                        <AccordionItem value="pass-by-value" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            Java Pass-by-Value Language
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <p>Java is a strictly pass-by-value language. When arguments are passed to a method, the values of the arguments are copied into the method parameters.</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li><strong>Primitive types:</strong> The actual value is passed. Changes made to the value in the method do not affect the original variable.</li>
                              <li><strong>Object references:</strong> The reference to the object is passed by value, meaning a copy of the reference is passed. Changes to the object's internal state can be reflected outside, but reassigning the reference inside the method will not affect the original reference.</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="string-classes" className="px-4">
                          <AccordionTrigger className="text-lg font-medium text-java hover:no-underline hover:text-java-dark py-4">
                            String, StringBuffer, and StringBuilder
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-muted-foreground space-y-3">
                            <ul className="list-disc pl-5 space-y-2">
                              <li><strong>String:</strong> Immutable. Once created, the value cannot be changed. It's thread-safe and uses more memory when modified repeatedly because it creates a new string object each time.</li>
                              <li><strong>StringBuffer:</strong> Mutable and thread-safe. It is synchronized, making it safer for use in multi-threaded environments but slower than StringBuilder.</li>
                              <li><strong>StringBuilder:</strong> Mutable but not thread-safe. It is faster than StringBuffer in single-threaded environments.</li>
                            </ul>
                            <p><strong>When to use:</strong></p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Use String for simple text that doesn't change often</li>
                              <li>Use StringBuffer for thread-safe string manipulations</li>
                              <li>Use StringBuilder for better performance in single-threaded environments</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </section>
                  )}
                </TabsContent>
                
                {/* Code Examples */}
                <TabsContent value="code" className="space-y-6">
                  {selectedDay === 'day1-2' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-java mb-4">Your First Java Program</h3>
                        <div className="bg-secondary/30 p-4 rounded-md mb-4 border border-java/10">
                          <p className="font-medium mb-2">Task: Write a simple Java program and compile it manually.</p>
                        </div>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                          <pre className="text-sm overflow-x-auto">{codeSamples['day1-2'].basics}</pre>
                        </div>
                        <div className="mt-4 bg-secondary/30 p-4 rounded-md border border-java/10">
                          <p className="font-medium mb-2">Steps to Run:</p>
                          <pre className="bg-secondary/70 dark:bg-secondary/30 p-2 rounded text-sm overflow-x-auto">
                            {`javac HelloWorld.java   # Compiling Java File
java HelloWorld         # Running the Program`}
                          </pre>
                        </div>
                      </div>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Stack vs Heap Memory Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day1-2'].stackHeap}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Main Method Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day1-2'].mainMethod}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Void Method Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day1-2'].voidMethod}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Access Modifiers Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day1-2'].accessModifiers}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">String Immutability Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day1-2'].stringImmutability}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                  
                  {selectedDay === 'day3-5' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-java mb-4">Encapsulation Example</h3>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                          <pre className="text-sm overflow-x-auto">{codeSamples['day3-5'].encapsulation}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-java mb-4">Inheritance Example</h3>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                          <pre className="text-sm overflow-x-auto">{codeSamples['day3-5'].inheritance}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-java mb-4">Polymorphism Example (Overloading & Overriding)</h3>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                          <pre className="text-sm overflow-x-auto">{codeSamples['day3-5'].polymorphism}</pre>
                        </div>
                      </div>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Static Keyword Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day3-5'].staticKeyword}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Abstract Keyword Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day3-5'].abstractKeyword}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Final Keyword Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day3-5'].finalKeyword}</pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                  
                  {selectedDay === 'day6-7' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-java mb-4">Exception Handling Example</h3>
                        <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                          <pre className="text-sm overflow-x-auto">{codeSamples['day6-7'].exceptionHandling}</pre>
                        </div>
                        
                        <div className="mt-6 p-4 bg-secondary/30 rounded-md border border-java/10">
                          <h4 className="font-medium mb-2">Expected Output:</h4>
                          <pre className="bg-secondary/70 dark:bg-secondary/30 p-2 rounded text-sm">
                            {`Cannot divide by zero!
Execution Completed.`}
                          </pre>
                        </div>
                      </div>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">Pass-by-Value Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day6-7'].passByValue}</pre>
                          </div>
                          <div className="mt-4 p-4 bg-secondary/30 rounded-md border border-java/10">
                            <h4 className="font-medium mb-2">Expected Output:</h4>
                            <pre className="bg-secondary/70 dark:bg-secondary/30 p-2 rounded text-sm">
                              {`Before calling modifyValue: num = 10
Inside modifyValue: num = 15
After calling modifyValue: num = 10
Before calling modifyReference: sb = Hello
Inside modifyReference: sb = Hello World
After calling modifyReference: sb = Hello World`}
                            </pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="w-full border rounded-md shadow-sm">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 font-medium text-left border-b focus:outline-none">
                          <span className="text-lg font-medium text-java">String, StringBuffer, and StringBuilder Example</span>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4">
                          <div className="bg-secondary/70 dark:bg-secondary/30 p-4 rounded-md border border-java/10">
                            <pre className="text-sm overflow-x-auto">{codeSamples['day6-7'].stringClasses}</pre>
                          </div>
                          <div className="mt-4 p-4 bg-secondary/30 rounded-md border border-java/10">
                            <h4 className="font-medium mb-2">Expected Output:</h4>
                            <pre className="bg-secondary/70 dark:bg-secondary/30 p-2 rounded text-sm">
                              {`Modified String: Hello World
Modified StringBuffer: Hello World
Modified StringBuilder: Hello World`}
                            </pre>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                </TabsContent>
                
                {/* Interview Questions */}
                <TabsContent value="interview" className="space-y-6">
                  <div className="bg-secondary/30 p-4 rounded-md mb-6 border border-java/10">
                    <h3 className="font-semibold mb-2 text-java">Interview Questions for {getDayTitle()}</h3>
                    <p className="text-muted-foreground text-sm">
                      Practice these questions to prepare for your Java interview. They range from beginner to advanced level.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {interviewQuestions[selectedDay]?.map((question, index) => (
                      <Accordion key={index} type="single" collapsible className="w-full border rounded-md shadow-sm">
                        <AccordionItem value={`item-${index}`} className="border-none">
                          <AccordionTrigger className="px-4 hover:no-underline text-left">
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
                                      class Student {"{"}<br />
                                      &nbsp;&nbsp;private String name; // private variable<br />
                                      &nbsp;&nbsp;public String getName() {"{"} return name; {"}"} // getter<br />
                                      &nbsp;&nbsp;public void setName(String name) {"{"} this.name = name; {"}"} // setter<br />
                                      {"}"}
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
                                    Click to see complete answer... (Full answers are available in a complete course)
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
                  <div className="bg-secondary/30 p-4 rounded-md mb-6 border border-java/10">
                    <h3 className="font-semibold mb-2 text-java">Quiz: {getDayTitle()}</h3>
                    <p className="text-muted-foreground text-sm">
                      Test your knowledge of the concepts covered in this section.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {getCurrentQuiz().map((question, index) => (
                      <div key={question.id} className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-java text-white text-sm shrink-0">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">{question.question.split('\n')[0]}</p>
                            {question.question.includes('\n') && (
                              <div className="bg-secondary/70 dark:bg-secondary/30 p-3 rounded-md mt-2 border border-java/10">
                                <pre className="text-sm overflow-x-auto">{question.question.split('\n').slice(1).join('\n')}</pre>
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
                          className="bg-java hover:bg-java-dark text-white"
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

export default CourseContentPage;
