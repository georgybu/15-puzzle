const header = {
  template: `
		<div class="row">
      <div class="small-12 columns">
        <a href="#/game" class="button radius" ng-class="{ 'secondary': !$ctrl.isCurrent('/game') }">
          <i class="fa fa-gamepad show-for-small" aria-hidden="true"></i>
          <span class="show-for-medium-up">
            <i class="fa fa-gamepad" aria-hidden="true"></i>
            Game
          </span>
        </a>
        <a href="#/leaders" class="button radius" ng-class="{ 'secondary': !$ctrl.isCurrent('/leaders') }">
          <i class="fa fa-trophy show-for-small" aria-hidden="true"></i>
          <span class="show-for-medium-up">
            <i class="fa fa-trophy" aria-hidden="true"></i>
            Leaders
          </span>
        </a>
        <a href="#/help" class="button radius info right">
          <i class="fa fa-question show-for-small" aria-hidden="true"></i>
          <span class="show-for-medium-up">
            <i class="fa fa-question" aria-hidden="true"></i>
            Help
          </span>
        </a>
        <span class="right">&nbsp;</span>
        <a href="#/settings" class="button radius info right">
          <i class="fa fa-cog show-for-small" aria-hidden="true"></i>
          <span class="show-for-medium-up">
            <i class="fa fa-cog" aria-hidden="true"></i>
            Settings
          </span>
        </a>
      </div>
		</div>
	`,
  
  controller: class HeaderCtrl {
    static get $inject() {
      return ['$location'];
    }
    
    constructor($location) {
      this.$location = $location;
    }
    
    isCurrent(path) {
      return this.$location.path() === path;
    }
  }
};

export default header;