import React from 'react';
import Link from 'next/link';
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends Omit<ShadcnButtonProps, 'asChild'> {
  url?: string;
  text: string;
  icon?: LucideIcon;
}

const Button: React.FC<ButtonProps> = ({ url, text, icon: Icon, ...props }) => {
  const buttonContent = (
    <>
      {text}
      {Icon && <Icon className="ml-2 h-4 w-4" />}
    </>
  );

  if (url) {
    return (
      <Link href={url} passHref legacyBehavior>
        <ShadcnButton asChild {...props}>
          <a>{buttonContent}</a>
        </ShadcnButton>
      </Link>
    );
  }

  return (
    <ShadcnButton {...props}>
      {buttonContent}
    </ShadcnButton>
  );
};

export default Button;
