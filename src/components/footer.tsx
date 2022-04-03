import {FC} from "react";

import Cell from "./cell";

import '../styles/footer.css';
import {cellDescriptions} from "../config";

const Footer: FC = () => {
    return <footer className="footer">
        <h3>Легенда</h3>
        <div className="cell-container">
            {
                cellDescriptions.map(([type, description], idx) =>
                    <div className="cell-container__item" key={idx}>
                        <Cell cellType={type}/>
                        <span>&mdash;</span>
                        <span className="cell-container__description">{description}</span>
                    </div>
                )
            }
        </div>
    </footer>
};


export default Footer;