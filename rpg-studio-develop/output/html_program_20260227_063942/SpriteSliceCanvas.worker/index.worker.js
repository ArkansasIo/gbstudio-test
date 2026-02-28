/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const color_1 = __webpack_require__(219);
// eslint-disable-next-line no-restricted-globals
const workerCtx = self;
const cache = {};
workerCtx.onmessage = async (evt) => {
    const id = evt.data.id;
    const src = evt.data.src;
    const offsetX = evt.data.offsetX;
    const offsetY = evt.data.offsetY;
    const width = evt.data.width;
    const height = evt.data.height;
    const flipX = evt.data.flipX;
    const flipY = evt.data.flipY;
    const objPalette = evt.data.objPalette;
    const palette = evt.data.palette;
    const colorCorrection = evt.data.colorCorrection;
    let img;
    if (cache[src]) {
        // Using Cached Data
        img = cache[src].img;
    }
    else {
        const imgblob = await fetch(src).then((r) => r.blob());
        img = await createImageBitmap(imgblob);
        cache[src] = {
            img,
        };
    }
    // Fetch New Data
    const canvas = new OffscreenCanvas(width, height);
    const tmpCtx = canvas.getContext("2d");
    if (!tmpCtx) {
        return;
    }
    const ctx = tmpCtx;
    // Draw Sprite
    ctx.save();
    if (flipX) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
    }
    if (flipY) {
        ctx.translate(0, height);
        ctx.scale(1, -1);
    }
    ctx.drawImage(img, -offsetX, -offsetY);
    ctx.restore();
    // Colorize
    const imageData = ctx.getImageData(0, 0, width, height);
    (0, color_1.colorizeSpriteData)(imageData.data, objPalette, palette, colorCorrection);
    ctx.putImageData(imageData, 0, 0);
    const canvasImage = canvas.transferToImageBitmap();
    const res = { id, canvasImage };
    workerCtx.postMessage(res, [canvasImage]);
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