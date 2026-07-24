/// <mls fileReference="_102053_/l2/molecules/groupenterdate/ml-compact-calendar-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COMPACT CALENDAR — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupEnterDate
// Casca (estratégia D): herda tudo de MlCompactCalendarMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlCompactCalendarMolecule } from '/_102040_/l2/molecules/groupenterdate/ml-compact-calendar.js';

@customElement('groupenterdate--ml-compact-calendar-brutal')
export class MlCompactCalendarMoleculeBrutal extends MlCompactCalendarMolecule {}
