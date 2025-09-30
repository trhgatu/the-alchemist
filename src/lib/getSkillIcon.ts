import { SKILL_ICON_MAP } from "@/constants/Skills";

export function getSkillIcon(name: string): string {
  return SKILL_ICON_MAP[name] || '/assets/icons/default.svg';
}
