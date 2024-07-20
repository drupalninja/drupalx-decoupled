import Image from 'next/image';

export const getImage = (media: any, className: string) => {
  return (
    <Image 
      src={media?.image?.url} 
      alt={media?.image?.alt} 
      width={media?.image?.width}
      height={media?.image?.height}
      className={className ?? 'img-fluid'}
    />
  )
};
