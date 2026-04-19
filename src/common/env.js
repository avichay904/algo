// Feature flags for the Maayan customization.
// DISABLE_GIST hides all GitHub/gist-based UI flows (Save, Sign In, Scratch Paper).
// We proxy to the public algorithm-visualizer.org server which doesn't share cookies
// with us, so OAuth can't work. Better to hide the feature entirely than present
// broken buttons.
export const DISABLE_GIST = true;
