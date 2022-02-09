import React from 'react';
import { v4 as uuid } from 'uuid';

import { Progression } from '@tonaljs/tonal';
import ChordChart from './ChordChart';

interface IChordProgression {
    chord: string;
    chordType: string;
}

function chordProgType(x: any, y: any): any {
    switch (x) {
        case 'Major':
            return Progression.fromRomanNumerals(y, ['IMaj7', 'IIm7', 'V7']);
        case 'Minor':
            return Progression.fromRomanNumerals(y, ['IM7', 'IIm7b5', 'V7']);
        default:
    }
    return x;
}

const ChordProgression = (props: IChordProgression): any => {
    const { chord, chordType } = props;

    return (
        <div className="text-black py-8">
            <h1 className="mb-8">Chord Progressions</h1>
            <div className="flex space-x-8 text-white">
                {chordProgType(chordType, chord).map((x: string): any => {
                    return <ChordChart key={uuid()} chordName={x} />;
                })}
            </div>
        </div>
    );
};

export default ChordProgression;
