---
title: "Amazon Cloud Support Intern - Loop Interview 준비 3"
date: "2024-10-20"
description: "Cloud Support Intern 채용연계형 인턴의 Loop Interview 준비하면서 LP 예상 Functional Questions"
tags: ["Blog", "취준", "Amazon"]
---

# 면접 준비과정

면접에서 어쩌면 Functional Questions가 나올수도 있다고 안내 받아서 이에 대하여 조금 더 준비를 해보았다.  
특히, Cloud Support 직무와 면접관님의 커리어로 봤을 때 네트워크 관련해서 한번 더 복습을 해보았다.

- [면접 준비과정](#면접-준비과정)
  - [Functional questions](#functional-questions)
    - [REST](#rest)
    - [VPC](#vpc)
    - [OSI](#osi)


## Functional questions
### REST
Q. RESTful API의 개념을 설명해보세요.
A. Representative State Transfer의 원칙을 따르는 웹 서비스 API입니다. 핵심 개념으로는 1) URI을 통해 리소스를 명확하게 표현하고, 2) HTTP 메서드 (GET, POST, PUT, DELETE)를 사용하여 CRUD(Create, Read, Update, Delete)을 수행하며, 3) 상태 전달을 클라이언트와 서버 간에 주고 받습니다.
특히, 주요 특징으로는 Stateless하며, Cacheable하고, 클라이언트-서버 분리를 해야하고, 계층화 시스템을 통해 클라이언트가 최종 서버에 연결했는지 중간 서버에 연결했는지 몰라야 하며, 인터페이스가 일관되어야 한다.

장점으로는 기존 HTTP 인프라를 활용하여 별도의 인프라 구축이 불필요하다는 점이며, 서버와 클라이언트를 명확하게 분리한다는 점입니다.


Q. Stateless 설명해보세요.
A. 각 요청에는 해당 요청을 처리하는 데 필요한 모든 정보가 포함되어야 한다는 뜻입니다. 서버는 클라이언트의 state을 저장하지 않기 때문에 stateless라고 불리는것입니다. 
서버가 클라이언트의 상태 정보를 저장하지 않고, 각 요청에 필요한 모든 정보가 포함되어 있어야 하며, 서버는 각 요청을 독립적인 트랜잭션으로 취급합니다.
서버 간 상태 공유가 필요가 없어서 수평적 확장이 용이하며, 세션 상태를 유지할 필요가 없어 서버 리소스 사용이 줄어들며, 어떤 서버로도 요청을 보낼 수 있어 효율적인 부하 분산이 가능합니다. 또한, 응답을 쉽게 캐시할 수 있어 반복적인 요청 처리 속도가 향상됩니다.

Q. Cache에 대해 설명해보세요.
캐시는 자주 사용되는 데이터나 값을 미리 저장해두는 임시 저장소입니다. 빠른 접근이 가능한 임시 저장소이며, 자주 사용되는 데이터를 복사해 저장할 수 있습니다. 캐시를 통해 성능 향상, 비용 절감, 사용자 경험 개선 등 다양한 이점을 얻을 수 있습니다.

캐시는 자주 요청되는 데이터를 빠르게 접근할 수 있는 메모리에 저장하여 응답 시간을 크게 단축시키며, 반복적인 요청에 대한 네트워크 트래픽을 줄일 수 있습니다.
비용절감의 면에서는 캐시 사용을 통해 데이터베이스 쿼리 수를 줄여줄 수 있으며, 자주 사용되는 데이터를 캐시에 저장함으로써 시스템 리소스를 더 효율적으로 사용할 수 있습니다. 

### VPC
Q. Amazon VPC(Amazon Virtual Private Cloud)란 무엇인가요?
AWS 클라우드에서 논리적으로 격리된 가상 네트워크를 제공하는 서비스입니다. 주요 특징으로는 가상 네트워크 환경을 통해서 사용자가 전통적인 데이터센터 네트워크와 유사하게 환경을 제공받으며, 이에 대한 제어, 즉 IP 주소 범위, 서브넷 생성, 라우팅 테이블 및 네트워크 게이트웨이 등의 구성을 직접 제어할 수 있다는 장점이 있습니다.

Q. 서브넷 설명해보세요.
서브넷은 큰 네트워크를 작은 네트워크로 분할하는 것입니다. 네트워크 트래픽을 효율적으로 관리하는 목적을 갖고 있으며, IP 주소와 서브넷 마스크를 사용하여 구현됩니다. 서브넷 마스크는 32비트 길이로, 1과 0으로 구성되며, 호스트 부분과 네트워크 부분을 구분합니다. 

Q. CIDR 표기법을 설명해보세요.
IP 주소와 서브넷 마스크를 간단히 표현하는 방법입니다. 예시로 192.168.1.0/24가 있으면 24비트가 네트워크 부분임을 나타냅니다. 

Q. 라우팅 테이블 및 ACL(엑세스 제어 목록)에 대해 설명해보세요.
네트워크 보안에 중요한 역할을 담당하고 있습니다. 라우팅 테이블은 네트워크 장비가 데이터 패킷을 목적지로 전달하기 위해 사용하는 정보를 담고 있는 테이블입니다. 최적의 경로를 결정하는 데 사용되며, 정적 라우팅과 동적 라우팅 프로토콜에 의해 구성될 수 있습니다.

ACL(Access Control List)는 네트워크 트래픽을 필터링하고 제어하는 데 사용되는 규칙의 집합입니다. 허용과 거부 규칙을 통해 트래픽을 제어합니다. 소스/목적 IP, 프로토콜, 포트 번호 등의 조건을 기반으로 필터링합니다. 보안을 강화하며, 불필요한 트래픽을 차단합니다.



### OSI
Q. OSI 7계층 모델에 대해 설명하고 각 계층의 주요 프로토콜들을 말해보세요.
1. Physical Layer: 물리적 신호가 나가는 장비. 케이블, 허브.
2. Data Link Layer: 정보의 오류와 흐름 관리. MAC 주소. Frame 단위. 스위치, 이더넷.
3. Network Layer: 경로와 주소를 정하고 패킷을 전달. 최적의 경로를 설정.
4. Transport Layer: 신뢰성 있는 데이터를 주고 받게 해주는 역할. Port 번호 사용. TCP/UDP.
5. Session Layer: TCP/IP 세션을 만들고 없애는 역할.
6. Presentation Layer: 데이터의 표현방식을 결정. 압축, 변환, 암호화. GIF, JPEG, ASCII.
7. Application Layer: 사용자와 가장 가까운 계층이 바로 응용 계층. HTTP, FTP.


Q. TCP와 UDP의 차이점은 무엇인가요?
TCP는 안전하고 신뢰성 있는 데이터 전송하는데 초점이 맞춰져있으며, UDP는 이런 검사를 하지 않습니다. TCP는 연결 지향적이고, UDP는 비연결을 지향하며, 이때문에 TCP는 상대적으로 느리고 UDP는 상대적으로 빠릅니다. 따라서 용도도 다르고 신뢰성이 중요한 경우에는 TCP를, 실시간 스트리밍 또는 속도가 중요한 온라인 게임은 UDP를 사용합니다. 


Q. TCP의 연결과 신뢰를 보장하는 방법은?
대표적으로 3way handshake가 존재합니다. SYN, SYN-ACK, ACK 메시지의 교환으로 연결을 설정하며, 모든 시퀀스 번호에 ACK을 사용하며, ACK을 재전송하고, 종료 과정의 경우에는 4way handshake으로 FIN, ACK, FIN, ACK으로 마무리됩니다. 

Q. 응답을 보내지 않는 서버를 어떻게 트러블슈팅하실건가요?
Ping으로 서버에 대한 네트워크 연결을 확인해보고, traceroute, netstat 등으로 테스트를 진행해볼 것 같습니다. SSH나 콘솔으로 직접 서버에 접속을 시도해보기도 할것이며, 방화벽 설정, 하드웨어 이슈 확인, 로그 파일 분석, 패킷 분석을 진행할겁니다.