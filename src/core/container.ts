import GlintConfig from "../interfaces/glintConfig";
import StoredGlint from "../interfaces/storedGlint";
import { INNER_BACKGROUND_CLASS_NAME, INNER_GLOW_SIZE } from "../util/constants";
import DimensionProcessor from "./dimension";
import AttributeProcessor from "./attribute";

/**
 * Responsible for Preprocessing DOM for glinting
 */
export default class ContainerProcessor {
  private glintConfig: GlintConfig | undefined;

  constructor(config?: GlintConfig) {
    this.glintConfig = config;
  }

  /**
   * Get gradient function for the hover effect
   * @param foreground Glowing color
   * @param background Background color of the container
   * @returns 
   */
  private getHoverGradient(foreground?: string): string {
    return `radial-gradient(circle, ${foreground || this.glintConfig.border.color} 0%, transparent 40%)`;
  }

  /**
   * Sets styles for inner background element
   * @param inner Inner element
   * @param outer Outer element
   * @param customBorderWidth Border width if set custom by element
   */
  private setInnerBackgroundStyles(inner: HTMLDivElement, outer: Element, customBorderWidth: number) {
    const width = customBorderWidth || this.glintConfig.border.width;

    // Get computed styles for the container
    const styles = getComputedStyle(outer);
    // Set original background to inner background
    inner.style.background = styles.background;

    // Set inner background border radius
    inner.style.borderTopLeftRadius = DimensionProcessor.offset(styles.borderTopLeftRadius, -width);
    inner.style.borderTopRightRadius = DimensionProcessor.offset(styles.borderTopRightRadius, -width);
    inner.style.borderBottomLeftRadius = DimensionProcessor.offset(styles.borderBottomLeftRadius, -width);
    inner.style.borderBottomRightRadius = DimensionProcessor.offset(styles.borderBottomRightRadius, -width);

    // Set inner background dimensions
    const size = DimensionProcessor.offset("100%", width * -2);
    const position = DimensionProcessor.toPixelString(width);

    inner.style.top = position;
    inner.style.left = position;
    inner.style.width = size;
    inner.style.height = size;
  }

  /**
   * Process the containers nodes and create required child structures for it
   * @param containers List of document nodes of the containers to be glint
   * @returns Storable references to the created children
   */
  public processGlintContainers(containers: NodeListOf<Element>) {
    const data: StoredGlint[] = [];

    containers.forEach((g) => {
      // Get attributes of the container
      const attr = new AttributeProcessor(g).getAttributes();

      // Add the inner background component
      const innerBackground = document.createElement("div");
      innerBackground.classList.add(INNER_BACKGROUND_CLASS_NAME);
      this.setInnerBackgroundStyles(innerBackground, g, attr.borderWidth);

      // Add the border component
      const borderGlow = document.createElement("div");
      borderGlow.classList.add("border-glow");
      borderGlow.style.width = INNER_GLOW_SIZE;
      borderGlow.style.height = INNER_GLOW_SIZE;
      borderGlow.style.background = this.getHoverGradient(attr.borderColor);

      // Add hover glow component
      const hoverGlow = document.createElement("div");
      hoverGlow.classList.add("hover-glow");
      hoverGlow.style.width = INNER_GLOW_SIZE;
      hoverGlow.style.height = INNER_GLOW_SIZE;
      hoverGlow.style.background = this.getHoverGradient(attr.borderColor);

      // Append structural children
      g.appendChild(innerBackground);
      g.appendChild(borderGlow);
      g.appendChild(hoverGlow);

      // Store references
      data.push({
        container: g as HTMLElement,
        border: borderGlow,
        glow: hoverGlow,
        attributes: attr
      });
    });

    return data;
  }
}