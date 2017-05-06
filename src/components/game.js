const game = {
  template: `
		<div class="game">
		
      <div class="row">
        <div class="small-12 columns">
          <h1>Game</h1>
          <hr />
          <div class="game-board" hm-panend="$ctrl.onPan($event)">
            <div class="tile" ng-repeat="tile in $ctrl.tiles track by $index"
              ng-style="{ top: tile.position_y * $ctrl.tileSize + 'px', left: tile.position_x * $ctrl.tileSize + 'px' }"
              ng-class="{ empty: tile.canvas === null }"
              ng-click="$ctrl.moveByClick(tile)">
              <!--hm-tap="$ctrl.moveByTap(tile)"-->
              <img ng-src="{{ $ctrl.scramble.getImageFromTile(tile)}}"
                   ng-style="{ width: $ctrl.tileSize, height: $ctrl.tileSize }">
            </div>
          </div>
        </div>
      </div>
      
      <br />
    
      <div class="row">
        <div class="small-12 columns text-center">
          <button class="button radius" ng-click="$ctrl.startGame()" ng-if="!$ctrl.stat.isGameRunning()">
            <i class="fa fa-play" aria-hidden="true"></i>
            Start Game
          </button>
          <button class="button radius" ng-click="$ctrl.endGame()" ng-if="$ctrl.stat.isGameRunning()">
            <i class="fa fa-stop" aria-hidden="true"></i>
            Stop Game
          </button>
          
          <h4 ng-if="$ctrl.stat.isGameRunning()">
            <span>dimension: {{ $ctrl.$storage.dimension }},</span>
            <span>time: {{ $ctrl.stat.getGameTime() }} sec,</span>
            <span>moves count: {{ $ctrl.stat.getMovesCount() }}</span>
          </h4>
        </div>
      </div>
      
    </div>
	`,
  
  controller: class GameCtrl {
    static get $inject() {
      return ['$scope', '$timeout', '$element', '$document', 'modal', 'storage', 'scramble', 'shuffle', 'stat'];
    }
    
    constructor($scope, $timeout, $element, $document, modal, storage, scramble, shuffle, stat) {
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.$element = $element;
      this.$document = $document;
      this.modal = modal;
      this.scramble = scramble;
      this.$shuffle = shuffle;
      this.stat = stat;
      this.$storage = storage.getStorage();
      this.tileSize = Math.floor(storage.getBoardSize() / this.$storage.dimension);
    }
    
    $onInit() {
      this.scramble.getTiles().then((tiles) => {
        this.tiles = tiles.map((tile) => {
          tile.position_x = tile.x;
          tile.position_y = tile.y;
          return tile;
        });
      });
      this.$document.on('keydown', this.keyDownHandler(this));
    }
    
    $onDestroy() {
      this.$document.off('keydown', this.keyDownHandler(this));
      this.stat.stopGame();
    };
    
    startGame() {
      const pseudoShuffle = false;
      
      if (pseudoShuffle) {
        this.swapTiles(
          this.tiles[this.tiles.length - 1],
          this.tiles[this.tiles.length - 2]
        );
      } else {
        this.$shuffle.array(this.tiles.map((tile) => {
          return {
            x: tile.position_x,
            y: tile.position_y
          }
        })).map((p, i) => {
          this.tiles[i].position_x = p.x;
          this.tiles[i].position_y = p.y;
        });
      }
      
      this.stat.startGame();
    }
    
    endGame() {
      for (let i = 0; i < this.tiles.length; i++) {
        this.tiles[i].position_x = this.tiles[i].x;
        this.tiles[i].position_y = this.tiles[i].y;
      }
      
      this.stat.stopGame();
    }
    
    swapTiles(t1, t2) {
      [t1.position_x, t2.position_x] = [t2.position_x, t1.position_x];
      [t1.position_y, t2.position_y] = [t2.position_y, t1.position_y];
      if (this.stat.isGameRunning()) {
        this.stat.doMove();
        if (this.stat.isWin(this.tiles)) {
          this.stat.stopGame();
          const dimension = this.$storage.dimension;
          const gameTime = this.stat.getGameTime();
          const movesCount = this.stat.getMovesCount();
          this.modal.openWin(dimension, gameTime, movesCount).then((username) => {
            if (username) {
              this.stat.saveResult(username, dimension, gameTime, movesCount);
            }
          });
        }
      }
    }
  
    moveByClick(tile) {
      if (!this.stat.isGameRunning()) {
        return;
      }
      
      let emptyBlock = this.tiles.find((tile) => tile.canvas === null);
      if (emptyBlock) {
        const XDistance = emptyBlock.position_x - tile.position_x;
        const YDistance = emptyBlock.position_y - tile.position_y;
        const XAllowMove = (XDistance === 0 && Math.abs(YDistance) === 1);
        const YAllowMove = (YDistance === 0 && Math.abs(XDistance) === 1);
        
        if (XAllowMove || YAllowMove) {
          this.swapTiles(emptyBlock, tile);
        }
      }
    }
    
    moveByKeyPress(direction) {
      if (!this.stat.isGameRunning()) {
        return;
      }
      
      let emptyBlock = this.tiles.find((tile) => tile.canvas === null);
      let target = {x: emptyBlock.position_x, y: emptyBlock.position_y};
      if (emptyBlock) {
        switch (direction) {
          case 'left':
            target.x++;
            break;
          case 'top':
            target.y++;
            break;
          case 'right':
            target.x--;
            break;
          case 'bottom':
            target.y--;
            break;
          default:
            target = null;
            break;
        }
      }
      
      if (target) {
        let tile = this.tiles.find((tile) => tile.position_x === target.x && tile.position_y === target.y);
        if (tile) {
          this.swapTiles(emptyBlock, tile);
        }
      }
    }
    
    keyDownHandler(scope) {
      // arrow keys or WSAD
      const getDirection = (keyCode) => {
        switch (keyCode) {
          case 37:
          case 65:
            return 'left';
          case 38:
          case 87:
            return 'top';
          case 39:
          case 68:
            return 'right';
          case 40:
          case 83:
            return 'bottom';
        }
        return null;
      };
      
      return function (event) {
        let direction = getDirection(event.keyCode);
        if (direction) {
          scope.$scope.$apply(() => {
            scope.moveByKeyPress(direction);
          });
        }
      }
    }
    
    onPan($event) {
      // touch pan direction
      const getDirection = (hammerDirection) => {
        switch (hammerDirection) {
          case 2:
            return 'left';
          case 8:
            return 'top';
          case 4:
            return 'right';
          case 16:
            return 'bottom';
        }
        return null;
      };
      let direction = getDirection($event.direction);
      if (direction) {
        console.log($event);
        this.moveByKeyPress(direction);
      }
    }
  }
};

export default game;
