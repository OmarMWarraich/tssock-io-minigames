export default class randomScreenNameGenerator {
    private animals = [
        'aardvark',
        'albatross',
        'alligator',
        'alpaca',
        'ant',
        'anteater',
        'antelope',
        'ape',
        'armadillo',
    ]
    private colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White', 'Brown', 'Pink']

    constructor() {}

    public generateRandomScreenName() {
        let animal = this.animals[Math.floor(Math.random() * this.animals.length)]
        let color = this.colors[Math.floor(Math.random() * this.colors.length)]
        let screenName: ScreenName = {
            name: color + ' ' + animal,
            abbreviation: color[0] + animal[0],
        }
        return screenName
    }
}
