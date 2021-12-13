#!/usr/bin/python3
import http.server
import socketserver
# create server
PORT = 1337

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
      ".js": "application/javascript",
})

print("Server open on port", PORT, "\nUse localhost:", PORT)

httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()

