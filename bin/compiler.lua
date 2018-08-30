local reader = require("reader")
local function getenv(k, p)
  if string63(k) then
    local __i10 = edge(environment)
    while __i10 >= 0 do
      local __b2 = environment[__i10 + 1][k]
      if is63(__b2) then
        local __e35
        if p then
          __e35 = __b2[p]
        else
          __e35 = __b2
        end
        return __e35
      else
        __i10 = __i10 - 1
      end
    end
  end
end
local function macro_function(k)
  return getenv(k, "macro")
end
local function macro63(k)
  return is63(macro_function(k))
end
local function special63(k)
  return is63(getenv(k, "special"))
end
local function special_form63(form)
  return not atom63(form) and special63(hd(form))
end
local function statement63(k)
  return special63(k) and getenv(k, "stmt")
end
local function symbol_expansion(k)
  return getenv(k, "symbol")
end
local function symbol63(k)
  return is63(symbol_expansion(k))
end
local function variable63(k)
  return is63(getenv(k, "variable"))
end
function bound63(x)
  return macro63(x) or special63(x) or symbol63(x) or variable63(x)
end
function quoted(form)
  if string63(form) then
    return escape(form)
  else
    if atom63(form) then
      return form
    else
      return join({"list"}, map(quoted, form))
    end
  end
end
local function literal(s)
  if string_literal63(s) then
    return s
  else
    return quoted(s)
  end
end
local function stash42(args)
  if keys63(args) then
    local __l4 = {"%object", "\"_stash\"", true}
    local ____o6 = args
    local __k6 = nil
    for __k6 in next, ____o6 do
      local __v10 = ____o6[__k6]
      if not number63(__k6) then
        add(__l4, literal(__k6))
        add(__l4, __v10)
      end
    end
    return join(args, {__l4})
  else
    return args
  end
end
local function bias(k)
  if number63(k) and not( target == "lua") then
    if target == "js" then
      k = k - 1
    else
      k = k + 1
    end
  end
  return k
end
function bind(lh, rh)
  if atom63(lh) then
    return {lh, rh}
  else
    local __id62 = unique("id")
    local __bs8 = {__id62, rh}
    local ____o7 = lh
    local __k7 = nil
    for __k7 in next, ____o7 do
      local __v11 = ____o7[__k7]
      local __e36
      if __k7 == "rest" then
        __e36 = {"cut", __id62, _35(lh)}
      else
        __e36 = {"get", __id62, {"quote", bias(__k7)}}
      end
      local __x363 = __e36
      if is63(__k7) then
        local __e37
        if __v11 == true then
          __e37 = __k7
        else
          __e37 = __v11
        end
        local __k8 = __e37
        __bs8 = join(__bs8, bind(__k8, __x363))
      end
    end
    return __bs8
  end
end
setenv("arguments%", {_stash = true, macro = function (from)
  return {{"get", {"get", {"get", "Array", ".prototype"}, ".slice"}, ".call"}, "arguments", from}
end})
function bind42(args, body)
  local __args11 = {}
  local function rest()
    __args11["rest"] = true
    if target == "js" then
      return {"unstash", {"arguments%", _35(__args11)}}
    else
      return {"unstash", {"list", "|...|"}}
    end
  end
  if atom63(args) then
    return {__args11, join({"let", {args, rest()}}, body)}
  else
    local __bs9 = {}
    local __r99 = unique("r")
    local ____o8 = args
    local __k9 = nil
    for __k9 in next, ____o8 do
      local __v12 = ____o8[__k9]
      if number63(__k9) then
        if atom63(__v12) then
          add(__args11, __v12)
        else
          local __x382 = unique("x")
          add(__args11, __x382)
          __bs9 = join(__bs9, {__v12, __x382})
        end
      end
    end
    if keys63(args) then
      __bs9 = join(__bs9, {__r99, rest()})
      local __n9 = _35(__args11)
      local __i14 = 0
      while __i14 < __n9 do
        local __v13 = __args11[__i14 + 1]
        __bs9 = join(__bs9, {__v13, {"destash!", __v13, __r99}})
        __i14 = __i14 + 1
      end
      __bs9 = join(__bs9, {keys(args), __r99})
    end
    return {__args11, join({"let", __bs9}, body)}
  end
end
local function quoting63(depth)
  return number63(depth)
end
local function quasiquoting63(depth)
  return quoting63(depth) and depth > 0
end
local function can_unquote63(depth)
  return quoting63(depth) and depth == 1
end
local function quasisplice63(x, depth)
  return can_unquote63(depth) and not atom63(x) and hd(x) == "unquote-splicing"
end
local function expand_local(__x390)
  local ____id63 = __x390
  local __x391 = ____id63[1]
  local __name10 = ____id63[2]
  local __value = ____id63[3]
  setenv(__name10, {_stash = true, variable = true})
  return {"%local", __name10, macroexpand(__value)}
end
local function expand_function(__x393)
  local ____id64 = __x393
  local __x394 = ____id64[1]
  local __args10 = ____id64[2]
  local __body46 = cut(____id64, 2)
  add(environment, {})
  local ____o9 = __args10
  local ____i15 = nil
  for ____i15 in next, ____o9 do
    local ____x395 = ____o9[____i15]
    setenv(____x395, {_stash = true, variable = true})
  end
  local ____x396 = join({"%function", __args10}, macroexpand(__body46))
  drop(environment)
  return ____x396
end
local function expand_definition(__x398)
  local ____id65 = __x398
  local __x399 = ____id65[1]
  local __name11 = ____id65[2]
  local __args111 = ____id65[3]
  local __body47 = cut(____id65, 3)
  add(environment, {})
  local ____o10 = __args111
  local ____i16 = nil
  for ____i16 in next, ____o10 do
    local ____x400 = ____o10[____i16]
    setenv(____x400, {_stash = true, variable = true})
  end
  local ____x401 = join({__x399, __name11, __args111}, macroexpand(__body47))
  drop(environment)
  return ____x401
end
local function expand_macro(form)
  return macroexpand(expand1(form))
end
function expand1(__x403)
  local ____id66 = __x403
  local __name12 = ____id66[1]
  local __body48 = cut(____id66, 1)
  return apply(macro_function(__name12), __body48)
end
function macroexpand(form)
  if symbol63(form) then
    return macroexpand(symbol_expansion(form))
  else
    if atom63(form) then
      return form
    else
      local __x404 = hd(form)
      if __x404 == "%local" then
        return expand_local(form)
      else
        if __x404 == "%function" then
          return expand_function(form)
        else
          if __x404 == "%global-function" then
            return expand_definition(form)
          else
            if __x404 == "%local-function" then
              return expand_definition(form)
            else
              if macro63(__x404) then
                return expand_macro(form)
              else
                return map(macroexpand, form)
              end
            end
          end
        end
      end
    end
  end
end
local function quasiquote_list(form, depth)
  local __xs2 = {{"list"}}
  local ____o11 = form
  local __k10 = nil
  for __k10 in next, ____o11 do
    local __v14 = ____o11[__k10]
    if not number63(__k10) then
      local __e38
      if quasisplice63(__v14, depth) then
        __e38 = quasiexpand(__v14[2])
      else
        __e38 = quasiexpand(__v14, depth)
      end
      local __v15 = __e38
      last(__xs2)[__k10] = __v15
    end
  end
  local ____x407 = form
  local ____i18 = 0
  while ____i18 < _35(____x407) do
    local __x408 = ____x407[____i18 + 1]
    if quasisplice63(__x408, depth) then
      local __x409 = quasiexpand(__x408[2])
      add(__xs2, __x409)
      add(__xs2, {"list"})
    else
      add(last(__xs2), quasiexpand(__x408, depth))
    end
    ____i18 = ____i18 + 1
  end
  local __pruned = keep(function (x)
    return _35(x) > 1 or not( hd(x) == "list") or keys63(x)
  end, __xs2)
  if one63(__pruned) then
    return hd(__pruned)
  else
    return join({"join"}, __pruned)
  end
end
function quasiexpand(form, depth)
  if quasiquoting63(depth) then
    if atom63(form) then
      return {"quote", form}
    else
      if can_unquote63(depth) and hd(form) == "unquote" then
        return quasiexpand(form[2])
      else
        if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
          return quasiquote_list(form, depth - 1)
        else
          if hd(form) == "quasiquote" then
            return quasiquote_list(form, depth + 1)
          else
            return quasiquote_list(form, depth)
          end
        end
      end
    end
  else
    if atom63(form) then
      return form
    else
      if hd(form) == "quote" then
        return form
      else
        if hd(form) == "quasiquote" then
          return quasiexpand(form[2], 1)
        else
          return map(function (x)
            return quasiexpand(x, depth)
          end, form)
        end
      end
    end
  end
end
function expand_if(__x413)
  local ____id67 = __x413
  local __a6 = ____id67[1]
  local __b3 = ____id67[2]
  local __c = cut(____id67, 2)
  if is63(__b3) then
    return {join({"%if", __a6, __b3}, expand_if(__c))}
  else
    if is63(__a6) then
      return {__a6}
    end
  end
end
indent_level = 0
function indentation()
  local __s2 = ""
  local __i19 = 0
  while __i19 < indent_level do
    __s2 = __s2 .. "  "
    __i19 = __i19 + 1
  end
  return __s2
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["class"] = true, ["const"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["eval"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["import"] = true, ["in"] = true, ["instanceof"] = true, ["let"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["load"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
function reserved63(x)
  return has63(reserved, x)
end
local function valid_code63(n)
  return number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
end
function accessor_literal63(x)
  return string63(x) and _35(x) > 1 and char(x, 0) == "." and not( char(x, 1) == ".")
end
local function id(id)
  local __e39
  if accessor_literal63(id) then
    __e39 = clip(id, 1)
  else
    __e39 = id
  end
  local __id0 = __e39
  local __e40
  if number_code63(code(__id0, 0)) then
    __e40 = "_"
  else
    __e40 = ""
  end
  local __id131 = __e40
  local __i20 = 0
  while __i20 < _35(__id0) do
    local __c1 = char(__id0, __i20)
    local __n13 = code(__c1)
    local __e41
    if __c1 == "-" and not( __id0 == "-") then
      __e41 = "_"
    else
      local __e42
      if valid_code63(__n13) then
        __e42 = __c1
      else
        local __e43
        if __i20 == 0 then
          __e43 = "_" .. __n13
        else
          __e43 = __n13
        end
        __e42 = __e43
      end
      __e41 = __e42
    end
    local __c11 = __e41
    __id131 = __id131 .. __c11
    __i20 = __i20 + 1
  end
  if reserved63(__id131) then
    return "_" .. __id131
  else
    return __id131
  end
end
function valid_id63(x)
  return some63(x) and x == id(x)
end
local __names6 = {}
function unique(x)
  local __x417 = id(x)
  if __names6[__x417] then
    local __i21 = __names6[__x417]
    __names6[__x417] = __names6[__x417] + 1
    return unique(__x417 .. __i21)
  else
    __names6[__x417] = 1
    return "__" .. __x417
  end
end
function key(k)
  local __i22 = inner(k)
  if valid_id63(__i22) then
    return __i22
  else
    if target == "js" then
      return k
    else
      return "[" .. k .. "]"
    end
  end
end
function mapo(f, t)
  local __o12 = {}
  local ____o13 = t
  local __k11 = nil
  for __k11 in next, ____o13 do
    local __v16 = ____o13[__k11]
    local __x418 = f(__v16)
    if is63(__x418) then
      add(__o12, literal(__k11))
      add(__o12, __x418)
    end
  end
  return __o12
end
local ____x420 = {}
local ____x421 = {}
____x421["js"] = "!"
____x421["lua"] = "not"
____x420["not"] = ____x421
local ____x422 = {}
____x422["*"] = true
____x422["/"] = true
____x422["%"] = true
local ____x423 = {}
local ____x424 = {}
____x424["js"] = "+"
____x424["lua"] = ".."
____x423["cat"] = ____x424
local ____x425 = {}
____x425["+"] = true
____x425["-"] = true
local ____x426 = {}
____x426["<"] = true
____x426[">"] = true
____x426["<="] = true
____x426[">="] = true
local ____x427 = {}
local ____x428 = {}
____x428["js"] = "==="
____x428["lua"] = "=="
____x427["="] = ____x428
local ____x429 = {}
local ____x430 = {}
____x430["js"] = "&&"
____x430["lua"] = "and"
____x429["and"] = ____x430
local ____x431 = {}
local ____x432 = {}
____x432["js"] = "||"
____x432["lua"] = "or"
____x431["or"] = ____x432
local infix = {____x420, ____x422, ____x423, ____x425, ____x426, ____x427, ____x429, ____x431}
local function unary63(form)
  return two63(form) and in63(hd(form), {"not", "-"})
end
local function index(k)
  if number63(k) then
    return k - 1
  end
end
local function precedence(form)
  if not( atom63(form) or unary63(form)) then
    local ____o14 = infix
    local __k12 = nil
    for __k12 in next, ____o14 do
      local __v17 = ____o14[__k12]
      if __v17[hd(form)] then
        return index(__k12)
      end
    end
  end
  return 0
end
local function getop(op)
  return find(function (level)
    local __x434 = level[op]
    if __x434 == true then
      return op
    else
      if is63(__x434) then
        return __x434[target]
      end
    end
  end, infix)
end
local function infix63(x)
  return is63(getop(x))
end
function infix_operator63(x)
  return obj63(x) and infix63(hd(x))
end
local function compile_args(args)
  local __s3 = "("
  local __c2 = ""
  local ____x435 = args
  local ____i25 = 0
  while ____i25 < _35(____x435) do
    local __x436 = ____x435[____i25 + 1]
    __s3 = __s3 .. __c2 .. compile(__x436)
    __c2 = ", "
    ____i25 = ____i25 + 1
  end
  return __s3 .. ")"
end
local function escape_newlines(s)
  local __s11 = ""
  local __i26 = 0
  while __i26 < _35(s) do
    local __c3 = char(s, __i26)
    local __e44
    if __c3 == "\n" then
      __e44 = "\\n"
    else
      local __e45
      if __c3 == "\r" then
        __e45 = "\\r"
      else
        __e45 = __c3
      end
      __e44 = __e45
    end
    __s11 = __s11 .. __e44
    __i26 = __i26 + 1
  end
  return __s11
end
local function compile_atom(x)
  if x == "nil" and target == "lua" then
    return x
  else
    if x == "nil" then
      return "undefined"
    else
      if id_literal63(x) then
        return inner(x)
      else
        if string_literal63(x) then
          return escape_newlines(x)
        else
          if string63(x) then
            return id(x)
          else
            if boolean63(x) then
              if x then
                return "true"
              else
                return "false"
              end
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
                    if number63(x) then
                      return x .. ""
                    else
                      return error("Cannot compile atom: " .. str(x))
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
local function terminator(stmt63)
  if not stmt63 then
    return ""
  else
    if target == "js" then
      return ";\n"
    else
      return "\n"
    end
  end
end
local function compile_special(form, stmt63)
  local ____id68 = form
  local __x437 = ____id68[1]
  local __args12 = cut(____id68, 1)
  local ____id69 = getenv(__x437)
  local __special = ____id69["special"]
  local __stmt = ____id69["stmt"]
  local __self_tr63 = ____id69["tr"]
  local __tr = terminator(stmt63 and not __self_tr63)
  return apply(__special, __args12) .. __tr
end
local function parenthesize_call63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
local function compile_call(form)
  local __f2 = hd(form)
  local __f11 = compile(__f2)
  local __args13 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f2) then
    return "(" .. __f11 .. ")" .. __args13
  else
    return __f11 .. __args13
  end
end
local function op_delims(parent, child, ...)
  local ____r138 = unstash({...})
  local __parent = destash33(parent, ____r138)
  local __child = destash33(child, ____r138)
  local ____id70 = ____r138
  local __right = ____id70["right"]
  local __e46
  if __right then
    __e46 = _6261
  else
    __e46 = _62
  end
  if __e46(precedence(__child), precedence(__parent)) then
    return {"(", ")"}
  else
    return {"", ""}
  end
end
local function compile_infix(form)
  local ____id71 = form
  local __op = ____id71[1]
  local ____id72 = cut(____id71, 1)
  local __a7 = ____id72[1]
  local __b4 = ____id72[2]
  local ____id73 = op_delims(form, __a7)
  local __ao = ____id73[1]
  local __ac = ____id73[2]
  local ____id74 = op_delims(form, __b4, {_stash = true, right = true})
  local __bo = ____id74[1]
  local __bc = ____id74[2]
  local __a8 = compile(__a7)
  local __b5 = compile(__b4)
  local __op1 = getop(__op)
  if unary63(form) then
    return __op1 .. __ao .. " " .. __a8 .. __ac
  else
    return __ao .. __a8 .. __ac .. " " .. __op1 .. " " .. __bo .. __b5 .. __bc
  end
end
function compile_function(args, body, ...)
  local ____r140 = unstash({...})
  local __args14 = destash33(args, ____r140)
  local __body49 = destash33(body, ____r140)
  local ____id75 = ____r140
  local __name13 = ____id75["name"]
  local __prefix = ____id75["prefix"]
  local __e47
  if __name13 then
    __e47 = compile(__name13)
  else
    __e47 = ""
  end
  local __id76 = __e47
  local __e48
  if target == "lua" and __args14["rest"] then
    __e48 = join(__args14, {"|...|"})
  else
    __e48 = __args14
  end
  local __args121 = __e48
  local __args15 = compile_args(__args121)
  indent_level = indent_level + 1
  local ____x443 = compile(__body49, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body50 = ____x443
  local __ind = indentation()
  local __e49
  if __prefix then
    __e49 = __prefix .. " "
  else
    __e49 = ""
  end
  local __p = __e49
  local __e50
  if target == "js" then
    __e50 = ""
  else
    __e50 = "end"
  end
  local __tr1 = __e50
  if __name13 then
    __tr1 = __tr1 .. "\n"
  end
  if target == "js" then
    return "function " .. __id76 .. __args15 .. " {\n" .. __body50 .. __ind .. "}" .. __tr1
  else
    return __p .. "function " .. __id76 .. __args15 .. "\n" .. __body50 .. __ind .. __tr1
  end
end
local function can_return63(form)
  return is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
end
function compile(form, ...)
  local ____r142 = unstash({...})
  local __form6 = destash33(form, ____r142)
  local ____id77 = ____r142
  local __stmt1 = ____id77["stmt"]
  if nil63(__form6) then
    return ""
  else
    if special_form63(__form6) then
      return compile_special(__form6, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e51
      if __stmt1 then
        __e51 = indentation()
      else
        __e51 = ""
      end
      local __ind1 = __e51
      local __e52
      if atom63(__form6) then
        __e52 = compile_atom(__form6)
      else
        local __e53
        if infix63(hd(__form6)) then
          __e53 = compile_infix(__form6)
        else
          __e53 = compile_call(__form6)
        end
        __e52 = __e53
      end
      local __form7 = __e52
      return __ind1 .. __form7 .. __tr2
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e14 = lower(form, __hoist, true, tail63)
  local __e54
  if some63(__hoist) and is63(__e14) then
    __e54 = join({"do"}, __hoist, {__e14})
  else
    local __e55
    if is63(__e14) then
      __e55 = __e14
    else
      local __e56
      if _35(__hoist) > 1 then
        __e56 = join({"do"}, __hoist)
      else
        __e56 = hd(__hoist)
      end
      __e55 = __e56
    end
    __e54 = __e55
  end
  return either(__e54, {"do"})
end
local function lower_body(body, tail63)
  return lower_statement(join({"do"}, body), tail63)
end
local function literal63(form)
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object"
end
local function standalone63(form)
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form)
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x450 = almost(args)
  local ____i27 = 0
  while ____i27 < _35(____x450) do
    local __x451 = ____x450[____i27 + 1]
    local ____y2 = lower(__x451, hoist, stmt63)
    if yes(____y2) then
      local __e15 = ____y2
      if standalone63(__e15) then
        add(hoist, __e15)
      end
    end
    ____i27 = ____i27 + 1
  end
  local __e16 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e16) then
    return {"return", __e16}
  else
    return __e16
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local ____id78 = args
  local __lh4 = ____id78[1]
  local __rh4 = ____id78[2]
  local __lh11 = lower(__lh4, hoist)
  local __rh11 = lower(__rh4, hoist)
  add(hoist, {"%set", __lh11, __rh11})
  if not( stmt63 and not tail63) then
    return __lh11
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local ____id79 = args
  local __cond4 = ____id79[1]
  local ___then = ____id79[2]
  local ___else = ____id79[3]
  if stmt63 then
    local __e58
    if is63(___else) then
      __e58 = {lower_body({___else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond4, hoist), lower_body({___then}, tail63)}, __e58))
  else
    local __e17 = unique("e")
    add(hoist, {"%local", __e17})
    local __e57
    if is63(___else) then
      __e57 = {lower({"%set", __e17, ___else})}
    end
    add(hoist, join({"%if", lower(__cond4, hoist), lower({"%set", __e17, ___then})}, __e57))
    return __e17
  end
end
local function lower_short(x, args, hoist)
  local ____id80 = args
  local __a9 = ____id80[1]
  local __b6 = ____id80[2]
  local __hoist1 = {}
  local __b11 = lower(__b6, __hoist1)
  if some63(__hoist1) then
    local __id81 = unique("id")
    local __e59
    if x == "and" then
      __e59 = {"%if", __id81, __b6, __id81}
    else
      __e59 = {"%if", __id81, __id81, __b6}
    end
    return lower({"do", {"%local", __id81, __a9}, __e59}, hoist)
  else
    return {x, lower(__a9, hoist), __b11}
  end
end
local function lower_try(args, hoist, tail63)
  return add(hoist, {"%try", lower_body(args, tail63)})
end
local function lower_while(args, hoist)
  local ____id82 = args
  local __c4 = ____id82[1]
  local __body51 = cut(____id82, 1)
  local __pre = {}
  local __c5 = lower(__c4, __pre)
  local __e60
  if none63(__pre) then
    __e60 = {"while", __c5, lower_body(__body51)}
  else
    __e60 = {"while", true, join({"do"}, __pre, {{"%if", {"not", __c5}, {"break"}}, lower_body(__body51)})}
  end
  return add(hoist, __e60)
end
local function lower_for(args, hoist)
  local ____id83 = args
  local __t4 = ____id83[1]
  local __k13 = ____id83[2]
  local __body52 = cut(____id83, 2)
  return add(hoist, {"%for", lower(__t4, hoist), __k13, lower_body(__body52)})
end
local function lower_function(args)
  local ____id84 = args
  local __a10 = ____id84[1]
  local __body53 = cut(____id84, 1)
  return {"%function", __a10, lower_body(__body53, true)}
end
local function lower_definition(kind, args, hoist)
  local ____id85 = args
  local __name14 = ____id85[1]
  local __args16 = ____id85[2]
  local __body54 = cut(____id85, 2)
  return add(hoist, {kind, __name14, __args16, lower_body(__body54, true)})
end
local function lower_call(form, hoist)
  local __form8 = map(function (x)
    return lower(x, hoist)
  end, form)
  if some63(__form8) then
    return __form8
  end
end
local function pairwise63(form)
  return in63(hd(form), {"<", "<=", "=", ">=", ">"})
end
local function lower_pairwise(form)
  if pairwise63(form) then
    local __e18 = {}
    local ____id86 = form
    local __x480 = ____id86[1]
    local __args17 = cut(____id86, 1)
    reduce(function (a, b)
      add(__e18, {__x480, a, b})
      return a
    end, __args17)
    return join({"and"}, reverse(__e18))
  else
    return form
  end
end
local function lower_infix63(form)
  return infix63(hd(form)) and _35(form) > 3
end
local function lower_infix(form, hoist)
  local __form9 = lower_pairwise(form)
  local ____id87 = __form9
  local __x483 = ____id87[1]
  local __args18 = cut(____id87, 1)
  return lower(reduce(function (a, b)
    return {__x483, b, a}
  end, reverse(__args18)), hoist)
end
local function lower_special(form, hoist)
  local __e19 = lower_call(form, hoist)
  if __e19 then
    return add(hoist, __e19)
  end
end
function lower(form, hoist, stmt63, tail63)
  if atom63(form) then
    return form
  else
    if empty63(form) then
      return {"%array"}
    else
      if nil63(hoist) then
        return lower_statement(form)
      else
        if lower_infix63(form) then
          return lower_infix(form, hoist)
        else
          local ____id88 = form
          local __x486 = ____id88[1]
          local __args19 = cut(____id88, 1)
          if __x486 == "do" then
            return lower_do(__args19, hoist, stmt63, tail63)
          else
            if __x486 == "%call" then
              return lower(__args19, hoist, stmt63, tail63)
            else
              if __x486 == "%set" then
                return lower_set(__args19, hoist, stmt63, tail63)
              else
                if __x486 == "%if" then
                  return lower_if(__args19, hoist, stmt63, tail63)
                else
                  if __x486 == "%try" then
                    return lower_try(__args19, hoist, tail63)
                  else
                    if __x486 == "while" then
                      return lower_while(__args19, hoist)
                    else
                      if __x486 == "%for" then
                        return lower_for(__args19, hoist)
                      else
                        if __x486 == "%function" then
                          return lower_function(__args19)
                        else
                          if __x486 == "%local-function" or __x486 == "%global-function" then
                            return lower_definition(__x486, __args19, hoist)
                          else
                            if in63(__x486, {"and", "or"}) then
                              return lower_short(__x486, __args19, hoist)
                            else
                              if statement63(__x486) then
                                return lower_special(form, hoist)
                              else
                                return lower_call(form, hoist)
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
        end
      end
    end
  end
end
function expand(form)
  return lower(macroexpand(form))
end
local load1 = loadstring or load
local function run(code)
  local f,e = load1(code)
  if f then
    return f()
  else
    return error(e .. " in " .. code)
  end
end
_37result = nil
function _eval(form)
  local __previous = target
  target = "lua"
  local __code = compile(expand({"set", "%result", form}))
  target = __previous
  run(__code)
  return _37result
end
function immediate_call63(x)
  return obj63(x) and obj63(hd(x)) and hd(hd(x)) == "%function"
end
setenv("do", {_stash = true, special = function (...)
  local __forms3 = unstash({...})
  local __s5 = ""
  local ____x492 = __forms3
  local ____i29 = 0
  while ____i29 < _35(____x492) do
    local __x493 = ____x492[____i29 + 1]
    if target == "lua" and immediate_call63(__x493) and "\n" == char(__s5, edge(__s5)) then
      __s5 = clip(__s5, 0, edge(__s5)) .. ";\n"
    end
    __s5 = __s5 .. compile(__x493, {_stash = true, stmt = true})
    if not atom63(__x493) then
      if hd(__x493) == "return" or hd(__x493) == "break" then
        break
      end
    end
    ____i29 = ____i29 + 1
  end
  return __s5
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local __cond6 = compile(cond)
  indent_level = indent_level + 1
  local ____x496 = compile(cons, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __cons1 = ____x496
  local __e61
  if alt then
    indent_level = indent_level + 1
    local ____x497 = compile(alt, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    __e61 = ____x497
  end
  local __alt1 = __e61
  local __ind3 = indentation()
  local __s7 = ""
  if target == "js" then
    __s7 = __s7 .. __ind3 .. "if (" .. __cond6 .. ") {\n" .. __cons1 .. __ind3 .. "}"
  else
    __s7 = __s7 .. __ind3 .. "if " .. __cond6 .. " then\n" .. __cons1
  end
  if __alt1 and target == "js" then
    __s7 = __s7 .. " else {\n" .. __alt1 .. __ind3 .. "}"
  else
    if __alt1 then
      __s7 = __s7 .. __ind3 .. "else\n" .. __alt1
    end
  end
  if target == "lua" then
    return __s7 .. __ind3 .. "end\n"
  else
    return __s7 .. "\n"
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local __cond8 = compile(cond)
  indent_level = indent_level + 1
  local ____x499 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body56 = ____x499
  local __ind5 = indentation()
  if target == "js" then
    return __ind5 .. "while (" .. __cond8 .. ") {\n" .. __body56 .. __ind5 .. "}\n"
  else
    return __ind5 .. "while " .. __cond8 .. " do\n" .. __body56 .. __ind5 .. "end\n"
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local __t6 = compile(t)
  local __ind7 = indentation()
  indent_level = indent_level + 1
  local ____x501 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body58 = ____x501
  if target == "lua" then
    return __ind7 .. "for " .. k .. " in next, " .. __t6 .. " do\n" .. __body58 .. __ind7 .. "end\n"
  else
    return __ind7 .. "for (" .. k .. " in " .. __t6 .. ") {\n" .. __body58 .. __ind7 .. "}\n"
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local __e22 = unique("e")
  local __ind9 = indentation()
  indent_level = indent_level + 1
  local ____x506 = compile(form, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __body60 = ____x506
  local __hf1 = {"return", {"%array", false, __e22}}
  indent_level = indent_level + 1
  local ____x509 = compile(__hf1, {_stash = true, stmt = true})
  indent_level = indent_level - 1
  local __h1 = ____x509
  return __ind9 .. "try {\n" .. __body60 .. __ind9 .. "}\n" .. __ind9 .. "catch (" .. __e22 .. ") {\n" .. __h1 .. __ind9 .. "}\n"
end, stmt = true, tr = true})
setenv("%delete", {_stash = true, special = function (place)
  return indentation() .. "delete " .. compile(place)
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return indentation() .. "break"
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return compile_function(args, body)
end})
setenv("%global-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x513 = compile_function(args, body, {_stash = true, name = name})
    return indentation() .. __x513
  else
    return compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if target == "lua" then
    local __x519 = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return indentation() .. __x519
  else
    return compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local __e62
  if nil63(x) then
    __e62 = "return"
  else
    __e62 = "return " .. compile(x)
  end
  local __x523 = __e62
  return indentation() .. __x523
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return "new " .. compile(x)
end})
setenv("typeof", {_stash = true, special = function (x)
  return "typeof(" .. compile(x) .. ")"
end})
setenv("throw", {_stash = true, special = function (x)
  local __e63
  if target == "js" then
    __e63 = "throw " .. compile(x)
  else
    __e63 = "error(" .. compile(x) .. ")"
  end
  local __e26 = __e63
  return indentation() .. __e26
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  local __id90 = compile(name)
  local __value11 = compile(value)
  local __e64
  if is63(value) then
    __e64 = " = " .. __value11
  else
    __e64 = ""
  end
  local __rh6 = __e64
  local __e65
  if target == "js" then
    __e65 = "var "
  else
    __e65 = "local "
  end
  local __keyword1 = __e65
  local __ind11 = indentation()
  return __ind11 .. __keyword1 .. __id90 .. __rh6
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local __lh6 = compile(lh)
  local __e66
  if nil63(rh) then
    __e66 = "nil"
  else
    __e66 = rh
  end
  local __rh8 = compile(__e66)
  return indentation() .. __lh6 .. " = " .. __rh8
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local __t12 = compile(t)
  local __k121 = compile(k)
  if target == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. __t12 .. ")"
  end
  if accessor_literal63(k) then
    return __t12 .. "." .. __k121
  else
    return __t12 .. "[" .. __k121 .. "]"
  end
end})
setenv("%array", {_stash = true, special = function (...)
  local __forms5 = unstash({...})
  local __e67
  if target == "lua" then
    __e67 = "{"
  else
    __e67 = "["
  end
  local __open1 = __e67
  local __e68
  if target == "lua" then
    __e68 = "}"
  else
    __e68 = "]"
  end
  local __close1 = __e68
  local __s9 = ""
  local __c7 = ""
  local ____o16 = __forms5
  local __k16 = nil
  for __k16 in next, ____o16 do
    local __v19 = ____o16[__k16]
    if number63(__k16) then
      __s9 = __s9 .. __c7 .. compile(__v19)
      __c7 = ", "
    end
  end
  return __open1 .. __s9 .. __close1
end})
setenv("%object", {_stash = true, special = function (...)
  local __forms7 = unstash({...})
  local __s111 = "{"
  local __c9 = ""
  local __e69
  if target == "lua" then
    __e69 = " = "
  else
    __e69 = ": "
  end
  local __sep1 = __e69
  local ____o18 = pair(__forms7)
  local __k20 = nil
  for __k20 in next, ____o18 do
    local __v22 = ____o18[__k20]
    if number63(__k20) then
      local ____id92 = __v22
      local __k21 = ____id92[1]
      local __v23 = ____id92[2]
      if not string63(__k21) then
        error("Illegal key: " .. str(__k21))
      end
      __s111 = __s111 .. __c9 .. key(__k21) .. __sep1 .. compile(__v23)
      __c9 = ", "
    end
  end
  return __s111 .. "}"
end})
setenv("%literal", {_stash = true, special = function (...)
  local __args21 = unstash({...})
  return apply(cat, map(compile, __args21))
end})
local __exports = exports or {}
__exports.run = run
__exports._eval = _eval
__exports.expand = expand
__exports.compile = compile
return __exports
