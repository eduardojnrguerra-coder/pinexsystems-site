import Image from "next/image";

export function HeroLogoReveal() {
  return (
    <div className="hero-logo-reveal" aria-label="Pine X Systems">
      <span className="hero-logo-reveal__frame">
        <Image
          src="/icon.png"
          alt="Pine X Systems logo"
          width={512}
          height={512}
          priority
          unoptimized
          className="hero-logo-reveal__image"
        />
      </span>
    </div>
  );
}
