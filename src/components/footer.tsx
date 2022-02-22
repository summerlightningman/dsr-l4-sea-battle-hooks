import {Component} from "react";
import {CellType} from "../types/cell";

import Cell from "./cell";

import '../styles/footer.css';

class Footer extends Component {
    cellDescriptions: [CellType, string][]

    constructor(props: {}) {
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
        const doNothing = () => {};

        return <footer className="footer">
            <h3>Легенда</h3>
            <div className="cell-container">
                {
                    this.cellDescriptions.map(([type, description], idx) =>
                        <div className="cell-container__item" key={idx}>
                            <Cell cellType={type} onCellClick={doNothing}/>
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