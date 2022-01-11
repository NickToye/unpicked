import React, { FC } from 'react';
import classnames from 'classnames';

interface Props {
    children: React.ReactNode;
    onClick: () => void;
    active: boolean;
}

const Button: FC<Props> = ({ children, onClick, active }) => {
    const buttonClasses = classnames('btn', {
        active,
    });
    return (
        <button className={buttonClasses} onClick={onClick} type="button">
            {children}
        </button>
    );
};

export default Button;
