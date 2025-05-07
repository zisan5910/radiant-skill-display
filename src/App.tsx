
import { useState, useEffect } from 'react';
import { Element, scroller } from 'react-scroll';
import { motion } from 'framer-motion';

// Import components
import Navigation from './components/Navigation';
import FloatingMenu from './components/FloatingMenu';
import ProfileSection from './components/ProfileSection';
import CertificateSection from './components/CertificateSection';
import Courses from './components/Courses';
import Skill from './components/Skill';
import Contact from './components/Contact';
import Information from './components/Information';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import { getNavigationItems } from './components/NavigationItems';
import { content, certificates } from './data/content';

function App() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [age, setAge] = useState<number>(0);
  const navigationItems = getNavigationItems();

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date('2007-12-31');
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setAge(age);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 86400000); // Update age daily
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (section: string) => {
    scroller.scrollTo(section, {
      duration: 800,
      smooth: true,
      offset: -64,
    });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        navigationItems={navigationItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        language={language}
        setLanguage={setLanguage}
      />
      
      <InstallPWA language={language} />

      <ProfileSection 
        language={language} 
        content={content} 
        scrollToSection={scrollToSection} 
      />

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          <Element name="education">
            <Education language={language} />
          </Element>

          <Element name="courses">
            <Courses language={language} />
          </Element>

          <Element name="experience">
            <Experience language={language} />
          </Element>

          <CertificateSection 
            language={language} 
            content={content} 
            certificates={certificates} 
          />

          <Element name="skills">
            <Skill language={language} />
          </Element>

          <Element name="family">
            <Information language={language} age={age} />
          </Element>

          <Element name="contact">
            <Contact language={language} />
          </Element>
        </div>
      </main>

      <Element name="footer">
        <Footer
          language={language}
          scrollToSection={scrollToSection}
          content={content}
        />
      </Element>

      <FloatingMenu />
    </div>
  );
}

export default App;
