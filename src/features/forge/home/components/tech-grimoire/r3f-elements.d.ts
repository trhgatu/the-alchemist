/**
 * ⚙️ REACT THREE FIBER ELEMENTS DECLARATION
 * ═══════════════════════════════════════════════════════════
 *
 * TypeScript declaration for custom shader materials used in JSX.
 * This file allows <godRayMaterial>, <magicCircleMaterial>, etc.
 * to be used without TypeScript errors.
 *
 * DO NOT IMPORT THIS FILE IN RUNTIME CODE.
 */

import { Object3DNode } from "@react-three/fiber";
import { GodRayMaterialType } from "./shaders/GodRayMaterial";
import { MagicCircleMaterialType } from "./shaders/MagicCircleMaterial";
import { PageGlowMaterialType } from "./shaders/PageGlowMaterial";
import { ShaderMaterial } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    godRayMaterial: Object3DNode<ShaderMaterial & GodRayMaterialType, typeof ShaderMaterial>;
    magicCircleMaterial: Object3DNode<
      ShaderMaterial & MagicCircleMaterialType,
      typeof ShaderMaterial
    >;
    pageGlowMaterial: Object3DNode<ShaderMaterial & PageGlowMaterialType, typeof ShaderMaterial>;
  }
}
