import RPi.GPIO as GPIO
import time


PARTE1_Trig = 6	#GPIO05
PARTE1_ECHO = 13	#GPIO06
PARTE2_Trig = 19	#GPIO13
PARTE2_ECHO = 26	#GPIO19
PARTE3_Trig = 20	#GPIO26
PARTE3_ECHO = 21	#GPIO20
PARTE4_Trig = 12	#GPIO12
PARTE4_ECHO = 16	#GPIO16

RLWTrigger = 11	#GPIO23
RLWEcho = 	 5	#GPIO24
RRWTrigger = 8	#GPIO25
RRWEcho = 	 7	#GPIO08

GPIO.setmode(GPIO.BCM)
GPIO.setup(PARTE1_Trig,GPIO.OUT)
GPIO.setup(PARTE2_Trig,GPIO.OUT)
GPIO.setup(PARTE3_Trig,GPIO.OUT)
GPIO.setup(PARTE4_Trig,GPIO.OUT)

GPIO.setup(PARTE1_ECHO,GPIO.IN)
GPIO.setup(PARTE2_ECHO,GPIO.IN)
GPIO.setup(PARTE3_ECHO,GPIO.IN)
GPIO.setup(PARTE4_ECHO,GPIO.IN)
GPIO.setup(RLWEcho,GPIO.IN)
GPIO.setup(RRWEcho,GPIO.IN)


GPIO.setup(RLWTrigger,GPIO.OUT)
GPIO.setup(RRWTrigger,GPIO.OUT)




def checkParet():
	#PARET1 Presence/Adsence
	pulse_start = 0
	pulse_end = 0
	
	GPIO.output(PARTE1_Trig,False)
	time.sleep(0.5)
	
	GPIO.output(PARTE1_Trig,True)
	time.sleep(0.00001)
	GPIO.output(PARTE1_Trig,False)
	
	while GPIO.input(PARTE1_ECHO) == 0:
		pulse_start = time.time()
	while GPIO.input(PARTE1_ECHO) == 1:
		pulse_end = time.time()
		
	duration_PARET1 = pulse_end - pulse_start
	distance_PARET1 = duration_PARET1 * 17000
	distance_PARET1 = round(distance_PARET1,2)

	
	#PARET2 Presence/Adsence
	GPIO.output(PARTE2_Trig,False)
	time.sleep(0.5)
	
	GPIO.output(PARTE2_Trig,True)
	time.sleep(0.00001)
	GPIO.output(PARTE2_Trig,False)
	
	while GPIO.input(PARTE2_ECHO) == 0:
		pulse_start = time.time()
	while GPIO.input(PARTE2_ECHO) == 1:
		pulse_end = time.time()
		
	duration_PARET2 = pulse_end - pulse_start
	distance_PARET2 = duration_PARET2* 17000
	distance_PARET2 = round(distance_PARET2,2)
	
	
	#PARET3 Presence/Adsence
	GPIO.output(PARTE3_Trig,False)
	time.sleep(0.5)
	
	GPIO.output(PARTE3_Trig,True)
	time.sleep(0.00001)
	GPIO.output(PARTE3_Trig,False)
	
	while GPIO.input(PARTE3_ECHO) == 0:
		pulse_start = time.time()
	while GPIO.input(PARTE3_ECHO) == 1:
		pulse_end = time.time()
		
	duration_PARET3 = pulse_end - pulse_start
	distance_PARET3 = duration_PARET3* 17000
	distance_PARET3 = round(distance_PARET3,2)
	
	#PARET4 Presence/Adsence
	GPIO.output(PARTE4_Trig,False)
	time.sleep(0.5)
	
	GPIO.output(PARTE4_Trig,True)
	time.sleep(0.00001)
	GPIO.output(PARTE4_Trig,False)
	
	while GPIO.input(PARTE4_ECHO) == 0:
		pulse_start = time.time()
	while GPIO.input(PARTE4_ECHO) == 1:
		pulse_end = time.time()
		
	duration_PARET4 = pulse_end - pulse_start
	distance_PARET4 = duration_PARET4* 17000
	distance_PARET4 = round(distance_PARET4,2)
	
	#print "GPIO Finish!"

	
	#Analysis
	PARET = 4   # 1Ton Truck Max 4 Paret
	PARET1 = 0
	PARET2 = 0
	PARET3 = 0
	PARET4 = 0

	if(distance_PARET1 < 3):
		PARET1 = 1

	if(distance_PARET2 < 3):
		PARET2 = 1

	if(distance_PARET3 < 3):
		PARET3 = 1

	if(distance_PARET4 < 3):
		PARET4 = 1

	PARET = PARET - (PARET1+PARET2+PARET3+PARET4)
	

#Wheel_Distance_Left
	GPIO.output(RLWTrigger,False)
	time.sleep(0.5)
	
	GPIO.output(RLWTrigger,True)
	time.sleep(0.00001)
	GPIO.output(RLWTrigger,False)
	
	while GPIO.input(RLWEcho) == 0:
		pulse_start = time.time()
	while GPIO.input(RLWEcho) == 1:
		pulse_end = time.time()
		
	Wheel_Distance_Left = pulse_end - pulse_start
	Wheel_Distance_Left = Wheel_Distance_Left* 17000
	Wheel_Distance_Left = round(Wheel_Distance_Left,2)
	
	#Wheel_Distance_Right
	GPIO.output(RRWTrigger,False)
	time.sleep(0.5)
	
	GPIO.output(RRWTrigger,True)
	time.sleep(0.00001)
	GPIO.output(RRWTrigger,False)
	
	while GPIO.input(RRWEcho) == 0:
		pulse_start = time.time()
	while GPIO.input(RRWEcho) == 1:
		pulse_end = time.time()
		
	Wheel_Distance_Right = pulse_end - pulse_start
	Wheel_Distance_Right = Wheel_Distance_Right* 17000
	Wheel_Distance_Right = round(Wheel_Distance_Right,2)

	#print "GPIO Finish!"

	
	#Analysis
	weight = Wheel_Distance_Right * 200
	if(weight > 1000):
		weight = 1000

	data_Pallet = str(PARET)
	data_Weight = str(weight)
	
	#print "Wheel Right : ", Wheel_Distance_Right, "Pallet : ", PARET	
	return (data_Pallet, data_Weight)
	



