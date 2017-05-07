const settings = {
  template: `
		<div class="row settings">
      <div class="small-12 columns">
        <h1>Settings</h1>
        <hr />
        <div class="dimension-preview" ng-if="!$ctrl.isLoading" ng-resize="$ctrl.setDimensions($event)">
            <canvas></canvas>
        </div>
        <div class="dimension-preview-loader" ng-if="$ctrl.isLoading">
            <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        </div>
        <h2>
          <label>
            Board dimensions
            <input type="range" min="2" max="10" ng-model="$ctrl.dimension" ng-change="$ctrl.updateDimensionPreview()">
            <span>{{ $ctrl.dimension }}</span>
          </label>
        </h2>
        <h2 ng-click="$ctrl.highlightRightPlace = !$ctrl.highlightRightPlace">
          <label>
            <i class="fa fa-check-square-o" aria-hidden="true" ng-show="$ctrl.highlightRightPlace"></i>
            <i class="fa fa-square-o" aria-hidden="true" ng-show="!$ctrl.highlightRightPlace"></i>
            Highlight tile in right place (in this example used random color)
          </label>
        </h2>
        <h2 ng-click="$ctrl.showNumber = !$ctrl.showNumber">
          <label>
            <i class="fa fa-check-square-o" aria-hidden="true" ng-show="$ctrl.showNumber"></i>
            <i class="fa fa-square-o" aria-hidden="true" ng-show="!$ctrl.showNumber"></i>
            Show Numbers
          </label>
        </h2>
       </div>
		</div>
	`,
  
  controller: class SettingsCtrl {
    static get $inject() {
      return ['$timeout', '$element', '$scope', 'storage', 'scramble'];
    }
    
    constructor($timeout, $element, $scope, storage, scramble) {
      this.$timeout = $timeout;
      this.$element = $element;
      this.$scope = $scope;
      this.scramble = scramble;
      this.$storage = storage.getStorage();
      this.boardSize = storage.getBoardSize();
    }
    
    $onInit() {
      this.dimension = this.$storage.dimension;
      this._showNumber = this.$storage.showNumber;
      this._highlightRightPlace = this.$storage.highlightRightPlace;
      this.updateDimensionPreview();
      this.$timeout(() => {
        this.setDimensions();
      }, 0);
    };
    
    get highlightRightPlace() {
      return this._highlightRightPlace;
    }
    
    set highlightRightPlace(val) {
      this._highlightRightPlace = val;
      this.$storage.highlightRightPlace = val;
      this.updateDimensionPreview();
    }
    
    get showNumber() {
      return this._showNumber;
    }
    
    set showNumber(val) {
      this._showNumber = val;
      this.$storage.showNumber = val;
      this.updateDimensionPreview();
    }
    
    setDimensions() {
      const gameBoard = document.getElementsByClassName('dimension-preview')[0];
      if (gameBoard) {
        gameBoard.style.height = (gameBoard.offsetWidth + 10) + 'px';
        this.boardSize = gameBoard.offsetWidth;
        this.updateDimensionPreview();
      }
    }
    
    updateDimensionPreview() {
      this.isLoading = true;
      this.$storage.dimension = this.dimension;
      this.scramble.generate(this.dimension, this._showNumber, this._highlightRightPlace)
        .then((data) => {
          this.isLoading = false;
          return this.$timeout(() => {
            return data;
          }, 0);
        }).then((imageData) => {
          let canvas = this.$element.find('canvas')[0];
          let context = canvas.getContext('2d');
          canvas.width = this.boardSize;
          canvas.height = this.boardSize;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(imageData, 0, 0, imageData.width, imageData.height, 0, 0, canvas.width, canvas.height);
          
        }
      );
    }
    
  }
};

export default settings;
