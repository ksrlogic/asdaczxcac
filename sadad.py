def shift(data):
    data.append(data[0])
    data.remove(data[0])
def solution(priorities, location):
    cd =True
    while cd:
        for i in data[1:]:
            if i > data[0]:
                shift(data)
        else:
            cd = False
    answer = 0
    return answer