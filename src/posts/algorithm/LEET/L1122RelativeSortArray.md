---
title: "1122. Relative Sort Array"
date: "2024-06-11"
description: "1122. Relative Sort Array는 두 배열을 비교해서 하나의 배열을 정렬하는 문제다."
tags: ["Algorithm", "Sorting"]
---

## 문제 설명
두 배열이 주어진다. arr1 배열에서 arr2 배열의 순서대로 정렬하고, 나머지는 오름차순으로 정렬하는 문제다.

![1122](../../../images/LEET/1122/1122.png)

## 1차 시도
분명 쉬운 난이도인데 뭔가 방법을 찾기가 어렵고 시간복잡도가 엉망이 된것 같다.
일단은 되게 장황하게 한번 풀어봤는데 테스트케이스는 통과했다. 그런데 시간복잡도가 너무 높거나, 그냥 틀릴 것 같다.

```python
from collections import Counter

class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        final, new_arr = [], []
        c = Counter(arr1) # arr1에 있는 freq를 찾기

        # arr2의 순서를 기준으로
        for j in arr2:
            for i, (k,v) in enumerate(c.items()): # counter를 dictionary로 다시 바꿔서
                if k == j: # arr2의 순서에 부합한 item val k가 있다면
                    for a in range(v): # 그 k의 갯수 v만큼 최종 배열에 추가
                        final.append(k)

        # 기타 나머지 값들은 다른 배열에 추가하고 정렬
        for val in c:
            if val not in arr2:
                new_arr.append(val)
        # 다시 최종 배열에 추가
        for val in sorted(new_arr):
            final.append(val)

        return final
```

![test](../../../images/LEET/1122/testcase.png)

- arr1에 있는 freq를 찾기
- arr2의 순서를 기준으로
- counter를 dictionary로 다시 바꿔서
- arr2의 순서에 부합한 item val k가 있다면
- 그 k의 갯수 v만큼 최종 배열에 추가

- 기타 나머지 값들은 다른 배열에 추가하고 정렬
- 다시 최종 배열에 추가

### 시간복잡도
`O(m×n^2)` ; m은 arr2의 길이, n은 arr1의 길이


### 틀린 이유
![wr](../../../images/LEET/1122/wrong.png)

```
arr1 = [2,21,43,38,0,42,33,7,24,13,12,27,12,24,5,23,29,48,30,31]  
arr2 = [2,42,38,0,43,21]

output = [2,42,38,0,43,21,5,7,12,13,23,24,27,29,30,31,33,48]  
expected = [2,42,38,0,43,21,5,7,12,12,13,23,24,24,27,29,30,31,33,48]
```

보면 24와 12가 하나씩 누락됐다. 왜 그럴까?

![fix](../../../images/LEET/1122/fix.png)

보니까 해당하지 않는 값들에 대하여 한번씩만 들어가고 있었다. 이를 수정하니, 테스트 케이스는 통과하긴 했는데, 아무래도 아직도 시간복잡도는 상당히 높다.

### 제출시도:
![t1](../../../images/LEET/1122/t1.png) 

놀랍게도 통과했다. 시간복잡도가 너무 높아서 더 깎아보겠다.

## 2차 시도
일단 Nested for loop이 가장 문제다.

![new](../../../images/LEET/1122/new.png)
pop을 하니까 이게 결국에 freq를 반환한다. 그래서 [new]*freq를 하면, freq만큼 new가 반복된다. 이렇게 하면 번거롭게 for loop을 다시 안 돌려도 된다.

이미 있는 값들은 다 pop 당했으니 remaining = sorted(c.elements())을 하면, 기존에 남았던 값들만 정렬해서 반환한다.

여기서 마지막으로 final.extend(remaining)을 하면, 기존에 정렬된 값들과 남은 값들을 합쳐서 반환한다.

이렇게 하면 다음과 같이 조금은 빨라진다.  
![t2](../../../images/LEET/1122/t2.png)


## 풀이
```python
from collections import Counter

class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        final = []
        c = Counter(arr1) # arr1에 있는 freq를 찾기
        print(c)

        # add elements from arr2 in the order
        for num in arr2:
            if num in c:
                t = c.pop(num)
                final.extend([num] * t)

        remaining = sorted(c.elements())
        final.extend(remaining)

        return final
```

## Complexity Analysis

### Time Complexity
기존 O(MN^2)에서 O(N)으로 줄었다.

최종적으로 O(N)이다.

### Space Complexity
- O(N) ; N은 nums 배열의 길이

## Constraint Analysis
```
Constraints:

1 <= arr1.length, arr2.length <= 1000  
0 <= arr1[i], arr2[i] <= 1000  
All the elements of arr2 are distinct.  
Each arr2[i] is in arr1.  
```

# References
- [LeetCode](https://leetcode.com/problems/relative-sort-array)
- [Python - Counter](https://docs.python.org/3/library/collections.html#collections.Counter)
