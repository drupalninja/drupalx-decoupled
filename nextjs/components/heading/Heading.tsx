import * as React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

export interface HeadingProps {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  icon?: React.ReactNode;
  url?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, level = 2, className, icon, url }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const headingClasses = cn(
    "scroll-m-20",
    {
      "text-4xl font-semibold tracking-tight lg:text-5xl": level === 1,
      "text-3xl font-semibold tracking-tight": level === 2,
      "text-2xl font-semibold tracking-tight": level === 3,
      "text-xl font-semibold tracking-tight": level === 4,
      "text-lg font-semibold tracking-tight": level === 5,
      "text-base font-semibold tracking-tight": level === 6,
    },
    className
  );

  return (
    <>
      {title && (
        <Tag className={headingClasses}>
          {icon}
          {url ? (
            <Link href={url} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </Tag>
      )}
    </>
  );
};

export default Heading;
