class modalCtrl {
  static get $inject() {
    return ['score'];
  }
  
  constructor(score) {
    this.score = score;
  }
}

export default class modal {
  
  static get $inject() {
    return ['$modal'];
  }
  
  constructor($modal) {
    this.$modal = $modal;
  }
  
  openWin(dimension, time, movesCount) {
    return this.$modal.open({
      template: `
        <div>
          <h2>You win!</h2>
          <h4>Your result: </h4>
          <p>
            <span>dimension: <strong>{{ modalCtrl.score.dimension}}</strong></span>
            <span>time: <strong>{{ modalCtrl.score.time}}</strong> sec</span>
            <span>moves: <strong>{{ modalCtrl.score.movesCount}}</strong></span>
          </p>
          <h3>Please, enter your name</h3>
          <input type="text" ng-model="modalCtrl.name" style="font-size: 2em;" autofocus />
          <button class="button" ng-click="$close(modalCtrl.name)">OK</button>
          <a class="close-reveal-modal" ng-click="$dismiss()">&#215;</a>
        </div>
      `,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'tiny',
      controllerAs: 'modalCtrl',
      controller: modalCtrl,
      resolve: {
        score: () => {
          return {dimension, time, movesCount};
        }
      }
    }).result.then(result => result, e => e);
  }
}