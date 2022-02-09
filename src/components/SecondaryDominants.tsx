import React from 'react';
import { v4 as uuid } from 'uuid';
import classnames from 'classnames';

interface ISecondaryDominants {
    selectedKey: any;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    activeChord: string;
}

interface ISecondaryDominantsGrade {
    selectedKey: any;
}

function secondaryDominantGradesRel(arr1: any, arr2: any): any {
    const e = arr1.map((v: any, i: any) => {
        return [v, arr2[i]];
    });
    return e;
}

export const SecondaryDominants = (props: ISecondaryDominants): any => {
    const { selectedKey, onClick, activeChord } = props;
    const gradesArray = selectedKey.grades;
    const secondaryDominantsArray = selectedKey.secondaryDominants;

    return (
        <>
            {secondaryDominantGradesRel(gradesArray, secondaryDominantsArray).map((e: string) => {
                const classes = classnames(
                    'text-black flex justify-self-center items-center justify-center   rounded-md p-4 w-16 h-16 filter drop-shadow-md',
                    {
                        'bg-white opacity-100': e[1] !== '',
                        'border border-dashed opacity-30 pointer-events-none': e[1] === '',
                        'bg-special-orange text-white': e[1] === activeChord,
                    },
                );
                return (
                    <button type="button" key={uuid()} name={e[1]} onClick={onClick} className={classes}>
                        {e[1]}
                    </button>
                );
            })}
        </>
    );
};

export const SecondaryDominantsGrade = (props: ISecondaryDominantsGrade): any => {
    const { selectedKey } = props;
    const gradesArray = selectedKey.grades;
    const secondaryDominantsArray = selectedKey.secondaryDominants;
    return (
        <>
            {secondaryDominantGradesRel(gradesArray, secondaryDominantsArray).map((e: string) => (
                <sup className="text-center w-16 h-auto  text-white" key={uuid()}>
                    {e[1] !== '' ? `${e[0]} of V` : ''}
                </sup>
            ))}
        </>
    );
};
