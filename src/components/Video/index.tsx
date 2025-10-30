"use client";

import VideoModal from "@/components/video-modal";
import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

export default function Video() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section className="relative z-10 py-0 md:py-0 lg:py-0">
        <div className="container [&_h2]:!text-team">
          <SectionTitle
            title="Our Team"
            paragraph="The team contains skilled developers based in Tunisia."
            center
            mb="80px"
            
  
          />
        </div>
        
        <div className="w-full px-4 sm:w-1/2 lg:w-1/4">
      <div className="group mb-10 rounded-lg border-b-4 border-transparent bg-gray-700 p-4 text-center transition-all hover:border-primary dark:bg-navcol">
        <div className="mb-6 overflow-hidden rounded-sm">
          <Image
            src="/images/landing/Oussema.jpg"
            alt="Oussema Dammak"
            width={266}
            height={208}
            className="w-full rounded-sm"
          />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white dark:text-white">
            Oussema Dammak
          </h3>
          <p className="mb-4 text-sm font-medium text-gray-300 dark:text-gray-300">
            Backend Developer
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://linkedin.com/in/oussemadammak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-primary dark:text-white dark:hover:text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.064-1.867-3.064-1.869 0-2.154 1.459-2.154 2.969v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.562 2.839-1.562 3.036 0 3.6 2.001 3.6 4.6v5.595z"/>
              </svg>
            </a>
            {/* External link */}
            <a
              href="https://oussema-dammak.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="External"
              className="text-gray-400 hover:text-primary dark:text-white dark:hover:text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <path d="M14 3h7v7h-2v-4.586l-9.293 9.293-1.414-1.414 9.293-9.293h-4.586v-2zm-4 4h-6c-1.104 0-2 .896-2 2v10c0 1.105.896 2 2 2h10c1.104 0 2-.895 2-2v-6h-2v6h-10v-10h6v-2z"/>
              </svg>
            </a>
            {/* Add other social SVGs similarly */}
          </div>
        </div>
      </div>
    </div>
        
      </section>

      <VideoModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        channel="youtube"
        videoId="L61p2uyiMSo"
      />
    </>
  );
};
