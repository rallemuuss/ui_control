#!/usr/bin/python3
import rospy
from inspect import getsourcefile
import os
import http.server
import socketserver
# create server
PORT = 1337

path = os.path.dirname(os.path.abspath(getsourcefile(lambda:0)))

Handler = http.server.SimpleHTTPRequestHandler
os.chdir(path)
Handler.extensions_map.update({
      ".js": "application/javascript",
})

print("Server open on port", PORT, "\nUse localhost:", PORT)

httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()
