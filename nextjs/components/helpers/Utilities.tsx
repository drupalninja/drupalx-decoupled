import Image from 'next/image';

export const getImage = (media: any, className?: string, imageStyle?: string) => {
  const url = media?.image?.variations?.find((variation: any) => variation.name === imageStyle)?.url;
  const width = media?.image?.variations?.find((variation: any) => variation.name === imageStyle)?.width;
  const height = media?.image?.variations?.find((variation: any) => variation.name === imageStyle)?.height

  return (
    <Image 
      src={url ?? media?.image?.url}
      alt={media?.image?.alt} 
      width={width ?? media?.image?.width}
      height={height ?? media?.image?.height}
      className={className ?? 'img-fluid'}
    />
  )
};
