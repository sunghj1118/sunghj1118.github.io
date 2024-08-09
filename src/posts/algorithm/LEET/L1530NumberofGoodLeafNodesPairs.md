---
title: "1530. Number of Good Leaf Nodes Pairs"
date: "2024-07-18"
description: "1530. Number of Good Leaf Nodes Pairs는 두개의 leaf node 사이의 거리가 k 이하인 경우의 수를 구하는 문제이다."
tags: ["Algorithm", "Tree"]
---

# 문제 설명
두개의 leaf node 사이의 거리가 k 이하인 경우의 수를 구하는 문제이다.


![1530](../../../images/LEET/1530/1530.png)

## 풀이 및 해설

## 풀이
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def countPairs(self, root: TreeNode, distance: int) -> int:
        # find distance between every pair?
        self.result = 0

        def dfs(node):
            if not node:
                return []
            
            if not node.left and not node.right:
                return [1]
            
            left = dfs(node.left)
            right = dfs(node.right)

            # count good pairs
            for l in left:
                for r in right:
                    if l+r <= distance:
                        self.result += 1
            
            # return distances of leaf nodes from curr node
            return [d+1 for d in left+right if d+1 < distance]

        dfs(root)
        return self.result
```
- self.result를 선언하여 결과를 저장한다.
- dfs 함수를 정의한다.
  - node가 없으면 빈 리스트를 반환한다.
  - node가 leaf node이면 [1]을 반환한다.
  - left, right에 각각 dfs(node.left), dfs(node.right)를 저장한다.
  - left, right의 각각의 요소들을 더하여 distance보다 작은 경우 self.result에 1을 더한다.
  - leaf node까지의 거리를 반환한다.
- dfs(root)를 실행하여 결과를 반환한다.

## Complexity Analysis

![tc](../../../images/LEET/1530/tc.png)

### 시간 복잡도
- O(N) : 모든 노드를 방문해야 하므로 O(N)이다.

### 공간 복잡도
- O(h) : h는 트리의 높이이다.

## Constraint Analysis
```
Constraints:
The number of nodes in the tree is in the range [1, 2^10].
1 <= Node.val <= 100
1 <= distance <= 10
```

# References
- [LeetCode](https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/)