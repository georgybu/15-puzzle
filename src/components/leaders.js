const leaders = {
  template: `
		<div class="row leaders">
      <div class="small-12 columns">
        <h1>Leaders</h1>
        <hr />
        <ul class="unstyled-list">
            <li ng-repeat="(dimension, scoreList) in $ctrl.scores">
                <h2>Dimension: {{ dimension }}</h2>
                 <ul class="unstyled-list">
                    <li ng-repeat="score in scoreList track by $index">
                        <span>username <strong>{{ score.username || 'unknown' }}</strong></span>
                        <span>time <strong>{{ score.gameTime }}</strong> sec</span>
                        <span>movesCount <strong>{{ score.movesCount }}</strong></span>
                        <span>date <strong>{{ score.time | date:'medium'}}</strong></span>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
		</div>
	`,
  
  controller: class LeadersCtrl {
    static get $inject() {
      return ['storage']
    }
    
    constructor(storage) {
      this.$storage = storage.getStorage();
      this.scores = {};
      this.$storage.score.forEach((score) => {
        if (!this.scores[score.dimension]) {
          this.scores[score.dimension] = [];
        }
        this.scores[score.dimension].push(score);
      });
    }
  }
};

export default leaders;
