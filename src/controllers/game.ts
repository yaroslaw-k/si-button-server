import {gameType, teamColors} from "./models";


const socketService = require('./socket-service')
const lightService = require('./light-service')


export class Game {
    teams: teamColors[];
    teamsCount: number;
    phase: 'waiting' | 'answering' | 'stop';

    constructor(teams: teamColors[]) {
        this.teams = teams;
        this.teamsCount = teams.length;
        this.phase = "stop";
    }
}

export class SiGame extends Game {
    wrongAnswered: teamColors[];
    answeringTeam: teamColors;
    type: gameType = 'si';
    constructor(gameType) {
        super(gameType);
        this.sendSocketGameState();
    }

    sendSocketGameState(){
        socketService.socketConnections.sendGameState({
            gameType: this.type,
            teams: this.teams,
            gamePhase: this.phase,
            answeringTeam: this.answeringTeam,
            wrongAnswered: this.wrongAnswered,
        });
    }


    startWaiting() {
        this.phase = "waiting";
        lightService.waiting();
        this.sendSocketGameState();
        return;
    }

    // player
    makeAnswer(team: teamColors) {
        if (this.phase !== 'waiting') {
            return;
        }
        this.phase = "answering";
        this.answeringTeam = team;
        lightService.answer(team, 3);
        this.sendSocketGameState();

    }

    answerResult(right: boolean) {
        if (right) {
            this.phase = "stop";
            lightService.right();
            setTimeout(lightService.default, 3000);
            this.wrongAnswered = this.wrongAnswered || [];
        } else {
            console.log('1');
            lightService.wrong();
            this.wrongAnswered = this.wrongAnswered || [];
            this.wrongAnswered.push(this.answeringTeam);

            // если у всех одна попытка

            // if (this.wrongAnswered.length === this.teamsCount) {
            //     this.phase = "stop";
            //     setTimeout(lightService.default, 3000);
            //     // light stop;
            //     // socket stop;
            // } else {
            //     this.phase = "waiting";
            //     setTimeout(lightService.waiting, 3000);
            // }

            //
            this.phase = "waiting";
            //     setTimeout(lightService.waiting, 3000);
        }
        this.sendSocketGameState();
    }
    getState() {
        return {
            teams: this.teams,
            phase: this.phase,
            answeringTeam: this.answeringTeam,
            gameType: this.type
        };
    }

    stopGame() {
        this.phase = "stop";
        this.wrongAnswered = this.wrongAnswered || [];
        // socket;
        lightService.default();
        this.sendSocketGameState();
    }
}

export class ChgkGame extends Game {
    phase: 'stop' | 'waiting';
    answered: { team: teamColors; answer: string }[] = [];
    type: gameType = 'chgk';

    constructor(teams) {
        super(teams);
        socketService.socketConnections.sendGameState({
            gameType: this.type,
            teams: this.teams,
            gamePhase: this.phase
        });
    }

    sendSocketGameState(){
        socketService.socketConnections.sendGameState({
            gameType: this.type,
            teams: this.teams,
            gamePhase: this.phase,
            answered: this.answered,
        });
    }

    startWaiting() {
        this.answered = [];
        this.phase = "waiting";
        lightService.waiting();
        this.sendSocketGameState();
        return;
    }


    getState() {
        return {
            phase: this.phase,
            teams: this.teams,
            answered: this.answered,
            gameType: this.type};
    }

    stopGame() {
        this.phase = "stop";
        lightService.default();
        this.sendSocketGameState();
        // light stop;

    }

    makeAnswer(team: teamColors, answer: string) {
        if (this.answered.every( a => a.team !== team)){
            this.answered.push({team, answer});
            lightService.answer(team, 0.3);
            this.sendSocketGameState();
        }
        // this.answered.push({team, answer});
        // socket
        // light

    }


}

export class BRGame extends Game {
    type: gameType = 'brain';
    freezed: teamColors[] = [];

    constructor(teams) {
        super(teams);
        socketService.socketConnections.sendGameState({
            gameType: this.type,
            teams: this.teams,
            gamePhase: this.phase
        });
    }
    freeze: { team: teamColors; time }[];

    getState() {
        return {
            phase: this.phase,
            teams: this.teams,
            freezed: this.freezed,
            gameType: this.type};
    }

    stopGame() {
        this.phase = "stop";
        // socket;
        // light stop;

    }

    answerResult() {

    }
}


