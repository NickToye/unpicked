import React, { useEffect, useRef, useState } from 'react';
import { Fretboard, Systems } from '@moonwave99/fretboard.js';
import { fretboardConfiguration } from './config';

interface IFretboardContainer {
    root: string;
    scale: string;
}

const FretboardContainer = (props: IFretboardContainer): any => {
    const { root, scale } = props;
    const fretboard = useRef<Fretboard>();
    const elRef = useRef(null);
    const [activeBox, setActiveBox] = useState('1');

    const boxes = ['1', '2', '3', '4', '5', '6', '7'];

    const handleBoxClick = (e: any): any => {
        console.log(e.target.value.toString());
        setActiveBox(e.target.value);
        console.log(activeBox.toString());
    };

    useEffect(() => {
        if (!fretboard.current) {
            fretboard.current = new Fretboard({
                el: elRef.current,
                ...fretboardConfiguration,
            }).render();
        }
    }, []);

    useEffect(() => {
        if (!fretboard.current) {
            return;
        }

        fretboard.current
            .renderScale({
                type: scale.toLowerCase(),
                root,
                box: {
                    box: activeBox,
                    system: Systems.TNPS,
                },
            })
            .style({
                filter: { interval: '1P' },
                fill: '#f4624a',
                stroke: '#202124',
            });
    });

    return (
        <div className="fretboard mb-5">
            <div className="flex space-x-4 p-3 text-black">
                <h3 className="">
                    {root} {scale}
                </h3>
                <div>
                    {boxes.map((e) => {
                        return (
                            <button
                                className={`px-3 py-1 text-sm bg-white hover:bg-gray-100  ${
                                    e === activeBox ? 'bg-special-orange hover:bg-special-orange text-white' : ''
                                }`}
                                type="button"
                                value={e}
                                onClick={(x) => handleBoxClick(x)}
                            >
                                {e}
                            </button>
                        );
                    })}
                </div>
            </div>
            <figure ref={elRef} />
        </div>
    );
};

export default FretboardContainer;
