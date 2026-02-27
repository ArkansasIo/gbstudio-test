/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 55655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ createCache)
});

;// CONCATENATED MODULE: ./node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
var isDevelopment = false;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  } // this function should always return with a value
  // TS can't understand it though so we make it stop complaining here


  return undefined;
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;

      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();



;// CONCATENATED MODULE: ./node_modules/stylis/src/Utility.js
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var Utility_from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var Utility_assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return Utility_charat(value, 0) ^ 45 ? (((((((length << 2) ^ Utility_charat(value, 0)) << 2) ^ Utility_charat(value, 1)) << 2) ^ Utility_charat(value, 2)) << 2) ^ Utility_charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function Utility_match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function Utility_replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function Utility_charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function Utility_substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function Utility_strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function Utility_sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function Utility_append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function Utility_combine (array, callback) {
	return array.map(callback).join('')
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Tokenizer.js


var line = 1
var column = 1
var Tokenizer_length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function Tokenizer_copy (root, props) {
	return Utility_assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function Tokenizer_char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? Utility_charat(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < Tokenizer_length ? Utility_charat(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return Utility_charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return Utility_substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, Tokenizer_length = Utility_strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function Tokenizer_tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: append(identifier(position - 1), children)
				break
			case 2: append(delimit(character), children)
				break
			default: append(from(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + Utility_from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Enum.js
var Enum_MS = '-ms-'
var Enum_MOZ = '-moz-'
var Enum_WEBKIT = '-webkit-'

var COMMENT = 'comm'
var Enum_RULESET = 'rule'
var Enum_DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var Enum_KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'
var LAYER = '@layer'

;// CONCATENATED MODULE: ./node_modules/stylis/src/Serializer.js



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function Serializer_serialize (children, callback) {
	var output = ''
	var length = Utility_sizeof(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case Enum_DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case Enum_KEYFRAMES: return element.return = element.value + '{' + Serializer_serialize(element.children, callback) + '}'
		case Enum_RULESET: element.value = element.props.join(',')
	}

	return Utility_strlen(children = Serializer_serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Middleware.js






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = Utility_sizeof(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case DECLARATION: element.return = prefix(element.value, element.length, children)
					return
				case KEYFRAMES:
					return serialize([copy(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
				case RULESET:
					if (element.length)
						return combine(element.props, function (value) {
							switch (match(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return serialize([copy(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return serialize([
										copy(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}),
										copy(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}),
										copy(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case RULESET:
			element.props = element.props.map(function (value) {
				return combine(tokenize(value), function (value, index, children) {
					switch (charat(value, 0)) {
						// \f
						case 12:
							return substr(value, 1, strlen(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + substr(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return sizeof(children) > 1 ? '' : value
								case index = sizeof(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Parser.js




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && Utility_charat(characters, length - 1) == 58) {
					if (indexof(characters += Utility_replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous)
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7)
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						Utility_append(comment(commenter(next(), caret()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = Utility_strlen(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset: if (ampersand == -1) characters = Utility_replace(characters, /\f/g, '')
						if (property > 0 && (Utility_strlen(characters) - length))
							Utility_append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(Utility_replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						Utility_append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule === 99 && Utility_charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && Utility_append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + Utility_strlen(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += Utility_from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = (Utility_strlen(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next())

						atrule = peek(), offset = length = Utility_strlen(type = characters += identifier(caret())), character++
						break
					// -
					case 45:
						if (previous === 45 && Utility_strlen(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = Utility_sizeof(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = Utility_substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : Utility_replace(y, /&\f/g, rule[x])))
				props[k++] = z

	return node(value, root, parent, offset === 0 ? Enum_RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, Utility_from(Tokenizer_char()), Utility_substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, Enum_DECLARATION, Utility_substr(value, 0, length), Utility_substr(value, length + 1, -1), length)
}

;// CONCATENATED MODULE: ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js





var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += Utility_from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

/* eslint-disable no-fallthrough */

function emotion_cache_browser_esm_prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return Enum_WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Enum_WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Enum_WEBKIT + value + Enum_MOZ + value + Enum_MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return Enum_WEBKIT + value + Enum_MS + value + value;
    // order

    case 6165:
      return Enum_WEBKIT + value + Enum_MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return Enum_WEBKIT + value + Utility_replace(value, /(\w+).+(:[^]+)/, Enum_WEBKIT + 'box-$1$2' + Enum_MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return Enum_WEBKIT + value + Enum_MS + 'flex-item-' + Utility_replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return Enum_WEBKIT + value + Enum_MS + 'flex-line-pack' + Utility_replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return Enum_WEBKIT + value + Enum_MS + Utility_replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return Enum_WEBKIT + value + Enum_MS + Utility_replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return Enum_WEBKIT + 'box-' + Utility_replace(value, '-grow', '') + Enum_WEBKIT + value + Enum_MS + Utility_replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return Enum_WEBKIT + Utility_replace(value, /([^-])(transform)/g, '$1' + Enum_WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return Utility_replace(Utility_replace(Utility_replace(value, /(zoom-|grab)/, Enum_WEBKIT + '$1'), /(image-set)/, Enum_WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return Utility_replace(value, /(image-set\([^]*)/, Enum_WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return Utility_replace(Utility_replace(value, /(.+:)(flex-)?(.*)/, Enum_WEBKIT + 'box-pack:$3' + Enum_MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + Enum_WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Utility_replace(value, /(.+)-inline(.+)/, Enum_WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (Utility_strlen(value) - 1 - length > 6) switch (Utility_charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (Utility_charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return Utility_replace(value, /(.+:)(.+)-([^]+)/, '$1' + Enum_WEBKIT + '$2-$3' + '$1' + Enum_MOZ + (Utility_charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? emotion_cache_browser_esm_prefix(Utility_replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (Utility_charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (Utility_charat(value, Utility_strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return Utility_replace(value, ':', ':' + Enum_WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return Utility_replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + Enum_WEBKIT + (Utility_charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + Enum_WEBKIT + '$2$3' + '$1' + Enum_MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (Utility_charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return Enum_WEBKIT + value + Enum_MS + Utility_replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return Enum_WEBKIT + value + Enum_MS + Utility_replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return Enum_WEBKIT + value + Enum_MS + Utility_replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return Enum_WEBKIT + value + Enum_MS + value + value;
  }

  return value;
}

var emotion_cache_browser_esm_prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case Enum_DECLARATION:
      element["return"] = emotion_cache_browser_esm_prefix(element.value, element.length);
      break;

    case Enum_KEYFRAMES:
      return Serializer_serialize([Tokenizer_copy(element, {
        value: Utility_replace(element.value, '@', '@' + Enum_WEBKIT)
      })], callback);

    case Enum_RULESET:
      if (element.length) return Utility_combine(element.props, function (value) {
        switch (Utility_match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return Serializer_serialize([Tokenizer_copy(element, {
              props: [Utility_replace(value, /:(read-\w+)/, ':' + Enum_MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return Serializer_serialize([Tokenizer_copy(element, {
              props: [Utility_replace(value, /:(plac\w+)/, ':' + Enum_WEBKIT + 'input-$1')]
            }), Tokenizer_copy(element, {
              props: [Utility_replace(value, /:(plac\w+)/, ':' + Enum_MOZ + '$1')]
            }), Tokenizer_copy(element, {
              props: [Utility_replace(value, /:(plac\w+)/, Enum_MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var defaultStylisPlugins = [emotion_cache_browser_esm_prefixer];

var createCache = function
  /*: EmotionCache */
createCache(options
/*: Options */
) {
  var key = options.key;

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node
    /*: HTMLStyleElement */
    ) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {};
  var container;
  /* : Node */

  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node
    /*: HTMLStyleElement */
    ) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;
  /*: (
  selector: string,
  serialized: SerializedStyles,
  sheet: StyleSheet,
  shouldCache: boolean
  ) => string | void */


  var omnipresentPlugins = [compat, removeLabel];

  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return Serializer_serialize(compile(styles), serializer);
    };

    _insert = function
      /*: void */
    insert(selector
    /*: string */
    , serialized
    /*: SerializedStyles */
    , sheet
    /*: StyleSheet */
    , shouldCache
    /*: boolean */
    ) {
      currentSheet = sheet;

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache
  /*: EmotionCache */
  = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};




/***/ }),

/***/ 87195:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  C: () => (/* binding */ CacheProvider),
  E: () => (/* binding */ Emotion$1),
  c: () => (/* binding */ createEmotionProps),
  h: () => (/* binding */ hasOwn)
});

// UNUSED EXPORTS: T, _, a, b, i, u, w

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js + 7 modules
var emotion_cache_browser_esm = __webpack_require__(55655);
;// CONCATENATED MODULE: ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser = true;

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};



// EXTERNAL MODULE: ./node_modules/@emotion/serialize/dist/emotion-serialize.esm.js + 3 modules
var emotion_serialize_esm = __webpack_require__(37448);
// EXTERNAL MODULE: ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var emotion_use_insertion_effect_with_fallbacks_browser_esm = __webpack_require__(71287);
;// CONCATENATED MODULE: ./node_modules/@emotion/react/dist/emotion-element-5486c51c.browser.esm.js










var isDevelopment = false;

/* import { type EmotionCache } from '@emotion/utils' */
var EmotionCacheContext
/*: React.Context<EmotionCache | null> */
= /* #__PURE__ */react.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,emotion_cache_browser_esm/* default */.A)({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache()
/*: EmotionCache | null*/
{
  return useContext(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache
/* <Props, Ref: React.Ref<*>> */
(func
/*: (props: Props, cache: EmotionCache, ref: Ref) => React.Node */
)
/*: React.AbstractComponent<Props> */
{
  return /*#__PURE__*/(0,react.forwardRef)(function (props
  /*: Props */
  , ref
  /*: Ref */
  ) {
    // the cache will never be null in the browser
    var cache = (0,react.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */react.createContext({});

var useTheme = function useTheme() {
  return React.useContext(ThemeContext);
};

var getTheme = function getTheme(outerTheme
/*: Object */
, theme
/*: Object | (Object => Object) */
) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(/* unused pure expression or super */ null && (weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
})));
/*
type ThemeProviderProps = {
  theme: Object | (Object => Object),
  children: React.Node
}
*/

var ThemeProvider = function ThemeProvider(props
/*: ThemeProviderProps */
) {
  var theme = React.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme
/* <Config: {}> */
(Component
/*: React.AbstractComponent<Config> */
)
/*: React.AbstractComponent<$Diff<Config, { theme: Object }>> */
{
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = React.useContext(ThemeContext);
    return /*#__PURE__*/React.createElement(Component, _extends({
      theme: theme,
      ref: ref
    }, props));
  };

  var WithTheme = /*#__PURE__*/React.forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoistNonReactStatics(WithTheme, Component);
}

var hasOwn = {}.hasOwnProperty;

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type
/*: React.ElementType */
, props
/*: Object */
) {

  var newProps
  /*: any */
  = {};

  for (var key in props) {
    if (hasOwn.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // Runtime labeling is an opt-in feature because:

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  (0,emotion_use_insertion_effect_with_fallbacks_browser_esm/* useInsertionEffectAlwaysWithSyncFallback */.s)(function () {
    return insertStyles(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(
/* <any, any> */
function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,emotion_serialize_esm/* serializeStyles */.J)(registeredStyles, undefined, react.useContext(ThemeContext));

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwn.call(props, key) && key !== 'css' && key !== typePropName && (!isDevelopment )) {
      newProps[key] = props[key];
    }
  }

  newProps.className = className;

  if (ref) {
    newProps.ref = ref;
  }

  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/react.createElement(WrappedComponent, newProps));
});

var Emotion$1 = Emotion;




/***/ }),

/***/ 17437:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* binding */ css),
/* harmony export */   Y: () => (/* binding */ jsx),
/* harmony export */   i7: () => (/* binding */ keyframes)
/* harmony export */ });
/* unused harmony exports ClassNames, Global, createElement */
/* harmony import */ var _emotion_element_5486c51c_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(87195);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71287);
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37448);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55655);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4146);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__);












var jsx
/*: typeof React.createElement */
= function jsx
/*: typeof React.createElement */
(type
/*: React.ElementType */
, props
/*: Object */
) {
  var args = arguments;

  if (props == null || !_emotion_element_5486c51c_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__.h.call(props, 'css')) {
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_5486c51c_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__.E;
  createElementArgArray[1] = (0,_emotion_element_5486c51c_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global
/*: React.AbstractComponent<
GlobalProps
> */
= /* #__PURE__ */(/* unused pure expression or super */ null && (withEmotionCache(function (props
/*: GlobalProps */
, cache) {

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, React.useContext(ThemeContext));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = React.useRef();
  useInsertionEffectWithLayoutFallback(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node
    /*: HTMLStyleElement | null*/
    = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
})));

/* import type { Interpolation, SerializedStyles } from '@emotion/utils' */

function css()
/*: SerializedStyles */
{
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_2__/* .serializeStyles */ .J)(args);
}

/*
type Keyframes = {|
  name: string,
  styles: string,
  anim: 1,
  toString: () => string
|} & string
*/

var keyframes = function
  /*: Keyframes */
keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

/*
type ClassNameArg =
  | string
  | boolean
  | { [key: string]: boolean }
  | Array<ClassNameArg>
  | null
  | void
*/

var classnames = function
  /*: string */
classnames(args
/*: Array<ClassNameArg> */
) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered
/*: Object */
, css
/*: (...args: Array<any>) => string */
, className
/*: string */
) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  useInsertionEffectAlwaysWithSyncFallback(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      insertStyles(cache, serializedArr[i], false);
    }
  });

  return null;
};
/*
type Props = {
  children: ({
    css: (...args: any) => string,
    cx: (...args: Array<ClassNameArg>) => string,
    theme: Object
  }) => React.Node
} */


var ClassNames
/*: React.AbstractComponent<Props>*/
= /* #__PURE__ */(/* unused pure expression or super */ null && (withEmotionCache(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && isDevelopment) {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    registerStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && isDevelopment) {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: React.useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
})));




/***/ }),

/***/ 37448:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  J: () => (/* binding */ serializeStyles)
});

;// CONCATENATED MODULE: ./node_modules/@emotion/hash/dist/emotion-hash.esm.js
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}



;// CONCATENATED MODULE: ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};



;// CONCATENATED MODULE: ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}



;// CONCATENATED MODULE: ./node_modules/@emotion/serialize/dist/emotion-serialize.esm.js




var isDevelopment = false;

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  var componentSelector = interpolation;

  if (componentSelector.__emotion_styles !== undefined) {

    return componentSelector;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        var keyframes = interpolation;

        if (keyframes.anim === 1) {
          cursor = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor
          };
          return keyframes.name;
        }

        var serializedStyles = interpolation;

        if (serializedStyles.styles !== undefined) {
          var next = serializedStyles.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = serializedStyles.styles + ";";

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  var asString = interpolation;

  if (registered == null) {
    return asString;
  }

  var cached = registered[asString];
  return cached !== undefined ? cached : asString;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value !== 'object') {
        var asString = value;

        if (registered != null && registered[asString] !== undefined) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === 'NO_COMPONENT_SELECTOR' && isDevelopment) {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;

    styles += asTemplateStringsArr[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      var templateStringsArr = strings;

      styles += templateStringsArr[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
}




/***/ }),

/***/ 71287:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useInsertionEffectAlwaysWithSyncFallback)
/* harmony export */ });
/* unused harmony export useInsertionEffectWithLayoutFallback */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);


var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))['useInsertion' + 'Effect'] ? /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;




/***/ }),

/***/ 89637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../5400c66c890e212558965de86534509f.woff2");

/***/ }),

/***/ 21599:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../4c8d1a96bf1600bc2532a542810ae27c.png");

/***/ }),

/***/ 2473:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../7b2d6d3bdeb2cd5e34f3940941e1a12b.png");

/***/ }),

/***/ 30153:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../2309c3847da071254834269e1e96fd21.png");

/***/ }),

/***/ 9680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../cf342e4d9416a47267f52670f681923f.png");

/***/ }),

/***/ 43842:
/***/ (function() {

(function (global, factory) {
   true ? factory() :
  0;
}(this, (function () { 'use strict';

  /**
   * Applies the :focus-visible polyfill at the given scope.
   * A scope in this case is either the top-level Document or a Shadow Root.
   *
   * @param {(Document|ShadowRoot)} scope
   * @see https://github.com/WICG/focus-visible
   */
  function applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;

    var inputTypesAllowlist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      'datetime-local': true
    };

    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     * @param {Element} el
     */
    function isValidFocusTarget(el) {
      if (
        el &&
        el !== document &&
        el.nodeName !== 'HTML' &&
        el.nodeName !== 'BODY' &&
        'classList' in el &&
        'contains' in el.classList
      ) {
        return true;
      }
      return false;
    }

    /**
     * Computes whether the given element should automatically trigger the
     * `focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     * @param {Element} el
     * @return {boolean}
     */
    function focusTriggersKeyboardModality(el) {
      var type = el.type;
      var tagName = el.tagName;

      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }

      if (el.isContentEditable) {
        return true;
      }

      return false;
    }

    /**
     * Add the `focus-visible` class to the given element if it was not added by
     * the author.
     * @param {Element} el
     */
    function addFocusVisibleClass(el) {
      if (el.classList.contains('focus-visible')) {
        return;
      }
      el.classList.add('focus-visible');
      el.setAttribute('data-focus-visible-added', '');
    }

    /**
     * Remove the `focus-visible` class from the given element if it was not
     * originally added by the author.
     * @param {Element} el
     */
    function removeFocusVisibleClass(el) {
      if (!el.hasAttribute('data-focus-visible-added')) {
        return;
      }
      el.classList.remove('focus-visible');
      el.removeAttribute('data-focus-visible-added');
    }

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} e
     */
    function onKeyDown(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(scope.activeElement)) {
        addFocusVisibleClass(scope.activeElement);
      }

      hadKeyboardEvent = true;
    }

    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     * @param {Event} e
     */
    function onPointerDown(e) {
      hadKeyboardEvent = false;
    }

    /**
     * On `focus`, add the `focus-visible` class to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */
    function onFocus(e) {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    }

    /**
     * On `blur`, remove the `focus-visible` class from the target.
     * @param {Event} e
     */
    function onBlur(e) {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (
        e.target.classList.contains('focus-visible') ||
        e.target.hasAttribute('data-focus-visible-added')
      ) {
        // To detect a tab/window switch, we look for a blur event followed
        // rapidly by a visibility change.
        // If we don't see a visibility change within 100ms, it's probably a
        // regular focus change.
        hadFocusVisibleRecently = true;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
          hadFocusVisibleRecently = false;
        }, 100);
        removeFocusVisibleClass(e.target);
      }
    }

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */
    function onVisibilityChange(e) {
      if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        if (hadFocusVisibleRecently) {
          hadKeyboardEvent = true;
        }
        addInitialPointerMoveListeners();
      }
    }

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    function addInitialPointerMoveListeners() {
      document.addEventListener('mousemove', onInitialPointerMove);
      document.addEventListener('mousedown', onInitialPointerMove);
      document.addEventListener('mouseup', onInitialPointerMove);
      document.addEventListener('pointermove', onInitialPointerMove);
      document.addEventListener('pointerdown', onInitialPointerMove);
      document.addEventListener('pointerup', onInitialPointerMove);
      document.addEventListener('touchmove', onInitialPointerMove);
      document.addEventListener('touchstart', onInitialPointerMove);
      document.addEventListener('touchend', onInitialPointerMove);
    }

    function removeInitialPointerMoveListeners() {
      document.removeEventListener('mousemove', onInitialPointerMove);
      document.removeEventListener('mousedown', onInitialPointerMove);
      document.removeEventListener('mouseup', onInitialPointerMove);
      document.removeEventListener('pointermove', onInitialPointerMove);
      document.removeEventListener('pointerdown', onInitialPointerMove);
      document.removeEventListener('pointerup', onInitialPointerMove);
      document.removeEventListener('touchmove', onInitialPointerMove);
      document.removeEventListener('touchstart', onInitialPointerMove);
      document.removeEventListener('touchend', onInitialPointerMove);
    }

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} e
     */
    function onInitialPointerMove(e) {
      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent = false;
      removeInitialPointerMoveListeners();
    }

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:
    scope.addEventListener('focus', onFocus, true);
    scope.addEventListener('blur', onBlur, true);

    // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.
    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
      // Since a ShadowRoot is a special kind of DocumentFragment, it does not
      // have a root element to add a class to. So, we add this attribute to the
      // host element instead:
      scope.host.setAttribute('data-js-focus-visible', '');
    } else if (scope.nodeType === Node.DOCUMENT_NODE) {
      document.documentElement.classList.add('js-focus-visible');
      document.documentElement.setAttribute('data-js-focus-visible', '');
    }
  }

  // It is important to wrap all references to global window and document in
  // these checks to support server-side rendering use cases
  // @see https://github.com/WICG/focus-visible/issues/199
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

    // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:
    var event;

    try {
      event = new CustomEvent('focus-visible-polyfill-ready');
    } catch (error) {
      // IE11 does not support using CustomEvent as a constructor directly:
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
    }

    window.dispatchEvent(event);
  }

  if (typeof document !== 'undefined') {
    // Apply the polyfill to the global document, so that no JavaScript
    // coordination is required to use the polyfill in the top-level document:
    applyFocusVisiblePolyfill(document);
  }

})));


/***/ }),

/***/ 4146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(44363);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 41811:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ memoizeOne)
/* harmony export */ });
var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}




/***/ }),

/***/ 57975:
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

/***/ 2833:
/***/ ((module) => {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ 21250:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ServerStyleSheet: () => (/* binding */ vt),
  StyleSheetConsumer: () => (/* binding */ Be),
  StyleSheetContext: () => (/* binding */ $e),
  StyleSheetManager: () => (/* binding */ Ye),
  ThemeConsumer: () => (/* binding */ tt),
  ThemeContext: () => (/* binding */ et),
  ThemeProvider: () => (/* binding */ ot),
  __PRIVATE__: () => (/* binding */ gt),
  createGlobalStyle: () => (/* binding */ ft),
  css: () => (/* binding */ lt),
  "default": () => (/* binding */ dt),
  isStyledComponent: () => (/* binding */ se),
  keyframes: () => (/* binding */ mt),
  styled: () => (/* binding */ dt),
  useTheme: () => (/* binding */ nt),
  version: () => (/* binding */ v),
  withTheme: () => (/* binding */ yt)
});

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const tslib_es6 = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/shallowequal/index.js
var shallowequal = __webpack_require__(2833);
var shallowequal_default = /*#__PURE__*/__webpack_require__.n(shallowequal);
;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Enum.js
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var Enum_RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'
var LAYER = '@layer'
var SCOPE = '@scope'

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Utility.js
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var Utility_from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var Utility_assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return Utility_charat(value, 0) ^ 45 ? (((((((length << 2) ^ Utility_charat(value, 0)) << 2) ^ Utility_charat(value, 1)) << 2) ^ Utility_charat(value, 2)) << 2) ^ Utility_charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @param {number} position
 * @return {number}
 */
function indexof (value, search, position) {
	return value.indexOf(search, position)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function Utility_charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function Utility_substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function Utility_strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function Utility_sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function Utility_append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function Utility_combine (array, callback) {
	return array.map(callback).join('')
}

/**
 * @param {string[]} array
 * @param {RegExp} pattern
 * @return {string[]}
 */
function filter (array, pattern) {
	return array.filter(function (value) { return !match(value, pattern) })
}

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Tokenizer.js


var line = 1
var column = 1
var Tokenizer_length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {object[]} siblings
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length, siblings) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: '', siblings: siblings}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return Utility_assign(node('', null, null, '', null, null, 0, root.siblings), root, {length: -root.length}, props)
}

/**
 * @param {object} root
 */
function lift (root) {
	while (root.root)
		root = copy(root.root, {children: [root]})

	Utility_append(root, root.siblings)
}

/**
 * @return {number}
 */
function Tokenizer_char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? Utility_charat(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < Tokenizer_length ? Utility_charat(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return Utility_charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return Utility_substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, Tokenizer_length = Utility_strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function Tokenizer_tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: append(identifier(position - 1), children)
				break
			case 2: append(delimit(character), children)
				break
			default: append(from(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + Utility_from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Serializer.js



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''

	for (var i = 0; i < children.length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case Enum_RULESET: if (!Utility_strlen(element.value = element.props.join(','))) return ''
	}

	return Utility_strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Prefixer.js



/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return WEBKIT + value + value
		// tab-size
		case 4789:
			return MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return WEBKIT + value + MOZ + value + MS + value + value
		// writing-mode
		case 5936:
			switch (Utility_charat(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return WEBKIT + value + MS + value + value
		// order
		case 6165:
			return WEBKIT + value + MS + 'flex-' + value + value
		// align-items
		case 5187:
			return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/g, '') + (!match(value, /flex-|baseline/) ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
		// cursor
		case 6187:
			return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value
		// justify-self
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + 'grid-column-align' + Utility_substr(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return MS + replace(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, match(element.props, /grid-\w+-end/) })) {
				return ~indexof(value + (children = children[length].value), 'span', 0) ? value : (MS + replace(value, '-start', '') + value + MS + 'grid-row-span:' + (~indexof(children, 'span', 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ';')
			}
			return MS + replace(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return match(element.props, /grid-\w+-start/) })) ? value : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if (Utility_strlen(value) - 1 - length > 6)
				switch (Utility_charat(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if (Utility_charat(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (Utility_charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~indexof(value, 'stretch', 0) ? prefix(replace(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (MS + a + ':' + b + f) + (c ? (MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if (Utility_charat(value, length + 6) === 121)
				return replace(value, ':', ':' + WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch (Utility_charat(value, Utility_charat(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + WEBKIT + (Utility_charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return replace(value, ':', ':' + MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return replace(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Middleware.js






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = Utility_sizeof(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case DECLARATION: element.return = prefix(element.value, element.length, children)
					return
				case KEYFRAMES:
					return serialize([copy(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
				case Enum_RULESET:
					if (element.length)
						return Utility_combine(children = element.props, function (value) {
							switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									lift(copy(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]}))
									lift(copy(element, {props: [value]}))
									Utility_assign(element, {props: filter(children, callback)})
									break
								// :placeholder
								case '::placeholder':
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}))
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}))
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]}))
									lift(copy(element, {props: [value]}))
									Utility_assign(element, {props: filter(children, callback)})
									break
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case RULESET:
			element.props = element.props.map(function (value) {
				return combine(tokenize(value), function (value, index, children) {
					switch (charat(value, 0)) {
						// \f
						case 12:
							return substr(value, 1, strlen(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + substr(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return sizeof(children) > 1 ? '' : value
								case index = sizeof(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/stylis/src/Parser.js




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && Utility_charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f', abs(index ? points[index - 1] : 0)) != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous)
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7)
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						Utility_append(comment(commenter(next(), caret()), root, parent, declarations), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = Utility_strlen(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '')
						if (property > 0 && (Utility_strlen(characters) - length))
							Utility_append(property > 32 ? declaration(characters + ';', rule, parent, length - 1, declarations) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2, declarations), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						Utility_append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule === 99 && Utility_charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && Utility_append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + Utility_strlen(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += Utility_from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = (Utility_strlen(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next())

						atrule = peek(), offset = length = Utility_strlen(type = characters += identifier(caret())), character++
						break
					// -
					case 45:
						if (previous === 45 && Utility_strlen(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = Utility_sizeof(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = Utility_substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z

	return node(value, root, parent, offset === 0 ? Enum_RULESET : type, props, children, length, siblings)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @param {object[]} siblings
 * @return {object}
 */
function comment (value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, Utility_from(Tokenizer_char()), Utility_substr(value, 2, -2), 0, siblings)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function declaration (value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, Utility_substr(value, 0, length), Utility_substr(value, length + 1, -1), length, siblings)
}

;// CONCATENATED MODULE: ./node_modules/styled-components/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};



;// CONCATENATED MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var f="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",m="active",y="data-styled-version",v="6.1.13",g="/*!sc*/\n",S="undefined"!=typeof window&&"HTMLElement"in window,w=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!=="production"),b={},E=/invalid hook call/i,N=new Set,P=function(t,n){if(false){ var a, o, s, i; }},_=Object.freeze([]),C=Object.freeze({});function I(e,t,n){return void 0===n&&(n=C),e.theme!==n.theme&&e.theme||t||n.theme}var A=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),O=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,D=/(^-|-$)/g;function R(e){return e.replace(O,"-").replace(D,"")}var T=/(a)(d)/gi,k=52,j=function(e){return String.fromCharCode(e+(e>25?39:97))};function x(e){var t,n="";for(t=Math.abs(e);t>k;t=t/k|0)n=j(t%k)+n;return(j(t%k)+n).replace(T,"$1-$2")}var V,F=5381,M=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},z=function(e){return M(F,e)};function $(e){return x(z(e)>>>0)}function B(e){return false||e.displayName||e.name||"Component"}function L(e){return"string"==typeof e&&( true||0)}var G="function"==typeof Symbol&&Symbol.for,Y=G?Symbol.for("react.memo"):60115,W=G?Symbol.for("react.forward_ref"):60112,q={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},H={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},U={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},J=((V={})[W]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},V[Y]=U,V);function X(e){return("type"in(t=e)&&t.type.$$typeof)===Y?U:"$$typeof"in e?J[e.$$typeof]:q;var t}var Z=Object.defineProperty,K=Object.getOwnPropertyNames,Q=Object.getOwnPropertySymbols,ee=Object.getOwnPropertyDescriptor,te=Object.getPrototypeOf,ne=Object.prototype;function oe(e,t,n){if("string"!=typeof t){if(ne){var o=te(t);o&&o!==ne&&oe(e,o,n)}var r=K(t);Q&&(r=r.concat(Q(t)));for(var s=X(e),i=X(t),a=0;a<r.length;++a){var c=r[a];if(!(c in H||n&&n[c]||i&&c in i||s&&c in s)){var l=ee(t,c);try{Z(e,c,l)}catch(e){}}}}return e}function re(e){return"function"==typeof e}function se(e){return"object"==typeof e&&"styledComponentId"in e}function ie(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ae(e,t){if(0===e.length)return"";for(var n=e[0],o=1;o<e.length;o++)n+=t?t+e[o]:e[o];return n}function ce(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function le(e,t,n){if(void 0===n&&(n=!1),!n&&!ce(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=le(e[o],t[o]);else if(ce(t))for(var o in t)e[o]=le(e[o],t[o]);return e}function ue(e,t){Object.defineProperty(e,"toString",{value:t})}var pe= false?0:{};function de(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n=e[0],o=[],r=1,s=e.length;r<s;r+=1)o.push(e[r]);return o.forEach(function(e){n=n.replace(/%[a-z]/,e)}),n}function he(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return true?new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(n.length>0?" Args: ".concat(n.join(", ")):"")):0}var fe=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,r=o;e>=r;)if((r<<=1)<0)throw he(16,"".concat(e));this.groupSizes=new Uint32Array(r),this.groupSizes.set(n),this.length=r;for(var s=o;s<r;s++)this.groupSizes[s]=0}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),o=n+t;this.groupSizes[e]=0;for(var r=n;r<o;r++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],o=this.indexOfGroup(e),r=o+n,s=o;s<r;s++)t+="".concat(this.tag.getRule(s)).concat(g);return t},e}(),me=(/* unused pure expression or super */ null && (1<<30)),ye=new Map,ve=new Map,ge=1,Se=function(e){if(ye.has(e))return ye.get(e);for(;ve.has(ge);)ge++;var t=ge++;if(false){}return ye.set(e,t),ve.set(t,e),t},we=function(e,t){ge=t+1,ye.set(e,t),ve.set(t,e)},be="style[".concat(f,"][").concat(y,'="').concat(v,'"]'),Ee=new RegExp("^".concat(f,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ne=function(e,t,n){for(var o,r=n.split(","),s=0,i=r.length;s<i;s++)(o=r[s])&&e.registerName(t,o)},Pe=function(e,t){for(var n,o=(null!==(n=t.textContent)&&void 0!==n?n:"").split(g),r=[],s=0,i=o.length;s<i;s++){var a=o[s].trim();if(a){var c=a.match(Ee);if(c){var l=0|parseInt(c[1],10),u=c[2];0!==l&&(we(u,l),Ne(e,u,c[3]),e.getTag().insertRules(l,r)),r.length=0}else r.push(a)}}},_e=function(e){for(var t=document.querySelectorAll(be),n=0,o=t.length;n<o;n++){var r=t[n];r&&r.getAttribute(f)!==m&&(Pe(e,r),r.parentNode&&r.parentNode.removeChild(r))}};function Ce(){return true?__webpack_require__.nc:0}var Ie=function(e){var t=document.head,n=e||t,o=document.createElement("style"),r=function(e){var t=Array.from(e.querySelectorAll("style[".concat(f,"]")));return t[t.length-1]}(n),s=void 0!==r?r.nextSibling:null;o.setAttribute(f,m),o.setAttribute(y,v);var i=Ce();return i&&o.setAttribute("nonce",i),n.insertBefore(o,s),o},Ae=function(){function e(e){this.element=Ie(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,o=t.length;n<o;n++){var r=t[n];if(r.ownerNode===e)return r}throw he(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Oe=function(){function e(e){this.element=Ie(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),De=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Re=S,Te={isServer:!S,useCSSOMInjection:!w},ke=function(){function e(e,n,o){void 0===e&&(e=C),void 0===n&&(n={});var r=this;this.options=__assign(__assign({},Te),e),this.gs=n,this.names=new Map(o),this.server=!!e.isServer,!this.server&&S&&Re&&(Re=!1,_e(this)),ue(this,function(){return function(e){for(var t=e.getTag(),n=t.length,o="",r=function(n){var r=function(e){return ve.get(e)}(n);if(void 0===r)return"continue";var s=e.names.get(r),i=t.getGroup(n);if(void 0===s||!s.size||0===i.length)return"continue";var a="".concat(f,".g").concat(n,'[id="').concat(r,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","))}),o+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat(g)},s=0;s<n;s++)r(s);return o}(r)})}return e.registerId=function(e){return Se(e)},e.prototype.rehydrate=function(){!this.server&&S&&_e(this)},e.prototype.reconstructWithOptions=function(n,o){return void 0===o&&(o=!0),new e(__assign(__assign({},this.options),n),this.gs,o&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new De(n):t?new Ae(n):new Oe(n)}(this.options),new fe(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(Se(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Se(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Se(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),je=/&/g,xe=/^\s*\/\/.*$/gm;function Ve(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Ve(e.children,t)),e})}function Fe(e){var t,n,o,r=void 0===e?C:e,s=r.options,i=void 0===s?C:s,a=r.plugins,c=void 0===a?_:a,l=function(e,o,r){return r.startsWith(n)&&r.endsWith(n)&&r.replaceAll(n,"").length>0?".".concat(t):e},u=c.slice();u.push(function(e){e.type===Enum_RULESET&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(je,n).replace(o,l))}),i.prefix&&u.push(prefixer),u.push(stringify);var p=function(e,r,s,a){void 0===r&&(r=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=r,o=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(xe,""),l=compile(s||r?"".concat(s," ").concat(r," { ").concat(c," }"):c);i.namespace&&(l=Ve(l,i.namespace));var p=[];return serialize(l,middleware(u.concat(rulesheet(function(e){return p.push(e)})))),p};return p.hash=c.length?c.reduce(function(e,t){return t.name||he(15),M(e,t.name)},F).toString():"",p}var Me=new ke,ze=Fe(),$e=react.createContext({shouldForwardProp:void 0,styleSheet:Me,stylis:ze}),Be=$e.Consumer,Le=react.createContext(void 0);function Ge(){return (0,react.useContext)($e)}function Ye(e){var t=(0,react.useState)(e.stylisPlugins),n=t[0],r=t[1],c=Ge().styleSheet,l=(0,react.useMemo)(function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,c]),u=(0,react.useMemo)(function(){return Fe({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})},[e.enableVendorPrefixes,e.namespace,n]);(0,react.useEffect)(function(){shallowequal_default()(n,e.stylisPlugins)||r(e.stylisPlugins)},[e.stylisPlugins]);var d=(0,react.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:l,stylis:u}},[e.shouldForwardProp,l,u]);return react.createElement($e.Provider,{value:d},react.createElement(Le.Provider,{value:u},e.children))}var We=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=ze);var o=n.name+t.hash;e.hasNameForId(n.id,o)||e.insertRules(n.id,o,t(n.rules,o,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,ue(this,function(){throw he(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=ze),this.name+e.hash},e}(),qe=function(e){return e>="A"&&e<="Z"};function He(e){for(var t="",n=0;n<e.length;n++){var o=e[n];if(1===n&&"-"===o&&"-"===e[0])return e;qe(o)?t+="-"+o.toLowerCase():t+=o}return t.startsWith("ms-")?"-"+t:t}var Ue=function(e){return null==e||!1===e||""===e},Je=function(t){var n,o,r=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!Ue(i)&&(Array.isArray(i)&&i.isCss||re(i)?r.push("".concat(He(s),":"),i,";"):ce(i)?r.push.apply(r,__spreadArray(__spreadArray(["".concat(s," {")],Je(i),!1),["}"],!1)):r.push("".concat(He(s),": ").concat((n=s,null==(o=i)||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||n in unitlessKeys||n.startsWith("--")?String(o).trim():"".concat(o,"px")),";")))}return r};function Xe(e,t,n,o){if(Ue(e))return[];if(se(e))return[".".concat(e.styledComponentId)];if(re(e)){if(!re(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var r=e(t);return true||0,Xe(r,t,n,o)}var s;return e instanceof We?n?(e.inject(n,o),[e.getName(o)]):[e]:ce(e)?Je(e):Array.isArray(e)?Array.prototype.concat.apply(_,e.map(function(e){return Xe(e,t,n,o)})):[e.toString()]}function Ze(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(re(n)&&!se(n))return!1}return!0}var Ke=z(v),Qe=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic= true&&(void 0===n||n.isStatic)&&Ze(e),this.componentId=t,this.baseHash=M(Ke,t),this.baseStyle=n,ke.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))o=ie(o,this.staticRulesId);else{var r=ae(Xe(this.rules,e,t,n)),s=x(M(this.baseHash,r)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(r,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i)}o=ie(o,s),this.staticRulesId=s}else{for(var a=M(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u, false&&(0);else if(u){var p=ae(Xe(u,e,t,n));a=M(a,p+l),c+=p}}if(c){var d=x(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),o=ie(o,d)}}return o},e}(),et=react.createContext(void 0),tt=et.Consumer;function nt(){var e=(0,react.useContext)(et);if(!e)throw he(18);return e}function ot(e){var n=react.useContext(et),r=(0,react.useMemo)(function(){return function(e,n){if(!e)throw he(14);if(re(e)){var o=e(n);if(false){}return o}if(Array.isArray(e)||"object"!=typeof e)throw he(8);return n?__assign(__assign({},n),e):e}(e.theme,n)},[e.theme,n]);return e.children?react.createElement(et.Provider,{value:r},e.children):null}var rt={},st=new Set;function it(e,r,s){var i=se(e),a=e,c=!L(e),p=r.attrs,d=void 0===p?_:p,h=r.componentId,f=void 0===h?function(e,t){var n="string"!=typeof e?"sc":R(e);rt[n]=(rt[n]||0)+1;var o="".concat(n,"-").concat($(v+n+rt[n]));return t?"".concat(t,"-").concat(o):o}(r.displayName,r.parentComponentId):h,m=r.displayName,y=void 0===m?function(e){return L(e)?"styled.".concat(e):"Styled(".concat(B(e),")")}(e):m,g=r.displayName&&r.componentId?"".concat(R(r.displayName),"-").concat(r.componentId):r.componentId||f,S=i&&a.attrs?a.attrs.concat(d).filter(Boolean):d,w=r.shouldForwardProp;if(i&&a.shouldForwardProp){var b=a.shouldForwardProp;if(r.shouldForwardProp){var E=r.shouldForwardProp;w=function(e,t){return b(e,t)&&E(e,t)}}else w=b}var N=new Qe(s,g,i?a.componentStyle:void 0);function O(e,r){return function(e,r,s){var i=e.attrs,a=e.componentStyle,c=e.defaultProps,p=e.foldedComponentIds,d=e.styledComponentId,h=e.target,f=react.useContext(et),m=Ge(),y=e.shouldForwardProp||m.shouldForwardProp; false&&0;var v=I(r,f,c)||C,g=function(e,n,o){for(var r,s=__assign(__assign({},n),{className:void 0,theme:o}),i=0;i<e.length;i+=1){var a=re(r=e[i])?r(s):r;for(var c in a)s[c]="className"===c?ie(s[c],a[c]):"style"===c?__assign(__assign({},s[c]),a[c]):a[c]}return n.className&&(s.className=ie(s.className,n.className)),s}(i,r,v),S=g.as||h,w={};for(var b in g)void 0===g[b]||"$"===b[0]||"as"===b||"theme"===b&&g.theme===v||("forwardedAs"===b?w.as=g.forwardedAs:y&&!y(b,S)||(w[b]=g[b],y||"development"!=="production"||0||0||0||(0)));var E=function(e,t){var n=Ge(),o=e.generateAndInjectStyles(t,n.styleSheet,n.stylis);return false&&0,o}(a,g); false&&0;var N=ie(p,d);return E&&(N+=" "+E),g.className&&(N+=" "+g.className),w[L(S)&&!A.has(S)?"class":"className"]=N,w.ref=s,(0,react.createElement)(S,w)}(D,e,r)}O.displayName=y;var D=react.forwardRef(O);return D.attrs=S,D.componentStyle=N,D.displayName=y,D.shouldForwardProp=w,D.foldedComponentIds=i?ie(a.foldedComponentIds,a.styledComponentId):"",D.styledComponentId=g,D.target=i?a.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var o=0,r=t;o<r.length;o++)le(e,r[o],!0);return e}({},a.defaultProps,e):e}}), false&&(0),ue(D,function(){return".".concat(D.styledComponentId)}),c&&oe(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function at(e,t){for(var n=[e[0]],o=0,r=t.length;o<r;o+=1)n.push(t[o],e[o+1]);return n}var ct=function(e){return Object.assign(e,{isCss:!0})};function lt(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];if(re(t)||ce(t))return ct(Xe(at(_,__spreadArray([t],n,!0))));var r=t;return 0===n.length&&1===r.length&&"string"==typeof r[0]?Xe(r):ct(Xe(at(r,n)))}function ut(n,o,r){if(void 0===r&&(r=C),!o)throw he(1,o);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(o,r,lt.apply(void 0,__spreadArray([t],s,!1)))};return s.attrs=function(e){return ut(n,o,__assign(__assign({},r),{attrs:Array.prototype.concat(r.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return ut(n,o,__assign(__assign({},r),e))},s}var pt=function(e){return ut(it,e)},dt=pt;A.forEach(function(e){dt[e]=pt(e)});var ht=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Ze(e),ke.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,o){var r=o(ae(Xe(this.rules,t,n,o)),""),s=this.componentId+e;n.insertRules(s,s,r)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,o){e>2&&ke.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,o)},e}();function ft(n){for(var r=[],s=1;s<arguments.length;s++)r[s-1]=arguments[s];var i=lt.apply(void 0,__spreadArray([n],r,!1)),a="sc-global-".concat($(JSON.stringify(i))),c=new ht(i,a); false&&0;var l=function(e){var t=Ge(),n=react.useContext(et),r=react.useRef(t.styleSheet.allocateGSInstance(a)).current;return false&&0, false&&0,t.styleSheet.server&&u(r,e,t.styleSheet,n,t.stylis),react.useLayoutEffect(function(){if(!t.styleSheet.server)return u(r,e,t.styleSheet,n,t.stylis),function(){return c.removeStyles(r,t.styleSheet)}},[r,e,t.styleSheet,n,t.stylis]),null};function u(e,n,o,r,s){if(c.isStatic)c.renderStyles(e,b,o,s);else{var i=__assign(__assign({},n),{theme:I(n,r,l.defaultProps)});c.renderStyles(e,i,o,s)}}return react.memo(l)}function mt(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o]; false&&0;var r=ae(lt.apply(void 0,__spreadArray([t],n,!1))),s=$(r);return new We(s,r)}function yt(e){var n=react.forwardRef(function(n,r){var s=I(n,react.useContext(et),e.defaultProps);return false&&0,react.createElement(e,__assign({},n,{theme:s,ref:r}))});return n.displayName="WithTheme(".concat(B(e),")"),oe(n,e)}var vt=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Ce(),o=ae([n&&'nonce="'.concat(n,'"'),"".concat(f,'="true"'),"".concat(y,'="').concat(v,'"')].filter(Boolean)," ");return"<style ".concat(o,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw he(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw he(2);var r=e.instance.toString();if(!r)return[];var s=((n={})[f]="",n[y]=v,n.dangerouslySetInnerHTML={__html:r},n),i=Ce();return i&&(s.nonce=i),[react.createElement("style",__assign({},s,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new ke({isServer:!0}),this.sealed=!1}return e.prototype.collectStyles=function(e){if(this.sealed)throw he(2);return react.createElement(Ye,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw he(3)},e}(),gt={StyleSheet:ke,mainSheet:Me}; false&&0;var St="__sc-".concat(f,"__"); false&&(0);
//# sourceMappingURL=styled-components.browser.esm.js.map


/***/ }),

/***/ 65127:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(96540));
const client_1 = __webpack_require__(5338);
const Splash_1 = __importDefault(__webpack_require__(39372));
const initRendererL10N_1 = __importDefault(__webpack_require__(6285));
const theme_1 = __webpack_require__(93165);
const BootScreen_1 = __importDefault(__webpack_require__(25023));
__webpack_require__(93130);
(async () => {
    const root = (0, client_1.createRoot)(document.getElementById("App"));
    const startTime = Date.now();
    root.render(react_1.default.createElement(BootScreen_1.default, { message: "Booting systems...", progress: 24 }));
    root.render(react_1.default.createElement(BootScreen_1.default, { message: "Loading localization data...", progress: 52 }));
    await (0, initRendererL10N_1.default)();
    root.render(react_1.default.createElement(BootScreen_1.default, { message: "Preparing themes and project manager...", progress: 78 }));
    await (0, theme_1.initTheme)();
    const minBootDurationMs = 1200;
    const elapsed = Date.now() - startTime;
    if (elapsed < minBootDurationMs) {
        await new Promise((resolve) => setTimeout(resolve, minBootDurationMs - elapsed));
    }
    root.render(react_1.default.createElement(BootScreen_1.default, { message: "Ready", progress: 100 }));
    await new Promise((resolve) => setTimeout(resolve, 180));
    root.render(react_1.default.createElement(react_1.default.StrictMode, null,
        react_1.default.createElement(Splash_1.default, null)));
})();


/***/ }),

/***/ 39372:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(96540));
const path_1 = __importDefault(__webpack_require__(57975));
const Spacing_1 = __webpack_require__(64315);
const Splash_1 = __webpack_require__(5191);
const globalStyle_1 = __importDefault(__webpack_require__(57310));
const ThemeProvider_1 = __importDefault(__webpack_require__(83620));
const FormLayout_1 = __webpack_require__(20198);
const TextField_1 = __webpack_require__(11992);
const Icons_1 = __webpack_require__(35103);
const Button_1 = __webpack_require__(46590);
const gbs2_png_1 = __importDefault(__webpack_require__(30153));
const gbhtml_png_1 = __importDefault(__webpack_require__(2473));
const blank_png_1 = __importDefault(__webpack_require__(21599));
const use_window_focus_1 = __importDefault(__webpack_require__(67510));
const l10n_1 = __importDefault(__webpack_require__(74606));
const api_1 = __importDefault(__webpack_require__(49495));
const consts_1 = __webpack_require__(73904);
const splashTabs = ["new", "recent"];
const getLastUsedPath = async () => {
    const storedPath = String(await api_1.default.settings.get("__lastUsedPath"));
    if (storedPath && storedPath !== "undefined") {
        return path_1.default.normalize(storedPath);
    }
    return api_1.default.paths.getDocumentsPath();
};
const setLastUsedPath = (path) => {
    api_1.default.settings.set("__lastUsedPath", path);
};
const getLastUsedTab = async () => {
    return String(await api_1.default.settings.get("__lastUsedSplashTab")) || "info";
};
const setLastUsedTab = (tab) => {
    api_1.default.settings.set("__lastUsedSplashTab", tab);
};
const toSplashTab = (tab) => {
    if (splashTabs.indexOf(tab) > -1) {
        return tab;
    }
    return "new";
};
const splashHeroStyle = {
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,0.24)",
    background: "linear-gradient(135deg, rgba(30,64,175,0.24) 0%, rgba(15,23,42,0.64) 56%, rgba(20,184,166,0.18) 100%)",
    padding: "14px 16px",
    marginBottom: 14,
};
const Splash = () => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [templateId, setTemplateId] = (0, react_1.useState)("gbs2");
    const [section, setSection] = (0, react_1.useState)();
    const [recentProjects, setRecentProjects] = (0, react_1.useState)([]);
    const [templatePlugins, setTemplatePlugins] = (0, react_1.useState)([]);
    const [name, setName] = (0, react_1.useState)((0, l10n_1.default)("SPLASH_DEFAULT_PROJECT_NAME"));
    const [path, setPath] = (0, react_1.useState)("");
    const [nameError, setNameError] = (0, react_1.useState)("");
    const [pathError, setPathError] = (0, react_1.useState)("");
    const [creating, setCreating] = (0, react_1.useState)(false);
    const windowFocus = (0, use_window_focus_1.default)();
    (0, react_1.useEffect)(() => {
        async function fetchData() {
            setRecentProjects((await api_1.default.project.getRecentProjects()).reverse());
            setPath(await getLastUsedPath());
            setTemplatePlugins(await api_1.default.templates.getTemplatesList());
            const urlParams = new URLSearchParams(window.location.search);
            const forceTab = urlParams.get("tab");
            const initialTab = toSplashTab(forceTab || (await getLastUsedTab()));
            setSection(initialTab);
            setLoading(false);
        }
        fetchData();
    }, []);
    (0, react_1.useEffect)(() => {
        const unsubscribe = api_1.default.events.templates.templatesListChanged.subscribe((_, templatePlugins) => setTemplatePlugins(templatePlugins));
        return unsubscribe;
    });
    const templates = (0, react_1.useMemo)(() => [
        {
            id: "gbs2",
            name: (0, l10n_1.default)("SPLASH_SAMPLE_PROJECT"),
            preview: gbs2_png_1.default,
            videoPreview: false,
            description: (0, l10n_1.default)("SPLASH_SAMPLE_PROJECT_DESCRIPTION"),
        },
        {
            id: "gbhtml",
            name: `${(0, l10n_1.default)("SPLASH_SAMPLE_PROJECT")} (GBS 1.0)`,
            preview: gbhtml_png_1.default,
            videoPreview: false,
            description: (0, l10n_1.default)("SPLASH_SAMPLE_PROJECT_ORIGINAL_DESCRIPTION"),
        },
        {
            id: "blank",
            name: (0, l10n_1.default)("SPLASH_BLANK_PROJECT"),
            preview: blank_png_1.default,
            videoPreview: false,
            description: (0, l10n_1.default)("SPLASH_BLANK_PROJECT_DESCRIPTION"),
        },
    ], []);
    const onSetTab = (tab) => () => {
        setSection(tab);
        setLastUsedTab(tab);
    };
    const onOpen = () => {
        api_1.default.project.openProjectPicker();
    };
    const onOpenRecent = (projectPath) => async () => {
        const success = await api_1.default.project.openProject(projectPath);
        if (!success) {
            setRecentProjects((await api_1.default.project.getRecentProjects()).reverse());
        }
    };
    const onChangeName = (e) => {
        const newName = e.currentTarget.value;
        setName(newName);
        setNameError("");
    };
    const onChangePath = (e) => {
        const newPath = e.currentTarget.value;
        setLastUsedPath(newPath);
        setPath(newPath);
        setPathError("");
    };
    const onSelectFolder = async () => {
        const directory = await api_1.default.dialog.chooseDirectory();
        if (directory) {
            setLastUsedPath(directory);
            setPath(directory);
            setPathError("");
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (creating) {
            return;
        }
        if (!name) {
            setNameError((0, l10n_1.default)("ERROR_PLEASE_ENTER_PROJECT_NAME"));
            return;
        }
        if (!path) {
            setPathError((0, l10n_1.default)("ERROR_PLEASE_ENTER_PROJECT_PATH"));
            return;
        }
        try {
            setCreating(true);
            const projectPath = await api_1.default.project.createProject({
                name,
                template: templateId,
                path,
            });
            api_1.default.project.openProject(projectPath);
        }
        catch (err) {
            if (err instanceof Error) {
                if (err.message.includes(consts_1.ERR_PROJECT_EXISTS)) {
                    setNameError((0, l10n_1.default)("ERROR_PROJECT_ALREADY_EXISTS"));
                    setCreating(false);
                }
                else if (err.message.includes("ENOTDIR") ||
                    err.message.includes("EEXIST") ||
                    err.message.includes("EROFS")) {
                    setPathError((0, l10n_1.default)("ERROR_PROJECT_PATH_INVALID"));
                    setCreating(false);
                }
                else {
                    setPathError(err.message);
                    setCreating(false);
                }
            }
        }
    };
    const clearRecent = () => {
        setRecentProjects([]);
        api_1.default.project.clearRecentProjects();
    };
    const removeRecent = (path) => {
        api_1.default.project.removeRecentProject(path);
        setRecentProjects(recentProjects.filter((p) => p.path !== path));
    };
    (0, react_1.useEffect)(() => {
        if (section !== undefined &&
            document.activeElement instanceof HTMLElement) {
            // Prevent documentation tab getting visible focus
            // before interaction has occured
            document.activeElement.blur();
        }
    }, [section]);
    return (react_1.default.createElement(ThemeProvider_1.default, null,
        react_1.default.createElement(globalStyle_1.default, null),
        react_1.default.createElement(Splash_1.SplashWindow, { focus: windowFocus },
            react_1.default.createElement(Splash_1.SplashSidebar, null,
                react_1.default.createElement(Splash_1.SplashLogo, null,
                    react_1.default.createElement("div", { style: {
                            width: 86,
                            height: 86,
                            borderRadius: 14,
                            border: "1px solid #4a5f79",
                            background: "linear-gradient(150deg, rgba(245,158,11,0.2) 0%, rgba(59,130,246,0.22) 100%)",
                            color: "#f8fafc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: 11,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            letterSpacing: 0.25,
                        } },
                        "ENCHANTMENT",
                        react_1.default.createElement("br", null),
                        "ENGINE")),
                react_1.default.createElement(Splash_1.SplashAppTitle, null),
                react_1.default.createElement(Splash_1.SplashTab, { selected: section === "new", onClick: onSetTab("new"), disabled: loading }, (0, l10n_1.default)("SPLASH_NEW")),
                react_1.default.createElement(Splash_1.SplashTab, { selected: section === "recent", onClick: onSetTab("recent"), disabled: loading }, (0, l10n_1.default)("SPLASH_RECENT")),
                react_1.default.createElement(Splash_1.SplashTab, { onClick: () => api_1.default.app.openExternal("https://github.com/ArkansasIo/gbstudio-test") }, (0, l10n_1.default)("SPLASH_DOCUMENTATION")),
                react_1.default.createElement(Spacing_1.FlexGrow, null),
                react_1.default.createElement(Splash_1.SplashOpenButton, { onClick: onOpen }, (0, l10n_1.default)("SPLASH_OPEN"))),
            loading && !section && (react_1.default.createElement(Splash_1.SplashContent, null,
                react_1.default.createElement(Splash_1.SplashLoading, null,
                    react_1.default.createElement("div", { style: {
                            width: 120,
                            height: 120,
                            borderRadius: 16,
                            border: "1px solid #4a5f79",
                            background: "linear-gradient(150deg, rgba(245,158,11,0.2) 0%, rgba(59,130,246,0.22) 100%)",
                            color: "#f8fafc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: 13,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            letterSpacing: 0.3,
                        } },
                        "ENCHANTMENT",
                        react_1.default.createElement("br", null),
                        "GAME ENGINE"),
                    react_1.default.createElement("div", { style: {
                            marginTop: 8,
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#e2e8f0",
                        } }, "Enchantment Game Engine"),
                    react_1.default.createElement("div", { style: { fontSize: 12, color: "#94a3b8", marginTop: 2 } }, "Loading splash resources..."),
                    react_1.default.createElement(Icons_1.LoadingIcon, null)))),
            section === "new" && (react_1.default.createElement(Splash_1.SplashContent, null,
                react_1.default.createElement(Splash_1.SplashForm, { onSubmit: onSubmit },
                    react_1.default.createElement("div", { style: splashHeroStyle },
                        react_1.default.createElement("div", { style: { fontSize: 18, fontWeight: 700 } }, "Project Manager"),
                        react_1.default.createElement("div", { style: { fontSize: 12, color: "#9fb5ce", marginTop: 4 } }, "Create a new Enchantment Game Engine project with templates and starter workflows.")),
                    react_1.default.createElement(FormLayout_1.FormRow, null,
                        react_1.default.createElement(TextField_1.TextField, { name: "name", label: (0, l10n_1.default)("SPLASH_PROJECT_NAME"), errorLabel: nameError, size: "large", value: name, onChange: onChangeName })),
                    react_1.default.createElement(FormLayout_1.FormRow, null,
                        react_1.default.createElement(TextField_1.TextField, { name: "path", label: (0, l10n_1.default)("SPLASH_PATH"), errorLabel: pathError, size: "large", value: path, onChange: onChangePath, additionalRight: react_1.default.createElement(Button_1.Button, { onClick: onSelectFolder, type: "button" },
                                react_1.default.createElement(Icons_1.DotsIcon, null)) })),
                    react_1.default.createElement(FormLayout_1.FormRow, null,
                        react_1.default.createElement(FormLayout_1.FormField, { name: "template", label: (0, l10n_1.default)("SPLASH_PROJECT_TEMPLATE") },
                            react_1.default.createElement(Splash_1.SplashTemplateSelect, { name: "template", templates: templates, templatePlugins: templatePlugins, value: templateId, onChange: setTemplateId }))),
                    react_1.default.createElement(Spacing_1.FlexGrow, null),
                    react_1.default.createElement(Splash_1.SplashCreateButton, null,
                        react_1.default.createElement(Button_1.Button, { variant: "primary", size: "large", disabled: creating }, creating ? (0, l10n_1.default)("SPLASH_CREATING") : (0, l10n_1.default)("SPLASH_CREATE")))))),
            section === "recent" && (react_1.default.createElement(Splash_1.SplashScroll, null,
                react_1.default.createElement("div", { style: splashHeroStyle },
                    react_1.default.createElement("div", { style: { fontSize: 18, fontWeight: 700 } }, "Recent Projects"),
                    react_1.default.createElement("div", { style: { fontSize: 12, color: "#9fb5ce", marginTop: 4 } }, "Resume existing projects, clean entries, or open another folder.")),
                recentProjects.map((project, index) => (react_1.default.createElement(Splash_1.SplashProject, { key: index, project: project, onClick: onOpenRecent(project.path), onRemove: () => removeRecent(project.path) }))),
                recentProjects.length > 0 ? (react_1.default.createElement(Splash_1.SplashProjectClearButton, null,
                    react_1.default.createElement(Button_1.Button, { onClick: clearRecent }, (0, l10n_1.default)("SPLASH_CLEAR_RECENT")))) : (react_1.default.createElement(Splash_1.SplashInfoMessage, null, (0, l10n_1.default)("SPLASH_NO_RECENT_PROJECTS"))))))));
};
exports["default"] = Splash;


/***/ }),

/***/ 46037:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fadeIn = exports.rotateReverse = exports.rotate = void 0;
const styled_components_1 = __webpack_require__(21250);
exports.rotate = (0, styled_components_1.keyframes) `
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
exports.rotateReverse = (0, styled_components_1.keyframes) `
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;
exports.fadeIn = (0, styled_components_1.keyframes) `
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


/***/ }),

/***/ 46590:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const react_1 = __importDefault(__webpack_require__(96540));
const style_1 = __webpack_require__(21461);
const Button = ({ id, size = "medium", variant = "normal", active, ...props }) => {
    return (react_1.default.createElement(style_1.StyledButton, { id: id, "$size": size, "$variant": variant, "$active": active, "data-is-active": active, ...props }));
};
exports.Button = Button;


/***/ }),

/***/ 21461:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyledInlineDropdownWrapper = exports.StyledDropdownArrow = exports.StyledDropdownButton = exports.StyledDropdownSubMenu = exports.StyledDropdownMenu = exports.StyledPillButton = exports.StyledZoomButton = exports.StyledZoomLabel = exports.StyledZoomInnerButton = exports.ButtonPrefixIcon = exports.StyledButton = void 0;
const styled_components_1 = __importStar(__webpack_require__(21250));
exports.StyledButton = styled_components_1.default.button `
  user-select: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.typography.fontSize};
  border-radius: ${(props) => props.theme.borderRadius}px;
  height: 28px;
  min-width: 24px;
  white-space: nowrap;
  padding: 0px 10px;
  box-sizing: border-box;
  font-weight: normal;
  border-width: 1px;
  overflow: hidden;
  flex-shrink: 0;

  svg {
    height: 17px;
    width: 17px;
    max-width: 100%;
    max-height: 100%;
    min-width: 17px;
    fill: ${(props) => props.theme.colors.button.text};
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  }

  ${(props) => (props.$size === "small" ? smallStyles : "")}
  ${(props) => (props.$size === "large" ? largeStyles : "")}
  ${(props) => (props.$variant === "normal" ? normalStyles : "")}
  ${(props) => (props.$variant === "primary" ? primaryStyles : "")}
  ${(props) => (props.$variant === "transparent" ? transparentStyles : "")}
  ${(props) => (props.$variant === "underlined" ? underlinedStyles : "")}
  ${(props) => (props.$variant === "anchor" ? anchorStyles : "")}
`;
const smallStyles = (0, styled_components_1.css) `
  font-size: 9px;
  padding: 6px;
  height: 22px;

  svg {
    height: 10px;
    width: 10px;
    max-width: 10px;
    max-height: 10px;
    margin: 0 -6px;
  }
`;
const largeStyles = (0, styled_components_1.css) `
  height: 42px;
  padding: 0px 20px;
  font-size: 15px;
  font-weight: bold;
`;
const normalStyles = (0, styled_components_1.css) `
  background: ${(props) => props.theme.colors.button.background};
  border: 1px solid ${(props) => props.theme.colors.button.border};
  color: ${(props) => props.theme.colors.button.text};

  ${(props) => props.disabled
    ? (0, styled_components_1.css) `
          opacity: 0.5;
        `
    : ""}

  &:active {
    background: ${(props) => props.theme.colors.button.activeBackground};
  }
`;
const primaryStyles = (0, styled_components_1.css) `
  background: ${(props) => props.theme.colors.highlight};
  border-color: transparent;
  color: ${(props) => props.theme.colors.highlightText};

  && > svg {
    fill: ${(props) => props.theme.colors.highlightText};
  }

  &:active {
    opacity: 0.8;
  }
  &:focus {
    box-shadow:
      0 0 0px 2px #fff,
      0 0 0px 4px ${(props) => props.theme.colors.highlight};
  }

  ${(props) => props.disabled
    ? (0, styled_components_1.css) `
          opacity: 0.5;
          &:active {
            opacity: 0.5;
          }
        `
    : ""}
`;
const transparentStyles = (0, styled_components_1.css) `
  background: transparent;
  border-color: transparent;
  color: ${(props) => props.theme.colors.button.text};

  ${(props) => !props.disabled
    ? (0, styled_components_1.css) `
          &:hover {
            background: rgba(128, 128, 128, 0.1);
          }
          &:active {
            background: rgba(128, 128, 128, 0.2);
          }
        `
    : ""}

  ${(props) => props.$active
    ? (0, styled_components_1.css) `
          background: rgba(128, 128, 128, 0.3);
          &:hover {
            background: rgba(128, 128, 128, 0.3);
          }
          &:active {
            background: rgba(128, 128, 128, 0.2);
          }
        `
    : ""}
`;
const underlinedStyles = (0, styled_components_1.css) `
  background: transparent;
  border-color: transparent;
  color: ${(props) => props.theme.colors.button.text};
  position: relative;
  overflow: visible;

  &:after {
    content: "";
    border-bottom: 2px solid ${(props) => props.theme.colors.highlight};
    width: 100%;
    position: absolute;
    bottom: -2px;
  }

  ${(props) => !props.disabled
    ? (0, styled_components_1.css) `
          &:hover {
            background: rgba(128, 128, 128, 0.1);
          }
          &:active {
            background: rgba(128, 128, 128, 0.2);
          }
        `
    : ""}

  ${(props) => props.$active
    ? (0, styled_components_1.css) `
          background: rgba(128, 128, 128, 0.3);
          &:hover {
            background: rgba(128, 128, 128, 0.3);
          }
          &:active {
            background: rgba(128, 128, 128, 0.2);
          }
        `
    : ""}
`;
const anchorStyles = (0, styled_components_1.css) `
  background: transparent;
  border-color: transparent;
  color: ${(props) => props.theme.colors.highlight};
  text-decoration: underline;
  position: relative;
  overflow: visible;
  padding: 0;
  height: auto;
  cursor: pointer;

  ${(props) => !props.disabled
    ? (0, styled_components_1.css) `
          &:active {
            background: rgba(128, 128, 128, 0.2);
          }
        `
    : ""}
`;
exports.ButtonPrefixIcon = styled_components_1.default.div `
  svg {
    height: 12px;
    width: 12px;
    max-width: 12px;
    max-height: 12px;
    margin-left: -5px;
    margin-bottom: -2px;
  }
`;
exports.StyledZoomInnerButton = styled_components_1.default.button `
  position: absolute;
  top: 5px;
  left: ${(props) => (props.$pin === "left" ? "4px" : "auto")};
  right: ${(props) => (props.$pin === "right" ? "4px" : "auto")};
  display: block;
  background: ${(props) => props.theme.colors.button.nestedBackground};
  border-radius: 20px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  padding: 0;
  border: 0;
  flex-shrink: 0;

  &:active {
    background: ${(props) => props.theme.colors.button.nestedActiveBackground};
  }

  &:after {
    content: "";
    position: absolute;
    left: -4px;
    top: -2px;
    display: block;
    width: 24px;
    height: 20px;
    opacity: 0;
  }

  & > svg {
    width: 8px;
    height: 8px;
    fill: ${(props) => props.theme.colors.button.text};
  }
`;
exports.StyledZoomLabel = styled_components_1.default.button `
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  width: 98px;
  height: 26px;
  flex-shrink: 0;
  white-space: nowrap;
  box-sizing: border-box;
  font-weight: normal;
  border-width: 1px;
  overflow: hidden;

  -webkit-app-region: no-drag;
  background: ${(props) => props.theme.colors.button.background};
  border: 1px solid ${(props) => props.theme.colors.toolbar.button.border};
  color: ${(props) => props.theme.colors.button.text};
  padding: 0px 5px;

  &:active {
    background: ${(props) => props.theme.colors.button.activeBackground};
  }

  ${(props) => (props.$size === "small" ? zoomLabelSmallStyles : "")}

  ${(props) => props.$variant === "transparent"
    ? (0, styled_components_1.css) `
          background: transparent;
          border: 0;
        `
    : ""}
`;
const zoomLabelSmallStyles = (0, styled_components_1.css) `
  font-size: 11px;
  width: 80px;
`;
exports.StyledZoomButton = styled_components_1.default.div `
  position: relative;
  width: fit-content;
`;
exports.StyledPillButton = styled_components_1.default.button `
  user-select: none;
  color: ${(props) => props.theme.colors.button.text};
  background: ${(props) => props.theme.colors.list.activeBackground};
  border: 0px;
  border-radius: 16px;
  padding: 3px 10px;
  font-size: ${(props) => props.theme.typography.fontSize};

  &:active {
    color: ${(props) => props.theme.colors.button.text};
    background: ${(props) => props.theme.colors.list.selectedBackground};
  }

  ${(props) => (props.$variant === "primary" ? pillButtonPrimaryStyles : "")}
  ${(props) => (props.$variant === "blue" ? pillButtonBlueStyles : "")}
`;
const pillButtonPrimaryStyles = (0, styled_components_1.css) `
  background: ${(props) => props.theme.colors.highlight};
  border-color: transparent;
  color: #fff;

  svg {
    fill: #fff;
  }

  &:active {
    opacity: 0.8;
    color: #fff;
    background: ${(props) => props.theme.colors.highlight};
  }
  &:focus {
    box-shadow:
      0 0 0px 2px #fff,
      0 0 0px 4px ${(props) => props.theme.colors.highlight};
  }
`;
const pillButtonBlueStyles = (0, styled_components_1.css) `
  background: #1976d2;
  border-color: transparent;
  color: #fff;

  svg {
    fill: #fff;
  }

  &:active {
    opacity: 0.8;
  }
  &:focus {
    box-shadow:
      0 0 0px 2px #fff,
      0 0 0px 4px #1976d2;
  }
`;
exports.StyledDropdownMenu = styled_components_1.default.div `
  position: absolute;
  margin-top: 2px;
  z-index: 10001;
  left: 0;

  ${(props) => props.$menuDirection === "right"
    ? (0, styled_components_1.css) `
          left: auto;
          right: 0;
        `
    : ""}
`;
exports.StyledDropdownSubMenu = styled_components_1.default.div `
  position: absolute;
  margin-top: 2px;
  z-index: 10001;
  background: blue;
  height: 10px;
  right: 0;

  ${(props) => props.$menuDirection === "right"
    ? (0, styled_components_1.css) `
          left: auto;
          right: 0;
        `
    : ""}
`;
exports.StyledDropdownButton = styled_components_1.default.div `
  position: relative;
  flex-shrink: 0;
  [aria-expanded="false"] + ${exports.StyledDropdownMenu} {
    display: none;
  }
`;
exports.StyledDropdownArrow = styled_components_1.default.div `
  margin-right: -5px;
  margin-top: -1px;
  min-width: 8px;
  &:not(:first-child) {
    padding-left: 5px;
  }
  &&&& > svg {
    height: 8px;

    ${(props) => props.$openUpwards
    ? (0, styled_components_1.css) `
            transform: rotate(180deg);
          `
    : ""}
  }
`;
exports.StyledInlineDropdownWrapper = styled_components_1.default.div `
  display: inline-flex;
  pointer-events: all;
  margin: -6px 3px;

  ${exports.StyledButton} {
    opacity: 0.5;
    padding: 1px;
    min-width: 0;
    height: 18px;

    &:hover {
      opacity: 1;
    }
  }
`;
// #endregion


/***/ }),

/***/ 97975:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
const react_1 = __importDefault(__webpack_require__(96540));
const style_1 = __webpack_require__(60732);
const Input = ({ displaySize = "medium", ...props }) => {
    return react_1.default.createElement(style_1.StyledInput, { "$displaySize": displaySize, ...props });
};
exports.Input = Input;


/***/ }),

/***/ 52897:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(96540));
const l10n_1 = __importDefault(__webpack_require__(74606));
const L10NText = ({ l10nKey, params, }) => {
    return react_1.default.createElement(react_1.default.Fragment, null, (0, l10n_1.default)(l10nKey, params));
};
exports["default"] = L10NText;


/***/ }),

/***/ 75725:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Label = void 0;
const styled_components_1 = __importDefault(__webpack_require__(21250));
exports.Label = styled_components_1.default.label `
  display: block;
  font-size: 11px;
  margin-bottom: 5px;
`;


/***/ }),

/***/ 77267:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatableSelect = exports.SelectMenu = exports.selectMenuStyleProps = exports.SingleValueWithPreview = exports.FormatFolderLabel = exports.OptionLabelWithInfo = exports.OptionLabelWithPreview = exports.Select = void 0;
const styled_components_1 = __importDefault(__webpack_require__(21250));
const react_windowed_select_1 = __importDefault(__webpack_require__(65153));
const creatable_1 = __importDefault(__webpack_require__(12689));
const react_1 = __importDefault(__webpack_require__(96540));
const setDefault_1 = __webpack_require__(69283);
const Icons_1 = __webpack_require__(35103);
const L10NText_1 = __importDefault(__webpack_require__(52897));
const menuPortalEl = document.getElementById("MenuPortal");
exports.Select = (0, styled_components_1.default)(react_windowed_select_1.default).attrs((props) => ({
    className: "CustomSelect",
    classNamePrefix: "CustomSelect",
    styles: {
        option: (base) => ({
            ...base,
            height: 26,
        }),
    },
    inputId: props.name,
    menuPlacement: "auto",
    menuPortalTarget: (0, setDefault_1.setDefault)(props.menuPortalTarget, menuPortalEl),
})) `
  position: relative;
  width: 100%;
  min-width: 78px;

  .CustomSelect__control {
    height: 28px;
    min-height: 28px;
    background: ${(props) => props.theme.colors.input.background};
    color: ${(props) => props.theme.colors.input.text};
    border: 1px solid ${(props) => props.theme.colors.input.border};
    font-size: ${(props) => props.theme.typography.fontSize};
    border-radius: ${(props) => props.theme.borderRadius}px;
  }

  .CustomSelect__control:hover {
    border: 1px solid ${(props) => props.theme.colors.input.border};
  }

  .CustomSelect__control--is-focused {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.highlight} !important;
    box-shadow: 0 0 0px 2px ${(props) => props.theme.colors.highlight} !important;
    transition: box-shadow 0.2s cubic-bezier(0.175, 0.885, 0.71, 2.65);
  }

  .CustomSelect__value-container {
    padding: 0 3px;
  }

  .CustomSelect__single-value {
    color: ${(props) => props.theme.colors.input.text};
    width: 100%;
  }

  .CustomSelect__placeholder {
    margin: 0;
    margin-left: 2px;
  }

  .CustomSelect__indicator-separator {
    display: none;
  }

  .CustomSelect__dropdown-indicator {
    padding: 0;
    width: 20px;
    display: flex;
    justify-content: center;
  }

  .CustomSelect__dropdown-indicator svg {
    width: 16px;
    height: 16px;
  }

  .CustomSelect__menu-list {
    background: ${(props) => props.theme.colors.menu.background};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.menuFontSize};
    border-radius: 4px;
  }

  .CustomSelect__option {
    padding: 5px 10px;
    background: ${(props) => props.theme.colors.menu.background};
  }

  .CustomSelect__option--is-selected {
    color: ${(props) => props.theme.colors.highlight};
  }

  .CustomSelect__option--is-focused {
    background: ${(props) => props.theme.colors.menu.hoverBackground};
  }

  .CustomSelect__option:active {
    background: ${(props) => props.theme.colors.menu.activeBackground};
  }

  &.CustomSelect--is-disabled {
    opacity: 0.5;
  }

  .CustomSelect__input {
    color: ${(props) => props.theme.colors.text};
  }

  input:focus {
    box-shadow: none !important;
  }
`;
const ValuePreview = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;

  canvas {
    max-width: 22px;
    max-height: 22px;
  }
`;
const OptionLabelWithPreviewWrapper = styled_components_1.default.div `
  display: flex;
  white-space: nowrap;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const OptionLabelPreview = styled_components_1.default.div `
  height: 1px;
  margin-right: 2px;

  svg {
    max-width: 14px;
  }
`;
const OptionLabelPreviewOffset = styled_components_1.default.div `
  transform: translate(-3px, -10px);
`;
const OptionLabelWithInfoWrapper = styled_components_1.default.div `
  display: flex;
  white-space: nowrap;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const OptionLabelInfo = styled_components_1.default.div `
  flex-grow: 1;
  text-align: right;
  opacity: 0.5;
  font-size: 0.8em;
`;
const OptionLabelWithPreview = ({ preview, info, children, }) => (react_1.default.createElement(OptionLabelWithPreviewWrapper, null,
    react_1.default.createElement(OptionLabelPreview, null,
        react_1.default.createElement(OptionLabelPreviewOffset, null,
            react_1.default.createElement(ValuePreview, null, preview))),
    children,
    react_1.default.createElement(OptionLabelInfo, null, info)));
exports.OptionLabelWithPreview = OptionLabelWithPreview;
const OptionLabelWithInfo = ({ info, children, }) => (react_1.default.createElement(OptionLabelWithInfoWrapper, null,
    children,
    react_1.default.createElement(OptionLabelInfo, null, info)));
exports.OptionLabelWithInfo = OptionLabelWithInfo;
const SingleValueWithPreviewWrapper = styled_components_1.default.div `
  position: absolute;
  top: 0;
  left: 5px;
  right: 0;
  bottom: 0;
  display: flex;
  white-space: nowrap;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SingleValuePreview = styled_components_1.default.div `
  height: 1px;
  margin-right: 2px;

  svg {
    max-width: 14px;
  }
`;
const SingleValuePreviewOffset = styled_components_1.default.div `
  transform: translate(-3px, -11px);
`;
const FormatFolderLabel = ({ label }) => {
    if (!label) {
        return null;
    }
    const filePart = label.replace(/.*[\\/]/g, "");
    const pathPart = label.slice(0, -filePart.length);
    return (react_1.default.createElement("span", null,
        pathPart.length > 0 && react_1.default.createElement("span", null, pathPart),
        filePart));
};
exports.FormatFolderLabel = FormatFolderLabel;
const SingleValueWithPreview = ({ preview, children, }) => (react_1.default.createElement(SingleValueWithPreviewWrapper, null,
    react_1.default.createElement(SingleValuePreview, null,
        react_1.default.createElement(SingleValuePreviewOffset, null,
            react_1.default.createElement(ValuePreview, null, preview))),
    children));
exports.SingleValueWithPreview = SingleValueWithPreview;
exports.selectMenuStyleProps = {
    autoFocus: true,
    menuIsOpen: true,
    placeholder: react_1.default.createElement(L10NText_1.default, { l10nKey: "TOOLBAR_SEARCH" }),
    backspaceRemovesValue: false,
    controlShouldRenderValue: false,
    isClearable: false,
    menuPortalTarget: null,
    components: { DropdownIndicator: () => react_1.default.createElement(Icons_1.SearchIcon, null) },
};
exports.SelectMenu = styled_components_1.default.div `
  background: ${(props) => props.theme.colors.menu.background};
  border-radius: ${(props) => props.theme.borderRadius}px;
  box-shadow: ${(props) => props.theme.colors.menu.boxShadow};
  margin-top: 5px;
  padding-top: 5px;

  .CustomSelect__control {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    min-width: 240px;
    margin: 5px;
    margin-top: 0;

    svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
      fill: #999;
    }
  }

  .CustomSelect__menu {
    margin: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
    position: static;
    box-shadow: none;
    background-color: transparent;
  }
`;
exports.CreatableSelect = (0, styled_components_1.default)(creatable_1.default).attrs((props) => ({
    classNamePrefix: "CustomSelect",
    styles: {
        option: (base) => ({
            ...base,
            height: 26,
        }),
    },
    inputId: props.name,
    menuPlacement: "auto",
    menuPortalTarget: (0, setDefault_1.setDefault)(props.menuPortalTarget, menuPortalEl),
})) `
  .CustomSelect__control {
    height: 28px;
    min-height: 28px;
    background: ${(props) => props.theme.colors.input.background};
    color: ${(props) => props.theme.colors.input.text};
    border: 1px solid ${(props) => props.theme.colors.input.border};
    font-size: 11px;
    border-radius: ${(props) => props.theme.borderRadius}px;
  }

  .CustomSelect__control:hover {
    border: 1px solid ${(props) => props.theme.colors.input.border};
  }

  .CustomSelect__control--is-focused {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.highlight} !important;
    box-shadow: 0 0 0px 2px ${(props) => props.theme.colors.highlight} !important;
    transition: box-shadow 0.2s cubic-bezier(0.175, 0.885, 0.71, 2.65);
  }

  .CustomSelect__value-container {
    padding: 0 3px;
  }

  .CustomSelect__single-value {
    color: ${(props) => props.theme.colors.input.text};
  }

  .CustomSelect__placeholder {
    margin: 0;
    margin-left: 2px;
  }

  .CustomSelect__indicator-separator {
    display: none;
  }

  .CustomSelect__dropdown-indicator {
    padding: 0;
    width: 20px;
    display: flex;
    justify-content: center;
  }

  .CustomSelect__dropdown-indicator svg {
    width: 16px;
    height: 16px;
  }

  .CustomSelect__menu-list {
    background: ${(props) => props.theme.colors.menu.background};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.menuFontSize};
    border-radius: 4px;
  }

  .CustomSelect__option {
    padding: 5px 10px;
    background: ${(props) => props.theme.colors.menu.background};
  }

  .CustomSelect__option--is-selected {
    color: ${(props) => props.theme.colors.highlight};
  }

  .CustomSelect__option--is-focused {
    background: ${(props) => props.theme.colors.menu.hoverBackground};
  }

  .CustomSelect__option:active {
    background: ${(props) => props.theme.colors.menu.activeBackground};
  }

  &.CustomSelect--is-disabled {
    opacity: 0.5;
  }

  input:focus {
    box-shadow: none !important;
  }
`;


/***/ }),

/***/ 11992:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextField = void 0;
const react_1 = __importDefault(__webpack_require__(96540));
const styled_components_1 = __importDefault(__webpack_require__(21250));
const FormLayout_1 = __webpack_require__(20198);
const Input_1 = __webpack_require__(97975);
const AdditionalWrapper = styled_components_1.default.div `
  position: relative;
`;
const AdditionalRight = styled_components_1.default.div `
  position: absolute;
  top: 3px;
  bottom: 3px;
  right: 3px;
  display: flex;

  && > * {
    height: 100%;
    margin-left: 5px;
  }
`;
const TextField = ({ name, label, info, placeholder, errorLabel, size, value = "", onChange, additionalRight, }) => (react_1.default.createElement(FormLayout_1.FormField, { name: name, label: errorLabel || label, info: info, variant: errorLabel ? "error" : undefined }, additionalRight ? (react_1.default.createElement(AdditionalWrapper, null,
    react_1.default.createElement(Input_1.Input, { id: name, name: name, value: value, placeholder: placeholder, displaySize: size, onChange: onChange, style: { paddingRight: 60 } }),
    react_1.default.createElement(AdditionalRight, null, additionalRight))) : (react_1.default.createElement(Input_1.Input, { id: name, name: name, value: value, placeholder: placeholder, displaySize: size, onChange: onChange }))));
exports.TextField = TextField;


/***/ }),

/***/ 20198:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleableFormField = exports.FormSectionTitle = exports.FormField = exports.FormFieldInfo = exports.FormDivider = exports.FormRow = exports.FormHeader = exports.FormContainer = void 0;
const react_1 = __importStar(__webpack_require__(96540));
const Label_1 = __webpack_require__(75725);
const style_1 = __webpack_require__(90621);
const FormContainer = ({ children }) => (react_1.default.createElement(style_1.StyledFormContainer, { children: children }));
exports.FormContainer = FormContainer;
const FormHeader = ({ children, variant }) => (react_1.default.createElement(style_1.StyledFormHeader, { "$variant": variant, children: children }));
exports.FormHeader = FormHeader;
const FormRow = ({ children }) => (react_1.default.createElement(style_1.StyledFormRow, { children: children }));
exports.FormRow = FormRow;
const FormDivider = () => react_1.default.createElement(style_1.StyledFormDivider, null);
exports.FormDivider = FormDivider;
const FormFieldInfo = ({ children }) => (react_1.default.createElement(style_1.StyledFormFieldInfo, { children: children }));
exports.FormFieldInfo = FormFieldInfo;
const FormField = ({ name, label, title, info, variant, alignCheckbox, hasOverride, children, }) => (react_1.default.createElement(style_1.StyledFormField, { "$variant": variant, "$alignCheckbox": alignCheckbox, "$hasOverride": hasOverride },
    label && (react_1.default.createElement(Label_1.Label, { htmlFor: name, title: title }, label)),
    react_1.default.createElement(style_1.StyledFormFieldInput, { "$hasOverride": hasOverride }, children),
    info && react_1.default.createElement(style_1.StyledFormFieldInfo, null, info)));
exports.FormField = FormField;
const FormSectionTitle = ({ noTopBorder, noMarginBottom, children, }) => (react_1.default.createElement(style_1.StyledFormSectionTitle, { "$noTopBorder": noTopBorder, "$noMarginBottom": noMarginBottom, children: children }));
exports.FormSectionTitle = FormSectionTitle;
const ToggleableFormField = ({ enabled, disabledLabel, name, label, info, variant, hasOverride, children, }) => {
    const [isEnabled, setIsEnabled] = (0, react_1.useState)(enabled);
    if (!isEnabled) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(style_1.StyledFormLink, { onClick: () => setIsEnabled(true) }, disabledLabel)));
    }
    return (react_1.default.createElement(exports.FormField, { name: name, label: label, info: info, variant: variant, hasOverride: hasOverride }, children));
};
exports.ToggleableFormField = ToggleableFormField;


/***/ }),

/***/ 90621:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyledFormSectionTitle = exports.StyledFormLink = exports.StyledFormFieldInfo = exports.StyledFormDivider = exports.StyledFormHeader = exports.StyledFormContainer = exports.StyledFormRow = exports.StyledFormField = exports.StyledFormFieldInput = void 0;
const styled_components_1 = __importStar(__webpack_require__(21250));
exports.StyledFormFieldInput = styled_components_1.default.div `
  ${(props) => props.$hasOverride
    ? (0, styled_components_1.css) `
          border-radius: 3px;
          outline: 3px solid ${(props) => props.theme.colors.prefab.background};
        `
    : ""}
`;
exports.StyledFormField = styled_components_1.default.div `
  width: 100%;
  min-width: 0;
  ${(props) => props.$variant === "error"
    ? (0, styled_components_1.css) `
          color: ${props.theme.colors.highlight};
        `
    : ""}
  ${(props) => props.$variant === "warning"
    ? (0, styled_components_1.css) `
          label {
            background-color: #ffc107;
            color: #000;
            border-radius: 3px;
            padding: 5px;
          }
        `
    : ""}      
  ${(props) => props.$alignCheckbox
    ? (0, styled_components_1.css) `
          padding-bottom: 5px;
        `
    : ""}
      ${(props) => props.$hasOverride
    ? (0, styled_components_1.css) `
          font-weight: bold;
        `
    : ""}
`;
// #endregion FormField
// #region FormRow
exports.StyledFormRow = styled_components_1.default.div `
  display: flex;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;

  & > * {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  & > label {
    margin-bottom: 5px;
  }

  & > *:last-child {
    margin-right: 0px;
  }
`;
// #endregion FormRow
// #region FormContainer
// Could probably just remove this
exports.StyledFormContainer = styled_components_1.default.div ``;
exports.StyledFormHeader = styled_components_1.default.div `
  display: flex;
  align-items: center;
  padding: 4px 10px 4px 4px;
  border-bottom: 1px solid ${(props) => props.theme.colors.input.border};
  height: 38px;
  box-sizing: border-box;

  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0px;
  }

  ${(props) => props.$variant === "prefab"
    ? (0, styled_components_1.css) `
          background: ${(props) => props.theme.colors.prefab.background};
          color: ${(props) => props.theme.colors.prefab.text};
          input {
            color: ${(props) => props.theme.colors.prefab.text};
            &::placeholder {
              color: ${(props) => props.theme.colors.prefab.text};
              opacity: 0.5;
            }
            &:focus {
              background: ${(props) => props.theme.colors.input.background};
              color: ${(props) => props.theme.colors.input.text};
              border: 1px solid ${(props) => props.theme.colors.highlight};
            }
          }
          svg {
            fill: ${(props) => props.theme.colors.prefab.text};
          }
        `
    : ""}
`;
// #endregion FormHeader
// #region FormDivider
exports.StyledFormDivider = styled_components_1.default.div `
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebar.border};
`;
// #endregion FormDivider
// #region FormFieldInfo
exports.StyledFormFieldInfo = styled_components_1.default.div `
  opacity: 0.5;
  display: block;
  font-size: 11px;
  margin-top: 5px;
`;
// #endregion FormFieldInfo
// #region ToggleableFormField
exports.StyledFormLink = styled_components_1.default.div `
  font-size: 11px;
  text-decoration: underline;
  border-radius: 4px;
  padding: 5px;
  margin-left: -5px;
  margin-right: -5px;
  margin-top: -5px;
  margin-bottom: -5px;

  &:hover {
    background: rgba(128, 128, 128, 0.1);
  }
  &:active {
    background: rgba(128, 128, 128, 0.2);
  }
`;
exports.StyledFormSectionTitle = styled_components_1.default.div `
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: bold;
  padding: 0px 10px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.input.background};
  color: ${(props) => props.theme.colors.input.text};
  border-top: 1px solid ${(props) => props.theme.colors.input.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.input.border};

  > span {
    flex-grow: 1;
  }

  ${(props) => props.$noTopBorder
    ? (0, styled_components_1.css) `
          border-top: 0;
        `
    : ""}

  ${(props) => props.$noMarginBottom
    ? (0, styled_components_1.css) `
          margin-bottom: 0;
        `
    : ""}
`;
// #endregion FormSectionTitle


/***/ }),

/***/ 60732:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyledTextarea = exports.StyledInput = void 0;
const styled_components_1 = __importStar(__webpack_require__(21250));
exports.StyledInput = styled_components_1.default.input `
  background: ${(props) => props.theme.colors.input.background};
  color: ${(props) => props.theme.colors.input.text};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  font-size: ${(props) => props.theme.typography.fontSize};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 28px;

  &:hover {
    background: ${(props) => props.theme.colors.input.hoverBackground};
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.highlight};
    background: ${(props) => props.theme.colors.input.activeBackground};
  }

  &:disabled {
    opacity: 0.5;
  }

  &:read-only {
    background: ${(props) => props.theme.colors.input.border};
    pointer-events: none;
  }

  ${(props) => (props.$displaySize === "small" ? smallStyles : "")}
  ${(props) => (props.$displaySize === "large" ? largeStyles : "")}
`;
const smallStyles = (0, styled_components_1.css) `
  font-size: 10px;
  padding: 6px;
  height: 22px;
`;
const largeStyles = (0, styled_components_1.css) `
  padding: 20px 10px;
  font-size: 14px;
`;
exports.StyledTextarea = styled_components_1.default.textarea `
  background: ${(props) => props.theme.colors.input.background};
  color: ${(props) => props.theme.colors.input.text};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  font-size: ${(props) => props.theme.typography.fontSize};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  resize: none;

  &:hover {
    background: ${(props) => props.theme.colors.input.hoverBackground};
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.highlight};
    background: ${(props) => props.theme.colors.input.activeBackground};
  }

  ${(props) => (props.$displaySize === "small" ? textareaSmallStyles : "")}
  ${(props) => (props.$displaySize === "large" ? textareaLargeStyles : "")}
`;
const textareaSmallStyles = (0, styled_components_1.css) `
  font-size: 9px;
  padding: 6px;
`;
const textareaLargeStyles = (0, styled_components_1.css) `
  padding: 20px 10px;
  font-size: 14px;
`;
// #endregion Textarea


/***/ }),

/***/ 57310:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorybookGlobalStyles = void 0;
__webpack_require__(43842);
const styled_components_1 = __webpack_require__(21250);
const PublicPixel_woff2_1 = __importDefault(__webpack_require__(89637));
const react_1 = __importDefault(__webpack_require__(96540));
// Load font for use in Canvas elements
new FontFace("Public Pixel", `url("${PublicPixel_woff2_1.default}")`).load().then((font) => {
    document.fonts.add(font);
});
const GlobalStyle = (0, styled_components_1.createGlobalStyle) `
  :root {
    --editor-font: "Bahnschrift", "Segoe UI Variable Display", "Segoe UI",
      "Trebuchet MS", Arial, sans-serif;
  }

  @font-face {
      font-family: 'Public Pixel';
      src: url('${PublicPixel_woff2_1.default}') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--editor-font);
    font-size: 13px;
    user-select: none;
    caret-color: ${(props) => props.theme.colors.highlight};
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  input {
    font-family: var(--editor-font);
  }

  #App {
    width: 100%;
    height: 100%;
  }
  
  #MenuPortal {
    z-index: 10000;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  * {
    transition: box-shadow 0.2s cubic-bezier(0.175, 0.885, 0.710, 2.650);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0px 2px ${(props) => props.theme.colors.highlight};
    z-index: 10000;
  }

  .js-focus-visible :focus:not(.focus-visible):not(select) {
    outline: none;
    box-shadow: none !important;
  }

  div::-webkit-scrollbar-track {
    border-radius: 0px;
    background-color: transparent;
  }

  div::-webkit-scrollbar {
    width: 17px;
    height: 17px;
    background-color: transparent;
  }

  div::-webkit-scrollbar-thumb {
    border-radius: 17px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(180, 180, 180, 0.3);
    border: 4px solid transparent;
    background-clip: content-box;
  }

  div::-webkit-scrollbar-corner {
    background: ${(props) => props.theme.colors.background};
  }

  body .CustomSelect__menu {
    z-index: 100;
    min-width: 200px;
    right: 0;
  }

  body .CustomSelect__menu-list {
    background: ${(props) => props.theme.colors.menu.background};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.menuFontSize};
    border-radius: 4px;
  }

  body .CustomSelect__option {
    padding: 5px 10px;
    background: ${(props) => props.theme.colors.menu.background};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  body .CustomSelect__option--is-selected {
    color: ${(props) => props.theme.colors.highlight};
  }

  body .CustomSelect__option--is-focused {
    background: ${(props) => props.theme.colors.menu.hoverBackground};
  }

  body .CustomSelect__option:active {
    background: ${(props) => props.theme.colors.menu.activeBackground};
  }

  body .CustomSelect__input-container {
    color: ${(props) => props.theme.colors.input.text};
  }

  .label--red {
    background: #e20e2b;
  }

  .label--orange {
    background: #ff5722;
  }

  .label--yellow {
    background: #ffc107;
  }

  .label--green {
    background: #4caf50;
  }

  .label--blue {
    background: #03a9f4;
  }

  .label--purple {
    background: #9c27b0;
  }

  .label--gray {
    background: #9e9e9e;
  }

  .label--cyan {
    background: #00bcd4;
  }

  // Island Joy 16 Palette by Kerrie Lake
  // https://lospec.com/palette-list/island-joy-16

  .label--instrument-0 {
    background: #6df7c1;
  }

  .label--instrument-1 {
    background: #11adc1;
  }

  .label--instrument-2 {
    background: #606c81;
  }

  .label--instrument-3 {
    background: #393457;
  }

  .label--instrument-4 {
   background: #1e8875;
  }

  .label--instrument-5 {
   background: #5bb361;
  }

  .label--instrument-6 {
    background: #a1e55a;
  }

  .label--instrument-7 {
    background: #f7e476;
  }

  .label--instrument-8 {
    background: #f99252;
  }

  .label--instrument-9 {
    background: #cb4d68;
  }

  .label--instrument-10 {
    background: #6a3771;
  }

  .label--instrument-11 {
    background: #c92464;
  }

  .label--instrument-12 {
    background: #f48cb6;
  }

  .label--instrument-13 {
    background: #f7b69e;
  }

  .label--instrument-14 {
    background: #9b9c82;
  }

  .MentionsInput__suggestions {
    background-color: transparent !important;
    z-index: 1000 !important;
  }

  .MentionsInput__suggestions__list {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    width: max-content;
    min-width: 100px;
    user-select: none;
    box-shadow: 0 0 0 1px rgba(150, 150, 150, 0.3),
      0 4px 11px hsla(0, 0%, 0%, 0.1);
    background: ${(props) => props.theme.colors.menu.background};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.fontSize};
    font-family: var(--editor-font);
    padding: 4px 0;
  }

  .MentionsInput__suggestions__item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: ${(props) => props.theme.typography.menuFontSize};
    &:focus {
      background: ${(props) => props.theme.colors.menu.hoverBackground};
      outline: none;
      box-shadow: none;
    }
  }

  .MentionsInput__suggestions__item:hover {
    background-color: ${(props) => props.theme.colors.menu.hoverBackground};
  }

  .MentionsInput__suggestions__item--focused {
    background-color: ${(props) => props.theme.colors.menu.activeBackground};
  }
`;
const AllowScrollGlobalStyle = (0, styled_components_1.createGlobalStyle) `
  body {
    overflow: scroll;
  }
`;
const StorybookGlobalStyles = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(GlobalStyle, null),
        react_1.default.createElement(AllowScrollGlobalStyle, null)));
};
exports.StorybookGlobalStyles = StorybookGlobalStyles;
exports["default"] = GlobalStyle;


/***/ }),

/***/ 67510:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __webpack_require__(96540);
const useWindowFocus = () => {
    const [focused, setFocused] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // First render
        setFocused(document.hasFocus());
        const onFocus = () => setFocused(true);
        const onBlur = () => setFocused(false);
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, []);
    return focused;
};
exports["default"] = useWindowFocus;


/***/ }),

/***/ 35103:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResizeIcon = exports.HelpIcon = exports.PinIcon = exports.InstantiateIcon = exports.ReplaceIcon = exports.PlusIcon = exports.JigsawIcon = exports.PrevIcon = exports.NextIcon = exports.PlayStartIcon = exports.DebugIcon = exports.StopIcon = exports.PauseIcon = exports.PlayIcon = exports.ExportIcon = exports.TargetIcon = exports.CloneIcon = exports.SaveIcon = exports.SelectionIcon = exports.TrackerIcon = exports.PianoInverseIcon = exports.PianoIcon = exports.AudioOffIcon = exports.AudioOnIcon = exports.NoiseIcon = exports.WaveIcon = exports.DutyIcon = exports.SongIcon = exports.SoundIcon = exports.BackgroundIcon = exports.AnimationIcon = exports.GridIcon = exports.OnionSkinIcon = exports.SendToBackIcon = exports.SendToFrontIcon = exports.FlipVerticalIcon = exports.FlipHorizontalIcon = exports.AutoColorIcon = exports.StackIcon = exports.SquareRootIcon = exports.TileValueIcon = exports.AngleIcon = exports.FontIcon = exports.DownloadIcon = exports.CommentIcon = exports.DotsIcon = exports.FolderFilledIcon = exports.FolderIcon = exports.UpdateIcon = exports.LoadingIcon = void 0;
exports.StarIcon = exports.CaretRightIcon = exports.CaretUpIcon = exports.CaretDownIcon = exports.CheckIcon = exports.ConnectIcon = exports.ConstantIcon = exports.VariableIcon = exports.FalseIcon = exports.TrueIcon = exports.CompassIcon = exports.DiceIcon = exports.NotIcon = exports.ModuloIcon = exports.DivideIcon = exports.CrossIcon = exports.ExpressionIcon = exports.NumberIcon = exports.CodeIcon = exports.SceneIcon = exports.TriangleIcon = exports.SpriteIcon = exports.TriggerIcon = exports.ActorIcon = exports.WandIcon = exports.EraserIcon = exports.PriorityTileIcon = exports.PriorityHighIcon = exports.PriorityMediumIcon = exports.PriorityLowIcon = exports.SearchIcon = exports.ArrowJumpIcon = exports.ArrowIdleIcon = exports.ArrowMoveIcon = exports.StepIcon = exports.ArrowIcon = exports.EyeClosedIcon = exports.EyeOpenIcon = exports.SquareIconSmall = exports.SquareIcon = exports.PaintBucketIcon = exports.PaintIcon = exports.BrickIcon = exports.LockOpenIcon = exports.LockIcon = exports.PersonIcon = exports.PencilIcon = exports.SelectIcon = exports.CloseIcon = exports.MinusIcon = void 0;
exports.SadIcon = exports.WarningIcon = exports.DarkBackgroundIcon = exports.CameraIcon = exports.SettingsIcon = exports.BreakpointIcon = exports.InfoIcon = exports.SlopeIcon = exports.ArrowLeftRightIcon = exports.CursorDiagonalIcon = exports.CursorVeticalIcon = exports.CursorHorizontalIcon = exports.AsteriskIcon = exports.CopyIcon = exports.PaletteIcon = exports.ParallaxIcon = exports.Bits16Icon = exports.NavigationIcon = exports.ColumnLeftIcon = exports.ColumnRightIcon = exports.Bits8Icon = exports.BlankIcon = exports.ListIcon = exports.UploadIcon = exports.StarOutlineIcon = void 0;
const react_1 = __importDefault(__webpack_require__(96540));
const styled_components_1 = __importDefault(__webpack_require__(21250));
const animations_1 = __webpack_require__(46037);
const RotatingSVG = styled_components_1.default.svg `
  animation: ${animations_1.rotateReverse} 2s linear infinite;
`;
const LoadingIcon = () => (react_1.default.createElement(RotatingSVG, { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M23 12c0 1.042-.154 2.045-.425 3h-2.101c.335-.94.526-1.947.526-3 0-4.962-4.037-9-9-9-1.706 0-3.296.484-4.655 1.314l1.858 2.686h-6.994l2.152-7 1.849 2.673c1.684-1.049 3.659-1.673 5.79-1.673 6.074 0 11 4.925 11 11zm-6.354 7.692c-1.357.826-2.944 1.308-4.646 1.308-4.962 0-9-4.038-9-9 0-1.053.191-2.06.525-3h-2.1c-.271.955-.425 1.958-.425 3 0 6.075 4.925 11 11 11 2.127 0 4.099-.621 5.78-1.667l1.853 2.667 2.152-6.989h-6.994l1.855 2.681z" })));
exports.LoadingIcon = LoadingIcon;
const UpdateIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12ZM19 11H14V19.5H10V11H5L12 4L19 11Z" })));
exports.UpdateIcon = UpdateIcon;
const FolderIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21.604 13l-1.272 7h-16.663l-1.272-7h19.207zm-14.604-11h-6v7h2v-5h3.084c1.38 1.612 2.577 3 4.916 3h10v2h2v-4h-12c-1.629 0-2.305-1.058-4-3zm17 9h-24l2 11h20l2-11z" })));
exports.FolderIcon = FolderIcon;
const FolderFilledIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z" })));
exports.FolderFilledIcon = FolderFilledIcon;
const DotsIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" })));
exports.DotsIcon = DotsIcon;
const CommentIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21 0H24L14.5 24H11.5L21 0Z" }),
    react_1.default.createElement("path", { d: "M9.5 4.63426e-06H12.5L3 24H0L9.5 4.63426e-06Z" })));
exports.CommentIcon = CommentIcon;
const DownloadIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M14.0556641,11 L19,11 L12,19 L5,11 L10.0871094,11 L10.0871094,0 L14.0556641,0 L14.0556641,11 Z M18.213,1.754 L17,3.353 C19.984,5.085 22,8.308 22,12 C22,17.514 17.514,22 12,22 C6.486,22 2,17.514 2,12 C2,8.308 4.016,5.085 7,3.353 L5.787,1.754 C2.322,3.857 0,7.651 0,12 C0,18.627 5.373,24 12,24 C18.627,24 24,18.627 24,12 C24,7.651 21.678,3.857 18.213,1.754 Z", id: "Shape" })));
exports.DownloadIcon = DownloadIcon;
const FontIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" })));
exports.FontIcon = FontIcon;
const AngleIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "m2.019 11.993c0 5.518 4.48 9.998 9.998 9.998 5.517 0 9.997-4.48 9.997-9.998s-4.48-9.998-9.997-9.998c-5.518 0-9.998 4.48-9.998 9.998zm1.5 0c0-4.69 3.808-8.498 8.498-8.498s8.497 3.808 8.497 8.498-3.807 8.498-8.497 8.498-8.498-3.808-8.498-8.498zm4.715-1.528s1.505-1.502 3.259-3.255c.147-.146.338-.219.53-.219s.384.073.53.219c1.754 1.753 3.259 3.254 3.259 3.254.145.145.217.336.216.527 0 .191-.074.383-.22.53-.293.293-.766.294-1.057.004l-1.978-1.978v6.694c0 .413-.336.75-.75.75s-.75-.337-.75-.75v-6.694l-1.978 1.979c-.29.289-.762.286-1.055-.007-.147-.146-.22-.338-.221-.53-.001-.19.071-.38.215-.524z", fillRule: "nonzero" })));
exports.AngleIcon = AngleIcon;
const TileValueIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7ZM12.5 15.5V8.5H19.5V9.5H14.5V11.5H17.5V12.5H14.5V15.5H12.5ZM5.5 14.5V15.5H11.5V14.5H9.5V8.5H5.5V9.5H7.5V14.5H5.5Z" })));
exports.TileValueIcon = TileValueIcon;
const SquareRootIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.1578 4.50061C15.1319 4.55808 15.1039 4.63943 15.0847 4.7466L13.6438 21.1314C13.5869 21.7788 13.1195 22.316 12.4861 22.4618C11.8528 22.6076 11.1976 22.3289 10.8633 21.7716L6.65309 14.7524L6.12599 15.3512C5.57865 15.9731 4.63083 16.0335 4.00896 15.4862C3.3871 14.9388 3.32668 13.991 3.87402 13.3692L5.75748 11.2292C6.07378 10.8699 6.54261 10.6831 7.01938 10.7264C7.49615 10.7698 7.92357 11.0382 8.16982 11.4487L11.06 16.2673L12.101 4.42916C12.1038 4.39833 12.1074 4.36759 12.112 4.33699C12.2129 3.66813 12.4758 2.98661 12.9395 2.44618C13.4055 1.90317 14.1073 1.48123 14.955 1.50061H20C20.8284 1.50061 21.5 2.17218 21.5 3.00061C21.5 3.82904 20.8284 4.50061 20 4.50061H15.1578Z" })));
exports.SquareRootIcon = SquareRootIcon;
const StackIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z" })));
exports.StackIcon = StackIcon;
const AutoColorIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M15.07 12.528l-1.68-1.4c.497-2.361.502-3.016 2.035-4.448 1.938-1.811 7.512-6.525 7.512-6.525.129-.108.271-.155.409-.155.342 0 .654.294.654.647 0 .104-.027.214-.088.322 0 0-3.418 6.509-4.846 8.748-1.127 1.771-1.769 1.896-3.996 2.811zm-1.043 1.301l-1.839-1.535c-4.084.043-2.717 4.559-6.696 4.559l-.49-.021c1.048 1.459 2.706 2.168 4.318 2.168 2.551 0 4.988-1.778 4.707-5.171zm3.973-.39v8.561h-16v-12h9.582c.154-.754.296-1.396.517-2h-12.099v16h20v-12.176c-.641.772-1.272 1.24-2 1.615z" })));
exports.AutoColorIcon = AutoColorIcon;
const FlipHorizontalIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("g", { transform: "translate(12.000000, 12.000000) rotate(270.000000) translate(-12.000000, -12.000000) translate(1.000000, 1.000000)", fillRule: "nonzero" },
        react_1.default.createElement("path", { d: "M2.2,2.22222222 L12.87,7.77777778 L2.2,7.77777778 L2.2,2.22222222 M2.2,0 C0.99,0 0,0.888888889 0,2.22222222 L0,10 L22,10 L3.08,0.222222222 C2.75,0.111111111 2.53,0 2.2,0 L2.2,0 Z" }),
        react_1.default.createElement("path", { d: "M0,12 L0,19.7882151 C0,21.4571184 1.65,22.4584603 3.08,21.790899 L22,12 L0,12 Z" }))));
exports.FlipHorizontalIcon = FlipHorizontalIcon;
const FlipVerticalIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("g", { transform: "translate(1.000000, 1.000000)", fillRule: "nonzero" },
        react_1.default.createElement("path", { d: "M2.2,2.22222222 L12.87,7.77777778 L2.2,7.77777778 L2.2,2.22222222 M2.2,0 C0.99,0 0,0.888888889 0,2.22222222 L0,10 L22,10 L3.08,0.222222222 C2.75,0.111111111 2.53,0 2.2,0 L2.2,0 Z" }),
        react_1.default.createElement("path", { d: "M0,12 L0,19.7882151 C0,21.4571184 1.65,22.4584603 3.08,21.790899 L22,12 L0,12 Z" }))));
exports.FlipVerticalIcon = FlipVerticalIcon;
const SendToFrontIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("g", { fillRule: "evenodd" },
        react_1.default.createElement("path", { d: "M20,7 C21.1045695,7 22,7.8954305 22,9 L22,20 C22,21.1045695 21.1045695,22 20,22 L9,22 C7.8954305,22 7,21.1045695 7,20 L7,9 C7,7.8954305 7.8954305,7 9,7 L20,7 Z M20,9 L9,9 L9,20 L20,20 L20,9 Z" }),
        react_1.default.createElement("rect", { id: "Rectangle", x: "2", y: "2", width: "15", height: "15", rx: "2" }))));
exports.SendToFrontIcon = SendToFrontIcon;
const SendToBackIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("g", { fillRule: "evenodd" },
        react_1.default.createElement("path", { d: "M20,7 C21.1045695,7 22,7.8954305 22,9 L22,20 C22,21.1045695 21.1045695,22 20,22 L9,22 C7.8954305,22 7,21.1045695 7,20 L7,15 L15,15 L15,7 L20,7 Z" }),
        react_1.default.createElement("path", { d: "M15,2 C16.1045695,2 17,2.8954305 17,4 L17,15 C17,16.1045695 16.1045695,17 15,17 L4,17 C2.8954305,17 2,16.1045695 2,15 L2,4 C2,2.8954305 2.8954305,2 4,2 L15,2 Z M15,4 L4,4 L4,15 L15,15 L15,4 Z" }))));
exports.SendToBackIcon = SendToBackIcon;
const OnionSkinIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("g", { fillRule: "evenodd" },
        react_1.default.createElement("path", { d: "M14,5 C18.9705627,5 23,9.02943725 23,14 C23,18.9705627 18.9705627,23 14,23 C9.02943725,23 5,18.9705627 5,14 C5,9.02943725 9.02943725,5 14,5 Z M8,1 C10.3799145,1 12.4824309,2.18768282 13.7471757,4.00267509 L14,4 C13.1029574,4 12.2335019,4.11811414 11.4063372,4.33963865 C10.5141711,3.50880379 9.31650429,3 8,3 C5.23857625,3 3,5.23857625 3,8 C3,9.31650429 3.50880379,10.5141711 4.34049558,11.4070846 C4.139084,12.1552012 4.02328838,12.9387284 4.00316272,13.7460077 C2.18768282,12.4824309 1,10.3799145 1,8 C1,4.13400675 4.13400675,1 8,1 Z", fillRule: "nonzero" }))));
exports.OnionSkinIcon = OnionSkinIcon;
const GridIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("g", { fillRule: "evenodd" },
        react_1.default.createElement("path", { d: "M24,0 L24,24 L0,24 L0,0 L24,0 Z M5,19 L2,19 L2,22 L5,22 L5,19 Z M17,19 L13,19 L13,22 L17,22 L17,19 Z M11,19 L7,19 L7,22 L11,22 L11,19 Z M22,19 L19,19 L19,22 L22,22 L22,19 Z M5,13 L2,13 L2,17 L5,17 L5,13 Z M11,13 L7,13 L7,17 L11,17 L11,13 Z M17,13 L13,13 L13,17 L17,17 L17,13 Z M22,13 L19,13 L19,17 L22,17 L22,13 Z M5,7 L2,7 L2,11 L5,11 L5,7 Z M17,7 L13,7 L13,11 L17,11 L17,7 Z M11,7 L7,7 L7,11 L11,11 L11,7 Z M22,7 L19,7 L19,11 L22,11 L22,7 Z M5,2 L2,2 L2,5 L5,5 L5,2 Z M11,2 L7,2 L7,5 L11,5 L11,2 Z M17,2 L13,2 L13,5 L17,5 L17,2 Z M22,2 L19,2 L19,5 L22,5 L22,2 Z", fillRule: "nonzero" }))));
exports.GridIcon = GridIcon;
const AnimationIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M0 1v22h24v-22h-24zm4 20h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm14 16h-12v-8h12v8zm0-10h-12v-8h12v8zm4 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" })));
exports.AnimationIcon = AnimationIcon;
const BackgroundIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" })));
exports.BackgroundIcon = BackgroundIcon;
const SoundIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M9 18h-7v-12h7v12zm2-12v12l11 6v-24l-11 6z" }),
    " "));
exports.SoundIcon = SoundIcon;
const SongIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 22.050781 0.0703125 L 7.050781 4.5 C 6.425781 4.695312 6 5.273438 6 5.929688 L 6 18.183594 C 5.507812 18.066406 5.003906 18.003906 4.5 18 C 2.015625 18 0 19.34375 0 21 C 0 22.65625 2.015625 24 4.5 24 C 6.984375 24 9 22.65625 9 21 L 9 10.046875 L 21 6.53125 L 21 15.183594 C 20.507812 15.066406 20.003906 15.003906 19.5 15 C 17.015625 15 15 16.34375 15 18 C 15 19.65625 17.015625 21 19.5 21 C 21.984375 21 24 19.65625 24 18 L 24 1.5 C 24 1.023438 23.773438 0.574219 23.386719 0.292969 C 23 0.0078125 22.503906 -0.0742188 22.050781 0.0703125 Z M 22.050781 0.0703125 " })));
exports.SongIcon = SongIcon;
const DutyIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 17.699219 17.8125 L 12.300781 17.8125 C 11.636719 17.8125 11.101562 17.28125 11.101562 16.625 L 11.101562 2.96875 L 6.898438 2.96875 L 6.898438 9.203125 C 6.898438 9.859375 6.363281 10.390625 5.699219 10.390625 L 0.300781 10.390625 C 0.132812 10.390625 0 10.257812 0 10.09375 L 0 8.90625 C 0 8.742188 0.132812 8.609375 0.300781 8.609375 L 5.101562 8.609375 L 5.101562 2.375 C 5.101562 1.71875 5.636719 1.1875 6.300781 1.1875 L 11.699219 1.1875 C 12.363281 1.1875 12.898438 1.71875 12.898438 2.375 L 12.898438 16.03125 L 17.101562 16.03125 L 17.101562 9.796875 C 17.101562 9.140625 17.636719 8.609375 18.300781 8.609375 L 23.699219 8.609375 C 23.867188 8.609375 24 8.742188 24 8.90625 L 24 10.09375 C 24 10.257812 23.867188 10.390625 23.699219 10.390625 L 18.898438 10.390625 L 18.898438 16.625 C 18.898438 17.28125 18.363281 17.8125 17.699219 17.8125 Z M 17.699219 17.8125" })));
exports.DutyIcon = DutyIcon;
const WaveIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 22.582031 9.6875 L 22.03125 9.523438 C 21.734375 9.433594 21.425781 9.601562 21.328125 9.902344 C 20.585938 12.238281 18.386719 16.03125 16.675781 16.03125 C 14.804688 16.03125 13.535156 12.550781 12.308594 9.1875 C 10.875 5.253906 9.390625 1.1875 6.324219 1.1875 C 3.132812 1.1875 0.636719 6.621094 0.0273438 8.5625 C -0.0195312 8.714844 -0.00390625 8.878906 0.0703125 9.019531 C 0.140625 9.164062 0.265625 9.265625 0.417969 9.3125 L 0.96875 9.476562 C 1.265625 9.566406 1.574219 9.398438 1.671875 9.097656 C 2.414062 6.761719 4.613281 2.96875 6.324219 2.96875 C 8.195312 2.96875 9.464844 6.449219 10.691406 9.8125 C 12.125 13.746094 13.609375 17.8125 16.675781 17.8125 C 19.867188 17.8125 22.363281 12.378906 22.972656 10.4375 C 23.019531 10.285156 23.003906 10.121094 22.929688 9.980469 C 22.859375 9.835938 22.734375 9.734375 22.582031 9.6875 Z M 22.582031 9.6875 " })));
exports.WaveIcon = WaveIcon;
const NoiseIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 22.5 0 L 1.5 0 C 0.671875 0 0 0.671875 0 1.5 L 0 22.5 C 0 23.328125 0.671875 24 1.5 24 L 22.5 24 C 23.328125 24 24 23.328125 24 22.5 L 24 1.5 C 24 0.671875 23.328125 0 22.5 0 Z M 21.75 21.75 L 2.25 21.75 L 2.25 2.25 L 21.75 2.25 Z M 20.25 20.25 L 20.25 16.125 L 16.125 16.125 L 16.125 20.25 Z M 20.25 12 L 20.25 7.875 L 16.125 7.875 L 16.125 12 Z M 3.75 3.75 L 3.75 7.875 L 7.875 7.875 L 7.875 3.75 Z M 16.125 3.75 L 12 3.75 L 12 7.875 L 16.125 7.875 Z M 7.875 20.25 L 12 20.25 L 12 16.125 L 7.875 16.125 Z M 12 7.875 L 7.875 7.875 L 7.875 12 L 12 12 Z M 12 16.125 L 16.125 16.125 L 16.125 12 L 12 12 Z M 7.875 12 L 3.75 12 L 3.75 16.125 L 7.875 16.125 Z M 7.875 12" })));
exports.NoiseIcon = NoiseIcon;
const AudioOnIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M9 18h-7v-12h7v12zm2-12v12l11 6v-24l-11 6z" })));
exports.AudioOnIcon = AudioOnIcon;
const AudioOffIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M22 1.269l-18.455 22.731-1.545-1.269 3.841-4.731h-1.827v-10h4.986v6.091l2.014-2.463v-3.628l5.365-2.981 4.076-5.019 1.545 1.269zm-10.986 15.926v.805l8.986 5v-16.873l-8.986 11.068z" })));
exports.AudioOffIcon = AudioOffIcon;
const PianoIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 0H22C23 0 24 1 24 2V22C24 23 23 24 22 24H0V0ZM22 2H2V4H14V6H22V2ZM22 8H14V10H2V12H14V14H22V8ZM14 18V16H22V22H2V18H14Z" })));
exports.PianoIcon = PianoIcon;
const PianoInverseIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M22 0H0V24H22C23 24 24 23 24 22V16H14V18H2V16V14V12H14V14H24V8H14V10H2V4H14V6H24V2C24 1 23 0 22 0Z" })));
exports.PianoInverseIcon = PianoInverseIcon;
const TrackerIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M22.5 0H1.5C0.671875 0 0 0.671875 0 1.5V22.5C0 23.3281 0.671875 24 1.5 24H22.5C23.3281 24 24 23.3281 24 22.5V1.5C24 0.671875 23.3281 0 22.5 0ZM21.75 21.75H2.25V2.25H21.75V21.75Z" }),
    react_1.default.createElement("circle", { r: "2", transform: "matrix(-1 0 0 1 18 17)" }),
    react_1.default.createElement("circle", { r: "2", transform: "matrix(-1 0 0 1 12 17)" }),
    react_1.default.createElement("circle", { r: "2", transform: "matrix(-1 0 0 1 6 17)" })));
exports.TrackerIcon = TrackerIcon;
const SelectionIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M11 23v-2h-4v2h4zm8-20h3v2h2v-4h-5v2zm-19 14h2v-4h-2v4zm0-6h2v-4h-2v4zm2-6v-2h3v-2h-5v4h2zm22 2h-2v4h2v-4zm0 6h-2v4h2v-4zm-2 6v2h-3v2h5v-4h-2zm-17 2h-3v-2h-2v4h5v-2zm12 2v-2h-4v2h4zm-6-20v-2h-4v2h4zm6 0v-2h-4v2h4z" })));
exports.SelectionIcon = SelectionIcon;
const SaveIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z" })));
exports.SaveIcon = SaveIcon;
const CloneIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14zm-3-8h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" })));
exports.CloneIcon = CloneIcon;
const TargetIcon = ({ className, style, }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: className, style: style },
    react_1.default.createElement("path", { d: "M24 11h-2.051c-.469-4.725-4.224-8.48-8.949-8.95v-2.05h-2v2.05c-4.725.47-8.48 4.225-8.949 8.95h-2.051v2h2.051c.469 4.725 4.224 8.48 8.949 8.95v2.05h2v-2.05c4.725-.469 8.48-4.225 8.949-8.95h2.051v-2zm-11 8.931v-3.931h-2v3.931c-3.611-.454-6.478-3.32-6.931-6.931h3.931v-2h-3.931c.453-3.611 3.32-6.477 6.931-6.931v3.931h2v-3.931c3.611.454 6.478 3.319 6.931 6.931h-3.931v2h3.931c-.453 3.611-3.32 6.477-6.931 6.931zm1-7.931c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z" })));
exports.TargetIcon = TargetIcon;
const ExportIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", fillRule: "evenodd", clipRule: "evenodd", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" })));
exports.ExportIcon = ExportIcon;
const PlayIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M3 22v-20l18 10-18 10z" })));
exports.PlayIcon = PlayIcon;
const PauseIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" })));
exports.PauseIcon = PauseIcon;
const StopIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M2 2h20v20h-20z" })));
exports.StopIcon = StopIcon;
const DebugIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M24 20.586l-2.831-2.832c.522-.79.831-1.735.831-2.754 0-2.761-2.238-5-5-5s-5 2.239-5 5 2.238 5 5 5c1.019 0 1.964-.309 2.755-.832l2.831 2.832 1.414-1.414zm-10-5.586c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm-8.105-11.827c0-.647.535-1.173 1.193-1.173.784 0 1.354.736 1.149 1.48-.077.281-.035.58.117.829.333.553.902.895 1.646.899.733-.004 1.31-.341 1.647-.898.151-.25.193-.548.116-.829-.205-.744.364-1.481 1.149-1.481.66 0 1.191.526 1.191 1.173 0 .564-.4 1.029-.932 1.146-.267.059-.498.224-.641.456-.508.848.162 1.599.777 2.354-1.008.468-2.102.705-3.307.705-1.222 0-2.309-.232-3.312-.701.623-.767 1.295-1.501.779-2.358-.141-.231-.372-.397-.64-.456-.53-.117-.932-.582-.932-1.146zm4.105 11.827c0 2.432 1.249 4.577 3.137 5.832-.854.59-1.904 1.03-3.137 1.168-2.492-.278-4.243-1.788-5.113-3.286-.177-.304-.494-.329-.751-.216l-2.133.952c-.441.196-.962.002-1.162-.433-.2-.435-.004-.947.438-1.144l2.017-.898c.436-.195.719-.611.625-1.217-.088-.571-.577-.882-1.054-.882h-1.989c-.486 0-.878-.386-.878-.863 0-.478.392-.865.878-.865h2.002c.46 0 .941-.294 1.03-.925.068-.483-.232-.902-.645-1.062l-1.86-.723c-.45-.175-.672-.676-.494-1.12.178-.444.689-.663 1.139-.487l1.913.742c.245.095.594.064.784-.365.15-.339.32-.655.501-.954 1.423.831 2.99 1.246 4.752 1.246 1.412 0 2.723-.297 3.933-.848l.04.056c-2.344 1.131-3.973 3.519-3.973 6.292z" })));
exports.DebugIcon = DebugIcon;
const PlayStartIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M2 3H6V21H2V3Z" }),
    react_1.default.createElement("path", { d: "M22 12L7 21L7 3L22 12Z" })));
exports.PlayStartIcon = PlayStartIcon;
const NextIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z" })));
exports.NextIcon = NextIcon;
const PrevIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { transform: "rotate(180 12,12)", d: "M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z" })));
exports.PrevIcon = PrevIcon;
const JigsawIcon = () => (react_1.default.createElement("svg", { width: "28", height: "24", viewBox: "0 0 28 24" },
    react_1.default.createElement("path", { d: "M3 24v-6.075c0-1.315 1-1.663 1.813-.847.399.398.73.922 1.708.922 1.087 0 2.479-1.108 2.479-3s-1.392-3-2.479-3c-.979 0-1.31.524-1.708.922-.813.816-1.813.469-1.813-.847v-6.075h6.075c1.315 0 1.663-1 .847-1.813-.398-.399-.922-.73-.922-1.708 0-1.087 1.108-2.479 3-2.479s3 1.392 3 2.479c0 .978-.524 1.309-.922 1.708-.816.813-.469 1.813.847 1.813h6.075v18h-18z" })));
exports.JigsawIcon = JigsawIcon;
const PlusIcon = ({ title }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    title && react_1.default.createElement("title", null, title),
    react_1.default.createElement("path", { d: "M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" })));
exports.PlusIcon = PlusIcon;
const ReplaceIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M19.5 2H4.5C3.39543 2 2.5 2.89543 2.5 4V7V11H0.5L5 16L9 11H7V7H15H19.5C20.6046 7 21.5 6.10457 21.5 5V4C21.5 2.89543 20.6046 2 19.5 2Z" }),
    react_1.default.createElement("path", { d: "M3.5 22H18.5C19.6046 22 20.5 21.1046 20.5 20V17V13H22.5L18 8L14 13H16V17H8H3.5C2.39543 17 1.5 17.8954 1.5 19V20C1.5 21.1046 2.39543 22 3.5 22Z" })));
exports.ReplaceIcon = ReplaceIcon;
const InstantiateIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" })));
exports.InstantiateIcon = InstantiateIcon;
const PinIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M11 17h2v5l-2 2v-7zm3.571-12c0-2.903 2.36-3.089 2.429-5h-10c.068 1.911 2.429 2.097 2.429 5 0 3.771-3.429 3.291-3.429 10h12c0-6.709-3.429-6.229-3.429-10z" })));
exports.PinIcon = PinIcon;
const HelpIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" })));
exports.HelpIcon = HelpIcon;
const ResizeIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M6.426 10.668l-3.547-3.547-2.879 2.879v-10h10l-2.879 2.879 3.547 3.547-4.242 4.242zm11.148 2.664l3.547 3.547 2.879-2.879v10h-10l2.879-2.879-3.547-3.547 4.242-4.242zm-6.906 4.242l-3.547 3.547 2.879 2.879h-10v-10l2.879 2.879 3.547-3.547 4.242 4.242zm2.664-11.148l3.547-3.547-2.879-2.879h10v10l-2.879-2.879-3.547 3.547-4.242-4.242z" })));
exports.ResizeIcon = ResizeIcon;
const MinusIcon = ({ title }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    title && react_1.default.createElement("title", null, title),
    react_1.default.createElement("path", { d: "M24 9h-24v6h24v-6z" })));
exports.MinusIcon = MinusIcon;
const CloseIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" })));
exports.CloseIcon = CloseIcon;
const SelectIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M4 0l16 12.279-6.78 1.138 4.256 8.676-3.902 1.907-4.281-8.758-5.293 4.581z" })));
exports.SelectIcon = SelectIcon;
const PencilIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" })));
exports.PencilIcon = PencilIcon;
const PersonIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z" })));
exports.PersonIcon = PersonIcon;
const LockIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z" })));
exports.LockIcon = LockIcon;
const LockOpenIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M8 10v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v1h2v-1c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-13z" })));
exports.LockOpenIcon = LockOpenIcon;
const BrickIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fillRule: "evenodd", clipRule: "evenodd" },
    react_1.default.createElement("path", { d: "M10 18v5h-10v-5h10zm10 0v5h-9v-5h9zm4-6v5h-7v-5h7zm-17 0v5h-7v-5h7zm9 0v5h-8v-5h8zm-6-6v5h-10v-5h10zm10 0v5h-9v-5h9zm-13-5v4h-7v-4h7zm8 0v4h-7v-4h7z" })));
exports.BrickIcon = BrickIcon;
const PaintIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M8.997 13.985c.01 1.104-.88 2.008-1.986 2.015-1.105.009-2.005-.88-2.011-1.984-.01-1.105.879-2.005 1.982-2.016 1.106-.007 2.009.883 2.015 1.985zm-.978-3.986c-1.104.008-2.008-.88-2.015-1.987-.009-1.103.877-2.004 1.984-2.011 1.102-.01 2.008.877 2.012 1.982.012 1.107-.88 2.006-1.981 2.016zm7.981-4.014c.004 1.102-.881 2.008-1.985 2.015-1.106.01-2.008-.879-2.015-1.983-.011-1.106.878-2.006 1.985-2.015 1.101-.006 2.005.881 2.015 1.983zm-12 15.847c4.587.38 2.944-4.492 7.188-4.537l1.838 1.534c.458 5.537-6.315 6.772-9.026 3.003zm14.065-7.115c1.427-2.239 5.846-9.748 5.846-9.748.353-.623-.429-1.273-.975-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.04 3.995-2.811zm-12.622 4.806c-2.084-1.82-3.42-4.479-3.443-7.447-.044-5.51 4.406-10.03 9.92-10.075 3.838-.021 6.479 1.905 6.496 3.447l1.663-1.456c-1.01-2.223-4.182-4.045-8.176-3.992-6.623.055-11.955 5.466-11.903 12.092.023 2.912 1.083 5.57 2.823 7.635.958.492 2.123.329 2.62-.204zm12.797-1.906c1.059 1.97-1.351 3.37-3.545 3.992-.304.912-.803 1.721-1.374 2.311 5.255-.591 9.061-4.304 6.266-7.889-.459.685-.897 1.197-1.347 1.586z" })));
exports.PaintIcon = PaintIcon;
const PaintBucketIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21.143 9.667c-.733-1.392-1.914-3.05-3.617-4.753-2.977-2.978-5.478-3.914-6.785-3.914-.414 0-.708.094-.86.246l-1.361 1.36c-1.899-.236-3.42.106-4.294.983-.876.875-1.164 2.159-.792 3.523.492 1.806 2.305 4.049 5.905 5.375.038.323.157.638.405.885.588.588 1.535.586 2.121 0s.588-1.533.002-2.119c-.588-.587-1.537-.588-2.123-.001l-.17.256c-2.031-.765-3.395-1.828-4.232-2.9l3.879-3.875c.496 2.73 6.432 8.676 9.178 9.178l-7.115 7.107c-.234.153-2.798-.316-6.156-3.675-3.393-3.393-3.175-5.271-3.027-5.498l1.859-1.856c-.439-.359-.925-1.103-1.141-1.689l-2.134 2.131c-.445.446-.685 1.064-.685 1.82 0 1.634 1.121 3.915 3.713 6.506 2.764 2.764 5.58 4.243 7.432 4.243.648 0 1.18-.195 1.547-.562l8.086-8.078c.91.874-.778 3.538-.778 4.648 0 1.104.896 1.999 2 1.999 1.105 0 2-.896 2-2 0-3.184-1.425-6.81-2.857-9.34zm-16.209-5.371c.527-.53 1.471-.791 2.656-.761l-3.209 3.206c-.236-.978-.049-1.845.553-2.445zm9.292 4.079l-.03-.029c-1.292-1.292-3.803-4.356-3.096-5.063.715-.715 3.488 1.521 5.062 3.096.862.862 2.088 2.247 2.937 3.458-1.717-1.074-3.491-1.469-4.873-1.462z" })));
exports.PaintBucketIcon = PaintBucketIcon;
const SquareIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M24 0h-24v24h24v-24z" })));
exports.SquareIcon = SquareIcon;
const SquareIconSmall = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M20 4h-16v16h16v-16z" })));
exports.SquareIconSmall = SquareIconSmall;
const EyeOpenIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z" })));
exports.EyeOpenIcon = EyeOpenIcon;
const EyeClosedIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" })));
exports.EyeClosedIcon = EyeClosedIcon;
const ArrowIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21 12l-18 12v-24z" })));
exports.ArrowIcon = ArrowIcon;
const StepIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M16 8v-4l8 8-8 8v-4h-5v-8h5zm-7 0h-2v8h2v-8zm-4.014 0h-1.986v8h1.986v-8zm-3.986 0h-1v8h1v-8z" })));
exports.StepIcon = StepIcon;
const ArrowMoveIcon = ({ style }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", style: style },
    react_1.default.createElement("path", { d: "M16 8V4L24 12L16 20V16H12V8H16ZM10 8H6V16H10V8ZM4 8H0.0139771V16H4V8Z" })));
exports.ArrowMoveIcon = ArrowMoveIcon;
const ArrowIdleIcon = ({ style }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", style: style },
    react_1.default.createElement("path", { d: "m16,8l0,-4l8,8l-8,8l0,-4l-16,0l0,-8l16,0z" })));
exports.ArrowIdleIcon = ArrowIdleIcon;
const ArrowJumpIcon = ({ style }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", style: style },
    react_1.default.createElement("path", { d: "M16 15v4l8-8.035-8-7.965v4s-13.277 2.144-16 14c5.796-6.206 16-6 16-6z" })));
exports.ArrowJumpIcon = ArrowJumpIcon;
const SearchIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" })));
exports.SearchIcon = SearchIcon;
const PriorityLowIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 10.649 6.493 C 10.569 5.692 11.199 5 12 5 C 12.801 5 13.431 5.692 13.351 6.493 L 12.55 14.503 C 12.521 14.785 12.284 15 12 15 C 11.716 15 11.479 14.785 11.45 14.502 L 10.649 6.493 Z M 12 19.25 C 11.31 19.25 10.75 18.69 10.75 18 C 10.75 17.31 11.31 16.75 12 16.75 C 12.69 16.75 13.25 17.31 13.25 18 C 13.25 18.69 12.69 19.25 12 19.25 Z" })));
exports.PriorityLowIcon = PriorityLowIcon;
const PriorityMediumIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 8.17 6.493 C 8.09 5.692 8.72 5 9.521 5 C 10.322 5 10.952 5.692 10.872 6.493 L 10.071 14.503 C 10.042 14.785 9.805 15 9.521 15 C 9.237 15 9 14.785 8.971 14.502 L 8.17 6.493 Z M 9.521 19.25 C 8.831 19.25 8.271 18.69 8.271 18 C 8.271 17.31 8.831 16.75 9.521 16.75 C 10.211 16.75 10.771 17.31 10.771 18 C 10.771 18.69 10.211 19.25 9.521 19.25 Z" }),
    react_1.default.createElement("path", { d: "M 13.128 6.493 C 13.048 5.692 13.678 5 14.479 5 C 15.28 5 15.91 5.692 15.83 6.493 L 15.029 14.503 C 15 14.785 14.763 15 14.479 15 C 14.195 15 13.958 14.785 13.929 14.502 L 13.128 6.493 Z M 14.479 19.25 C 13.789 19.25 13.229 18.69 13.229 18 C 13.229 17.31 13.789 16.75 14.479 16.75 C 15.169 16.75 15.729 17.31 15.729 18 C 15.729 18.69 15.169 19.25 14.479 19.25 Z" })));
exports.PriorityMediumIcon = PriorityMediumIcon;
const PriorityHighIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M 5.68 6.493 C 5.6 5.692 6.23 5 7.031 5 C 7.832 5 8.462 5.692 8.382 6.493 L 7.581 14.503 C 7.552 14.785 7.315 15 7.031 15 C 6.747 15 6.51 14.785 6.481 14.502 L 5.68 6.493 Z M 7.031 19.25 C 6.341 19.25 5.781 18.69 5.781 18 C 5.781 17.31 6.341 16.75 7.031 16.75 C 7.721 16.75 8.281 17.31 8.281 18 C 8.281 18.69 7.721 19.25 7.031 19.25 Z" }),
    react_1.default.createElement("path", { d: "M 10.638 6.493 C 10.558 5.692 11.188 5 11.989 5 C 12.79 5 13.42 5.692 13.34 6.493 L 12.539 14.503 C 12.51 14.785 12.273 15 11.989 15 C 11.705 15 11.468 14.785 11.439 14.502 L 10.638 6.493 Z M 11.989 19.25 C 11.299 19.25 10.739 18.69 10.739 18 C 10.739 17.31 11.299 16.75 11.989 16.75 C 12.679 16.75 13.239 17.31 13.239 18 C 13.239 18.69 12.679 19.25 11.989 19.25 Z" }),
    react_1.default.createElement("path", { d: "M 15.617 6.493 C 15.537 5.692 16.167 5 16.968 5 C 17.769 5 18.399 5.692 18.319 6.493 L 17.518 14.503 C 17.489 14.785 17.252 15 16.968 15 C 16.684 15 16.447 14.785 16.418 14.502 L 15.617 6.493 Z M 16.968 19.25 C 16.278 19.25 15.718 18.69 15.718 18 C 15.718 17.31 16.278 16.75 16.968 16.75 C 17.658 16.75 18.218 17.31 18.218 18 C 18.218 18.69 17.658 19.25 16.968 19.25 Z" })));
exports.PriorityHighIcon = PriorityHighIcon;
const PriorityTileIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 0l-12 12 12 12 12-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" })));
exports.PriorityTileIcon = PriorityTileIcon;
const EraserIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", fillRule: "evenodd", clipRule: "evenodd", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z" })));
exports.EraserIcon = EraserIcon;
const WandIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M4.908 2.081l-2.828 2.828 19.092 19.091 2.828-2.828-19.092-19.091zm2.121 6.363l-3.535-3.535 1.414-1.414 3.535 3.535-1.414 1.414zm1.731-5.845c1.232.376 2.197 1.341 2.572 2.573.377-1.232 1.342-2.197 2.573-2.573-1.231-.376-2.196-1.34-2.573-2.573-.375 1.232-1.34 2.197-2.572 2.573zm-5.348 6.954c-.498 1.635-1.777 2.914-3.412 3.413 1.635.499 2.914 1.777 3.412 3.411.499-1.634 1.778-2.913 3.412-3.411-1.634-.5-2.913-1.778-3.412-3.413zm9.553-3.165c.872.266 1.553.948 1.819 1.82.266-.872.948-1.554 1.819-1.82-.871-.266-1.553-.948-1.819-1.82-.266.871-.948 1.554-1.819 1.82zm4.426-6.388c-.303.994-1.082 1.772-2.075 2.076.995.304 1.772 1.082 2.077 2.077.303-.994 1.082-1.772 2.074-2.077-.992-.303-1.772-1.082-2.076-2.076z" })));
exports.WandIcon = WandIcon;
const ActorIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" })));
exports.ActorIcon = ActorIcon;
const TriggerIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", fillRule: "evenodd", clipRule: "evenodd", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 .001l12 12-12 12-12-12 12-12z" })));
exports.TriggerIcon = TriggerIcon;
const SpriteIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 -4 24 28", fillRule: "evenodd", clipRule: "evenodd" },
    react_1.default.createElement("path", { d: "M24 0v24h-24v-24h24zm-6.118 16.064c-2.293-.529-4.427-.993-3.394-2.945 3.146-5.942.834-9.119-2.488-9.119-3.388 0-5.643 3.299-2.488 9.119 1.064 1.963-1.15 2.427-3.394 2.945-2.048.473-2.124 1.49-2.118 3.269l.004.667h15.993l.003-.646c.007-1.792-.062-2.815-2.118-3.29z" })));
exports.SpriteIcon = SpriteIcon;
const TriangleIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M24 22h-24l12-20z" })));
exports.TriangleIcon = TriangleIcon;
const SceneIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M1.004 5.998l10.996-5.998 10.99 6.06-10.985 5.86-11.001-5.922zm11.996 7.675v10.327l10-5.362v-10.326l-10 5.361zm-2 0l-10-5.411v10.376l10 5.362v-10.327z" })));
exports.SceneIcon = SceneIcon;
const CodeIcon = () => (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M5.485 3.567l6.488-3.279c.448-.199.904-.288 1.344-.288 1.863 0 3.477 1.629 3.287 3.616l-7.881 4.496c.118-2.088-1.173-4.035-3.238-4.545zm15.857 8.996c-.928-1.137-4.549-4.567-5.762-6.045l-8.855 5.069-1.083-1.354c1.16-.757 1.431-2.619.632-3.799-1.383-2.042-4.274-1.037-4.274 1.129 0 .653.263 1.412.909 2.225.018.023 7.109 8.25 8.531 9.873.768.874 1.081 1.8 1.061 2.71 8.836-5.572 7.833-4.958 7.996-5.065.98-.643 1.503-1.747 1.503-2.827 0-.691-.214-1.372-.658-1.916zm-13.562 5.937c-2.148 1.09-2.38 3.252-1.222 4.598.545.632 1.265.902 1.943.902 1.476 0 2.821-1.337 1.567-2.877-1.3-1.599-2.288-2.623-2.288-2.623z" })));
exports.CodeIcon = CodeIcon;
const NumberIcon = () => (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z" })));
exports.NumberIcon = NumberIcon;
const ExpressionIcon = () => (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M0.445923 0H23.5541V5.65642H19.4566V4.09756H9.22323L15.8426 12L9.22323 19.9024H19.4567V18.3436H23.5543V24H0.445923L10.4974 12L0.445923 0Z" })));
exports.ExpressionIcon = ExpressionIcon;
const CrossIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" }),
    " "));
exports.CrossIcon = CrossIcon;
const DivideIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21 1H16L3 22.5H8L21 1Z" })));
exports.DivideIcon = DivideIcon;
const ModuloIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21 1H16L3 22.5H8L21 1Z" }),
    react_1.default.createElement("circle", { cx: "2", cy: "5", r: "4" }),
    react_1.default.createElement("circle", { cx: "22", cy: "19", r: "4" })));
exports.ModuloIcon = ModuloIcon;
const NotIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("rect", { x: "9", y: "0", width: "6", height: "15", rx: "4" }),
    react_1.default.createElement("circle", { cx: "12", cy: "20", r: "3" })));
exports.NotIcon = NotIcon;
const DiceIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM6.5 9.25C8.01878 9.25 9.25 8.01878 9.25 6.5C9.25 4.98122 8.01878 3.75 6.5 3.75C4.98122 3.75 3.75 4.98122 3.75 6.5C3.75 8.01878 4.98122 9.25 6.5 9.25ZM20.25 6.5C20.25 8.01878 19.0188 9.25 17.5 9.25C15.9812 9.25 14.75 8.01878 14.75 6.5C14.75 4.98122 15.9812 3.75 17.5 3.75C19.0188 3.75 20.25 4.98122 20.25 6.5ZM6.5 20.25C8.01878 20.25 9.25 19.0188 9.25 17.5C9.25 15.9812 8.01878 14.75 6.5 14.75C4.98122 14.75 3.75 15.9812 3.75 17.5C3.75 19.0188 4.98122 20.25 6.5 20.25ZM20.25 17.5C20.25 19.0188 19.0188 20.25 17.5 20.25C15.9812 20.25 14.75 19.0188 14.75 17.5C14.75 15.9812 15.9812 14.75 17.5 14.75C19.0188 14.75 20.25 15.9812 20.25 17.5ZM12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12C9.25 13.5188 10.4812 14.75 12 14.75Z" })));
exports.DiceIcon = DiceIcon;
const CompassIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M14.145 8.633l-2.145-8.633-2.148 8.636c-.572.366-1.034.877-1.358 1.477l-8.494 1.887 8.494 1.887c.324.6.786 1.111 1.358 1.477l2.148 8.636 2.157-8.64c.571-.367 1.03-.879 1.353-1.479l8.49-1.881-8.492-1.884c-.324-.603-.788-1.116-1.363-1.483zm-2.145 5.367c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm7 5l-3.43-2.186c.474-.352.893-.771 1.245-1.245l2.185 3.431zm-3.521-11.882l3.521-2.117-2.119 3.519c-.386-.542-.86-1.015-1.402-1.402zm-6.955 9.767l-3.524 2.115 2.118-3.521c.387.543.862 1.018 1.406 1.406zm-1.34-8.453l-2.184-3.431 3.431 2.184c-.474.352-.894.772-1.247 1.247z" })));
exports.CompassIcon = CompassIcon;
const TrueIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M21.5 2H2.5V7H9V22H15V7H21.5V2Z" })));
exports.TrueIcon = TrueIcon;
const FalseIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M18.5 2H6V22H12V14.5H17V10.5H12V6.5H18.5V2Z" })));
exports.FalseIcon = FalseIcon;
const VariableIcon = () => (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12.7148438,22.1757812 L12.714,20.229 L12.7800926,20.2258391 C13.6949267,20.1603492 14.530599,19.9802517 15.2871094,19.6855469 C16.2597656,19.3066406 17.0253906,18.7519531 17.5839844,18.0214844 C18.1425781,17.2910156 18.421875,16.40625 18.421875,15.3671875 L18.421875,15.34375 C18.421875,14.0625 18.0097656,13.0683594 17.1855469,12.3613281 C16.3613281,11.6542969 15.1484375,11.1210938 13.546875,10.7617188 L12.714,10.579 L12.714,6.513 L12.8085938,6.52539062 C13.0585938,6.56835938 13.2929688,6.6328125 13.5117188,6.71875 C13.9492188,6.890625 14.3046875,7.14257812 14.578125,7.47460938 C14.8515625,7.80664062 15.015625,8.21875 15.0703125,8.7109375 L15.0820312,8.734375 L18.1875,8.72265625 L18.1992188,8.7109375 C18.1601562,7.71875 17.8769531,6.85742188 17.3496094,6.12695312 C16.8222656,5.39648438 16.0996094,4.83203125 15.1816406,4.43359375 C14.5390625,4.1546875 13.8208789,3.97339844 13.0270898,3.88972656 L12.714,3.863 L12.7148438,1.890625 L11.3671875,1.890625 L11.367,3.856 L11.2021123,3.86429398 C10.3338638,3.9304591 9.54123264,4.11241319 8.82421875,4.41015625 C7.90234375,4.79296875 7.17578125,5.33984375 6.64453125,6.05078125 C6.11328125,6.76171875 5.84765625,7.609375 5.84765625,8.59375 L5.84765625,8.6171875 C5.84765625,9.875 6.25390625,10.8671875 7.06640625,11.59375 C7.87890625,12.3203125 9.05078125,12.859375 10.5820312,13.2109375 L11.367,13.384 L11.367,17.597 L11.2177136,17.5815529 C10.8854432,17.5394611 10.5876116,17.469308 10.3242188,17.3710938 C9.86328125,17.1992188 9.50195312,16.9511719 9.24023438,16.6269531 C8.97851562,16.3027344 8.80859375,15.921875 8.73046875,15.484375 L8.73046875,15.4609375 L5.6015625,15.4609375 L5.58984375,15.484375 C5.62890625,16.5078125 5.92773438,17.375 6.48632812,18.0859375 C7.04492188,18.796875 7.79882812,19.3359375 8.74804688,19.703125 C9.48632812,19.9887153 10.3014082,20.1632427 11.193287,20.2267072 L11.367,20.236 L11.3671875,22.1757812 L12.7148438,22.1757812 Z M11.367,10.268 L11.2575,10.2376563 C10.59,10.0464062 10.0875,9.82265625 9.75,9.56640625 C9.328125,9.24609375 9.1171875,8.84375 9.1171875,8.359375 L9.1171875,8.3359375 C9.1171875,7.9765625 9.2265625,7.65625 9.4453125,7.375 C9.6640625,7.09375 9.98828125,6.87109375 10.4179688,6.70703125 C10.6635045,6.61328125 10.9422034,6.54631696 11.2540657,6.50613839 L11.367,6.495 L11.367,10.268 Z M12.714,17.6 L12.714,13.69 L12.8831676,13.7330514 C13.6502131,13.9410834 14.201527,14.1713423 14.5371094,14.4238281 C14.9472656,14.7324219 15.1523438,15.15625 15.1523438,15.6953125 L15.1523438,15.71875 C15.1523438,16.109375 15.0371094,16.4492188 14.8066406,16.7382812 C14.5761719,17.0273438 14.2304688,17.2480469 13.7695312,17.4003906 C13.5061384,17.4874442 13.2032047,17.5496253 12.8607302,17.586934 L12.714,17.6 Z", fillRule: "nonzero" })));
exports.VariableIcon = VariableIcon;
const ConstantIcon = () => (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M8.01006 4.00992C7.8413 4.02005 7.48524 4.04874 7.44473 4.05549C7.42111 4.06055 7.34517 4.07236 7.27598 4.08249C6.58747 4.18374 5.90402 4.46893 5.40282 4.86719C5.23745 4.99713 4.88475 5.35151 4.73963 5.53376C4.67719 5.61307 4.61475 5.6907 4.60125 5.70589C4.58944 5.72108 4.56412 5.75483 4.54725 5.78183C4.53206 5.80714 4.5135 5.83245 4.50843 5.83752C4.48143 5.85945 4.27387 6.1784 4.12874 6.41971C3.97011 6.68466 3.69673 7.20779 3.57186 7.49129C3.53642 7.57061 3.49085 7.67355 3.4706 7.7208C3.35079 7.98743 3.07572 8.70632 3.04872 8.82444C3.04535 8.83794 3.03522 8.88688 3.0251 8.93076C2.97953 9.1282 2.9981 9.42014 3.06391 9.54839C3.13141 9.67664 3.33729 9.71715 3.69167 9.67158C3.8908 9.64458 4.03593 9.59733 4.15405 9.51633C4.25699 9.44714 4.38356 9.31551 4.45612 9.20414C4.47975 9.16701 4.50337 9.13326 4.50843 9.1282C4.5135 9.12314 4.5405 9.08601 4.5675 9.04382C4.59619 9.00163 4.62487 8.95944 4.63162 8.95101C4.63837 8.94088 4.689 8.87338 4.74131 8.79913C4.91175 8.55781 5.13451 8.29287 5.30832 8.12749C5.79602 7.65836 6.18246 7.45754 6.77816 7.36473C6.87604 7.34785 6.98404 7.3411 7.33167 7.32254C7.64218 7.30567 7.6928 7.30735 7.76368 7.33098C7.94256 7.39004 7.96787 7.49636 7.92568 8.02287C7.92062 8.08699 7.91387 8.19837 7.90881 8.26756C7.88012 8.69957 7.83793 9.25814 7.82443 9.3982C7.79068 9.74583 7.78055 9.84034 7.75862 10.0732C7.72655 10.3938 7.70124 10.6335 7.68943 10.7229C7.68436 10.76 7.67255 10.8512 7.66411 10.9254C7.65399 10.9997 7.63543 11.1482 7.62193 11.2545C7.60842 11.3608 7.58986 11.4941 7.58142 11.5498C7.57299 11.6055 7.5578 11.7084 7.54767 11.7776C7.52236 11.9497 7.48355 12.1944 7.45148 12.3767C7.4363 12.4594 7.42111 12.5471 7.41773 12.5708C7.4093 12.6146 7.34686 12.942 7.33336 13.0011C7.31986 13.0686 7.29286 13.2036 7.28611 13.2373C7.24561 13.4365 7.16967 13.7487 7.06504 14.1402C6.81866 15.07 6.39847 15.934 5.74877 16.8571C5.70658 16.9178 5.65933 16.9853 5.64245 17.009C5.62727 17.0326 5.61039 17.0545 5.60533 17.0596C5.57664 17.0883 5.2982 17.5051 5.18345 17.6924C4.92694 18.1092 4.81388 18.3894 4.71769 18.8399C4.67212 19.0542 4.67381 19.4559 4.72106 19.6921C4.82906 20.222 5.15307 20.6321 5.62895 20.8481C6.04071 21.0337 6.55372 21.0303 7.07517 20.8397C7.20004 20.7958 7.47174 20.654 7.53417 20.6034C7.79068 20.3925 7.87168 20.3199 7.94087 20.2338C7.98643 20.1781 8.02862 20.1309 8.03368 20.1309C8.04043 20.1309 8.059 20.109 8.07418 20.0803C8.09106 20.0533 8.113 20.0212 8.12481 20.0094C8.13662 19.9976 8.16868 19.9537 8.19737 19.9115C8.50788 19.4643 8.84032 18.6864 9.02932 17.9641C9.17951 17.3903 9.35333 16.4791 9.45964 15.6927C9.57777 14.8371 9.6554 14.184 9.73302 13.4061C9.7364 13.3588 9.74315 13.2947 9.74821 13.2626C9.75665 13.1901 9.76677 13.0922 9.79884 12.7395C9.81234 12.5859 9.82753 12.4223 9.83259 12.3767C9.84103 12.2889 9.86803 11.9784 9.88321 11.8029C9.88828 11.7472 9.90009 11.6139 9.90853 11.5076C9.92371 11.3287 10.0148 10.1711 10.0351 9.89602C10.0402 9.83021 10.0469 9.72896 10.052 9.66821C10.0638 9.50958 10.0756 9.3442 10.0857 9.17039C10.0908 9.08601 10.0992 8.96957 10.1026 8.90882C10.1077 8.84807 10.1195 8.681 10.1279 8.53756C10.1903 7.5588 10.1954 7.52167 10.2545 7.42886C10.2697 7.40523 10.3186 7.36979 10.3608 7.35123C10.4401 7.3141 10.4435 7.3141 11.9859 7.30904C13.4405 7.30567 13.5367 7.30567 13.6143 7.33435C13.67 7.35629 13.7088 7.38498 13.7358 7.42379C13.7747 7.47948 13.7763 7.49298 13.7662 7.66005C13.7612 7.75792 13.7527 7.86424 13.7477 7.8963C13.7443 7.92836 13.7325 8.03468 13.7223 8.13256C13.7139 8.23043 13.6987 8.38569 13.6886 8.4785C13.6481 8.86157 13.6143 9.20414 13.5958 9.40664C13.5907 9.4522 13.584 9.52814 13.5789 9.57539C13.5553 9.80996 13.5553 9.80658 13.503 10.3601C13.4523 10.8967 13.422 11.2427 13.4101 11.3979C13.4068 11.4536 13.3983 11.5414 13.3933 11.592C13.3899 11.6426 13.3815 11.7371 13.3764 11.8029C13.3713 11.8671 13.3646 11.9582 13.3595 12.0054C13.3545 12.051 13.3477 12.1472 13.3426 12.2164C13.3089 12.699 13.2988 12.8458 13.2836 13.0804C13.2751 13.2255 13.265 13.401 13.26 13.4685C13.2549 13.536 13.2465 13.6828 13.2414 13.7942C13.2363 13.9056 13.2245 14.1638 13.2144 14.368C13.1806 15.0261 13.2245 16.2749 13.3021 16.9499C13.3123 17.0326 13.3224 17.1305 13.3275 17.1642C13.3308 17.1996 13.3426 17.279 13.3528 17.3414C13.3629 17.4055 13.373 17.4747 13.3764 17.4983C13.3815 17.5507 13.4304 17.8223 13.4507 17.9118C13.638 18.764 13.8641 19.3091 14.2354 19.7934C14.2809 19.8541 14.3299 19.9149 14.345 19.9301C14.3602 19.9436 14.399 19.9874 14.4311 20.0279C14.534 20.1545 14.8192 20.3992 15.0133 20.5291C15.5752 20.9038 16.1828 21.0506 16.8949 20.9848C17.2611 20.9493 17.7049 20.8194 18.0711 20.6371C18.2736 20.5376 18.5504 20.3671 18.6584 20.2794C19.0448 19.9588 19.2861 19.7208 19.4296 19.5183C19.4498 19.4879 19.4802 19.4491 19.4971 19.4323C19.5139 19.4137 19.5274 19.3934 19.5274 19.3867C19.5274 19.3799 19.5376 19.3631 19.5494 19.3512C19.654 19.2399 19.9156 18.7505 20.0556 18.4012C20.3206 17.7363 20.5686 16.6951 20.6176 16.0369C20.6513 15.5796 20.4168 15.2843 20.0084 15.2725C19.7299 15.2641 19.5106 15.3754 19.3789 15.5948C19.3503 15.6454 19.2912 15.7754 19.249 15.8834C19.0651 16.3728 18.9267 16.6242 18.7377 16.8166C18.5942 16.9651 18.5774 16.9786 18.4559 17.0528C18.0694 17.2857 17.5851 17.3228 17.1497 17.149C17.0316 17.1018 16.8679 17.009 16.7852 16.9415C16.7059 16.8756 16.5355 16.7018 16.4899 16.6411C16.4663 16.6107 16.4342 16.5685 16.4173 16.55C16.3616 16.4824 16.2047 16.1399 16.1541 15.9711C16.0545 15.6488 15.9921 15.2573 15.9701 14.8405C15.9398 14.2498 15.9668 12.7463 16.0258 11.7945C16.0511 11.3743 16.0866 10.8461 16.0933 10.7567C16.0984 10.701 16.1051 10.6132 16.1102 10.5626C16.176 9.78465 16.2553 9.00332 16.3296 8.411C16.4494 7.44742 16.4561 7.42379 16.6333 7.34448C16.6958 7.31579 16.8038 7.3141 18.1774 7.30567C19.4785 7.29892 19.6675 7.29385 19.7637 7.26854C19.8244 7.25335 19.9443 7.22804 20.0303 7.21285C20.1181 7.19766 20.2295 7.16729 20.2801 7.14535C20.4505 7.06941 20.5754 6.91922 20.6361 6.71672C20.6598 6.63403 20.6648 6.50071 20.6699 5.71095C20.675 5.10344 20.6716 4.75243 20.6581 4.65625C20.6243 4.3913 20.4961 4.19555 20.2936 4.09936C20.0708 3.99136 20.4455 3.99811 13.9755 4.00148C10.7405 4.00317 8.05731 4.00655 8.01006 4.00992Z" })));
exports.ConstantIcon = ConstantIcon;
const ConnectIcon = ({ connected, title }) => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    title && react_1.default.createElement("title", null, title),
    react_1.default.createElement("ellipse", { ry: "10", id: "svg_1", cy: "12", cx: "12", strokeWidth: "3", stroke: "#ccc", fill: "transparent" }),
    react_1.default.createElement("circle", { cx: "12", cy: "12", r: connected ? 6 : 2 })));
exports.ConnectIcon = ConnectIcon;
const CheckIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" })));
exports.CheckIcon = CheckIcon;
const CaretDownIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" })));
exports.CaretDownIcon = CaretDownIcon;
const CaretUpIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" })));
exports.CaretUpIcon = CaretUpIcon;
const CaretRightIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" })));
exports.CaretRightIcon = CaretRightIcon;
const StarIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" })));
exports.StarIcon = StarIcon;
const StarOutlineIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" })));
exports.StarOutlineIcon = StarOutlineIcon;
const UploadIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M17 22v2h-10v-2h10zm0-4h-10v2h10v-2zm-10-7v5h10v-5h6l-11-11-11 11h6z" })));
exports.UploadIcon = UploadIcon;
const ListIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M19 11h-14v-2h14v2zm0 2h-14v2h14v-2zm0 4h-14v2h14v-2zm3-11v16h-20v-16h20zm2-6h-24v24h24v-24z" })));
exports.ListIcon = ListIcon;
const BlankIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" }));
exports.BlankIcon = BlankIcon;
const Bits8Icon = () => (react_1.default.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12.140918,13.34375 C13.0194336,13.34375 13.7951172,13.2079102 14.4679688,12.9362305 C15.1408203,12.6645508 15.6651367,12.2862305 16.040918,11.8012695 C16.4166992,11.3163086 16.6045898,10.7564453 16.6045898,10.1216797 L16.6045898,10.1064453 C16.6045898,9.62910156 16.4941406,9.19746094 16.2732422,8.81152344 C16.0523437,8.42558594 15.7489258,8.10439453 15.3629883,7.84794922 C14.9770508,7.59150391 14.5352539,7.41503906 14.0375977,7.31855469 L14.0375977,7.27285156 C14.6774414,7.11542969 15.1979492,6.81962891 15.5991211,6.38544922 C16.000293,5.95126953 16.2008789,5.43457031 16.2008789,4.83535156 L16.2008789,4.82011719 C16.2008789,4.25136719 16.0282227,3.74482422 15.6829102,3.30048828 C15.3375977,2.85615234 14.8602539,2.50576172 14.2508789,2.24931641 C13.6415039,1.99287109 12.9381836,1.86464844 12.140918,1.86464844 C11.3436523,1.86464844 10.640332,1.99287109 10.030957,2.24931641 C9.42158203,2.50576172 8.94423828,2.85615234 8.59892578,3.30048828 C8.25361328,3.74482422 8.08095703,4.25136719 8.08095703,4.82011719 L8.08095703,4.83535156 C8.08095703,5.43457031 8.28027344,5.95126953 8.67890625,6.38544922 C9.07753906,6.81962891 9.59931641,7.11542969 10.2442383,7.27285156 L10.2442383,7.31855469 C9.74658203,7.41503906 9.30478516,7.59150391 8.91884766,7.84794922 C8.53291016,8.10439453 8.22949219,8.42558594 8.00859375,8.81152344 C7.78769531,9.19746094 7.67724609,9.62910156 7.67724609,10.1064453 L7.67724609,10.1216797 C7.67724609,10.7564453 7.86513672,11.3163086 8.24091797,11.8012695 C8.61669922,12.2862305 9.13974609,12.6645508 9.81005859,12.9362305 C10.4803711,13.2079102 11.2573242,13.34375 12.140918,13.34375 Z M12.140918,6.5796875 C11.7905273,6.5796875 11.4807617,6.51494141 11.2116211,6.38544922 C10.9424805,6.25595703 10.7317383,6.07695313 10.5793945,5.8484375 C10.4270508,5.61992188 10.3508789,5.35585938 10.3508789,5.05625 L10.3508789,5.04101563 C10.3508789,4.74140625 10.4270508,4.47734375 10.5793945,4.24882813 C10.7317383,4.0203125 10.9424805,3.84257813 11.2116211,3.715625 C11.4807617,3.58867188 11.7905273,3.52519531 12.140918,3.52519531 C12.4913086,3.52519531 12.7998047,3.58867188 13.0664062,3.715625 C13.3330078,3.84257813 13.5424805,4.0203125 13.6948242,4.24882813 C13.847168,4.47734375 13.9233398,4.74140625 13.9233398,5.04101563 L13.9233398,5.05625 C13.9233398,5.35585938 13.8484375,5.61992188 13.6986328,5.8484375 C13.5488281,6.07695313 13.3393555,6.25595703 13.0702148,6.38544922 C12.8010742,6.51494141 12.4913086,6.5796875 12.140918,6.5796875 Z M12.140918,11.6679688 C11.7397461,11.6679688 11.3842773,11.5956055 11.0745117,11.4508789 C10.7647461,11.3061523 10.5209961,11.1055664 10.3432617,10.8491211 C10.1655273,10.5926758 10.0766602,10.2994141 10.0766602,9.96933594 L10.0766602,9.95410156 C10.0766602,9.62402344 10.1642578,9.33076172 10.3394531,9.07431641 C10.5146484,8.81787109 10.7571289,8.61601563 11.0668945,8.46875 C11.3766602,8.32148438 11.734668,8.24785156 12.140918,8.24785156 C12.547168,8.24785156 12.9051758,8.32148438 13.2149414,8.46875 C13.524707,8.61601563 13.765918,8.81787109 13.9385742,9.07431641 C14.1112305,9.33076172 14.1975586,9.62402344 14.1975586,9.95410156 L14.1975586,9.96933594 C14.1975586,10.2994141 14.1099609,10.5926758 13.9347656,10.8491211 C13.7595703,11.1055664 13.5170898,11.3061523 13.2073242,11.4508789 C12.8975586,11.5956055 12.5420898,11.6679688 12.140918,11.6679688 Z M4.68496094,14.8722656 L4.68496094,22.2 L5.599,22.2 L7.54394531,22.2 C8.06529948,22.2 8.51048177,22.1179036 8.87949219,21.9537109 C9.2485026,21.7895182 9.53203125,21.5542318 9.73007813,21.2478516 C9.928125,20.9414714 10.0271484,20.575 10.0271484,20.1484375 L10.0271484,20.1382813 C10.0271484,19.8166667 9.96028646,19.5297526 9.8265625,19.2775391 C9.69283854,19.0253255 9.50410156,18.8196615 9.26035156,18.6605469 C9.01660156,18.5014323 8.72714844,18.4015625 8.39199219,18.3609375 L8.39199219,18.2796875 C8.62897135,18.2356771 8.8422526,18.1375 9.03183594,17.9851563 C9.22141927,17.8328125 9.37291667,17.6449219 9.48632812,17.4214844 C9.59973958,17.1980469 9.65644531,16.959375 9.65644531,16.7054688 L9.65644531,16.6953125 C9.65644531,16.3229167 9.56927083,16.0004557 9.39492188,15.7279297 C9.22057292,15.4554036 8.97174479,15.2446615 8.6484375,15.0957031 C8.32513021,14.9467448 7.93834635,14.8722656 7.48808594,14.8722656 L5.59902344,14.8722656 L5.14199219,14.8722656 L4.68496094,14.8722656 Z M5.599,15.68 L7.29511719,15.6796875 C7.74876302,15.6796875 8.10169271,15.7820964 8.35390625,15.9869141 C8.60611979,16.1917318 8.73222656,16.4803385 8.73222656,16.8527344 L8.73222656,16.8628906 C8.73222656,17.2488281 8.59257812,17.539974 8.31328125,17.7363281 C8.03398437,17.9326823 7.61673177,18.0308594 7.06152344,18.0308594 L5.599,18.031 L5.599,15.68 Z M5.599,18.818 L7.32050781,18.8179688 C7.70983073,18.8179688 8.03567708,18.8653646 8.29804688,18.9601563 C8.56041667,19.0549479 8.75761719,19.1971354 8.88964844,19.3867188 C9.02167969,19.5763021 9.08769531,19.8115885 9.08769531,20.0925781 L9.08769531,20.1027344 C9.08769531,20.522526 8.94550781,20.8424479 8.66113281,21.0625 C8.37675781,21.2825521 7.95865885,21.3925781 7.40683594,21.3925781 L5.599,21.393 L5.599,18.818 Z M12.5306641,22.2 L12.5306641,14.8722656 L11.6166016,14.8722656 L11.6166016,22.2 L12.5306641,22.2 Z M17.3142578,22.2 L17.3142578,15.6949219 L19.6755859,15.6949219 L19.6755859,14.8722656 L14.0388672,14.8722656 L14.0388672,15.6949219 L16.4001953,15.6949219 L16.4001953,22.2 L17.3142578,22.2 Z", fillRule: "nonzero" })));
exports.Bits8Icon = Bits8Icon;
const ColumnRightIcon = () => (react_1.default.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M23,1 L23,23 L1,23 L1,1 L23,1 Z M21,3 L3,3 L3,21 L21,21 L21,3 Z M19,5 L19,19 L13,19 L13,5 L19,5 Z" })));
exports.ColumnRightIcon = ColumnRightIcon;
const ColumnLeftIcon = () => (react_1.default.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M23,1 L23,23 L1,23 L1,1 L23,1 Z M21,3 L3,3 L3,21 L21,21 L21,3 Z M11,5 L11,19 L5,19 L5,5 L11,5 Z" })));
exports.ColumnLeftIcon = ColumnLeftIcon;
const NavigationIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M20 9h-17v-6h17l3 3-3 3zm-6 10h-4v5h4v-5zm0-19h-4v2h4v-2zm-10 11h17v6h-17l-3-3 3-3z" })));
exports.NavigationIcon = NavigationIcon;
const Bits16Icon = () => (react_1.default.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M9.05214844,13.1 L9.05214844,2.10839844 L6.759375,2.10839844 L3.91816406,4.08125 L3.91816406,6.153125 L6.61464844,4.27929688 L6.75175781,4.27929688 L6.75175781,13.1 L9.05214844,13.1 Z M13.9195313,6.11123047 C14.0058594,5.62626953 14.1442383,5.20097656 14.334668,4.83535156 C14.5250977,4.46972656 14.7713867,4.1828125 15.0735352,3.97460938 C15.3756836,3.76640625 15.7400391,3.66230469 16.1666016,3.66230469 C16.4662109,3.66230469 16.7328125,3.71054688 16.9664062,3.80703125 C17.2,3.90351563 17.3993164,4.03681641 17.5643555,4.20693359 C17.7293945,4.37705078 17.8550781,4.57890625 17.9414062,4.8125 L17.971875,4.88105469 L20.2189453,4.88105469 L20.2037109,4.80488281 C20.0919922,4.23105469 19.8520508,3.72070313 19.4838867,3.27382813 C19.1157227,2.82695313 18.6472656,2.47402344 18.0785156,2.21503906 C17.5097656,1.95605469 16.8699219,1.8265625 16.1589844,1.8265625 C15.2246094,1.8265625 14.4171875,2.06015625 13.7367188,2.52734375 C13.05625,2.99453125 12.5319336,3.66611328 12.1637695,4.54208984 C11.7956055,5.41806641 11.6115234,6.46796875 11.6115234,7.69179688 L11.6115234,7.70703125 C11.6115234,8.67695313 11.7270508,9.51738281 11.9581055,10.2283203 C12.1891602,10.9392578 12.5116211,11.5283203 12.9254883,11.9955078 C13.3393555,12.4626953 13.8205078,12.8118164 14.3689453,13.0428711 C14.9173828,13.2739258 15.5115234,13.3894531 16.1513672,13.3894531 C16.9791016,13.3894531 17.709082,13.2193359 18.3413086,12.8791016 C18.9735352,12.5388672 19.4686523,12.0742188 19.8266602,11.4851563 C20.184668,10.8960938 20.3636719,10.2283203 20.3636719,9.48183594 L20.3636719,9.46660156 C20.3636719,8.77089844 20.2138672,8.15136719 19.9142578,7.60800781 C19.6146484,7.06464844 19.1957031,6.63808594 18.6574219,6.32832031 C18.1191406,6.01855469 17.4919922,5.86367188 16.7759766,5.86367188 C16.2732422,5.86367188 15.8339844,5.93857422 15.4582031,6.08837891 C15.0824219,6.23818359 14.7701172,6.43496094 14.5212891,6.67871094 C14.2724609,6.92246094 14.0794922,7.18652344 13.9423828,7.47089844 L13.793,7.471 L13.7952188,7.34582422 C13.8090313,6.91073047 13.8504688,6.49919922 13.9195313,6.11123047 Z M16.1361328,11.5613281 C15.7654297,11.5613281 15.4277344,11.4711914 15.1230469,11.290918 C14.8183594,11.1106445 14.5771484,10.865625 14.3994141,10.5558594 C14.2513021,10.2977214 14.1649034,10.0131348 14.1402181,9.70209961 L14.132,9.513 L14.1328125,9.5046875 C14.1328125,9.12382813 14.2229492,8.78740234 14.4032227,8.49541016 C14.5834961,8.20341797 14.8259766,7.97363281 15.1306641,7.80605469 C15.4353516,7.63847656 15.7755859,7.5546875 16.1513672,7.5546875 C16.5373047,7.5546875 16.8788086,7.64101563 17.1758789,7.81367188 C17.4729492,7.98632813 17.7078125,8.22119141 17.8804687,8.51826172 C18.053125,8.81533203 18.1394531,9.15683594 18.1394531,9.54277344 L18.1394531,9.55800781 C18.1394531,9.93378906 18.0493164,10.2727539 17.869043,10.5749023 C17.6887695,10.8770508 17.4475586,11.1169922 17.1454102,11.2947266 C16.8432617,11.4724609 16.5068359,11.5613281 16.1361328,11.5613281 Z M4.68496094,14.8722656 L4.68496094,22.2 L5.599,22.2 L7.54394531,22.2 C8.06529948,22.2 8.51048177,22.1179036 8.87949219,21.9537109 C9.2485026,21.7895182 9.53203125,21.5542318 9.73007813,21.2478516 C9.928125,20.9414714 10.0271484,20.575 10.0271484,20.1484375 L10.0271484,20.1382813 C10.0271484,19.8166667 9.96028646,19.5297526 9.8265625,19.2775391 C9.69283854,19.0253255 9.50410156,18.8196615 9.26035156,18.6605469 C9.01660156,18.5014323 8.72714844,18.4015625 8.39199219,18.3609375 L8.39199219,18.2796875 C8.62897135,18.2356771 8.8422526,18.1375 9.03183594,17.9851563 C9.22141927,17.8328125 9.37291667,17.6449219 9.48632812,17.4214844 C9.59973958,17.1980469 9.65644531,16.959375 9.65644531,16.7054688 L9.65644531,16.6953125 C9.65644531,16.3229167 9.56927083,16.0004557 9.39492188,15.7279297 C9.22057292,15.4554036 8.97174479,15.2446615 8.6484375,15.0957031 C8.32513021,14.9467448 7.93834635,14.8722656 7.48808594,14.8722656 L5.59902344,14.8722656 L5.14199219,14.8722656 L4.68496094,14.8722656 Z M5.599,15.68 L7.29511719,15.6796875 C7.74876302,15.6796875 8.10169271,15.7820964 8.35390625,15.9869141 C8.60611979,16.1917318 8.73222656,16.4803385 8.73222656,16.8527344 L8.73222656,16.8628906 C8.73222656,17.2488281 8.59257812,17.539974 8.31328125,17.7363281 C8.03398437,17.9326823 7.61673177,18.0308594 7.06152344,18.0308594 L5.599,18.031 L5.599,15.68 Z M5.599,18.818 L7.32050781,18.8179688 C7.70983073,18.8179688 8.03567708,18.8653646 8.29804688,18.9601563 C8.56041667,19.0549479 8.75761719,19.1971354 8.88964844,19.3867188 C9.02167969,19.5763021 9.08769531,19.8115885 9.08769531,20.0925781 L9.08769531,20.1027344 C9.08769531,20.522526 8.94550781,20.8424479 8.66113281,21.0625 C8.37675781,21.2825521 7.95865885,21.3925781 7.40683594,21.3925781 L5.599,21.393 L5.599,18.818 Z M12.5306641,22.2 L12.5306641,14.8722656 L11.6166016,14.8722656 L11.6166016,22.2 L12.5306641,22.2 Z M17.3142578,22.2 L17.3142578,15.6949219 L19.6755859,15.6949219 L19.6755859,14.8722656 L14.0388672,14.8722656 L14.0388672,15.6949219 L16.4001953,15.6949219 L16.4001953,22.2 L17.3142578,22.2 Z", fillRule: "nonzero" })));
exports.Bits16Icon = Bits16Icon;
const ParallaxIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M4 17.162l-2 .838v-12.972l12-5.028v2.507l-10 4.19v10.465zm18-11.162l-12 5.028v12.972l12-5.028v-12.972zm-14 3.697l10-4.19v-2.507l-12 5.028v12.972l2-.838v-10.465z" })));
exports.ParallaxIcon = ParallaxIcon;
const PaletteIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fillRule: "evenodd", clipRule: "evenodd" },
    react_1.default.createElement("path", { d: "M1 12.155c2.256 3.97 4.55 7.918 6.879 11.845h-5.379c-.829 0-1.5-.675-1.5-1.5v-10.345zm2.85.859c3.278 1.952 12.866 7.658 13.121 7.805l-5.162 2.98c-.231.132-.49.201-.751.201-.549 0-1.037-.298-1.299-.75l-5.909-10.236zm1.9-12.813c-.23-.133-.489-.201-.75-.201-.524 0-1.026.277-1.299.75l-3.5 6.062c-.133.23-.201.489-.201.749 0 .527.278 1.028.75 1.3 2.936 1.695 14.58 8.7 17.516 10.396.718.413 1.633.168 2.048-.55l3.5-6.062c.133-.23.186-.488.186-.749 0-.52-.257-1.025-.734-1.3l-17.516-10.395m.25 3.944c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2" })));
exports.PaletteIcon = PaletteIcon;
const CopyIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" })));
exports.CopyIcon = CopyIcon;
const AsteriskIcon = () => (react_1.default.createElement("svg", { version: "1.1", id: "Layer_1", x: "0px", y: "0px", viewBox: "0 0 455 455" },
    react_1.default.createElement("polygon", { points: "347.49,227 454.5,165.212 394.508,61.288 287.5,123.077 287.5,0 167.5,0 167.5,123.077 60.492,61.288\n\t0.499,165.212 107.51,227 0.5,288.788 60.492,392.712 167.5,330.923 167.5,455 287.5,455 287.5,330.923 394.508,392.712\n\t454.501,288.788 " })));
exports.AsteriskIcon = AsteriskIcon;
const CursorHorizontalIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M6 11v-4l-6 5 6 5v-4h12v4l6-5-6-5v4z" })));
exports.CursorHorizontalIcon = CursorHorizontalIcon;
const CursorVeticalIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M13 6h4l-5-6-5 6h4v12h-4l5 6 5-6h-4z" })));
exports.CursorVeticalIcon = CursorVeticalIcon;
const CursorDiagonalIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M8.465 7.05l2.828-3.05h-7.293v7.293l3.051-2.829 8.484 8.486-2.828 3.05h7.293v-7.292l-3.051 2.828z" })));
exports.CursorDiagonalIcon = CursorDiagonalIcon;
const ArrowLeftRightIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M1.5 7.5H16.4953L16.499 10.875C16.499 11.3225 16.764 11.7277 17.1745 11.9063C17.5848 12.0849 18.0618 12.0037 18.39 11.6997L23.64 6.82472C24.12 6.37941 24.12 5.6205 23.64 5.17519L18.39 0.300188C18.0622 -0.00374974 17.5851 -0.0849841 17.1745 0.0935628C16.764 0.272438 16.499 0.677625 16.499 1.12481L16.4953 4.5H1.5C0.670781 4.5 0 5.17031 0 5.95781C0 6.74531 0.670781 7.5 1.5 7.5ZM22.5 16.5H7.50469L7.5 13.0828C7.5 12.6353 7.23506 12.2302 6.82453 12.0516C6.41719 11.9156 5.93906 11.9953 5.61094 12.3L0.360937 17.175C-0.119062 17.6203 -0.119062 18.3792 0.360937 18.8245L5.61094 23.6995C5.93869 24.0035 6.41578 24.0848 6.82641 23.9061C7.2375 23.7281 7.5 23.3203 7.5 22.875L7.50469 19.5H22.5C23.3292 19.5 24 18.8292 24 18C24 17.1708 23.3297 16.5 22.5 16.5Z" })));
exports.ArrowLeftRightIcon = ArrowLeftRightIcon;
const SlopeIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M24 22h-24l24-20z" })));
exports.SlopeIcon = SlopeIcon;
const InfoIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-6h-2v-2h4v8zm-1-9.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" })));
exports.InfoIcon = InfoIcon;
const BreakpointIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M15.728 3l5.272 5.272v7.456l-5.272 5.272h-7.456l-5.272-5.272v-7.456l5.272-5.272h7.456zm8.272 4.029v9.941l-7.029 7.03h-9.942l-7.029-7.029v-9.942l7.029-7.029h9.941l7.03 7.029zm-2 .829l-5.858-5.858h-8.284l-5.858 5.858v8.284l5.858 5.858h8.284l5.858-5.858v-8.284z" }),
    " "));
exports.BreakpointIcon = BreakpointIcon;
const SettingsIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" })));
exports.SettingsIcon = SettingsIcon;
const CameraIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M16 16c0 1.104-.896 2-2 2h-12c-1.104 0-2-.896-2-2v-8c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v8zm8-10l-6 4.223v3.554l6 4.223v-12z" })));
exports.CameraIcon = CameraIcon;
const DarkBackgroundIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497z" })));
exports.DarkBackgroundIcon = DarkBackgroundIcon;
const WarningIcon = () => (react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
    react_1.default.createElement("path", { d: "M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" })));
exports.WarningIcon = WarningIcon;
const SadIcon = () => (react_1.default.createElement("svg", { width: "1096", height: "974", viewBox: "0 0 1096 974", version: "1.1" },
    react_1.default.createElement("defs", null,
        react_1.default.createElement("path", { d: "M50,0 L846,-1.42108547e-14 C873.614237,-1.92835078e-14 896,22.3857625 896,50 L896,574 C896,684.45695 806.45695,774 696,774 L50,774 C22.3857625,774 3.38176876e-15,751.614237 0,724 L0,50 C-3.38176876e-15,22.3857625 22.3857625,5.07265313e-15 50,0 Z", id: "path-1" }),
        react_1.default.createElement("filter", { x: "-0.6%", y: "-0.7%", width: "101.2%", height: "101.4%", filterUnits: "objectBoundingBox", id: "filter-2" },
            react_1.default.createElement("feMorphology", { radius: "2", operator: "erode", in: "SourceAlpha", result: "shadowSpreadInner1" }),
            react_1.default.createElement("feGaussianBlur", { stdDeviation: "0.5", in: "shadowSpreadInner1", result: "shadowBlurInner1" }),
            react_1.default.createElement("feOffset", { dx: "0", dy: "-2", in: "shadowBlurInner1", result: "shadowOffsetInner1" }),
            react_1.default.createElement("feComposite", { in: "shadowOffsetInner1", in2: "SourceAlpha", operator: "arithmetic", k2: "-1", k3: "1", result: "shadowInnerInner1" }),
            react_1.default.createElement("feColorMatrix", { values: "0 0 0 0 0.415686275   0 0 0 0 0.415686275   0 0 0 0 0.415686275  0 0 0 0.5 0", type: "matrix", in: "shadowInnerInner1", result: "shadowMatrixInner1" }),
            react_1.default.createElement("feMorphology", { radius: "2", operator: "erode", in: "SourceAlpha", result: "shadowSpreadInner2" }),
            react_1.default.createElement("feGaussianBlur", { stdDeviation: "0.5", in: "shadowSpreadInner2", result: "shadowBlurInner2" }),
            react_1.default.createElement("feOffset", { dx: "0", dy: "8", in: "shadowBlurInner2", result: "shadowOffsetInner2" }),
            react_1.default.createElement("feComposite", { in: "shadowOffsetInner2", in2: "SourceAlpha", operator: "arithmetic", k2: "-1", k3: "1", result: "shadowInnerInner2" }),
            react_1.default.createElement("feColorMatrix", { values: "0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0", type: "matrix", in: "shadowInnerInner2", result: "shadowMatrixInner2" }),
            react_1.default.createElement("feMerge", null,
                react_1.default.createElement("feMergeNode", { in: "shadowMatrixInner1" }),
                react_1.default.createElement("feMergeNode", { in: "shadowMatrixInner2" })))),
    react_1.default.createElement("g", { id: "Artboard", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
        react_1.default.createElement("g", { id: "Group", transform: "translate(100.000000, 100.000000)", fillRule: "nonzero" },
            react_1.default.createElement("g", { id: "Rectangle-2" },
                react_1.default.createElement("use", { fill: "black", fillOpacity: "1", filter: "url(#filter-2)", xlinkHref: "#path-1" }),
                react_1.default.createElement("path", { stroke: "#979797", strokeWidth: "10", d: "M50,5 C25.1471863,5 5,25.1471863 5,50 L5,724 C5,748.852814 25.1471863,769 50,769 L696,769 C803.695526,769 891,681.695526 891,574 L891,50 C891,25.1471863 870.852814,5 846,5 L50,5 Z", strokeLinejoin: "bevel" })),
            react_1.default.createElement("path", { d: "M819,76.9627119 L896,76.9627119 L896,104.949153 L0,104.949153 L0,76.9627119 L77,76.9627119 L77,0 L105,0 L105,76.9627119 L791,76.9627119 L791,0 L819,0 L819,76.9627119 Z", id: "Combined-Shape", fill: "#979797" }),
            react_1.default.createElement("path", { d: "M114,193.908475 C100.192881,193.908475 89,205.101356 89,218.908475 L89,663.538983 C89,677.346102 100.192881,688.538983 114,688.538983 L662,688.538983 C742.081289,688.538983 807,623.620272 807,543.538983 L807,218.908475 C807,205.101356 795.807119,193.908475 782,193.908475 L114,193.908475 Z", id: "Rectangle", stroke: "#979797", strokeWidth: "10", fill: "#979797" })),
        react_1.default.createElement("rect", { id: "Rectangle", stroke: "#979797", strokeWidth: "10", fill: "#FFFFFF", fillRule: "nonzero", x: "339.5", y: "354.254237", width: "417.875", height: "373.938983" }),
        react_1.default.createElement("text", { id: ":-(", fontFamily: "HelveticaNeue-Bold, Helvetica Neue", fontSize: "200", fontWeight: "bold", fill: "#979797" },
            react_1.default.createElement("tspan", { x: "450.4", y: "596" }, ":-(")))));
exports.SadIcon = SadIcon;


/***/ }),

/***/ 55485:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Portal = exports.portalRoot = void 0;
const react_dom_1 = __importDefault(__webpack_require__(40961));
exports.portalRoot = document.getElementById("MenuPortal");
const Portal = ({ children }) => {
    return react_dom_1.default.createPortal(children, exports.portalRoot);
};
exports.Portal = Portal;


/***/ }),

/***/ 91669:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RelativePortal = void 0;
const react_1 = __importStar(__webpack_require__(96540));
const Portal_1 = __webpack_require__(55485);
const styled_components_1 = __importDefault(__webpack_require__(21250));
const pinStyles = {
    "top-left": {
        position: "absolute",
        top: 0,
        left: 0,
    },
    "top-right": {
        position: "absolute",
        top: 0,
        right: 0,
    },
    "bottom-left": {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    "bottom-right": {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
};
const MIN_MARGIN = 10;
const Pin = styled_components_1.default.div `
  background: transparent;
  width: 1px;
  height: 1px;
  margin-right: -1px;
  margin-bottom: -1px;
`;
const RelativePortal = ({ children, offsetX = 0, offsetY = 0, zIndex, ...props }) => {
    var _a;
    const ref = (0, react_1.useRef)(null);
    const contentsRef = (0, react_1.useRef)(null);
    const pin = (_a = props.pin) !== null && _a !== void 0 ? _a : "top-left";
    const [x, setX] = (0, react_1.useState)(0);
    const [y, setY] = (0, react_1.useState)(0);
    (0, react_1.useLayoutEffect)(() => {
        const update = () => {
            var _a, _b, _c;
            const rect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            const contentsHeight = ((_b = contentsRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
            const contentsWidth = ((_c = contentsRef.current) === null || _c === void 0 ? void 0 : _c.offsetWidth) || 0;
            if (rect) {
                let newY = rect.top + offsetY;
                let newX = rect.left + offsetX;
                if (pin === "bottom-left" || pin === "bottom-right") {
                    if (newY - contentsHeight - MIN_MARGIN < 0) {
                        newY = contentsHeight + MIN_MARGIN;
                    }
                }
                else {
                    if (newY + contentsHeight + MIN_MARGIN > window.innerHeight) {
                        newY = window.innerHeight - contentsHeight - MIN_MARGIN;
                    }
                }
                if (pin === "bottom-right" || pin === "top-right") {
                    if (newX - contentsWidth - MIN_MARGIN < 0) {
                        newX = contentsWidth + MIN_MARGIN;
                    }
                }
                else if (props.pin === "parent-edge") {
                    if (newX + contentsWidth + MIN_MARGIN > window.innerWidth) {
                        newX -= props.parentWidth + contentsWidth;
                    }
                }
                else {
                    if (newX + contentsWidth + MIN_MARGIN > window.innerWidth) {
                        newX = window.innerWidth - contentsWidth - MIN_MARGIN;
                    }
                }
                setY(newY);
                setX(newX);
            }
        };
        update();
        const timer = setInterval(update, 100);
        return () => {
            clearInterval(timer);
        };
    }, [ref, offsetX, offsetY, pin, props.pin, props]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Pin, { ref: ref }),
        react_1.default.createElement(Portal_1.Portal, null,
            react_1.default.createElement("div", { style: {
                    position: "fixed",
                    left: x,
                    top: y,
                    zIndex,
                } },
                react_1.default.createElement("div", { ref: contentsRef, style: pin !== "parent-edge" ? pinStyles[pin] : undefined }, children)))));
};
exports.RelativePortal = RelativePortal;


/***/ }),

/***/ 25023:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(96540));
const clampProgress = (progress) => Math.max(6, Math.min(100, progress));
const BootScreen = ({ message = "Booting Enchantment Game Engine...", progress = 26, }) => {
    const safeProgress = clampProgress(progress);
    return (react_1.default.createElement("div", { style: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at 20% 10%, #2a3544 0%, #121923 46%, #0a0f17 100%)",
            color: "#e2e8f0",
            fontFamily: '"Bahnschrift","Segoe UI Variable Display","Segoe UI","Trebuchet MS",Arial,sans-serif',
            userSelect: "none",
        } },
        react_1.default.createElement("div", { style: {
                width: 420,
                maxWidth: "88vw",
                padding: "24px 26px",
                borderRadius: 12,
                border: "1px solid #334155",
                background: "rgba(15,23,42,0.72)",
                boxShadow: "0 16px 34px rgba(0,0,0,0.42)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
            } },
            react_1.default.createElement("div", { style: {
                    width: 132,
                    height: 132,
                    borderRadius: 16,
                    border: "1px solid #475569",
                    background: "linear-gradient(160deg, rgba(245,158,11,0.22) 0%, rgba(59,130,246,0.24) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    lineHeight: 1.15,
                    color: "#f8fafc",
                } },
                "ENCHANTMENT",
                react_1.default.createElement("br", null),
                "GAME ENGINE"),
            react_1.default.createElement("div", { style: { fontSize: 19, fontWeight: 700, letterSpacing: 0.2 } }, "Enchantment Game Engine"),
            react_1.default.createElement("div", { style: { fontSize: 12, color: "#93a3b8" } }, message),
            react_1.default.createElement("div", { style: { fontSize: 10, color: "#8bb0c8" } }, "Initializing project manager..."),
            react_1.default.createElement("div", { style: {
                    marginTop: 6,
                    width: "100%",
                    height: 6,
                    borderRadius: 999,
                    background: "#1e293b",
                    overflow: "hidden",
                } },
                react_1.default.createElement("div", { style: {
                        width: `${safeProgress}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: "linear-gradient(90deg, #f59e0b 0%, #3b82f6 100%)",
                        transition: "width 0.25s ease-in-out",
                        animation: "egs_boot_pulse 1.15s ease-in-out infinite alternate",
                    } }))),
        react_1.default.createElement("style", null, `
        @keyframes egs_boot_pulse {
          from { transform: translateX(-8%); opacity: 0.7; }
          to { transform: translateX(140%); opacity: 1; }
        }
      `)));
};
exports["default"] = BootScreen;


/***/ }),

/***/ 64315:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlexRow = exports.FlexBreak = exports.FixedSpacer = exports.FlexGrow = void 0;
const react_1 = __importDefault(__webpack_require__(96540));
const style_1 = __webpack_require__(83021);
const FlexGrow = (props) => (react_1.default.createElement(style_1.StyledFlexGrow, { ...props }));
exports.FlexGrow = FlexGrow;
const FixedSpacer = ({ width, height }) => (react_1.default.createElement(style_1.StyledFixedSpacer, { "$width": width, "$height": height }));
exports.FixedSpacer = FixedSpacer;
const FlexBreak = () => react_1.default.createElement(style_1.StyledFlexBreak, null);
exports.FlexBreak = FlexBreak;
const FlexRow = ({ children }) => (react_1.default.createElement(style_1.StyledFlexRow, { children: children }));
exports.FlexRow = FlexRow;


/***/ }),

/***/ 83021:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyledFlexRow = exports.StyledFlexBreak = exports.StyledFixedSpacer = exports.StyledFlexGrow = void 0;
const styled_components_1 = __importDefault(__webpack_require__(21250));
exports.StyledFlexGrow = styled_components_1.default.div `
  flex-grow: 1;
`;
exports.StyledFixedSpacer = styled_components_1.default.div `
  width: ${(props) => (props.$width ? props.$width : 1)}px;
  height: ${(props) => (props.$height ? props.$height : 1)}px;
  flex-shrink: 0;
`;
exports.StyledFlexBreak = styled_components_1.default.div `
  flex-basis: 100% !important;
  margin: 0 !important;
  height: 0;
`;
exports.StyledFlexRow = styled_components_1.default.div `
  display: flex;
`;


/***/ }),

/***/ 5191:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SplashProject = exports.SplashLoading = exports.SplashProjectClearButton = exports.SplashInfoMessage = exports.SplashScroll = exports.SplashCreateButton = exports.SplashTemplateSelect = exports.SplashOpenButton = exports.SplashTab = exports.SplashAppTitle = exports.SplashEasterEggButton = exports.SplashLogo = exports.SplashForm = exports.SplashContent = exports.SplashSidebar = exports.SplashWindow = void 0;
const react_1 = __importStar(__webpack_require__(96540));
const l10n_1 = __importDefault(__webpack_require__(74606));
const styled_components_1 = __importDefault(__webpack_require__(21250));
const Button_1 = __webpack_require__(46590);
const Icons_1 = __webpack_require__(35103);
const style_1 = __webpack_require__(66501);
const Select_1 = __webpack_require__(77267);
const RelativePortal_1 = __webpack_require__(91669);
const plugin_png_1 = __importDefault(__webpack_require__(9680));
const SplashWindow = ({ focus, children }) => {
    return react_1.default.createElement(style_1.StyledSplashWindow, { "$focus": focus, children: children });
};
exports.SplashWindow = SplashWindow;
exports.SplashSidebar = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
  border-right: 1px solid rgba(148, 163, 184, 0.18);
  width: 232px;
  height: 100%;
  flex-shrink: 0;
  -webkit-app-region: drag;
`;
exports.SplashContent = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(180deg, #0f172a 0%, #111827 52%, #0b1220 100%);
  color: #e2e8f0;
  padding: 20px 24px;
  flex-grow: 1;
  -webkit-app-region: drag;
  input,
  select,
  button {
    -webkit-app-region: no-drag;
  }
`;
exports.SplashForm = styled_components_1.default.form `
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
exports.SplashLogo = styled_components_1.default.div `
  position: relative;
  margin: 24px 18px 8px;
  padding: 10px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.22);
  transition: transform 0.2s ease-in-out;

  img {
    width: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
exports.SplashEasterEggButton = styled_components_1.default.button `
  position: absolute;
  left: 18px;
  top: 52px;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: transparent;
  border: 0;
  -webkit-app-region: no-drag;
  cursor: pointer;

  &:hover {
    background: radial-gradient(
      circle,
      rgba(251, 63, 139, 0.2) 0%,
      rgba(252, 70, 107, 0) 100%
    );
  }

  &:active {
    background: radial-gradient(
      circle,
      rgba(251, 63, 139, 0.6) 0%,
      rgba(252, 70, 107, 0) 100%
    );
  }
`;
const SplashAppTitleWrapper = styled_components_1.default.div `
  color: #9fb5ce;
  font-size: 11px;
  text-align: center;
  margin-bottom: 18px;
  letter-spacing: 0.3px;
  div {
    user-select: text;
  }
`;
const SplashAppTitle = () => {
    const [showCommit, setShowCommit] = (0, react_1.useState)(false);
    const displayCommit = () => setShowCommit(true);
    return (react_1.default.createElement(SplashAppTitleWrapper, { onClick: displayCommit }, showCommit ? (react_1.default.createElement("div", null,
        "2.1.0",
        " (",
        "6d6ea28",
        ")")) : (`Enchantment Game Engine ${"2.1.0"}`)));
};
exports.SplashAppTitle = SplashAppTitle;
const SplashTab = ({ selected, ...props }) => (react_1.default.createElement(style_1.StyledSplashTab, { "$selected": selected, ...props }));
exports.SplashTab = SplashTab;
exports.SplashOpenButton = (0, styled_components_1.default)(Button_1.Button).attrs(() => ({
    variant: "transparent",
})) `
  color: #e2e8f0;
  font-size: 13px;
  justify-content: flex-start;
  padding: 8px 10px;
  margin: 14px 12px 18px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.5);
  -webkit-app-region: no-drag;
`;
const SplashTemplateSelectWrapper = styled_components_1.default.div `
  width: 100%;
`;
const SplashTemplateSelectOptions = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 5px;

  & > * {
    margin-right: 10px;
  }
`;
const SplashTemplateButtonWrapper = styled_components_1.default.div `
  position: relative;
`;
const SplashTemplateButton = styled_components_1.default.input.attrs({
    type: "radio",
}) `
  width: 80px;
  height: 80px;
  margin: 0;
  padding: 0;
  border-radius: ${(props) => props.theme.borderRadius}px;
  -webkit-appearance: none;
  &:focus {
    box-shadow: 0 0 0px 4px ${(props) => props.theme.colors.highlight};
  }
`;
const SplashTemplateLabel = styled_components_1.default.label `
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 2px solid ${(props) => props.theme.colors.input.background};
  border-radius: ${(props) => props.theme.borderRadius}px;
  -webkit-appearance: none;
  box-sizing: border-box;

  img,
  video {
    width: 100%;
    height: 100%;
  }

  ${SplashTemplateButton}:checked + & {
    border: 2px solid ${(props) => props.theme.colors.highlight};
    box-shadow: 0 0 0px 2px ${(props) => props.theme.colors.highlight};
  }
`;
const SplashTemplateName = styled_components_1.default.div `
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const SplashTemplateDescription = styled_components_1.default.div `
  font-size: 11px;
`;
const SplashTemplateVideo = ({ src, playing, }) => {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        var _a, _b;
        if (ref.current) {
            if (playing) {
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.play();
            }
            else {
                (_b = ref.current) === null || _b === void 0 ? void 0 : _b.pause();
            }
        }
    }, [playing, ref]);
    return react_1.default.createElement("video", { ref: ref, src: src, muted: true, loop: true });
};
const SplashTemplateSelect = ({ templates, templatePlugins, name, value, onChange, }) => {
    var _a, _b, _c, _d;
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [selectedPluginId, setSelectedPluginId] = (0, react_1.useState)((_b = (_a = templatePlugins[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "");
    const selectedPlugin = templatePlugins.find((template) => template.id === selectedPluginId) ||
        templatePlugins[0];
    const selectedTemplate = (_c = templates.find((template) => template.id === value)) !== null && _c !== void 0 ? _c : selectedPlugin;
    const templatePluginOptions = templatePlugins.map((v) => ({
        value: v.id,
        label: v.name,
    }));
    const selectedTemplatePluginOption = (_d = templatePluginOptions.find((t) => t.value === selectedPluginId)) !== null && _d !== void 0 ? _d : templatePluginOptions[0];
    return (react_1.default.createElement(SplashTemplateSelectWrapper, null,
        react_1.default.createElement(SplashTemplateSelectOptions, null,
            templates.map((template) => (react_1.default.createElement(SplashTemplateButtonWrapper, { key: template.id },
                react_1.default.createElement(SplashTemplateButton, { id: `${name}_${template.id}`, name: name, value: template.id, checked: template.id === value, onChange: () => onChange(template.id) }),
                react_1.default.createElement(SplashTemplateLabel, { htmlFor: `${name}_${template.id}`, title: template.name }, template.videoPreview ? (react_1.default.createElement(SplashTemplateVideo, { src: template.preview, playing: template.id === value })) : (react_1.default.createElement("img", { src: template.preview, alt: template.name, draggable: false })))))),
            selectedPlugin && (react_1.default.createElement(SplashTemplateButtonWrapper, { key: selectedPlugin.id },
                react_1.default.createElement(SplashTemplateButton, { id: `${name}_${selectedPlugin.id}`, name: name, value: selectedPlugin.id, checked: selectedPlugin.id === value, onChange: () => onChange(selectedPlugin.id), onClick: () => setIsOpen(true) }),
                react_1.default.createElement(SplashTemplateLabel, { htmlFor: `${name}_${selectedPlugin.id}`, title: selectedPlugin.name },
                    react_1.default.createElement("img", { src: selectedPlugin.preview, alt: selectedPlugin.name, onError: (e) => (e.target.src = plugin_png_1.default) })),
                isOpen && (react_1.default.createElement(RelativePortal_1.RelativePortal, { pin: "top-right", offsetX: 78 },
                    react_1.default.createElement(Select_1.SelectMenu, null,
                        react_1.default.createElement(Select_1.Select, { name: name, options: templatePluginOptions, value: selectedTemplatePluginOption, onChange: (option) => {
                                if (option) {
                                    setSelectedPluginId(option.value);
                                    onChange(option.value);
                                    setIsOpen(false);
                                }
                            }, onBlur: () => {
                                setIsOpen(false);
                            }, ...Select_1.selectMenuStyleProps }))))))),
        selectedTemplate && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(SplashTemplateName, null, selectedTemplate.name),
            react_1.default.createElement(SplashTemplateDescription, null, selectedTemplate.description)))));
};
exports.SplashTemplateSelect = SplashTemplateSelect;
exports.SplashCreateButton = styled_components_1.default.div `
  padding: 0 2px;
`;
exports.SplashScroll = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 8px;
  background: transparent;
  color: #e2e8f0;
  position: relative;

  h2 {
    margin-top: 0;
  }
`;
exports.SplashInfoMessage = styled_components_1.default.div `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  box-sizing: border-box;
  padding: 30px;
  text-align: center;
`;
exports.SplashProjectClearButton = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  padding: 30px;
`;
const SplashProjectRemoveButton = styled_components_1.default.div `
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;
  transition-delay: 0.2s;
  background: rgba(15, 23, 42, 0.66);
  border: 0;
  border-radius: 4px;
  width: 25px;
  height: 25px;

  svg {
    fill: ${(props) => props.theme.colors.text};
    width: 10px;
    height: 10px;
    max-width: 10px;
    max-height: 10px;
  }

  &:hover {
    cursor: pointer;
    svg {
      fill: ${(props) => props.theme.colors.highlight};
    }
  }
`;
const SplashProjectWrapper = styled_components_1.default.button `
  position: relative;
  display: flex;
  text-align: left;
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 16px 44px 16px 16px;
  width: 100%;

  ${SplashProjectRemoveButton} {
    opacity: 0;
  }

  &:hover {
    background: rgba(30, 41, 59, 0.84);
    border-color: rgba(59, 130, 246, 0.7);
    ${SplashProjectRemoveButton} {
      opacity: 1;
    }
  }

  &:active {
    background: rgba(37, 99, 235, 0.2);
  }

  &:focus {
    background: transparent;
    box-shadow: inset 0 0 0px 2px #c92c61;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
const SplashProjectDetails = styled_components_1.default.span `
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const SplashProjectBadge = styled_components_1.default.span `
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: linear-gradient(
    150deg,
    rgba(245, 158, 11, 0.2) 0%,
    rgba(59, 130, 246, 0.24) 100%
  );
  color: #f8fafc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.4px;
`;
const SplashProjectName = styled_components_1.default.span `
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SplashProjectPath = styled_components_1.default.span `
  display: block;
  font-size: 11px;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
exports.SplashLoading = styled_components_1.default.form `
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const SplashProject = ({ project, onClick, onRemove, }) => (react_1.default.createElement(SplashProjectWrapper, { onClick: onClick },
    react_1.default.createElement(SplashProjectBadge, null, "EGE"),
    react_1.default.createElement(SplashProjectDetails, null,
        react_1.default.createElement(SplashProjectName, null, project.name),
        react_1.default.createElement(SplashProjectPath, null, project.dir)),
    react_1.default.createElement(SplashProjectRemoveButton, { title: (0, l10n_1.default)("SPLASH_REMOVE_FROM_RECENT"), onClick: onRemove
            ? (e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
            }
            : undefined },
        react_1.default.createElement(Icons_1.CloseIcon, null))));
exports.SplashProject = SplashProject;


/***/ }),

/***/ 66501:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyledSplashTab = exports.StyledSplashWindow = void 0;
const styled_components_1 = __importStar(__webpack_require__(21250));
exports.StyledSplashWindow = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 85% 8%,
      rgba(59, 130, 246, 0.14) 0%,
      rgba(15, 23, 42, 0) 38%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(20, 184, 166, 0.1) 0%,
      rgba(15, 23, 42, 0) 42%
    ),
    #0b1220;
  overflow: hidden;
  ${(props) => props.$focus === false
    ? (0, styled_components_1.css) `
          opacity: 0.75;
          -webkit-filter: grayscale(100%);
        `
    : ""}
`;
exports.StyledSplashTab = styled_components_1.default.button `
  font-size: 13px;
  padding: 9px 14px;
  margin: 2px 10px;
  border-radius: 8px;
  text-align: left;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: 0;
  -webkit-app-region: no-drag;
  transition: background 0.16s ease, transform 0.12s ease;

  &:hover {
    background: rgba(148, 163, 184, 0.16);
    transform: translateX(2px);
  }

  &:active {
    background: rgba(148, 163, 184, 0.22);
  }

  ${(props) => (props.$selected ? styledSplashTabSelectedStyles : "")}
`;
const styledSplashTabSelectedStyles = (0, styled_components_1.css) `
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.95), #2563eb);
  color: #eff6ff;

  &:hover {
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.95), #2563eb);
    color: #eff6ff;
    transform: none;
  }
  &:active {
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.95), #2563eb);
    color: #eff6ff;
  }
`;
// #endregion SplashTab


/***/ }),

/***/ 83620:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(96540));
const styled_components_1 = __webpack_require__(21250);
const api_1 = __importDefault(__webpack_require__(49495));
const theme_1 = __webpack_require__(93165);
const Provider = ({ children }) => {
    const [theme, setTheme] = (0, react_1.useState)(theme_1.defaultTheme);
    (0, react_1.useEffect)(() => {
        api_1.default.theme.onChange(setTheme);
    }, []);
    return react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme }, children);
};
exports["default"] = Provider;


/***/ }),

/***/ 27015:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const lightTheme = {
    name: "Light",
    type: "light",
    typography: {
        fontSize: "11px",
        menuFontSize: "12px",
        toolbarFontSize: "13px",
    },
    colors: {
        highlight: "#2f6fed",
        highlightText: "#ffffff",
        text: "#1f2833",
        background: "#e7ebf1",
        secondaryText: "#637083",
        token: {
            variable: "#9ccc65",
            character: "#90caf9",
            operator: "#90caf9",
            code: "#aaaaaa",
            function: "#aaaaaa",
            constant: "#90caf9",
        },
        toolbar: {
            background: "linear-gradient(to bottom, #f2f4f8 0%, #dce2ea 100%)",
            border: "#aab5c3",
            inactiveBackground: "#edf1f6",
            inactiveBorder: "#c3ccd8",
            textShadow: "none",
            button: {
                border: "#98a5b8",
            },
        },
        button: {
            background: "linear-gradient(to bottom, #ffffff 0%, #e3e8f0 100%)",
            border: "#9aa7ba",
            activeBackground: "#d3dbe7",
            text: "#1f2833",
            nestedBackground: "#d5dce7",
            nestedActiveBackground: "#c5cedd",
        },
        menu: {
            background: "#ffffff",
            hoverBackground: "#e7edf6",
            activeBackground: "#dce5f2",
            divider: "#c9d2df",
            boxShadow: "0 0 0 1px rgba(154, 168, 188, 0.7), 0 12px 24px rgba(32, 41, 54, 0.18)",
        },
        input: {
            background: "#ffffff",
            hoverBackground: "#f5f8fc",
            activeBackground: "#eef3fb",
            text: "#1f2833",
            border: "#b9c6d8",
        },
        brackets: {
            color: "#d0d8e3",
            hoverBackground: "#edf2f8",
        },
        card: {
            background: "#ffffff",
            text: "#1f2833",
            border: "#b8c4d5",
            divider: "#dce3ee",
            boxShadow: "0 10px 22px rgba(37, 47, 61, 0.15)",
        },
        sidebar: {
            background: "#d8dfe8",
            border: "#aeb9c8",
            well: {
                background: "#c7d1df",
                boxShadow: "-1px 0px 10px 0px rgba(38, 48, 60, 0.16) inset",
                hoverBackground: "#b8c4d4",
            },
            header: {
                background: "#eef2f8",
                activeBackground: "#e3e9f2",
                border: "#b6c1d1",
                text: "#1f2833",
            },
        },
        panel: {
            background: "#d9e1eb",
            border: "#afbacb",
            divider: "#bcc7d8",
            text: "#1f2833",
            icon: "#49596d",
            selectedIcon: "#1a2431",
            selectedBackground: "#c2cddc",
            activeBackground: "#cfd8e5",
            hoverBackground: "#d6deea",
        },
        document: {
            background: "#edf2f8",
        },
        list: {
            text: "#1f2833",
            icon: "#6e7e92",
            selectedBackground: "#c3cede",
            activeBackground: "#d2dbe8",
        },
        tabs: {
            background: "linear-gradient(0deg, #d9e0ea 0%, #edf2f8 100%)",
            selectedBackground: "#f6f9fd",
            secondaryBackground: "#e6ecf5",
            border: "#b8c3d4",
        },
        scripting: {
            tabs: {
                background: "#d9e0ea",
            },
            header: {
                text: "#1f2833",
                background: "linear-gradient(0deg, #d3dce8, #e6edf6)",
                nest1Background: "linear-gradient(0deg, #b7d1ea, #c9ddf0)",
                nest2Background: "linear-gradient(0deg, #c5d4ea, #d5e0f1)",
                nest3Background: "linear-gradient(0deg, #c1dbc6, #d2e6d5)",
                nest4Background: "linear-gradient(0deg, #cec1e6, #ddd2f0)",
                commentBackground: "linear-gradient(0deg, #d0deba, #dee8cc)",
                disabledBackground: "linear-gradient(0deg, #e0c6c6, #eddcdc)",
            },
            branch: {
                nest1Background: "#d2e3f2",
                nest2Background: "#d8e2f2",
                nest3Background: "#d7e8d9",
                nest4Background: "#dfd6f1",
            },
            form: {
                background: "#eef3fa",
            },
            children: {
                nest1Border: "#9ec5e4",
                nest1Text: "#2f6fed",
                nest2Border: "#a8bedf",
                nest2Text: "#406fba",
                nest3Border: "#a8cfae",
                nest3Text: "#4d8d59",
                nest4Border: "#b9a9dd",
                nest4Text: "#7153b8",
            },
            placeholder: {
                background: "#d0d8e4",
            },
        },
        tracker: {
            background: "#dde4ee",
            activeBackground: "#cfd8e5",
            border: "#b4c0d1",
            text: "#1f2833",
            note: "#008894",
            instrument: "#738bd7",
            effectCode: "#f45d22",
            effectParam: "#ffad1f",
            rollCell: {
                border: "#1f283366",
            },
        },
        prefab: {
            background: "#2f6fed",
            text: "#ffffff",
            button: {
                background: "#4a83f2",
                hoverBackground: "#5c90f4",
                text: "#ffffff",
            },
        },
    },
    borderRadius: 2,
};
exports["default"] = lightTheme;


/***/ }),

/***/ 73904:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __dirname = "src";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COLLISIONS_EXTRA_SYMBOLS = exports.BRUSH_SLOPE = exports.BRUSH_MAGIC = exports.BRUSH_FILL = exports.BRUSH_16PX = exports.BRUSH_8PX = exports.TOOL_ERASER = exports.TOOL_TRIGGERS = exports.TOOL_SCENE = exports.TOOL_COLORS = exports.TOOL_COLLISIONS = exports.TOOL_ACTORS = exports.TOOL_SELECT = exports.DRAG_TRIGGER = exports.DRAG_ACTOR = exports.DRAG_DESTINATION = exports.DRAG_PLAYER = exports.NAVIGATOR_MIN_WIDTH = exports.MIDDLE_MOUSE = exports.MAX_NESTED_SCRIPT_DEPTH = exports.SCENE_MAX_SIZE_PX = exports.SCREEN_HEIGHT_PX = exports.SCREEN_WIDTH_PX = exports.TILE_SIZE = exports.SCREEN_HEIGHT = exports.SCREEN_WIDTH = exports.MAX_BACKGROUND_TILES_CGB = exports.MAX_BACKGROUND_TILES = exports.MAX_PROJECTILES = exports.MAX_ONSCREEN = exports.MAX_TRIGGERS = exports.MAX_ACTORS_SMALL = exports.MAX_ACTORS = exports.NUM_SUBPIXEL_BITS = exports.EMULATOR_MUTED_SETTING_KEY = exports.LOCALE_SETTING_KEY = exports.THEME_SETTING_KEY = exports.OFFICIAL_REPO_GITHUB_SUBMIT = exports.OFFICIAL_REPO_GITHUB = exports.OFFICIAL_REPO_URL = exports.assetsRoot = exports.eventsRoot = exports.localesRoot = exports.projectTemplatesRoot = exports.binjgbRoot = exports.buildToolsRoot = exports.defaultEngineMetaPath = exports.defaultEngineRoot = exports.enginesRoot = exports.buildUUID = void 0;
exports.defaultCollisionTileColor = exports.defaultCollisionTileIcon = exports.EVENT_GROUP = exports.EVENT_MUSIC_PLAY = exports.EVENT_FADE_IN = exports.EVENT_SOUND_PLAY_EFFECT = exports.EVENT_IF_TRUE = exports.EVENT_ENGINE_FIELD_STORE = exports.EVENT_ENGINE_FIELD_SET = exports.EVENT_END = exports.EVENT_COMMENT = exports.EVENT_PLAYER_SET_SPRITE = exports.EVENT_ACTOR_SET_SPRITE = exports.EVENT_SWITCH_SCENE = exports.EVENT_CALL_CUSTOM_EVENT = exports.EVENT_TEXT = exports.ERR_PROJECT_EXISTS = exports.OVERLAY_SPEED_DEFAULT = exports.OVERLAY_SPEED_INSTANT = exports.TRACKER_REDO = exports.TRACKER_UNDO = exports.MAX_ZOOM_LEVEL = exports.TMP_VAR_2 = exports.TMP_VAR_1 = exports.LYC_SYNC_VALUE = exports.FLAG_VRAM_BANK_1 = exports.DMG_PALETTE = exports.TILE_COLOR_PROP_PRIORITY = exports.TILE_COLOR_PROP_FLIP_VERTICAL = exports.TILE_COLOR_PROP_FLIP_HORIZONTAL = exports.TILE_COLOR_PROPS = exports.TILE_COLOR_PALETTE = exports.COLLISION_SLOPE_VALUES = exports.COLLISION_SLOPE_22_LEFT_TOP = exports.COLLISION_SLOPE_22_LEFT_BOT = exports.COLLISION_SLOPE_45_LEFT = exports.COLLISION_SLOPE_22_RIGHT_TOP = exports.COLLISION_SLOPE_22_RIGHT_BOT = exports.COLLISION_SLOPE_45_RIGHT = exports.TILE_PROP_SLOPE_LEFT = exports.TILE_PROP_SLOPE_22_TOP = exports.TILE_PROP_SLOPE_22_BOT = exports.TILE_PROP_SLOPE_45 = exports.TILE_PROPS = exports.TILE_PROP_LADDER = exports.COLLISION_ALL = exports.COLLISION_RIGHT = exports.COLLISION_LEFT = exports.COLLISION_BOTTOM = exports.COLLISION_TOP = void 0;
exports.defaultPalettes = exports.defaultProjectSettings = exports.defaultCollisionTileDefs = void 0;
const path_1 = __webpack_require__(57975);
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

/***/ 49495:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const API = window.API;
exports["default"] = API;


/***/ }),

/***/ 93130:
/***/ (() => {

"use strict";

window.addEventListener("error", (error) => {
    if (error.message.indexOf("dead code elimination") > -1) {
        return true;
    }
    error.stopPropagation();
    error.preventDefault();
    document.body.innerHTML = `<div style="width:100%; padding: 20px; user-select: text;">
      <div>
        <h2>${error.message}</h2>
        <p>
          ${error.filename}L:${error.lineno}C:${error.colno}
        </p>     
        <div>
          ${error.error &&
        error.error.stack &&
        error.error.stack
            .split("\n")
            .map((line) => `<div>${line}</div>`)
            .join("")}
        </div>
      </div>       
      </div>
    </div>`;
    return false;
});
window.addEventListener("unhandledrejection", (error) => {
    error.stopPropagation();
    error.preventDefault();
    console.log(error);
    document.body.innerHTML = `<div style="width:100%; padding: 20px; user-select: text;">
        <div>
          <h2>Unhandled Promise Rejection</h2>
          <p></p>
          <div>
          ${error.reason &&
        error.reason.stack &&
        error.reason.stack
            .split("\n")
            .map((line) => `<div>${line}</div>`)
            .join("")}
        </div>          
        </div>       
        </div>
      </div>`;
    return false;
});


/***/ }),

/***/ 6285:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __importDefault(__webpack_require__(49495));
const l10n_1 = __webpack_require__(74606);
let hasInit = false;
const initRendererL10N = async () => {
    if (hasInit) {
        return;
    }
    const data = await api_1.default.l10n.getL10NStrings();
    (0, l10n_1.setL10NData)(data);
    hasInit = true;
};
exports["default"] = initRendererL10N;


/***/ }),

/***/ 93165:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultTheme = exports.initTheme = void 0;
const api_1 = __importDefault(__webpack_require__(49495));
const lightTheme_1 = __importDefault(__webpack_require__(27015));
let hasInit = false;
let defaultTheme = lightTheme_1.default;
exports.defaultTheme = defaultTheme;
const initTheme = async () => {
    if (hasInit) {
        return;
    }
    exports.defaultTheme = defaultTheme = await api_1.default.theme.getTheme();
    hasInit = true;
};
exports.initTheme = initTheme;


/***/ }),

/***/ 69283:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setDefault = void 0;
const setDefault = (value, defaultValue) => {
    return value === undefined ? defaultValue : value;
};
exports.setDefault = setDefault;


/***/ }),

/***/ 74606:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceParams = exports.getL10NData = exports.clearL10NData = exports.setL10NData = void 0;
const l10nStrings = {};
let hasInit = false;
const setL10NData = (data) => {
    for (const key in data) {
        l10nStrings[key] = data[key];
    }
    hasInit = true;
};
exports.setL10NData = setL10NData;
const clearL10NData = () => {
    for (const key in l10nStrings) {
        delete l10nStrings[key];
    }
};
exports.clearL10NData = clearL10NData;
const getL10NData = () => {
    return l10nStrings;
};
exports.getL10NData = getL10NData;
const replaceParams = (string, params) => {
    let outputString = string;
    Object.keys(params).forEach((param) => {
        var _a;
        const pattern = new RegExp(`{${param}}`, "g");
        const paramValue = String((_a = params[param]) !== null && _a !== void 0 ? _a : "");
        outputString = outputString.replace(pattern, paramValue);
    });
    return outputString;
};
exports.replaceParams = replaceParams;
const l10n = (key, params) => {
    var _a;
    if (!hasInit && "production" !== "test") {
        console.warn(`L10N used before initialisation for key "${key}"`);
    }
    const l10nString = (_a = l10nStrings[key]) !== null && _a !== void 0 ? _a : key;
    if (typeof l10nString === "string") {
        if (params) {
            return (0, exports.replaceParams)(l10nString, params);
        }
        return l10nString;
    }
    return String(l10nString);
};
exports["default"] = l10n;


/***/ }),

/***/ 27003:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);


var index =  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect ;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


/***/ }),

/***/ 6492:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ll: () => (/* binding */ autoUpdate)
});

// UNUSED EXPORTS: arrow, autoPlacement, computePosition, detectOverflow, flip, getOverflowAncestors, hide, inline, limitShift, offset, platform, shift, size

;// CONCATENATED MODULE: ./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = (/* unused pure expression or super */ null && (['top', 'right', 'bottom', 'left']));
const alignments = (/* unused pure expression or super */ null && (['start', 'end']));
const placements = /*#__PURE__*/(/* unused pure expression or super */ null && (sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), [])));
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}



;// CONCATENATED MODULE: ./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}



;// CONCATENATED MODULE: ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs





function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
const detectOverflow = (/* unused pure expression or super */ null && (detectOverflow$1));

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (/* unused pure expression or super */ null && (offset$1));

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = (/* unused pure expression or super */ null && (autoPlacement$1));

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (/* unused pure expression or super */ null && (shift$1));

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (/* unused pure expression or super */ null && (flip$1));

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (/* unused pure expression or super */ null && (size$1));

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = (/* unused pure expression or super */ null && (hide$1));

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (/* unused pure expression or super */ null && (arrow$1));

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = (/* unused pure expression or super */ null && (inline$1));

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = (/* unused pure expression or super */ null && (limitShift$1));

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};




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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 169;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			169: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgb_studio"] = self["webpackChunkgb_studio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [967], () => (__webpack_require__(65127)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map