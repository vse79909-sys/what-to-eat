import http.server
import socketserver
import socket
import webbrowser
import os
import sys
import io

# 确保在 Windows 控制台下 UTF-8 字符和 Emoji 正常输出
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

PORT = 8080

def get_local_ip():
    """获取本机在局域网中的真实 IP 地址，优先排除虚拟网卡"""
    candidates = []
    try:
        _, _, ip_list = socket.gethostbyname_ex(socket.gethostname())
        for ip in ip_list:
            if ip.startswith("127."):
                continue
            # 优先匹配常见的家用路由器网段
            if ip.startswith("192.168.") or ip.startswith("10."):
                return ip
            # 排除常见代理/TUN 虚拟网卡 (如 198.18.x.x)
            if not ip.startswith("198.18."):
                candidates.append(ip)
    except Exception:
        pass

    if candidates:
        return candidates[0]

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    local_ip = get_local_ip()
    
    Handler = http.server.SimpleHTTPRequestHandler
    Handler.extensions_map.update({
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json'
    })

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("=" * 60)
            print("  《吃什么》- 小两口专属家庭点菜系统已启动！")
            print("=" * 60)
            print(f"\n  [电脑本机访问地址]:  http://localhost:{PORT}")
            print(f"  [手机端访问地址]  :  http://{local_ip}:{PORT}")
            print("\n  [女朋友手机使用技巧]:")
            print(f"  1. 手机连上家里同一个 Wi-Fi")
            print(f"  2. 手机浏览器打开: http://{local_ip}:{PORT}")
            print(f"  3. 点击浏览器菜单 -> [添加到主屏幕]，秒变专属 App！")
            print("=" * 60)
            print("  按 Ctrl + C 即可退出服务。\n")
            
            # 自动打开电脑浏览器
            webbrowser.open(f"http://localhost:{PORT}")
            
            httpd.serve_forever()
    except OSError as e:
        if "address already in use" in str(e).lower() or e.errno == 98 or e.errno == 10048:
            print(f"\n提示：端口 {PORT} 已被占用，正在尝试端口 {PORT + 1}...")
            with socketserver.TCPServer(("", PORT + 1), Handler) as httpd:
                print(f"  [电脑访问地址]: http://localhost:{PORT + 1}")
                print(f"  [手机访问地址]: http://{local_ip}:{PORT + 1}")
                webbrowser.open(f"http://localhost:{PORT + 1}")
                httpd.serve_forever()
        else:
            raise e

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n《吃什么》服务已安全退出。")
        sys.exit(0)
