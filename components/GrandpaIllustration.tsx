import Image from "next/image";

export default function GrandpaIllustration({ size = 200 }: { size?: number }) {
  return (
    <Image
      src="/grandpa.png"
      alt="樹洞"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      unoptimized
      priority
    />
  );
}
