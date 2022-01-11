import React from 'react';
import { Key } from '@tonaljs/tonal';

interface INotes {
    type: string;
    selectedKey: string;
}

const Notes = (props: INotes): any => {
    const { type, selectedKey } = props;
    console.log(type === 'Major' ? Key.majorKey(selectedKey) : Key.minorKey(selectedKey));
    return (
        <h1>
            Notes - {type} - {selectedKey}{' '}
        </h1>
    );
};

export default Notes;
