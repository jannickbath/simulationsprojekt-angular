export class Helper {
    public static getRandomNumberInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    public static randomBooleanWithLikelihood(likelihood: number): boolean {
        const adjustedModifier = Math.min(1, Math.max(0, likelihood));
        const randomValue = Math.random();
        return randomValue < adjustedModifier;
    }
}