export class Helper {
    public static getRandomNumberInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}