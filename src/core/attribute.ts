import ContainerAttribute from "../interfaces/containerAttribute";
import { CONTAINER_ATTRIBUTES } from "../util/constants"
import DimensionProcessor from "./dimension";

/**
 * Responsible for retrieving and parsing attributes from container elements
 */
export default class AttributeProcessor {
  private elem: Element;

  constructor(g: Element) {
    this.elem = g;
  }

  /**
   * Retrieve and parse attributes of the containers
   * @returns `ContainerAttribute` object containing properties
   */
  getAttributes(): ContainerAttribute {
    const data: any = {};

    Object.keys(CONTAINER_ATTRIBUTES).forEach((key) => {
      const value = this.elem.getAttribute(CONTAINER_ATTRIBUTES[key]);
      data[key] = DimensionProcessor.offset(value, 0);
    })

    return data;
  }
}