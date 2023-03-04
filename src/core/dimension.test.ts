import DimensionProcessor from "./dimension";

describe("DimensionProcessor", () => {
  describe("Without offset", () => {
    test("should return the same", () => {
      expect(DimensionProcessor.offset("#fff")).toBe("#fff");
    });
  });

  describe("Offsetting", () => {
    test("should be defined", () => {
      expect(DimensionProcessor.offset).toBeDefined();
    });

    describe("pixels", () => {
      test("should offset pixel information", () => {
        const result = DimensionProcessor.offset("10px", -2);
        expect(result).toBe("8px");
      });

      test("should trim and offset pixel information", () => {
        const result = DimensionProcessor.offset("20 px", 2);
        expect(result).toBe("22px");
      });

      test("should zero offset pixel information", () => {
        const result = DimensionProcessor.offset("20px", 0);
        expect(result).toBe("20px");
      });

      test("should offset floating points", () => {
        const result = DimensionProcessor.offset("5.5px", 2.5);
        expect(result).toBe("8px");
      });
    });

    describe("percentages", () => {
      test("should negative offset percentages", () => {
        const result = DimensionProcessor.offset("10%", -2);
        expect(result).toBe("calc(10% - 2px)");
      });

      test("should positive offset percentages", () => {
        const result = DimensionProcessor.offset("10%", 2);
        expect(result).toBe("calc(10% + 2px)");
      });

      test("should zero offset percentages", () => {
        const result = DimensionProcessor.offset("10%", 0);
        expect(result).toBe("10%");
      });

      test("should offset floating points", () => {
        const result = DimensionProcessor.offset("20.5%", 2.5);
        expect(result).toBe("calc(20.5% + 2.5px)");
      });
    });
  });

  describe("toPixelString", () => {
    test("should be defined", () => {
      expect(DimensionProcessor.toPixelString).toBeDefined();
    });

    test("should process common numbers", () => {
      const result = DimensionProcessor.toPixelString(10);
      expect(result).toBe("10px");
    });
    test("should process negative numbers", () => {
      const result = DimensionProcessor.toPixelString(-10);
      expect(result).toBe("-10px");
    });
  })
})