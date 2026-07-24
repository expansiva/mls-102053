/// <mls fileReference="_102053_/l2/molecules/groupenterboolean/ml-boolean-segmented-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BOOLEAN SEGMENTED — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupEnterBoolean
// Casca (estratégia D): herda tudo de BooleanSegmentedMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { BooleanSegmentedMolecule } from '/_102040_/l2/molecules/groupenterboolean/ml-boolean-segmented.js';

@customElement('groupenterboolean--ml-boolean-segmented-brutal')
export class BooleanSegmentedMoleculeBrutal extends BooleanSegmentedMolecule {}
