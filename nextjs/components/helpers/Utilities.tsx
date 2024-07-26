import Image from 'next/image';

export const getImage = (media: any, className?: string, imageStyle?: string | string[]) => {
  const getVariation = (name: string) => 
    media?.image?.variations?.find((variation: any) => variation.name === name);

  let desktopStyle: string | undefined;
  let mobileStyle: string | undefined;

  if (Array.isArray(imageStyle)) {
    [mobileStyle, desktopStyle] = imageStyle;
  } else {
    desktopStyle = imageStyle;
  }

  const desktopVariation = getVariation(desktopStyle || '');
  const mobileVariation = getVariation(mobileStyle || '');

  const desktopUrl = desktopVariation?.url ?? media?.image?.url;
  const mobileUrl = mobileVariation?.url ?? desktopUrl;

  const width = desktopVariation?.width ?? media?.image?.width;
  const height = desktopVariation?.height ?? media?.image?.height;

  if (!desktopUrl) return null;

  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet={mobileUrl}
      />
      <Image 
        src={desktopUrl}
        alt={media?.image?.alt} 
        width={width > 0 ? width : 1920}
        height={height > 0 ? height : 1080}
        className={className ?? 'img-fluid'}
        sizes="(max-width: 767px) 100vw, 50vw"
        quality={75}
      />
    </picture>
  );
};
