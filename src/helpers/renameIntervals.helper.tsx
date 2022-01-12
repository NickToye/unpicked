const renameIntervals = (e: string): string => {
    switch (e) {
        case '1P':
            return e.replace(e, '');
        case '2M':
            return e.replace(e, 'Major Second');
        case '3m':
            return e.replace(e, 'Minor Third');
        case '3M':
            return e.replace(e, 'Major Third');
        case '4P':
            return e.replace(e, 'Perfect Fourth');
        case '5P':
            return e.replace(e, 'Perfect Fifth');
        case '6m':
            return e.replace(e, 'Minor Sixth');
        case '6M':
            return e.replace(e, 'Major Sixth');
        case '7m':
            return e.replace(e, 'Minor Seventh');
        case '7M':
            return e.replace(e, 'Major Seventh');
        default:
    }
    return e;
};

export default renameIntervals;