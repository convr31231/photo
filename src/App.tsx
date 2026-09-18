import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { BookingProvider, CursorProvider } from './hooks/useAppContext';
import { Hero } from './sections/Hero';
import { StudioIntro } from './sections/StudioIntro';
import { StudioRooms } from './sections/StudioRooms';
import { BeforeAfter } from './sections/BeforeAfter';
import { Portfolio } from './sections/Portfolio';
import { Services } from './sections/Services';
import { Prices } from './sections/Prices';
import { Booking, BookingSection } from './sections/Booking';
import { Reviews } from './sections/Reviews';
import { FAQ } from './sections/FAQ';
import { Blog } from './sections/Blog';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function AppShell() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 300 : 1400;
    const hideId = window.setTimeout(() => {
      setReady(true);
      setShowLoader(false);
    }, duration);
    return () => window.clearTimeout(hideId);
  }, []);

  return (
    <>
      {showLoader ? <Preloader /> : null}
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main>
        <Hero ready={ready} />
        <StudioIntro />
        <StudioRooms />
        <BeforeAfter />
        <Portfolio />
        <Services />
        <Prices />
        <BookingSection />
        <Reviews />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <Booking />
    </>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <BookingProvider>
        <AppShell />
      </BookingProvider>
    </CursorProvider>
  );
}
