var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var b = find(function (e) {
      return(e[k]);
    }, reverse(environment));
    if (is63(b)) {
      if (p) {
        return(b[p]);
      } else {
        return(b);
      }
    }
  }
};
var macro_function = function (k) {
  return(getenv(k, "macro"));
};
var macro63 = function (k) {
  return(is63(macro_function(k)));
};
var special63 = function (k) {
  return(is63(getenv(k, "special")));
};
var special_form63 = function (form) {
  return(obj63(form) && special63(hd(form)));
};
var statement63 = function (k) {
  return(special63(k) && getenv(k, "stmt"));
};
var symbol_expansion = function (k) {
  return(getenv(k, "symbol"));
};
var symbol63 = function (k) {
  return(is63(symbol_expansion(k)));
};
var variable63 = function (k) {
  var b = first(function (frame) {
    return(frame[k] || frame._scope);
  }, reverse(environment));
  return(obj63(b) && is63(b.variable));
};
bound63 = function (x) {
  return(macro63(x) || special63(x) || symbol63(x) || variable63(x));
};
quoted = function (form) {
  if (string63(form)) {
    return(escape(form));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      return(join(["list"], map(quoted, form)));
    }
  }
};
var literal = function (s) {
  if (string_literal63(s)) {
    return(s);
  } else {
    return(quoted(s));
  }
};
var _uid120 = 0;
unique = function (x) {
  _uid120 = _uid120 + 1;
  return("_u" + x + _uid120);
};
var stash42 = function (args) {
  if (keys63(args)) {
    var l = ["%object", "\"_stash\"", true];
    var _ux24 = args;
    var k = undefined;
    for (k in _ux24) {
      var v = _ux24[k];
      var _ue343;
      if (numeric63(k)) {
        _ue343 = parseInt(k);
      } else {
        _ue343 = k;
      }
      var _uid126 = _ue343;
      if (!number63(_uid126)) {
        add(l, literal(_uid126));
        add(l, v);
      }
    }
    return(join(args, [l]));
  } else {
    return(args);
  }
};
var bias = function (k) {
  if (number63(k) && !(target === "js")) {
    if (target === "js") {
      k = k - 1;
    } else {
      k = k + 1;
    }
  }
  return(k);
};
bind = function (lh, rh) {
  if (obj63(lh) && obj63(rh)) {
    var id = unique("id");
    return(join([[id, rh]], bind(lh, id)));
  } else {
    if (atom63(lh)) {
      return([[lh, rh]]);
    } else {
      var bs = [];
      var _ux34 = lh;
      var k = undefined;
      for (k in _ux34) {
        var v = _ux34[k];
        var _ue344;
        if (numeric63(k)) {
          _ue344 = parseInt(k);
        } else {
          _ue344 = k;
        }
        var _uid136 = _ue344;
        var _ue345;
        if (_uid136 === "rest") {
          _ue345 = ["cut", rh, _35(lh)];
        } else {
          _ue345 = ["get", rh, ["quote", bias(_uid136)]];
        }
        var x = _ue345;
        if (is63(_uid136)) {
          var _ue346;
          if (v === true) {
            _ue346 = _uid136;
          } else {
            _ue346 = v;
          }
          var _uid140 = _ue346;
          bs = join(bs, bind(_uid140, x));
        }
      }
      return(bs);
    }
  }
};
bind42 = function (args, body) {
  var args1 = [];
  var rest = function () {
    if (target === "js") {
      return(["unstash", [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", _35(args1)]]);
    } else {
      add(args1, "|...|");
      return(["unstash", ["list", "|...|"]]);
    }
  };
  if (atom63(args)) {
    return([args1, join(["let", [args, rest()]], body)]);
  } else {
    var bs = [];
    var r = unique("r");
    var _ux56 = args;
    var k = undefined;
    for (k in _ux56) {
      var v = _ux56[k];
      var _ue347;
      if (numeric63(k)) {
        _ue347 = parseInt(k);
      } else {
        _ue347 = k;
      }
      var _uid158 = _ue347;
      if (number63(_uid158)) {
        if (atom63(v)) {
          add(args1, v);
        } else {
          var x = unique("x");
          add(args1, x);
          bs = join(bs, [v, x]);
        }
      }
    }
    if (keys63(args)) {
      bs = join(bs, [r, rest()]);
      bs = join(bs, [keys(args), r]);
    }
    return([args1, join(["let", bs], body)]);
  }
};
var quoting63 = function (depth) {
  return(number63(depth));
};
var quasiquoting63 = function (depth) {
  return(quoting63(depth) && depth > 0);
};
var can_unquote63 = function (depth) {
  return(quoting63(depth) && depth === 1);
};
var quasisplice63 = function (x, depth) {
  return(can_unquote63(depth) && obj63(x) && hd(x) === "unquote-splicing");
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return(macroexpand(symbol_expansion(form)));
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      var x = hd(form);
      if (x === "%local") {
        var _uignored1 = form[0];
        var name = form[1];
        var value = form[2];
        return(["%local", name, macroexpand(value)]);
      } else {
        if (x === "%function") {
          var _uignored2 = form[0];
          var args = form[1];
          var body = cut(form, 2);
          add(environment, {_scope: true});
          var _ux72 = args;
          var _uid174 = undefined;
          for (_uid174 in _ux72) {
            var _ux70 = _ux72[_uid174];
            var _ue349;
            if (numeric63(_uid174)) {
              _ue349 = parseInt(_uid174);
            } else {
              _ue349 = _uid174;
            }
            var _uid175 = _ue349;
            setenv(_ux70, {_stash: true, variable: true});
          }
          var _ux71 = join(["%function", args], macroexpand(body));
          drop(environment);
          return(_ux71);
        } else {
          if (x === "%local-function" || x === "%global-function") {
            var _uignored3 = form[0];
            var _uid177 = form[1];
            var _uid178 = form[2];
            var _uid179 = cut(form, 3);
            add(environment, {_scope: true});
            var _ux82 = _uid178;
            var _uid184 = undefined;
            for (_uid184 in _ux82) {
              var _ux80 = _ux82[_uid184];
              var _ue348;
              if (numeric63(_uid184)) {
                _ue348 = parseInt(_uid184);
              } else {
                _ue348 = _uid184;
              }
              var _uid185 = _ue348;
              setenv(_ux80, {_stash: true, variable: true});
            }
            var _ux81 = join([x, _uid177, _uid178], macroexpand(_uid179));
            drop(environment);
            return(_ux81);
          } else {
            if (macro63(x)) {
              return(macroexpand(apply(macro_function(x), tl(form))));
            } else {
              return(map(macroexpand, form));
            }
          }
        }
      }
    }
  }
};
var quasiquote_list = function (form, depth) {
  var xs = [["list"]];
  var _ux90 = form;
  var k = undefined;
  for (k in _ux90) {
    var v = _ux90[k];
    var _ue350;
    if (numeric63(k)) {
      _ue350 = parseInt(k);
    } else {
      _ue350 = k;
    }
    var _uid192 = _ue350;
    if (!number63(_uid192)) {
      var _ue351;
      if (quasisplice63(v, depth)) {
        _ue351 = quasiexpand(v[1]);
      } else {
        _ue351 = quasiexpand(v, depth);
      }
      var _uid193 = _ue351;
      last(xs)[_uid192] = _uid193;
    }
  }
  var _ux94 = form;
  var _un95 = _35(_ux94);
  var _ui96 = 0;
  while (_ui96 < _un95) {
    var x = _ux94[_ui96];
    if (quasisplice63(x, depth)) {
      var _uid197 = quasiexpand(x[1]);
      add(xs, _uid197);
      add(xs, ["list"]);
    } else {
      add(last(xs), quasiexpand(x, depth));
    }
    _ui96 = _ui96 + 1;
  }
  var pruned = keep(function (x) {
    return(_35(x) > 1 || !(hd(x) === "list") || keys63(x));
  }, xs);
  return(join(["join*"], pruned));
};
quasiexpand = function (form, depth) {
  if (quasiquoting63(depth)) {
    if (atom63(form)) {
      return(["quote", form]);
    } else {
      if (can_unquote63(depth) && hd(form) === "unquote") {
        return(quasiexpand(form[1]));
      } else {
        if (hd(form) === "unquote" || hd(form) === "unquote-splicing") {
          return(quasiquote_list(form, depth - 1));
        } else {
          if (hd(form) === "quasiquote") {
            return(quasiquote_list(form, depth + 1));
          } else {
            return(quasiquote_list(form, depth));
          }
        }
      }
    }
  } else {
    if (atom63(form)) {
      return(form);
    } else {
      if (hd(form) === "quote") {
        return(form);
      } else {
        if (hd(form) === "quasiquote") {
          return(quasiexpand(form[1], 1));
        } else {
          return(map(function (x) {
            return(quasiexpand(x, depth));
          }, form));
        }
      }
    }
  }
};
expand_if = function (_ux105) {
  var a = _ux105[0];
  var b = _ux105[1];
  var c = cut(_ux105, 2);
  if (is63(b)) {
    return([join(["%if", a, b], expand_if(c))]);
  } else {
    if (is63(a)) {
      return([a]);
    }
  }
};
indent_level = 0;
indentation = function () {
  var s = "";
  var _uignored4 = 0;
  while (_uignored4 < indent_level) {
    s = s + "  ";
    _uignored4 = _uignored4 + 1;
  }
  return(s);
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "finally": true, "for": true, "function": true, "if": true, "in": true, "instanceof": true, "new": true, "return": true, "switch": true, "this": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
reserved63 = function (x) {
  return(reserved[x]);
};
var valid_code63 = function (n) {
  return(number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95);
};
valid_id63 = function (id) {
  if (none63(id) || reserved63(id)) {
    return(false);
  } else {
    var i = 0;
    while (i < _35(id)) {
      if (!valid_code63(code(id, i))) {
        return(false);
      }
      i = i + 1;
    }
    return(true);
  }
};
key = function (k) {
  var i = inner(k);
  if (valid_id63(i)) {
    return(i);
  } else {
    if (target === "js") {
      return(k);
    } else {
      return("[" + k + "]");
    }
  }
};
mapo = function (f, t) {
  var o = [];
  var _ux115 = t;
  var k = undefined;
  for (k in _ux115) {
    var v = _ux115[k];
    var _ue352;
    if (numeric63(k)) {
      _ue352 = parseInt(k);
    } else {
      _ue352 = k;
    }
    var _uid1117 = _ue352;
    var x = f(v);
    if (is63(x)) {
      add(o, literal(_uid1117));
      add(o, x);
    }
  }
  return(o);
};
var _uid1120 = [];
var _uid121 = [];
_uid121.js = "!";
_uid121.lua = "not ";
_uid1120["not"] = _uid121;
var _uid1123 = [];
_uid1123["*"] = true;
_uid1123["/"] = true;
_uid1123["%"] = true;
var _uid1125 = [];
_uid1125["+"] = true;
_uid1125["-"] = true;
var _uid1127 = [];
var _uid128 = [];
_uid128.js = "+";
_uid128.lua = "..";
_uid1127.cat = _uid128;
var _uid1130 = [];
_uid1130["<"] = true;
_uid1130[">"] = true;
_uid1130["<="] = true;
_uid1130[">="] = true;
var _uid1132 = [];
var _uid133 = [];
_uid133.js = "===";
_uid133.lua = "==";
_uid1132["="] = _uid133;
var _uid1135 = [];
var _uid136 = [];
_uid136.js = "&&";
_uid136.lua = "and";
_uid1135["and"] = _uid136;
var _uid1138 = [];
var _uid139 = [];
_uid139.js = "||";
_uid139.lua = "or";
_uid1138["or"] = _uid139;
var infix = [_uid1120, _uid1123, _uid1125, _uid1127, _uid1130, _uid1132, _uid1135, _uid1138];
var unary63 = function (form) {
  return(_35(form) === 2 && in63(hd(form), ["not", "-"]));
};
var index = function (k) {
  return(k);
};
var precedence = function (form) {
  if (!(atom63(form) || unary63(form))) {
    var _ux144 = infix;
    var k = undefined;
    for (k in _ux144) {
      var v = _ux144[k];
      var _ue353;
      if (numeric63(k)) {
        _ue353 = parseInt(k);
      } else {
        _ue353 = k;
      }
      var _uid1146 = _ue353;
      if (v[hd(form)]) {
        return(index(_uid1146));
      }
    }
  }
  return(0);
};
var getop = function (op) {
  return(find(function (level) {
    var x = level[op];
    if (x === true) {
      return(op);
    } else {
      if (is63(x)) {
        return(x[target]);
      }
    }
  }, infix));
};
var infix63 = function (x) {
  return(is63(getop(x)));
};
var compile_args = function (args) {
  var s = "(";
  var c = "";
  var _ux151 = args;
  var _un152 = _35(_ux151);
  var _ui153 = 0;
  while (_ui153 < _un152) {
    var x = _ux151[_ui153];
    s = s + c + compile(x);
    c = ", ";
    _ui153 = _ui153 + 1;
  }
  return(s + ")");
};
var escape_newlines = function (s) {
  var s1 = "";
  var i = 0;
  while (i < _35(s)) {
    var c = char(s, i);
    var _ue354;
    if (c === "\n") {
      _ue354 = "\\n";
    } else {
      _ue354 = c;
    }
    s1 = s1 + _ue354;
    i = i + 1;
  }
  return(s1 + "");
};
var id = function (id) {
  var id1 = "";
  var i = 0;
  while (i < _35(id)) {
    var c = char(id, i);
    var n = code(c);
    var _ue355;
    if (c === "-") {
      _ue355 = "_";
    } else {
      var _ue356;
      if (valid_code63(n)) {
        _ue356 = c;
      } else {
        var _ue357;
        if (i === 0) {
          _ue357 = "_" + n;
        } else {
          _ue357 = n;
        }
        _ue356 = _ue357;
      }
      _ue355 = _ue356;
    }
    var c1 = _ue355;
    id1 = id1 + c1;
    i = i + 1;
  }
  return(id1);
};
var compile_atom = function (x) {
  if (x === "nil" && target === "lua") {
    return(x);
  } else {
    if (x === "nil") {
      return("undefined");
    } else {
      if (id_literal63(x)) {
        return(inner(x));
      } else {
        if (string_literal63(x)) {
          return(escape_newlines(x));
        } else {
          if (string63(x)) {
            return(id(x));
          } else {
            if (boolean63(x)) {
              if (x) {
                return("true");
              } else {
                return("false");
              }
            } else {
              if (number63(x)) {
                return(x + "");
              } else {
                throw new Error("Cannot compile atom: " + string(x));
              }
            }
          }
        }
      }
    }
  }
};
var terminator = function (stmt63) {
  if (!stmt63) {
    return("");
  } else {
    if (target === "js") {
      return(";\n");
    } else {
      return("\n");
    }
  }
};
var compile_special = function (form, stmt63) {
  var x = form[0];
  var args = cut(form, 1);
  var _uid159 = getenv(x);
  var special = _uid159.special;
  var stmt = _uid159.stmt;
  var self_tr63 = _uid159.tr;
  var tr = terminator(stmt63 && !self_tr63);
  return(apply(special, args) + tr);
};
var parenthesize_call63 = function (x) {
  return(obj63(x) && hd(x) === "%function" || precedence(x) > 0);
};
var compile_call = function (form) {
  var f = hd(form);
  var f1 = compile(f);
  var args = compile_args(stash42(tl(form)));
  if (parenthesize_call63(f)) {
    return("(" + f1 + ")" + args);
  } else {
    return(f1 + args);
  }
};
var op_delims = function (parent, child) {
  var _ur162 = unstash(Array.prototype.slice.call(arguments, 2));
  var right = _ur162.right;
  var _ue358;
  if (right) {
    _ue358 = _6261;
  } else {
    _ue358 = _62;
  }
  if (_ue358(precedence(child), precedence(parent))) {
    return(["(", ")"]);
  } else {
    return(["", ""]);
  }
};
var compile_infix = function (form) {
  var op = form[0];
  var _uid166 = cut(form, 1);
  var a = _uid166[0];
  var b = _uid166[1];
  var _uid167 = op_delims(form, a);
  var ao = _uid167[0];
  var ac = _uid167[1];
  var _uid168 = op_delims(form, b, {_stash: true, right: true});
  var bo = _uid168[0];
  var bc = _uid168[1];
  var _uid1169 = compile(a);
  var _uid1170 = compile(b);
  var _uid1171 = getop(op);
  if (unary63(form)) {
    return(_uid1171 + ao + _uid1169 + ac);
  } else {
    return(ao + _uid1169 + ac + " " + _uid1171 + " " + bo + _uid1170 + bc);
  }
};
compile_function = function (args, body) {
  var _ur172 = unstash(Array.prototype.slice.call(arguments, 2));
  var name = _ur172.name;
  var prefix = _ur172.prefix;
  var _ue359;
  if (name) {
    _ue359 = compile(name);
  } else {
    _ue359 = "";
  }
  var id = _ue359;
  var _uid1173 = compile_args(args);
  indent_level = indent_level + 1;
  var _ux175 = compile(body, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _uid1174 = _ux175;
  var ind = indentation();
  var _ue360;
  if (prefix) {
    _ue360 = prefix + " ";
  } else {
    _ue360 = "";
  }
  var p = _ue360;
  var _ue361;
  if (target === "js") {
    _ue361 = "";
  } else {
    _ue361 = "end";
  }
  var tr = _ue361;
  if (name) {
    tr = tr + "\n";
  }
  if (target === "js") {
    return("function " + id + _uid1173 + " {\n" + _uid1174 + ind + "}" + tr);
  } else {
    return(p + "function " + id + _uid1173 + "\n" + _uid1174 + ind + tr);
  }
};
var can_return63 = function (form) {
  return(is63(form) && (atom63(form) || !(hd(form) === "return") && !statement63(hd(form))));
};
compile = function (form) {
  var _ur177 = unstash(Array.prototype.slice.call(arguments, 1));
  var stmt = _ur177.stmt;
  if (nil63(form)) {
    return("");
  } else {
    if (special_form63(form)) {
      return(compile_special(form, stmt));
    } else {
      var tr = terminator(stmt);
      var _ue362;
      if (stmt) {
        _ue362 = indentation();
      } else {
        _ue362 = "";
      }
      var ind = _ue362;
      var _ue363;
      if (atom63(form)) {
        _ue363 = compile_atom(form);
      } else {
        var _ue364;
        if (infix63(hd(form))) {
          _ue364 = compile_infix(form);
        } else {
          _ue364 = compile_call(form);
        }
        _ue363 = _ue364;
      }
      var _uid1178 = _ue363;
      return(ind + _uid1178 + tr);
    }
  }
};
var lower_statement = function (form, tail63) {
  var hoist = [];
  var e = lower(form, hoist, true, tail63);
  if (some63(hoist) && is63(e)) {
    return(join(["do"], join(hoist, [e])));
  } else {
    if (is63(e)) {
      return(e);
    } else {
      if (_35(hoist) > 1) {
        return(join(["do"], hoist));
      } else {
        return(hd(hoist));
      }
    }
  }
};
var lower_body = function (body, tail63) {
  return(lower_statement(join(["do"], body), tail63));
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var _ux186 = butlast(args);
  var _un187 = _35(_ux186);
  var _ui188 = 0;
  while (_ui188 < _un187) {
    var x = _ux186[_ui188];
    add(hoist, lower(x, hoist, stmt63));
    _ui188 = _ui188 + 1;
  }
  var e = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(e)) {
    return(["return", e]);
  } else {
    return(e);
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var cond = args[0];
  var _uid1191 = args[1];
  var _uid1192 = args[2];
  if (stmt63 || tail63) {
    var _ue366;
    if (_uid1192) {
      _ue366 = [lower_body([_uid1192], tail63)];
    }
    return(add(hoist, join(["%if", lower(cond, hoist), lower_body([_uid1191], tail63)], _ue366)));
  } else {
    var e = unique("e");
    add(hoist, ["%local", e]);
    var _ue365;
    if (_uid1192) {
      _ue365 = [lower(["set", e, _uid1192])];
    }
    add(hoist, join(["%if", lower(cond, hoist), lower(["set", e, _uid1191])], _ue365));
    return(e);
  }
};
var lower_short = function (x, args, hoist) {
  var a = args[0];
  var b = args[1];
  var hoist1 = [];
  var b1 = lower(b, hoist1);
  if (some63(hoist1)) {
    var id = unique("id");
    var _ue367;
    if (x === "and") {
      _ue367 = ["%if", id, b, id];
    } else {
      _ue367 = ["%if", id, id, b];
    }
    return(lower(["do", ["%local", id, a], _ue367], hoist));
  } else {
    return([x, lower(a, hoist), b1]);
  }
};
var lower_try = function (args, hoist, tail63) {
  return(add(hoist, ["%try", lower_body(args, tail63)]));
};
var lower_while = function (args, hoist) {
  var c = args[0];
  var body = cut(args, 1);
  return(add(hoist, ["while", lower(c, hoist), lower_body(body)]));
};
var lower_for = function (args, hoist) {
  var t = args[0];
  var k = args[1];
  var body = cut(args, 2);
  return(add(hoist, ["%for", lower(t, hoist), k, lower_body(body)]));
};
var lower_function = function (args) {
  var a = args[0];
  var body = cut(args, 1);
  return(["%function", a, lower_body(body, true)]);
};
var lower_definition = function (kind, args, hoist) {
  var name = args[0];
  var _uid1217 = args[1];
  var body = cut(args, 2);
  return(add(hoist, [kind, name, _uid1217, lower_body(body, true)]));
};
var lower_call = function (form, hoist) {
  var _uid1220 = map(function (x) {
    return(lower(x, hoist));
  }, form);
  if (some63(_uid1220)) {
    return(_uid1220);
  }
};
var lower_infix63 = function (form) {
  return(infix63(hd(form)) && _35(form) > 3);
};
var lower_infix = function (form, hoist) {
  var x = form[0];
  var args = cut(form, 1);
  return(lower(reduce(function (a, b) {
    return([x, b, a]);
  }, reverse(args)), hoist));
};
var lower_special = function (form, hoist) {
  var e = lower_call(form, hoist);
  if (e) {
    return(add(hoist, e));
  }
};
lower = function (form, hoist, stmt63, tail63) {
  if (atom63(form)) {
    return(form);
  } else {
    if (empty63(form)) {
      return(["%array"]);
    } else {
      if (nil63(hoist)) {
        return(lower_statement(form));
      } else {
        if (lower_infix63(form)) {
          return(lower_infix(form, hoist));
        } else {
          var x = form[0];
          var args = cut(form, 1);
          if (x === "do") {
            return(lower_do(args, hoist, stmt63, tail63));
          } else {
            if (x === "%if") {
              return(lower_if(args, hoist, stmt63, tail63));
            } else {
              if (x === "%try") {
                return(lower_try(args, hoist, tail63));
              } else {
                if (x === "while") {
                  return(lower_while(args, hoist));
                } else {
                  if (x === "%for") {
                    return(lower_for(args, hoist));
                  } else {
                    if (x === "%function") {
                      return(lower_function(args));
                    } else {
                      if (x === "%local-function" || x === "%global-function") {
                        return(lower_definition(x, args, hoist));
                      } else {
                        if (in63(x, ["and", "or"])) {
                          return(lower_short(x, args, hoist));
                        } else {
                          if (statement63(x)) {
                            return(lower_special(form, hoist));
                          } else {
                            return(lower_call(form, hoist));
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
var expand = function (form) {
  return(lower(macroexpand(form)));
};
global.require = require;
var run = eval;
_37result = undefined;
eval = function (form) {
  var previous = target;
  target = "js";
  var code = compile(expand(["set", "%result", form]));
  target = previous;
  run(code);
  return(_37result);
};
var run_file = function (path) {
  return(run(read_file(path)));
};
var compile_file = function (path) {
  var s = reader.stream(read_file(path));
  var body = reader["read-all"](s);
  var form = expand(join(["do"], body));
  return(compile(form, {_stash: true, stmt: true}));
};
setenv("do", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "";
  var _ux239 = forms;
  var _un240 = _35(_ux239);
  var _ui241 = 0;
  while (_ui241 < _un240) {
    var x = _ux239[_ui241];
    s = s + compile(x, {_stash: true, stmt: true});
    _ui241 = _ui241 + 1;
  }
  return(s);
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var _uid1250 = compile(cond);
  indent_level = indent_level + 1;
  var _ux252 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var _uid1251 = _ux252;
  var _ue368;
  if (alt) {
    indent_level = indent_level + 1;
    var _ux254 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    _ue368 = _ux254;
  }
  var _uid1253 = _ue368;
  var ind = indentation();
  var s = "";
  if (target === "js") {
    s = s + ind + "if (" + _uid1250 + ") {\n" + _uid1251 + ind + "}";
  } else {
    s = s + ind + "if " + _uid1250 + " then\n" + _uid1251;
  }
  if (_uid1253 && target === "js") {
    s = s + " else {\n" + _uid1253 + ind + "}";
  } else {
    if (_uid1253) {
      s = s + ind + "else\n" + _uid1253;
    }
  }
  if (target === "lua") {
    return(s + ind + "end\n");
  } else {
    return(s + "\n");
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var _uid1259 = compile(cond);
  indent_level = indent_level + 1;
  var _ux260 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux260;
  var ind = indentation();
  if (target === "js") {
    return(ind + "while (" + _uid1259 + ") {\n" + body + ind + "}\n");
  } else {
    return(ind + "while " + _uid1259 + " do\n" + body + ind + "end\n");
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var _uid1265 = compile(t);
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux266 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux266;
  if (target === "lua") {
    return(ind + "for " + k + " in next, " + _uid1265 + " do\n" + body + ind + "end\n");
  } else {
    return(ind + "for (" + k + " in " + _uid1265 + ") {\n" + body + ind + "}\n");
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var e = unique("e");
  var ind = indentation();
  indent_level = indent_level + 1;
  var _ux274 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var body = _ux274;
  var hf = ["return", ["%array", false, ["get", e, "\"message\""]]];
  indent_level = indent_level + 1;
  var _ux278 = compile(hf, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var h = _ux278;
  return(ind + "try {\n" + body + ind + "}\n" + ind + "catch (" + e + ") {\n" + h + ind + "}\n");
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  return(indentation() + "delete " + compile(place));
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return(indentation() + "break");
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return(compile_function(args, body));
}});
setenv("%global-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name});
    return(indentation() + x);
  } else {
    return(compile(["set", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var x = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return(indentation() + x);
  } else {
    return(compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true}));
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var _ue369;
  if (nil63(x)) {
    _ue369 = "return";
  } else {
    _ue369 = "return(" + compile(x) + ")";
  }
  var _uid1301 = _ue369;
  return(indentation() + _uid1301);
}, stmt: true});
setenv("error", {_stash: true, special: function (x) {
  var _ue370;
  if (target === "js") {
    _ue370 = "throw new " + compile(["Error", x]);
  } else {
    _ue370 = "error(" + compile(x) + ")";
  }
  var e = _ue370;
  return(indentation() + e);
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var id = compile(name);
  var value1 = compile(value);
  var _ue371;
  if (is63(value)) {
    _ue371 = " = " + value1;
  } else {
    _ue371 = "";
  }
  var rh = _ue371;
  var _ue372;
  if (target === "js") {
    _ue372 = "var ";
  } else {
    _ue372 = "local ";
  }
  var keyword = _ue372;
  var ind = indentation();
  return(ind + keyword + id + rh);
}, stmt: true});
setenv("set", {_stash: true, special: function (lh, rh) {
  var _uid1316 = compile(lh);
  var _ue373;
  if (nil63(rh)) {
    _ue373 = "nil";
  } else {
    _ue373 = rh;
  }
  var _uid1317 = compile(_ue373);
  return(indentation() + _uid1316 + " = " + _uid1317);
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var _uid1321 = compile(t);
  var k1 = compile(k);
  if (target === "lua" && char(_uid1321, 0) === "{") {
    _uid1321 = "(" + _uid1321 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k))) {
    return(_uid1321 + "." + inner(k));
  } else {
    return(_uid1321 + "[" + k1 + "]");
  }
}});
setenv("%array", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var _ue374;
  if (target === "lua") {
    _ue374 = "{";
  } else {
    _ue374 = "[";
  }
  var open = _ue374;
  var _ue375;
  if (target === "lua") {
    _ue375 = "}";
  } else {
    _ue375 = "]";
  }
  var close = _ue375;
  var s = "";
  var c = "";
  var _ux328 = forms;
  var k = undefined;
  for (k in _ux328) {
    var v = _ux328[k];
    var _ue376;
    if (numeric63(k)) {
      _ue376 = parseInt(k);
    } else {
      _ue376 = k;
    }
    var _uid1330 = _ue376;
    if (number63(_uid1330)) {
      s = s + c + compile(v);
      c = ", ";
    }
  }
  return(open + s + close);
}});
setenv("%object", {_stash: true, special: function () {
  var forms = unstash(Array.prototype.slice.call(arguments, 0));
  var s = "{";
  var c = "";
  var _ue377;
  if (target === "lua") {
    _ue377 = " = ";
  } else {
    _ue377 = ": ";
  }
  var sep = _ue377;
  var _ux338 = pair(forms);
  var k = undefined;
  for (k in _ux338) {
    var v = _ux338[k];
    var _ue378;
    if (numeric63(k)) {
      _ue378 = parseInt(k);
    } else {
      _ue378 = k;
    }
    var _uid1340 = _ue378;
    if (number63(_uid1340)) {
      var _uid1341 = v[0];
      var _uid1342 = v[1];
      if (!string63(_uid1341)) {
        throw new Error("Illegal key: " + string(_uid1341));
      }
      s = s + c + key(_uid1341) + sep + compile(_uid1342);
      c = ", ";
    }
  }
  return(s + "}");
}});
exports.eval = eval;
exports["run-file"] = run_file;
exports["compile-file"] = compile_file;
exports.expand = expand;
exports.compile = compile;