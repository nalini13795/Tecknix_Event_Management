import sys
def myFunc(coins, m, V):
	temp = [0 for i in range(V + 1)]
	temp[0] = 0
	for i in range(1, V + 1):
		temp[i] = sys.maxsize
	for i in range(1, V + 1):
		for j in range(m):
			if (coins[j] <= i):
				sub_res = temp[i - coins[j]]
				if (sub_res != sys.maxsize and sub_res + 1 < temp[i]):
					temp[i] = sub_res + 1
	
	if temp[V] == sys.maxsize:
		return -1
	return temp[V]


input = [1,2,5,10,20,50,100,200]
m = len(input)
V = 520
print("Minimum coins required is ",myFunc(input, m, V))


