// src/features/forge/home/components/the-alchemist/CraftingLegacies.tsx
'use client';

export function CraftingLegacies() {
  return (
    <section
      id="legacies"
      className="about-legacies min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <h2 className="crafting-title text-3xl md:text-5xl font-kings tracking-wide mb-8">
        Crafting Legacies
      </h2>

      <p className="crafting-text text-xl md:text-2xl leading-relaxed max-w-3xl">
        Every line of code is not just a solution — it’s a legacy,
        a trace left behind to inspire, empower, and endure.
      </p>

      <div className="crafting-quote mt-12 italic text-lg md:text-xl max-w-2xl">
        <q>
          “And, when you want something, all the universe conspires in helping you to achieve it.”
        </q>
        <div className="mt-4">— Paulo Coelho, <span className="not-italic">The Alchemist</span></div>
      </div>
    </section>
  );
}
