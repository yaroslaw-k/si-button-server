import {gameType, teamColors} from "../controllers/models";


const express = require('express');
const router = express.Router();

let controller = require('../controllers/controller');

//router.get('/get-state', function(req, res, next) {
//     res.json(lightEngine.currentMode);
// });
// router.post('/set-mode', function (req, res) {
//     let body = req.body;
//     lightEngine.setMode(body.mode, body.params);
//     res.sendStatus(200);
// });

router.get('/game-state', function (req, res){
    let st = controller.getState();
    res.json(st);
})

router.post('/start-game', function (req, res, next){
    let body: {type: gameType, teams: teamColors[]} = req.body;
    controller.startGame(body.type, body.teams);
    res.json({});
});

router.post('/make-answer', function (req, res){
    let body: {team: teamColors, answer?: string} = req.body;
    controller.makeAnswer(body.team, body.answer);
    res.json({});

});

router.post('/start-waiting', function (req, res){
    controller.startWaiting();
    res.json({});
});

router.post('/answer-result', function (req, res){
    let body: {right: boolean} = req.body;
    controller.answerResult(body.right);
    res.json({});
});

router.post('/stop-game', function (req, res){
    controller.stopGame();
    res.json({});
});

router.post('/ten-seconds', function (req, res){
   controller.tenSeconds();
    res.json({});
})

module.exports = router;
