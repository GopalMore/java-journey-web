
import { Clock, Book, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  description: string;
  topics: string[];
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  weekNumber: number;
  className?: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'intermediate':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
};

const CourseCard = ({ 
  title, 
  description, 
  topics, 
  duration, 
  level, 
  weekNumber,
  className 
}: CourseCardProps) => {
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getLevelColor(level))}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-java" />
              <span className="text-sm">{topic}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{duration}</span>
          <Book className="ml-4 mr-2 h-4 w-4" />
          <span>Week {weekNumber}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Start Learning</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
