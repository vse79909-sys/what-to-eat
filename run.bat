@echo off
chcp 65001 >nul
title 🍳《吃什么》- 小两口专属家庭点菜系统
cd /d "%~dp0"
echo 正在启动《吃什么》家庭菜谱服务...
python run.py
if errorlevel 1 (
    echo.
    echo 未检测到 python，尝试使用系统默认浏览器直接打开网页...
    start index.html
)
pause
