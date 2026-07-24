/// <mls fileReference="_102053_/l2/molecules/groupenterdate/ml-date-shortcut-picker-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DATE SHORTCUT PICKER — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupEnterDate
// Casca (estratégia D): herda tudo de DateShortcutPickerMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { DateShortcutPickerMolecule } from '/_102040_/l2/molecules/groupenterdate/ml-date-shortcut-picker.js';

@customElement('groupenterdate--ml-date-shortcut-picker-brutal')
export class DateShortcutPickerMoleculeBrutal extends DateShortcutPickerMolecule {}
