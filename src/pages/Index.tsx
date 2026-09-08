import { Helmet } from "react-helmet-async";
import PortfolioExperience from "@/components/PortfolioExperience";
import CookieConsent from "@/components/CookieConsent";
import { useHashScroll } from "@/hooks/useHashScroll";

const Index = () => {
  useHashScroll();

  return (
    <>
      <Helmet>
        <title>Ekene Okoli | Data Analyst & Frontend Developer</title>
        <meta
          name="description"
          content="Ekene Okoli is a Data Analyst & Frontend Developer with 4+ years of experience in Excel, SQL, Power BI, React, and TypeScript."
        />
        <meta name="keywords" content="Data Analyst, Frontend Developer, Excel, SQL, Power BI, React, TypeScript, Tailwind CSS, Lagos, Nigeria" />
        <meta name="author" content="Ekene Okoli" />
        <meta property="og:title" content="Ekene Okoli | Data Analysis & Frontend Development Portfolio" />
        <meta property="og:description" content="Data Analyst & Frontend Developer bridging the gap between complex data and user-focused web applications. Expert in SQL, Power BI, React, and TypeScript." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ekene Okoli | Data Analyst & Frontend Developer" />
        <meta name="twitter:description" content="Data Analyst & Frontend Developer bridging the gap between complex data and user-focused web applications. Expert in SQL, Power BI, React, and TypeScript." />
        <link rel="canonical" href="https://ekene-dev.com" />
      </Helmet>

      <PortfolioExperience />
      <CookieConsent />
    </>
  );
};

export default Index;
