environment = {{}}
target = "lua"
function nil63(x)
  return x == nil
end
function is63(x)
  return not nil63(x)
end
function no(x)
  return nil63(x) or x == false
end
function yes(x)
  return not no(x)
end
function either(x, y)
  if is63(x) then
    return x
  else
    return y
  end
end
function has63(l, k)
  return is63(l[k])
end
function _35(x)
  return #x
end
function none63(x)
  return _35(x) == 0
end
function some63(x)
  return _35(x) > 0
end
function one63(x)
  return _35(x) == 1
end
function two63(x)
  return _35(x) == 2
end
function hd(l)
  return l[1]
end
function string63(x)
  return type(x) == "string"
end
function number63(x)
  return type(x) == "number"
end
function boolean63(x)
  return type(x) == "boolean"
end
function function63(x)
  return type(x) == "function"
end
function obj63(x)
  return is63(x) and type(x) == "table"
end
function atom63(x)
  return nil63(x) or string63(x) or number63(x) or boolean63(x)
end
function hd63(l, x)
  return obj63(l) and hd(l) == x
end
nan = 0 / 0
inf = 1 / 0
_inf = - inf
function nan63(n)
  return not( n == n)
end
function inf63(n)
  return n == inf or n == _inf
end
function clip(s, from, upto)
  return string["sub"](s, from + 1, upto)
end
function cut(x, from, upto)
  local __l4 = {}
  local __j = 0
  local __e14
  if nil63(from) or from < 0 then
    __e14 = 0
  else
    __e14 = from
  end
  local __i10 = __e14
  local __n6 = _35(x)
  local __e15
  if nil63(upto) or upto > __n6 then
    __e15 = __n6
  else
    __e15 = upto
  end
  local __upto = __e15
  while __i10 < __upto do
    __l4[__j + 1] = x[__i10 + 1]
    __i10 = __i10 + 1
    __j = __j + 1
  end
  local ____o6 = x
  local __k6 = nil
  for __k6 in next, ____o6 do
    local __v10 = ____o6[__k6]
    if not number63(__k6) then
      __l4[__k6] = __v10
    end
  end
  return __l4
end
function keys(x)
  local __t4 = {}
  local ____o7 = x
  local __k7 = nil
  for __k7 in next, ____o7 do
    local __v11 = ____o7[__k7]
    if not number63(__k7) then
      __t4[__k7] = __v11
    end
  end
  return __t4
end
function edge(x)
  return _35(x) - 1
end
function inner(x)
  return clip(x, 1, edge(x))
end
function tl(l)
  return cut(l, 1)
end
function char(s, n)
  return clip(s, n, n + 1)
end
function code(s, n)
  local __e16
  if n then
    __e16 = n + 1
  end
  return string["byte"](s, __e16)
end
function string_literal63(x)
  return string63(x) and char(x, 0) == "\""
end
function id_literal63(x)
  return string63(x) and char(x, 0) == "|"
end
function add(l, x)
  return table["insert"](l, x)
end
function drop(l)
  return table["remove"](l)
end
function last(l)
  return l[edge(l) + 1]
end
function almost(l)
  return cut(l, 0, edge(l))
end
function reverse(l)
  local __l11 = keys(l)
  local __i13 = edge(l)
  while __i13 >= 0 do
    add(__l11, l[__i13 + 1])
    __i13 = __i13 - 1
  end
  return __l11
end
function reduce(f, x)
  if none63(x) then
    return nil
  else
    if one63(x) then
      return hd(x)
    else
      return f(hd(x), reduce(f, tl(x)))
    end
  end
end
function join(...)
  local __ls = unstash({...})
  local __r117 = {}
  local ____x360 = __ls
  local ____i14 = 0
  while ____i14 < _35(____x360) do
    local __l5 = ____x360[____i14 + 1]
    if __l5 then
      local __n9 = _35(__r117)
      local ____o8 = __l5
      local __k8 = nil
      for __k8 in next, ____o8 do
        local __v12 = ____o8[__k8]
        if number63(__k8) then
          __k8 = __k8 + __n9
        end
        __r117[__k8] = __v12
      end
    end
    ____i14 = ____i14 + 1
  end
  return __r117
end
function find(f, t)
  local ____o9 = t
  local ____i16 = nil
  for ____i16 in next, ____o9 do
    local __x361 = ____o9[____i16]
    local __y2 = f(__x361)
    if __y2 then
      return __y2
    end
  end
end
function first(f, l)
  local ____x362 = l
  local ____i17 = 0
  while ____i17 < _35(____x362) do
    local __x363 = ____x362[____i17 + 1]
    local __y3 = f(__x363)
    if __y3 then
      return __y3
    end
    ____i17 = ____i17 + 1
  end
end
function in63(x, t)
  return find(function (y)
    return x == y
  end, t)
end
function pair(l)
  local __l12 = {}
  local __i18 = 0
  while __i18 < _35(l) do
    add(__l12, {l[__i18 + 1], l[__i18 + 1 + 1]})
    __i18 = __i18 + 1
    __i18 = __i18 + 1
  end
  return __l12
end
function sort(l, f)
  table["sort"](l, f)
  return l
end
function map(f, x)
  local __t5 = {}
  local ____x365 = x
  local ____i19 = 0
  while ____i19 < _35(____x365) do
    local __v13 = ____x365[____i19 + 1]
    local __y4 = f(__v13)
    if is63(__y4) then
      add(__t5, __y4)
    end
    ____i19 = ____i19 + 1
  end
  local ____o10 = x
  local __k9 = nil
  for __k9 in next, ____o10 do
    local __v14 = ____o10[__k9]
    if not number63(__k9) then
      local __y5 = f(__v14)
      if is63(__y5) then
        __t5[__k9] = __y5
      end
    end
  end
  return __t5
end
function keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
function keys63(t)
  local ____o11 = t
  local __k10 = nil
  for __k10 in next, ____o11 do
    local __v15 = ____o11[__k10]
    if not number63(__k10) then
      return true
    end
  end
  return false
end
function empty63(t)
  local ____o12 = t
  local ____i22 = nil
  for ____i22 in next, ____o12 do
    local __x366 = ____o12[____i22]
    return false
  end
  return true
end
function stash(args)
  if keys63(args) then
    local __p = {}
    local ____o13 = args
    local __k11 = nil
    for __k11 in next, ____o13 do
      local __v16 = ____o13[__k11]
      if not number63(__k11) then
        __p[__k11] = __v16
      end
    end
    __p["_stash"] = true
    add(args, __p)
  end
  return args
end
function unstash(args)
  if none63(args) then
    return {}
  else
    local __l6 = last(args)
    if obj63(__l6) and __l6["_stash"] then
      local __args11 = almost(args)
      local ____o14 = __l6
      local __k12 = nil
      for __k12 in next, ____o14 do
        local __v17 = ____o14[__k12]
        if not( __k12 == "_stash") then
          __args11[__k12] = __v17
        end
      end
      return __args11
    else
      return args
    end
  end
end
function destash33(l, args1)
  if obj63(l) and l["_stash"] then
    local ____o15 = l
    local __k13 = nil
    for __k13 in next, ____o15 do
      local __v18 = ____o15[__k13]
      if not( __k13 == "_stash") then
        args1[__k13] = __v18
      end
    end
  else
    return l
  end
end
function search(s, pattern, start)
  local __e17
  if start then
    __e17 = start + 1
  end
  local __start = __e17
  local __i26 = string["find"](s, pattern, __start, true)
  return __i26 and __i26 - 1
end
function split(s, sep)
  if s == "" or sep == "" then
    return {}
  else
    local __l7 = {}
    local __n18 = _35(sep)
    while true do
      local __i27 = search(s, sep)
      if nil63(__i27) then
        break
      else
        add(__l7, clip(s, 0, __i27))
        s = clip(s, __i27 + __n18)
      end
    end
    add(__l7, s)
    return __l7
  end
end
function cat(...)
  local __xs2 = unstash({...})
  return either(reduce(function (a, b)
    return a .. b
  end, __xs2), "")
end
function _43(...)
  local __xs3 = unstash({...})
  return either(reduce(function (a, b)
    return a + b
  end, __xs3), 0)
end
function _45(...)
  local __xs4 = unstash({...})
  return either(reduce(function (b, a)
    return a - b
  end, reverse(__xs4)), 0)
end
function _42(...)
  local __xs5 = unstash({...})
  return either(reduce(function (a, b)
    return a * b
  end, __xs5), 1)
end
function _47(...)
  local __xs6 = unstash({...})
  return either(reduce(function (b, a)
    return a / b
  end, reverse(__xs6)), 1)
end
function _37(...)
  local __xs7 = unstash({...})
  return either(reduce(function (b, a)
    return a % b
  end, reverse(__xs7)), 0)
end
local function pairwise(f, xs)
  local __i28 = 0
  while __i28 < edge(xs) do
    local __a6 = xs[__i28 + 1]
    local __b2 = xs[__i28 + 1 + 1]
    if not f(__a6, __b2) then
      return false
    end
    __i28 = __i28 + 1
  end
  return true
end
function _60(...)
  local __xs8 = unstash({...})
  return pairwise(function (a, b)
    return a < b
  end, __xs8)
end
function _62(...)
  local __xs9 = unstash({...})
  return pairwise(function (a, b)
    return a > b
  end, __xs9)
end
function _61(...)
  local __xs10 = unstash({...})
  return pairwise(function (a, b)
    return a == b
  end, __xs10)
end
function _6061(...)
  local __xs11 = unstash({...})
  return pairwise(function (a, b)
    return a <= b
  end, __xs11)
end
function _6261(...)
  local __xs12 = unstash({...})
  return pairwise(function (a, b)
    return a >= b
  end, __xs12)
end
function number(s)
  return tonumber(s)
end
function number_code63(n)
  return n > 47 and n < 58
end
function numeric63(s)
  local __n19 = _35(s)
  local __i29 = 0
  while __i29 < __n19 do
    if not number_code63(code(s, __i29)) then
      return false
    end
    __i29 = __i29 + 1
  end
  return some63(s)
end
function escape(s)
  local __s11 = "\""
  local __i30 = 0
  while __i30 < _35(s) do
    local __c = char(s, __i30)
    local __e18
    if __c == "\n" then
      __e18 = "\\n"
    else
      local __e19
      if __c == "\r" then
        __e19 = "\\r"
      else
        local __e20
        if __c == "\"" then
          __e20 = "\\\""
        else
          local __e21
          if __c == "\\" then
            __e21 = "\\\\"
          else
            __e21 = __c
          end
          __e20 = __e21
        end
        __e19 = __e20
      end
      __e18 = __e19
    end
    local __c1 = __e18
    __s11 = __s11 .. __c1
    __i30 = __i30 + 1
  end
  return __s11 .. "\""
end
function str(x, stack)
  if nil63(x) then
    return "nil"
  else
    if nan63(x) then
      return "nan"
    else
      if x == inf then
        return "inf"
      else
        if x == _inf then
          return "-inf"
        else
          if boolean63(x) then
            if x then
              return "true"
            else
              return "false"
            end
          else
            if string63(x) then
              return escape(x)
            else
              if atom63(x) then
                return tostring(x)
              else
                if function63(x) then
                  return "function"
                else
                  if stack and in63(x, stack) then
                    return "circular"
                  else
                    if not( type(x) == "table") then
                      return escape(tostring(x))
                    else
                      local __s2 = "("
                      local __sp = ""
                      local __xs13 = {}
                      local __ks = {}
                      local __l8 = stack or {}
                      add(__l8, x)
                      local ____o16 = x
                      local __k14 = nil
                      for __k14 in next, ____o16 do
                        local __v19 = ____o16[__k14]
                        if number63(__k14) then
                          __xs13[__k14] = str(__v19, __l8)
                        else
                          if not string63(__k14) then
                            __k14 = str(__k14, __l8)
                          end
                          add(__ks, __k14 .. ":")
                          add(__ks, str(__v19, __l8))
                        end
                      end
                      drop(__l8)
                      local ____o17 = join(__xs13, __ks)
                      local ____i32 = nil
                      for ____i32 in next, ____o17 do
                        local __v20 = ____o17[____i32]
                        __s2 = __s2 .. __sp .. __v20
                        __sp = " "
                      end
                      return __s2 .. ")"
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
local values = unpack or table["unpack"]
function apply(f, args)
  local __args10 = stash(args)
  return f(values(__args10))
end
function call(f, ...)
  local ____r152 = unstash({...})
  local __f2 = destash33(f, ____r152)
  local ____id62 = ____r152
  local __args111 = cut(____id62, 0)
  return apply(__f2, __args111)
end
function setenv(k, ...)
  local ____r153 = unstash({...})
  local __k15 = destash33(k, ____r153)
  local ____id63 = ____r153
  local __keys = cut(____id63, 0)
  if string63(__k15) then
    local __e22
    if __keys["toplevel"] then
      __e22 = hd(environment)
    else
      __e22 = last(environment)
    end
    local __frame = __e22
    local __entry = __frame[__k15] or {}
    local ____o18 = __keys
    local __k16 = nil
    for __k16 in next, ____o18 do
      local __v21 = ____o18[__k16]
      __entry[__k16] = __v21
    end
    __frame[__k15] = __entry
    return __frame[__k15]
  end
end
local math = math
abs = math["abs"]
acos = math["acos"]
asin = math["asin"]
atan = math["atan"]
atan2 = math["atan2"]
ceil = math["ceil"]
cos = math["cos"]
floor = math["floor"]
log = math["log"]
log10 = math["log10"]
max = math["max"]
min = math["min"]
pow = math["pow"]
random = math["random"]
sin = math["sin"]
sinh = math["sinh"]
sqrt = math["sqrt"]
tan = math["tan"]
tanh = math["tanh"]
trunc = math["floor"]
setenv("quote", {_stash = true, macro = function (form)
  return quoted(form)
end})
setenv("quasiquote", {_stash = true, macro = function (form)
  return quasiexpand(form, 1)
end})
setenv("set", {_stash = true, macro = function (...)
  local __args11 = unstash({...})
  return join({"do"}, map(function (__x363)
    local ____id63 = __x363
    local __lh5 = ____id63[1]
    local __rh5 = ____id63[2]
    return {"%set", __lh5, __rh5}
  end, pair(__args11)))
end})
setenv("at", {_stash = true, macro = function (l, i)
  if target == "lua" and number63(i) then
    i = i + 1
  else
    if target == "lua" then
      i = {"+", i, 1}
    end
  end
  return {"get", l, i}
end})
setenv("wipe", {_stash = true, macro = function (place)
  if target == "lua" then
    return {"set", place, "nil"}
  else
    return {"%delete", place}
  end
end})
setenv("list", {_stash = true, macro = function (...)
  local __body47 = unstash({...})
  local __x382 = unique("x")
  local __l5 = {}
  local __forms3 = {}
  local ____o7 = __body47
  local __k8 = nil
  for __k8 in next, ____o7 do
    local __v11 = ____o7[__k8]
    if number63(__k8) then
      __l5[__k8] = __v11
    else
      add(__forms3, {"set", {"get", __x382, {"quote", __k8}}, __v11})
    end
  end
  if some63(__forms3) then
    return join({"let", __x382, join({"%array"}, __l5)}, __forms3, {__x382})
  else
    return join({"%array"}, __l5)
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local __branches3 = unstash({...})
  return hd(expand_if(__branches3))
end})
setenv("case", {_stash = true, macro = function (expr, ...)
  local ____r93 = unstash({...})
  local __expr3 = destash33(expr, ____r93)
  local ____id66 = ____r93
  local __clauses5 = cut(____id66, 0)
  local __x403 = unique("x")
  local __eq3 = function (_)
    return {"=", {"quote", _}, __x403}
  end
  local __cl3 = function (__x406)
    local ____id67 = __x406
    local __a7 = ____id67[1]
    local __b3 = ____id67[2]
    if nil63(__b3) then
      return {__a7}
    else
      if string63(__a7) or number63(__a7) then
        return {__eq3(__a7), __b3}
      else
        if one63(__a7) then
          return {__eq3(hd(__a7)), __b3}
        else
          if _35(__a7) > 1 then
            return {join({"or"}, map(__eq3, __a7)), __b3}
          end
        end
      end
    end
  end
  return {"let", __x403, __expr3, join({"if"}, apply(join, map(__cl3, pair(__clauses5))))}
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local ____r97 = unstash({...})
  local __cond5 = destash33(cond, ____r97)
  local ____id69 = ____r97
  local __body49 = cut(____id69, 0)
  return {"if", __cond5, join({"do"}, __body49)}
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local ____r99 = unstash({...})
  local __cond7 = destash33(cond, ____r99)
  local ____id71 = ____r99
  local __body51 = cut(____id71, 0)
  return {"if", {"not", __cond7}, join({"do"}, __body51)}
end})
setenv("obj", {_stash = true, macro = function (...)
  local __body53 = unstash({...})
  return join({"%object"}, mapo(function (x)
    return x
  end, __body53))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local ____r103 = unstash({...})
  local __bs9 = destash33(bs, ____r103)
  local ____id76 = ____r103
  local __body55 = cut(____id76, 0)
  if atom63(__bs9) then
    return join({"let", {__bs9, hd(__body55)}}, tl(__body55))
  else
    if none63(__bs9) then
      return join({"do"}, __body55)
    else
      local ____id77 = __bs9
      local __lh7 = ____id77[1]
      local __rh7 = ____id77[2]
      local __bs24 = cut(____id77, 2)
      local ____id78 = bind(__lh7, __rh7)
      local __id79 = ____id78[1]
      local __val3 = ____id78[2]
      local __bs14 = cut(____id78, 2)
      local __renames3 = {}
      if not id_literal63(__id79) then
        local __id141 = unique(__id79)
        __renames3 = {__id79, __id141}
        __id79 = __id141
      end
      return {"do", {"%local", __id79, __val3}, {"let-symbol", __renames3, join({"let", join(__bs14, __bs24)}, __body55)}}
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local ____r105 = unstash({...})
  local __x451 = destash33(x, ____r105)
  local __v13 = destash33(v, ____r105)
  local ____id81 = ____r105
  local __body57 = cut(____id81, 0)
  return join({"let", {__x451, __v13}}, __body57, {__x451})
end})
setenv("let-when", {_stash = true, macro = function (x, v, ...)
  local ____r107 = unstash({...})
  local __x462 = destash33(x, ____r107)
  local __v15 = destash33(v, ____r107)
  local ____id83 = ____r107
  local __body59 = cut(____id83, 0)
  local __y3 = unique("y")
  return {"let", __y3, __v15, {"when", {"yes", __y3}, join({"let", {__x462, __y3}}, __body59)}}
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local ____r109 = unstash({...})
  local __name11 = destash33(name, ____r109)
  local __args13 = destash33(args, ____r109)
  local ____id85 = ____r109
  local __body61 = cut(____id85, 0)
  local ____x472 = {"setenv", {"quote", __name11}}
  ____x472["macro"] = join({"fn", __args13}, __body61)
  local __form7 = ____x472
  _eval(__form7)
  return __form7
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local ____r111 = unstash({...})
  local __name13 = destash33(name, ____r111)
  local __args15 = destash33(args, ____r111)
  local ____id87 = ____r111
  local __body63 = cut(____id87, 0)
  local ____x479 = {"setenv", {"quote", __name13}}
  ____x479["special"] = join({"fn", __args15}, __body63)
  local __form9 = join(____x479, keys(__body63))
  _eval(__form9)
  return __form9
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local ____x485 = {"setenv", {"quote", name}}
  ____x485["symbol"] = {"quote", expansion}
  return ____x485
end})
setenv("define-reader", {_stash = true, macro = function (__x493, ...)
  local ____id90 = __x493
  local __char3 = ____id90[1]
  local __s3 = ____id90[2]
  local ____r115 = unstash({...})
  local ____x493 = destash33(__x493, ____r115)
  local ____id91 = ____r115
  local __body65 = cut(____id91, 0)
  return {"set", {"get", "read-table", __char3}, join({"fn", {__s3}}, __body65)}
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local ____r117 = unstash({...})
  local __name15 = destash33(name, ____r117)
  local __x503 = destash33(x, ____r117)
  local ____id93 = ____r117
  local __body67 = cut(____id93, 0)
  setenv(__name15, {_stash = true, variable = true})
  if some63(__body67) then
    return join({"%local-function", __name15}, bind42(__x503, __body67))
  else
    return {"%local", __name15, __x503}
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local ____r119 = unstash({...})
  local __name17 = destash33(name, ____r119)
  local __x510 = destash33(x, ____r119)
  local ____id95 = ____r119
  local __body69 = cut(____id95, 0)
  setenv(__name17, {_stash = true, toplevel = true, variable = true})
  if some63(__body69) then
    return join({"%global-function", __name17}, bind42(__x510, __body69))
  else
    return {"set", __name17, __x510}
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local __body71 = unstash({...})
  local __x521 = unique("x")
  return {"do", {"add", "environment", {"obj"}}, {"with", __x521, join({"do"}, __body71), {"drop", "environment"}}}
end})
setenv("with-bindings", {_stash = true, macro = function (__x533, ...)
  local ____id98 = __x533
  local __names7 = ____id98[1]
  local ____r121 = unstash({...})
  local ____x533 = destash33(__x533, ____r121)
  local ____id99 = ____r121
  local __body73 = cut(____id99, 0)
  local __x535 = unique("x")
  local ____x538 = {"setenv", __x535}
  ____x538["variable"] = true
  return join({"with-frame", {"each", __x535, __names7, ____x538}}, __body73)
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local ____r124 = unstash({...})
  local __definitions3 = destash33(definitions, ____r124)
  local ____id101 = ____r124
  local __body75 = cut(____id101, 0)
  add(environment, {})
  map(function (m)
    return macroexpand(join({"define-macro"}, m))
  end, __definitions3)
  local ____x543 = join({"do"}, macroexpand(__body75))
  drop(environment)
  return ____x543
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local ____r128 = unstash({...})
  local __expansions3 = destash33(expansions, ____r128)
  local ____id104 = ____r128
  local __body77 = cut(____id104, 0)
  add(environment, {})
  map(function (__x552)
    local ____id105 = __x552
    local __name19 = ____id105[1]
    local __exp3 = ____id105[2]
    return macroexpand({"define-symbol", __name19, __exp3})
  end, pair(__expansions3))
  local ____x551 = join({"do"}, macroexpand(__body77))
  drop(environment)
  return ____x551
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local ____r132 = unstash({...})
  local __names9 = destash33(names, ____r132)
  local ____id107 = ____r132
  local __body79 = cut(____id107, 0)
  local __bs111 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names9)
  return join({"let", apply(join, __bs111)}, __body79)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local ____r135 = unstash({...})
  local __args17 = destash33(args, ____r135)
  local ____id109 = ____r135
  local __body81 = cut(____id109, 0)
  return join({"%function"}, bind42(__args17, __body81))
end})
setenv("apply", {_stash = true, macro = function (f, ...)
  local ____r137 = unstash({...})
  local __f3 = destash33(f, ____r137)
  local ____id1111 = ____r137
  local __args19 = cut(____id1111, 0)
  if _35(__args19) > 1 then
    return {"%call", "apply", __f3, {"join", join({"list"}, almost(__args19)), last(__args19)}}
  else
    return join({"%call", "apply", __f3}, __args19)
  end
end})
setenv("guard", {_stash = true, macro = function (expr)
  if target == "js" then
    return {{"fn", join(), {"%try", {"list", true, expr}}}}
  else
    local ____x610 = {"obj"}
    ____x610["stack"] = {{"get", "debug", {"quote", "traceback"}}}
    ____x610["message"] = {"if", {"string?", "m"}, {"clip", "m", {"+", {"or", {"search", "m", "\": \""}, -2}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
    return {"list", {"xpcall", {"fn", join(), expr}, {"fn", {"m"}, {"if", {"obj?", "m"}, "m", ____x610}}}}
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local ____r141 = unstash({...})
  local __x637 = destash33(x, ____r141)
  local __t5 = destash33(t, ____r141)
  local ____id114 = ____r141
  local __body83 = cut(____id114, 0)
  local __o9 = unique("o")
  local __n9 = unique("n")
  local __i13 = unique("i")
  local __e21
  if atom63(__x637) then
    __e21 = {__i13, __x637}
  else
    local __e22
    if _35(__x637) > 1 then
      __e22 = __x637
    else
      __e22 = {__i13, hd(__x637)}
    end
    __e21 = __e22
  end
  local ____id115 = __e21
  local __k10 = ____id115[1]
  local __v17 = ____id115[2]
  local __e23
  if target == "lua" then
    __e23 = __body83
  else
    __e23 = {join({"let", __k10, {"if", {"numeric?", __k10}, {"parseInt", __k10}, __k10}}, __body83)}
  end
  return {"let", {__o9, __t5, __k10, "nil"}, {"%for", __o9, __k10, join({"let", {__v17, {"get", __o9, __k10}}}, __e23)}}
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local ____r143 = unstash({...})
  local __i15 = destash33(i, ____r143)
  local __to3 = destash33(to, ____r143)
  local ____id117 = ____r143
  local __body85 = cut(____id117, 0)
  return {"let", __i15, 0, join({"while", {"<", __i15, __to3}}, __body85, {{"inc", __i15}})}
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local ____r145 = unstash({...})
  local __v19 = destash33(v, ____r145)
  local __t7 = destash33(t, ____r145)
  local ____id119 = ____r145
  local __body87 = cut(____id119, 0)
  local __x671 = unique("x")
  local __i17 = unique("i")
  return {"let", {__x671, __t7}, {"for", __i17, {"#", __x671}, join({"let", {__v19, {"at", __x671, __i17}}}, __body87)}}
end})
setenv("set-of", {_stash = true, macro = function (...)
  local __xs3 = unstash({...})
  local __l7 = {}
  local ____o11 = __xs3
  local ____i19 = nil
  for ____i19 in next, ____o11 do
    local __x682 = ____o11[____i19]
    __l7[__x682] = true
  end
  return join({"obj"}, __l7)
end})
setenv("language", {_stash = true, macro = function ()
  return {"quote", target}
end})
setenv("target", {_stash = true, macro = function (...)
  local __clauses7 = unstash({...})
  return __clauses7[target]
end})
setenv("join!", {_stash = true, macro = function (a, ...)
  local ____r149 = unstash({...})
  local __a9 = destash33(a, ____r149)
  local ____id1211 = ____r149
  local __bs131 = cut(____id1211, 0)
  return {"set", __a9, join({"join", __a9}, __bs131)}
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local ____r151 = unstash({...})
  local __a11 = destash33(a, ____r151)
  local ____id123 = ____r151
  local __bs15 = cut(____id123, 0)
  return {"set", __a11, join({"cat", __a11}, __bs15)}
end})
setenv("inc", {_stash = true, macro = function (n, by)
  local __e24
  if nil63(by) then
    __e24 = 1
  else
    __e24 = by
  end
  return {"set", n, {"+", n, __e24}}
end})
setenv("dec", {_stash = true, macro = function (n, by)
  local __e25
  if nil63(by) then
    __e25 = 1
  else
    __e25 = by
  end
  return {"set", n, {"-", n, __e25}}
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local __x710 = unique("x")
  return {"do", {"inc", "indent-level"}, {"with", __x710, form, {"dec", "indent-level"}}}
end})
setenv("export", {_stash = true, macro = function (...)
  local __names11 = unstash({...})
  local ____x730 = {"target"}
  ____x730["js"] = {"if", {"=", {"typeof", "exports"}, "\"undefined\""}, {"obj"}, "exports"}
  ____x730["lua"] = {"or", "exports", {"obj"}}
  local ____x740 = {"target"}
  ____x740["js"] = "exports"
  ____x740["lua"] = {"return", "exports"}
  return join({"let", "exports", ____x730}, map(function (k)
    return {"set", {"get", "exports", "." .. k}, k}
  end, __names11), {____x740})
end})
setenv("when-compiling", {_stash = true, macro = function (...)
  local __body89 = unstash({...})
  return _eval(join({"do"}, __body89))
end})
setenv("during-compilation", {_stash = true, macro = function (...)
  local __body91 = unstash({...})
  local __form11 = join({"do"}, __body91)
  _eval(__form11)
  return __form11
end})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
local function eval_print(form)
  local ____id62 = {xpcall(function ()
    return compiler._eval(form)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e14
      if string63(m) then
        __e14 = clip(m, (search(m, ": ") or -2) + 2)
      else
        local __e15
        if nil63(m) then
          __e15 = ""
        else
          __e15 = str(m)
        end
        __e14 = __e15
      end
      return {stack = debug["traceback"](), message = __e14}
    end
  end)}
  local __ok = ____id62[1]
  local __v10 = ____id62[2]
  if not __ok then
    return print("error: " .. __v10.message .. "\n" .. __v10.stack)
  else
    if is63(__v10) then
      return print(str(__v10))
    end
  end
end
local function read_eval(s)
  local __form6 = reader.read_string(s)
  return compiler._eval(__form6)
end
local function repl()
  local __buf = ""
  local function rep1(s)
    __buf = __buf .. s
    local __more = {}
    local __form7 = reader.read_string(__buf, __more)
    if not( __form7 == __more) then
      eval_print(__form7)
      __buf = ""
      return system.write("> ")
    end
  end
  system.write("> ")
  while true do
    local __s2 = io.read()
    if __s2 then
      rep1(__s2 .. "\n")
    else
      break
    end
  end
end
function compile_file(path)
  local __s3 = reader.stream(system.read_file(path))
  local __body46 = reader.read_all(__s3)
  local __form8 = compiler.expand(join({"do"}, __body46))
  return compiler.compile(__form8, {_stash = true, stmt = true})
end
function _load(path)
  local __previous = target
  target = "lua"
  local __code = compile_file(path)
  target = __previous
  return compiler.run(__code)
end
local function script_file63(path)
  return not( "-" == char(path, 0) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))
end
local function run_file(path)
  if script_file63(path) then
    return _load(path)
  else
    return compiler.run(system.read_file(path))
  end
end
local function usage()
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -l <input>\tLoad input file")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
end
local function main()
  local __arg = hd(system.argv)
  if __arg and script_file63(__arg) then
    return _load(__arg)
  else
    if __arg == "-h" or __arg == "--help" then
      return usage()
    else
      local __pre = {}
      local __input = nil
      local __output = nil
      local __target1 = nil
      local __expr2 = nil
      local __argv = system.argv
      local __i10 = 0
      while __i10 < _35(__argv) do
        local __a6 = __argv[__i10 + 1]
        if __a6 == "-l" or __a6 == "-c" or __a6 == "-o" or __a6 == "-t" or __a6 == "-e" then
          if __i10 == edge(__argv) then
            print("missing argument for " .. __a6)
          else
            __i10 = __i10 + 1
            local __val2 = __argv[__i10 + 1]
            if __a6 == "-l" then
              _load(__val2)
            else
              if __a6 == "-c" then
                __input = __val2
              else
                if __a6 == "-o" then
                  __output = __val2
                else
                  if __a6 == "-t" then
                    __target1 = __val2
                  else
                    if __a6 == "-e" then
                      __expr2 = __val2
                      read_eval(__expr2)
                    end
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a6, 0)) then
            add(__pre, __a6)
          end
        end
        __i10 = __i10 + 1
      end
      local ____x360 = __pre
      local ____i11 = 0
      while ____i11 < _35(____x360) do
        local __file = ____x360[____i11 + 1]
        run_file(__file)
        ____i11 = ____i11 + 1
      end
      if nil63(__input) then
        if __expr2 then
          if is63(_37result) then
            return print(str(_37result))
          end
        else
          return repl()
        end
      else
        if __target1 then
          target = __target1
        end
        local __code1 = compile_file(__input)
        if nil63(__output) or __output == "-" then
          return print(__code1)
        else
          return system.write_file(__output, __code1)
        end
      end
    end
  end
end
main()
