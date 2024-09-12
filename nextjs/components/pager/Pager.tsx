import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PagerProps {
  headingId: string;
  pagerItems: {
    previous?: {
      href: string;
      text: string;
    };
    pages: {
      href: string;
    }[];
    next?: {
      href: string;
      text: string;
    };
  };
}

const Pager: React.FC<PagerProps> = ({ headingId, pagerItems }) => {
  return (
    <nav className="flex items-center justify-between" role="navigation" aria-labelledby={headingId}>
      <h4 id={headingId} className="sr-only">Pagination</h4>
      <div className="flex-1 flex justify-between sm:justify-start">
        {pagerItems.previous ? (
          <Button variant="outline" asChild>
            <Link href={pagerItems.previous.href} rel="prev" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {pagerItems.previous.text}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        )}
      </div>
      <div className="hidden md:flex">
        {pagerItems.pages.map((page, index) => (
          <Button
            key={index}
            variant={index === 0 ? "default" : "outline"}
            asChild
            className="mx-1"
          >
            <Link href={page.href} title={`Go to page ${index + 1}`}>
              <span className="sr-only">{index === 0 ? 'Current page' : 'Page'}</span>
              {index + 1}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex-1 flex justify-end">
        {pagerItems.next ? (
          <Button variant="outline" asChild>
            <Link href={pagerItems.next.href} rel="next" className="flex items-center">
              {pagerItems.next.text}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Pager;
