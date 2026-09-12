import Image from "next/image";

/**
 * Photorealistic laptop + mobile device mockup showing the real Takween Tutors live platform.
 */
export function HeroMockup() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 540,
        margin: "0 auto",
      }}
    >
      {/* Laptop Mockup */}
      <div
        style={{
          position: "relative",
          width: "100%",
          filter: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.12))",
        }}
      >
        <Image
          src="/images/hero-laptop.png"
          alt="Takween Tutors Desktop Website Mockup"
          width={1204}
          height={692}
          priority
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Mobile Phone Mockup (overlapping front bottom-right) */}
      <div
        style={{
          position: "absolute",
          right: "-3%",
          bottom: "-6%",
          width: "34%",
          filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.28))",
          zIndex: 10,
          transition: "transform 200ms ease",
        }}
      >
        <Image
          src="/images/mobile-mockup.png"
          alt="Takween Tutors Mobile Website Mockup"
          width={682}
          height={1376}
          priority
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
