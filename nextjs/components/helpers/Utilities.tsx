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

  const isSvg = (url: string) => url.endsWith('.svg');

  return (
    isSvg(desktopUrl) ? (
      <Image
        src={desktopUrl}
        alt={media?.image?.alt}
        width={500}
        height={500}
        className={className ?? ''}
      />
    ) : (
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={mobileUrl}
        />
        <Image
          src={desktopUrl}
          alt={media?.image?.alt}
          width={width}
          height={height}
          className={className ?? ''}
          sizes="(max-width: 767px) 100vw, 50vw"
          quality={75}
        />
      </picture>
    )
  );
};
