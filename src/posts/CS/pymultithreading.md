---
title: "Multithreading in Python"
date: "2024-09-06"
description: "Multithreading in Python"
tags: ["CS", "OS"]
---

## 서론
예전에 면접 질문을 찾아보다가 '파이썬에서 멀티쓰레딩이 가능한가?'라는 질문을 봤었다. 그때는 가볍게 가능하다고만 이해했었는데, 이번에는 좀 더 자세히 알아보려고 한다.

# 멀티쓰레딩이란?
멀티쓰레딩은 하나의 프로세스에서 여러 개의 쓰레드를 생성하여 병렬적으로 작업을 수행하는 것을 의미한다. 이때, 쓰레드는 프로세스 내에서 실행되는 흐름의 단위로, 프로세스 내의 메모리를 공유한다. 이러한 멀티쓰레딩은 프로그램의 성능을 향상시키고, 프로그램의 응답성을 높이는 데 도움을 준다.

# 파이썬에서 멀티쓰레딩이 가능한가?
파이썬은 멀티쓰레딩을 지원한다. 그러나, 파이썬은 GIL (Global Interpreter Lock)이라는 것을 가지고 있어서, 한 번에 하나의 쓰레드만이 파이썬 객체에 접근할 수 있다. 이러한 GIL 때문에 파이썬에서 멀티쓰레딩을 사용하더라도, CPU-bound 작업에 대해서는 성능 향상을 기대하기 어렵다. 그러나, I/O-bound 작업에 대해서는 멀티쓰레딩을 사용하여 성능 향상을 기대할 수 있다.



# Reference
- [Multithreading in Python](https://www.geeksforgeeks.org/multithreading-python-set-1/)
- [GIL](https://realpython.com/python-gil/)