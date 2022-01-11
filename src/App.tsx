import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Key } from '@tonaljs/tonal';
import './App.css';

import Button from './components/Button';
import Notes from './components/Notes';
import renameIntervals from './helpers/renameIntervals.helper';

const allKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
// const degrees = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading'];

const App: FC = () => {
    const [selectedKey, setSelectedKey] = useState('C');
    const [type, setType] = useState('Major');

    const relativeKey = (e: string): string => {
        let res;
        if (e === 'major') {
            res = Key.majorKey(selectedKey).minorRelative;
        } else {
            res = Key.minorKey(selectedKey).relativeMajor;
        }
        return res;
    };

    const keySignature = (e: string): string => {
        let res;
        if (e === 'major') {
            res = Key.majorKey(selectedKey).keySignature;
        } else {
            res = Key.minorKey(selectedKey).keySignature;
        }
        return res;
    };

    return (
        <div className="App flex">
            <div className="flex-auto w-8 p-4 h-screen bg-sidebar-new  divide-y divide-special-new">
                <div className="pb-2">
                    <Button active={type === 'Major'} onClick={() => setType('Major')}>
                        Major
                    </Button>
                    <Button active={type === 'Minor'} onClick={() => setType('Minor')}>
                        minor
                    </Button>
                </div>
                <div className="grid gap-1 p-4">
                    {allKeys.map((e) => {
                        return (
                            <Button active={selectedKey === e} key={uuid()} onClick={() => setSelectedKey(e)}>
                                {e}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className="flex-auto w-5/6 p-4 bg-main-new">
                <h1>{type}</h1>
                <div className="flex space-x-8">
                    <h4 className="text-3xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">Selected Key</strong>
                        {selectedKey}
                        {type === 'Minor' ? 'm' : ''}
                    </h4>
                    <h4 className="text-3xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">
                            Relative {type === 'Major' ? 'Minor' : 'Major'}
                        </strong>
                        {relativeKey(type)}
                        {type === 'Minor' ? '' : 'm'}
                    </h4>
                    <h4 className="text-3xl flex flex-col items-start">
                        <strong className="font-normal text-sm opacity-50">Key Signature</strong>
                        {keySignature(type)}
                    </h4>
                </div>
                <div className="py-4">
                    <table className="table-fixed w-full border-collapse  border border-white">
                        <thead>
                            <tr>
                                {Key.majorKey(selectedKey).grades.map((e) => {
                                    return <th key={uuid()}>{e}</th>;
                                })}
                            </tr>

                            <tr>
                                {Key.majorKey(selectedKey).intervals.map((e) => {
                                    return (
                                        <td className="text-sm" key={uuid()}>
                                            {renameIntervals(e)}
                                        </td>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Notes type={type} selectedKey={selectedKey} />
                                {type === 'Major'
                                    ? Key.majorKey(selectedKey).scale.map((e) => {
                                          return <td key={uuid()}>{e}</td>;
                                      })
                                    : Key.minorKey(selectedKey).natural.scale.map((e) => {
                                          return <td key={uuid()}> {e}</td>;
                                      })}
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-fixed w-full">
                        <caption>Chords</caption>
                        <tbody>
                            <tr>
                                {/* {chords(type).map((e) => {
                                    return <td key={uuid()}>{e}</td>;
                                })} */}
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-fixed w-full">
                        <caption>Modes</caption>
                        <tbody>
                            <tr>
                                {Key.majorKey(selectedKey).chordScales.map((e) => {
                                    return <td key={uuid()}>{e}</td>;
                                })}
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-fixed w-full">
                        <caption>Secondary Dominants</caption>
                        <tbody>
                            <tr>
                                {Key.majorKey(selectedKey).secondaryDominants.map((e) => {
                                    return (
                                        <td key={uuid()}>
                                            {e}
                                            <small>*</small>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;
