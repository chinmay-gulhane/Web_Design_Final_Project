import Image from "next/image";

const CoverImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <Image src={src} alt={alt} layout="responsive" width={1200} height={600} />
  );
};

export default CoverImage;
