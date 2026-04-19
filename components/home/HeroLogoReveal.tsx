import Image from "next/image";

export function HeroLogoReveal() {
  return (
    <div className="hero-logo-reveal" aria-label="Pine X Systems">
      <span className="hero-logo-reveal__frame">
        <Image
          src="/brand/pine-x-logo.png"
          alt="Pine X Systems logo"
          width={4757}
          height={2586}
          priority
          unoptimized
          className="hero-logo-reveal__image"
        />
      </span>
    </div>
  );
}
