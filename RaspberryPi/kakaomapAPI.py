import requests
import json
from collections import OrderedDict

def getLatLng(lon, lat):
  url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x={}&y={}&input_coord=WGS84".format(lon,lat)
  headers = {"Authorization": "KakaoAK c03cd3163f9e60835496de6a3ccc0b3e"}
  msg = requests.get(url, headers=headers)
  data = msg.json()
  address = data["documents"]
  local_address = address[0]
  return local_address["address"]["address_name"]

