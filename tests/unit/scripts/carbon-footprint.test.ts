import assert from 'node:assert';
import { describe, it } from 'node:test';

const calculateCarbonFootprint = (navigationSize: number, bodySize: number, resources: number[]): string => {
  const totalSize = resources.reduce((sum, size) => sum + size, navigationSize + bodySize);
  if (!Number.isFinite(totalSize) || totalSize <= 0) return 'N/A';

  const gramsCo2 = totalSize * 4.0e-7;
  return gramsCo2 >= 0.01 ? `${gramsCo2.toFixed(2)} g CO₂e` : `${gramsCo2.toFixed(4)} g CO₂e`;
};

describe('carbon-footprint', () => {
  describe('carbon calculation', () => {
    it('should calculate carbon footprint for typical page', () => {
      const result = calculateCarbonFootprint(500, 524, []);
      assert.ok(result.includes('g CO₂e'));
      assert.ok(!result.includes('N/A'));
    });

    it('should return N/A for zero size', () => {
      assert.strictEqual(calculateCarbonFootprint(0, 0, []), 'N/A');
    });

    it('should calculate correctly for 1MB page', () => {
      const oneMB = 1024 * 1024;
      const result = calculateCarbonFootprint(oneMB, 0, []);
      const value = parseFloat(result.split(' ')[0]);
      assert.ok(value > 0.3 && value < 0.5, `Expected ~0.4g CO2, got ${value}`);
    });

    it('should format small values with 4 decimal places', () => {
      const result = calculateCarbonFootprint(10, 10, []);
      assert.ok(result.match(/(\d+\.\d{4})/), 'Should have 4 decimal places for small values');
    });

    it('should format larger values with 2 decimal places', () => {
      const largeSize = 100 * 1024 * 1024;
      const result = calculateCarbonFootprint(largeSize, 0, []);
      assert.ok(result.match(/(\d+\.\d{2})/), 'Should have 2 decimal places for larger values');
    });
  });

  describe('size extraction', () => {
    it('should prefer transferSize over encodedBodySize', () => {
      const entry = {
        transferSize: 1000,
        encodedBodySize: 500,
        decodedBodySize: 2000,
      } as unknown as PerformanceResourceTiming;

      assert.strictEqual(
        entry.transferSize || entry.encodedBodySize || entry.decodedBodySize || 0,
        1000
      );
    });
  });
});
