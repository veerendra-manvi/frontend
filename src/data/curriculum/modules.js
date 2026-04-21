import { 
  Coffee, 
  Layout, 
  Settings, 
  Layers, 
  Zap, 
  Circle, 
  Globe, 
  Cpu, 
  Share2, 
  FileCode, 
  Trophy 
} from 'lucide-react';

export const modules = [
  {
    id: 'basics',
    title: 'Java Basics',
    description: 'Installation, Syntax, Variables, and Data Types',
    icon: Coffee,
    difficulty: 'Beginner'
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    description: 'Conditional statements and looping structures',
    icon: Layout,
    difficulty: 'Beginner'
  },
  {
    id: 'methods',
    title: 'Methods',
    description: 'Structure, parameters, and return types',
    icon: Settings,
    difficulty: 'Intermediate'
  },
  {
    id: 'oop',
    title: 'OOP',
    description: 'The core tenets: Inheritance, Polymorphism...',
    icon: Layers,
    difficulty: 'Intermediate'
  },
  {
    id: 'exceptions',
    title: 'Exceptions',
    description: 'Runtime safety and error handling',
    icon: Zap,
    difficulty: 'Intermediate'
  },
  {
    id: 'collections',
    title: 'Collections',
    description: 'Data structures: Lists, Sets, and Maps',
    icon: Circle,
    difficulty: 'Advanced'
  },
  {
    id: 'streams',
    title: 'Streams',
    description: 'Functional programming and pipelines',
    icon: Globe,
    difficulty: 'Advanced'
  },
  {
    id: 'jvm',
    title: 'JVM',
    description: 'Memory model and internal execution',
    icon: Cpu,
    difficulty: 'Advanced'
  },
  {
    id: 'concurrency',
    title: 'Concurrency',
    description: 'Threads, locks, and parallelism',
    icon: Share2,
    difficulty: 'Expert'
  },
  {
    id: 'file-io',
    title: 'File IO',
    description: 'Working with disks and data streams',
    icon: FileCode,
    difficulty: 'Expert'
  },
  {
    id: 'advanced',
    title: 'Advanced Java',
    description: 'Reflections, JDBC, and Modular Java',
    icon: Trophy,
    difficulty: 'Expert'
  }
];
