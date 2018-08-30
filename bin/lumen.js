environment = [{}];
target = "js";
nil63 = function (x) {
  return x === undefined || x === null;
};
is63 = function (x) {
  return ! nil63(x);
};
no = function (x) {
  return nil63(x) || x === false;
};
yes = function (x) {
  return ! no(x);
};
either = function (x, y) {
  if (is63(x)) {
    return x;
  } else {
    return y;
  }
};
has63 = function (l, k) {
  return l["hasOwnProperty"](k);
};
_35 = function (x) {
  return x["length"] || 0;
};
none63 = function (x) {
  return _35(x) === 0;
};
some63 = function (x) {
  return _35(x) > 0;
};
one63 = function (x) {
  return _35(x) === 1;
};
two63 = function (x) {
  return _35(x) === 2;
};
hd = function (l) {
  return l[0];
};
type = function (x) {
  return typeof(x);
};
string63 = function (x) {
  return type(x) === "string";
};
number63 = function (x) {
  return type(x) === "number";
};
boolean63 = function (x) {
  return type(x) === "boolean";
};
function63 = function (x) {
  return type(x) === "function";
};
obj63 = function (x) {
  return is63(x) && type(x) === "object";
};
atom63 = function (x) {
  return nil63(x) || string63(x) || number63(x) || boolean63(x);
};
hd63 = function (l, x) {
  return obj63(l) && hd(l) === x;
};
nan = 0 / 0;
inf = 1 / 0;
_inf = - inf;
nan63 = function (n) {
  return !( n === n);
};
inf63 = function (n) {
  return n === inf || n === _inf;
};
clip = function (s, from, upto) {
  return s["substring"](from, upto);
};
cut = function (x, from, upto) {
  var __l4 = [];
  var __j = 0;
  var __e14;
  if (nil63(from) || from < 0) {
    __e14 = 0;
  } else {
    __e14 = from;
  }
  var __i10 = __e14;
  var __n6 = _35(x);
  var __e15;
  if (nil63(upto) || upto > __n6) {
    __e15 = __n6;
  } else {
    __e15 = upto;
  }
  var __upto = __e15;
  while (__i10 < __upto) {
    __l4[__j] = x[__i10];
    __i10 = __i10 + 1;
    __j = __j + 1;
  }
  var ____o6 = x;
  var __k6 = undefined;
  for (__k6 in ____o6) {
    var __v10 = ____o6[__k6];
    var __e16;
    if (numeric63(__k6)) {
      __e16 = parseInt(__k6);
    } else {
      __e16 = __k6;
    }
    var __k7 = __e16;
    if (! number63(__k7)) {
      __l4[__k7] = __v10;
    }
  }
  return __l4;
};
keys = function (x) {
  var __t4 = [];
  var ____o7 = x;
  var __k8 = undefined;
  for (__k8 in ____o7) {
    var __v11 = ____o7[__k8];
    var __e17;
    if (numeric63(__k8)) {
      __e17 = parseInt(__k8);
    } else {
      __e17 = __k8;
    }
    var __k9 = __e17;
    if (! number63(__k9)) {
      __t4[__k9] = __v11;
    }
  }
  return __t4;
};
edge = function (x) {
  return _35(x) - 1;
};
inner = function (x) {
  return clip(x, 1, edge(x));
};
tl = function (l) {
  return cut(l, 1);
};
char = function (s, n) {
  return s["charAt"](n);
};
code = function (s, n) {
  return s["charCodeAt"](n);
};
string_literal63 = function (x) {
  return string63(x) && char(x, 0) === "\"";
};
id_literal63 = function (x) {
  return string63(x) && char(x, 0) === "|";
};
add = function (l, x) {
  l["push"](x);
  return undefined;
};
drop = function (l) {
  return l["pop"]();
};
last = function (l) {
  return l[edge(l)];
};
almost = function (l) {
  return cut(l, 0, edge(l));
};
reverse = function (l) {
  var __l11 = keys(l);
  var __i13 = edge(l);
  while (__i13 >= 0) {
    add(__l11, l[__i13]);
    __i13 = __i13 - 1;
  }
  return __l11;
};
reduce = function (f, x) {
  if (none63(x)) {
    return undefined;
  } else {
    if (one63(x)) {
      return hd(x);
    } else {
      return f(hd(x), reduce(f, tl(x)));
    }
  }
};
join = function () {
  var __ls = unstash(Array.prototype.slice.call(arguments, 0));
  var __r118 = [];
  var ____x359 = __ls;
  var ____i14 = 0;
  while (____i14 < _35(____x359)) {
    var __l5 = ____x359[____i14];
    if (__l5) {
      var __n9 = _35(__r118);
      var ____o8 = __l5;
      var __k10 = undefined;
      for (__k10 in ____o8) {
        var __v12 = ____o8[__k10];
        var __e18;
        if (numeric63(__k10)) {
          __e18 = parseInt(__k10);
        } else {
          __e18 = __k10;
        }
        var __k11 = __e18;
        if (number63(__k11)) {
          __k11 = __k11 + __n9;
        }
        __r118[__k11] = __v12;
      }
    }
    ____i14 = ____i14 + 1;
  }
  return __r118;
};
find = function (f, t) {
  var ____o9 = t;
  var ____i16 = undefined;
  for (____i16 in ____o9) {
    var __x360 = ____o9[____i16];
    var __e19;
    if (numeric63(____i16)) {
      __e19 = parseInt(____i16);
    } else {
      __e19 = ____i16;
    }
    var ____i161 = __e19;
    var __y2 = f(__x360);
    if (__y2) {
      return __y2;
    }
  }
};
first = function (f, l) {
  var ____x361 = l;
  var ____i17 = 0;
  while (____i17 < _35(____x361)) {
    var __x362 = ____x361[____i17];
    var __y3 = f(__x362);
    if (__y3) {
      return __y3;
    }
    ____i17 = ____i17 + 1;
  }
};
in63 = function (x, t) {
  return find(function (y) {
    return x === y;
  }, t);
};
pair = function (l) {
  var __l12 = [];
  var __i18 = 0;
  while (__i18 < _35(l)) {
    add(__l12, [l[__i18], l[__i18 + 1]]);
    __i18 = __i18 + 1;
    __i18 = __i18 + 1;
  }
  return __l12;
};
sort = function (l, f) {
  var __e20;
  if (f) {
    __e20 = function (a, b) {
      if (f(a, b)) {
        return -1;
      } else {
        return 1;
      }
    };
  }
  return l["sort"](__e20);
};
map = function (f, x) {
  var __t5 = [];
  var ____x364 = x;
  var ____i19 = 0;
  while (____i19 < _35(____x364)) {
    var __v13 = ____x364[____i19];
    var __y4 = f(__v13);
    if (is63(__y4)) {
      add(__t5, __y4);
    }
    ____i19 = ____i19 + 1;
  }
  var ____o10 = x;
  var __k12 = undefined;
  for (__k12 in ____o10) {
    var __v14 = ____o10[__k12];
    var __e21;
    if (numeric63(__k12)) {
      __e21 = parseInt(__k12);
    } else {
      __e21 = __k12;
    }
    var __k13 = __e21;
    if (! number63(__k13)) {
      var __y5 = f(__v14);
      if (is63(__y5)) {
        __t5[__k13] = __y5;
      }
    }
  }
  return __t5;
};
keep = function (f, x) {
  return map(function (v) {
    if (yes(f(v))) {
      return v;
    }
  }, x);
};
keys63 = function (t) {
  var ____o11 = t;
  var __k14 = undefined;
  for (__k14 in ____o11) {
    var __v15 = ____o11[__k14];
    var __e22;
    if (numeric63(__k14)) {
      __e22 = parseInt(__k14);
    } else {
      __e22 = __k14;
    }
    var __k15 = __e22;
    if (! number63(__k15)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o12 = t;
  var ____i22 = undefined;
  for (____i22 in ____o12) {
    var __x365 = ____o12[____i22];
    var __e23;
    if (numeric63(____i22)) {
      __e23 = parseInt(____i22);
    } else {
      __e23 = ____i22;
    }
    var ____i221 = __e23;
    return false;
  }
  return true;
};
stash = function (args) {
  if (keys63(args)) {
    var __p = [];
    var ____o13 = args;
    var __k16 = undefined;
    for (__k16 in ____o13) {
      var __v16 = ____o13[__k16];
      var __e24;
      if (numeric63(__k16)) {
        __e24 = parseInt(__k16);
      } else {
        __e24 = __k16;
      }
      var __k17 = __e24;
      if (! number63(__k17)) {
        __p[__k17] = __v16;
      }
    }
    __p["_stash"] = true;
    add(args, __p);
  }
  return args;
};
unstash = function (args) {
  if (none63(args)) {
    return [];
  } else {
    var __l6 = last(args);
    if (obj63(__l6) && __l6["_stash"]) {
      var __args11 = almost(args);
      var ____o14 = __l6;
      var __k18 = undefined;
      for (__k18 in ____o14) {
        var __v17 = ____o14[__k18];
        var __e25;
        if (numeric63(__k18)) {
          __e25 = parseInt(__k18);
        } else {
          __e25 = __k18;
        }
        var __k19 = __e25;
        if (!( __k19 === "_stash")) {
          __args11[__k19] = __v17;
        }
      }
      return __args11;
    } else {
      return args;
    }
  }
};
destash33 = function (l, args1) {
  if (obj63(l) && l["_stash"]) {
    var ____o15 = l;
    var __k20 = undefined;
    for (__k20 in ____o15) {
      var __v18 = ____o15[__k20];
      var __e26;
      if (numeric63(__k20)) {
        __e26 = parseInt(__k20);
      } else {
        __e26 = __k20;
      }
      var __k21 = __e26;
      if (!( __k21 === "_stash")) {
        args1[__k21] = __v18;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i26 = s["indexOf"](pattern, start);
  if (__i26 >= 0) {
    return __i26;
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return [];
  } else {
    var __l7 = [];
    var __n18 = _35(sep);
    while (true) {
      var __i27 = search(s, sep);
      if (nil63(__i27)) {
        break;
      } else {
        add(__l7, clip(s, 0, __i27));
        s = clip(s, __i27 + __n18);
      }
    }
    add(__l7, s);
    return __l7;
  }
};
cat = function () {
  var __xs2 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a + b;
  }, __xs2), "");
};
_43 = function () {
  var __xs3 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a + b;
  }, __xs3), 0);
};
_45 = function () {
  var __xs4 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a - b;
  }, reverse(__xs4)), 0);
};
_42 = function () {
  var __xs5 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a * b;
  }, __xs5), 1);
};
_47 = function () {
  var __xs6 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a / b;
  }, reverse(__xs6)), 1);
};
_37 = function () {
  var __xs7 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a % b;
  }, reverse(__xs7)), 0);
};
var pairwise = function (f, xs) {
  var __i28 = 0;
  while (__i28 < edge(xs)) {
    var __a6 = xs[__i28];
    var __b2 = xs[__i28 + 1];
    if (! f(__a6, __b2)) {
      return false;
    }
    __i28 = __i28 + 1;
  }
  return true;
};
_60 = function () {
  var __xs8 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a < b;
  }, __xs8);
};
_62 = function () {
  var __xs9 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a > b;
  }, __xs9);
};
_61 = function () {
  var __xs10 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a === b;
  }, __xs10);
};
_6061 = function () {
  var __xs11 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a <= b;
  }, __xs11);
};
_6261 = function () {
  var __xs12 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a >= b;
  }, __xs12);
};
number = function (s) {
  var __n19 = parseFloat(s);
  if (! isNaN(__n19)) {
    return __n19;
  }
};
number_code63 = function (n) {
  return n > 47 && n < 58;
};
numeric63 = function (s) {
  var __n20 = _35(s);
  var __i29 = 0;
  while (__i29 < __n20) {
    if (! number_code63(code(s, __i29))) {
      return false;
    }
    __i29 = __i29 + 1;
  }
  return some63(s);
};
var tostring = function (x) {
  return x["toString"]();
};
escape = function (s) {
  var __s11 = "\"";
  var __i30 = 0;
  while (__i30 < _35(s)) {
    var __c = char(s, __i30);
    var __e27;
    if (__c === "\n") {
      __e27 = "\\n";
    } else {
      var __e28;
      if (__c === "\r") {
        __e28 = "\\r";
      } else {
        var __e29;
        if (__c === "\"") {
          __e29 = "\\\"";
        } else {
          var __e30;
          if (__c === "\\") {
            __e30 = "\\\\";
          } else {
            __e30 = __c;
          }
          __e29 = __e30;
        }
        __e28 = __e29;
      }
      __e27 = __e28;
    }
    var __c1 = __e27;
    __s11 = __s11 + __c1;
    __i30 = __i30 + 1;
  }
  return __s11 + "\"";
};
str = function (x, stack) {
  if (nil63(x)) {
    return "nil";
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
          if (boolean63(x)) {
            if (x) {
              return "true";
            } else {
              return "false";
            }
          } else {
            if (string63(x)) {
              return escape(x);
            } else {
              if (atom63(x)) {
                return tostring(x);
              } else {
                if (function63(x)) {
                  return "function";
                } else {
                  if (stack && in63(x, stack)) {
                    return "circular";
                  } else {
                    if (false) {
                      return escape(tostring(x));
                    } else {
                      var __s2 = "(";
                      var __sp = "";
                      var __xs13 = [];
                      var __ks = [];
                      var __l8 = stack || [];
                      add(__l8, x);
                      var ____o16 = x;
                      var __k22 = undefined;
                      for (__k22 in ____o16) {
                        var __v19 = ____o16[__k22];
                        var __e31;
                        if (numeric63(__k22)) {
                          __e31 = parseInt(__k22);
                        } else {
                          __e31 = __k22;
                        }
                        var __k23 = __e31;
                        if (number63(__k23)) {
                          __xs13[__k23] = str(__v19, __l8);
                        } else {
                          add(__ks, __k23 + ":");
                          add(__ks, str(__v19, __l8));
                        }
                      }
                      drop(__l8);
                      var ____o17 = join(__xs13, __ks);
                      var ____i32 = undefined;
                      for (____i32 in ____o17) {
                        var __v20 = ____o17[____i32];
                        var __e32;
                        if (numeric63(____i32)) {
                          __e32 = parseInt(____i32);
                        } else {
                          __e32 = ____i32;
                        }
                        var ____i321 = __e32;
                        __s2 = __s2 + __sp + __v20;
                        __sp = " ";
                      }
                      return __s2 + ")";
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
apply = function (f, args) {
  var __args10 = stash(args);
  return f["apply"](f, __args10);
};
call = function (f) {
  var ____r155 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f2 = destash33(f, ____r155);
  var ____id62 = ____r155;
  var __args111 = cut(____id62, 0);
  return apply(__f2, __args111);
};
setenv = function (k) {
  var ____r156 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k24 = destash33(k, ____r156);
  var ____id63 = ____r156;
  var __keys = cut(____id63, 0);
  if (string63(__k24)) {
    var __e33;
    if (__keys["toplevel"]) {
      __e33 = hd(environment);
    } else {
      __e33 = last(environment);
    }
    var __frame = __e33;
    var __entry = __frame[__k24] || {};
    var ____o18 = __keys;
    var __k25 = undefined;
    for (__k25 in ____o18) {
      var __v21 = ____o18[__k25];
      var __e34;
      if (numeric63(__k25)) {
        __e34 = parseInt(__k25);
      } else {
        __e34 = __k25;
      }
      var __k26 = __e34;
      __entry[__k26] = __v21;
    }
    __frame[__k24] = __entry;
    return __frame[__k24];
  }
};
print = function (x) {
  return console["log"](x);
};
error = function (x) {
  throw new Error(x);
};
var math = Math;
abs = math["abs"];
acos = math["acos"];
asin = math["asin"];
atan = math["atan"];
atan2 = math["atan2"];
ceil = math["ceil"];
cos = math["cos"];
floor = math["floor"];
log = math["log"];
log10 = math["log10"];
max = math["max"];
min = math["min"];
pow = math["pow"];
random = math["random"];
sin = math["sin"];
sinh = math["sinh"];
sqrt = math["sqrt"];
tan = math["tan"];
tanh = math["tanh"];
trunc = math["floor"];
setenv("quote", {_stash: true, macro: function (form) {
  return quoted(form);
}});
setenv("quasiquote", {_stash: true, macro: function (form) {
  return quasiexpand(form, 1);
}});
setenv("set", {_stash: true, macro: function () {
  var __args11 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["do"], map(function (__x362) {
    var ____id63 = __x362;
    var __lh5 = ____id63[0];
    var __rh5 = ____id63[1];
    return ["%set", __lh5, __rh5];
  }, pair(__args11)));
}});
setenv("at", {_stash: true, macro: function (l, i) {
  if (target === "lua" && number63(i)) {
    i = i + 1;
  } else {
    if (target === "lua") {
      i = ["+", i, 1];
    }
  }
  return ["get", l, i];
}});
setenv("wipe", {_stash: true, macro: function (place) {
  if (target === "lua") {
    return ["set", place, "nil"];
  } else {
    return ["%delete", place];
  }
}});
setenv("list", {_stash: true, macro: function () {
  var __body47 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x380 = unique("x");
  var __l5 = [];
  var __forms3 = [];
  var ____o7 = __body47;
  var __k8 = undefined;
  for (__k8 in ____o7) {
    var __v11 = ____o7[__k8];
    var __e21;
    if (numeric63(__k8)) {
      __e21 = parseInt(__k8);
    } else {
      __e21 = __k8;
    }
    var __k9 = __e21;
    if (number63(__k9)) {
      __l5[__k9] = __v11;
    } else {
      add(__forms3, ["set", ["get", __x380, ["quote", __k9]], __v11]);
    }
  }
  if (some63(__forms3)) {
    return join(["let", __x380, join(["%array"], __l5)], __forms3, [__x380]);
  } else {
    return join(["%array"], __l5);
  }
}});
setenv("if", {_stash: true, macro: function () {
  var __branches3 = unstash(Array.prototype.slice.call(arguments, 0));
  return hd(expand_if(__branches3));
}});
setenv("case", {_stash: true, macro: function (expr) {
  var ____r93 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expr3 = destash33(expr, ____r93);
  var ____id66 = ____r93;
  var __clauses5 = cut(____id66, 0);
  var __x399 = unique("x");
  var __eq3 = function (_) {
    return ["=", ["quote", _], __x399];
  };
  var __cl3 = function (__x402) {
    var ____id67 = __x402;
    var __a7 = ____id67[0];
    var __b3 = ____id67[1];
    if (nil63(__b3)) {
      return [__a7];
    } else {
      if (string63(__a7) || number63(__a7)) {
        return [__eq3(__a7), __b3];
      } else {
        if (one63(__a7)) {
          return [__eq3(hd(__a7)), __b3];
        } else {
          if (_35(__a7) > 1) {
            return [join(["or"], map(__eq3, __a7)), __b3];
          }
        }
      }
    }
  };
  return ["let", __x399, __expr3, join(["if"], apply(join, map(__cl3, pair(__clauses5))))];
}});
setenv("when", {_stash: true, macro: function (cond) {
  var ____r97 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond5 = destash33(cond, ____r97);
  var ____id69 = ____r97;
  var __body49 = cut(____id69, 0);
  return ["if", __cond5, join(["do"], __body49)];
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var ____r99 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond7 = destash33(cond, ____r99);
  var ____id71 = ____r99;
  var __body51 = cut(____id71, 0);
  return ["if", ["not", __cond7], join(["do"], __body51)];
}});
setenv("obj", {_stash: true, macro: function () {
  var __body53 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%object"], mapo(function (x) {
    return x;
  }, __body53));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var ____r103 = unstash(Array.prototype.slice.call(arguments, 1));
  var __bs9 = destash33(bs, ____r103);
  var ____id76 = ____r103;
  var __body55 = cut(____id76, 0);
  if (atom63(__bs9)) {
    return join(["let", [__bs9, hd(__body55)]], tl(__body55));
  } else {
    if (none63(__bs9)) {
      return join(["do"], __body55);
    } else {
      var ____id77 = __bs9;
      var __lh7 = ____id77[0];
      var __rh7 = ____id77[1];
      var __bs24 = cut(____id77, 2);
      var ____id78 = bind(__lh7, __rh7);
      var __id79 = ____id78[0];
      var __val3 = ____id78[1];
      var __bs14 = cut(____id78, 2);
      var __renames3 = [];
      if (! id_literal63(__id79)) {
        var __id141 = unique(__id79);
        __renames3 = [__id79, __id141];
        __id79 = __id141;
      }
      return ["do", ["%local", __id79, __val3], ["let-symbol", __renames3, join(["let", join(__bs14, __bs24)], __body55)]];
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var ____r105 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x442 = destash33(x, ____r105);
  var __v13 = destash33(v, ____r105);
  var ____id81 = ____r105;
  var __body57 = cut(____id81, 0);
  return join(["let", [__x442, __v13]], __body57, [__x442]);
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var ____r107 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x452 = destash33(x, ____r107);
  var __v15 = destash33(v, ____r107);
  var ____id83 = ____r107;
  var __body59 = cut(____id83, 0);
  var __y3 = unique("y");
  return ["let", __y3, __v15, ["when", ["yes", __y3], join(["let", [__x452, __y3]], __body59)]];
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var ____r109 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name11 = destash33(name, ____r109);
  var __args13 = destash33(args, ____r109);
  var ____id85 = ____r109;
  var __body61 = cut(____id85, 0);
  var ____x461 = ["setenv", ["quote", __name11]];
  ____x461["macro"] = join(["fn", __args13], __body61);
  var __form7 = ____x461;
  _eval(__form7);
  return __form7;
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var ____r111 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name13 = destash33(name, ____r111);
  var __args15 = destash33(args, ____r111);
  var ____id87 = ____r111;
  var __body63 = cut(____id87, 0);
  var ____x467 = ["setenv", ["quote", __name13]];
  ____x467["special"] = join(["fn", __args15], __body63);
  var __form9 = join(____x467, keys(__body63));
  _eval(__form9);
  return __form9;
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var ____x473 = ["setenv", ["quote", name]];
  ____x473["symbol"] = ["quote", expansion];
  return ____x473;
}});
setenv("define-reader", {_stash: true, macro: function (__x481) {
  var ____id90 = __x481;
  var __char3 = ____id90[0];
  var __s3 = ____id90[1];
  var ____r115 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x481 = destash33(__x481, ____r115);
  var ____id91 = ____r115;
  var __body65 = cut(____id91, 0);
  return ["set", ["get", "read-table", __char3], join(["fn", [__s3]], __body65)];
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var ____r117 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name15 = destash33(name, ____r117);
  var __x489 = destash33(x, ____r117);
  var ____id93 = ____r117;
  var __body67 = cut(____id93, 0);
  setenv(__name15, {_stash: true, variable: true});
  if (some63(__body67)) {
    return join(["%local-function", __name15], bind42(__x489, __body67));
  } else {
    return ["%local", __name15, __x489];
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var ____r119 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name17 = destash33(name, ____r119);
  var __x495 = destash33(x, ____r119);
  var ____id95 = ____r119;
  var __body69 = cut(____id95, 0);
  setenv(__name17, {_stash: true, toplevel: true, variable: true});
  if (some63(__body69)) {
    return join(["%global-function", __name17], bind42(__x495, __body69));
  } else {
    return ["set", __name17, __x495];
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var __body71 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x505 = unique("x");
  return ["do", ["add", "environment", ["obj"]], ["with", __x505, join(["do"], __body71), ["drop", "environment"]]];
}});
setenv("with-bindings", {_stash: true, macro: function (__x517) {
  var ____id98 = __x517;
  var __names7 = ____id98[0];
  var ____r121 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x517 = destash33(__x517, ____r121);
  var ____id99 = ____r121;
  var __body73 = cut(____id99, 0);
  var __x518 = unique("x");
  var ____x521 = ["setenv", __x518];
  ____x521["variable"] = true;
  return join(["with-frame", ["each", __x518, __names7, ____x521]], __body73);
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var ____r124 = unstash(Array.prototype.slice.call(arguments, 1));
  var __definitions3 = destash33(definitions, ____r124);
  var ____id101 = ____r124;
  var __body75 = cut(____id101, 0);
  add(environment, {});
  map(function (m) {
    return macroexpand(join(["define-macro"], m));
  }, __definitions3);
  var ____x525 = join(["do"], macroexpand(__body75));
  drop(environment);
  return ____x525;
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var ____r128 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expansions3 = destash33(expansions, ____r128);
  var ____id104 = ____r128;
  var __body77 = cut(____id104, 0);
  add(environment, {});
  map(function (__x533) {
    var ____id105 = __x533;
    var __name19 = ____id105[0];
    var __exp3 = ____id105[1];
    return macroexpand(["define-symbol", __name19, __exp3]);
  }, pair(__expansions3));
  var ____x532 = join(["do"], macroexpand(__body77));
  drop(environment);
  return ____x532;
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var ____r132 = unstash(Array.prototype.slice.call(arguments, 1));
  var __names9 = destash33(names, ____r132);
  var ____id107 = ____r132;
  var __body79 = cut(____id107, 0);
  var __bs111 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names9);
  return join(["let", apply(join, __bs111)], __body79);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var ____r135 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args17 = destash33(args, ____r135);
  var ____id109 = ____r135;
  var __body81 = cut(____id109, 0);
  return join(["%function"], bind42(__args17, __body81));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var ____r137 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f3 = destash33(f, ____r137);
  var ____id1111 = ____r137;
  var __args19 = cut(____id1111, 0);
  if (_35(__args19) > 1) {
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args19)), last(__args19)]];
  } else {
    return join(["%call", "apply", __f3], __args19);
  }
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (target === "js") {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  } else {
    var ____x588 = ["obj"];
    ____x588["stack"] = [["get", "debug", ["quote", "traceback"]]];
    ____x588["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["or", ["search", "m", "\": \""], -2], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x588]]]];
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var ____r141 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x614 = destash33(x, ____r141);
  var __t5 = destash33(t, ____r141);
  var ____id114 = ____r141;
  var __body83 = cut(____id114, 0);
  var __o9 = unique("o");
  var __n9 = unique("n");
  var __i13 = unique("i");
  var __e22;
  if (atom63(__x614)) {
    __e22 = [__i13, __x614];
  } else {
    var __e23;
    if (_35(__x614) > 1) {
      __e23 = __x614;
    } else {
      __e23 = [__i13, hd(__x614)];
    }
    __e22 = __e23;
  }
  var ____id115 = __e22;
  var __k11 = ____id115[0];
  var __v17 = ____id115[1];
  var __e24;
  if (target === "lua") {
    __e24 = __body83;
  } else {
    __e24 = [join(["let", __k11, ["if", ["numeric?", __k11], ["parseInt", __k11], __k11]], __body83)];
  }
  return ["let", [__o9, __t5, __k11, "nil"], ["%for", __o9, __k11, join(["let", [__v17, ["get", __o9, __k11]]], __e24)]];
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var ____r143 = unstash(Array.prototype.slice.call(arguments, 2));
  var __i15 = destash33(i, ____r143);
  var __to3 = destash33(to, ____r143);
  var ____id117 = ____r143;
  var __body85 = cut(____id117, 0);
  return ["let", __i15, 0, join(["while", ["<", __i15, __to3]], __body85, [["inc", __i15]])];
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var ____r145 = unstash(Array.prototype.slice.call(arguments, 2));
  var __v19 = destash33(v, ____r145);
  var __t7 = destash33(t, ____r145);
  var ____id119 = ____r145;
  var __body87 = cut(____id119, 0);
  var __x646 = unique("x");
  var __i17 = unique("i");
  return ["let", [__x646, __t7], ["for", __i17, ["#", __x646], join(["let", [__v19, ["at", __x646, __i17]]], __body87)]];
}});
setenv("set-of", {_stash: true, macro: function () {
  var __xs3 = unstash(Array.prototype.slice.call(arguments, 0));
  var __l7 = [];
  var ____o11 = __xs3;
  var ____i19 = undefined;
  for (____i19 in ____o11) {
    var __x656 = ____o11[____i19];
    var __e25;
    if (numeric63(____i19)) {
      __e25 = parseInt(____i19);
    } else {
      __e25 = ____i19;
    }
    var ____i191 = __e25;
    __l7[__x656] = true;
  }
  return join(["obj"], __l7);
}});
setenv("language", {_stash: true, macro: function () {
  return ["quote", target];
}});
setenv("target", {_stash: true, macro: function () {
  var __clauses7 = unstash(Array.prototype.slice.call(arguments, 0));
  return __clauses7[target];
}});
setenv("join!", {_stash: true, macro: function (a) {
  var ____r149 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a9 = destash33(a, ____r149);
  var ____id1211 = ____r149;
  var __bs131 = cut(____id1211, 0);
  return ["set", __a9, join(["join", __a9], __bs131)];
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var ____r151 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a11 = destash33(a, ____r151);
  var ____id123 = ____r151;
  var __bs15 = cut(____id123, 0);
  return ["set", __a11, join(["cat", __a11], __bs15)];
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var __e26;
  if (nil63(by)) {
    __e26 = 1;
  } else {
    __e26 = by;
  }
  return ["set", n, ["+", n, __e26]];
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var __e27;
  if (nil63(by)) {
    __e27 = 1;
  } else {
    __e27 = by;
  }
  return ["set", n, ["-", n, __e27]];
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var __x681 = unique("x");
  return ["do", ["inc", "indent-level"], ["with", __x681, form, ["dec", "indent-level"]]];
}});
setenv("export", {_stash: true, macro: function () {
  var __names11 = unstash(Array.prototype.slice.call(arguments, 0));
  var ____x700 = ["target"];
  ____x700["js"] = ["if", ["=", ["typeof", "exports"], "\"undefined\""], ["obj"], "exports"];
  ____x700["lua"] = ["or", "exports", ["obj"]];
  var ____x710 = ["target"];
  ____x710["js"] = "exports";
  ____x710["lua"] = ["return", "exports"];
  return join(["let", "exports", ____x700], map(function (k) {
    return ["set", ["get", "exports", "." + k], k];
  }, __names11), [____x710]);
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var __body89 = unstash(Array.prototype.slice.call(arguments, 0));
  return _eval(join(["do"], __body89));
}});
setenv("during-compilation", {_stash: true, macro: function () {
  var __body91 = unstash(Array.prototype.slice.call(arguments, 0));
  var __form11 = join(["do"], __body91);
  _eval(__form11);
  return __form11;
}});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
var eval_print = function (form) {
  var ____id62 = (function () {
    try {
      return [true, compiler._eval(form)];
    }
    catch (__e14) {
      return [false, __e14];
    }
  })();
  var __ok = ____id62[0];
  var __v10 = ____id62[1];
  if (! __ok) {
    return print(__v10.stack);
  } else {
    if (is63(__v10)) {
      return print(str(__v10));
    }
  }
};
var read_eval = function (s) {
  var __form6 = reader.read_string(s);
  return compiler._eval(__form6);
};
var repl = function () {
  var __buf = "";
  var rep1 = function (s) {
    __buf = __buf + s;
    var __more = [];
    var __form7 = reader.read_string(__buf, __more);
    if (!( __form7 === __more)) {
      eval_print(__form7);
      __buf = "";
      return system.write("> ");
    }
  };
  system.write("> ");
  var ___in = process.stdin;
  ___in.setEncoding("utf8");
  return ___in.on("data", rep1);
};
compile_file = function (path) {
  var __s2 = reader.stream(system.read_file(path));
  var __body46 = reader.read_all(__s2);
  var __form8 = compiler.expand(join(["do"], __body46));
  return compiler.compile(__form8, {_stash: true, stmt: true});
};
_load = function (path) {
  var __previous = target;
  target = "js";
  var __code = compile_file(path);
  target = __previous;
  return compiler.run(__code);
};
var script_file63 = function (path) {
  return !( "-" === char(path, 0) || ".js" === clip(path, _35(path) - 3) || ".lua" === clip(path, _35(path) - 4));
};
var run_file = function (path) {
  if (script_file63(path)) {
    return _load(path);
  } else {
    return compiler.run(system.read_file(path));
  }
};
var usage = function () {
  print("usage: lumen [<file> <arguments> | options <object files>]");
  print(" <file>\t\tProgram read from script file");
  print(" <arguments>\tPassed to program in system.argv");
  print(" <object files>\tLoaded before compiling <input>");
  print("options:");
  print(" -l <input>\tLoad input file");
  print(" -c <input>\tCompile input file");
  print(" -o <output>\tOutput file");
  print(" -t <target>\tTarget language (default: lua)");
  return print(" -e <expr>\tExpression to evaluate");
};
var main = function () {
  var __arg = hd(system.argv);
  if (__arg && script_file63(__arg)) {
    return _load(__arg);
  } else {
    if (__arg === "-h" || __arg === "--help") {
      return usage();
    } else {
      var __pre = [];
      var __input = undefined;
      var __output = undefined;
      var __target1 = undefined;
      var __expr2 = undefined;
      var __argv = system.argv;
      var __i10 = 0;
      while (__i10 < _35(__argv)) {
        var __a6 = __argv[__i10];
        if (__a6 === "-l" || __a6 === "-c" || __a6 === "-o" || __a6 === "-t" || __a6 === "-e") {
          if (__i10 === edge(__argv)) {
            print("missing argument for " + __a6);
          } else {
            __i10 = __i10 + 1;
            var __val2 = __argv[__i10];
            if (__a6 === "-l") {
              _load(__val2);
            } else {
              if (__a6 === "-c") {
                __input = __val2;
              } else {
                if (__a6 === "-o") {
                  __output = __val2;
                } else {
                  if (__a6 === "-t") {
                    __target1 = __val2;
                  } else {
                    if (__a6 === "-e") {
                      __expr2 = __val2;
                      read_eval(__expr2);
                    }
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" === char(__a6, 0))) {
            add(__pre, __a6);
          }
        }
        __i10 = __i10 + 1;
      }
      var ____x360 = __pre;
      var ____i11 = 0;
      while (____i11 < _35(____x360)) {
        var __file = ____x360[____i11];
        run_file(__file);
        ____i11 = ____i11 + 1;
      }
      if (nil63(__input)) {
        if (__expr2) {
          if (is63(_37result)) {
            return print(str(_37result));
          }
        } else {
          return repl();
        }
      } else {
        if (__target1) {
          target = __target1;
        }
        var __code1 = compile_file(__input);
        if (nil63(__output) || __output === "-") {
          return print(__code1);
        } else {
          return system.write_file(__output, __code1);
        }
      }
    }
  }
};
main();
