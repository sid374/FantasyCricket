import requests

#http://www.espncricinfo.com/ci/engine/match/data/series_scores_new.json?seriesid=936119' -H 
#'Host: www.espncricinfo.com' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:49.0) Gecko/20100101 
#Firefox/49.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: en-US,en;q=0.5' 
#--compressed -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive'

#[u'team2_flag', u'match_title', u'date', u'team2_short_name', u'match_status', u'object_id', 
#u'team2_id', u'live_match', u'status', u'break', u'team1_name', u'team2_name', u'team2_desc', 
#u'm_start_time', u'url', u'venue', u'international_class_name',
#u'team1_short_name', u'international_class_id', u'team1_flag', u'team1_id', u'team1_desc']

def getSeriesMatches(seriesId = "936119"):
	r = requests.get('http://espncricinfo.com/ci/engine/match/data/series_scores_new.json', params={"seriesid":seriesId})
	jsonResponse = r.json()
	keys = ['international_class_id', 'team1_short_name', 'team2_short_name', 'match_status', 'status', 'date', 'object_id']
	for match in jsonResponse['scores']:
		for key in keys:
			print key + ':' + match[key]
		print "============================="

getSeriesMatches(1023537)