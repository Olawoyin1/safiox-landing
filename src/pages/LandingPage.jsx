import React from 'react';
import LandingNav from '../components/landing/LandingNav';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import DashboardTabs from '../components/landing/DashboardTabs';
import Testimonials from '../components/landing/Testimonials';
import DownloadCTAs from '../components/landing/DownloadCTAs';
import ContactSection from '../components/landing/ContactSection';
import LandingFooter from '../components/landing/LandingFooter';

const LandingPage = () => (
    <div className="font-sans text-gray-900 bg-white">
        <LandingNav />
        <Hero />
        <Features />
        <DashboardTabs />
        <Testimonials />
        <DownloadCTAs />
        <ContactSection />
        <LandingFooter />
    </div>
);

export default LandingPage;
