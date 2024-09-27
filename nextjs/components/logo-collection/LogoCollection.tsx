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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8">
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            {title}
          </h2>
          {logos.map((logo) => (
            <div key={logo.name} className="max-w-24">
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
