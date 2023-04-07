"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class randomScreenNameGenerator {
    constructor() {
        this.animals = [
            'aardvark',
            'albatross',
            'alligator',
            'alpaca',
            'ant',
            'anteater',
            'antelope',
            'ape',
            'armadillo',
        ];
        this.colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White', 'Brown', 'Pink'];
    }
    generateRandomScreenName() {
        let animal = this.animals[Math.floor(Math.random() * this.animals.length)];
        let color = this.colors[Math.floor(Math.random() * this.colors.length)];
        let screenName = {
            name: color + ' ' + animal,
            abbreviation: color[0] + animal[0],
        };
        return screenName;
    }
}
exports.default = randomScreenNameGenerator;
//# sourceMappingURL=randomScreenNameGenerator.js.map