import { GlintConfig, StoredGlint } from "../util/interfaces";
import { GLINT_CONTAINER_CLASS_NAME, INNER_BACKGROUND_CLASS_NAME, INNER_GLOW_SIZE } from "../util/constants";

export default class Glint {
  private data: StoredGlint[] = [];

  constructor(params?: GlintConfig) {
    this.initialize();
  }

  /**
   * Get gradient function for the hover effect
   * @param foreground Glowing color
   * @param background Background color of the container
   * @returns 
   */
  private getHoverGradient(foreground: string, background: string): string {
    return `radial-gradient(circle, ${foreground} 0%, ${background} 40%)`;
  }

  /**
   * Resets collected glint containers
   */
  private resetGlintContainers() {
    this.data = [];
  }

  private getStoredGlintContainers() {
    return this.data;
  }

  /**
   * Updates glint containers from the DOM
   */
  private getGlintContainers() {
    this.resetGlintContainers();

    var containers = document.querySelectorAll(`.${GLINT_CONTAINER_CLASS_NAME}`);

    containers.forEach((g) => {
      // Get computed styles for the container
      const styles = getComputedStyle(g);

      const innerBackground = document.createElement("div");
      innerBackground.classList.add(INNER_BACKGROUND_CLASS_NAME)
      innerBackground.style.backgroundColor = styles.backgroundColor;

      const border = g.getAttribute("glint-border");
      const borderGlow = document.createElement("div");
      borderGlow.classList.add("border-glow");
      borderGlow.style.width = INNER_GLOW_SIZE;
      borderGlow.style.height = INNER_GLOW_SIZE;
      borderGlow.style.background = this.getHoverGradient(border || "#fff", styles.backgroundColor);

      g.appendChild(innerBackground);
      g.appendChild(borderGlow);

      this.data.push({
        container: g as HTMLElement,
        border: borderGlow
      });
    });
  }

  /**
   * Initialization
   */
  private initialize() {
    this.getGlintContainers();
    window.addEventListener("mousemove", (ev: MouseEvent) => {
      this.getStoredGlintContainers().forEach((d) => {
        const rect = d.container.getBoundingClientRect();

        // if ((ev.clientX >= rect.left && ev.clientX <= rect.left + rect.width) &&
        //   (ev.clientY >= rect.top && ev.clientY <= rect.top + rect.height)) {
        //   // if in the box range
        // }

        const x = (ev.clientX - rect.left - rect.width);
        const y = (ev.clientY - rect.top - rect.width);
        d.border.style.transform = `translate(${x}px,${y}px)`;
      });
    }
    );
  }

  /**
   * Public API to retrieve glint containers from DOM
   */
  public update() {
    this.getGlintContainers();
  }
}