
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, BarChart2, Award } from 'lucide-react';

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('javaJourneyProgress');
    const savedModules = localStorage.getItem('javaJourneyCompletedModules');
    
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }
    
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules));
    }
  }, []);
  
  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('javaJourneyProgress', progress.toString());
    localStorage.setItem('javaJourneyCompletedModules', JSON.stringify(completedModules));
  }, [progress, completedModules]);
  
  const modules = [
    "Java Basics",
    "Object-Oriented Programming",
    "Flow Control & Exceptions",
    "Multithreading",
    "Collections & Generics",
    "I/O Operations"
  ];
  
  const toggleModule = (module: string) => {
    if (completedModules.includes(module)) {
      // Remove module from completed list
      const newModules = completedModules.filter(m => m !== module);
      setCompletedModules(newModules);
      setProgress(Math.round((newModules.length / modules.length) * 100));
    } else {
      // Add module to completed list
      const newModules = [...completedModules, module];
      setCompletedModules(newModules);
      setProgress(Math.round((newModules.length / modules.length) * 100));
    }
  };
  
  const resetProgress = () => {
    setProgress(0);
    setCompletedModules([]);
    localStorage.removeItem('javaJourneyProgress');
    localStorage.removeItem('javaJourneyCompletedModules');
  };
  
  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-java" />
          <h3 className="font-bold text-lg">Your Learning Progress</h3>
        </div>
        {progress === 100 && (
          <div className="flex items-center gap-1 text-java">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium">Completed!</span>
          </div>
        )}
      </div>
      
      <Progress value={progress} className="h-2 mb-6" />
      
      <div className="text-sm text-muted-foreground mb-4">
        <span className="font-medium">{progress}% complete</span> - {completedModules.length} of {modules.length} modules
      </div>
      
      <div className="space-y-2 mb-6">
        {modules.map((module, index) => {
          const isCompleted = completedModules.includes(module);
          return (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-md transition-colors
                ${isCompleted 
                  ? 'bg-secondary/70 dark:bg-secondary/30' 
                  : 'bg-secondary/30 dark:bg-secondary/10 hover:bg-secondary/50 dark:hover:bg-secondary/20'
                }
              `}
              onClick={() => toggleModule(module)}
              role="button"
              tabIndex={0}
            >
              <span className={isCompleted ? 'text-java font-medium' : ''}>{module}</span>
              <div className={`flex items-center justify-center h-5 w-5 rounded-full ${isCompleted ? 'bg-java text-white' : 'bg-secondary border'}`}>
                {isCompleted && <Check className="h-3 w-3" />}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={resetProgress}>
          Reset Progress
        </Button>
      </div>
    </div>
  );
};

export default ProgressTracker;
