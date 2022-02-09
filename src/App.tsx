import React, { FC, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Chord } from '@tonaljs/tonal';
import ChordChart from './components/ChordChart';
import ChordProgressions from './components/ChordProgressions';
import PrimaryChords from './components/PrimaryChords';
import FretboardContainer from './components/FretboardContainer';
import { SecondaryDominants, SecondaryDominantsGrade } from './components/SecondaryDominants';
import { Modes } from './components/Scales';
import {
    removeSevenths,
    getChords,
    getModes,
    getGrades,
    getSecondaryDominants,
    getRelative,
    getSignature,
    getIntervals,
    getScale,
} from './helpers/music.helper';
import './App.css';

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

const App: FC = () => {
    const [activeKey, setActiveKey] = useState('C');
    const [activeKeyType, setActiveKeyType] = useState('Major');
    const [showKeys, setShowKeys] = useState(false);
    const [showKeyTypes, setShowKeyTypes] = useState(false);
    const [activeChord, setActiveChord] = useState(removeSevenths(getChords(activeKey, activeKeyType)[0]));
    const [activeTab, setActiveTab] = useState('scalesTab');
    const [chordsType, setChordsType] = useState('standard');
    const [activeMode, setActiveMode] = useState('C major');

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

    useEffect(() => {
        setActiveChord(removeSevenths(getChords(activeKey, activeKeyType)[0]));
    }, [activeKey, activeKeyType]);

    const handleKeyTypesClick = (): any => {
        setShowKeyTypes(!showKeyTypes);
        setShowKeys(false);
    };

    const handleKeyTypeClick = (x: any): any => {
        setActiveKeyType(x.target.name);
        setShowKeyTypes(false);
    };

    const handleChordSelect = (c: any): any => {
        setActiveChord(c.target.name);
    };

    const handleModeSelect = (c: any): any => {
        setActiveMode(c.target.name);
    };

    const handleTabClick = (e: any): any => {
        setActiveTab(e.target.name);
    };

    const handleChordsTypeClick = (e: any): any => {
        setChordsType(e.target.name);
    };

    return (
        <div className="App flex">
            <div className="flex-auto bg-white text-black">
                <div className="flex p-6 space-x-8 bg-black text-white sticky z-10 top-0 w-full">
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
                        <div className="flex space-x-5 mb-9 text-xs`">
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
                                <div className="flex p6 mb-6 space-x-8 ">
                                    <div className="text-xs cursor-pointer w-36">
                                        <button
                                            type="button"
                                            name="standard"
                                            onClick={(e) => handleChordsTypeClick(e)}
                                            className={`mr-1 ${
                                                chordsType === 'standard' ? 'opacity-100' : 'opacity-50'
                                            }`}
                                        >
                                            Standard
                                        </button>
                                        /
                                        <button
                                            type="button"
                                            name="sevenths"
                                            onClick={(e) => handleChordsTypeClick(e)}
                                            className={`ml-1 ${
                                                chordsType === 'sevenths' ? 'opacity-100' : 'opacity-50'
                                            }`}
                                        >
                                            Sevenths
                                        </button>
                                    </div>

                                    <PrimaryChords
                                        selectedKey={selectedKey(activeKey, activeKeyType)}
                                        onClick={(c) => handleChordSelect(c)}
                                        activeChord={activeChord}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex mb-6 space-x-8">
                                    <h3 className="text-xs mb-2 w-36">Secondary Dominants</h3>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row space-x-8 mb-10">
                                            <SecondaryDominants
                                                selectedKey={selectedKey(activeKey, activeKeyType)}
                                                onClick={(c) => handleChordSelect(c)}
                                                activeChord={activeChord}
                                            />
                                        </div>
                                        <div className="flex flex-row space-x-8 mb-9">
                                            <SecondaryDominantsGrade
                                                selectedKey={selectedKey(activeKey, activeKeyType)}
                                            />
                                        </div>
                                        <div className="flex flex-col bg-white p-5 filter drop-shadow-md">
                                            <ChordChart chordName={activeChord} />
                                            <ChordProgressions chord={activeKey} chordType={activeKeyType} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex-col p6 mb-6 ${activeTab === 'scalesTab' ? 'flex' : 'hidden'}`}>
                            <h2>Scales</h2>
                            {/* <Scales selectedMode={activeMode} /> */}

                            <FretboardContainer root={activeKey} scale={activeKeyType} />
                            <div className="flex p6 mb-6 space-x-8 ">
                                <Modes
                                    selectedKey={selectedKey(activeKey, activeKeyType)}
                                    selectedMode={activeMode}
                                    onClick={(c) => handleModeSelect(c)}
                                />
                            </div>
                        </div>
                        <div className={`flex-col p6 mb-6 ${activeTab === 'tracksTab' ? 'flex' : 'hidden'}`}>
                            <h2>Notable Tracks</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
