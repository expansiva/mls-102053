/// <mls fileReference="_102053_/l2/molecules/groupentertext/ml-text-input-standard.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML TEXT INPUT STANDARD MOLECULE
// =============================================================================
// Skill Group: groupEnterText
// This molecule does NOT contain business logic.
import { html, nothing, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';
import { cn } from '/_102033_/l2/cn.js';

@customElement('groupentertext--ml-text-input-standard')
export class MlTextInputStandardMolecule extends MoleculeAuraElement {
  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Label', 'Helper', 'Prefix', 'Suffix'];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: String })
  value: string = '';

  @propertyDataSource({ type: String })
  error: string = '';

  @propertyDataSource({ type: String })
  name: string = '';

  @propertyDataSource({ type: String })
  placeholder: string = '';

  @propertyDataSource({ type: Number, attribute: 'max-length' })
  maxLength: number | null = null;

  @propertyDataSource({ type: Number, attribute: 'min-length' })
  minLength: number | null = null;

  @propertyDataSource({ type: Number })
  rows: number = 1;

  @propertyDataSource({ type: String })
  autocomplete: string = '';

  @propertyDataSource({ type: String, attribute: 'input-type' })
  inputType: string = 'text';

  @propertyDataSource({ type: String })
  mask: string = '';

  @propertyDataSource({ type: Boolean, attribute: 'is-editing' })
  isEditing: boolean = true;

  @propertyDataSource({ type: Boolean })
  disabled: boolean = false;

  @propertyDataSource({ type: Boolean })
  readonly: boolean = false;

  @propertyDataSource({ type: Boolean })
  required: boolean = false;

  @propertyDataSource({ type: Boolean })
  loading: boolean = false;

  // ===========================================================================
  // INTERNAL STATE
  // ===========================================================================
  @state()
  private displayValue: string = '';

  private uid: string = `ml-text-${Math.random().toString(36).slice(2, 9)}`;

  // ===========================================================================
  // STATE CHANGE HANDLER — derived state sync
  // ===========================================================================
  handleIcaStateChange(key: string, value: any) {
    const valueAttr = this.getAttribute('value');
    const maskAttr = this.getAttribute('mask');
    const rowsAttr = this.getAttribute('rows');
    if (valueAttr === `{{${key}}}` || maskAttr === `{{${key}}}` || rowsAttr === `{{${key}}}`) {
      this.updateDisplayValueFromProps();
    }
    this.requestUpdate();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('value') || changedProps.has('mask') || changedProps.has('rows')) {
      this.updateDisplayValueFromProps();
    }
  }

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleInput = (e: Event) => {
    if (!this.isEditing || this.isDisabledOrLoading() || this.readonly) return;
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const rawInput = target.value ?? '';

    if (this.isTextarea()) {
      let nextValue = rawInput;
      if (this.maxLength !== null && nextValue.length > this.maxLength) {
        nextValue = nextValue.slice(0, this.maxLength);
      }
      this.value = nextValue;
      this.displayValue = nextValue;
      target.value = nextValue;
    } else if (this.mask) {
      let raw = this.extractRawFromMasked(rawInput, this.mask);
      if (this.maxLength !== null && raw.length > this.maxLength) {
        raw = raw.slice(0, this.maxLength);
      }
      const formatted = this.applyMask(raw, this.mask);
      this.value = raw;
      this.displayValue = formatted;
      target.value = formatted;
    } else {
      let nextValue = rawInput;
      if (this.maxLength !== null && nextValue.length > this.maxLength) {
        nextValue = nextValue.slice(0, this.maxLength);
      }
      this.value = nextValue;
      this.displayValue = nextValue;
      target.value = nextValue;
    }

    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  };

  private handleBlur = () => {
    if (!this.isEditing) return;
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
    this.dispatchEvent(new CustomEvent('blur', {
      bubbles: true,
      composed: true,
    }));
  };

  private handleFocus = () => {
    if (!this.isEditing) return;
    this.dispatchEvent(new CustomEvent('focus', {
      bubbles: true,
      composed: true,
    }));
  };

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    return html`
      <div class="${cn('flex w-full flex-col gap-1', this.cssClass)}">
        ${this.renderLabel()}
        ${this.isEditing ? this.renderEditMode() : this.renderViewMode()}
        ${this.isEditing ? this.renderFeedback() : nothing}
      </div>
    `;
  }

  private renderLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id="${this.getLabelId()}" class="${cn('ml-label', this.getSlotClass('Label'))}">
        ${unsafeHTML(this.getSlotContent('Label'))}
      </label>
    `;
  }

  private renderEditMode(): TemplateResult {
    return html`
      <div class="${this.getFieldContainerClasses()}">
        ${this.renderPrefix()}
        ${this.renderInputElement()}
        ${this.renderSuffix()}
        ${this.loading ? this.renderSpinner() : nothing}
      </div>
      ${this.renderCounter()}
    `;
  }

  private renderViewMode(): TemplateResult {
    const display = this.getViewDisplayValue();
    return html`
      <div class="${cn('flex w-full items-center gap-2', 'ml-text')}">
        ${this.renderPrefix()}
        <span class="ml-text">${display}</span>
        ${this.renderSuffix()}
      </div>
    `;
  }

  private renderInputElement(): TemplateResult {
    const describedBy = this.getDescribedBy();
    const ariaInvalid = this.hasError() ? 'true' : 'false';
    const ariaRequired = this.required ? 'true' : 'false';
    const labelId = this.hasSlot('Label') ? this.getLabelId() : nothing;

    if (this.isTextarea()) {
      return html`
        <textarea
          class="${this.getInputClasses()}"
          .value=${this.displayValue}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          minlength=${this.minLength ?? nothing}
          maxlength=${this.maxLength ?? nothing}
          rows=${this.rows}
          autocomplete=${this.autocomplete || nothing}
          ?disabled=${this.isDisabledOrLoading()}
          ?readonly=${this.readonly}
          aria-labelledby=${labelId}
          aria-describedby=${describedBy || nothing}
          aria-invalid=${ariaInvalid}
          aria-required=${ariaRequired}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        ></textarea>
      `;
    }

    return html`
      <input
        class="${this.getInputClasses()}"
        .value=${this.displayValue}
        type=${this.inputType}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        minlength=${this.minLength ?? nothing}
        maxlength=${this.maxLength ?? nothing}
        autocomplete=${this.autocomplete || nothing}
        ?disabled=${this.isDisabledOrLoading()}
        ?readonly=${this.readonly}
        aria-labelledby=${labelId}
        aria-describedby=${describedBy || nothing}
        aria-invalid=${ariaInvalid}
        aria-required=${ariaRequired}
        @input=${this.handleInput}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      />
    `;
  }

  private renderPrefix(): TemplateResult {
    if (!this.hasSlot('Prefix')) return html``;
    return html`
      <div class="${cn('ml-text-muted', this.getSlotClass('Prefix'))}">
        ${unsafeHTML(this.getSlotContent('Prefix'))}
      </div>
    `;
  }

  private renderSuffix(): TemplateResult {
    if (!this.hasSlot('Suffix')) return html``;
    return html`
      <div class="${cn('ml-text-muted', this.getSlotClass('Suffix'))}">
        ${unsafeHTML(this.getSlotContent('Suffix'))}
      </div>
    `;
  }

  private renderFeedback(): TemplateResult {
    if (this.hasError()) {
      return html`
        <p id="${this.getErrorId()}" class="${cn('text-xs ml-error-text')}">
          ${unsafeHTML(this.error)}
        </p>
      `;
    }
    if (this.hasSlot('Helper')) {
      return html`
        <p id="${this.getHelperId()}" class="${cn('text-xs ml-helper', this.getSlotClass('Helper'))}">
          ${unsafeHTML(this.getSlotContent('Helper'))}
        </p>
      `;
    }
    return html``;
  }

  private renderCounter(): TemplateResult {
    if (!this.isTextarea() || this.maxLength === null) return html``;
    const current = this.value?.length ?? 0;
    return html`
      <div id="${this.getCounterId()}" class="${cn('text-xs ml-text-muted')}" aria-live="polite">
        ${current} / ${this.maxLength}
      </div>
    `;
  }

  private renderSpinner(): TemplateResult {
    return html`<span class="ml-spinner" aria-hidden="true"></span>`;
  }

  // ===========================================================================
  // HELPERS
  // ===========================================================================
  private updateDisplayValueFromProps(): void {
    if (this.isTextarea()) {
      this.displayValue = this.value ?? '';
      return;
    }
    if (this.mask) {
      this.displayValue = this.applyMask(this.value ?? '', this.mask);
      return;
    }
    this.displayValue = this.value ?? '';
  }

  private isTextarea(): boolean {
    return this.rows > 1;
  }

  private isDisabledOrLoading(): boolean {
    return this.disabled || this.loading;
  }

  private hasError(): boolean {
    return !!this.error && this.isEditing;
  }

  private getViewDisplayValue(): string {
    if (this.inputType === 'password') return '••••••••';
    if (!this.value) return '—';
    return this.value;
  }

  private getFieldContainerClasses(): string {
    return [
      'flex w-full items-center gap-2 px-3 py-2',
      'ml-input-container',
      this.hasError() ? 'ml-input-container-error' : '',
      this.isDisabledOrLoading() ? 'ml-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private getInputClasses(): string {
    return [
      'w-full bg-transparent outline-none',
      'ml-input',
      this.isDisabledOrLoading() ? 'ml-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private getLabelId(): string {
    return `${this.uid}-label`;
  }

  private getHelperId(): string {
    return `${this.uid}-helper`;
  }

  private getErrorId(): string {
    return `${this.uid}-error`;
  }

  private getCounterId(): string {
    return `${this.uid}-counter`;
  }

  private getDescribedBy(): string {
    const ids: string[] = [];
    if (this.hasError()) ids.push(this.getErrorId());
    else if (this.hasSlot('Helper')) ids.push(this.getHelperId());
    if (this.isTextarea() && this.maxLength !== null) ids.push(this.getCounterId());
    return ids.join(' ');
  }

  private isMaskToken(token: string): boolean {
    return token === '#' || token === 'A' || token === '*';
  }

  private isCharAllowed(ch: string, token: string): boolean {
    if (token === '#') return /\d/.test(ch);
    if (token === 'A') return /[A-Za-z]/.test(ch);
    return true;
  }

  private extractRawFromMasked(input: string, mask: string): string {
    let raw = '';
    let tokenIndex = 0;
    for (const ch of input) {
      while (tokenIndex < mask.length && !this.isMaskToken(mask[tokenIndex])) {
        tokenIndex += 1;
      }
      if (tokenIndex >= mask.length) break;
      const token = mask[tokenIndex];
      if (this.isCharAllowed(ch, token)) {
        raw += ch;
        tokenIndex += 1;
      }
    }
    return raw;
  }

  private applyMask(raw: string, mask: string): string {
    let output = '';
    let rawIndex = 0;
    for (const token of mask) {
      if (this.isMaskToken(token)) {
        if (rawIndex >= raw.length) break;
        const ch = raw[rawIndex];
        if (this.isCharAllowed(ch, token)) {
          output += ch;
          rawIndex += 1;
        } else {
          rawIndex += 1;
        }
      } else {
        output += token;
      }
    }
    return output;
  }
}
