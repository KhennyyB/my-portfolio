import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import LoadingBlock from "@/components/LoadingBlock";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
    const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    let tries = 0;
    const maxTries = 20;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries < maxTries) {
        tries += 1;
        setTimeout(tryScroll, 50);
      }
    };
    // give router a tick to switch routes first
    setTimeout(tryScroll, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Ekene Okoli | Data Analyst - Excel, SQL, Power BI Expert</title>
        <meta
          name="description"
          content="Ekene Okoli is a Data Analyst with 3+ years of experience in Excel, SQL, and Power BI. Transforming data into actionable insights for business decisions."
        />
        <meta name="keywords" content="Data Analyst, Excel, SQL, Power BI, Data Visualization, Business Intelligence, Lagos, Nigeria" />
        <meta name="author" content="Ekene Okoli" />
        <meta property="og:title" content="Ekene Okoli | Data Analyst Portfolio" />
        <meta property="og:description" content="Data Analyst with expertise in Excel, SQL, and Power BI. Transforming complex data into actionable business insights." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ekene Okoli | Data Analyst" />
        <meta name="twitter:description" content="Data Analyst with expertise in Excel, SQL, and Power BI." />
        <link rel="canonical" href="https://ekene.dev" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <HeroSection />

          <Suspense fallback={<LoadingBlock label="Loading about…" />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<LoadingBlock label="Loading skills…" />}>
            <SkillsSection />
          </Suspense>

          <Suspense fallback={<LoadingBlock label="Loading projects…" />}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={<LoadingBlock label="Loading contact…" />}>
            <ContactSection />
          </Suspense>
        </main>

        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;