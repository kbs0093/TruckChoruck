import json
import io
import threading
import math
import os
from collections import OrderedDict
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
from checkParet import checkParet
from mpu6050 import check_Valance
from gps import *
from kakaomapAPI import getLatLng

# Initiate Variable
gpsd = None 
SR04_Pallet = None
SR04_Weight = None
host = "aksvt2aysg9zx-ats.iot.us-east-2.amazonaws.com"
rootCAPath = "/home/pi/Truck?Churuck!/rootCA.key"
certificatePath = "/home/pi/Truck?Churuck!/8c7ea71244-certificate.pem.crt"
privateKeyPath = "/home/pi/Truck?Churuck!/8c7ea71244-private.pem.key"
port = 8883
clientId = "Publisher"
topic = "Truck/1Ton/A001"
msg = OrderedDict()

# AWSIoT Initiate
myAWSIoTMQTTClient = None
myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
myAWSIoTMQTTClient.configureEndpoint(host, port)
myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)
myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)
myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec
myAWSIoTMQTTClient.connect()

os.system('clear') 

class SR04Crawler(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
		global SR04_Pallet
		global SR04_Weight
    
		(SR04_Pallet, SR04_Weight) = checkParet()
		self.current_value = None
		self.running = True
	
	def run(self):
		while thread_1.running:
			global SR04_Pallet
			global SR04_Weight
			(SR04_Pallet, SR04_Weight) = checkParet()

class GPSCrawler(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
		global gpsd 
		
		gpsd = gps(mode=WATCH_ENABLE) 
		self.current_value = None
		self.running = True 
	
	def run(self):		
		while thread_2.running:
			global gpsd
			gpsd.next() 

  
      
if __name__ == '__main__':
  thread_1 = SR04Crawler() 
  thread_2 = GPSCrawler()
  
  try:
    thread_1.start() 
    thread_2.start()
    
    while True:
		global SR04_Pallet
		global SR04_Weight
		global gpsd
		valance = False
			
		#open the previous Data
		with open('data.json', 'rb') as f:
			temp = json.load(f)
		
		
		# Parsing GPS DATA (Lat, Lon, Speed)
		if gpsd.fix.latitude != 0 and not math.isnan(gpsd.fix.latitude):
			msg["Latitude"] = gpsd.fix.latitude
		else:
			msg["Latitude"] = temp["Latitude"]
		
		if gpsd.fix.longitude != 0 and not math.isnan(gpsd.fix.longitude):
			msg["Longitude"] = gpsd.fix.longitude
		else:
			msg["Longitude"] = temp["Longitude"]
			
		if gpsd.fix.speed >= 5 or not math.isnan(gpsd.fix.speed):
			msg["Velocity"] = gpsd.fix.speed
		else:
			msg["Velocity"] = 0
			
			
		# check car valance and it's true -> update the weight and Pallet number
		valance = check_Valance()
		if valance:
			msg["Paret"] = int(float(SR04_Pallet))
			msg["Weight"] = int(float(SR04_Weight))
		else:
			msg["Paret"] = int(float(SR04_Pallet))
			msg["Weight"] = temp["Weight"]
			
		msg["Temperature"] = 2
		msg["TruckID"] = "A001"
		msg["address"] = getLatLng(msg["Longitude"], msg["Latitude"]).encode("utf-8")


		messageJson = json.dumps(msg)	
		myAWSIoTMQTTClient.publish(topic, messageJson, 1)
		
	
		with open('data.json', 'wb') as f:
			json.dump(msg, f)
			
		print (messageJson)
		time.sleep(1)
		
		

  except (KeyboardInterrupt, SystemExit):
		print "\nKilling Thread..."
		thread_1.running = False
		thread_1.join()
		
		thread_2.running = False
		thread_2.join() 
		print "Done.\nExiting."

	
