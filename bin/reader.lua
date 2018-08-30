local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\r"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\r"] = true, ["\n"] = true}
local function stream(str, more)
  return {pos = 0, string = str, len = _35(str), more = more}
end
local function peek_char(s)
  local ____id62 = s
  local __pos = ____id62["pos"]
  local __len = ____id62["len"]
  local __string = ____id62["string"]
  if __pos < __len then
    return char(__string, __pos)
  end
end
local function read_char(s)
  local __c = peek_char(s)
  if __c then
    s["pos"] = s["pos"] + 1
    return __c
  end
end
local function skip_non_code(s)
  while true do
    local __c1 = peek_char(s)
    if nil63(__c1) then
      break
    else
      if whitespace[__c1] then
        read_char(s)
      else
        if __c1 == ";" then
          while __c1 and not( __c1 == "\n") do
            __c1 = read_char(s)
          end
          skip_non_code(s)
        else
          break
        end
      end
    end
  end
end
local read_table = {}
local eof = {}
local function read(s)
  skip_non_code(s)
  local __c2 = peek_char(s)
  if is63(__c2) then
    return (read_table[__c2] or read_table[""])(s)
  else
    return eof
  end
end
local function read_all(s)
  local __l4 = {}
  while true do
    local __form6 = read(s)
    if __form6 == eof then
      break
    end
    add(__l4, __form6)
  end
  return __l4
end
function read_string(str, more)
  local __x358 = read(stream(str, more))
  if not( __x358 == eof) then
    return __x358
  end
end
local function key63(atom)
  return string63(atom) and _35(atom) > 1 and char(atom, edge(atom)) == ":"
end
local function flag63(atom)
  return string63(atom) and _35(atom) > 1 and char(atom, 0) == ":"
end
local function expected(s, c)
  local ____id63 = s
  local __more = ____id63["more"]
  local __pos1 = ____id63["pos"]
  return __more or error("Expected " .. c .. " at " .. __pos1)
end
local function wrap(s, x)
  local __y2 = read(s)
  if __y2 == s["more"] then
    return __y2
  else
    return {x, __y2}
  end
end
local function hex_prefix63(str)
  local __e14
  if code(str, 0) == 45 then
    __e14 = 1
  else
    __e14 = 0
  end
  local __i10 = __e14
  local __id64 = code(str, __i10) == 48
  local __e15
  if __id64 then
    __i10 = __i10 + 1
    local __n6 = code(str, __i10)
    __e15 = __n6 == 120 or __n6 == 88
  else
    __e15 = __id64
  end
  return __e15
end
local function maybe_number(str)
  if hex_prefix63(str) then
    return tonumber(str)
  else
    if number_code63(code(str, edge(str))) then
      return number(str)
    end
  end
end
local function real63(x)
  return number63(x) and not nan63(x) and not inf63(x)
end
read_table[""] = function (s)
  local __str = ""
  while true do
    local __c3 = peek_char(s)
    if __c3 and (not whitespace[__c3] and not delimiters[__c3]) then
      __str = __str .. read_char(s)
    else
      break
    end
  end
  if __str == "true" then
    return true
  else
    if __str == "false" then
      return false
    else
      local __n7 = maybe_number(__str)
      if real63(__n7) then
        return __n7
      else
        return __str
      end
    end
  end
end
read_table["("] = function (s)
  read_char(s)
  local __r96 = nil
  local __l5 = {}
  while nil63(__r96) do
    skip_non_code(s)
    local __c4 = peek_char(s)
    if __c4 == ")" then
      read_char(s)
      __r96 = __l5
    else
      if nil63(__c4) then
        __r96 = expected(s, ")")
      else
        local __x360 = read(s)
        if key63(__x360) then
          local __k6 = clip(__x360, 0, edge(__x360))
          local __v10 = read(s)
          __l5[__k6] = __v10
        else
          if flag63(__x360) then
            __l5[clip(__x360, 1)] = true
          else
            add(__l5, __x360)
          end
        end
      end
    end
  end
  return __r96
end
read_table[")"] = function (s)
  return error("Unexpected ) at " .. s["pos"])
end
read_table["\""] = function (s)
  read_char(s)
  local __r99 = nil
  local __str1 = "\""
  while nil63(__r99) do
    local __c5 = peek_char(s)
    if __c5 == "\"" then
      __r99 = __str1 .. read_char(s)
    else
      if nil63(__c5) then
        __r99 = expected(s, "\"")
      else
        if __c5 == "\\" then
          __str1 = __str1 .. read_char(s)
        end
        __str1 = __str1 .. read_char(s)
      end
    end
  end
  return __r99
end
read_table["|"] = function (s)
  read_char(s)
  local __r101 = nil
  local __str2 = "|"
  while nil63(__r101) do
    local __c6 = peek_char(s)
    if __c6 == "|" then
      __r101 = __str2 .. read_char(s)
    else
      if nil63(__c6) then
        __r101 = expected(s, "|")
      else
        __str2 = __str2 .. read_char(s)
      end
    end
  end
  return __r101
end
read_table["'"] = function (s)
  read_char(s)
  return wrap(s, "quote")
end
read_table["`"] = function (s)
  read_char(s)
  return wrap(s, "quasiquote")
end
read_table[","] = function (s)
  read_char(s)
  if peek_char(s) == "@" then
    read_char(s)
    return wrap(s, "unquote-splicing")
  else
    return wrap(s, "unquote")
  end
end
local __exports = exports or {}
__exports.stream = stream
__exports.read = read
__exports.read_all = read_all
__exports.read_string = read_string
__exports.read_table = read_table
return __exports
