interface MediaProps {
  media: React.ReactNode;
  modifier?: string;
  containerClassName?: string;
}

export default function Media({ media, modifier, containerClassName }: MediaProps) {
  return (
    <div className={`container mx-auto px-4 ${containerClassName ?? 'my-6 lg:my-25'}`}>
      <div className="w-full">
        <div className={modifier ?? 'w-full'}>
          {media}
        </div>
      </div>
    </div>
  );
}
