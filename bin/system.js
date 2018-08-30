var fs = require("fs");
var child_process = require("child_process");
var read_file = function (path) {
  return fs.readFileSync(path, "utf8");
};
var write_file = function (path, data) {
  return fs.writeFileSync(path, data, "utf8");
};
var file_exists63 = function (path) {
  return fs.existsSync(path, "utf8") && fs.statSync(path).isFile();
};
var directory_exists63 = function (path) {
  return fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory();
};
var path_separator = require("path").sep;
var path_join = function () {
  var __parts = unstash(Array.prototype.slice.call(arguments, 0));
  return reduce(function (x, y) {
    return x + path_separator + y;
  }, __parts) || "";
};
var get_environment_variable = function (name) {
  return process.env[name];
};
var write = function (x) {
  var __out = process.stdout;
  return __out.write(x);
};
var exit = function (code) {
  return process.exit(code);
};
var argv = cut(process.argv, 2);
var reload = function (module) {
  delete require.cache[require.resolve(module)];
  return require(module);
};
var run = function (command) {
  return child_process.execSync(command).toString();
};
var __e14;
if (typeof(exports) === "undefined") {
  __e14 = {};
} else {
  __e14 = exports;
}
var __exports = __e14;
__exports.read_file = read_file;
__exports.write_file = write_file;
__exports.file_exists63 = file_exists63;
__exports.directory_exists63 = directory_exists63;
__exports.path_separator = path_separator;
__exports.path_join = path_join;
__exports.get_environment_variable = get_environment_variable;
__exports.write = write;
__exports.exit = exit;
__exports.argv = argv;
__exports.reload = reload;
__exports.run = run;
__exports;
