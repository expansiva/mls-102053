/// <mls fileReference="_102053_/l2/skills/theme.ts" enhancement="_blank"/>

// Theme skill (contract v1): themeInfo + skill (payload only) + examples.
// Procedure/template knowledge (Strategy D, migration techniques) lives in the
// agents' prompts — this file describes ONLY the theme.
// NOTE (validação): tema BRUTALISMO replicado do mls-102054 para testar o
// agentNewMoleculeVariant neste projeto com um SEGUNDO estilo (após validar o
// glass). Os examples apontam para as variantes de referência do 102054 — se o
// 102054 não for dependência deste projeto, o agente cai no fluxo cold start
// (piloto), o que também é um cenário de teste.

export const themeInfo = {
    name: 'brutal',
    suffix: '-brutal',
    displayName: 'Brutalism',
    description: 'Solid opaque backgrounds, thick black borders, hard edges (radius 0), offset solid shadows, monospace uppercase type, no transitions.',
    background: {
        kind: 'light' as 'light' | 'dark' | 'image',
        css: 'background: #f5f5f5;',
        note: 'Light page background; black-on-white contrast. No gradient or image required.',
    },
};

export const skill = `
# Theme — Brutalism

## 1. Visual Signature

| Aspect | Value |
|---|---|
| Background | solid, opaque (\`#3b82f6\`, \`#ffffff\`, \`#f5f5f5\`) — NO transparency/blur |
| Border | \`3px solid #000\` (disabled: \`#999\`) |
| Radius | \`0\` everywhere — hard edges |
| Shadow | offset, solid, no blur: \`4px 4px 0 #000\` (resting), \`2px 2px 0\` (hover) |
| Font | \`'JetBrains Mono', 'SF Mono', 'Courier New', monospace\`, weight 700 |
| Text | \`text-transform: uppercase\` + \`letter-spacing: 0.05em\` on labels/buttons |
| Transition | \`none\` — state changes snap instantly |
| Extras | kinetic hover: element translates INTO its shadow |
| Background contract | light page background; black-on-white contrast |

**Kinetic hover** (signature interaction): on \`:hover\` the element moves toward
its shadow (\`transform: translate(2px, 2px)\` + shadow shrinks to \`2px 2px 0\`);
on \`:active\` it "bottoms out" (\`translate(4px, 4px)\`, shadow \`0 0 0\`). Disabled
for flat variants (ghost/link) which have no shadow.

## 2. Tokens

Canonical values, validated in the pilot.

| Token | Brutal value | Role |
|---|---|---|
| \`--ml-font-family\` | \`'JetBrains Mono', 'SF Mono', 'Courier New', monospace\` | font |
| \`--ml-font-weight-medium\` | \`700\` | emphasis weight |
| \`--ml-radius-sm\` / \`-md\` / \`-lg\` | \`0\` | hard edges |
| \`--ml-border-width\` | \`3px\` | thick borders |
| \`--ml-outline-variant\` | \`#000000\` | default border |
| \`--ml-primary\` | \`#3b82f6\` | primary action bg |
| \`--ml-on-primary\` | \`#ffffff\` | text on primary |
| \`--ml-surface\` | \`#ffffff\` | component bg |
| \`--ml-surface-dim\` | \`#f5f5f5\` (\`#f0f0f0\` on buttons) | hover bg |
| \`--ml-on-surface\` | \`#000000\` | primary text |
| \`--ml-on-surface-muted\` | \`#999999\` | placeholder/secondary |
| \`--ml-error\` | \`#ef4444\` | error text/border/bg |
| \`--ml-shadow-1\` | \`4px 4px 0 #000000\` | resting offset shadow |
| \`--ml-shadow-2\` | \`2px 2px 0 #000000\` | hover (shrunk) shadow |
| \`--ml-disabled-opacity\` | \`0.4\` | disabled |
| \`--ml-text-transform\` | \`uppercase\` | theme extra — brutal signature |
| \`--ml-letter-spacing\` | \`0.05em\` | theme extra — brutal signature |

## 3. Canonical CSS Rules

**Interactive surface** (\`.ml-button\`, \`.ml-select-trigger\`, ...):
\`\`\`less
border-radius: var(--ml-radius-sm, 0);
border: var(--ml-border-width, 3px) solid var(--ml-outline-variant, #000000);
font-family: var(--ml-font-family, monospace);
font-weight: var(--ml-font-weight-medium, 700);
text-transform: var(--ml-text-transform, uppercase);   // buttons/labels only
letter-spacing: var(--ml-letter-spacing, 0.05em);
box-shadow: var(--ml-shadow-1, 4px 4px 0 #000000);
transition: none;
&:not(.ml-disabled):hover  { box-shadow: var(--ml-shadow-2); transform: translate(2px, 2px); }
&:not(.ml-disabled):active { box-shadow: 0 0 0 #000000;      transform: translate(4px, 4px); }
&:focus-visible { outline: 3px solid #000000; outline-offset: 2px; }
\`\`\`

**Motion stance**: the theme sheet must set \`transition: none\` explicitly on
interactive elements (the base defines transitions).

**Flat variants** (\`.ml-button-ghost\`, \`.ml-button-link\`): \`box-shadow: none\`
and neutralize the kinetic hover (\`transform: none\` in hover/active). Link also
drops the border and underlines (\`text-underline-offset: 3px\`,
\`text-decoration-thickness: 2px\`).

**States** — style the ml-* state classes the base emits:
- \`.ml-disabled\`: \`opacity: 0.4; cursor: not-allowed; pointer-events: none\` +
  grey out structure: \`border-color: #999; box-shadow: <offset> #999\`.
  Compound states with their own values need a compound selector, e.g.
  \`.ml-select-trigger.ml-disabled { border-color: #999; box-shadow: 3px 3px 0 #999; }\`.
- open/selected use inversion: \`.ml-select-item-selected { background: #000;
  color: #fff; font-weight: 700; }\`; open trigger sinks into its shadow
  (\`.ml-select-trigger-open { box-shadow: 1px 1px 0 #000; transform: translate(2px, 2px); }\`).
- error: \`border-color: #ef4444; box-shadow: <offset> #ef4444\`.

**Panels** (\`.ml-select-panel\`, in the portal): \`border: 3px solid #000;
border-radius: 0; background: #fff; box-shadow: 4px 4px 0 #000\`. Section
separators are hard borders (\`border-bottom: 3px solid #000\` on the search
container, \`2px solid #000\` under group labels).

**Mechanical spinner**: keep the inherited SVG spinner but make its rotation
stepped (no smoothness): \`.animate-spin { animation-timing-function: steps(8); }\`.
Do NOT re-introduce glyph icons in markup.

## 4. Theme Nuances

- Secondary text stays literal (not tokenized): helper/group-label \`#555\`,
  empty state \`#666\`, item divider \`border-bottom: 1px solid #e5e5e5\`.
- \`text-transform: uppercase\` applies to labels/buttons — not to user
  content (input values, item text).
- Migration precedence examples: an old \`3px 3px 0\` shadow offset or a
  different grey WINS over the token table for that molecule's scope.
- Kinetic hover must NOT be added to a migrated molecule whose old file had
  none at rest-visible cost — apply only signature/state-completeness rules.
`;

export const examples = [
    { pattern: 'simple', ref: '_102054_/l2/molecules/grouptriggeraction/ml-button-standard-brutal' },
    { pattern: 'portal', ref: '_102054_/l2/molecules/groupselectone/ml-select-dropdown-brutal' },
];
