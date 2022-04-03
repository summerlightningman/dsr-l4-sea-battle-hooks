import {FC} from "react";

import {ConfirmationScreenProps} from "../types/confirmation-screen";

import ActionButton from "./action-button";

import '../styles/confirmation-screen.css';


const  ConfirmationScreen: FC<ConfirmationScreenProps> = ({currPlayer, currStage, onNextStage}) => {

        return <div className="confirmation-screen">
            <p className="confirmation-screen__text">Игрок {currPlayer}, подтвердите передачу хода</p>
            <ActionButton
                onNextStage={onNextStage}
                gameStage={currStage}
                isReadyForNextStage={true}
            />
        </div>

}

export default ConfirmationScreen