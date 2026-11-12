import { useEffect, useState } from 'react';
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import About            from './components/About';
import Courses          from './components/Courses';
import OnlineClasses    from './components/OnlineClasses';
import VideoSection     from './components/VideoSection';
import WhyUs            from './components/WhyUs';
import Trainers         from './components/Trainers';
import TeachingStaff    from './components/TeachingStaff';
import Achievements     from './components/Achievements';
import Testimonials     from './components/Testimonials';
import Contact          from './components/Contact';
import Footer           from './components/Footer';
import WhatsAppBtn      from './components/WhatsAppBtn';
import AdminLogin       from './components/AdminLogin';
import AdminDashboard   from './components/AdminDashboard';
import { useScrollReveal } from './hooks/useScrollReveal';

// ── Detect admin route (/admin path) ───────────────────────
function useAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(
    () => window.location.pathname === '/admin'
  );
  useEffect(() => {
    const onPop = () => setIsAdmin(window.location.pathname === '/admin');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return isAdmin;
}

// ── Public website ─────────────────────────────────────────
function PublicSite() {
  useScrollReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Khaki Academy – Learn Today. Lead Tomorrow. | Malur, Karnataka';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content',
        'Khaki Academy, Malur — Academy of Excellence offering School Tuition, PUC Science & Commerce, Spoken English, Computer Training, and CET/NEET/JEE Foundation courses. Offline & Live Online.'
      );
    }
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <OnlineClasses />
        <VideoSection />
        <WhyUs />
        <Trainers />
        <TeachingStaff />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}

// ── Admin panel ────────────────────────────────────────────
function AdminPanel() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem('ka_admin_authenticated') || ''
  );

  useEffect(() => {
    document.title = 'Admin Dashboard · Khaki Academy';
  }, []);

  const handleLogin = () => setToken('authenticated');

  const handleLogout = () => {
    sessionStorage.removeItem('ka_admin_authenticated');
    fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
    setToken('');
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard onLogout={handleLogout} />;
}

// ── Root ───────────────────────────────────────────────────
export default function App() {
  const isAdmin = useAdminRoute();
  return isAdmin ? <AdminPanel /> : <PublicSite />;
}
