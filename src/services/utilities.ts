const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const getNextLetter = (currentLetter: string, incrementBy: number): string | null => {
    const currentIndex = letters.indexOf(currentLetter.toUpperCase());

    if (currentLetter.toUpperCase() === 'H' && incrementBy === 1) return null;

    if (currentLetter.toUpperCase() === 'A' && incrementBy === -1) return null;

    const nextIndex = (currentIndex + incrementBy) % letters.length;
    const nextLetter = letters[nextIndex < 0 ? nextIndex + letters.length : nextIndex];
    return nextLetter;
};

export const getLetterNumber = (letter: string): number => {
    const upperLetter = letter.toUpperCase();
    const index = letters.indexOf(upperLetter);
    return index + 1;
};
