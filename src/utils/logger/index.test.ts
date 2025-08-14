import { describe, it, expect } from "vitest";
import { LoggerCls } from "./index";
import { parse } from "flatted";

describe("LoggerCls", () => {
  describe("getPureError", () => {
    it("should return string as is when err is a string", () => {
      const error = "Test error message";
      const result = LoggerCls.getPureError(error);
      expect(result).toBe(error);
    });

    it("should stringify object when isStringifyOnly is true", () => {
      const error = { message: "Test error", code: 500 };
      const result = LoggerCls.getPureError(error, true);
      expect(typeof result).toBe("string");
      expect(parse(result)).toEqual(error);
    });

    it("should parse and stringify object when isStringifyOnly is false", () => {
      const error = { message: "Test error", code: 500 };
      const result = LoggerCls.getPureError(error, false);
      expect(result).toEqual(error);
    });

    it("should handle Error objects", () => {
      const error = new Error("Test error");
      const result = LoggerCls.getPureError(error);
      expect(result).toHaveProperty("message", "Test error");
    });

    it("should handle complex objects in getPureError", () => {
      const complexError = {
        message: "Complex error",
        stack: "Error stack",
        code: 500,
        nested: {
          property: "value",
          array: [1, 2, 3],
        },
      };

      const result = LoggerCls.getPureError(complexError);
      console.log("result", result);
      expect(result).toEqual(complexError);
    });

    it("should handle circular references without infinite recursion", () => {
      // Create a circular reference
      const parentError: any = {
        message: "Parent error",
        code: 500,
      };

      const childError: any = {
        message: "Child error",
        code: 400,
        parent: parentError,
      };

      // Create circular reference
      parentError.child = childError;

      // This should not cause infinite recursion
      const result = LoggerCls.getPureError(parentError);

      // Verify the result contains the expected properties
      expect(result).toHaveProperty("message", "Parent error");
      expect(result).toHaveProperty("code", 500);
      expect(result).toHaveProperty("child");
      expect(result.child).toHaveProperty("message", "Child error");
      expect(result.child).toHaveProperty("code", 400);
      expect(result.child).toHaveProperty("parent");

      // The circular reference should be handled by flatted
      // The result should be a new object (not the original)
      expect(result).not.toBe(parentError);
      expect(result.child).not.toBe(childError);

      // The circular reference should still exist in the result
      // but it should be a new object reference, not the original
      expect(result.child.parent).toBeDefined();
      expect(result.child.parent).not.toBe(parentError);

      // Verify that the circular reference is properly reconstructed
      expect(result.child.parent).toBe(result);
    });
  });

  describe("log", () => {
    it("should not throw when called with message", () => {
      const message = "Test log message";
      expect(() => LoggerCls.log(message)).not.toThrow();
    });

    it("should not throw when called with message and details", () => {
      const message = "Test log message";
      const details = { test: "data" };
      expect(() => LoggerCls.log(message, details)).not.toThrow();
    });
  });

  describe("debug", () => {
    it("should not throw when called with message", () => {
      const message = "Test debug message";
      expect(() => LoggerCls.debug(message)).not.toThrow();
    });

    it("should not throw when called with message and details", () => {
      const message = "Test debug message";
      const details = { debug: "info" };
      expect(() => LoggerCls.debug(message, details)).not.toThrow();
    });
  });

  describe("info", () => {
    it("should not throw when called with message", () => {
      const message = "Test info message";
      expect(() => LoggerCls.info(message)).not.toThrow();
    });

    it("should not throw when called with message and details", () => {
      const message = "Test info message";
      const details = { info: "data" };
      expect(() => LoggerCls.info(message, details)).not.toThrow();
    });
  });

  describe("error", () => {
    it("should not throw when called with message", () => {
      const message = "Test error message";
      expect(() => LoggerCls.error(message)).not.toThrow();
    });

    it("should not throw when called with message and details", () => {
      const message = "Test error message";
      const details = { error: "details" };
      expect(() => LoggerCls.error(message, details)).not.toThrow();
    });
  });
});
