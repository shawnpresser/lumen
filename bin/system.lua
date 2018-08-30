local function call_with_file(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local __x358 = f(h)
  h.close(h)
  return __x358
end
local function read_file(path)
  return call_with_file(function (f)
    return f.read(f, "*a")
  end, path)
end
local function write_file(path, data)
  return call_with_file(function (f)
    return f.write(f, data)
  end, path, "w")
end
local function file_exists63(path)
  local __f2 = io.open(path)
  local __id62 = is63(__f2)
  local __e14
  if __id62 then
    local __r86 = is63(__f2.read(__f2, 0)) or 0 == __f2.seek(__f2, "end")
    __f2.close(__f2)
    __e14 = __r86
  else
    __e14 = __id62
  end
  return __e14
end
local function directory_exists63(path)
  local __f3 = io.open(path)
  local __id63 = is63(__f3)
  local __e15
  if __id63 then
    local __r88 = not __f3.read(__f3, 0) and not( 0 == __f3.seek(__f3, "end"))
    __f3.close(__f3)
    __e15 = __r88
  else
    __e15 = __id63
  end
  return __e15
end
local path_separator = char(_G.package.config, 0)
local function path_join(...)
  local __parts = unstash({...})
  return reduce(function (x, y)
    return x .. path_separator .. y
  end, __parts) or ""
end
local function get_environment_variable(name)
  return os.getenv(name)
end
local function write(x)
  return io.write(x)
end
local function exit(code)
  return os.exit(code)
end
local argv = arg
local function reload(module)
  package.loaded[module] = nil
  return require(module)
end
local function run(command)
  local __f4 = io.popen(command)
  local __x360 = __f4.read(__f4, "*all")
  __f4.close(__f4)
  return __x360
end
local __exports = exports or {}
__exports.read_file = read_file
__exports.write_file = write_file
__exports.file_exists63 = file_exists63
__exports.directory_exists63 = directory_exists63
__exports.path_separator = path_separator
__exports.path_join = path_join
__exports.get_environment_variable = get_environment_variable
__exports.write = write
__exports.exit = exit
__exports.argv = argv
__exports.reload = reload
__exports.run = run
return __exports
