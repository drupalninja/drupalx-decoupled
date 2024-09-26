import Image from "next/image"

export interface Logo {
  name: string;
  logo: string;
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
          {logos.map((company, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
