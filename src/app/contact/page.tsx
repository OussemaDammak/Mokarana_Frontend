import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Mokarana",
  description: "This is Contact Page for Mokarana",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Mokarana Team"
        description="If you encountred any issue or you have a suggestion, please reach out to us."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
