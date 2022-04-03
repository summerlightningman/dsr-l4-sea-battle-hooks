import {FC} from 'react';

import {HeaderProps} from "../types/header";

import {gameTitle} from "../config";

import '../styles/header.css';

const Header: FC<HeaderProps> = ({resetAll}) => {
    return <header className="header">
        <h1 className="header__text">{gameTitle}</h1>
        <button className="btn" onClick={resetAll}>Начать сначала</button>
    </header>
}

export default Header