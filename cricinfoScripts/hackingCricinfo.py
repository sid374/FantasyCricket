import httplib, urllib

params = urllib.urlencode({"type":"player-profile","format":"test","player_id":"49752"})
headers = {"Content-type": "text/plain",
            "Referer": "http://www.espncricinfo.com/india/content/player/253802.html"
		}
conn = httplib.HTTPConnection("analytics05.cricket.net/xquery/espn/player")
conn.request("POST", "", params, headers)
response = conn.getresponse()
print response.status, response.reason
data = response.read()
conn.close()