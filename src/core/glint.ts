import { GlintConfig, StoredGlint } from "../util/interfaces";
import { GLINT_CONTAINER_CLASS_NAME, INNER_BACKGROUND_CLASS_NAME, INNER_GLOW_SIZE } from "../util/constants";

export default class Glint {
  private data: StoredGlint[] = [];
  private mouseX: number = -1;
  private mouseY: number = -1;

  constructor(params?: GlintConfig) {
    this.initialize();
  }

  /**
   * Get gradient function for the hover effect
   * @param foreground Glowing color
   * @param background Background color of the container
   * @returns 
   */
  private getHoverGradient(foreground: string): string {
    return `radial-gradient(circle, ${foreground} 0%, transparent 40%)`;
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
      innerBackground.style.background = styles.background;

      const border = g.getAttribute("glint-border");
      const borderGlow = document.createElement("div");
      borderGlow.classList.add("border-glow");
      borderGlow.style.width = INNER_GLOW_SIZE;
      borderGlow.style.height = INNER_GLOW_SIZE;
      borderGlow.style.background = this.getHoverGradient(border || "#fff");

      const hoverGlow = document.createElement("div");
      hoverGlow.classList.add("hover-glow");
      hoverGlow.style.width = INNER_GLOW_SIZE;
      hoverGlow.style.height = INNER_GLOW_SIZE;
      hoverGlow.style.background = this.getHoverGradient(border || "#fff");

      g.appendChild(innerBackground);
      g.appendChild(borderGlow);
      g.appendChild(hoverGlow);

      this.data.push({
        container: g as HTMLElement,
        border: borderGlow,
        glow: hoverGlow,
      });
    });
  }

  /**
   * Initialization
   */
  private initialize() {
    this.getGlintContainers();
    window.addEventListener("mousemove", (ev: MouseEvent) => {
      this.mouseX = ev.clientX;
      this.mouseY = ev.clientY;
    });

    setInterval(() => {
      this.getStoredGlintContainers().forEach((d) => {
        const rect = d.container.getBoundingClientRect();

        const x = (this.mouseX - rect.left - rect.width);
        const y = (this.mouseY - rect.top - rect.width);
        d.border.style.transform = `translate(${x}px,${y}px)`;

        if ((this.mouseX >= rect.left && this.mouseX <= rect.left + rect.width) &&
          (this.mouseY >= rect.top && this.mouseY <= rect.top + rect.height)) {
          // if in the box range
          d.glow.style.transform = `translate(${x}px,${y}px)`;
        }
      });
    }, 60);
  }

  /**
   * Public API to retrieve glint containers from DOM
   */
  public update() {
    this.getGlintContainers();
  }
}