import {teamColors} from "./models";

const axios = require('axios');


module.exports = {
    right: function () {
        axios.post('http://192.168.31.254:5000/api-light/set-mode', {
            "mode": "staticColors",
            "params": {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 0, "g": 255, "b": 0, "w": 0}}
        }).then(res => {
            // setTimeout(this.default, 2000)
        })
    },
    wrong: function () {
        axios.post('http://192.168.31.254:5000/api-light/set-mode', {
            "mode": "staticColors",
            "params": {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 255, "g": 0, "b": 0, "w": 0}}
        }).then(res => {
            // setTimeout(this.waiting, 2000)
        })
    },
    answer: function (color: teamColors, duration: number) {
        let params  = {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 0, "g": 0, "b": 0, "w": 10}}
        switch (color){
            case 'cyan':{
                params = {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 0, "g": 255, "b": 255, "w": 0}};
                break;
            }
            case "purple": {
                params = {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 255, "g":0 , "b": 255, "w": 0}};
                break;
            }
            case "yellow": {
                params = {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 255, "g": 255, "b": 0, "w": 0}};
                break;
            }
        }
        axios.post('http://192.168.31.254:5000/api-light/set-mode', {
            "mode": "staticColors",
            "params": params
        }).then(res => {
            setTimeout(this.waiting, duration*1000)
        })

    },
    strobe: function () {
    },
    default: function () {
        axios.post('http://192.168.31.254:5000/api-light/set-mode', {
            "mode": "staticColors",
            "params": {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 0, "g": 0, "b": 0, "w": 15}}
        }).then(res => {
        })
    },
    waiting: function () {
        axios.post('http://192.168.31.254:5000/api-light/set-mode', {
            "mode": "staticColors",
            "params": {"p1": {"r": 0, "g": 0, "b": 0, "w": 0}, "p0": {"r": 0, "g": 0, "b": 30, "w": 0}}
        }).then(res => {
        })
    },
}
