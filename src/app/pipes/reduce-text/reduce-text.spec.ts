import { ReduceTextPipe } from "./reduce-text.pipe";

describe('ReduceTextPipe', () => {
    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('should ReduceTextPipe be created', () => {
        expect(pipe).toBeTruthy();
    });

    it('uses transform correctly', () => {
        const text = 'This is a text to check a pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);
    });
});