import {Component} from 'react';

import {GameInfoProps} from "../types/header";

import {gameTitle} from "../config";

import '../styles/header.css';

class Header extends Component<GameInfoProps> {
    render() {
        return <header className="header">
            <h1 className="header__text">{gameTitle}</h1>
            <button className="btn" onClick={this.props.resetAll}>Начать сначала</button>
        </header>
    }
}

export default Header