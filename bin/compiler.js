var reader = require("reader");
var getenv = function (k, p) {
  if (string63(k)) {
    var __i10 = edge(environment);
    while (__i10 >= 0) {
      var __b2 = environment[__i10][k];
      if (is63(__b2)) {
        var __e35;
        if (p) {
          __e35 = __b2[p];
        } else {
          __e35 = __b2;
        }
        return __e35;
      } else {
        __i10 = __i10 - 1;
      }
    }
  }
};
var macro_function = function (k) {
  return getenv(k, "macro");
};
var macro63 = function (k) {
  return is63(macro_function(k));
};
var special63 = function (k) {
  return is63(getenv(k, "special"));
};
var special_form63 = function (form) {
  return ! atom63(form) && special63(hd(form));
};
var statement63 = function (k) {
  return special63(k) && getenv(k, "stmt");
};
var symbol_expansion = function (k) {
  return getenv(k, "symbol");
};
var symbol63 = function (k) {
  return is63(symbol_expansion(k));
};
var variable63 = function (k) {
  return is63(getenv(k, "variable"));
};
bound63 = function (x) {
  return macro63(x) || special63(x) || symbol63(x) || variable63(x);
};
quoted = function (form) {
  if (string63(form)) {
    return escape(form);
  } else {
    if (atom63(form)) {
      return form;
    } else {
      return join(["list"], map(quoted, form));
    }
  }
};
var literal = function (s) {
  if (string_literal63(s)) {
    return s;
  } else {
    return quoted(s);
  }
};
var stash42 = function (args) {
  if (keys63(args)) {
    var __l4 = ["%object", "\"_stash\"", true];
    var ____o6 = args;
    var __k6 = undefined;
    for (__k6 in ____o6) {
      var __v10 = ____o6[__k6];
      var __e36;
      if (numeric63(__k6)) {
        __e36 = parseInt(__k6);
      } else {
        __e36 = __k6;
      }
      var __k7 = __e36;
      if (! number63(__k7)) {
        add(__l4, literal(__k7));
        add(__l4, __v10);
      }
    }
    return join(args, [__l4]);
  } else {
    return args;
  }
};
var bias = function (k) {
  if (number63(k) && !( target === "js")) {
    if (target === "js") {
      k = k - 1;
    } else {
      k = k + 1;
    }
  }
  return k;
};
bind = function (lh, rh) {
  if (atom63(lh)) {
    return [lh, rh];
  } else {
    var __id62 = unique("id");
    var __bs8 = [__id62, rh];
    var ____o7 = lh;
    var __k8 = undefined;
    for (__k8 in ____o7) {
      var __v11 = ____o7[__k8];
      var __e37;
      if (numeric63(__k8)) {
        __e37 = parseInt(__k8);
      } else {
        __e37 = __k8;
      }
      var __k9 = __e37;
      var __e38;
      if (__k9 === "rest") {
        __e38 = ["cut", __id62, _35(lh)];
      } else {
        __e38 = ["get", __id62, ["quote", bias(__k9)]];
      }
      var __x363 = __e38;
      if (is63(__k9)) {
        var __e39;
        if (__v11 === true) {
          __e39 = __k9;
        } else {
          __e39 = __v11;
        }
        var __k10 = __e39;
        __bs8 = join(__bs8, bind(__k10, __x363));
      }
    }
    return __bs8;
  }
};
setenv("arguments%", {_stash: true, macro: function (from) {
  return [["get", ["get", ["get", "Array", ".prototype"], ".slice"], ".call"], "arguments", from];
}});
bind42 = function (args, body) {
  var __args11 = [];
  var rest = function () {
    __args11["rest"] = true;
    if (target === "js") {
      return ["unstash", ["arguments%", _35(__args11)]];
    } else {
      return ["unstash", ["list", "|...|"]];
    }
  };
  if (atom63(args)) {
    return [__args11, join(["let", [args, rest()]], body)];
  } else {
    var __bs9 = [];
    var __r99 = unique("r");
    var ____o8 = args;
    var __k11 = undefined;
    for (__k11 in ____o8) {
      var __v12 = ____o8[__k11];
      var __e40;
      if (numeric63(__k11)) {
        __e40 = parseInt(__k11);
      } else {
        __e40 = __k11;
      }
      var __k12 = __e40;
      if (number63(__k12)) {
        if (atom63(__v12)) {
          add(__args11, __v12);
        } else {
          var __x382 = unique("x");
          add(__args11, __x382);
          __bs9 = join(__bs9, [__v12, __x382]);
        }
      }
    }
    if (keys63(args)) {
      __bs9 = join(__bs9, [__r99, rest()]);
      var __n9 = _35(__args11);
      var __i14 = 0;
      while (__i14 < __n9) {
        var __v13 = __args11[__i14];
        __bs9 = join(__bs9, [__v13, ["destash!", __v13, __r99]]);
        __i14 = __i14 + 1;
      }
      __bs9 = join(__bs9, [keys(args), __r99]);
    }
    return [__args11, join(["let", __bs9], body)];
  }
};
var quoting63 = function (depth) {
  return number63(depth);
};
var quasiquoting63 = function (depth) {
  return quoting63(depth) && depth > 0;
};
var can_unquote63 = function (depth) {
  return quoting63(depth) && depth === 1;
};
var quasisplice63 = function (x, depth) {
  return can_unquote63(depth) && ! atom63(x) && hd(x) === "unquote-splicing";
};
var expand_local = function (__x390) {
  var ____id63 = __x390;
  var __x391 = ____id63[0];
  var __name10 = ____id63[1];
  var __value = ____id63[2];
  setenv(__name10, {_stash: true, variable: true});
  return ["%local", __name10, macroexpand(__value)];
};
var expand_function = function (__x393) {
  var ____id64 = __x393;
  var __x394 = ____id64[0];
  var __args10 = ____id64[1];
  var __body46 = cut(____id64, 2);
  add(environment, {});
  var ____o9 = __args10;
  var ____i15 = undefined;
  for (____i15 in ____o9) {
    var ____x395 = ____o9[____i15];
    var __e41;
    if (numeric63(____i15)) {
      __e41 = parseInt(____i15);
    } else {
      __e41 = ____i15;
    }
    var ____i151 = __e41;
    setenv(____x395, {_stash: true, variable: true});
  }
  var ____x396 = join(["%function", __args10], macroexpand(__body46));
  drop(environment);
  return ____x396;
};
var expand_definition = function (__x398) {
  var ____id65 = __x398;
  var __x399 = ____id65[0];
  var __name11 = ____id65[1];
  var __args111 = ____id65[2];
  var __body47 = cut(____id65, 3);
  add(environment, {});
  var ____o10 = __args111;
  var ____i16 = undefined;
  for (____i16 in ____o10) {
    var ____x400 = ____o10[____i16];
    var __e42;
    if (numeric63(____i16)) {
      __e42 = parseInt(____i16);
    } else {
      __e42 = ____i16;
    }
    var ____i161 = __e42;
    setenv(____x400, {_stash: true, variable: true});
  }
  var ____x401 = join([__x399, __name11, __args111], macroexpand(__body47));
  drop(environment);
  return ____x401;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x403) {
  var ____id66 = __x403;
  var __name12 = ____id66[0];
  var __body48 = cut(____id66, 1);
  return apply(macro_function(__name12), __body48);
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return macroexpand(symbol_expansion(form));
  } else {
    if (atom63(form)) {
      return form;
    } else {
      var __x404 = hd(form);
      if (__x404 === "%local") {
        return expand_local(form);
      } else {
        if (__x404 === "%function") {
          return expand_function(form);
        } else {
          if (__x404 === "%global-function") {
            return expand_definition(form);
          } else {
            if (__x404 === "%local-function") {
              return expand_definition(form);
            } else {
              if (macro63(__x404)) {
                return expand_macro(form);
              } else {
                return map(macroexpand, form);
              }
            }
          }
        }
      }
    }
  }
};
var quasiquote_list = function (form, depth) {
  var __xs2 = [["list"]];
  var ____o11 = form;
  var __k13 = undefined;
  for (__k13 in ____o11) {
    var __v14 = ____o11[__k13];
    var __e43;
    if (numeric63(__k13)) {
      __e43 = parseInt(__k13);
    } else {
      __e43 = __k13;
    }
    var __k14 = __e43;
    if (! number63(__k14)) {
      var __e44;
      if (quasisplice63(__v14, depth)) {
        __e44 = quasiexpand(__v14[1]);
      } else {
        __e44 = quasiexpand(__v14, depth);
      }
      var __v15 = __e44;
      last(__xs2)[__k14] = __v15;
    }
  }
  var ____x407 = form;
  var ____i18 = 0;
  while (____i18 < _35(____x407)) {
    var __x408 = ____x407[____i18];
    if (quasisplice63(__x408, depth)) {
      var __x409 = quasiexpand(__x408[1]);
      add(__xs2, __x409);
      add(__xs2, ["list"]);
    } else {
      add(last(__xs2), quasiexpand(__x408, depth));
    }
    ____i18 = ____i18 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || !( hd(x) === "list") || keys63(x);
  }, __xs2);
  if (one63(__pruned)) {
    return hd(__pruned);
  } else {
    return join(["join"], __pruned);
  }
};
quasiexpand = function (form, depth) {
  if (quasiquoting63(depth)) {
    if (atom63(form)) {
      return ["quote", form];
    } else {
      if (can_unquote63(depth) && hd(form) === "unquote") {
        return quasiexpand(form[1]);
      } else {
        if (hd(form) === "unquote" || hd(form) === "unquote-splicing") {
          return quasiquote_list(form, depth - 1);
        } else {
          if (hd(form) === "quasiquote") {
            return quasiquote_list(form, depth + 1);
          } else {
            return quasiquote_list(form, depth);
          }
        }
      }
    }
  } else {
    if (atom63(form)) {
      return form;
    } else {
      if (hd(form) === "quote") {
        return form;
      } else {
        if (hd(form) === "quasiquote") {
          return quasiexpand(form[1], 1);
        } else {
          return map(function (x) {
            return quasiexpand(x, depth);
          }, form);
        }
      }
    }
  }
};
expand_if = function (__x413) {
  var ____id67 = __x413;
  var __a6 = ____id67[0];
  var __b3 = ____id67[1];
  var __c = cut(____id67, 2);
  if (is63(__b3)) {
    return [join(["%if", __a6, __b3], expand_if(__c))];
  } else {
    if (is63(__a6)) {
      return [__a6];
    }
  }
};
indent_level = 0;
indentation = function () {
  var __s2 = "";
  var __i19 = 0;
  while (__i19 < indent_level) {
    __s2 = __s2 + "  ";
    __i19 = __i19 + 1;
  }
  return __s2;
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "class": true, "const": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "eval": true, "finally": true, "for": true, "function": true, "if": true, "import": true, "in": true, "instanceof": true, "let": true, "new": true, "return": true, "switch": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "load": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true};
reserved63 = function (x) {
  return has63(reserved, x);
};
var valid_code63 = function (n) {
  return number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95;
};
accessor_literal63 = function (x) {
  return string63(x) && _35(x) > 1 && char(x, 0) === "." && !( char(x, 1) === ".");
};
var id = function (id) {
  var __e45;
  if (accessor_literal63(id)) {
    __e45 = clip(id, 1);
  } else {
    __e45 = id;
  }
  var __id0 = __e45;
  var __e46;
  if (number_code63(code(__id0, 0))) {
    __e46 = "_";
  } else {
    __e46 = "";
  }
  var __id131 = __e46;
  var __i20 = 0;
  while (__i20 < _35(__id0)) {
    var __c1 = char(__id0, __i20);
    var __n13 = code(__c1);
    var __e47;
    if (__c1 === "-" && !( __id0 === "-")) {
      __e47 = "_";
    } else {
      var __e48;
      if (valid_code63(__n13)) {
        __e48 = __c1;
      } else {
        var __e49;
        if (__i20 === 0) {
          __e49 = "_" + __n13;
        } else {
          __e49 = __n13;
        }
        __e48 = __e49;
      }
      __e47 = __e48;
    }
    var __c11 = __e47;
    __id131 = __id131 + __c11;
    __i20 = __i20 + 1;
  }
  if (reserved63(__id131)) {
    return "_" + __id131;
  } else {
    return __id131;
  }
};
valid_id63 = function (x) {
  return some63(x) && x === id(x);
};
var __names6 = {};
unique = function (x) {
  var __x417 = id(x);
  if (__names6[__x417]) {
    var __i21 = __names6[__x417];
    __names6[__x417] = __names6[__x417] + 1;
    return unique(__x417 + __i21);
  } else {
    __names6[__x417] = 1;
    return "__" + __x417;
  }
};
key = function (k) {
  var __i22 = inner(k);
  if (valid_id63(__i22)) {
    return __i22;
  } else {
    if (target === "js") {
      return k;
    } else {
      return "[" + k + "]";
    }
  }
};
mapo = function (f, t) {
  var __o12 = [];
  var ____o13 = t;
  var __k15 = undefined;
  for (__k15 in ____o13) {
    var __v16 = ____o13[__k15];
    var __e50;
    if (numeric63(__k15)) {
      __e50 = parseInt(__k15);
    } else {
      __e50 = __k15;
    }
    var __k16 = __e50;
    var __x418 = f(__v16);
    if (is63(__x418)) {
      add(__o12, literal(__k16));
      add(__o12, __x418);
    }
  }
  return __o12;
};
var ____x420 = [];
var ____x421 = [];
____x421["js"] = "!";
____x421["lua"] = "not";
____x420["not"] = ____x421;
var ____x422 = [];
____x422["*"] = true;
____x422["/"] = true;
____x422["%"] = true;
var ____x423 = [];
var ____x424 = [];
____x424["js"] = "+";
____x424["lua"] = "..";
____x423["cat"] = ____x424;
var ____x425 = [];
____x425["+"] = true;
____x425["-"] = true;
var ____x426 = [];
____x426["<"] = true;
____x426[">"] = true;
____x426["<="] = true;
____x426[">="] = true;
var ____x427 = [];
var ____x428 = [];
____x428["js"] = "===";
____x428["lua"] = "==";
____x427["="] = ____x428;
var ____x429 = [];
var ____x430 = [];
____x430["js"] = "&&";
____x430["lua"] = "and";
____x429["and"] = ____x430;
var ____x431 = [];
var ____x432 = [];
____x432["js"] = "||";
____x432["lua"] = "or";
____x431["or"] = ____x432;
var infix = [____x420, ____x422, ____x423, ____x425, ____x426, ____x427, ____x429, ____x431];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o14 = infix;
    var __k17 = undefined;
    for (__k17 in ____o14) {
      var __v17 = ____o14[__k17];
      var __e51;
      if (numeric63(__k17)) {
        __e51 = parseInt(__k17);
      } else {
        __e51 = __k17;
      }
      var __k18 = __e51;
      if (__v17[hd(form)]) {
        return index(__k18);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x434 = level[op];
    if (__x434 === true) {
      return op;
    } else {
      if (is63(__x434)) {
        return __x434[target];
      }
    }
  }, infix);
};
var infix63 = function (x) {
  return is63(getop(x));
};
infix_operator63 = function (x) {
  return obj63(x) && infix63(hd(x));
};
var compile_args = function (args) {
  var __s3 = "(";
  var __c2 = "";
  var ____x435 = args;
  var ____i25 = 0;
  while (____i25 < _35(____x435)) {
    var __x436 = ____x435[____i25];
    __s3 = __s3 + __c2 + compile(__x436);
    __c2 = ", ";
    ____i25 = ____i25 + 1;
  }
  return __s3 + ")";
};
var escape_newlines = function (s) {
  var __s11 = "";
  var __i26 = 0;
  while (__i26 < _35(s)) {
    var __c3 = char(s, __i26);
    var __e52;
    if (__c3 === "\n") {
      __e52 = "\\n";
    } else {
      var __e53;
      if (__c3 === "\r") {
        __e53 = "\\r";
      } else {
        __e53 = __c3;
      }
      __e52 = __e53;
    }
    __s11 = __s11 + __e52;
    __i26 = __i26 + 1;
  }
  return __s11;
};
var compile_atom = function (x) {
  if (x === "nil" && target === "lua") {
    return x;
  } else {
    if (x === "nil") {
      return "undefined";
    } else {
      if (id_literal63(x)) {
        return inner(x);
      } else {
        if (string_literal63(x)) {
          return escape_newlines(x);
        } else {
          if (string63(x)) {
            return id(x);
          } else {
            if (boolean63(x)) {
              if (x) {
                return "true";
              } else {
                return "false";
              }
            } else {
              if (nan63(x)) {
                return "nan";
              } else {
                if (x === inf) {
                  return "inf";
                } else {
                  if (x === _inf) {
                    return "-inf";
                  } else {
                    if (number63(x)) {
                      return x + "";
                    } else {
                      return error("Cannot compile atom: " + str(x));
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
var terminator = function (stmt63) {
  if (! stmt63) {
    return "";
  } else {
    if (target === "js") {
      return ";\n";
    } else {
      return "\n";
    }
  }
};
var compile_special = function (form, stmt63) {
  var ____id68 = form;
  var __x437 = ____id68[0];
  var __args12 = cut(____id68, 1);
  var ____id69 = getenv(__x437);
  var __special = ____id69["special"];
  var __stmt = ____id69["stmt"];
  var __self_tr63 = ____id69["tr"];
  var __tr = terminator(stmt63 && ! __self_tr63);
  return apply(__special, __args12) + __tr;
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var compile_call = function (form) {
  var __f2 = hd(form);
  var __f11 = compile(__f2);
  var __args13 = compile_args(stash42(tl(form)));
  if (parenthesize_call63(__f2)) {
    return "(" + __f11 + ")" + __args13;
  } else {
    return __f11 + __args13;
  }
};
var op_delims = function (parent, child) {
  var ____r138 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r138);
  var __child = destash33(child, ____r138);
  var ____id70 = ____r138;
  var __right = ____id70["right"];
  var __e54;
  if (__right) {
    __e54 = _6261;
  } else {
    __e54 = _62;
  }
  if (__e54(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id71 = form;
  var __op = ____id71[0];
  var ____id72 = cut(____id71, 1);
  var __a7 = ____id72[0];
  var __b4 = ____id72[1];
  var ____id73 = op_delims(form, __a7);
  var __ao = ____id73[0];
  var __ac = ____id73[1];
  var ____id74 = op_delims(form, __b4, {_stash: true, right: true});
  var __bo = ____id74[0];
  var __bc = ____id74[1];
  var __a8 = compile(__a7);
  var __b5 = compile(__b4);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + __ao + " " + __a8 + __ac;
  } else {
    return __ao + __a8 + __ac + " " + __op1 + " " + __bo + __b5 + __bc;
  }
};
compile_function = function (args, body) {
  var ____r140 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args14 = destash33(args, ____r140);
  var __body49 = destash33(body, ____r140);
  var ____id75 = ____r140;
  var __name13 = ____id75["name"];
  var __prefix = ____id75["prefix"];
  var __e55;
  if (__name13) {
    __e55 = compile(__name13);
  } else {
    __e55 = "";
  }
  var __id76 = __e55;
  var __e56;
  if (target === "lua" && __args14["rest"]) {
    __e56 = join(__args14, ["|...|"]);
  } else {
    __e56 = __args14;
  }
  var __args121 = __e56;
  var __args15 = compile_args(__args121);
  indent_level = indent_level + 1;
  var ____x441 = compile(__body49, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body50 = ____x441;
  var __ind = indentation();
  var __e57;
  if (__prefix) {
    __e57 = __prefix + " ";
  } else {
    __e57 = "";
  }
  var __p = __e57;
  var __e58;
  if (target === "js") {
    __e58 = "";
  } else {
    __e58 = "end";
  }
  var __tr1 = __e58;
  if (__name13) {
    __tr1 = __tr1 + "\n";
  }
  if (target === "js") {
    return "function " + __id76 + __args15 + " {\n" + __body50 + __ind + "}" + __tr1;
  } else {
    return __p + "function " + __id76 + __args15 + "\n" + __body50 + __ind + __tr1;
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r142 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form6 = destash33(form, ____r142);
  var ____id77 = ____r142;
  var __stmt1 = ____id77["stmt"];
  if (nil63(__form6)) {
    return "";
  } else {
    if (special_form63(__form6)) {
      return compile_special(__form6, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e59;
      if (__stmt1) {
        __e59 = indentation();
      } else {
        __e59 = "";
      }
      var __ind1 = __e59;
      var __e60;
      if (atom63(__form6)) {
        __e60 = compile_atom(__form6);
      } else {
        var __e61;
        if (infix63(hd(__form6))) {
          __e61 = compile_infix(__form6);
        } else {
          __e61 = compile_call(__form6);
        }
        __e60 = __e61;
      }
      var __form7 = __e60;
      return __ind1 + __form7 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e14 = lower(form, __hoist, true, tail63);
  var __e62;
  if (some63(__hoist) && is63(__e14)) {
    __e62 = join(["do"], __hoist, [__e14]);
  } else {
    var __e63;
    if (is63(__e14)) {
      __e63 = __e14;
    } else {
      var __e64;
      if (_35(__hoist) > 1) {
        __e64 = join(["do"], __hoist);
      } else {
        __e64 = hd(__hoist);
      }
      __e63 = __e64;
    }
    __e62 = __e63;
  }
  return either(__e62, ["do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || hd(form) === "%array" || hd(form) === "%object";
};
var standalone63 = function (form) {
  return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) || id_literal63(form);
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x447 = almost(args);
  var ____i27 = 0;
  while (____i27 < _35(____x447)) {
    var __x448 = ____x447[____i27];
    var ____y2 = lower(__x448, hoist, stmt63);
    if (yes(____y2)) {
      var __e15 = ____y2;
      if (standalone63(__e15)) {
        add(hoist, __e15);
      }
    }
    ____i27 = ____i27 + 1;
  }
  var __e16 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e16)) {
    return ["return", __e16];
  } else {
    return __e16;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id78 = args;
  var __lh4 = ____id78[0];
  var __rh4 = ____id78[1];
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id79 = args;
  var __cond4 = ____id79[0];
  var ___then = ____id79[1];
  var ___else = ____id79[2];
  if (stmt63) {
    var __e66;
    if (is63(___else)) {
      __e66 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond4, hoist), lower_body([___then], tail63)], __e66));
  } else {
    var __e17 = unique("e");
    add(hoist, ["%local", __e17]);
    var __e65;
    if (is63(___else)) {
      __e65 = [lower(["%set", __e17, ___else])];
    }
    add(hoist, join(["%if", lower(__cond4, hoist), lower(["%set", __e17, ___then])], __e65));
    return __e17;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id80 = args;
  var __a9 = ____id80[0];
  var __b6 = ____id80[1];
  var __hoist1 = [];
  var __b11 = lower(__b6, __hoist1);
  if (some63(__hoist1)) {
    var __id81 = unique("id");
    var __e67;
    if (x === "and") {
      __e67 = ["%if", __id81, __b6, __id81];
    } else {
      __e67 = ["%if", __id81, __id81, __b6];
    }
    return lower(["do", ["%local", __id81, __a9], __e67], hoist);
  } else {
    return [x, lower(__a9, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id82 = args;
  var __c4 = ____id82[0];
  var __body51 = cut(____id82, 1);
  var __pre = [];
  var __c5 = lower(__c4, __pre);
  var __e68;
  if (none63(__pre)) {
    __e68 = ["while", __c5, lower_body(__body51)];
  } else {
    __e68 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body51)])];
  }
  return add(hoist, __e68);
};
var lower_for = function (args, hoist) {
  var ____id83 = args;
  var __t4 = ____id83[0];
  var __k19 = ____id83[1];
  var __body52 = cut(____id83, 2);
  return add(hoist, ["%for", lower(__t4, hoist), __k19, lower_body(__body52)]);
};
var lower_function = function (args) {
  var ____id84 = args;
  var __a10 = ____id84[0];
  var __body53 = cut(____id84, 1);
  return ["%function", __a10, lower_body(__body53, true)];
};
var lower_definition = function (kind, args, hoist) {
  var ____id85 = args;
  var __name14 = ____id85[0];
  var __args16 = ____id85[1];
  var __body54 = cut(____id85, 2);
  return add(hoist, [kind, __name14, __args16, lower_body(__body54, true)]);
};
var lower_call = function (form, hoist) {
  var __form8 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form8)) {
    return __form8;
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e18 = [];
    var ____id86 = form;
    var __x477 = ____id86[0];
    var __args17 = cut(____id86, 1);
    reduce(function (a, b) {
      add(__e18, [__x477, a, b]);
      return a;
    }, __args17);
    return join(["and"], reverse(__e18));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form9 = lower_pairwise(form);
  var ____id87 = __form9;
  var __x480 = ____id87[0];
  var __args18 = cut(____id87, 1);
  return lower(reduce(function (a, b) {
    return [__x480, b, a];
  }, reverse(__args18)), hoist);
};
var lower_special = function (form, hoist) {
  var __e19 = lower_call(form, hoist);
  if (__e19) {
    return add(hoist, __e19);
  }
};
lower = function (form, hoist, stmt63, tail63) {
  if (atom63(form)) {
    return form;
  } else {
    if (empty63(form)) {
      return ["%array"];
    } else {
      if (nil63(hoist)) {
        return lower_statement(form);
      } else {
        if (lower_infix63(form)) {
          return lower_infix(form, hoist);
        } else {
          var ____id88 = form;
          var __x483 = ____id88[0];
          var __args19 = cut(____id88, 1);
          if (__x483 === "do") {
            return lower_do(__args19, hoist, stmt63, tail63);
          } else {
            if (__x483 === "%call") {
              return lower(__args19, hoist, stmt63, tail63);
            } else {
              if (__x483 === "%set") {
                return lower_set(__args19, hoist, stmt63, tail63);
              } else {
                if (__x483 === "%if") {
                  return lower_if(__args19, hoist, stmt63, tail63);
                } else {
                  if (__x483 === "%try") {
                    return lower_try(__args19, hoist, tail63);
                  } else {
                    if (__x483 === "while") {
                      return lower_while(__args19, hoist);
                    } else {
                      if (__x483 === "%for") {
                        return lower_for(__args19, hoist);
                      } else {
                        if (__x483 === "%function") {
                          return lower_function(__args19);
                        } else {
                          if (__x483 === "%local-function" || __x483 === "%global-function") {
                            return lower_definition(__x483, __args19, hoist);
                          } else {
                            if (in63(__x483, ["and", "or"])) {
                              return lower_short(__x483, __args19, hoist);
                            } else {
                              if (statement63(__x483)) {
                                return lower_special(form, hoist);
                              } else {
                                return lower_call(form, hoist);
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
    }
  }
};
expand = function (form) {
  return lower(macroexpand(form));
};
global.require = require;
var run = eval;
_37result = undefined;
_eval = function (form) {
  var __previous = target;
  target = "js";
  var __code = compile(expand(["set", "%result", form]));
  target = __previous;
  run(__code);
  return _37result;
};
immediate_call63 = function (x) {
  return obj63(x) && obj63(hd(x)) && hd(hd(x)) === "%function";
};
setenv("do", {_stash: true, special: function () {
  var __forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s5 = "";
  var ____x488 = __forms3;
  var ____i29 = 0;
  while (____i29 < _35(____x488)) {
    var __x489 = ____x488[____i29];
    if (target === "lua" && immediate_call63(__x489) && "\n" === char(__s5, edge(__s5))) {
      __s5 = clip(__s5, 0, edge(__s5)) + ";\n";
    }
    __s5 = __s5 + compile(__x489, {_stash: true, stmt: true});
    if (! atom63(__x489)) {
      if (hd(__x489) === "return" || hd(__x489) === "break") {
        break;
      }
    }
    ____i29 = ____i29 + 1;
  }
  return __s5;
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond6 = compile(cond);
  indent_level = indent_level + 1;
  var ____x492 = compile(cons, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __cons1 = ____x492;
  var __e69;
  if (alt) {
    indent_level = indent_level + 1;
    var ____x493 = compile(alt, {_stash: true, stmt: true});
    indent_level = indent_level - 1;
    __e69 = ____x493;
  }
  var __alt1 = __e69;
  var __ind3 = indentation();
  var __s7 = "";
  if (target === "js") {
    __s7 = __s7 + __ind3 + "if (" + __cond6 + ") {\n" + __cons1 + __ind3 + "}";
  } else {
    __s7 = __s7 + __ind3 + "if " + __cond6 + " then\n" + __cons1;
  }
  if (__alt1 && target === "js") {
    __s7 = __s7 + " else {\n" + __alt1 + __ind3 + "}";
  } else {
    if (__alt1) {
      __s7 = __s7 + __ind3 + "else\n" + __alt1;
    }
  }
  if (target === "lua") {
    return __s7 + __ind3 + "end\n";
  } else {
    return __s7 + "\n";
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var __cond8 = compile(cond);
  indent_level = indent_level + 1;
  var ____x495 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body56 = ____x495;
  var __ind5 = indentation();
  if (target === "js") {
    return __ind5 + "while (" + __cond8 + ") {\n" + __body56 + __ind5 + "}\n";
  } else {
    return __ind5 + "while " + __cond8 + " do\n" + __body56 + __ind5 + "end\n";
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var __t6 = compile(t);
  var __ind7 = indentation();
  indent_level = indent_level + 1;
  var ____x497 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body58 = ____x497;
  if (target === "lua") {
    return __ind7 + "for " + k + " in next, " + __t6 + " do\n" + __body58 + __ind7 + "end\n";
  } else {
    return __ind7 + "for (" + k + " in " + __t6 + ") {\n" + __body58 + __ind7 + "}\n";
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __e22 = unique("e");
  var __ind9 = indentation();
  indent_level = indent_level + 1;
  var ____x502 = compile(form, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __body60 = ____x502;
  var __hf1 = ["return", ["%array", false, __e22]];
  indent_level = indent_level + 1;
  var ____x505 = compile(__hf1, {_stash: true, stmt: true});
  indent_level = indent_level - 1;
  var __h1 = ____x505;
  return __ind9 + "try {\n" + __body60 + __ind9 + "}\n" + __ind9 + "catch (" + __e22 + ") {\n" + __h1 + __ind9 + "}\n";
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  return indentation() + "delete " + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return compile_function(args, body);
}});
setenv("%global-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var __x509 = compile_function(args, body, {_stash: true, name: name});
    return indentation() + __x509;
  } else {
    return compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (target === "lua") {
    var __x515 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return indentation() + __x515;
  } else {
    return compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e70;
  if (nil63(x)) {
    __e70 = "return";
  } else {
    __e70 = "return " + compile(x);
  }
  var __x519 = __e70;
  return indentation() + __x519;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("throw", {_stash: true, special: function (x) {
  var __e71;
  if (target === "js") {
    __e71 = "throw " + compile(x);
  } else {
    __e71 = "error(" + compile(x) + ")";
  }
  var __e26 = __e71;
  return indentation() + __e26;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  var __id90 = compile(name);
  var __value11 = compile(value);
  var __e72;
  if (is63(value)) {
    __e72 = " = " + __value11;
  } else {
    __e72 = "";
  }
  var __rh6 = __e72;
  var __e73;
  if (target === "js") {
    __e73 = "var ";
  } else {
    __e73 = "local ";
  }
  var __keyword1 = __e73;
  var __ind11 = indentation();
  return __ind11 + __keyword1 + __id90 + __rh6;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh6 = compile(lh);
  var __e74;
  if (nil63(rh)) {
    __e74 = "nil";
  } else {
    __e74 = rh;
  }
  var __rh8 = compile(__e74);
  return indentation() + __lh6 + " = " + __rh8;
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var __t12 = compile(t);
  var __k121 = compile(k);
  if (target === "lua" && char(__t12, 0) === "{" || infix_operator63(t)) {
    __t12 = "(" + __t12 + ")";
  }
  if (accessor_literal63(k)) {
    return __t12 + "." + __k121;
  } else {
    return __t12 + "[" + __k121 + "]";
  }
}});
setenv("%array", {_stash: true, special: function () {
  var __forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e75;
  if (target === "lua") {
    __e75 = "{";
  } else {
    __e75 = "[";
  }
  var __open1 = __e75;
  var __e76;
  if (target === "lua") {
    __e76 = "}";
  } else {
    __e76 = "]";
  }
  var __close1 = __e76;
  var __s9 = "";
  var __c7 = "";
  var ____o16 = __forms5;
  var __k22 = undefined;
  for (__k22 in ____o16) {
    var __v19 = ____o16[__k22];
    var __e77;
    if (numeric63(__k22)) {
      __e77 = parseInt(__k22);
    } else {
      __e77 = __k22;
    }
    var __k23 = __e77;
    if (number63(__k23)) {
      __s9 = __s9 + __c7 + compile(__v19);
      __c7 = ", ";
    }
  }
  return __open1 + __s9 + __close1;
}});
setenv("%object", {_stash: true, special: function () {
  var __forms7 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s111 = "{";
  var __c9 = "";
  var __e78;
  if (target === "lua") {
    __e78 = " = ";
  } else {
    __e78 = ": ";
  }
  var __sep1 = __e78;
  var ____o18 = pair(__forms7);
  var __k27 = undefined;
  for (__k27 in ____o18) {
    var __v22 = ____o18[__k27];
    var __e79;
    if (numeric63(__k27)) {
      __e79 = parseInt(__k27);
    } else {
      __e79 = __k27;
    }
    var __k28 = __e79;
    if (number63(__k28)) {
      var ____id92 = __v22;
      var __k29 = ____id92[0];
      var __v23 = ____id92[1];
      if (! string63(__k29)) {
        error("Illegal key: " + str(__k29));
      }
      __s111 = __s111 + __c9 + key(__k29) + __sep1 + compile(__v23);
      __c9 = ", ";
    }
  }
  return __s111 + "}";
}});
setenv("%literal", {_stash: true, special: function () {
  var __args21 = unstash(Array.prototype.slice.call(arguments, 0));
  return apply(cat, map(compile, __args21));
}});
var __e80;
if (typeof(exports) === "undefined") {
  __e80 = {};
} else {
  __e80 = exports;
}
var __exports = __e80;
__exports.run = run;
__exports._eval = _eval;
__exports.expand = expand;
__exports.compile = compile;
__exports;
