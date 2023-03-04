import GlintConfig from "../interfaces/glintConfig";

export const GLINT_CONTAINER_CLASS_NAME = "glint-container";
export const INNER_BACKGROUND_CLASS_NAME = "inner-background";

export const INNER_GLOW_SIZE = '200%';

export const DEFAULT_CONFIG: GlintConfig = {
  border: {
    color: "#fff",
    width: 2
  }
}

export const CONTAINER_ATTRIBUTES: { [key: string]: string } = {
  borderColor: "glint-border-color",
  borderWidth: "glint-border-width"
}