export default class storage {
  
  static get $inject() {
    return ['$localStorage'];
  }
  
  constructor($localStorage) {
    this.$storage = $localStorage.$default({
      dimension: 4,  // standard value for 15-puzzle
      showNumber: true,
      highlightRightPlace: true,
      score: [
        // predefined results
        { "username": "Georgy", "dimension": 4, "gameTime": 20, "movesCount": 10, "time": 1494096553227 }
      ]
    });
  }
  
  getStorage() {
    return this.$storage;
  }
  
  getBoardSize() {
    // check $boardSize sass variable
    return 480;
  }
}