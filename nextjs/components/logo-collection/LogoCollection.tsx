import React from "react";

export interface Logo {
  name: string;
  media: React.ReactNode;
}

export interface LogoCollectionProps {
  title: string;
  logos: Logo[];
}

export default function LogoCollection({ title, logos }: LogoCollectionProps) {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0 md:w-1/5 md:pr-4 md:flex-shrink-0">
            {title}
          </h2>
          <div className="flex flex-wrap justify-start md:justify-end items-center gap-4 md:gap-8 md:w-5/6">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center">
                {React.isValidElement(logo.media) && (
                  React.cloneElement(logo.media as React.ReactElement, {
                    className: "max-w-[120px] h-auto",
                  })
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
