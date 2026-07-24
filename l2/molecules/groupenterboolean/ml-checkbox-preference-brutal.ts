/// <mls fileReference="_102053_/l2/molecules/groupenterboolean/ml-checkbox-preference-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CHECKBOX PREFERENCE — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupEnterBoolean
// Casca (estratégia D): herda tudo de CheckboxPreferenceMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { CheckboxPreferenceMolecule } from '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';

@customElement('groupenterboolean--ml-checkbox-preference-brutal')
export class CheckboxPreferenceMoleculeBrutal extends CheckboxPreferenceMolecule {}
