import StoredGlint from "../interfaces/storedGlint";
import GlintConfig from "../interfaces/glintConfig";

import { DEFAULT_CONFIG, GLINT_CONTAINER_CLASS_NAME } from "../util/constants";
import ContainerProcessor from "./container";

export default class Glint {
  private data: StoredGlint[] = [];
  private mouseX: number = -1;
  private mouseY: number = -1;

  private containerProcessor: ContainerProcessor;

  constructor(config?: GlintConfig) {
    if (!config) {
      config = DEFAULT_CONFIG;
    }

    this.containerProcessor = new ContainerProcessor(config);

    this.initialize();
  }

  /**
   * Resets collected glint containers
   */
  private resetGlintContainers() {
    this.data = [];
  }

  /**
   * Returns the stored glint containers list
   */
  private getStoredGlintContainers() {
    return this.data;
  }

  /**
   * Updates glint containers from the DOM
   */
  private getGlintContainers() {
    this.resetGlintContainers();
    var containers = document.querySelectorAll(`.${GLINT_CONTAINER_CLASS_NAME}`);
    this.data = this.containerProcessor.processGlintContainers(containers);
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