import {BRGame, ChgkGame, Game, SiGame} from "./game";
import {gameType, teamColors} from "./models";


let game:   BRGame | ChgkGame | SiGame | any;

module.exports = {

    getState: function (){
        if (!game) return {gameType: false};
        return game.getState();
    },

    startGame: function (type: gameType, teams: teamColors[]) {
        switch (type){
            case "si":{
                game = new SiGame(teams);
                break;
            }
            case "chgk":{
                game = new ChgkGame(teams);
                break;
            }
            case "brain":{
                game = new BRGame(teams);
                break;
            }
        }
        return true;

    },

    makeAnswer: function ( team: teamColors, answer?: string){
        // if phase
        if(answer){
            game.makeAnswer(team, answer)
        }
        game.makeAnswer(team);
        return true;

    },

    startWaiting: function (){
        game.startWaiting();
        return true;
    },

    answerResult: function (right: boolean){
        game.answerResult(right);
        return true;

    },

    stopGame: function (){
        game.stopGame();
        return true;
    },

    tenSeconds: function (){
        game.tenSecond();
        return true;
    }




}
