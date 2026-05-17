/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeroSection } from './components/HeroSection';
import { ImpactSection } from './components/ImpactSection';
import { WorksCarousel } from './components/WorksCarousel';
import { DirectorsSection } from './components/DirectorsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-black w-full flex flex-col">
      <HeroSection />
      <ImpactSection />
      <WorksCarousel />
      <DirectorsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

