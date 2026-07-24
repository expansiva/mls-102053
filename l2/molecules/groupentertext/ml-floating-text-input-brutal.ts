/// <mls fileReference="_102053_/l2/molecules/groupentertext/ml-floating-text-input-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// FLOATING TEXT INPUT — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupEnterText
// Casca (estratégia D): herda tudo de MlFloatingTextInputMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlFloatingTextInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';

@customElement('groupentertext--ml-floating-text-input-brutal')
export class MlFloatingTextInputMoleculeBrutal extends MlFloatingTextInputMolecule {}
