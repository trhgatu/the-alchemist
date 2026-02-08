/**
 * ⚙️ TECH GRIMOIRE MODULE
 * ═══════════════════════════════════════════════════════════
 *
 * Enterprise-grade module for the Tech Grimoire section.
 *
 * This module provides:
 * - Centralized constants for timeline and visual effects
 * - TypeScript type definitions for animation system
 * - Custom hooks for timeline management
 * - Helper functions for state calculations
 *
 * @module tech-grimoire
 *
 * @example
 * ```tsx
 * import {
 *   useGrimoireTimeline,
 *   TIMELINE_CONFIG,
 *   getMagicCircleState
 * } from './tech-grimoire';
 * ```
 */

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════
export * from "./constants";

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════
export * from "./types";

// ═══════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════
export * from "./hooks";

// ═══════════════════════════════════════════════════════════
// SHADERS
// ═══════════════════════════════════════════════════════════
export * from "./shaders";

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════
export * from "./components";

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export { TechGrimoire } from "./TechGrimoire";
export { AlchemistBook } from "./AlchemistBook";
