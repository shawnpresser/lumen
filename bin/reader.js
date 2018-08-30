var delimiters = {"(": true, ")": true, ";": true, "\r": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\r": true, "\n": true};
var stream = function (str, more) {
  return {pos: 0, string: str, len: _35(str), more: more};
};
var peek_char = function (s) {
  var ____id62 = s;
  var __pos = ____id62["pos"];
  var __len = ____id62["len"];
  var __string = ____id62["string"];
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var read_char = function (s) {
  var __c = peek_char(s);
  if (__c) {
    s["pos"] = s["pos"] + 1;
    return __c;
  }
};
var skip_non_code = function (s) {
  while (true) {
    var __c1 = peek_char(s);
    if (nil63(__c1)) {
      break;
    } else {
      if (whitespace[__c1]) {
        read_char(s);
      } else {
        if (__c1 === ";") {
          while (__c1 && !( __c1 === "\n")) {
            __c1 = read_char(s);
          }
          skip_non_code(s);
        } else {
          break;
        }
      }
    }
  }
};
var read_table = {};
var eof = {};
var read = function (s) {
  skip_non_code(s);
  var __c2 = peek_char(s);
  if (is63(__c2)) {
    return (read_table[__c2] || read_table[""])(s);
  } else {
    return eof;
  }
};
var read_all = function (s) {
  var __l4 = [];
  while (true) {
    var __form6 = read(s);
    if (__form6 === eof) {
      break;
    }
    add(__l4, __form6);
  }
  return __l4;
};
read_string = function (str, more) {
  var __x358 = read(stream(str, more));
  if (!( __x358 === eof)) {
    return __x358;
  }
};
var key63 = function (atom) {
  return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
};
var flag63 = function (atom) {
  return string63(atom) && _35(atom) > 1 && char(atom, 0) === ":";
};
var expected = function (s, c) {
  var ____id63 = s;
  var __more = ____id63["more"];
  var __pos1 = ____id63["pos"];
  return __more || error("Expected " + c + " at " + __pos1);
};
var wrap = function (s, x) {
  var __y2 = read(s);
  if (__y2 === s["more"]) {
    return __y2;
  } else {
    return [x, __y2];
  }
};
var hex_prefix63 = function (str) {
  var __e14;
  if (code(str, 0) === 45) {
    __e14 = 1;
  } else {
    __e14 = 0;
  }
  var __i10 = __e14;
  var __id64 = code(str, __i10) === 48;
  var __e15;
  if (__id64) {
    __i10 = __i10 + 1;
    var __n6 = code(str, __i10);
    __e15 = __n6 === 120 || __n6 === 88;
  } else {
    __e15 = __id64;
  }
  return __e15;
};
var maybe_number = function (str) {
  if (hex_prefix63(str)) {
    return parseInt(str, 16);
  } else {
    if (number_code63(code(str, edge(str)))) {
      return number(str);
    }
  }
};
var real63 = function (x) {
  return number63(x) && ! nan63(x) && ! inf63(x);
};
read_table[""] = function (s) {
  var __str = "";
  while (true) {
    var __c3 = peek_char(s);
    if (__c3 && (! whitespace[__c3] && ! delimiters[__c3])) {
      __str = __str + read_char(s);
    } else {
      break;
    }
  }
  if (__str === "true") {
    return true;
  } else {
    if (__str === "false") {
      return false;
    } else {
      var __n7 = maybe_number(__str);
      if (real63(__n7)) {
        return __n7;
      } else {
        return __str;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r96 = undefined;
  var __l5 = [];
  while (nil63(__r96)) {
    skip_non_code(s);
    var __c4 = peek_char(s);
    if (__c4 === ")") {
      read_char(s);
      __r96 = __l5;
    } else {
      if (nil63(__c4)) {
        __r96 = expected(s, ")");
      } else {
        var __x360 = read(s);
        if (key63(__x360)) {
          var __k6 = clip(__x360, 0, edge(__x360));
          var __v10 = read(s);
          __l5[__k6] = __v10;
        } else {
          if (flag63(__x360)) {
            __l5[clip(__x360, 1)] = true;
          } else {
            add(__l5, __x360);
          }
        }
      }
    }
  }
  return __r96;
};
read_table[")"] = function (s) {
  return error("Unexpected ) at " + s["pos"]);
};
read_table["\""] = function (s) {
  read_char(s);
  var __r99 = undefined;
  var __str1 = "\"";
  while (nil63(__r99)) {
    var __c5 = peek_char(s);
    if (__c5 === "\"") {
      __r99 = __str1 + read_char(s);
    } else {
      if (nil63(__c5)) {
        __r99 = expected(s, "\"");
      } else {
        if (__c5 === "\\") {
          __str1 = __str1 + read_char(s);
        }
        __str1 = __str1 + read_char(s);
      }
    }
  }
  return __r99;
};
read_table["|"] = function (s) {
  read_char(s);
  var __r101 = undefined;
  var __str2 = "|";
  while (nil63(__r101)) {
    var __c6 = peek_char(s);
    if (__c6 === "|") {
      __r101 = __str2 + read_char(s);
    } else {
      if (nil63(__c6)) {
        __r101 = expected(s, "|");
      } else {
        __str2 = __str2 + read_char(s);
      }
    }
  }
  return __r101;
};
read_table["'"] = function (s) {
  read_char(s);
  return wrap(s, "quote");
};
read_table["`"] = function (s) {
  read_char(s);
  return wrap(s, "quasiquote");
};
read_table[","] = function (s) {
  read_char(s);
  if (peek_char(s) === "@") {
    read_char(s);
    return wrap(s, "unquote-splicing");
  } else {
    return wrap(s, "unquote");
  }
};
var __e16;
if (typeof(exports) === "undefined") {
  __e16 = {};
} else {
  __e16 = exports;
}
var __exports = __e16;
__exports.stream = stream;
__exports.read = read;
__exports.read_all = read_all;
__exports.read_string = read_string;
__exports.read_table = read_table;
__exports;
