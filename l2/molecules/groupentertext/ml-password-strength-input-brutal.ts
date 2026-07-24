/// <mls fileReference="_102053_/l2/molecules/groupentertext/ml-password-strength-input-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// PASSWORD STRENGTH INPUT — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupEnterText
// Casca (estratégia D): herda tudo de PasswordStrengthInputMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { PasswordStrengthInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-password-strength-input.js';

@customElement('groupentertext--ml-password-strength-input-brutal')
export class PasswordStrengthInputMoleculeBrutal extends PasswordStrengthInputMolecule {}
