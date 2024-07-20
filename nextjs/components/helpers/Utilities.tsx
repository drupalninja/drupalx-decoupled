import Image from 'next/image';

export const getImage = (media: any, className?: string) => {
  const width = media?.image?.width;
  const height = media?.image?.height;

  return (
    <Image 
      src={media?.image?.url} 
      alt={media?.image?.alt} 
      width={width > 0 ? width : 500}
      height={height > 0 ? height : 500}
      className={className ?? 'img-fluid'}
    />
  )
};
