/**
 * Responsible for handling dimensions and related operations
 */
export default class DimensionProcessor {
  /**
   * Return offseted dimension string
   * @param d Dimension as string in `px` or `%`
   * @param offset Offset in number of pixels
   */
  static offset(d: string, offset?: number) {
    if (!offset) {
      return d;
    }

    if (offset === 0) {
      return d;
    }

    if (d.includes("px")) {
      // Process linear pixel dimensions
      const num = parseFloat(d.replace("px", "").trim());
      return `${num + offset}px`;
    }

    if (d.includes("%")) {
      // Process percentages
      return `calc(${d} ${offset > 0 ? '+' : '-'} ${Math.abs(offset)}px)`;
    }

    return d;
  }

  static toPixelString(px: number) {
    return `${px}px`;
  }
}