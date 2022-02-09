import React from 'react';
import { v4 as uuid } from 'uuid';
import { Mode } from '@tonaljs/tonal';

interface IModes {
    selectedKey: any;
    selectedMode: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Modes = (props: IModes): any => {
    const { selectedKey, selectedMode, onClick } = props;
    const mode = selectedMode.split(' ');

    const modeScale = Mode.notes(mode[1], mode[0]);
    return (
        <div className="flex flex-col">
            <div className="flex space-x-4 mb-8">
                {selectedKey.modes.map((e: string) => {
                    return (
                        <button
                            key={uuid()}
                            type="button"
                            name={e}
                            onClick={onClick}
                            className={`text-s capitalize flex justify-self-center items-center justify-center rounded-md px-4  h-8 filter drop-shadow-md ${
                                e === selectedMode ? 'bg-special-orange text-white' : 'bg-white text-special-grey'
                            }`}
                        >
                            {e}
                        </button>
                    );
                })}
            </div>
            <div className="flex space-x-8">
                {modeScale.map((e: string) => {
                    return (
                        <div className="text-white" key={uuid()}>
                            {e}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
