/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 975:
/***/ ((module) => {

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

/***/ 189:
/***/ ((__unused_webpack_module, exports) => {


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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clampN = void 0;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const clampN = (max) => (value) => clamp(value, 0, max);
exports.clampN = clampN;
exports["default"] = clamp;


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
/******/ 	/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const consts_1 = __webpack_require__(904);
const color_1 = __webpack_require__(219);
// eslint-disable-next-line no-restricted-globals
const workerCtx = self;
const indexColour = (g) => {
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
const cache = {};
const TILE_COLOR_PALETTE = 0x7;
workerCtx.onmessage = async (evt) => {
    var _a;
    const id = evt.data.id;
    const src = evt.data.src;
    const tiles = evt.data.tiles;
    const previewAsMono = evt.data.previewAsMono;
    const monoBGP = (_a = evt.data.monoBGP) !== null && _a !== void 0 ? _a : [0, 1, 2, 3];
    const palettes = evt.data.palettes;
    const colorCorrectionFn = (0, color_1.hex2GBCrgb)(evt.data.colorCorrection);
    const palettesRGB = palettes.map((colors) => colors.map(colorCorrectionFn));
    const dmgPalette = consts_1.DMG_PALETTE.colors.map(colorCorrectionFn);
    let canvas;
    let ctx;
    let img;
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
                const index = (pX + pY * width) * 4;
                const colorIndex = indexColour(data[index + 1]);
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