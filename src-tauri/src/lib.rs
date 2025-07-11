// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

/// 何もしない関数
#[tauri::command]
fn f0() {}

/// 特定の数値だけを返す関数
#[tauri::command]
fn f1() -> i32 {
    1
}

/// 文字列を返すだけ
#[tauri::command]
fn f2() -> String {
    format!("a")
}

/// 数値 → 数値
#[tauri::command]
fn f3(v: i32) -> i32 {
    v + 1
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, f0, f1, f2, f3])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
