const header = {
  template: `
		<div class="row">
      <div class="small-12 columns">
        <a href="/#/game" class="button radius" ng-class="{ 'secondary': !$ctrl.isCurrent('/game') }">
            <i class="fa fa-gamepad" aria-hidden="true"></i>
            <!---->
            Game
        </a>
        <a href="/#/leaders" class="button radius" ng-class="{ 'secondary': !$ctrl.isCurrent('/leaders') }">
            <!--<i class="fa fa-star" aria-hidden="true"></i>-->
            <i class="fa fa-trophy" aria-hidden="true"></i>
            Leaders
        </a>
        <a href="/#/settings" class="button radius info right">
          <i class="fa fa-cog" aria-hidden="true"></i>
          Settings
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