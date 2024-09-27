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
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto pb-4">
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap flex-shrink-0">
            {title}
          </h2>
          {logos.map((logo) => (
            <div key={logo.name} className="flex-shrink-0 h-8 w-auto">
              {React.isValidElement(logo.media) && (
                React.cloneElement(logo.media as React.ReactElement, {
                  className: "h-full w-auto",
                })
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
