/// <mls fileReference="_102053_/l2/molecules/groupselectone/ml-combobox-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COMBOBOX — BRUTALISM (mls-102053)
// =============================================================================
// Skill Group: groupSelectOne
// Casca (estratégia D): herda tudo de MlComboboxMolecule (mls-102040),
// inclusive render() e getPortalTemplate() — o markup base emite classes semânticas ml-*; a aparência
// vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlComboboxMolecule } from '/_102040_/l2/molecules/groupselectone/ml-combobox.js';

@customElement('groupselectone--ml-combobox-brutal')
export class MlComboboxMoleculeBrutal extends MlComboboxMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o painel por div[data-widget="..."].
  protected portalWidgetName = 'groupselectone--ml-combobox-brutal';
}
