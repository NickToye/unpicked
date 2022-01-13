import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

import {
    getChords,
    getModes,
    getGrades,
    getSecondaryDominants,
    getRelative,
    getSignature,
    getIntervals,
    getScale,
} from './helpers/music.helper';
import renameIntervals from './helpers/renameIntervals.helper';

interface Keys {
    type: string;
    key: string;
    chords: [];
    modes: [];
    secondaryDominants: [];
    grades: [];
    relative: string;
    signature: string;
    intervals: [];
    scale: [];
}

function selectedKey(e: Keys['key'], x: Keys['type']): Keys {
    return {
        type: x,
        key: e,
        chords: getChords(e, x),
        modes: getModes(e, x),
        secondaryDominants: getSecondaryDominants(e, x),
        grades: getGrades(e, x),
        relative: getRelative(e, x),
        signature: getSignature(e, x),
        intervals: getIntervals(e, x),
        scale: getScale(e, x),
    };
}

const allNotes = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G'];
const allTypes = ['Major', 'Minor', 'Harmonic', 'Melodic'];
// const degrees = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading'];

const App: FC = () => {
    const [activeKey, setActiveKey] = useState('Ab');
    const [activeType, setActiveType] = useState('Major');

    const handleKeyChange = (e: any): any => {
        setActiveKey(e.target.value);
    };

    const handleTypeChange = (e: any): any => {
        setActiveType(e.target.value);
    };

    const handleRelativeKeyClick = (e: string, x: string): any => {
        setActiveKey(selectedKey(e, x).relative);
        setActiveType(x !== 'Major' ? 'Major' : 'Minor');
    };

    return (
        <div className="App flex">
            <div className="flex-auto bg-main-new">
                <div className="flex p-6  bg-sidebar-new">
                    <select
                        value={activeKey}
                        onChange={(e) => handleKeyChange(e)}
                        className="bg-transparent appearance-none focus-outline-none outline-none"
                    >
                        {allNotes.map((e) => (
                            <option key={uuid()} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                    <select
                        value={activeType}
                        onChange={(e) => handleTypeChange(e)}
                        className="bg-transparent appearance-none focus-outline-none outline-none"
                    >
                        {allTypes.map((e) => (
                            <option key={uuid()} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex p-6 space-x-8">
                    <h4 className="text-3xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">Selected Key</strong>
                        {activeKey} {activeType}
                    </h4>
                    <h4 className="text-3xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">
                            Relative {activeType === 'Major' ? 'Minor' : 'Major'}
                        </strong>
                        <button type="button" onClick={() => handleRelativeKeyClick(activeKey, activeType)}>
                            {selectedKey(activeKey, activeType).relative}
                            {activeType !== 'Major' ? '' : 'm'}
                        </button>
                    </h4>
                    <h4 className="text-3xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">Key Signature</strong>
                        {selectedKey(activeKey, activeType).signature}
                    </h4>
                </div>
                <div className="p-6">
                    <table className="table-fixed w-full border-collapse  border border-white">
                        <thead>
                            <tr>
                                {selectedKey(activeKey, activeType).grades.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>

                            <tr>
                                {selectedKey(activeKey, activeType).intervals.map((e: string) => (
                                    <td key={uuid()}>{renameIntervals(e)}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {selectedKey(activeKey, activeType).scale.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-fixed w-full">
                        <caption>Chords</caption>
                        <tbody>
                            <tr>
                                {selectedKey(activeKey, activeType).chords.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-fixed w-full">
                        <caption>Modes</caption>
                        <tbody>
                            <tr>
                                {selectedKey(activeKey, activeType).modes.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-fixed w-full">
                        <caption>Secondary Dominants</caption>
                        <tbody>
                            <tr>
                                {selectedKey(activeKey, 'Major').secondaryDominants.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-6">
                    <table className="table-fixed w-full border-collapse  border border-white">
                        <thead>
                            <tr />
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;
