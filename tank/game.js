/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./css/main.css":
/*!**********************!*\
  !*** ./css/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/tankbrigade.png":
/*!***********************************!*\
  !*** ./resources/tankbrigade.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e24e6cca025414826060.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/extreem-engine.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _resources_tankbrigade_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../resources/tankbrigade.png */ "./resources/tankbrigade.png");
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/main.css */ "./css/main.css");
/**
 * @author whtoo
 * @create_date 2013-11-20
 * @revise_date 2021-04-13
 */



function setupGame() {
  window.addEventListener('load', eventWindowLoaded, false);

  function eventWindowLoaded() {
    canvasApp();
  }

  function canvasSupport() {
    return true;
  }

  function canvasApp() {
    if (!canvasSupport()) {
      return;
    } else {
      var theCanvas = document.getElementById("canvas");
      window.context = theCanvas.getContext("2d");
      window.gameManager = new GameObjManager();
      theCanvas.width = window.innerWidth;
      theCanvas.height = window.innerHeight;
      window.render = new Render();
      window.render.init();
      window.apControl = new APWatcher();
    }
  }
}

function APWatcher() {
  var gm = window.gameManager;
  var body = document.querySelector('body');

  this.keyWatcher = function (e) {
    var player = gm.gameObjects[0];

    if (gm.commandList.stop) {
      gm.commandList.stop = false;
    }

    console.log(player.destY + "===" + player.destX);

    switch (e.which) {
      case 119:
        console.log('press w');

        if (player.destY > 0) {
          player.rotationAP('w');
        }

        break;

      case 115:
        console.log('press s');

        if (player.destY < 13) {
          player.rotationAP('s');
        }

        break;

      case 97:
        console.log('press a');

        if (player.destX > 0) {
          player.rotationAP('a');
        }

        break;

      case 100:
        console.log('press d');

        if (player.destX < 24) {
          player.rotationAP('d');
        }

        break;

      default:
        //console.log('press other');
        break;
    }
  };

  this.keyWatcherUp = function (e) {
    gm.commandList.stop = true;
    gm.commandList.nextX = gm.commandList.nextY = 0;
  };

  body.onkeyup = this.keyWatcherUp;
  body.onkeypress = this.keyWatcher;
}

function GameObjManager() {
  var objList = [];

  for (var i = 0; i < 1; i++) {
    var player = new TankPlayer('Tank' + i, 'w', 0);
    player.animSheet = new SpriteAnimSheet(3, 9, 16);
    objList.push(player);
  }

  this.gameObjects = objList;
  this.commandList = {
    nextX: 0,
    nextY: 0,
    stop: true
  };
  this.isInited = 0;
} //动画图册


function SpriteAnimSheet(startAnim, stopAnim, X) {
  this.animationFrames = new Array();
  this.animLength = stopAnim - startAnim + 1;
  this.orderIndex = 0;

  for (var i = 0; i < this.animLength; i++) {
    var item = new SpriteAnimation(X, i + startAnim);
    this.animationFrames.push(item);
  }
}

SpriteAnimSheet.prototype.getFrames = function () {
  return this.animationFrames[this.orderIndex % this.animLength];
}; //单桢动画


function SpriteAnimation(sX, sY) {
  this.sourceDx = sX * 33;
  this.sourceDy = sY * 33;
  this.sourceW = 33;
  this.sourceH = 33;
}

function Player() {
  this.sourceDx = 528;
  this.sourceDy = 99;
  this.sourceW = 33;
  this.sourceH = 33;
  this.animSheet = null;
}

function TankPlayer(tankID, initDirection, isUser) {
  //w 4,d 1,s 2,a 3
  this.direction = initDirection;
  this.tankName = tankID;
  this.isPlayer = isUser; // this.destX = (Math.floor(Math.random()*100) % 23) * 33;
  // 	this.destY = (Math.floor(Math.random()*100) % 13) * 33;

  this.destCook = 33;
  this.destX = 6;
  this.destY = 4;
  this.destW = 33;
  this.destH = 33;
  this.arc = 0;
  this.X = this.destX * this.destCook;
  this.Y = this.destY * this.destCook;
  this.centerX = this.X + this.destW * 0.5;
  this.centerY = this.Y + this.destH * 0.5;
}

TankPlayer.prototype = new Player();
TankPlayer.prototype.constructor = TankPlayer;
TankPlayer.prototype.speed = 2.4;
TankPlayer.prototype.speedM = 6;

TankPlayer.prototype.updateSelfCoor = function () {
  this.X = this.destX * this.destCook;
  this.Y = this.destY * this.destCook;
  this.centerX = this.X + this.destW * 0.5;
  this.centerY = this.Y + this.destH * 0.5;
};

var per = 0;
per = TankPlayer.prototype.speed / 60;

TankPlayer.prototype.rotationAP = function (direction) {
  //    console.log("dr" + direction + "===" + this.direction);
  var cmd = window.gameManager.commandList;

  if (direction != this.direction) {
    cmd.nextX = cmd.nextY = 0;

    switch (direction) {
      case 'w':
        //console.log('press wT');
        this.arc = 270;
        break;

      case 's':
        //console.log('press sT');
        this.arc = 90;
        break;

      case 'a':
        //console.log('press aT');
        this.arc = 180;
        break;

      case 'd':
        //console.log('press dT');
        this.arc = 0;
        break;

      default:
        //console.log('press otherT');
        break;
    }

    this.direction = direction;
  } else {
    if (cmd.stop === false) {
      this.animSheet.orderIndex++;

      switch (direction) {
        case 'w':
          // console.log('press wT');
          cmd.nextY -= per * this.speedM; //this.destY -= this.speed;

          break;

        case 's':
          //console.log('press sT');
          cmd.nextY += per * this.speedM; //this.destY += this.speed;

          break;

        case 'a':
          // console.log('press aT');
          cmd.nextX -= per * this.speedM; //this.destX -= this.speed;

          break;

        case 'd':
          cmd.nextX += per * this.speedM; //console.log('press dT');
          //this.destX +=  this.speed;

          break;

        default:
          //console.log('press otherT');
          break;
      }
    }

    this.direction = direction;
    this.updateSelfCoor();
  }
}; //Render Object Def


function Render() {
  window.context = window.context;
  var tileSheet = new Image();
  this.tileSheet = tileSheet;
  tileSheet.addEventListener('load', eventShipLoaded, false);
  tileSheet.src = _resources_tankbrigade_png__WEBPACK_IMPORTED_MODULE_0__;
  var that = this;

  function eventShipLoaded() {
    that.init();
  }
}

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var per = 0;
var lastTime = new Date();
var offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = 800;
offscreenCanvas.height = 500;
var offscreenContext = offscreenCanvas.getContext('2d');

function calculateFps() {
  var now = +new Date(),
      fps = 1000 / (now - lastTime);
  lastTime = now;
  return fps;
}

function offscreenCache(contextRef) {
  offscreenContext.fillStyle = "#aaaaaa";
  offscreenContext.fillRect(0, 0, 23 * 33, 13 * 33);
  var mapTitle = contextRef.mapTitle;
  var mapRows = 13;
  var mapCols = 23;
  var mapIndexOffset = -1;

  for (var rowCtr = 0; rowCtr < mapRows; rowCtr++) {
    for (var colCtr = 0; colCtr < mapCols; colCtr++) {
      var tileId = mapTitle[rowCtr][colCtr] + mapIndexOffset;
      var sourceX = Math.floor(tileId % 24) * 33; //tmx use line-based count

      var sourceY = Math.floor(tileId / 24) * 33;
      offscreenContext.drawImage(contextRef.tileSheet, sourceX, sourceY, 32, 32, colCtr * 33, rowCtr * 33, 32, 32);
    }
  }
} //Render Object prototype Def


Render.prototype = {
  constructor: Render,
  mapTitle: [[78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 55, 78, 78, 78, 78], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 100, 100, 100, 100, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 100, 100, 100, 100, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 100, 100, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 100, 100, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 100, 100, 102, 102, 102, 102, 60, 60, 60, 60, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 60, 74, 74, 60, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 60, 74, 74, 60, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102]],
  init: function init() {
    offscreenCache(this);
    window.requestAnimFrame(this.drawScreen); //		this.drawScreen();
  },
  drawScreen: function drawScreen() {
    var tileSheet = window.render.tileSheet;
    window.context.clearRect(0, 0, 800, 500);
    window.render.drawMap(tileSheet);
    window.render.drawPlayer(tileSheet);
    context.fillStyle = 'cornflowerblue';
    context.fillText(calculateFps().toFixed() + ' fps', 20, 60);
    window.requestAnimFrame(Render.prototype.drawScreen.bind(this));
  },
  drawPlayer: function drawPlayer(tileSheet) {
    var cl = window.gameManager.commandList;
    var players = window.gameManager.gameObjects;
    var item;

    for (var i = 0; i < players.length; i++) {
      item = players[i];

      if (cl.stop === false) {
        var cmd = cl;

        switch (item.direction) {
          case 'w':
            //console.log('press wT');
            cmd.nextY += per;
            item.destY -= per;
            break;

          case 's':
            // console.log('press sT');
            cmd.nextY -= per;
            item.destY += per;

            if (cmd.nextX < per) {
              cmd.nextY = 0;
            }

            break;

          case 'a':
            // console.log('press aT');
            cmd.nextX += per;
            item.destX -= per;
            break;

          case 'd':
            cmd.nextX -= per;
            item.destX += per;

            if (cmd.nextX < per) {
              cmd.nextX = 0;
            }

            break;

          default:
            // console.log('press otherT');
            break;
        }
      }

      item.updateSelfCoor();
    }

    var angleInRadians = item.arc / 180 * Math.PI;
    var animFrame = item.animSheet.getFrames(); //            console.log(animFrame);

    window.context.save(); //console.log("X:"+item.centerX+"+Y:"+item.centerY)

    window.context.translate(item.centerX, item.centerY);
    window.context.rotate(angleInRadians);
    window.context.drawImage(tileSheet, animFrame.sourceDx, animFrame.sourceDy, animFrame.sourceW, animFrame.sourceH, -item.destW / 2, -item.destH / 2, item.destW, item.destH);
    window.context.restore();
  },
  drawMap: function drawMap(tileSheet) {
    //draw a background so we can see the Canvas edges 
    window.context.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
  }
};
setupGame();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupGame);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi9jc3MvbWFpbi5jc3M/MWFkNiIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4vc3JjL2V4dHJlZW0tZW5naW5lLmpzIl0sIm5hbWVzIjpbInNldHVwR2FtZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudFdpbmRvd0xvYWRlZCIsImNhbnZhc0FwcCIsImNhbnZhc1N1cHBvcnQiLCJ0aGVDYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJnYW1lTWFuYWdlciIsIkdhbWVPYmpNYW5hZ2VyIiwid2lkdGgiLCJpbm5lcldpZHRoIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJyZW5kZXIiLCJSZW5kZXIiLCJpbml0IiwiYXBDb250cm9sIiwiQVBXYXRjaGVyIiwiZ20iLCJib2R5IiwicXVlcnlTZWxlY3RvciIsImtleVdhdGNoZXIiLCJlIiwicGxheWVyIiwiZ2FtZU9iamVjdHMiLCJjb21tYW5kTGlzdCIsInN0b3AiLCJjb25zb2xlIiwibG9nIiwiZGVzdFkiLCJkZXN0WCIsIndoaWNoIiwicm90YXRpb25BUCIsImtleVdhdGNoZXJVcCIsIm5leHRYIiwibmV4dFkiLCJvbmtleXVwIiwib25rZXlwcmVzcyIsIm9iakxpc3QiLCJpIiwiVGFua1BsYXllciIsImFuaW1TaGVldCIsIlNwcml0ZUFuaW1TaGVldCIsInB1c2giLCJpc0luaXRlZCIsInN0YXJ0QW5pbSIsInN0b3BBbmltIiwiWCIsImFuaW1hdGlvbkZyYW1lcyIsIkFycmF5IiwiYW5pbUxlbmd0aCIsIm9yZGVySW5kZXgiLCJpdGVtIiwiU3ByaXRlQW5pbWF0aW9uIiwicHJvdG90eXBlIiwiZ2V0RnJhbWVzIiwic1giLCJzWSIsInNvdXJjZUR4Iiwic291cmNlRHkiLCJzb3VyY2VXIiwic291cmNlSCIsIlBsYXllciIsInRhbmtJRCIsImluaXREaXJlY3Rpb24iLCJpc1VzZXIiLCJkaXJlY3Rpb24iLCJ0YW5rTmFtZSIsImlzUGxheWVyIiwiZGVzdENvb2siLCJkZXN0VyIsImRlc3RIIiwiYXJjIiwiWSIsImNlbnRlclgiLCJjZW50ZXJZIiwiY29uc3RydWN0b3IiLCJzcGVlZCIsInNwZWVkTSIsInVwZGF0ZVNlbGZDb29yIiwicGVyIiwiY21kIiwidGlsZVNoZWV0IiwiSW1hZ2UiLCJldmVudFNoaXBMb2FkZWQiLCJzcmMiLCJ0YW5rYnJpZ2FkZSIsInRoYXQiLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbGJhY2siLCJlbGVtZW50Iiwic2V0VGltZW91dCIsImxhc3RUaW1lIiwiRGF0ZSIsIm9mZnNjcmVlbkNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJvZmZzY3JlZW5Db250ZXh0IiwiY2FsY3VsYXRlRnBzIiwibm93IiwiZnBzIiwib2Zmc2NyZWVuQ2FjaGUiLCJjb250ZXh0UmVmIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJtYXBUaXRsZSIsIm1hcFJvd3MiLCJtYXBDb2xzIiwibWFwSW5kZXhPZmZzZXQiLCJyb3dDdHIiLCJjb2xDdHIiLCJ0aWxlSWQiLCJzb3VyY2VYIiwiTWF0aCIsImZsb29yIiwic291cmNlWSIsImRyYXdJbWFnZSIsImRyYXdTY3JlZW4iLCJjbGVhclJlY3QiLCJkcmF3TWFwIiwiZHJhd1BsYXllciIsImZpbGxUZXh0IiwidG9GaXhlZCIsImJpbmQiLCJjbCIsInBsYXllcnMiLCJsZW5ndGgiLCJhbmdsZUluUmFkaWFucyIsIlBJIiwiYW5pbUZyYW1lIiwic2F2ZSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsInJlc3RvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxTQUFULEdBQXFCO0FBQ2pCQyxRQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDQyxpQkFBaEMsRUFBbUQsS0FBbkQ7O0FBRUEsV0FBU0EsaUJBQVQsR0FBNkI7QUFDekJDLGFBQVM7QUFDWjs7QUFFRCxXQUFT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ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvKipcbiAqIEBhdXRob3Igd2h0b29cbiAqIEBjcmVhdGVfZGF0ZSAyMDEzLTExLTIwXG4gKiBAcmV2aXNlX2RhdGUgMjAyMS0wNC0xM1xuICovXG5pbXBvcnQgdGFua2JyaWdhZGUgZnJvbSAnLi4vcmVzb3VyY2VzL3RhbmticmlnYWRlLnBuZyc7XG5pbXBvcnQgJy4uL2Nzcy9tYWluLmNzcyc7XG5cbmZ1bmN0aW9uIHNldHVwR2FtZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGV2ZW50V2luZG93TG9hZGVkLCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBldmVudFdpbmRvd0xvYWRlZCgpIHtcbiAgICAgICAgY2FudmFzQXBwKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGNhbnZhc1N1cHBvcnQoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBjYW52YXNBcHAoKSB7XG4gICAgICAgIGlmICghY2FudmFzU3VwcG9ydCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGhlQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICB3aW5kb3cuY29udGV4dCA9IHRoZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICB3aW5kb3cuZ2FtZU1hbmFnZXIgPSBuZXcgR2FtZU9iak1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoZUNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgdGhlQ2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIHdpbmRvdy5yZW5kZXIgPSBuZXcgUmVuZGVyKCk7XG4gICAgICAgICAgICB3aW5kb3cucmVuZGVyLmluaXQoKTtcbiAgICAgICAgICAgIHdpbmRvdy5hcENvbnRyb2wgPSBuZXcgQVBXYXRjaGVyKCk7XG4gICAgXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBBUFdhdGNoZXIoKSB7XG4gICAgdmFyIGdtID0gd2luZG93LmdhbWVNYW5hZ2VyO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIFxuICAgIHRoaXMua2V5V2F0Y2hlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSBnbS5nYW1lT2JqZWN0c1swXTtcbiAgICAgICAgaWYoZ20uY29tbWFuZExpc3Quc3RvcCl7XG4gICAgICAgICAgICBnbS5jb21tYW5kTGlzdC5zdG9wID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyLmRlc3RZICtcIj09PVwiK3BsYXllci5kZXN0WCk7XG4gICAgICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAxMTk6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzIHcnKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmRlc3RZID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucm90YXRpb25BUCgndycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzcyBzJyk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllci5kZXN0WSA8IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5yb3RhdGlvbkFQKCdzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5NzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlc3MgYScpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZGVzdFggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5yb3RhdGlvbkFQKCdhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzIGQnKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmRlc3RYIDwgMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnJvdGF0aW9uQVAoJ2QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIG90aGVyJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMua2V5V2F0Y2hlclVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZ20uY29tbWFuZExpc3Quc3RvcCA9IHRydWU7XG4gICAgICAgIGdtLmNvbW1hbmRMaXN0Lm5leHRYID0gIGdtLmNvbW1hbmRMaXN0Lm5leHRZID0gMDtcbiAgICAgICAgXG4gICAgfTtcbiAgICBib2R5Lm9ua2V5dXAgPSB0aGlzLmtleVdhdGNoZXJVcDtcbiAgICBib2R5Lm9ua2V5cHJlc3MgPSB0aGlzLmtleVdhdGNoZXI7XG5cbn1cblxuZnVuY3Rpb24gR2FtZU9iak1hbmFnZXIoKSB7XG4gICAgdmFyIG9iakxpc3QgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE7IGkrKykge1xuICAgICAgICB2YXIgcGxheWVyID0gbmV3IFRhbmtQbGF5ZXIoJ1RhbmsnICsgaSwgJ3cnLCAwKTtcbiAgICAgICAgcGxheWVyLmFuaW1TaGVldCA9IG5ldyBTcHJpdGVBbmltU2hlZXQoMywgOSwgMTYpO1xuICAgICAgICBvYmpMaXN0LnB1c2gocGxheWVyKTtcbiAgICB9XG4gICAgdGhpcy5nYW1lT2JqZWN0cyA9IG9iakxpc3Q7XG4gICAgdGhpcy5jb21tYW5kTGlzdCA9IHtuZXh0WDowLG5leHRZOjAsc3RvcDp0cnVlfTtcbiAgICB0aGlzLmlzSW5pdGVkID0gMDtcbn1cblxuLy/liqjnlLvlm77lhoxcbmZ1bmN0aW9uIFNwcml0ZUFuaW1TaGVldChzdGFydEFuaW0sIHN0b3BBbmltLCBYKSB7XG4gICAgdGhpcy5hbmltYXRpb25GcmFtZXMgPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLmFuaW1MZW5ndGggPSBzdG9wQW5pbSAtIHN0YXJ0QW5pbSArIDE7XG4gICAgdGhpcy5vcmRlckluZGV4ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbmltTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFgsIGkgKyBzdGFydEFuaW0pO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lcy5wdXNoKGl0ZW0pO1xuICAgIH1cbn1cblxuU3ByaXRlQW5pbVNoZWV0LnByb3RvdHlwZS5nZXRGcmFtZXMgPSBmdW5jdGlvbiAoKSB7XG4gIFxuICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbkZyYW1lc1t0aGlzLm9yZGVySW5kZXggJSB0aGlzLmFuaW1MZW5ndGhdO1xufTtcblxuLy/ljZXmoaLliqjnlLtcbmZ1bmN0aW9uIFNwcml0ZUFuaW1hdGlvbihzWCwgc1kpIHtcbiAgICB0aGlzLnNvdXJjZUR4ID0gc1ggKiAzMztcbiAgICB0aGlzLnNvdXJjZUR5ID0gc1kgKiAzMztcbiAgICB0aGlzLnNvdXJjZVcgPSAzMztcbiAgICB0aGlzLnNvdXJjZUggPSAzMztcbn1cblxuZnVuY3Rpb24gUGxheWVyKCkge1xuICAgIHRoaXMuc291cmNlRHggPSA1Mjg7XG4gICAgdGhpcy5zb3VyY2VEeSA9IDk5O1xuICAgIHRoaXMuc291cmNlVyA9IDMzO1xuICAgIHRoaXMuc291cmNlSCA9IDMzO1xuICAgIHRoaXMuYW5pbVNoZWV0ID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gVGFua1BsYXllcih0YW5rSUQsIGluaXREaXJlY3Rpb24sIGlzVXNlcikge1xuICAgIC8vdyA0LGQgMSxzIDIsYSAzXG5cbiAgICB0aGlzLmRpcmVjdGlvbiA9IGluaXREaXJlY3Rpb247XG5cbiAgICB0aGlzLnRhbmtOYW1lID0gdGFua0lEO1xuICAgIHRoaXMuaXNQbGF5ZXIgPSBpc1VzZXI7XG4gICAgLy8gdGhpcy5kZXN0WCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwKSAlIDIzKSAqIDMzO1xuICAgIC8vIFx0dGhpcy5kZXN0WSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwKSAlIDEzKSAqIDMzO1xuICAgIHRoaXMuZGVzdENvb2sgPSAzMztcbiAgICB0aGlzLmRlc3RYID0gNjtcbiAgICB0aGlzLmRlc3RZID0gNDtcbiAgICB0aGlzLmRlc3RXID0gMzM7XG4gICAgdGhpcy5kZXN0SCA9IDMzO1xuICAgIHRoaXMuYXJjID0gMDtcbiAgICB0aGlzLlggPSB0aGlzLmRlc3RYICogdGhpcy5kZXN0Q29vaztcbiAgICB0aGlzLlkgPSB0aGlzLmRlc3RZICogdGhpcy5kZXN0Q29vaztcbiAgICB0aGlzLmNlbnRlclggPSB0aGlzLlggKyB0aGlzLmRlc3RXICogMC41O1xuICAgIHRoaXMuY2VudGVyWSA9IHRoaXMuWSArIHRoaXMuZGVzdEggKiAwLjU7XG59XG5cblRhbmtQbGF5ZXIucHJvdG90eXBlID0gbmV3IFBsYXllcigpO1xuVGFua1BsYXllci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUYW5rUGxheWVyO1xuVGFua1BsYXllci5wcm90b3R5cGUuc3BlZWQgPSAyLjQ7XG5UYW5rUGxheWVyLnByb3RvdHlwZS5zcGVlZE0gPSA2O1xuXG5UYW5rUGxheWVyLnByb3RvdHlwZS51cGRhdGVTZWxmQ29vciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLlggPSB0aGlzLmRlc3RYICogdGhpcy5kZXN0Q29vaztcbiAgICB0aGlzLlkgPSB0aGlzLmRlc3RZICogdGhpcy5kZXN0Q29vaztcbiAgICB0aGlzLmNlbnRlclggPSB0aGlzLlggKyB0aGlzLmRlc3RXICogMC41O1xuICAgIHRoaXMuY2VudGVyWSA9IHRoaXMuWSArIHRoaXMuZGVzdEggKiAwLjU7XG59O1xuXG52YXIgcGVyID0gMDtcbnBlciA9IFRhbmtQbGF5ZXIucHJvdG90eXBlLnNwZWVkIC8gNjA7XG5UYW5rUGxheWVyLnByb3RvdHlwZS5yb3RhdGlvbkFQID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuLy8gICAgY29uc29sZS5sb2coXCJkclwiICsgZGlyZWN0aW9uICsgXCI9PT1cIiArIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB2YXIgY21kID0gd2luZG93LmdhbWVNYW5hZ2VyLmNvbW1hbmRMaXN0O1xuICAgIGlmIChkaXJlY3Rpb24gIT0gdGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgY21kLm5leHRYID0gY21kLm5leHRZID0gMDtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIHdUJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmMgPSAyNzA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyBzVCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJjID0gOTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyBhVCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJjID0gMTgwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlc3MgZFQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyYyA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIG90aGVyVCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYoY21kLnN0b3AgPT09IGZhbHNlKXtcbiAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmFuaW1TaGVldC5vcmRlckluZGV4Kys7XG4gICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcmVzcyB3VCcpO1xuICAgICAgICAgICAgICAgICAgIGNtZC5uZXh0WSAtPSBwZXIgKiB0aGlzLnNwZWVkTTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRlc3RZIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyBzVCcpO1xuICAgICAgICAgICAgICAgICAgICAgY21kLm5leHRZICs9IHBlciAqIHRoaXMuc3BlZWRNO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGVzdFkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXNzIGFUJyk7XG4gICAgICAgICAgICAgICAgICAgIGNtZC5uZXh0WCAtPSBwZXIgKiB0aGlzLnNwZWVkTTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRlc3RYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgY21kLm5leHRYICs9IHBlciAqIHRoaXMuc3BlZWRNO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyBkVCcpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGVzdFggKz0gIHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIG90aGVyVCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmQ29vcigpO1xuICAgIH1cblxufTtcblxuXG4vL1JlbmRlciBPYmplY3QgRGVmXG5mdW5jdGlvbiBSZW5kZXIoKSB7XG4gICAgd2luZG93LmNvbnRleHQgPSB3aW5kb3cuY29udGV4dDtcbiAgICB2YXIgdGlsZVNoZWV0ID0gbmV3IEltYWdlKCk7XG4gICAgdGhpcy50aWxlU2hlZXQgPSB0aWxlU2hlZXQ7XG5cbiAgICB0aWxlU2hlZXQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGV2ZW50U2hpcExvYWRlZCwgZmFsc2UpO1xuICAgIHRpbGVTaGVldC5zcmMgPSB0YW5rYnJpZ2FkZTtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGV2ZW50U2hpcExvYWRlZCgpIHtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgfVxufVxuXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfTtcbn0pKCk7XG5cblxudmFyIHBlciA9IDA7XG52YXIgbGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xudmFyIG9mZnNjcmVlbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5vZmZzY3JlZW5DYW52YXMud2lkdGggPSA4MDA7XG5vZmZzY3JlZW5DYW52YXMuaGVpZ2h0ID0gNTAwO1xudmFyIG9mZnNjcmVlbkNvbnRleHQgPSBvZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlRnBzKCkge1xuXHQgICB2YXIgbm93ID0gKCtuZXcgRGF0ZSksXG5cdCAgICAgICBmcHMgPSAxMDAwIC8gKG5vdyAtIGxhc3RUaW1lKTtcblx0ICAgbGFzdFRpbWUgPSBub3c7XG5cdHJldHVybiBmcHM7IFxufVxuXG5cbmZ1bmN0aW9uIG9mZnNjcmVlbkNhY2hlKGNvbnRleHRSZWYpe1xuXHRvZmZzY3JlZW5Db250ZXh0LmZpbGxTdHlsZSA9IFwiI2FhYWFhYVwiO1xuXHRvZmZzY3JlZW5Db250ZXh0LmZpbGxSZWN0KDAsIDAsIDIzICogMzMsIDEzICogMzMpO1xuICAgIHZhciBtYXBUaXRsZSA9IGNvbnRleHRSZWYubWFwVGl0bGU7XG4gICAgdmFyIG1hcFJvd3MgPSAxMztcbiAgICB2YXIgbWFwQ29scyA9IDIzO1xuXG4gICAgdmFyIG1hcEluZGV4T2Zmc2V0ID0gLTE7XG4gICBcblxuICAgIGZvciAodmFyIHJvd0N0ciA9IDA7IHJvd0N0ciA8IG1hcFJvd3M7IHJvd0N0cisrKSB7XG4gICAgICAgIGZvciAodmFyIGNvbEN0ciA9IDA7IGNvbEN0ciA8IG1hcENvbHM7IGNvbEN0cisrKSB7XG4gICAgICAgICAgICB2YXIgdGlsZUlkID0gbWFwVGl0bGVbcm93Q3RyXVtjb2xDdHJdICsgbWFwSW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICB2YXIgc291cmNlWCA9IE1hdGguZmxvb3IodGlsZUlkICUgMjQpICogMzM7Ly90bXggdXNlIGxpbmUtYmFzZWQgY291bnRcbiAgICAgICAgICAgIHZhciBzb3VyY2VZID0gTWF0aC5mbG9vcih0aWxlSWQgLyAyNCkgKiAzMztcbiAgICAgICAgICAgIG9mZnNjcmVlbkNvbnRleHQuZHJhd0ltYWdlKGNvbnRleHRSZWYudGlsZVNoZWV0LCBzb3VyY2VYLCBzb3VyY2VZLCAzMiwgMzIsIGNvbEN0ciAqIDMzLCByb3dDdHIgKiAzMywgMzIsIDMyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vUmVuZGVyIE9iamVjdCBwcm90b3R5cGUgRGVmXG5SZW5kZXIucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBSZW5kZXIsXG4gICAgbWFwVGl0bGUgOiBbWzc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDU1LCA3OCwgNzgsIDc4LCA3OF0sXG4gICAgICAgICAgICAgICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCA1NSwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgICAgICAgICAgICAgWzEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICAgICAgICAgICAgICBbMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgICAgICAgICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAwLCAxMDAsIDEwMCwgMTAwLCA1NSwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgICAgICAgICAgICAgWzEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDAsIDEwMCwgMTAwLCAxMDAsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICAgICAgICAgICAgICBbMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgICAgICAgICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCA1NSwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgICAgICAgICAgICAgWzEwMiwgMTAyLCAxMDAsIDEwMCwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICAgICAgICAgICAgICBbMTAyLCAxMDIsIDEwMCwgMTAwLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgICAgICAgICAgICAgIFsxMDIsIDEwMiwgMTAwLCAxMDAsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNjAsIDYwLCA2MCwgNjAsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICAgICAgICAgICAgICBbMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDYwLCA3NCwgNzQsIDYwLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgICAgICAgICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNjAsIDc0LCA3NCwgNjAsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyXV0sXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIFx0b2Zmc2NyZWVuQ2FjaGUodGhpcyk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuZHJhd1NjcmVlbik7XG4gICAgICAgIC8vXHRcdHRoaXMuZHJhd1NjcmVlbigpO1xuICAgIH0sXG4gICAgZHJhd1NjcmVlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGlsZVNoZWV0ID0gd2luZG93LnJlbmRlci50aWxlU2hlZXQ7XG4gICAgICAgIHdpbmRvdy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCA4MDAsIDUwMCk7XG4gICAgICAgIFxuICAgICAgICB3aW5kb3cucmVuZGVyLmRyYXdNYXAodGlsZVNoZWV0KTtcbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5yZW5kZXIuZHJhd1BsYXllcih0aWxlU2hlZXQpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdjb3JuZmxvd2VyYmx1ZSc7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoY2FsY3VsYXRlRnBzKCkudG9GaXhlZCgpICsgJyBmcHMnLCAyMCwgNjApO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShSZW5kZXIucHJvdG90eXBlLmRyYXdTY3JlZW4uYmluZCh0aGlzKSk7XG5cbiAgICB9LFxuICAgIGRyYXdQbGF5ZXI6IGZ1bmN0aW9uICh0aWxlU2hlZXQpIHtcbiAgICAgICAgdmFyIGNsID0gd2luZG93LmdhbWVNYW5hZ2VyLmNvbW1hbmRMaXN0O1xuICAgICAgICBcbiAgICAgICAgdmFyIHBsYXllcnMgPSB3aW5kb3cuZ2FtZU1hbmFnZXIuZ2FtZU9iamVjdHM7XG4gICAgICAgIHZhciBpdGVtO1xuICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gcGxheWVyc1tpXTtcbiAgICAgICAgICAgICAgICBpZihjbC5zdG9wID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgdmFyIGNtZCA9IGNsO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyB3VCcpO1xuICAgICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFkgKz0gcGVyO1xuICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRlc3RZIC09IHBlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXNzIHNUJyk7XG4gICAgICAgICAgICAgICAgICAgICAgIGNtZC5uZXh0WSAtPSBwZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRlc3RZICs9IHBlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbWQubmV4dFggPCBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncHJlc3MgYVQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFggKz0gcGVyO1xuICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRlc3RYIC09IHBlcjtcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFggLT0gcGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kZXN0WCArPSBwZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21kLm5leHRYIDwgcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY21kLm5leHRYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXNzIG90aGVyVCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGVTZWxmQ29vcigpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhbmdsZUluUmFkaWFucyA9IGl0ZW0uYXJjIC8gMTgwICogTWF0aC5QSTtcbiAgICAgICAgICAgIHZhciBhbmltRnJhbWUgPSBpdGVtLmFuaW1TaGVldC5nZXRGcmFtZXMoKTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2coYW5pbUZyYW1lKTtcblxuICAgICAgICAgICAgd2luZG93LmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlg6XCIraXRlbS5jZW50ZXJYK1wiK1k6XCIraXRlbS5jZW50ZXJZKVxuICAgICAgICAgICAgd2luZG93LmNvbnRleHQudHJhbnNsYXRlKGl0ZW0uY2VudGVyWCwgaXRlbS5jZW50ZXJZKTtcbiAgICAgICAgICAgIHdpbmRvdy5jb250ZXh0LnJvdGF0ZShhbmdsZUluUmFkaWFucyk7XG4gICAgICAgICAgICB3aW5kb3cuY29udGV4dC5kcmF3SW1hZ2UodGlsZVNoZWV0LCBhbmltRnJhbWUuc291cmNlRHgsIGFuaW1GcmFtZS5zb3VyY2VEeSwgYW5pbUZyYW1lLnNvdXJjZVcsIGFuaW1GcmFtZS5zb3VyY2VILCAtaXRlbS5kZXN0VyAvIDIsIC1pdGVtLmRlc3RIIC8gMiwgaXRlbS5kZXN0VywgaXRlbS5kZXN0SCk7XG4gICAgICAgICAgICB3aW5kb3cuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIFxuICAgIH0sXG4gICAgZHJhd01hcDogZnVuY3Rpb24gKHRpbGVTaGVldCkge1xuICAgICAgICAvL2RyYXcgYSBiYWNrZ3JvdW5kIHNvIHdlIGNhbiBzZWUgdGhlIENhbnZhcyBlZGdlcyBcblxuICAgICB3aW5kb3cuY29udGV4dC5kcmF3SW1hZ2Uob2Zmc2NyZWVuQ2FudmFzLCAwLCAwLFxuICAgICAgICAgICAgIG9mZnNjcmVlbkNhbnZhcy53aWR0aCwgb2Zmc2NyZWVuQ2FudmFzLmhlaWdodCk7XG5cbiAgICB9XG59O1xuXG5zZXR1cEdhbWUoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0dXBHYW1lOyJdLCJzb3VyY2VSb290IjoiIn0=