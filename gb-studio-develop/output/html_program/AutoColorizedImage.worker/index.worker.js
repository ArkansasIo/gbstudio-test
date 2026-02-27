/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 975:
/***/ ((module) => {

"use strict";
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),

/***/ 904:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __dirname = "src";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COLLISIONS_EXTRA_SYMBOLS = exports.BRUSH_SLOPE = exports.BRUSH_MAGIC = exports.BRUSH_FILL = exports.BRUSH_16PX = exports.BRUSH_8PX = exports.TOOL_ERASER = exports.TOOL_TRIGGERS = exports.TOOL_SCENE = exports.TOOL_COLORS = exports.TOOL_COLLISIONS = exports.TOOL_ACTORS = exports.TOOL_SELECT = exports.DRAG_TRIGGER = exports.DRAG_ACTOR = exports.DRAG_DESTINATION = exports.DRAG_PLAYER = exports.NAVIGATOR_MIN_WIDTH = exports.MIDDLE_MOUSE = exports.MAX_NESTED_SCRIPT_DEPTH = exports.SCENE_MAX_SIZE_PX = exports.SCREEN_HEIGHT_PX = exports.SCREEN_WIDTH_PX = exports.TILE_SIZE = exports.SCREEN_HEIGHT = exports.SCREEN_WIDTH = exports.MAX_BACKGROUND_TILES_CGB = exports.MAX_BACKGROUND_TILES = exports.MAX_PROJECTILES = exports.MAX_ONSCREEN = exports.MAX_TRIGGERS = exports.MAX_ACTORS_SMALL = exports.MAX_ACTORS = exports.NUM_SUBPIXEL_BITS = exports.EMULATOR_MUTED_SETTING_KEY = exports.LOCALE_SETTING_KEY = exports.THEME_SETTING_KEY = exports.OFFICIAL_REPO_GITHUB_SUBMIT = exports.OFFICIAL_REPO_GITHUB = exports.OFFICIAL_REPO_URL = exports.assetsRoot = exports.eventsRoot = exports.localesRoot = exports.projectTemplatesRoot = exports.binjgbRoot = exports.buildToolsRoot = exports.defaultEngineMetaPath = exports.defaultEngineRoot = exports.enginesRoot = exports.buildUUID = void 0;
exports.defaultCollisionTileColor = exports.defaultCollisionTileIcon = exports.EVENT_GROUP = exports.EVENT_MUSIC_PLAY = exports.EVENT_FADE_IN = exports.EVENT_SOUND_PLAY_EFFECT = exports.EVENT_IF_TRUE = exports.EVENT_ENGINE_FIELD_STORE = exports.EVENT_ENGINE_FIELD_SET = exports.EVENT_END = exports.EVENT_COMMENT = exports.EVENT_PLAYER_SET_SPRITE = exports.EVENT_ACTOR_SET_SPRITE = exports.EVENT_SWITCH_SCENE = exports.EVENT_CALL_CUSTOM_EVENT = exports.EVENT_TEXT = exports.ERR_PROJECT_EXISTS = exports.OVERLAY_SPEED_DEFAULT = exports.OVERLAY_SPEED_INSTANT = exports.TRACKER_REDO = exports.TRACKER_UNDO = exports.MAX_ZOOM_LEVEL = exports.TMP_VAR_2 = exports.TMP_VAR_1 = exports.LYC_SYNC_VALUE = exports.FLAG_VRAM_BANK_1 = exports.DMG_PALETTE = exports.TILE_COLOR_PROP_PRIORITY = exports.TILE_COLOR_PROP_FLIP_VERTICAL = exports.TILE_COLOR_PROP_FLIP_HORIZONTAL = exports.TILE_COLOR_PROPS = exports.TILE_COLOR_PALETTE = exports.COLLISION_SLOPE_VALUES = exports.COLLISION_SLOPE_22_LEFT_TOP = exports.COLLISION_SLOPE_22_LEFT_BOT = exports.COLLISION_SLOPE_45_LEFT = exports.COLLISION_SLOPE_22_RIGHT_TOP = exports.COLLISION_SLOPE_22_RIGHT_BOT = exports.COLLISION_SLOPE_45_RIGHT = exports.TILE_PROP_SLOPE_LEFT = exports.TILE_PROP_SLOPE_22_TOP = exports.TILE_PROP_SLOPE_22_BOT = exports.TILE_PROP_SLOPE_45 = exports.TILE_PROPS = exports.TILE_PROP_LADDER = exports.COLLISION_ALL = exports.COLLISION_RIGHT = exports.COLLISION_LEFT = exports.COLLISION_BOTTOM = exports.COLLISION_TOP = void 0;
exports.defaultPalettes = exports.defaultProjectSettings = exports.defaultCollisionTileDefs = void 0;
const path_1 = __webpack_require__(975);
const isDist = __dirname.indexOf(".webpack") > -1;
const isCli = __dirname.indexOf("out/cli") > -1;
let rootDir = __dirname.substring(0, __dirname.lastIndexOf("node_modules"));
if (isDist) {
    rootDir = __dirname.substring(0, __dirname.lastIndexOf(".webpack"));
}
else if (isCli) {
    rootDir = __dirname.substring(0, __dirname.lastIndexOf("out/cli"));
}
else if (false) {}
// Paths
exports.buildUUID = "_gbsbuild";
exports.enginesRoot = (0, path_1.normalize)(`${rootDir}/appData/engine`);
exports.defaultEngineRoot = (0, path_1.normalize)(`${exports.enginesRoot}/gbvm`);
exports.defaultEngineMetaPath = (0, path_1.normalize)(`${exports.enginesRoot}/engine.json`);
exports.buildToolsRoot = (0, path_1.normalize)(`${rootDir}/buildTools`);
exports.binjgbRoot = (0, path_1.normalize)(`${rootDir}/appData/wasm/binjgb`);
exports.projectTemplatesRoot = (0, path_1.normalize)(`${rootDir}/appData/templates`);
exports.localesRoot = (0, path_1.normalize)(`${rootDir}/src/lang`);
exports.eventsRoot = (0, path_1.normalize)(`${rootDir}/src/lib/events`);
exports.assetsRoot = (0, path_1.normalize)(`${rootDir}/src/assets`);
// Plugin Manager
exports.OFFICIAL_REPO_URL = "https://github.com/ArkansasIo/gbstudio-test";
exports.OFFICIAL_REPO_GITHUB = "https://github.com/ArkansasIo/gbstudio-test";
exports.OFFICIAL_REPO_GITHUB_SUBMIT = `${exports.OFFICIAL_REPO_GITHUB}#submitting-plugins`;
// Electron Settings
exports.THEME_SETTING_KEY = "themeId";
exports.LOCALE_SETTING_KEY = "locale";
exports.EMULATOR_MUTED_SETTING_KEY = "emulatorMuted";
// Subpixel bits
exports.NUM_SUBPIXEL_BITS = 5;
// Scene Limits
exports.MAX_ACTORS = 20;
exports.MAX_ACTORS_SMALL = 10;
exports.MAX_TRIGGERS = 30;
exports.MAX_ONSCREEN = 10;
exports.MAX_PROJECTILES = 5;
// Background Limits
exports.MAX_BACKGROUND_TILES = 16 * 12;
exports.MAX_BACKGROUND_TILES_CGB = 16 * 12 * 2;
// Screen
exports.SCREEN_WIDTH = 20;
exports.SCREEN_HEIGHT = 18;
exports.TILE_SIZE = 8;
exports.SCREEN_WIDTH_PX = exports.SCREEN_WIDTH * exports.TILE_SIZE;
exports.SCREEN_HEIGHT_PX = exports.SCREEN_HEIGHT * exports.TILE_SIZE;
exports.SCENE_MAX_SIZE_PX = 2040;
// Scripts
exports.MAX_NESTED_SCRIPT_DEPTH = 5;
// Input
exports.MIDDLE_MOUSE = 2;
// IDE UI
exports.NAVIGATOR_MIN_WIDTH = 200;
exports.DRAG_PLAYER = "DRAG_PLAYER";
exports.DRAG_DESTINATION = "DRAG_DESTINATION";
exports.DRAG_ACTOR = "DRAG_ACTOR";
exports.DRAG_TRIGGER = "DRAG_TRIGGER";
// Tools
exports.TOOL_SELECT = "select";
exports.TOOL_ACTORS = "actors";
exports.TOOL_COLLISIONS = "collisions";
exports.TOOL_COLORS = "colors";
exports.TOOL_SCENE = "scene";
exports.TOOL_TRIGGERS = "triggers";
exports.TOOL_ERASER = "eraser";
// Brushes
exports.BRUSH_8PX = "8px";
exports.BRUSH_16PX = "16px";
exports.BRUSH_FILL = "fill";
exports.BRUSH_MAGIC = "magic";
exports.BRUSH_SLOPE = "slope";
// Collisions
exports.COLLISIONS_EXTRA_SYMBOLS = "89ABCDEF";
exports.COLLISION_TOP = 0x1;
exports.COLLISION_BOTTOM = 0x2;
exports.COLLISION_LEFT = 0x4;
exports.COLLISION_RIGHT = 0x8;
exports.COLLISION_ALL = 0xf;
exports.TILE_PROP_LADDER = 0x10;
exports.TILE_PROPS = 0xf0;
exports.TILE_PROP_SLOPE_45 = 0x20;
exports.TILE_PROP_SLOPE_22_BOT = 0x40;
exports.TILE_PROP_SLOPE_22_TOP = 0x60;
exports.TILE_PROP_SLOPE_LEFT = 0x10;
exports.COLLISION_SLOPE_45_RIGHT = exports.TILE_PROP_SLOPE_45;
exports.COLLISION_SLOPE_22_RIGHT_BOT = exports.TILE_PROP_SLOPE_22_BOT;
exports.COLLISION_SLOPE_22_RIGHT_TOP = exports.TILE_PROP_SLOPE_22_TOP;
exports.COLLISION_SLOPE_45_LEFT = exports.TILE_PROP_SLOPE_45 | exports.TILE_PROP_SLOPE_LEFT;
exports.COLLISION_SLOPE_22_LEFT_BOT = exports.TILE_PROP_SLOPE_22_BOT | exports.TILE_PROP_SLOPE_LEFT;
exports.COLLISION_SLOPE_22_LEFT_TOP = exports.TILE_PROP_SLOPE_22_TOP | exports.TILE_PROP_SLOPE_LEFT;
exports.COLLISION_SLOPE_VALUES = [
    exports.COLLISION_SLOPE_45_RIGHT,
    exports.COLLISION_SLOPE_22_RIGHT_BOT,
    exports.COLLISION_SLOPE_22_RIGHT_TOP,
    exports.COLLISION_SLOPE_45_LEFT,
    exports.COLLISION_SLOPE_22_LEFT_BOT,
    exports.COLLISION_SLOPE_22_LEFT_TOP,
];
// Colors
exports.TILE_COLOR_PALETTE = 0x7;
exports.TILE_COLOR_PROPS = 0xf8;
exports.TILE_COLOR_PROP_FLIP_HORIZONTAL = 0x20;
exports.TILE_COLOR_PROP_FLIP_VERTICAL = 0x40;
exports.TILE_COLOR_PROP_PRIORITY = 0x80;
exports.DMG_PALETTE = {
    id: "dmg",
    name: "DMG (GB Default)",
    colors: ["E8F8E0", "B0F088", "509878", "202850"],
};
// DMG Hardware
exports.FLAG_VRAM_BANK_1 = 0x8;
exports.LYC_SYNC_VALUE = 150;
// Variables
exports.TMP_VAR_1 = "T0";
exports.TMP_VAR_2 = "T1";
exports.MAX_ZOOM_LEVEL = 1600;
// Music Editor
exports.TRACKER_UNDO = "TRACKER_UNDO";
exports.TRACKER_REDO = "TRACKER_REDO";
exports.OVERLAY_SPEED_INSTANT = -3;
exports.OVERLAY_SPEED_DEFAULT = -1;
// Errors
exports.ERR_PROJECT_EXISTS = "ERR_PROJECT_EXISTS";
// Script Event Commands
// @TODO Check if any uses of these hard coded event types can be made more generic to not need to know the specific event used
exports.EVENT_TEXT = "EVENT_TEXT";
exports.EVENT_CALL_CUSTOM_EVENT = "EVENT_CALL_CUSTOM_EVENT";
exports.EVENT_SWITCH_SCENE = "EVENT_SWITCH_SCENE";
exports.EVENT_ACTOR_SET_SPRITE = "EVENT_ACTOR_SET_SPRITE";
exports.EVENT_PLAYER_SET_SPRITE = "EVENT_PLAYER_SET_SPRITE";
exports.EVENT_COMMENT = "EVENT_COMMENT";
exports.EVENT_END = "EVENT_END";
exports.EVENT_ENGINE_FIELD_SET = "EVENT_ENGINE_FIELD_SET";
exports.EVENT_ENGINE_FIELD_STORE = "EVENT_ENGINE_FIELD_STORE";
exports.EVENT_IF_TRUE = "EVENT_IF_TRUE";
exports.EVENT_SOUND_PLAY_EFFECT = "EVENT_SOUND_PLAY_EFFECT";
exports.EVENT_FADE_IN = "EVENT_FADE_IN";
exports.EVENT_MUSIC_PLAY = "EVENT_MUSIC_PLAY";
exports.EVENT_GROUP = "EVENT_GROUP";
exports.defaultCollisionTileIcon = "FFFFFFFFFFFFFFFF";
exports.defaultCollisionTileColor = "#FF0000FF";
exports.defaultCollisionTileDefs = [
    {
        key: "solid",
        color: "#FA2828FF",
        mask: exports.COLLISION_ALL,
        flag: exports.COLLISION_ALL,
        name: "FIELD_SOLID",
        icon: "FFFFFFFFFFFFFFFF",
    },
    {
        key: "top",
        color: "#2828FAFF",
        mask: exports.COLLISION_ALL,
        flag: exports.COLLISION_TOP,
        name: "FIELD_COLLISION_TOP",
        icon: "FFFFFF0000000000",
        multi: true,
    },
    {
        key: "bottom",
        color: "#FFFA28FF",
        mask: exports.COLLISION_ALL,
        flag: exports.COLLISION_BOTTOM,
        name: "FIELD_COLLISION_BOTTOM",
        icon: "0000000000FFFFFF",
        multi: true,
    },
    {
        key: "left",
        color: "#FA28FAFF",
        mask: exports.COLLISION_ALL,
        flag: exports.COLLISION_LEFT,
        name: "FIELD_COLLISION_LEFT",
        icon: "E0E0E0E0E0E0E0E0",
        multi: true,
    },
    {
        key: "right",
        color: "#28FAFAFF",
        mask: exports.COLLISION_ALL,
        flag: exports.COLLISION_RIGHT,
        name: "FIELD_COLLISION_RIGHT",
        icon: "0707070707070707",
        multi: true,
    },
];
exports.defaultProjectSettings = {
    startSceneId: "",
    startX: 0,
    startY: 0,
    startMoveSpeed: 1,
    startAnimSpeed: 3,
    startDirection: "down",
    showCollisions: true,
    showConnections: "selected",
    showCollisionSlopeTiles: false,
    showCollisionExtraTiles: false,
    showCollisionTileValues: false,
    showSceneScreenGrid: false,
    collisionLayerOpacity: 50,
    worldScrollX: 0,
    worldScrollY: 0,
    zoom: 100,
    sgbEnabled: false,
    customHead: "",
    defaultBackgroundPaletteIds: [
        "default-bg-1",
        "default-bg-2",
        "default-bg-3",
        "default-bg-4",
        "default-bg-5",
        "default-bg-6",
        "default-bg-7",
        "default-ui",
    ],
    defaultSpritePaletteIds: [
        "default-sprite-1",
        "default-sprite-2",
        "default-sprite-3",
        "default-sprite-4",
        "default-sprite-5",
        "default-sprite-6",
        "default-sprite-7",
        "default-sprite-8",
    ],
    defaultSpritePaletteId: "default-sprite",
    defaultUIPaletteId: "default-ui",
    playerPaletteId: "",
    defaultMonoBGP: [0, 1, 2, 3],
    defaultMonoOBP0: [0, 1, 3],
    defaultMonoOBP1: [0, 2, 3],
    navigatorSplitSizes: [400, 30, 30, 30, 30],
    showNavigator: true,
    defaultFontId: "",
    defaultCharacterEncoding: "",
    defaultPlayerSprites: {},
    musicDriver: "gbt",
    cartType: "mbc5",
    batterylessEnabled: false,
    favoriteEvents: ["EVENT_TEXT", "EVENT_SWITCH_SCENE"],
    customColorsWhite: "E8F8E0",
    customColorsLight: "B0F088",
    customColorsDark: "509878",
    customColorsBlack: "202850",
    customControlsUp: ["ArrowUp", "w"],
    customControlsDown: ["ArrowDown", "s"],
    customControlsLeft: ["ArrowLeft", "a"],
    customControlsRight: ["ArrowRight", "d"],
    customControlsA: ["Alt", "z", "j"],
    customControlsB: ["Control", "k", "x"],
    customControlsStart: ["Enter"],
    customControlsSelect: ["Shift"],
    debuggerEnabled: false,
    debuggerScriptType: "editor",
    debuggerVariablesFilter: "all",
    debuggerCollapsedPanes: [],
    debuggerPauseOnScriptChanged: false,
    debuggerPauseOnWatchedVariableChanged: false,
    debuggerBreakpoints: [],
    debuggerWatchedVariables: [],
    colorMode: "mixed",
    colorCorrection: "default",
    previewAsMono: false,
    openBuildLogOnWarnings: true,
    generateDebugFilesEnabled: false,
    compilerPreset: 3000,
    scriptEventPresets: {},
    scriptEventDefaultPresets: {},
    runSceneSelectionOnly: false,
    spriteMode: "8x16",
    openBuildFolderOnExport: true,
    showRomUsageAfterBuild: false,
    romFilename: "",
    defaultSceneTypeId: "TOPDOWN",
    disabledSceneTypeIds: [],
    autoTileFlipEnabled: true,
};
exports.defaultPalettes = [
    {
        id: "default-bg-1",
        name: "Default BG 1",
        colors: ["F8E8C8", "D89048", "A82820", "301850"],
    },
    {
        id: "default-bg-2",
        name: "Default BG 2",
        colors: ["E0F8A0", "78C838", "488818", "081800"],
    },
    {
        id: "default-bg-3",
        name: "Default BG 3",
        colors: ["F8D8A8", "E0A878", "785888", "002030"],
    },
    {
        id: "default-bg-4",
        name: "Default BG 4",
        colors: ["B8D0D0", "D880D8", "8000A0", "380000"],
    },
    {
        id: "default-bg-5",
        name: "Default BG 5",
        colors: ["F8F8B8", "90C8C8", "486878", "082048"],
    },
    {
        id: "default-bg-6",
        name: "Default BG 6",
        colors: ["F8D8B0", "78C078", "688840", "583820"],
    },
    {
        id: "default-sprite",
        name: "Default Sprites",
        colors: ["F8F0E0", "D88078", "B05010", "000000"],
    },
    {
        id: "default-ui",
        name: "Default UI",
        colors: ["F8F8B8", "90C8C8", "486878", "082048"],
    },
];


/***/ }),

/***/ 541:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.correctedRGBToCanonicalHex = exports.correctedHexToCanonicalHex = void 0;
const color_1 = __webpack_require__(219);
const correctedHexToCanonicalHexCache = {};
let GBC_LUT = null;
/**
 * Lookup table mapping:
 *
 * corrected hex (display space) → raw hex (canonical representable space)
 */
const getLut = () => {
    if (GBC_LUT)
        return GBC_LUT;
    const lut = new Map();
    for (let r = 0; r < 32; r++) {
        for (let g = 0; g < 32; g++) {
            for (let b = 0; b < 32; b++) {
                const raw = ((Math.round((r / 31) * 255) << 16) |
                    (Math.round((g / 31) * 255) << 8) |
                    Math.round((b / 31) * 255)) >>>
                    0;
                const corrected = parseInt((0, color_1.rgb5BitToGBCHex)(r, g, b), 16) >>> 0;
                lut.set(corrected, raw);
            }
        }
    }
    GBC_LUT = lut;
    return lut;
};
/**
 * Squared RGB distance between two 24-bit hex colors.
 * @param a  24-bit hex color integer
 * @param b  24-bit hex color integer
 * @returns squared distance
 */
const distSq = (a, b) => {
    const ar = (a >> 16) & 0xff;
    const ag = (a >> 8) & 0xff;
    const ab = a & 0xff;
    const br = (b >> 16) & 0xff;
    const bg = (b >> 8) & 0xff;
    const bb = b & 0xff;
    const dr = ar - br;
    const dg = ag - bg;
    const db = ab - bb;
    return dr * dr + dg * dg + db * db;
};
/**
 * Convert a corrected hex color back into a canonical raw hex color.
 *
 * @param hex Corrected hex color ("RRGGBB", GBC display space)
 * @returns Raw hex color ("RRGGBB", canonical representable space)
 */
const correctedHexToCanonicalHex = (hex) => {
    if (correctedHexToCanonicalHexCache[hex]) {
        return correctedHexToCanonicalHexCache[hex];
    }
    const lut = getLut();
    const corrected = parseInt(hex, 16) >>> 0;
    const exact = lut.get(corrected);
    if (exact !== undefined) {
        return exact.toString(16).padStart(6, "0").toLowerCase();
    }
    let bestRaw = 0;
    let bestDist = Infinity;
    for (const [c, r] of lut) {
        const d = distSq(corrected, c);
        if (d < bestDist) {
            bestDist = d;
            bestRaw = r;
            if (d === 0)
                break;
        }
    }
    const result = bestRaw
        .toString(16)
        .padStart(6, "0")
        .toLowerCase();
    correctedHexToCanonicalHexCache[hex] = result;
    return result;
};
exports.correctedHexToCanonicalHex = correctedHexToCanonicalHex;
/**
 * Convert an RGB pixel value (already in display / corrected space)
 * into the canonical raw hex color whose GBC-corrected appearance
 * best matches that pixel.
 *
 * @param r Red   (0–255)
 * @param g Green (0–255)
 * @param b Blue  (0–255)
 * @returns Raw hex color ("RRGGBB", canonical representable space)
 */
const correctedRGBToCanonicalHex = (r, g, b) => {
    return (0, exports.correctedHexToCanonicalHex)((0, color_1.rgb2hex)(r, g, b));
};
exports.correctedRGBToCanonicalHex = correctedRGBToCanonicalHex;


/***/ }),

/***/ 189:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roundUp8 = exports.roundUp16 = exports.roundDown16 = exports.roundDown8 = exports.convertHexTo15BitDec = exports.divisibleBy8 = exports.fromSigned8Bit = exports.lo = exports.hi = exports.hexDec = exports.decOct = exports.decHex32Val = exports.decHex16Val = exports.decHex16 = exports.decHexVal = exports.decHex = exports.decBin = exports.wrap32Bit = exports.clampSigned16Bit = exports.wrapSigned8Bit = exports.wrap16Bit = exports.wrap8Bit = exports.SIGNED_16BIT_MIN = exports.SIGNED_16BIT_MAX = void 0;
exports.SIGNED_16BIT_MAX = 32767;
exports.SIGNED_16BIT_MIN = -32768;
const wrap8Bit = (val) => (256 + (val % 256)) % 256;
exports.wrap8Bit = wrap8Bit;
const wrap16Bit = (val) => (65536 + (val % 65536)) % 65536;
exports.wrap16Bit = wrap16Bit;
const wrapSigned8Bit = (val) => {
    const u = (0, exports.wrap8Bit)(val);
    return u >= 128 ? u - 256 : u;
};
exports.wrapSigned8Bit = wrapSigned8Bit;
const clampSigned16Bit = (val) => Math.max(exports.SIGNED_16BIT_MIN, Math.min(exports.SIGNED_16BIT_MAX, val));
exports.clampSigned16Bit = clampSigned16Bit;
const wrap32Bit = (val) => (4294967296 + (val % 4294967296)) % 4294967296;
exports.wrap32Bit = wrap32Bit;
const decBin = (dec) => (0, exports.wrap8Bit)(dec).toString(2).padStart(8, "0");
exports.decBin = decBin;
const decHex = (dec) => `0x${(0, exports.wrap8Bit)(dec).toString(16).padStart(2, "0").toUpperCase()}`;
exports.decHex = decHex;
const decHexVal = (dec) => (0, exports.wrap8Bit)(dec).toString(16).padStart(2, "0").toUpperCase();
exports.decHexVal = decHexVal;
const decHex16 = (dec) => `0x${(0, exports.wrap16Bit)(dec).toString(16).padStart(4, "0").toUpperCase()}`;
exports.decHex16 = decHex16;
const decHex16Val = (dec) => (0, exports.wrap16Bit)(dec).toString(16).padStart(4, "0").toUpperCase();
exports.decHex16Val = decHex16Val;
const decHex32Val = (dec) => (0, exports.wrap32Bit)(dec).toString(16).padStart(8, "0").toUpperCase();
exports.decHex32Val = decHex32Val;
const decOct = (dec) => (0, exports.wrap8Bit)(dec).toString(8).padStart(3, "0");
exports.decOct = decOct;
const hexDec = (hex) => parseInt(hex, 16);
exports.hexDec = hexDec;
const hi = (longNum) => (0, exports.wrap16Bit)(longNum) >> 8;
exports.hi = hi;
const lo = (longNum) => (0, exports.wrap16Bit)(longNum) % 256;
exports.lo = lo;
const fromSigned8Bit = (num) => {
    const masked = num & 0xff;
    if (masked & 0x80) {
        return masked - 0x100;
    }
    else {
        return masked;
    }
};
exports.fromSigned8Bit = fromSigned8Bit;
const divisibleBy8 = (n) => (n >> 3) << 3 === n;
exports.divisibleBy8 = divisibleBy8;
const convertHexTo15BitDec = (hex) => {
    const r = Math.floor((0, exports.hexDec)(hex.substring(0, 2)) * (32 / 256));
    const g = Math.floor((0, exports.hexDec)(hex.substring(2, 4)) * (32 / 256));
    const b = Math.max(1, Math.floor((0, exports.hexDec)(hex.substring(4, 6)) * (32 / 256)));
    return (b << 10) + (g << 5) + r;
};
exports.convertHexTo15BitDec = convertHexTo15BitDec;
const roundDown8 = (v) => 8 * Math.floor(v / 8);
exports.roundDown8 = roundDown8;
const roundDown16 = (v) => 16 * Math.floor(v / 16);
exports.roundDown16 = roundDown16;
const roundUp16 = (x) => Math.ceil(x / 16) * 16;
exports.roundUp16 = roundUp16;
const roundUp8 = (x) => Math.ceil(x / 8) * 8;
exports.roundUp8 = roundUp8;


/***/ }),

/***/ 787:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clampN = void 0;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const clampN = (max) => (value) => clamp(value, 0, max);
exports.clampN = clampN;
exports["default"] = clamp;


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rawHexToClosestRepresentableRawHex = exports.rawHexToCorrectedHex = exports.chromaKeyData = exports.colorizeSpriteData = exports.rgb5BitToGBCHex = exports.hex2GBChex = exports.hex2GBCrgb = exports.rgb2hex = void 0;
const clamp_1 = __webpack_require__(787);
const _8bit_1 = __webpack_require__(189);
const clamp31 = (0, clamp_1.clampN)(31);
/**
 * Convert 8-bit RGB channel values to a 24-bit raw hex string.
 *
 * @param r Red   (0–255)
 * @param g Green (0–255)
 * @param b Blue  (0–255)
 * @returns Raw RGB hex string ("RRGGBB")
 */
const rgb2hex = (r, g, b) => {
    const hexR = (0, _8bit_1.wrap8Bit)(r).toString(16).padStart(2, "0");
    const hexG = (0, _8bit_1.wrap8Bit)(g).toString(16).padStart(2, "0");
    const hexB = (0, _8bit_1.wrap8Bit)(b).toString(16).padStart(2, "0");
    return `${hexR}${hexG}${hexB}`;
};
exports.rgb2hex = rgb2hex;
/**
 * Create a color mapping function that converts raw hex colors into
 * GBC-corrected RGB values for display.
 */
const hex2GBCrgb = (colorCorrection) => (hex) => {
    const gbcHex = (0, exports.hex2GBChex)(hex, colorCorrection);
    const r = Math.floor((0, _8bit_1.hexDec)(gbcHex.substring(0, 2)));
    const g = Math.floor((0, _8bit_1.hexDec)(gbcHex.substring(2, 4)));
    const b = Math.floor((0, _8bit_1.hexDec)(gbcHex.substring(4)));
    return {
        r,
        g,
        b,
    };
};
exports.hex2GBCrgb = hex2GBCrgb;
/**
 * Convert a raw hex color into a GBC-corrected hex color to preview how color would appear on GBC
 *
 * @param hex  24-bit raw hex string ("RRGGBB", linear RGB)
 * @returns corrected hex ("RRGGBB", GBC display space)
 *
 * NOTE:
 * - This performs 8-bit → 5-bit quantisation.
 * - Output is *not* suitable for storage as a raw color.
 */
const hex2GBChex = (hex, colorCorrection) => {
    if (colorCorrection === "none") {
        return hex;
    }
    const r = clamp31(Math.floor((0, _8bit_1.hexDec)(hex.substring(0, 2)) / 8));
    const g = clamp31(Math.floor((0, _8bit_1.hexDec)(hex.substring(2, 4)) / 8));
    const b = clamp31(Math.floor((0, _8bit_1.hexDec)(hex.substring(4)) / 8));
    return (0, exports.rgb5BitToGBCHex)(r, g, b);
};
exports.hex2GBChex = hex2GBChex;
/**
 * Convert a raw 5-bit rgb color into a GBC-corrected hex color to preview how color would appear on GBC
 *
 * @param r  5-bit red channel value (0–31)
 * @param g  5-bit green channel value (0–31)
 * @param b  5-bit blue channel value (0–31)
 * @returns corrected hex ("RRGGBB", GBC display space)
 *
 * NOTE:
 * - Output is *not* suitable for storage as a raw color.
 */
const rgb5BitToGBCHex = (red5, green5, blue5) => {
    const value = (blue5 << 10) + (green5 << 5) + red5;
    const r = value & 0x1f;
    const g = (value >> 5) & 0x1f;
    const b = (value >> 10) & 0x1f;
    return ((((r * 13 + g * 2 + b) >> 1) << 16) |
        ((g * 3 + b) << 9) |
        ((r * 3 + g * 2 + b * 11) >> 1))
        .toString(16)
        .padStart(6, "0")
        .toLowerCase();
};
exports.rgb5BitToGBCHex = rgb5BitToGBCHex;
/**
 * Index sprite colour from green channel value and mono OBJ palette
 * @param g
 * @param objPalette
 * @returns
 */
const indexSpriteColour = (g, objPalette) => {
    if (g < 130)
        return objPalette[2];
    if (g < 205)
        return objPalette[1];
    return objPalette[0];
};
/**
 * Apply a GBC palette to sprite pixel data in-place.
 *
 * @param mutData raw sprite pixel data
 * @param objPalette mono OBJ palette
 * @param palette color palette
 * @param colorCorrection color correction setting
 */
const colorizeSpriteData = (mutData, objPalette, palette, colorCorrection) => {
    const colorCorrectionFn = (0, exports.hex2GBCrgb)(colorCorrection);
    const paletteRGB = palette.map(colorCorrectionFn);
    for (let index = 0; index < mutData.length; index += 4) {
        const colorIndex = indexSpriteColour(mutData[index + 1], objPalette);
        const color = paletteRGB[colorIndex];
        const r = mutData[index];
        const g = mutData[index + 1];
        const b = mutData[index + 2];
        if ((g > 249 && r < 180 && b < 20) || (b >= 200 && g < 20)) {
            // Set transparent background on pure green & magenta
            mutData[index + 3] = 0;
        }
        mutData[index] = color.r;
        mutData[index + 1] = color.g;
        mutData[index + 2] = color.b;
    }
};
exports.colorizeSpriteData = colorizeSpriteData;
/**
 * Apply a green-screen chroma key to pixel data.
 */
const chromaKeyData = (mutData) => {
    for (let index = 0; index < mutData.length; index += 4) {
        if (mutData[index + 1] === 255) {
            // Set transparent background on pure green
            mutData[index + 3] = 0;
        }
    }
};
exports.chromaKeyData = chromaKeyData;
/**
 * Convert a raw hex color into its color-corrected display hex.
 *
 * @param hex Raw hex color ("RRGGBB", linear RGB)
 * @returns Corrected hex color ("RRGGBB", GBC display space)
 */
const rawHexToCorrectedHex = (hex) => {
    return (0, exports.hex2GBChex)((0, exports.rawHexToClosestRepresentableRawHex)(hex), "default");
};
exports.rawHexToCorrectedHex = rawHexToCorrectedHex;
/**
 * Convert an 8-bit channel to nearest 5-bit GBC channel.
 */
const channel8To5 = (c8) => clamp31(Math.round((c8 * 31) / 255));
/**
 * Convert a 5-bit GBC channel to its canonical 8-bit representation.
 */
const channel5To8 = (c5) => Math.round((c5 * 255) / 31);
/**
 * Snap any raw hex color to the closest *representable* raw hex color.
 *
 * @param hex Raw hex color ("RRGGBB", arbitrary linear RGB)
 * @returns Raw hex color ("RRGGBB", canonical GBC-representable space)
 *
 * @remarks
 * Use this when storing user-provided raw colors.
 */
const rawHexToClosestRepresentableRawHex = (hex) => {
    const r8 = Math.floor((0, _8bit_1.hexDec)(hex.substring(0, 2)));
    const g8 = Math.floor((0, _8bit_1.hexDec)(hex.substring(2, 4)));
    const b8 = Math.floor((0, _8bit_1.hexDec)(hex.substring(4)));
    const r5 = channel8To5(r8);
    const g5 = channel8To5(g8);
    const b5 = channel8To5(b8);
    const r = channel5To8(r5);
    const g = channel5To8(g5);
    const b = channel5To8(b5);
    return ((r << 16) | (g << 8) | b)
        .toString(16)
        .padStart(6, "0")
        .toLowerCase();
};
exports.rawHexToClosestRepresentableRawHex = rawHexToClosestRepresentableRawHex;


/***/ }),

/***/ 746:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setUIPalette = exports.fillVariablePalettes = exports.fillVariablePalette = exports.compressSparsePalettes = exports.compressPalettes = exports.extractTilePaletteWithHint = exports.autoPaletteUsingTiles = exports.autoPalette = void 0;
const chroma_js_1 = __importDefault(__webpack_require__(768));
const consts_1 = __webpack_require__(904);
const color_1 = __webpack_require__(219);
const tileData_1 = __webpack_require__(50);
const reverseColorCorrection_1 = __webpack_require__(541);
const emptyPalette = ["000000", "000000", "000000", "000000"];
const BRIGHTNESS_ANCHOR = [100, 66, 33, 0];
/**
 * Given raw RGBA pixel data construct:
 * + an array of GBC compatible color palettes
 * + DMG tile data
 * + an attr map from tile index to color palette
 */
const autoPalette = (width, height, pixels, colorCorrection, uiPalette) => {
    const xTiles = Math.floor(width / consts_1.TILE_SIZE);
    const yTiles = Math.floor(height / consts_1.TILE_SIZE);
    const paletteCache = {};
    const allPalettes = [];
    const tilePaletteMap = [];
    const recolorCache = {};
    const indexedImage = {
        width,
        height,
        data: new Uint8Array(width * height),
    };
    // Loop each tile to extract palette used and build
    // mapping table from tile to palette
    // Keep cache of tile rgb data to hex palette so don't
    // evaluate identical tile data multiple times
    const tilePaletteCache = {};
    for (let tyi = 0; tyi < yTiles; tyi++) {
        for (let txi = 0; txi < xTiles; txi++) {
            const ti = tyi * xTiles + txi;
            const tileKey = tileToCacheKey(pixels, width, txi, tyi);
            let palette = tilePaletteCache[tileKey];
            if (!palette) {
                palette = extractTilePalette(pixels, width, txi, tyi, colorCorrection);
                tilePaletteCache[tileKey] = palette;
            }
            const key = palette.join("");
            if (paletteCache[key]) {
                tilePaletteMap[ti] = paletteCache[key];
            }
            else {
                tilePaletteMap[ti] = allPalettes.length;
                paletteCache[key] = tilePaletteMap[ti];
                allPalettes.push(palette);
            }
        }
    }
    // As some tiles may overlap it's possible to compress them further
    // mapping table maps original palette index to indexed in compressed list
    const { palettes, mappingTable } = (0, exports.setUIPalette)((0, exports.compressPalettes)(allPalettes), uiPalette);
    // Given the extracted colors we can now build the tile data
    // and the mapping of tiles to color palette
    for (let tyi = 0; tyi < yTiles; tyi++) {
        for (let txi = 0; txi < xTiles; txi++) {
            const ti = tyi * xTiles + txi;
            tilePaletteMap[ti] = mappingTable[tilePaletteMap[ti]];
            buildIndexedTile(pixels, width, txi, tyi, tilePaletteMap[ti], palettes[tilePaletteMap[ti]], recolorCache, indexedImage, colorCorrection);
        }
    }
    return {
        map: tilePaletteMap,
        palettes,
        indexedImage,
    };
};
exports.autoPalette = autoPalette;
/**
 * Given raw RGBA pixel data and DMG indexed image construct:
 * + an array of GBC compatible color palettes
 * + an attr map from tile index to color palette
 */
const autoPaletteUsingTiles = (width, height, pixels, tileData, colorCorrection, uiPalette) => {
    const xTiles = Math.floor(width / consts_1.TILE_SIZE);
    const yTiles = Math.floor(height / consts_1.TILE_SIZE);
    const paletteCache = {};
    const allPalettes = [];
    const tilePaletteMap = [];
    // Loop each tile to extract palette used and build
    // mapping table from tile to palette
    // using the DMG tile data as a hint for color mapping
    for (let tyi = 0; tyi < yTiles; tyi++) {
        for (let txi = 0; txi < xTiles; txi++) {
            const ti = tyi * xTiles + txi;
            const palette = (0, exports.extractTilePaletteWithHint)(pixels, width, txi, tyi, tileData, colorCorrection);
            const key = JSON.stringify(palette);
            if (paletteCache[key]) {
                tilePaletteMap[ti] = paletteCache[key];
            }
            else {
                tilePaletteMap[ti] = allPalettes.length;
                paletteCache[key] = tilePaletteMap[ti];
                allPalettes.push(palette);
            }
        }
    }
    // As some tiles may overlap it's possible to compress them further
    // mapping table maps original palette index to indexed in compressed list
    // const { palettes, mappingTable } = compressSparsePalettes(allPalettes);
    const { palettes, mappingTable } = (0, exports.setUIPalette)((0, exports.compressSparsePalettes)(allPalettes), uiPalette);
    // Build mapping of tiles to color palette
    for (let tyi = 0; tyi < yTiles; tyi++) {
        for (let txi = 0; txi < xTiles; txi++) {
            const ti = tyi * xTiles + txi;
            tilePaletteMap[ti] = mappingTable[tilePaletteMap[ti]];
        }
    }
    return {
        map: tilePaletteMap,
        palettes,
        indexedImage: tileData,
    };
};
exports.autoPaletteUsingTiles = autoPaletteUsingTiles;
/**
 * Build a cache key for a given tile's pixel data
 */
const tileToCacheKey = (pixels, width, tileX, tileY) => {
    const startX = tileX * consts_1.TILE_SIZE;
    const endX = (tileX + 1) * consts_1.TILE_SIZE;
    const startY = tileY * consts_1.TILE_SIZE;
    const endY = (tileY + 1) * consts_1.TILE_SIZE;
    const values = [];
    for (let yi = startY; yi < endY; yi++) {
        for (let xi = startX; xi < endX; xi++) {
            const i = (yi * width + xi) * 4;
            values.push(pixels[i]);
            values.push(pixels[i + 1]);
            values.push(pixels[i + 2]);
        }
    }
    return values.join();
};
/**
 * For a given tile color data extract the first four colors found sorted by perceptual lightness
 */
const extractTilePalette = (pixels, width, tileX, tileY, colorCorrection) => {
    const startX = tileX * consts_1.TILE_SIZE;
    const endX = (tileX + 1) * consts_1.TILE_SIZE;
    const startY = tileY * consts_1.TILE_SIZE;
    const endY = (tileY + 1) * consts_1.TILE_SIZE;
    const seenColorLookup = {};
    const colors = [];
    for (let yi = startY; yi < endY; yi++) {
        for (let xi = startX; xi < endX; xi++) {
            const i = (yi * width + xi) * 4;
            const key = `${pixels[i]},${pixels[i + 1]},${pixels[i + 2]}`;
            if (!seenColorLookup[key]) {
                seenColorLookup[key] = true;
                const colorCorrectionFn = colorCorrection === "default" ? reverseColorCorrection_1.correctedRGBToCanonicalHex : color_1.rgb2hex;
                const hex = colorCorrectionFn(pixels[i], pixels[i + 1], pixels[i + 2]);
                colors.push(hex);
                if (colors.length === 4) {
                    return sortHexPalette(colors);
                }
            }
        }
    }
    return sortHexPalette(colors);
};
/**
 * For a given tile color data and DMG tile hint extract a sparse palette mapping from DMG index to color
 */
const extractTilePaletteWithHint = (pixels, width, tileX, tileY, indexedImage, colorCorrection) => {
    const startX = tileX * consts_1.TILE_SIZE;
    const endX = (tileX + 1) * consts_1.TILE_SIZE;
    const startY = tileY * consts_1.TILE_SIZE;
    const endY = (tileY + 1) * consts_1.TILE_SIZE;
    const seenColorLookup = {};
    const colors = [undefined, undefined, undefined, undefined];
    let seenCount = 0;
    for (let yi = startY; yi < endY; yi++) {
        for (let xi = startX; xi < endX; xi++) {
            const ii = yi * width + xi;
            const i = ii * 4;
            const index = indexedImage.data[ii];
            if (colors[index]) {
                continue;
            }
            const key = `${pixels[i]},${pixels[i + 1]},${pixels[i + 2]}`;
            if (!seenColorLookup[key]) {
                seenColorLookup[key] = true;
                const colorCorrectionFn = colorCorrection === "default" ? reverseColorCorrection_1.correctedRGBToCanonicalHex : color_1.rgb2hex;
                const hex = colorCorrectionFn(pixels[i], pixels[i + 1], pixels[i + 2]);
                colors[index] = hex;
                seenCount++;
                if (seenCount === 4) {
                    return colors;
                }
            }
        }
    }
    return colors;
};
exports.extractTilePaletteWithHint = extractTilePaletteWithHint;
/**
 * Sort palette by perceptual lightness
 */
const sortHexPalette = (input) => {
    return input
        .map((hex) => ({ hex, lightness: (0, chroma_js_1.default)(hex).lab()[0] }))
        .sort(sortLightnessProp)
        .map(({ hex }) => hex);
};
/**
 * Given a palette for a selected tile build DMG indexed tile data
 * by finding closest palette color for each pixel in tile
 */
const buildIndexedTile = (pixels, width, tileX, tileY, paletteIndex, palette, recolorCache, indexedImage, colorCorrection) => {
    const startX = tileX * consts_1.TILE_SIZE;
    const endX = (tileX + 1) * consts_1.TILE_SIZE;
    const startY = tileY * consts_1.TILE_SIZE;
    const endY = (tileY + 1) * consts_1.TILE_SIZE;
    const indexCache = {};
    const colorCorrectionFn = colorCorrection === "default" ? reverseColorCorrection_1.correctedRGBToCanonicalHex : color_1.rgb2hex;
    for (let yi = startY; yi < endY; yi++) {
        for (let xi = startX; xi < endX; xi++) {
            const ii = yi * width + xi;
            const i = ii * 4;
            // Cache key for this RGB + Palette index combination
            const key = `${paletteIndex}:${pixels[i]},${pixels[i + 1]},${pixels[i + 2]}`;
            // Check local cache for RGB to index value
            if (!indexCache[key]) {
                // Otherwise check image wide cache for palette + RGB to closest hex
                if (!recolorCache[key]) {
                    recolorCache[key] = findClosestHexColor(colorCorrectionFn(pixels[i], pixels[i + 1], pixels[i + 2]), palette);
                }
                const color = recolorCache[key];
                const index = palette.indexOf(color);
                indexCache[key] = index;
            }
            indexedImage.data[ii] = indexCache[key];
        }
    }
};
/**
 * Calculate quick rough distance between two hex colors
 */
const manhattanHexDistance = (color1, color2) => {
    const r1 = parseInt(color1.substring(0, 2), 16);
    const g1 = parseInt(color1.substring(2, 4), 16);
    const b1 = parseInt(color1.substring(4, 6), 16);
    const r2 = parseInt(color2.substring(0, 2), 16);
    const g2 = parseInt(color2.substring(2, 4), 16);
    const b2 = parseInt(color2.substring(4, 6), 16);
    return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
};
/**
 * Given a calculated palette find the closest match to a given hex color
 */
const findClosestHexColor = (color, palette) => {
    let closestColor = palette[0];
    let minDistance = Infinity;
    for (const paletteColor of palette) {
        const distance = manhattanHexDistance(color, paletteColor);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = paletteColor;
        }
    }
    return closestColor;
};
/**
 * Compress array of hex palettes by merging overlapping palettes
 * builds a mapping table from old palette to new index
 */
const compressPalettes = (allPalettes) => {
    let outPalettes = [...allPalettes];
    // let labPalettes = allPalettes.map((palette) => palette.map((hex) => ({hex, chroma:chroma(hex)})));
    const originIndices = allPalettes.map((_, index) => [index]); // Tracks original indices for each new palette
    // Sort with largest palettes first before merging
    // Need to tests to see if this is needed
    // If it is needs a mapping table update
    //   labPalettes = labPalettes.sort((a, b) => b.length - a.length);
    // Merge overlapping palettes
    let merged = true;
    while (merged) {
        merged = false;
        for (let i = 0; i < outPalettes.length; i++) {
            for (let j = i + 1; j < outPalettes.length; j++) {
                const combined = [...outPalettes[i], ...outPalettes[j]];
                const uniqueColors = new Set(combined);
                if (uniqueColors.size <= 4) {
                    outPalettes[i] = Array.from(uniqueColors);
                    originIndices[i] = [...originIndices[i], ...originIndices[j]]; // Merge origin indices
                    outPalettes.splice(j, 1);
                    originIndices.splice(j, 1); // Remove the merged palette's origin indices
                    merged = true;
                    break;
                }
            }
            if (merged)
                break;
        }
    }
    // Sort palettes by lightness
    outPalettes = outPalettes.map(sortHexPalette);
    // Generate mapping table
    const mappingTable = new Array(allPalettes.length)
        .fill(0)
        .map((a, i) => i % 8);
    originIndices.forEach((origins, newIndex) => {
        origins.forEach((origin) => {
            mappingTable[origin] = newIndex % 8;
        });
    });
    return { palettes: (0, exports.fillVariablePalettes)(outPalettes), mappingTable };
};
exports.compressPalettes = compressPalettes;
/**
 * Sort function comparing two Chroma Colors in LAB space by perceptual lightness
 */
const sortLightnessProp = (a, b) => b.lightness - a.lightness;
/**
 * Determine if two sparse palettes contain enough overlap to be mergable
 */
const canMergeSparsePalette = (palette1, palette2) => {
    // Check every color in both palettes is able to merge
    return palette1.every((color1, index) => {
        const color2 = palette2[index];
        // Can merge empty spaces
        if (color1 === undefined || color2 === undefined) {
            return true;
        }
        // Or can merge if colors at index are identical
        return color1 === color2;
    });
};
/**
 * Combine two sparse RGB palettes to include all colors from both palettes
 * must confirm palettes are able to be merged with canMergeSparsePalette() first
 */
const mergeSparsePalette = (palette1, palette2) => {
    const merged = [undefined, undefined, undefined, undefined];
    for (let i = 0; i < 4; i++) {
        merged[i] = palette1[i] !== undefined ? palette1[i] : palette2[i];
    }
    return merged;
};
/**
 * Compress array of sparse palettes by merging overlapping palettes
 * builds a mapping table from old palette to new index
 */
const compressSparsePalettes = (allPalettes) => {
    const indexedPalettes = allPalettes.map((palette, index) => ({
        palette,
        index,
        numDefined: palette.reduce((memo, color) => memo + (color ? 1 : 0), 0),
    }));
    // Sort indexed palettes by the number of defined colors, descending
    // to reduce fragmentation of palettes
    indexedPalettes.sort((a, b) => b.numDefined - a.numDefined);
    const palettes = [];
    const mappingTable = Array(allPalettes.length).fill(-1);
    // Merge overlapping palettes and build mapping table
    indexedPalettes.forEach(({ palette, index }) => {
        let merged = false;
        for (let i = 0; i < palettes.length; i++) {
            if (canMergeSparsePalette(palettes[i], palette)) {
                palettes[i] = mergeSparsePalette(palettes[i], palette);
                mappingTable[index] = i;
                merged = true;
                break;
            }
        }
        if (!merged) {
            palettes.push(palette);
            mappingTable[index] = palettes.length - 1;
        }
    });
    return { palettes: fillSparsePalettes(palettes), mappingTable };
};
exports.compressSparsePalettes = compressSparsePalettes;
/**
 * Given an array of spares hex palettes
 * fill them so each contains four values
 */
const fillSparsePalettes = (palettes) => {
    return palettes.map((palette) => {
        var _a, _b, _c, _d;
        return [
            (_a = palette[0]) !== null && _a !== void 0 ? _a : "000000",
            (_b = palette[1]) !== null && _b !== void 0 ? _b : "000000",
            (_c = palette[2]) !== null && _c !== void 0 ? _c : "000000",
            (_d = palette[3]) !== null && _d !== void 0 ? _d : "000000",
        ];
    });
};
/**
 * Fill and sort a variable length palette into a strict 4-entry HexPalette
 * using brightness anchors and closest color matching
 */
const fillVariablePalette = (palette) => {
    // Convert palette into structured entries
    const colors = palette.map((hex) => {
        const color = (0, chroma_js_1.default)(hex);
        const [r, g, b] = color.rgb();
        const lightness = color.lab()[0];
        const colorIndex = (0, tileData_1.tileDataIndexFn)(r, g, b, 255);
        return {
            hex,
            index: colorIndex,
            lightness: lightness,
        };
    });
    colors.sort((a, b) => a.index - b.index);
    const result = [
        undefined,
        undefined,
        undefined,
        undefined,
    ];
    const claimed = [false, false, false, false];
    const overflow = [];
    // First pass: claim preferred slots based on index
    {
        let i = 0;
        while (i < colors.length) {
            const slotIndex = colors[i].index;
            // Collect all colors that prefer this same slot
            const start = i;
            while (i < colors.length && colors[i].index === slotIndex)
                i++;
            const group = colors.slice(start, i);
            // Sort group by distance to brightness anchor for this slot
            const anchor = BRIGHTNESS_ANCHOR[slotIndex];
            group.sort((a, b) => {
                const da = Math.abs(a.lightness - anchor);
                const db = Math.abs(b.lightness - anchor);
                return da - db;
            });
            // Winner claims preferred slot
            const winner = group[0];
            if (!claimed[slotIndex] && result[slotIndex] === undefined) {
                result[slotIndex] = winner.hex;
                claimed[slotIndex] = true;
            }
            else {
                overflow.push(winner);
            }
            // Others overflow
            for (let j = 1; j < group.length; j++) {
                overflow.push(group[j]);
            }
        }
    }
    // Sort overflow for placement:
    overflow.sort((a, b) => {
        const da = Math.abs(a.lightness - BRIGHTNESS_ANCHOR[a.index]);
        const db = Math.abs(b.lightness - BRIGHTNESS_ANCHOR[b.index]);
        return da - db;
    });
    const findForward = (start) => {
        for (let i = start + 1; i < 4; i++) {
            if (result[i] === undefined)
                return i;
        }
        return null;
    };
    const findBackward = (start) => {
        for (let i = start - 1; i >= 0; i--) {
            if (result[i] === undefined)
                return i;
        }
        return null;
    };
    // Second pass: place overflow items
    for (const col of overflow) {
        let slot = findForward(col.index);
        if (slot === null)
            slot = findBackward(col.index);
        if (slot === null)
            slot = findBackward(4);
        if (slot !== null) {
            result[slot] = col.hex;
            claimed[slot] = true;
        }
    }
    // Fill empty slots
    for (let i = 0; i < 4; i++) {
        if (result[i] === undefined)
            result[i] = "000000";
    }
    return result;
};
exports.fillVariablePalette = fillVariablePalette;
const fillVariablePalettes = (palettes) => {
    return palettes.map((palette) => {
        return (0, exports.fillVariablePalette)(palette);
    });
};
exports.fillVariablePalettes = fillVariablePalettes;
const calculatePaletteDistance = (palette1, palette2) => {
    let totalDistance = 0;
    for (let i = 0; i < 4; i++) {
        const color1 = palette1[i] || "000000";
        const color2 = palette2[i] || "000000";
        totalDistance += manhattanHexDistance(color1, color2);
    }
    return totalDistance;
};
const setUIPalette = ({ palettes, mappingTable, }, uiPalette) => {
    if (!uiPalette) {
        return { palettes, mappingTable };
    }
    if (palettes.length < 8) {
        const base = palettes.slice(0, 7);
        while (base.length < 7) {
            base.push(emptyPalette);
        }
        base.push(uiPalette);
        return { palettes: base, mappingTable };
    }
    // Ensure we have at least 8 slots to work with
    const base = palettes.slice(0);
    while (base.length < 8) {
        base.push(emptyPalette);
    }
    // Determine which palette in [0..6] most closely matches the UI palette
    const candidateMax = Math.min(6, palettes.length - 1);
    let replaceIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i <= candidateMax; i++) {
        const d = calculatePaletteDistance(base[i], uiPalette);
        if (d < minDistance) {
            minDistance = d;
            replaceIndex = i;
        }
    }
    // Build the new palettes:
    // - Move whatever was at [7] into the slot we are replacing
    // - Place the UI palette at [7]
    const outPalettes = base.slice(0);
    const previousAt7 = base[7];
    outPalettes[replaceIndex] = previousAt7;
    outPalettes[7] = uiPalette;
    const outMapping = mappingTable.map((i) => {
        if (i === replaceIndex)
            return 7;
        if (i === 7)
            return replaceIndex;
        return i;
    });
    return { palettes: outPalettes, mappingTable: outMapping };
};
exports.setUIPalette = setUIPalette;


/***/ }),

/***/ 704:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.trimIndexedImageHorizontal = exports.trimIndexedImage = exports.flipIndexedImageY = exports.flipIndexedImageX = exports.indexedImageTo2bppTileData = exports.sliceIndexedImage = exports.toIndex = exports.cloneIndexedImage = exports.makeIndexedImage = exports.pixelDataToIndexedImage = void 0;
/**
 * A color value for use in IndexedImages
 */
var Color;
(function (Color) {
    Color[Color["Transparent"] = 0] = "Transparent";
    Color[Color["Light"] = 1] = "Light";
    Color[Color["Mid"] = 2] = "Mid";
    Color[Color["Dark"] = 3] = "Dark";
    Color[Color["Divider"] = 254] = "Divider";
    Color[Color["Unknown"] = 255] = "Unknown";
})(Color || (Color = {}));
/**
 * Convert an array of pixel data into an IndexedImage using a given index function
 *
 * @param width Image width
 * @param height Image height
 * @param pixels Raw RGB pixel data array
 * @param indexFn A function to convert RGB values to a color index
 * @returns A new IndexedImage representing the pixel data provided
 */
const pixelDataToIndexedImage = (width, height, pixels, indexFn) => {
    const output = (0, exports.makeIndexedImage)(width, height);
    let ii = 0;
    for (let i = 0; i < pixels.length; i += 4) {
        output.data[ii] = indexFn(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]);
        ii++;
    }
    return output;
};
exports.pixelDataToIndexedImage = pixelDataToIndexedImage;
/**
 * Create a blank IndexedImage with a given width & height
 * @param width Image width
 * @param height Image Height
 * @returns IndexedImage with blank data
 */
const makeIndexedImage = (width, height) => {
    return {
        width,
        height,
        data: new Uint8Array(width * height),
    };
};
exports.makeIndexedImage = makeIndexedImage;
/**
 * Create a deep clone of an IndexedImage
 * @param original An IndexedImage to clone
 * @returns A deep clone of the original IndexedImage
 */
const cloneIndexedImage = (original) => {
    return {
        width: original.width,
        height: original.height,
        data: new Uint8Array(original.data),
    };
};
exports.cloneIndexedImage = cloneIndexedImage;
/**
 * Convert an x/y coordinate to an index with an IndexedImage's data
 * @param x X coordinate
 * @param y Y coordinate
 * @param image IndexedImage to read
 * @returns Index value to using in image.data[]
 */
const toIndex = (x, y, image) => x + y * image.width;
exports.toIndex = toIndex;
/**
 * Create a new IndexedImage by slicing from a larger image.
 * @param inData IndexedImage to slice
 * @param startX Left coordinate
 * @param startY Top coordinate
 * @param width Width of slice
 * @param height Height of slice
 * @returns
 */
const sliceIndexedImage = (inData, startX, startY, width, height) => {
    const output = (0, exports.makeIndexedImage)(width, height);
    const inWidth = inData.width;
    const inHeight = inData.height;
    let ii = 0;
    for (let y = startY; y < startY + height; y++) {
        for (let x = startX; x < startX + width; x++) {
            if (x < inWidth && y < inHeight && x >= 0 && y >= 0) {
                const i = (0, exports.toIndex)(x, y, inData);
                output.data[ii] = inData.data[i];
            }
            else {
                output.data[ii] = Color.Transparent;
            }
            ii++;
        }
    }
    return output;
};
exports.sliceIndexedImage = sliceIndexedImage;
/**
 * Convert an 8px tile to GB 2bpp format
 * @param image Tile image to read (should be 8x8px)
 * @returns Array of GB format 2bpp image data
 */
const indexedImageTo2bppTileData = (image) => {
    const output = new Uint8Array(16);
    let i = 0;
    for (let y = 0; y < 8; y++) {
        let row1 = "";
        let row2 = "";
        for (let x = 0; x < 8; x++) {
            const index = (0, exports.toIndex)(x, y, image);
            const binary = bin2(image.data[index]);
            row1 += binary[1];
            row2 += binary[0];
        }
        output[i] = binDec(row1);
        i++;
        output[i] = binDec(row2);
        i++;
    }
    return output;
};
exports.indexedImageTo2bppTileData = indexedImageTo2bppTileData;
/**
 * Flip IndexedImage horizontally
 * @param inData Image to flip
 * @returns Horizontally flipped IndexedImage
 */
const flipIndexedImageX = (inData) => {
    const output = (0, exports.makeIndexedImage)(inData.width, inData.height);
    const width = inData.width;
    const height = inData.height;
    let ii = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (0, exports.toIndex)(width - x - 1, y, inData);
            output.data[ii] = inData.data[i];
            ii++;
        }
    }
    return output;
};
exports.flipIndexedImageX = flipIndexedImageX;
/**
 * Flip IndexedImage vertically
 * @param inData Image to flip
 * @returns Vertically flipped IndexedImage
 */
const flipIndexedImageY = (inData) => {
    const output = (0, exports.makeIndexedImage)(inData.width, inData.height);
    const width = inData.width;
    const height = inData.height;
    let ii = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (0, exports.toIndex)(x, height - y - 1, inData);
            output.data[ii] = inData.data[i];
            ii++;
        }
    }
    return output;
};
exports.flipIndexedImageY = flipIndexedImageY;
const trimIndexedImage = (inData, trimValue) => {
    const width = inData.width;
    const height = inData.height;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (0, exports.toIndex)(x, y, inData);
            if (inData.data[i] !== trimValue) {
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
        }
    }
    const sliceW = Math.max(0, maxX - minX + 1);
    const sliceH = Math.max(0, maxY - minY + 1);
    return {
        data: (0, exports.sliceIndexedImage)(inData, minX, minY, sliceW, sliceH),
        coordinates: { x: minX, y: minY, width: sliceW, height: sliceH },
    };
};
exports.trimIndexedImage = trimIndexedImage;
const trimIndexedImageHorizontal = (inData, trimValue) => {
    const width = inData.width;
    const height = inData.height;
    let minX = width;
    let maxX = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (0, exports.toIndex)(x, y, inData);
            if (inData.data[i] !== trimValue) {
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
            }
        }
    }
    const sliceW = Math.max(0, maxX - minX + 1);
    const sliceH = inData.height;
    return {
        data: (0, exports.sliceIndexedImage)(inData, minX, 0, sliceW, sliceH),
        coordinates: { x: minX, y: 0, width: sliceW, height: sliceH },
    };
};
exports.trimIndexedImageHorizontal = trimIndexedImageHorizontal;
const bin2 = (value) => value.toString(2).padStart(2, "0");
const binDec = (binary) => parseInt(binary, 2);


/***/ }),

/***/ 50:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hashTileData = exports.tilesAndLookupToTilemap = exports.tileArrayToTileData = exports.toTileLookup = exports.tileDataIndexFn = void 0;
const tileDataIndexFn = (_r, g, _b, _a) => {
    if (g < 65) {
        return 3;
    }
    if (g < 130) {
        return 2;
    }
    if (g < 205) {
        return 1;
    }
    return 0;
};
exports.tileDataIndexFn = tileDataIndexFn;
const toTileLookup = (tiles) => {
    const output = {};
    for (const tile of tiles) {
        const key = (0, exports.hashTileData)(tile);
        if (!output[key]) {
            output[key] = tile;
        }
    }
    return output;
};
exports.toTileLookup = toTileLookup;
const tileArrayToTileData = (tiles) => {
    const size = tiles.reduce((memo, tile) => memo + tile.length, 0);
    const output = new Uint8Array(size);
    let index = 0;
    for (const tileData of tiles) {
        output.set(tileData, index);
        index += tileData.length;
    }
    return output;
};
exports.tileArrayToTileData = tileArrayToTileData;
const tilesAndLookupToTilemap = (tiles, lookup) => {
    const output = new Array(tiles.length).fill(0);
    const keys = Object.keys(lookup);
    let i = 0;
    for (const tileData of tiles) {
        const key = (0, exports.hashTileData)(tileData);
        const value = keys.indexOf(key);
        if (value === -1) {
            throw new Error("Missing Tile" + key);
        }
        output[i] = value;
        i++;
    }
    return output;
};
exports.tilesAndLookupToTilemap = tilesAndLookupToTilemap;
const hashTileData = (tile) => {
    // Will do for now...
    return JSON.stringify(tile);
};
exports.hashTileData = hashTileData;


/***/ }),

/***/ 768:
/***/ (function(module) {

/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
     true ? module.exports = factory() :
    0;
})(this, (function () { 'use strict';

    var limit$2 = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var limit$1 = limit$2;

    var clip_rgb$3 = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit$1(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit$1(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i$1 = 0, list$1 = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i$1 < list$1.length; i$1 += 1) {
        var name = list$1[i$1];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var type$o = type$p;

    var unpack$B = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type$o(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var type$n = type$p;

    var last$4 = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type$n(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI$2 = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb$3,
    	limit: limit$2,
    	type: type$p,
    	unpack: unpack$B,
    	last: last$4,
    	PI: PI$2,
    	TWOPI: PI$2*2,
    	PITHIRD: PI$2/3,
    	DEG2RAD: PI$2 / 180,
    	RAD2DEG: 180 / PI$2
    };

    var input$h = {
    	format: {},
    	autodetect: []
    };

    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;

    var Color$D = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$m(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$3(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!_input.sorted) {
                _input.autodetect = _input.autodetect.sort(function (a,b) { return b.p - a.p; });
                _input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = _input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (_input.format[mode]) {
            var rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$2(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color$D.prototype.toString = function toString () {
        if (type$m(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color$D;

    var chroma$k = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma$k.Color, [ null ].concat( args) ));
    };

    chroma$k.Color = Color_1;
    chroma$k.version = '2.4.2';

    var chroma_1 = chroma$k;

    var unpack$A = utils.unpack;
    var max$2 = Math.max;

    var rgb2cmyk$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$A(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r,max$2(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk$1;

    var unpack$z = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$z(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;

    var rgb2cmyk = rgb2cmyk_1;

    Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
    };

    chroma$j.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$C, [ null ].concat( args, ['cmyk']) ));
    };

    input$g.format.cmyk = cmyk2rgb_1;

    input$g.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$y(args, 'cmyk');
            if (type$l(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$x(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css$1;

    var unpack$w = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl$3 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$w(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl$3;

    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$v(args, 'rgba');
        var mode = last$1(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css(rgb2hsl$2(rgba), mode);
        }
        rgba[0] = round$6(rgba[0]);
        rgba[1] = round$6(rgba[1]);
        rgba[2] = round$6(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css$1;

    var unpack$u = utils.unpack;
    var round$5 = Math.round;

    var hsl2rgb$1 = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$u(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$5(c[0]*255),round$5(c[1]*255),round$5(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb$1;

    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$4 = Math.round;

    var css2rgb$1 = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input$f.format.named) {
            try {
                return input$f.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb$1.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb$1;

    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;

    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;

    Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
    };

    chroma$i.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$B, [ null ].concat( args, ['css']) ));
    };

    input$e.format.css = css2rgb;

    input$e.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$k(h) === 'string' && css2rgb.test(h)) {
                return 'css';
            }
        }
    });

    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;

    input$d.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$t(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma$h.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$A, [ null ].concat( args, ['gl']) ));
    };

    Color$A.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$s = utils.unpack;

    var rgb2hcg$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$s(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg$1;

    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$r(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor$3(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;

    var rgb2hcg = rgb2hcg_1;

    Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
    };

    chroma$g.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$z, [ null ].concat( args, ['hcg']) ));
    };

    input$c.format.hcg = hcg2rgb_1;

    input$c.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$q(args, 'hcg');
            if (type$j(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;

    var rgb2hex$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$p(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex$2;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb$1 = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb$1;

    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;

    var rgb2hex$1 = rgb2hex_1;

    Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
    };

    chroma$f.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$y, [ null ].concat( args, ['hex']) ));
    };

    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$i(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt$4((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI$2 - h;
            }
            h /= TWOPI$2;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi$1;

    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$n(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit(i*r*3);
        g = limit(i*g*3);
        b = limit(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;

    var rgb2hsi = rgb2hsi_1;

    Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
    };

    chroma$e.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$x, [ null ].concat( args, ['hsi']) ));
    };

    input$a.format.hsi = hsi2rgb_1;

    input$a.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'hsi');
            if (type$h(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;

    var rgb2hsl$1 = rgb2hsl_1;

    Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
    };

    chroma$d.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$w, [ null ].concat( args, ['hsl']) ));
    };

    input$9.format.hsl = hsl2rgb_1;

    input$9.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$l(args, 'hsl');
            if (type$g(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$k = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$k(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv$1 = rgb2hsl;

    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$j(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$2(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;

    var rgb2hsv = rgb2hsv$1;

    Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma$c.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$v, [ null ].concat( args, ['hsv']) ));
    };

    input$8.format.hsv = hsv2rgb_1;

    input$8.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$i(args, 'hsv');
            if (type$f(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;

    var rgb2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$h(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow$a((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > LAB_CONSTANTS$3.t3) { return pow$a(t, 1 / 3); }
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab$2;

    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$g(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0)
    };

    var lab2rgb_1 = lab2rgb$1;

    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;

    var rgb2lab$1 = rgb2lab_1;

    Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
    };

    chroma$b.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$u, [ null ].concat( args, ['lab']) ));
    };

    input$7.format.lab = lab2rgb_1;

    input$7.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'lab');
            if (type$e(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;

    var lab2lch$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$e(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch$2;

    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;

    var rgb2lch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch$1;

    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;

    var lch2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$c(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$3(h) * c, sin$3(h) * c]
    };

    var lch2lab_1 = lch2lab$2;

    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;

    var lch2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$b(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb$1;

    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;

    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$a(args, 'hcl').reverse();
        return lch2rgb.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;

    var rgb2lch = rgb2lch_1;

    Color$t.prototype.lch = function() { return rgb2lch(this._rgb); };
    Color$t.prototype.hcl = function() { return rgb2lch(this._rgb).reverse(); };

    chroma$a.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$t, [ null ].concat( args, ['lch']) ));
    };
    chroma$a.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$t, [ null ].concat( args, ['hcl']) ));
    };

    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input$6.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$9(args, m);
            if (type$d(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11$1 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11$1;

    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;

    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;

    Color$s.prototype.name = function() {
        var hex = rgb2hex(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input$5.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11[name]) { return hex2rgb(w3cx11[name]); }
        throw new Error('unknown color name: '+name);
    };

    input$5.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$c(h) === 'string' && w3cx11[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$8 = utils.unpack;

    var rgb2num$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$8(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num$1;

    var type$b = utils.type;

    var num2rgb = function (num) {
        if (type$b(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;

    var rgb2num = rgb2num_1;

    Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
    };

    chroma$9.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$r, [ null ].concat( args, ['num']) ));
    };

    input$4.format.num = num2rgb_1;

    input$4.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$a(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;

    Color$q.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$1);
    };

    Color$q.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$1(v)) : v;
        });
    };

    chroma$8.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$q, [ null ].concat( args, ['rgb']) ));
    };

    input$3.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$7(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input$3.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$7(args, 'rgba');
            if (type$9(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$9(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log$1 = Math.log;

    var temperature2rgb$1 = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log$1(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log$1(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log$1(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log$1(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb$1;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/

    var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round = Math.round;

    var rgb2temperature$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$6(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round(temp);
    };

    var rgb2temperature_1 = rgb2temperature$1;

    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;

    var rgb2temperature = rgb2temperature_1;

    Color$p.prototype.temp =
    Color$p.prototype.kelvin =
    Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
    };

    chroma$7.temp =
    chroma$7.kelvin =
    chroma$7.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$p, [ null ].concat( args, ['temp']) ));
    };

    input$2.format.temp =
    input$2.format.kelvin =
    input$2.format.temperature = temperature2rgb_1;

    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;

    var rgb2oklab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        // OKLab color space implementation taken from
        // https://bottosson.github.io/posts/oklab/
        var ref = unpack$5(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
    };

    var rgb2oklab_1 = rgb2oklab$2;

    function rgb2lrgb(c) {
        var abs = Math.abs(c);
        if (abs < 0.04045) {
            return c / 12.92;
        }
        return (sign$1(c) || 1) * pow$8((abs + 0.055) / 1.055, 2.4);
    }

    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var oklab2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$4(args, 'lab');
        var L = args[0];
        var a = args[1];
        var b = args[2];

        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);

        return [
            255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            args.length > 3 ? args[3] : 1
        ];
    };

    var oklab2rgb_1 = oklab2rgb$1;

    function lrgb2rgb(c) {
        var abs = Math.abs(c);
        if (abs > 0.0031308) {
            return (sign(c) || 1) * (1.055 * pow$7(abs, 1 / 2.4) - 0.055);
        }
        return c * 12.92;
    }

    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;

    var rgb2oklab$1 = rgb2oklab_1;

    Color$o.prototype.oklab = function () {
        return rgb2oklab$1(this._rgb);
    };

    chroma$6.oklab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$o, [ null ].concat( args, ['oklab']) ));
    };

    input$1.format.oklab = oklab2rgb_1;

    input$1.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'oklab');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'oklab';
            }
        }
    });

    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;

    var rgb2oklch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$2(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
    };

    var rgb2oklch_1 = rgb2oklch$1;

    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;

    var oklch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$1(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var oklch2rgb_1 = oklch2rgb;

    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;

    var rgb2oklch = rgb2oklch_1;

    Color$n.prototype.oklch = function () {
        return rgb2oklch(this._rgb);
    };

    chroma$5.oklch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$n, [ null ].concat( args, ['oklch']) ));
    };

    input.format.oklch = oklch2rgb_1;

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack(args, 'oklch');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'oklch';
            }
        }
    });

    var Color$m = Color_1;
    var type$6 = utils.type;

    Color$m.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$6(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    var Color$l = Color_1;

    Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;

    Color$k.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= LAB_CONSTANTS$1.Kn * amount;
    	return new Color$k(lab, 'lab').alpha(me.alpha(), true);
    };

    Color$k.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;

    var Color$j = Color_1;

    Color$j.prototype.get = function (mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color$i.prototype.luminance = function(lum) {
        if (lum !== undefined && type$5(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color$i([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color$i([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color$i([0,0,0]), this) : test(this, new Color$i([255,255,255]))).rgb();
            return new Color$i(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$6((x+0.055)/1.055, 2.4);
    };

    var interpolator$1 = {};

    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;

    var mix$1 = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$4(col1) !== 'object') { col1 = new Color$h(col1); }
        if (type$4(col2) !== 'object') { col2 = new Color$h(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    var Color$g = Color_1;
    var mix = mix$1;

    Color$g.prototype.mix =
    Color$g.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    var Color$f = Color_1;

    Color$f.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color$f([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;

    Color$e.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += LAB_CONSTANTS.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color$e(lch, 'lch').alpha(me.alpha(), true);
    };

    Color$e.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var Color$d = Color_1;
    var type$3 = utils.type;

    Color$d.prototype.set = function (mc, value, mutate) {
        if ( mutate === void 0 ) mutate = false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) {
                if (type$3(value) == 'string') {
                    switch (value.charAt(0)) {
                        case '+':
                            src[i] += +value;
                            break;
                        case '-':
                            src[i] += +value;
                            break;
                        case '*':
                            src[i] *= +value.substr(1);
                            break;
                        case '/':
                            src[i] /= +value.substr(1);
                            break;
                        default:
                            src[i] = +value;
                    }
                } else if (type$3(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color$d(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color$c = Color_1;

    var rgb = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator$1.rgb = rgb;

    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(
            sqrt$2(pow$5(x1,2) * (1-f) + pow$5(x2,2) * f),
            sqrt$2(pow$5(y1,2) * (1-f) + pow$5(y2,2) * f),
            sqrt$2(pow$5(z1,2) * (1-f) + pow$5(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator$1.lrgb = lrgb;

    var Color$a = Color_1;

    var lab = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator$1.lab = lab;

    var Color$9 = Color_1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        } else if (m === 'oklch') {
            xyz0 = col1.oklch().reverse();
            xyz1 = col2.oklch().reverse();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h' || m === 'oklch') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1 - (hue0 + 360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1 + 360 - hue0;
            } else {
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === 'oklch' ? new Color$9([lbv, sat, hue], m) : new Color$9([hue, sat, lbv], m);
    };

    var interpolate_hsx$5 = _hsx;

    var lch = function (col1, col2, f) {
    	return interpolate_hsx$5(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator$1.lch = lch;
    interpolator$1.hcl = lch;

    var Color$8 = Color_1;

    var num = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator$1.num = num;

    var interpolate_hsx$4 = _hsx;

    var hcg = function (col1, col2, f) {
    	return interpolate_hsx$4(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator$1.hcg = hcg;

    var interpolate_hsx$3 = _hsx;

    var hsi = function (col1, col2, f) {
    	return interpolate_hsx$3(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator$1.hsi = hsi;

    var interpolate_hsx$2 = _hsx;

    var hsl = function (col1, col2, f) {
    	return interpolate_hsx$2(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator$1.hsl = hsl;

    var interpolate_hsx$1 = _hsx;

    var hsv = function (col1, col2, f) {
    	return interpolate_hsx$1(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator$1.hsv = hsv;

    var Color$7 = Color_1;

    var oklab = function (col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(
            xyz0[0] + f * (xyz1[0] - xyz0[0]),
            xyz0[1] + f * (xyz1[1] - xyz0[1]),
            xyz0[2] + f * (xyz1[2] - xyz0[2]),
            'oklab'
        );
    };

    // register interpolator
    interpolator$1.oklab = oklab;

    var interpolate_hsx = _hsx;

    var oklch = function (col1, col2, f) {
        return interpolate_hsx(col1, col2, f, 'oklch');
    };

    // register interpolator
    interpolator$1.oklch = oklch;

    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color$6(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$2(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$2(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color$6(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color$6(clip_rgb$1(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze

    var chroma$4 = chroma_1;
    var type$2 = utils.type;

    var pow$3 = Math.pow;

    var scale$2 = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma$4('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$2(colors) === 'string' && chroma$4.brewer &&
                chroma$4.brewer[colors.toLowerCase()]) {
                colors = chroma$4.brewer[colors.toLowerCase()];
            }
            if (type$2(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma$4(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$3(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$2(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma$4.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$2(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma$4(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$2(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma$4.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma$4.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$2(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma$4[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma$4(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab
    var Color$5 = Color_1;

    var scale$1 = scale$2;

    // nth row of the pascal triangle
    var binom_row = function(n) {
        var row = [1, 1];
        for (var i = 1; i < n; i++) {
            var newrow = [1];
            for (var j = 1; j <= row.length; j++) {
                newrow[j] = (row[j] || 0) + row[j - 1];
            }
            row = newrow;
        }
        return row;
    };

    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color$5(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length >= 5) {
            // general case (degree n bezier)
            var labs, row, n;
            labs = colors.map(function (c) { return c.lab(); });
            n = colors.length - 1;
            row = binom_row(n);
            I = function (t) {
                var u = 1 - t;
                var lab = ([0, 1, 2].map(function (i) { return labs.reduce(function (sum, el, j) { return (sum + row[j] * Math.pow( u, (n - j) ) * Math.pow( t, j ) * el[i]); }, 0); }));
                return new Color$5(lab, 'lab');
            };
        } else {
            throw new RangeError("No point in running bezier with only one color.")
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale$1(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */

    var chroma$3 = chroma_1;

    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma$3(top).rgb();
            var c1 = chroma$3(bottom).rgb();
            return chroma$3.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;

    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$1(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI * (((start+120)/360) + (rotations * fract));
            var l = pow$2(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$1(a);
            var sin_a = sin$1(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma$2(clip_rgb([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$1(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$1(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma$2.scale(f); };

        f.hue(hue);

        return f;
    };

    var Color$4 = Color_1;
    var digits = '0123456789abcdef';

    var floor$1 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$1(random() * 16));
        }
        return new Color$4(code, 'hex');
    };

    var type = type$p;
    var log = Math.log;
    var pow$1 = Math.pow;
    var floor = Math.floor;
    var abs$1 = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log(min);
            var max_log = Math.LOG10E * log(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$1(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs$1(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var Color$3 = Color_1;


    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min = Math.min;
    var max = Math.max;
    var atan2 = Math.atan2;
    var abs = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;

    var deltaE = function(a, b, Kl, Kc, Kh) {
        if ( Kl === void 0 ) Kl=1;
        if ( Kc === void 0 ) Kc=1;
        if ( Kh === void 0 ) Kh=1;

        // Delta E (CIE 2000)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        var rad2deg = function(rad) {
            return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
            return (2 * PI * deg) / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2)/2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2)/2;
        var G = 0.5*(1-sqrt(pow(avgC, 7)/(pow(avgC, 7) + pow(25, 7))));
        var a1p = a1*(1+G);
        var a2p = a2*(1+G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p)/2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360)/2 : (h1p + h2p)/2;
        var T = 1 - 0.17*cos(deg2rad(avgHp - 30)) + 0.24*cos(deg2rad(2*avgHp)) + 0.32*cos(deg2rad(3*avgHp + 6)) - 0.2*cos(deg2rad(4*avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2*sqrt(C1p*C2p)*sin(deg2rad(deltaHp)/2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;    
        var sl = 1 + (0.015*pow(avgL - 50, 2))/sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045*avgCp;
        var sh = 1 + 0.015*avgCp*T;
        var deltaTheta = 30*exp(-pow((avgHp - 275)/25, 2));
        var Rc = 2*sqrt(pow(avgCp, 7)/(pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc*sin(2*deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL/(Kl*sl), 2) + pow(deltaCp/(Kc*sc), 2) + pow(deltaHp/(Kh*sh), 2) + Rt*(deltaCp/(Kc*sc))*(deltaHp/(Kh*sh)));
        return max(0, min(100, result));
    };

    var Color$1 = Color_1;

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var Color = Color_1;

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:
    var chroma$1 = chroma_1;

    var scale = scale$2;

    var scales = {
    	cool: function cool() { return scale([chroma$1.hsl(180,1,.9), chroma$1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff']).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i = 0, list = Object.keys(colorbrewer); i < list.length; i += 1) {
        var key = list[i];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    var chroma = chroma_1;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors

















    // operators --> modify existing Colors










    // interpolators












    // generators -- > create new colors
    chroma.average = average;
    chroma.bezier = bezier_1;
    chroma.blend = blend_1;
    chroma.cubehelix = cubehelix;
    chroma.mix = chroma.interpolate = mix$1;
    chroma.random = random_1;
    chroma.scale = scale$2;

    // other utility methods
    chroma.analyze = analyze_1.analyze;
    chroma.contrast = contrast;
    chroma.deltaE = deltaE;
    chroma.distance = distance;
    chroma.limits = analyze_1.limits;
    chroma.valid = valid;

    // scale
    chroma.scales = scales;

    // colors
    chroma.colors = w3cx11_1;
    chroma.brewer = colorbrewer_1;

    var chroma_js = chroma;

    return chroma_js;

}));


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const consts_1 = __webpack_require__(904);
const color_1 = __webpack_require__(219);
const autoColor_1 = __webpack_require__(746);
const indexedImage_1 = __webpack_require__(704);
const tileData_1 = __webpack_require__(50);
// eslint-disable-next-line no-restricted-globals
const workerCtx = self;
const cache = {};
const TILE_COLOR_PALETTE = 0x7;
workerCtx.onmessage = async (evt) => {
    var _a;
    const id = evt.data.id;
    const src = evt.data.src;
    const tilesSrc = evt.data.tilesSrc;
    const previewAsMono = evt.data.previewAsMono;
    const monoBGP = (_a = evt.data.monoBGP) !== null && _a !== void 0 ? _a : [0, 1, 2, 3];
    const uiPalette = evt.data.uiPalette;
    const colorCorrectionFn = (0, color_1.hex2GBCrgb)(evt.data.colorCorrection);
    let canvas;
    let ctx;
    let img;
    let tilesCanvas;
    let tilesCtx;
    let tilesImg;
    if (cache[src]) {
        // Using Cached Data
        canvas = cache[src].canvas;
        ctx = cache[src].ctx;
        img = cache[src].img;
    }
    else {
        // Fetch New Data
        const imgblob = await fetch(src).then((r) => r.blob());
        img = await createImageBitmap(imgblob);
        canvas = new OffscreenCanvas(img.width, img.height);
        const tmpCtx = canvas.getContext("2d", { willReadFrequently: true });
        if (!tmpCtx) {
            return;
        }
        ctx = tmpCtx;
        cache[src] = {
            canvas,
            ctx,
            img,
        };
    }
    // If DMG tiles override provided, load second image
    if (tilesSrc) {
        if (cache[tilesSrc]) {
            // Using Cached Data
            tilesCanvas = cache[tilesSrc].canvas;
            tilesCtx = cache[tilesSrc].ctx;
            tilesImg = cache[tilesSrc].img;
        }
        else {
            // Fetch New Data
            const imgblob = await fetch(tilesSrc).then((r) => r.blob());
            tilesImg = await createImageBitmap(imgblob);
            tilesCanvas = new OffscreenCanvas(img.width, img.height);
            const tmpCtx = tilesCanvas.getContext("2d", { willReadFrequently: true });
            if (!tmpCtx) {
                return;
            }
            tilesCtx = tmpCtx;
            cache[tilesSrc] = {
                canvas: tilesCanvas,
                ctx: tilesCtx,
                img: tilesImg,
            };
        }
    }
    const width = img.width;
    const height = img.height;
    const tileWidth = Math.floor(width / 8);
    const tileHeight = Math.floor(height / 8);
    const tilesLength = tileWidth * tileHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let paletteData;
    if (tilesSrc && tilesCanvas && tilesCtx && tilesImg) {
        // If DMG tiles override provided get tiles from second image and color using tiles + first image
        tilesCtx.drawImage(tilesImg, 0, 0, width, height);
        const tilesImageData = tilesCtx.getImageData(0, 0, width, height);
        const tilesData = tilesImageData.data;
        const indexedImage = (0, indexedImage_1.pixelDataToIndexedImage)(width, height, tilesData, tileData_1.tileDataIndexFn);
        paletteData = (0, autoColor_1.autoPaletteUsingTiles)(width, height, data, indexedImage, evt.data.colorCorrection, uiPalette);
    }
    else {
        // If only one image provided extract tiles and color from same image
        paletteData = (0, autoColor_1.autoPalette)(width, height, data, evt.data.colorCorrection, uiPalette);
    }
    const palettesRGB = paletteData.palettes.map((colors) => colors.map(colorCorrectionFn));
    const dmgPalette = consts_1.DMG_PALETTE.colors.map(colorCorrectionFn);
    const tiles = paletteData.map;
    const indexedImage = paletteData.indexedImage;
    for (let t = 0; t < tilesLength; t++) {
        const tX = t % tileWidth;
        const tY = Math.floor(t / tileWidth);
        const palette = palettesRGB[tiles[t] & TILE_COLOR_PALETTE] || palettesRGB[0];
        const p1X = tX * 8;
        const p2X = p1X + 8;
        const p1Y = tY * 8;
        const p2Y = p1Y + 8;
        for (let pX = p1X; pX < p2X; pX++) {
            for (let pY = p1Y; pY < p2Y; pY++) {
                const ii = pX + pY * width;
                const index = ii * 4;
                const colorIndex = indexedImage.data[ii];
                const color = previewAsMono
                    ? dmgPalette[monoBGP[colorIndex]]
                    : palette[colorIndex];
                data[index] = color.r;
                data[index + 1] = color.g;
                data[index + 2] = color.b;
                data[index + 3] = 255;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
    const canvasImage = canvas.transferToImageBitmap();
    workerCtx.postMessage({ id, width, height, canvasImage }, [canvasImage]);
};
// -----------------------------------------------------------------
class W extends Worker {
    constructor() {
        super("");
    }
}
__webpack_unused_export__ = W;

})();

/******/ })()
;
//# sourceMappingURL=index.worker.js.map