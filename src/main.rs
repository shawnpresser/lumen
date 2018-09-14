extern crate exec;

fn main() {
    let cwd = std::env::current_dir().unwrap();
    let bin = std::env::current_exe().unwrap();
    let exe = std::fs::canonicalize(&bin).unwrap();
    let name = bin.file_name().unwrap().to_str().unwrap();
    let home = exe.parent().unwrap().parent().unwrap().parent().unwrap();
    let lumen_home = std::env::var("LUMEN_HOME").unwrap_or(String::from(home.to_str().unwrap()));
    let lua_path = std::env::var("LUA_PATH").unwrap_or(String::from(""));
    let node_path = std::env::var("NODE_PATH").unwrap_or(String::from(""));

    let parts = name.split("-").collect::<Vec<&str>>(); 
    let mut host = std::env::var("LUMEN_HOST").unwrap_or(String::from("luajit"));
    let mut lang = String::from("lua");
    if parts.len() > 2 {
        host = parts[1].to_string();
        lang = parts[2].to_string();
    } else {
        if parts.len() > 1 {
            host = parts[1].to_string();
        }
        if host.contains("node") {
            lang = String::from("js");
        }
    }
    
    let mut code = std::path::PathBuf::from(&lumen_home);
    code.push("bin");
    code.push(format!("lumen.{}", lang));
    
    let mut home_bin = std::path::PathBuf::from(&lumen_home);
    home_bin.push("bin");

    std::env::set_var("NODE_PATH", format!("{}:{}", node_path, home_bin.display()));

    home_bin.push("?.lua");
    
    let mut cwd_lib = std::path::PathBuf::from(cwd.to_str().unwrap());
    cwd_lib.push("lib");
    cwd_lib.push("?.lua");

    std::env::set_var("LUA_PATH", format!("{};{};{};;", lua_path, home_bin.display(), cwd_lib.display()));

    std::env::set_var("LUMEN_HOME", lumen_home);

    let argv: Vec<String> = std::env::args().skip(1).collect();
    let err = exec::Command::new(host)
        .arg(code.to_str().unwrap())
        .args(&argv)
        .exec();
    println!("Error: {}", err);
}
