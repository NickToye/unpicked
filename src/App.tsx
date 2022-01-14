import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Chord } from '@tonaljs/tonal';
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
    const [activeKey, setActiveKey] = useState('C');
    const [activeKeyType, setActiveKeyType] = useState('Major');
    const [showKeys, setShowKeys] = useState(false);
    const [showKeyTypes, setShowKeyTypes] = useState(false);
    const [activeChord, setActiveChord] = useState('');
    const [activeTab, setActiveTab] = useState('chordsTab2');

    const handleRelativeKeyClick = (e: string, x: string): any => {
        setActiveKey(selectedKey(e, x).relative);
        setActiveKeyType(x !== 'Major' ? 'Major' : 'Minor');
    };

    const handleKeyNotesClick = (): any => {
        setShowKeys(!showKeys);
        setShowKeyTypes(false);
    };

    const handleKeyNoteClick = (x: any): any => {
        setActiveKey(x.target.name);
        setShowKeys(false);
    };

    const handleKeyTypesClick = (): any => {
        setShowKeyTypes(!showKeyTypes);
        setShowKeys(false);
    };

    const handleKeyTypeClick = (x: any): any => {
        setActiveKeyType(x.target.name);
        setShowKeyTypes(false);
    };

    const removeSevenths = (e: string): any => {
        if (e.includes('maj7')) {
            return e.replace('maj7', '');
        }
        if (e.includes('7')) {
            return e.replace('7', '');
        }
        return e;
    };

    const handleChordSelect = (c: any): any => {
        setActiveChord(c.target.name);
    };

    const handleTabClick = (e: any): any => {
        setActiveTab(e.target.name);
    };

    return (
        <div className="App flex">
            <div className="flex-auto bg-white text-black">
                <div className="flex p-6 space-x-8 bg-black text-white">
                    <div className="text-2xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">Selected Key</strong>
                        <div className="flex z-10">
                            <div className="relative w-fit mr-2">
                                <button type="button" onClick={handleKeyNotesClick}>
                                    {activeKey}
                                </button>
                                {showKeys ? (
                                    <div className="flex flex-col absolute divide-y divide-grey-500 filter drop-shadow-xl text-black w-16 left-0">
                                        {allNotes.map((e) => {
                                            return (
                                                <button
                                                    className={`px-3 py-1 text-sm bg-white hover:bg-gray-100  ${
                                                        e === activeKey
                                                            ? 'bg-special-orange hover:bg-special-orange text-white'
                                                            : ''
                                                    }`}
                                                    type="button"
                                                    name={e}
                                                    onClick={(x) => handleKeyNoteClick(x)}
                                                >
                                                    {e}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="relative w-fit">
                                <button type="button" onClick={handleKeyTypesClick}>
                                    {activeKeyType}
                                </button>
                                {showKeyTypes ? (
                                    <div className="flex flex-col absolute divide-y divide-grey-500 filter drop-shadow-xl text-black w-24 left-0">
                                        {allTypes.map((e) => {
                                            return (
                                                <button
                                                    className={`px-3 py-1 text-sm bg-white hover:bg-gray-100  ${
                                                        e === activeKeyType
                                                            ? 'bg-special-orange hover:bg-special-orange text-white'
                                                            : ''
                                                    }`}
                                                    type="button"
                                                    name={e}
                                                    onClick={(x) => handleKeyTypeClick(x)}
                                                >
                                                    {e}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    <h4 className="text-2xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">
                            Relative {activeKeyType === 'Major' ? 'Minor' : 'Major'}
                        </strong>
                        <button type="button" onClick={() => handleRelativeKeyClick(activeKey, activeKeyType)}>
                            {selectedKey(activeKey, activeKeyType).relative}
                            {activeKeyType !== 'Major' ? '' : 'm'}
                        </button>
                    </h4>
                    <h4 className="text-2xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">Key Signature</strong>
                        {selectedKey(activeKey, activeKeyType).signature}
                    </h4>
                </div>
                <div className="p-6">
                    <div className="bg-special-orange p-7 rounded-t-md text-left">
                        <h2 className="mb-6 text-white font-bold uppercase text-sm">Key</h2>

                        <div className="grid  grid-cols-7 pt-2">
                            {selectedKey(activeKey, activeKeyType).grades.map((e: string) => (
                                <sup className="justify-self-center text-left pl-2 pb-2 text-white" key={uuid()}>
                                    {e}
                                </sup>
                            ))}
                        </div>
                        <div className="relative">
                            <div className="w-100">
                                <div className="grid grid-cols-7">
                                    {selectedKey(activeKey, activeKeyType).intervals.map((e: string) => (
                                        <div
                                            className="justify-self-center text-xs flex items-center justify-around w-16 h-16 text-white"
                                            key={uuid()}
                                        >
                                            {renameIntervals(e)}
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-7">
                                {selectedKey(activeKey, activeKeyType).scale.map((e: string) => (
                                    <div
                                        className={`flex justify-self-center items-center justify-center bg-white rounded-md p-4 w-16 h-16 filter drop-shadow-md ${
                                            Chord.get(activeChord).notes.indexOf(e) > -1
                                                ? 'bg-special-grey text-white'
                                                : ''
                                        }`}
                                        key={uuid()}
                                    >
                                        {e}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-special-grey rounded-b-md text-white p-7 text-left">
                        <div className="flex space-x-5 mb-4 text-xs`">
                            <button
                                type="button"
                                name="chordsTab"
                                onClick={(e) => handleTabClick(e)}
                                className={`uppercase font-bold ${
                                    activeTab === 'chordsTab' ? 'opacity-100' : 'opacity-50'
                                }`}
                            >
                                Chords
                            </button>
                            <button
                                type="button"
                                name="scalesTab"
                                onClick={(e) => handleTabClick(e)}
                                className={`uppercase font-bold ${
                                    activeTab === 'scalesTab' ? 'opacity-100' : 'opacity-50'
                                }`}
                            >
                                Scales
                            </button>
                            <button
                                type="button"
                                name="tracksTab"
                                onClick={(e) => handleTabClick(e)}
                                className={`uppercase font-bold ${
                                    activeTab === 'tracksTab`' ? 'opacity-100' : 'opacity-50'
                                }`}
                            >
                                Notable Tracks
                            </button>
                        </div>
                        <div className={`flex-col p6 mb-6 ${activeTab === 'chordsTab' ? 'flex' : 'hidden'}`}>
                            <div>
                                <h3 className="text-xs mb-2">with Sevenths</h3>
                                <div className="flex p6 mb-6 space-x-8 ">
                                    {selectedKey(activeKey, activeKeyType).chords.map((e: string) => (
                                        <button
                                            key={uuid()}
                                            type="button"
                                            name={e}
                                            onClick={(c) => handleChordSelect(c)}
                                            className={`flex justify-self-center items-center justify-center   rounded-md p-4 w-16 h-16 filter drop-shadow-md ${
                                                e === activeChord
                                                    ? 'bg-special-orange text-white'
                                                    : 'bg-white text-special-grey'
                                            }`}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs mb-2">without Sevenths</h3>
                                <div className="flex p6 mb-6 space-x-8 ">
                                    {selectedKey(activeKey, activeKeyType).chords.map((e: string) => (
                                        <button
                                            key={uuid()}
                                            type="button"
                                            name={removeSevenths(e)}
                                            onClick={(c) => handleChordSelect(c)}
                                            className={`flex justify-self-center items-center justify-center   rounded-md p-4 w-16 h-16 filter drop-shadow-md ${
                                                removeSevenths(e) === activeChord
                                                    ? 'bg-special-orange text-white'
                                                    : 'bg-white text-special-grey'
                                            }`}
                                        >
                                            {removeSevenths(e)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`flex-col p6 mb-6 ${activeTab === 'scalesTab' ? 'flex' : 'hidden'}`}>
                            <h2>Scales</h2>
                        </div>
                        <div className={`flex-col p6 mb-6 ${activeTab === 'tracksTab' ? 'flex' : 'hidden'}`}>
                            <h2>Notable Tracks</h2>
                        </div>
                    </div>

                    {/* <tbody>
                            <tr>
                                {selectedKey(activeKey, activeKeyType).scale.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody> */}

                    {/* <table className="table-fixed w-full">
                        <caption>Chords</caption>
                        <tbody>
                            <tr>
                                
                            </tr>
                        </tbody>
                    </table> */}
                    {/* <table className="table-fixed w-full">
                        <caption>Modes</caption>
                        <tbody>
                            <tr>
                                {selectedKey(activeKey, activeKeyType).modes.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table> */}
                    {/* <table className="table-fixed w-full">
                        <caption>Secondary Dominants</caption>
                        <tbody>
                            <tr>
                                {selectedKey(activeKey, 'Major').secondaryDominants.map((e: string) => (
                                    <td key={uuid()}>{e}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
    );
};

export default App;
