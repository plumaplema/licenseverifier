import { generateRandomCode } from './randomcode';

describe('generateRandomCode', () => {
    it('should generate a random code with length 6', () => {
        const code = generateRandomCode();
        expect(code.length).toBe(6);
    });

    it('should generate a code containing only alphanumeric characters', () => {
        const code = generateRandomCode();
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        expect(alphanumericRegex.test(code)).toBe(true);
    });

    it('should generate different codes on each call', () => {
        const code1 = generateRandomCode();
        const code2 = generateRandomCode();
        expect(code1).not.toBe(code2);
    });
});