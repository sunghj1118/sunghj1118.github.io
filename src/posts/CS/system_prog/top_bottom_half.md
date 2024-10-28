---
title: "Interrupt Handler의  Top Half와 Bottom Half"
date: "2024-10-28"
description: "Top Half와 Bottom Half은 무엇이고 왜 나누어졌을까?"
tags: ["CS", "OS"]
---

# 왜 나누어졌을까?

IRQ는 빠르기도 해야 하지만, 이런 반면에 느린 작업을 수행해야 하는 경우도 있다.   
이런 서로 다른 요구사항을 충족시키기 위해, IRQ를 처리하는 코드를 Top Half와 Bottom Half로 나누어서 처리한다.

# Top Half
Top Half는 IRQ를 처리하는 코드 중에서 빠른 작업을 수행하는 코드를 말한다. 하드웨어 인터럽트가 발생하면 바로 실행이 되며, 커널의 response time과 유저의 latency를 최대한 줄이기 위해 빠른 작업을 수행한다. 반면에 나머지 task들은 나중에 처리하기 위해 스케줄링을 한다.

# Bottom Half
반면에 Bottom Half는 느린 작업을 수행하는 코드를 말한다. 예를 들어, 디스크 I/O나 네트워크 I/O 등의 작업을 수행한다. 이런 작업들은 빠르게 처리할 수 없기 때문에, Top Half에서 처리하지 않고 Bottom Half에서 처리한다. 그렇다면 Bottom half의 구현은 어떻게 이루어질까?

## Softirq

Bottom Half의 구현 방법 중 하나로 Softirq가 있다. Softirq의 개념 정의를 보면 다음과 같다.

`A statically-defined bottom-half that can run simultaneously on any processor.`

이때 주의 깊게 봐야 한다는 점은 'static'하며, 'simultaneous'하다는 것이다. 즉, Softirq는 커널이 시작될 때 정의되어 있으며, 어떤 프로세서에서든 동시에 실행될 수 있다. 이런 특징 때문에 Softirq는 빠르게 처리해야 하는 작업에 적합하다. (예: networking and fast I/O)

그러나, 여러 프로세서에서 동시에 실행 될 수 있기 때문에 lock을 고민해야 된다.

## Tasklet
반면에 Bottom Half의 또다른 구현 방법으로 Tasklet이 있다. Tasklet의 개념 정의를 보면 다음과 같다.

`A dynamically-scheduled bottom-half built on top of softirqs.`

Tasklet은 Softirq 위에 구현된 것으로, Softirq와 달리 동적으로 스케줄링이 된다. 즉, Softirq와 달리 Tasklet은 동시에 여러 프로세서에서 실행될 수 없다. 따라서, Tasklet은 lock이 필요없으며 그만큼 쓰기 편하다. (예: disk I/O)

    Q. In the linux kernel, when creating IRQ handlers, do we use a combination of softirqs and tasklets?
    
    A. When creating IRQ handlers, developers generally choose between softirqs and tasklets based on specific requirements:
    
    - Softirqs are used for very high-frequency, performance-critical tasks that may need to run concurrently on multiple CPUs.

    - Tasklets are more commonly used in device drivers and modules, offering a simpler interface with automatic serialization


### 문제
Softirq에서는 계속 interrupt가 허락이 되어있다. 즉, softirq가 끊임없이 많이 발생하면, 커널모드를 벗어날 수 없게 되거나 너무 오래 머물게 된다. (즉, 유저가 느리게 느껴질 수 있다.) 따라서 다음과 같은 tradeoff가 발생한다:

- softirq responsiveness vs user-mode task latency

그러면 두 가지 선택지가 있다.
1. 유저 편: `do_softirq`를 진행하고 있을 경우에 나머지 softirq들은 무시하기.
2. softirq 편: 계속하여 softirq가 남아있는지 확인하고 처리하기.

### workqueue

workqueue는 추후에 work가 특별한 커널 쓰레드인 worker_thread로 처리 가능하도록 해주는 구현 방법이다.

특징으로는 process context에 돌아간다는 것이며, schedulable이며, 따라서 sleep이 가능하다는 것이다.