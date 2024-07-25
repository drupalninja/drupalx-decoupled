import React from 'react';
import Image from 'next/image';
import './Image.scss';

interface ImageProps {
  src: string;
  alt: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <Image src={src} alt={alt} width={500} height={300} className="img-fluid rounded" />
  );
};

export default CustomImage;
