// Client Component
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsletterProps {
  title: string;
  summary: string;
  modifier?: string;
}

export default function Newsletter({ title, summary, modifier }: NewsletterProps) {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className={`py-8 lg:py-24 ${modifier ?? 'container mx-auto px-8'}`}>
        <div className="flex flex-col lg:space-y-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4 sm:text-4xl">{title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: summary }}
              className='newsletter-summary'
            />
          </div>
          <div className="mt-6 lg:mt-0">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewsletterForm() {
  return (
    <div className="md:w-3/4 xl:w-1/2">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          type="email"
          placeholder="Email Address"
          className="flex-grow bg-white text-xl h-12"
          aria-label='Email Address'
        />
        <Button
          type="submit"
          className="bg-gray-900 text-white hover:bg-gray-700 text-xl h-12"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
