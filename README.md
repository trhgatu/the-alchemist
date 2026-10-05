# The Alchemist

**English** | [Tiếng Việt](README.vi.md)

> _"In the alchemical dance of existence, nothing new can be born until the old is surrendered."_

This portfolio is not a résumé. It is a record of how I learned to make things: gathering the broken pieces, stepping into the furnace, and using mathematics and code to reshape what is real.

![](.github/assets/hero.webp)

**Live:** [thatu.is-a.dev](https://thatu.is-a.dev) (in English and Vietnamese)

Inspired by _The Alchemist_, the whole space is built as an old book that passes through the four stages of transmutation:

- **Nigredo (Blackening):** the night of confusion, where every old illusion must burn down to ash.
- **Albedo (Whitening):** a flame kindled by raw, early lines of code, searching for order in chaos.
- **Citrinitas (Yellowing):** the moment of awakening, when architectural thinking and a sense of beauty begin to merge.
- **Rubedo (Reddening):** the Great Work goes on, making works that can stand on their own and give off light.

![](.github/assets/journal.webp)

## Behind the furnace

None of the pages, flames or mist on screen are pre-rendered video. They are drawn in real time, pixel by pixel.

**Storytelling in shaders.** The opening name and the fire hidden in its strokes are one WebGL2 shader (OGL), sharp at any distance. The frames that dissolve into mist around each picture are hand-written shaders too, and they drift toward the visitor's cursor.

![](.github/assets/portal.webp)

**The grimoire and the constellation.** A three-dimensional space built with React Three Fiber, where the tools of the craft leave the page and become stars to steer by.

|           The grimoire            |           The constellation            |
| :-------------------------------: | :------------------------------------: |
| ![](.github/assets/grimoire.webp) | ![](.github/assets/constellation.webp) |

**The discipline of performance.** A visual experience is only worth something when it runs smoothly.

- Everything that moves (Lenis, GSAP, OGL, R3F) runs on a single `gsap.ticker`, so no layer falls out of step or stutters against another.
- Every mist frame draws into one shared WebGL context through drei's `<View>`.
- The site measures what the hardware can carry (`src/lib/quality.ts`) and lightens the shaders on weaker devices. Beauty should reach the visitor without burning their hands.

|           The craftings            |             Maktub              |
| :--------------------------------: | :-----------------------------: |
| ![](.github/assets/craftings.webp) | ![](.github/assets/maktub.webp) |

## Materials

- **Core:** Next.js 15 (App Router, Turbopack) · React 19 · TypeScript
- **Visuals and motion:** OGL · React Three Fiber and drei · GSAP and ScrollTrigger · Lenis
- **Structure and data:** Tailwind CSS v4 · Zustand · TanStack Query
- **Type:** Kings · EB Garamond

---

A record by **trhgatu**. [GitHub](https://github.com/trhgatu)

**Maktub.**
