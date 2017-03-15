local function call_with_file(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local x = f(h)
  h.close(h)
  return(x)
end
local function read_file(path)
  return(call_with_file(function (f)
    return(f.read(f, "*a"))
  end, path))
end
local function write_file(path, data)
  return(call_with_file(function (f)
    return(f.write(f, data))
  end, path, "w"))
end
local function file_exists63(path)
  local f = io.open(path)
  local _id = is63(f)
  local _e
  if _id then
    local r = is63(f.read(f, 0)) or 0 == f.seek(f, "end")
    f.close(f)
    _e = r
  else
    _e = _id
  end
  return(_e)
end
local function directory_exists63(path)
  local f = io.open(path)
  local _id = is63(f)
  local _e
  if _id then
    local r = not f.read(f, 0) and not( 0 == f.seek(f, "end"))
    f.close(f)
    _e = r
  else
    _e = _id
  end
  return(_e)
end
local path_separator = char(_G.package.config, 0)
local function path_join(...)
  local parts = unstash({...})
  return(reduce(function (x, y)
    return(x .. path_separator .. y)
  end, parts) or "")
end
local function get_environment_variable(name)
  return(os.getenv(name))
end
local function write(x)
  return(io.write(x))
end
local function exit(code)
  return(os.exit(code))
end
local argv = arg
local function reload(module)
  package.loaded[module] = nil
  return(require(module))
end
local function run(command)
  local f = io.popen(command)
  local x = f.read(f, "*all")
  f.close(f)
  return(x)
end
return({argv = argv, ["directory-exists?"] = directory_exists63, exit = exit, ["file-exists?"] = file_exists63, ["get-environment-variable"] = get_environment_variable, ["path-join"] = path_join, ["path-separator"] = path_separator, ["read-file"] = read_file, reload = reload, run = run, write = write, ["write-file"] = write_file})
