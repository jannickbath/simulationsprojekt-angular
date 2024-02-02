
/**
 * Helper class providing various utility functions.
 */
export class Helper {
    /**
     * Generates a random number within the specified range.
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {number} A random number within the specified range.
     */
    public static getRandomNumberInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Generates a random boolean value with a specified likelihood.
     *
     * @param {number} likelihood - A value between 0 and 1 representing the likelihood of getting true.
     * @returns {boolean} A random boolean value based on the specified likelihood.
     * @example 
     * ```js
     * randomBooleanWithLikelihood(0.5); // Odds of returning true: 50%
     * randomBooleanWithLikelihood(0.15); // Odds of returning true: 15%
     * ```
     */
    public static randomBooleanWithLikelihood(likelihood: number): boolean {
        const adjustedModifier = Math.min(1, Math.max(0, likelihood));
        const randomValue = Math.random();
        return randomValue < adjustedModifier;
    }
}