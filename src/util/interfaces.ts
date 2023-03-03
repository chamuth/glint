export interface StoredGlint {
  container: HTMLElement;
  border: HTMLElement;
  glow: HTMLElement;
}

export interface GlintConfig {
  border: {
    width: number;
    color: string;
  }
}