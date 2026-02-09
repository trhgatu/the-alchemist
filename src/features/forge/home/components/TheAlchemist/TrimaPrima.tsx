import Image from "next/image";

export function TrimaPrima() {
  const triaPrima = [
    {
      src: "/assets/images/craftings/symbols/sol_symbol.svg",
      alt: "Sol",
      label: "Sol",
      className: "top-28 left-[35%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20",
      opacity: "opacity-90",
    },
    {
      src: "/assets/images/craftings/symbols/mercury_symbol.svg",
      alt: "Mercury",
      label: "Mercurius",
      className: "top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-20",
      opacity: "opacity-100",
    },
    {
      src: "/assets/images/craftings/symbols/luna_symbol.svg",
      alt: "Luna",
      label: "Luna",
      className: "top-28 right-[35%] translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20",
      opacity: "opacity-90",
    },
  ];

  return triaPrima.map((s, i) => (
    <div key={`tria-${i}`} className="absolute w-full h-full pointer-events-none">
      <div className={`absolute ${s.className}`}>
        <div className="relative w-full h-full opacity-80 mix-blend-multiply">
          <Image src={s.src} alt={s.alt} fill className="object-contain" />
        </div>
      </div>
      <div
        className={`absolute text-neutral-600/70 text-sm tracking-[0.25em] font-medium uppercase mix-blend-multiply
                          ${i === 0 ? "top-36 left-[35%] -translate-x-1/2" : ""}
                          ${i === 1 ? "top-36 left-1/2 -translate-x-1/2" : ""}
                          ${i === 2 ? "top-36 right-[35%] translate-x-1/2" : ""}
                        `}
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
      >
        {s.label}
      </div>
    </div>
  ));
}
