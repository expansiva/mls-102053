/// <mls fileReference="_102053_/l2/molecules/groupentertext/ml-text-field.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code. 

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-text-field

# Objective
Provide a text entry field that allows users to input free-form text such as names, addresses, and other textual data. It supports both single-line and multi-line modes, input formatting, validation, character limits, and a read-only viewing state.

# Responsibilities
- Accept free-form text entry from the user
- Support single-line and multi-line input modes
- Display a label describing the expected input
- Display helper text when no validation error is active
- Display supplementary content before and after the text entry area
- Communicate the current value whenever the text changes
- Confirm the final value when the user finishes editing and leaves the field
- Notify when the field receives user attention
- Notify when the field loses user attention
- Provide a read-only viewing mode that displays the current value as static text without allowing edits, showing errors, or showing helper text
- In viewing mode, display an em dash when no value is present
- In viewing mode, mask password values as bullet characters regardless of actual length
- Enforce a maximum character limit by preventing further entry beyond the allowed count
- Display a character counter for multi-line fields when a maximum length is defined
- Indicate an error when the entered text does not meet the minimum length requirement
- Indicate an error when the field is left empty and input is mandatory
- Support formatted input masks that show visual formatting during typing while retaining only raw characters as the effective value
- Adapt to different text entry purposes such as general text, email, password, search, URL, and telephone number
- Enable appropriate browser autocomplete behavior based on the expected data type
- Reflect disabled, read-only, loading, and error states in both behavior and appearance
- Associate the field with its label for accessibility
- Describe the field using helper text or error messages for accessibility
- Identify the field as invalid when a validation error is present
- Identify the field as required when input is mandatory
- Announce character count changes to assistive technologies without interrupting the user

# Constraints
- Must not allow text entry beyond the defined maximum length
- Must not permit editing in viewing mode
- Must not display helper text or validation errors in viewing mode
- Must always mask password values in viewing mode regardless of actual content
- Must indicate empty mandatory fields as invalid
- Must indicate fields that do not meet minimum length as invalid
- Must prevent user interaction when in disabled or read-only state
- Must reflect the loading state while processing
- Must store only raw characters as the effective value when a mask is applied

# Notes
- The character counter is only applicable to multi-line fields with a maximum length defined
- Input masks may restrict entry to digits, letters, or any character depending on configuration`;

