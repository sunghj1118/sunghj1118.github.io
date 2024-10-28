---
title: "SCSI, iSCSI (스카시, 아이스카시)"
date: "2024-10-28"
description: "SCSI가 뭘까?"
tags: ["CS", "OS"]
---

# SCSI (Small Computer System Interface)

시스템 수업을 들으면서 softirq에 SCSI handler이라는게 있다는데, SCSI가 뭘까 궁금해서 찾아보았다.

보니까 컴퓨터들이 기타 하드웨어 디바이스들이랑 통신이 가능하도록 해주는 표준 인터페이스이자 프로토콜이다.

과거에는 SCSI가 Redundant Array of Independent Disks(RAID)를 통제하기 위해 쓰였고 프린터나 스케너 같은 하드웨어를 제어하는데 쓰였으나, 이제는 다른 USB 등의 빠른 대체제가 생겨서 안 쓰인다. 대신 여전히 block storage 또는 high performance storage connectivity 환경이 필요한 곳들에서는 쓰인다.

## Common SCSI Components

1. Initiator: SCSI 명령을 보내는 디바이스. iSCSI는 흔히 SW-based initiator를 사용한다.
2. Controller: Host Adapter로도 불리며, 컴퓨터와 연결되어 있는 디바이스들을 제어한다.
3. Target: 보통 물리 하드웨어 디바이스를 지칭한다. 이때 디스크가 대표적인 한 예시다. 

## In a nutshell?

SCSI는 컴퓨터들이 하드드라이브 같은 하드웨어 장비랑 빠르게 통신하기 위해 쓰이는 일종의 언어 같은거다. 반면에 iSCSI는 이게 인터넷을 통해 이루어지는 것이며, SCSI 명령어들을 감싸서 인터넷에 보내는 것.


## References
- [SCSI (Small Computer System Interface)](https://www.techtarget.com/searchstorage/definition/SCSI)