import urllib2, re
from bs4 import BeautifulSoup
from pymongo import MongoClient, ASCENDING, DESCENDING, errors as pymongoErrors
from datetime import datetime
import itertools

CRICINFO_URL = "http://www.espncricinfo.com"
PLAYER_INFO_URL = CRICINFO_URL+"/America/content/player/"
SERIES_URL = CRICINFO_URL+"/America/content/series/"

class PlayerInfo:
    def __init__(self, pId):
        self.pid = pId

class PlayerScore:
    bowlingStatNames = ["Overs", "Maidens", "Runs", "Wickets", "Economy", "0s", "4s", "6s", "Extras"]
    battingStatNames = ["Runs", "Minutes", "Balls", "4s", "6s", "SR"]
    def __init__(self, playerId, matchId, seriesId, playerName):
        self.playerId = playerId
        self.matchId = matchId
        self.playerName = playerName
        self.seriesId = seriesId
        self.battingStats = []
        self.bowlingStats = []

    def appendBattingStats(self, stat):
        self.battingStats.append(stat)

    def appendBowlingStats(self, stat):
        self.bowlingStats.append(stat)

    def printBattingStats(self):
        print "Batting"
        for name, stat in zip(PlayerScore.battingStatNames, self.battingStats):
            print "\t"+name, ":", stat

    def printBowlingStats(self):
        print "Bowling"
        for name, stat in zip(PlayerScore.bowlingStatNames, self.bowlingStats):
            print "\t"+name, ":", stat

    def printStats(self):
        print self.playerName + ' ' + self.playerId
        if(len(self.battingStats) > 0):
            self.printBattingStats()
        if(len(self.bowlingStats) > 0):
            self.printBowlingStats()

    def writeToDb(self):
        mongoObject = {
            "pId" : self.playerId,
            "matchId" : self.matchId,
            "playerName" : self.playerName,
            "seriesId" : self.seriesId
        }

        if(len(self.battingStats) == 6):
            mongoObject["BatRuns"] = self.battingStats[0]
            mongoObject["BatMinutes"] = self.battingStats[1]
            mongoObject["BatBalls"] = self.battingStats[2]
            mongoObject["Bat4s"] = self.battingStats[3]
            mongoObject["Bat6s"] = self.battingStats[4]
            mongoObject["BatSR"] = self.battingStats[5]
            print "Batting stats written for " + self.playerId

        if(len(self.bowlingStats) == 9):
            mongoObject["BowlOvers"] = self.bowlingStats[0]
            mongoObject["BowlMaidens"] = self.bowlingStats[1]
            mongoObject["BowlBowlingRuns"] = self.bowlingStats[2]
            mongoObject["BowlWickets"] = self.bowlingStats[3]
            mongoObject["BowlEconomy"] = self.bowlingStats[4]
            mongoObject["Bowl0s"] = self.bowlingStats[5]
            mongoObject["Bowl4s"] = self.bowlingStats[6]
            mongoObject["Bowl6s"] = self.bowlingStats[7]
            mongoObject["BowlExtras"] = self.bowlingStats[8]
            print "Bowling stats written for " + self.playerId
        client = MongoClient()
        db = client.cric
        try:
            db.scores.update({
                "pId":self.playerId,
                "matchId":self.matchId,
                "seriesId":self.seriesId
                },
                mongoObject,
                upsert = True)
        except pymongoErrors.DuplicateKeyError, e:
            print e


def getIdFromURL(url):
    matchId = re.match(r'.*([/][0-9]+)[.]html', url)
    if matchId:
        return matchId.group(1)[1:]
    return None

#Given a scorecard url parses all batting and balling scores.TODO: catches/run outs yet
def parseScorecard(scoreCardUrl):
    matchId = getIdFromURL(scoreCardUrl)
    response = urllib2.urlopen(scoreCardUrl)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')

    #get seriesId
    seriesId = getIdFromURL(soup.find("a", {"href" : re.compile("engine/series/[0-9]+.html")}).get('href'))
    if bValidSeries(seriesId) == False:
        print "Error. Please add the series before trying to add a scorecard from the series! "+seriesId
        return

    #Parse batting scorecards
    allPlayers = dict()
    for batsman in soup.find_all(class_ = "batsman-name"):
        pId = getIdFromURL(batsman.contents[0].get('href'))
        if bValidPlayer(seriesId, pId) == False:
            print "Error. Player not found in series squad. Something went wrong. Pid:"+pId+" Sid:"+seriesId
            return
        else:
            print "pID found in series db!"
        player = None
        if pId in allPlayers:
            player = allPlayers[pId]
        else:
            player = PlayerScore(pId, matchId, seriesId, batsman.contents[0].string)
            allPlayers[pId] = player
        for stat in batsman.find_next_siblings("td"):
            if(len(stat.get('class')[0]) == 0 or stat.get('class')[0] == "bold"): #only the stats dont have a class field
                player.appendBattingStats(float(stat.string))


    for bowler in soup.find_all(class_ = "bowler-name"):
        pId = getIdFromURL(bowler.contents[0].get('href'))
        player = None
        if pId in allPlayers:
            player = allPlayers[pId]
        else:
            player = PlayerScore(pId, matchId, seriesId, bowler.contents[0].string)
            allPlayers[pId] = player
        for stat in bowler.find_next_siblings("td"):
            if stat.get('class') != None:
                player.appendBowlingStats(stat.string)
            else:
                player.appendBowlingStats(float(stat.string))

    for k,v in allPlayers.iteritems():
        v.writeToDb()
        #v.printStats()


def getPlayerInfo(pid, seriesId):
    '''Given a pid, fetches all data about a player by querying cricinfo'''
    print "Fetching Player:"+pid
    playerURL = PLAYER_INFO_URL + str(pid) + '.html'
    response = urllib2.urlopen(playerURL)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    playerDict = {"pId":pid}
    for info in soup.find_all(class_ = "ciPlayerinformationtxt"):
        for relevantInfo in info.find("b"):
            if(relevantInfo == "Major teams"):
                playerDict[relevantInfo.replace(' ',  '')] = [team.string.replace(',','') for team in relevantInfo.parent.next_sibling.find_next_siblings()]
            else:
                playerDict[relevantInfo.replace(' ',  '')] = relevantInfo.parent.next_sibling.next_element.string #+ ":" + relevantInfo.next_sibling()
    playerDict["Name"] = soup.find(class_ = "ciPlayernametxt").h1.text.strip()
    playerDict["seriesId"] = seriesId
    return playerDict

def getSquad(url, seriesId):
    '''Given a squad cricinfo url, returns a lists of playerinfos
       example url:http://www.espncricinfo.com/india-v-england-2016-17/content/squad/1064399.html'''
    print "Analyzing Squad:"+url
    response = urllib2.urlopen(url)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    squads = [getIdFromURL(player.get('href')) for player in soup.find_all("a", {"href" : re.compile("content/player/[0-9]+.html")})]
    uniqueSquads = list(set(squads))
    fullSquad = []
    for pid in uniqueSquads:
        fullSquad.append(getPlayerInfo(pid, seriesId))
    return fullSquad

def bValidPlayer(seriesId, playerId):
    '''Given a seriesID and playerID, checks if the playerID exsits in db'''
    client = MongoClient()
    db = client.cric
    if db.squad.find({"seriesId":str(seriesId), "pId":str(playerId)}, {"seriesId":1}).count() > 0:
        return True
    return False


def bValidSeries(seriesId):
    client = MongoClient()
    db = client.cric
    if db.series.find({"seriesId":str(seriesId)}, {"seriesId":1}).count() > 0:
        return True
    return False

def setupSeries(url):
    '''
    Series Contains a unique seriesId, name
    '''
    seriesId = getIdFromURL(url)
    if bValidSeries(seriesId):
        print "Series already exists. If you are trying to add squads please do so manually"
        return

    response = urllib2.urlopen(url)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    seriesName = soup.find("div", class_ = "icc-home").find("a").string.strip()
    seriesObject = {
        "seriesId" : seriesId,
        "Name": seriesName,
    }
    client = MongoClient()
    db = client.cric
    try:
        db.series.insert_one(seriesObject)
    except pymongoErrors.DuplicateKeyError, e:
            print e

    setupSquads(soup.find("a", text = "Squads").get('href'), seriesId)

def setupSquads(squadsUrl, seriesId):
    '''Gets squad urls from series squad page, and then processes the urls by calling getSquad and insertSquad'''
    response = urllib2.urlopen(CRICINFO_URL+squadsUrl)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    squads = [getSquad(CRICINFO_URL+squad.get('href'), seriesId) for squad in soup.find_all("a", {"href" : re.compile("content/squad/[0-9]+.html")})]
    if len(squads) < 2:
        print "Error. Squads not updated correctly. Please manually add squads."
    sqauds = list(itertools.chain(*squads))
    insertSquad(seriesId, sqauds)


def insertSquad(seriesId, squadArray):
    '''Given a squad array (i.e an array of playerInfo's), adds each element in the array to the squad collection'''
    if bValidSeries(seriesId) == False:
        print "Series does not yet exist. Add series first"
        return
    #print "insert Squad" + " " + squadArray
    client = MongoClient()
    db = client.cric
    for player in squadArray:
        try:
            result = db.squad.insert_one(player)
        except pymongoErrors.DuplicateKeyError, e:
            print e


def mongoInsertNewSeriesFromSeriesId(sId):
    sUrl = SERIES_URL+str(sId)+".html"
    mongoInsertNewSeries(sUrl)

def setupDB():
    client = MongoClient()
    db = client.cric
    db.series.ensure_index("seriesId", unique=True)
    db.squad.ensure_index([("seriesId", 1) , ("pId", 1)], unique=True)
    db.scores.ensure_index([("seriesId", 1) , ("pId", 1), ("matchId", 1)], unique=True)

def setupSeriesList(seriesList):
    for series in seriesList:
        setupSeries(series)

def driver():
    setupDB()
    setupSeriesList(["http://www.espncricinfo.com/tri-nation-zimbabwe-2016-17/content/series/1059705.html",
         "http://www.espncricinfo.com/india-v-england-2016-17/content/series/1030195.html",
         "http://www.espncricinfo.com/australia-v-south-africa-2016-17/content/series/1000805.html",
         ])

def main():
    driver();
    #getPlayerInfo('55412', '123')

    #findSquad("http://www.espncricinfo.com/new-zealand-v-pakistan-2016-17/content/series/1019989.html")
    #mongoInsertNewSeries("http://www.espncricinfo.com/india-v-england-2016-17/content/series/1030195.html")
    #mongoTest()
    #insertSquadToSeries(1059705, "http://www.espncricinfo.com/America/content/squad/1065779.html")
    #mongoInsertNewSeriesFromSeriesId(1059705)
    #parseScorecard('http://www.espncricinfo.com/tri-nation-zimbabwe-2016-17/engine/match/1059711.html')
    #getPlayerInfo(50747)
    #getSquad("http://www.espncricinfo.com/india-v-england-2016-17/content/squad/1064399.html")

if __name__ == '__main__':
    main()
