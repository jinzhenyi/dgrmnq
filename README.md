# 2048 Game

横版 2048 游戏，支持虚拟摇杆控制和键盘操作，可通过 GitHub Actions 自动构建 Android APK。

## 特性

- 经典 2048 游戏玩法
- 横屏显示优化
- 纯白背景
- 键盘方向键控制（桌面端）
- 触摸滑动控制（移动端）
- 自动保存最高分
- GitHub Actions 自动构建 APK

## 控制方式

### 移动端
- 滑动屏幕控制方向

### 桌面端
- 方向键：↑ ↓ ← →
- WASD 键：W A S D

## 构建 Android APK

### 自动构建（推荐）

推送代码到 main 分支后，GitHub Actions 会自动构建 APK：

1. 推送代码到 `main` 分支
2. 等待 Actions 完成（约 5-10 分钟）
3. 在 Actions 页面下载 APK 文件

### 本地构建

需要安装 Android Studio 和 JDK 17：

```bash
# 复制 web 文件到 Android 项目
cp index.html android-template/app/src/main/assets/www/
cp -r css android-template/app/src/main/assets/www/
cp -r js android-template/app/src/main/assets/www/

# 进入 Android 项目目录
cd android-template

# 构建 APK
./gradlew assembleRelease

# APK 输出位置
# app/build/outputs/apk/release/app-release-unsigned.apk
```

## 项目结构

```
/
├── index.html              # 游戏主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── game.js            # 2048 游戏逻辑
│   ├── joystick.js        # 虚拟摇杆控制
│   └── main.js            # 主程序入口
├── android-template/       # Android 项目模板
├── .github/
│   └── workflows/
│       └── build-apk.yml  # GitHub Actions 配置
└── package.json           # Node.js 配置
```

## 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6)
- **移动端包装**: Android WebView
- **构建工具**: Gradle
- **CI/CD**: GitHub Actions

## 游戏规则

1. 滑动摇杆或使用方向键移动所有方块
2. 相同数字的方块碰撞时合并
3. 合并后产生新的数字（2+2=4, 4+4=8, 以此类推）
4. 当出现 2048 时获胜
5. 无法移动时游戏结束

## 许可证

MIT License
