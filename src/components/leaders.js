const leaders = {
  template: `
		<div class="row">
      <div class="small-12 columns">
        <h1>Leaders</h1>
        <hr />
        <ul>
            <li ng-repeat="score in $ctrl.$storage.score track by $index">
                {{ score | json }}
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
    }
  }
};

export default leaders;
