import React from 'react';
import { v4 as uuid } from 'uuid';

interface IPrimaryChords {
    selectedKey: any;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    activeChord: string;
}

const removeSevenths = (e: string): any => {
    if (e.includes('maj7')) {
        return e.replace('maj7', '');
    }
    if (e.includes('m7b')) {
        return e;
    }
    if (e.includes('7')) {
        return e.replace('7', '');
    }
    return e;
};

const PrimaryChords = (props: IPrimaryChords): any => {
    const { selectedKey, onClick, activeChord } = props;

    return (
        <>
            {selectedKey.chords.map((e: string) => {
                return (
                    <button
                        key={uuid()}
                        type="button"
                        name={removeSevenths(e)}
                        onClick={onClick}
                        className={`flex justify-self-center items-center justify-center rounded-md p-4 w-16 h-16 filter drop-shadow-md ${
                            removeSevenths(e) === activeChord
                                ? 'bg-special-orange text-white'
                                : 'bg-white text-special-grey'
                        }`}
                    >
                        {removeSevenths(e)}
                    </button>
                );
            })}
        </>
    );
};

export default PrimaryChords;
