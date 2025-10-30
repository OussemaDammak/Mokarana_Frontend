import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About us"
        description="Mokarana is a Tunisian comparison platform, providing comparisons across various laptops. By providing accurate information in an easy-to-visualize way, we aim to simplify decision making."
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
