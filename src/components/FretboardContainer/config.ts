type Position = Record<string, string>;

export const fretboardConfiguration = {
    dotTextSize: 10,
    dotText: ({ note }: Position) => note,
    fretCount: 12,
    fretWidth: 5,
    stringWidth: 1,
    dotSize: 26,
    dotFill: '#202124',
    dotStrokeWidth: 0,
    stringColor: 'black',
    fretColor: 'black',
    nutColor: 'black',
    nutWidth: 10,
    fretNumbersColor: '#202124',
    font: 'Futura',
};
