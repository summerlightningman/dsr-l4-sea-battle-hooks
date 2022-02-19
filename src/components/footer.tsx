import {Component} from "react";
import {CellType} from "../types/cell";


import Cell from "./cell";

import {FooterProps} from "../types/footer";

import '../styles/footer.css';

class Footer extends Component<FooterProps> {
    cellDescriptions: [CellType, string][]

    constructor(props: FooterProps) {
        super(props);

        this.cellDescriptions = [
            [CellType.EMPTY, 'Пусто'],
            [CellType.HAS_SHIP, 'Корабль'],
            [CellType.ATTACKED, 'Цель атаки'],
            [CellType.MISSED, 'Промах'],
            [CellType.KILLED, 'Убитый корабль']
        ]
    }

    render() {
        const doNothing = () => {
        };


        return <footer className="footer">
            <h3>Легенда</h3>
            <div className="cell-container">
                {
                    this.cellDescriptions.map(([type, description], idx) =>
                        <div className="cell-container__item" key={idx}>
                            <Cell cellState={type} onCellClick={doNothing}/>
                            <span>&mdash;</span>
                            <span className="cell-container__description">{description}</span>
                        </div>
                    )
                }
            </div>
        </footer>
    }
}

export default Footer;