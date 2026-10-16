import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import WhyUs from './components/WhyUs';
import Trainers from './components/Trainers';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  // Re-run scroll reveal on route change (if ever needed)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <WhyUs />
        <Trainers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
