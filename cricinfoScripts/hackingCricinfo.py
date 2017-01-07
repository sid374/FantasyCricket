import requests
from bs4 import BeautifulSoup
import threading
from pymongo import MongoClient, ASCENDING, DESCENDING, errors as pymongoErrors

#http://www.espncricinfo.com/ci/engine/match/data/series_scores_new.json?seriesid=936119' -H 
#'Host: www.espncricinfo.com' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:49.0) Gecko/20100101 
#Firefox/49.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: en-US,en;q=0.5' 
#--compressed -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive'

#[u'team2_flag', u'match_title', u'date', u'team2_short_name', u'match_status', u'object_id', 
#u'team2_id', u'live_match', u'status', u'break', u'team1_name', u'team2_name', u'team2_desc', 
#u'm_start_time', u'url', u'venue', u'international_class_name',
#u'team1_short_name', u'international_class_id', u'team1_flag', u'team1_id', u'team1_desc']

class ICCThread (threading.Thread):
	def __init__(self, id):
		threading.Thread.__init__(self)
		self.id = id
	def run(self):
		self.getPlayer(self.id)
	

	def getPlayer(self, id):
		self.player = {}
		if self.isValid():
			self.player["RelianceId"] = self.id
			self.player["Name"] = self.playerName

			self.parseRankingv2("odi", "batting")
			self.parseRankingv2("odi", "bowling")
			self.parseRankingv2("odi", "all-rounder")

			self.parseRankingv2("test", "batting")
			self.parseRankingv2("test", "bowling")
			self.parseRankingv2("test", "all-rounder")

			self.parseRankingv2("t20", "batting")
			self.parseRankingv2("t20", "bowling")
			self.parseRankingv2("t20", "all-rounder")
			self.writePlayerToDb()
		else:
			print "Invalid Player "+str(id)


	def writePlayerToDb(self):
		client = MongoClient()
		db = client.cric
		try:
			db.playerRankings.insert_one(self.player)
		except pymongoErrors.DuplicateKeyError, e:
			print e

	def parseRanking(self, matchType, batOrBowl):
		r = requests.get("http://www.relianceiccrankings.com/playerdisplay/" + matchType + "/" + batOrBowl +"/", params={"id":str(self.id)})
		self.soup = BeautifulSoup(r.content, 'html.parser')
		stats = self.soup.find_all(id="pstext")[1].find_all('p')
		if len(stats) > 4:
			self.player[matchType+batOrBowl+"Ranking"] = unicode(stats[1].string[2:])
			self.player[matchType+batOrBowl+"HighestRanking"] = unicode(stats[3].string[2:])

	def parseRankingv2(self, matchType, batOrBowl):
		r = requests.get("http://www.relianceiccrankings.com/playerdisplay/" + matchType + "/" + batOrBowl +"/", params={"id":str(self.id)})
		self.soup = BeautifulSoup(r.content, 'html.parser')
		statKeys = self.soup.find_all(id="pstext")[0].find_all('p')
		stats = self.soup.find_all(id="pstext")[1].find_all('p')
		for i, key in enumerate(statKeys):
			if key.string.strip() in ['Date of Birth', 'Batting Style', 'Bowling Style', 'ODI Debut', 'Test Debut', 'Twenty20 Debut']:
				self.player[key.string.strip().replace(' ', '')] = stats[i].string[2:].strip()
			else:
				self.player[key.string.strip().replace(' ', '')+matchType+batOrBowl] = stats[i].string[2:].strip()


	def isValid(self):
		r = requests.get("http://www.relianceiccrankings.com/playerdisplay/odi/batting/", params={"id":str(self.id)})
		self.soup = BeautifulSoup(r.content, 'html.parser')
		weirdId = self.soup.find(id="top100battest")
		if (weirdId.h5.string) != " ":
			self.playerName = weirdId.h5.string.strip()
			print self.playerName
			return True
		return False


def getSeriesMatches(seriesId = "936119"):
	r = requests.get('http://espncricinfo.com/ci/engine/match/data/series_scores_new.json', params={"seriesid":seriesId})
	jsonResponse = r.json()
	keys = ['international_class_id', 'team1_short_name', 'team2_short_name', 'match_status', 'status', 'date', 'object_id']
	for match in jsonResponse['scores']:
		for key in keys:
			print key + ':' + match[key]
		print "============================="

def relianceDriver():
	indexNumber = 101
	threads = []
	step = 15
	while indexNumber < 8000:
		for i in xrange(indexNumber, indexNumber+step):
			currThread = ICCThread(i)
			currThread.start()
			threads.append(currThread)
		for t in threads:
			t.join()
		threads = []
		indexNumber = indexNumber + step

def setupDb():
	client = MongoClient()
	db = client.cric
	db.playerRankings.ensure_index("RelianceId", unique=True)


def main():
	getSeriesMatches(1023537)
	# currThread = ICCThread(7608)
	# currThread.start()
	# setupDb()
	# relianceDriver()
	



if __name__ == '__main__':
	main()
