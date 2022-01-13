import { Key } from '@tonaljs/tonal';

export function getChords(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).chords;
        case 'Minor':
            return Key.minorKey(e).natural.chords;
        case 'Harmonic':
            return Key.minorKey(e).harmonic.chords;
        case 'Melodic':
            return Key.minorKey(e).melodic.chords;
        default:
    }
    return x;
}

export function getModes(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).chordScales;
        case 'Minor':
            return Key.minorKey(e).natural.chordScales;
        case 'Harmonic':
            return Key.minorKey(e).harmonic.chordScales;
        case 'Melodic':
            return Key.minorKey(e).melodic.chordScales;
        default:
    }
    return x;
}

export function getGrades(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).grades;
        case 'Minor':
            return Key.minorKey(e).natural.grades;
        case 'Harmonic':
            return Key.minorKey(e).harmonic.grades;
        case 'Melodic':
            return Key.minorKey(e).melodic.grades;
        default:
    }
    return x;
}

export function getSecondaryDominants(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).secondaryDominants;
        case 'Minor':
            return Key.minorKey(e).natural.chordScales;
        case 'Harmonic':
            return Key.minorKey(e).harmonic.chordScales;
        case 'Melodic':
            return Key.minorKey(e).melodic.chordScales;
        default:
    }
    return x;
}

export function getRelative(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).minorRelative;
        case 'Minor':
            return Key.minorKey(e).relativeMajor;
        case 'Harmonic':
            return Key.minorKey(e).relativeMajor;
        case 'Melodic':
            return Key.minorKey(e).relativeMajor;
        default:
    }
    return x;
}

export function getSignature(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).keySignature;
        case 'Minor':
            return Key.minorKey(e).keySignature;
        case 'Harmonic':
            return Key.minorKey(e).keySignature;
        case 'Melodic':
            return Key.minorKey(e).keySignature;
        default:
    }
    return x;
}

export function getIntervals(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).intervals;
        case 'Minor':
            return Key.minorKey(e).natural.intervals;
        case 'Harmonic':
            return Key.minorKey(e).harmonic.intervals;
        case 'Melodic':
            return Key.minorKey(e).melodic.intervals;
        default:
    }
    return x;
}

export function getScale(e: string, x: string): any {
    switch (x) {
        case 'Major':
            return Key.majorKey(e).scale;
        case 'Minor':
            return Key.minorKey(e).natural.scale;
        case 'Harmonic':
            return Key.minorKey(e).harmonic.scale;
        case 'Melodic':
            return Key.minorKey(e).melodic.scale;
        default:
    }
    return x;
}
