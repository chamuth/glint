import { INNER_BACKGROUND_CLASS_NAME, INNER_GLOW_SIZE } from "../util/constants";
import { GlintConfig, StoredGlint } from "../util/interfaces";

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

  private extractInlineAttributes(g: Element) {
    const border = g.getAttribute("glint-border");
  }

  /**
   * Process the containers nodes and create required child structures for it
   * @param containers List of document nodes of the containers to be glint
   * @returns Storable references to the created children
   */
  public processGlintContainers(containers: NodeListOf<Element>) {
    const data: StoredGlint[] = [];

    containers.forEach((g) => {
      // Get computed styles for the container
      const styles = getComputedStyle(g);

      // Get attributes of the container
      const border = g.getAttribute("glint-border");

      // Add the inner background component
      const innerBackground = document.createElement("div");
      innerBackground.classList.add(INNER_BACKGROUND_CLASS_NAME);
      innerBackground.style.background = styles.background;

      // Add the border component
      const borderGlow = document.createElement("div");
      borderGlow.classList.add("border-glow");
      borderGlow.style.width = INNER_GLOW_SIZE;
      borderGlow.style.height = INNER_GLOW_SIZE;
      borderGlow.style.background = this.getHoverGradient(border);

      // Add hover glow component
      const hoverGlow = document.createElement("div");
      hoverGlow.classList.add("hover-glow");
      hoverGlow.style.width = INNER_GLOW_SIZE;
      hoverGlow.style.height = INNER_GLOW_SIZE;
      hoverGlow.style.background = this.getHoverGradient(border);

      g.appendChild(innerBackground);
      g.appendChild(borderGlow);
      g.appendChild(hoverGlow);

      data.push({
        container: g as HTMLElement,
        border: borderGlow,
        glow: hoverGlow,
      });
    });

    return data;
  }
}