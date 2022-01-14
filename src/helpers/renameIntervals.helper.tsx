const renameIntervals = (e: string): string => {
    switch (e) {
        case '1P':
            return e.replace(e, 'P1');
        case '2M':
            return e.replace(e, 'M2');
        case '3m':
            return e.replace(e, 'm3');
        case '3M':
            return e.replace(e, 'M3');
        case '4P':
            return e.replace(e, 'P4');
        case '5P':
            return e.replace(e, 'P5');
        case '6m':
            return e.replace(e, 'm6');
        case '6M':
            return e.replace(e, 'M6');
        case '7m':
            return e.replace(e, 'm7');
        case '7M':
            return e.replace(e, 'M7');
        default:
    }
    return e;
};

export default renameIntervals;
