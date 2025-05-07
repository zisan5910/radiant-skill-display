
import {
  UserCircle,
  School,
  BookOpen,
  Briefcase,
  FileBadge,
  Code,
  HeartHandshake,
  Mail,
  Share2,
} from './icons';

export type NavigationItem = {
  id: string;
  icon: JSX.Element;
  title: string;
  target?: string;
};

export const getNavigationItems = (): NavigationItem[] => {
  return [
    {
      id: 'profile',
      icon: (
        <UserCircle
          size={22}
          className="text-indigo-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Profile',
    },
    {
      id: 'education',
      icon: (
        <School
          size={22}
          className="text-blue-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Education',
    },
    {
      id: 'courses',
      icon: (
        <BookOpen
          size={22}
          className="text-emerald-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Courses',
    },
    {
      id: 'experience',
      icon: (
        <Briefcase
          size={22}
          className="text-amber-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Experience',
    },
    {
      id: 'certificates',
      icon: (
        <FileBadge
          size={22}
          className="text-red-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Certificates',
    },
    {
      id: 'skills',
      icon: (
        <Code
          size={22}
          className="text-purple-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Skills',
    },
    {
      id: 'family',
      icon: (
        <HeartHandshake
          size={22}
          className="text-pink-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Family',
    },
    {
      id: 'contact',
      icon: (
        <Mail
          size={22}
          className="text-cyan-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Contact',
    },
    {
      id: 'share',
      icon: (
        <Share2
          size={22}
          className="text-teal-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      target: 'social-links',
      title: 'Share',
    },
  ];
};

export default getNavigationItems;
