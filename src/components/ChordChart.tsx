import React from 'react';
import { findGuitarChord } from 'chord-fingering';
import GuitarChord from 'react-guitar-chords';

interface IChordChart {
    chordName: string;
}

const convertToNumber = (e: any): any => {
    if (Number(e)) {
        return Number(e);
    }
    if (e === '0') {
        return 0;
    }
    return e;
};

const ChordChart = (props: IChordChart): any => {
    const { chordName } = props;
    const chord = findGuitarChord(chordName);
    const data = String(chord.fingerings[0].positionString).split('', 6);

    const forFrets = data.map(convertToNumber);

    return (
        <div className="guitar-chart">
            <GuitarChord chordName={chordName} frets={forFrets} />
        </div>
    );
};

export default ChordChart;
