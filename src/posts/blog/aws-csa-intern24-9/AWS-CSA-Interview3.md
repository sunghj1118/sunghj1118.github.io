---
title: "Amazon Cloud Support Intern - Phone Interview 준비 2"
date: "2024-10-14"
description: "Cloud Support Intern 채용연계형 인턴의 Phone Interview 준비하면서 공부했던 이론적인 내용"
tags: ["Blog", "취준", "Amazon"]
---

# 목차 <!-- omit from toc --> 
- [네트워크](#네트워크)
    - [VPC에 대해 설명해보세요.](#vpc에-대해-설명해보세요)
    - [Public Subnet과 Private Subnet의 차이를 설명해보세요.](#public-subnet과-private-subnet의-차이를-설명해보세요)
    - [NAT Gateway와 Internet Gateway의 차이를 설명해보세요.](#nat-gateway와-internet-gateway의-차이를-설명해보세요)
    - [Load Balancer에 대해 설명해보세요.](#load-balancer에-대해-설명해보세요)
    - [수직확장과 수평확장의 차이를 설명해보세요.](#수직확장과-수평확장의-차이를-설명해보세요)
    - [✅ EC2 인스턴스의 종류에 대해 설명해보세요.](#ec2-인스턴스의-종류에-대해-설명해보세요)
    - [CORS에 대해 설명해봐.](#cors에-대해-설명해봐)
    - [RESTful API와 REST 철학에 대해 설명해봐.](#restful-api와-rest-철학에-대해-설명해봐)
    - [MSA에 대해서 아는대로 설명해보세요.](#msa에-대해서-아는대로-설명해보세요)
- [DB](#db)
    - [✅ SQL DB랑 NoSQL DB를 비교해봐.](#sql-db랑-nosql-db를-비교해봐)
    - [✅ a. SQL DB, NoSQL DB 설명하다 수평 확장, 수직 확장 언급함) 너가 SQL DB는 수직 확장을 한다고 말했는데, SQL DB는 수평 확장이 불가능해?](#a-sql-db-nosql-db-설명하다-수평-확장-수직-확장-언급함-너가-sql-db는-수직-확장을-한다고-말했는데-sql-db는-수평-확장이-불가능해)
    - [b. (NoSQL DB 설명하다 빅데이터라는 단어를 말함) 너가 빅데이터에 대해 얘기해서 말인데, Hadoop ecosystem의 소프트웨어 써본 적 있어?](#b-nosql-db-설명하다-빅데이터라는-단어를-말함-너가-빅데이터에-대해-얘기해서-말인데-hadoop-ecosystem의-소프트웨어-써본-적-있어)
    - [✅ c. (SQL DB는 전통적으로 수평확장을 한다고 말함) 그럼에도 불구하고 사용되는 이유가 있어?](#c-sql-db는-전통적으로-수평확장을-한다고-말함-그럼에도-불구하고-사용되는-이유가-있어)
    - [✅ d. (ACID 언급) 그러면 NoSQL DB들에서는 ACID 보장이 안돼?](#d-acid-언급-그러면-nosql-db들에서는-acid-보장이-안돼)
- [빅데이터](#빅데이터)
    - [하둡의 MapReduce 기능 방법을 설명해봐.](#하둡의-mapreduce-기능-방법을-설명해봐)
    - [HDFS와 일반 DB의 차이 설명해봐.](#hdfs와-일반-db의-차이-설명해봐)
    - [ETL이라는 개념에 대해 들어봤어?](#etl이라는-개념에-대해-들어봤어)
    - [너가 진행한 프로젝트 중 ETL을 수행한 프로젝트가 있다면 그 프로젝트에서 한 ETL을 단계별로 자세히 설명해봐.](#너가-진행한-프로젝트-중-etl을-수행한-프로젝트가-있다면-그-프로젝트에서-한-etl을-단계별로-자세히-설명해봐)
    - [Cache에 대해 설명해봐.](#cache에-대해-설명해봐)
    - [file descriptor과 socket의 차이와 관계성을 설명해봐.](#file-descriptor과-socket의-차이와-관계성을-설명해봐)
    - [HTTPS의 동작방법을 설명해봐.](#https의-동작방법을-설명해봐)
- [보안](#보안)
    - [public key와 private key에 대해 설명해봐.](#public-key와-private-key에-대해-설명해봐)
    - [Diffie-Helmann encryption 방법 설명해봐.](#diffie-helmann-encryption-방법-설명해봐)
    - [3 way handshake 설명해봐.](#3-way-handshake-설명해봐)
    - [SSL 인증서와 TLS의 차이를 설명해봐.](#ssl-인증서와-tls의-차이를-설명해봐)
    - [HTTP 1,2,3의 차이는 뭐야?](#http-123의-차이는-뭐야)
- [OS](#os)
    - [Process와 Thread의 차이를 설명해봐.](#process와-thread의-차이를-설명해봐)
    - [Namespace에 대해서 알아?](#namespace에-대해서-알아)
    - [Namespace와 Virtual Machine의 차이를 설명해봐.](#namespace와-virtual-machine의-차이를-설명해봐)
    - [Page Table에 대해서 설명해봐.](#page-table에-대해서-설명해봐)
    - [Process Switch는 언제 발생하고, 이걸 최적화 시키기 위한 스케줄링 방식에 대해 설명해봐.](#process-switch는-언제-발생하고-이걸-최적화-시키기-위한-스케줄링-방식에-대해-설명해봐)
    - [Semaphor은 언제 쓰이고 동작 원리는 뭐야?](#semaphor은-언제-쓰이고-동작-원리는-뭐야)
    - [Virtual Memory는 언제 쓰여?](#virtual-memory는-언제-쓰여)
- [컨테이너화](#컨테이너화)
    - [도커의 컨테이너는 어떻게 구현되어 있는지 설명해봐.](#도커의-컨테이너는-어떻게-구현되어-있는지-설명해봐)
    - [docker-compose의 역할은 뭐야?](#docker-compose의-역할은-뭐야)

----
    작성의 미완인 부분이 많지만, 준비했던 부분은 다음과 같다.

----




# 네트워크

### VPC에 대해 설명해보세요.

VPC는 Virtual Private Cloud의 약자로, 퍼블릭 클라우드 내에서 논리적으로 분리된 가상 공간입니다. 이를 통해 자체 데이터 센터에서 운영하고 관리하는 네트워크와 유사한 환경을 클라우드에서 제공해줍니다. 

논리적 격리로 다른 사용자들과 분리된 프라이빗 네트워크가 제공되며, 사용자가 IP 주소 범위, 서브넷, 라이팅 테이블 등을 직접 정의할 수 있습니다.

이에 따른 보안 설정과 공개 정도를 나눌 수 있으며, Private Subnet과 Public Subnet을 배정함으로서 네트워크에 대한 권한 설정을 더욱 세밀하게 할 수 있습니다.

### Public Subnet과 Private Subnet의 차이를 설명해보세요.

Subnet은 하나의 네트워크에 배정된 IP들을 나눠서 마치 하나의 하위 네트워크 공간을 분리하는 기능입니다. 이때, Subnet을 public 또는 private으로 설정할 수 있는데, public으로 하면 외부에서 연결 및 요청이 가능하며, private으로 하면 내부에서만 통신이 가능합니다.

### NAT Gateway와 Internet Gateway의 차이를 설명해보세요.

NAT Gateway는 Private Subnet으로부터 라우팅 테이블을 통해서 외부로 통신을 가능하도록 해주는 역할을 담당하고 있습니다. NAT Gateway와의 차별점으로는 Internet Gateway이 더욱 개방되어 있는것으로 알고 있습니다.

### Load Balancer에 대해 설명해보세요.

모든 웹사이트에 대해서는 사용량과 트래픽의 개념이 존재하는데, 사용 되는 것에 비해 너무 많은 자원이 준비되어 있으면 과하게 비용이 발생할 수 있으며, 반면에 트래픽에 비해 자원이 적으면 서버가 감당을 못하여 서비스가 작동을 못하거나 느려질 수 있습니다. 

이때, 로드밸런서는 필요한 트래픽에 맞게 자원을 배정해주는 역할으로 트래픽이 급증할때에는 서버를 더욱 많이 구축하고, 쓰이지 않고 있을 때에는 줄이는 역할을 합니다.

### 수직확장과 수평확장의 차이를 설명해보세요.

수직확장과 수평확장은 더 많은 트래픽을 감당할 때 어떻게 자원을 늘릴지에 대한 서로 다른 방법론입니다.  수직확장은 하나의 컴퓨터나 서버를 더욱 크게 늘리는 형식입니다. 예를 들어, t2.micro로 감당이 안되는 작업을 m4.xlarge로 늘리는 식으로 말입니다.

반면에, 수평확장은 하나의 컴퓨터를 더 크고 좋게 늘리는것이 아닌, 이를 감당하는 서버를 늘려서 여러대에 분산시켜서 하는 작업입니다. 보통 수직확장이 더욱 가격이 비싸며, 많은 경우에 수평확장이 더욱 효과적이며 효율적입니다.

### ✅ EC2 인스턴스의 종류에 대해 설명해보세요.

범용 인스턴스, 고성능 컴퓨팅 인스턴스, 메모리 최적화 인스턴스, 스토리지 최적화 인스턴스 등이 있습니다. 각각 사용사례에 따라 다르며, 가장 흔히 사용되는 것은 범용 인스턴스이며, CPU와 메모리 등이 균형 있게 구성되어 있습니다. 필요에 맞게, micro, small, large, 등으로 제공되어 있어서 리소스를 선택할 수 있습니다.

### CORS에 대해 설명해봐.

Cross Origin 문제로, 백엔드와 프론트엔드 간 통신을 진행할때 자주 발생하는 문제 중 하나입니다. 

### RESTful API와 REST 철학에 대해 설명해봐.

RESTful API는 POST/GET 등의 명령어로 API를 호출하고 반환 받는데 정의하는 웹 프로토콜의 일종입니다.

### MSA에 대해서 아는대로 설명해보세요.

Multiservice Architecture의 약자로 모든 디바이스로부터 프로세싱을 하여 서버의 부하와 통신비용을 절감하는 설계 구조입니다.

# DB

### ✅ SQL DB랑 NoSQL DB를 비교해봐.

SQL DB는 SQL 언어가 중점적으로 사용되는 DB를 지칭합니다. 더욱 면밀히 말하자면, SQL DB들은 관계형(relational database/RDBMS)에 해당합니다. 관계형 데이터베이스에서는 데이터를 보관 및 관리하기 위해서 행과 열으로 구성되어 있는 테이블을 구축합니다. 두 테이블 간의 관계는 foreign key를 사용해서 정의할 수 있습니다. 관계형 DB에 데이터를 추가하려면 무조건 정해진 스키마(구조)에 맞게 정의를 해야 하며 이 말은 즉슨, 정리가 안된 데이터는 처리가 불가능하지만, 정리가 된 데이터는 다루기 매우 용이합니다.

RDBMS의 예시로는 Oracle, MySQL, PostgreSQL 등이 있습니다.

NoSQL은 Not only SQL이란 뜻을 갖고 있습니다. NoSQL은 정제가 안된 데이터도 다루기 위해 만들어진 데이터베이스 구조입니다. 정제가 안된 데이터의 예시로는 사진, 영상, 오디오, 지도 등이 있습니다. NoSQL 데이터베이스들은 정제가 안된 데이터와 semi-structured 데이터를 모두 담을 수 있는 유연한 스키마를 제공합니다. 테이블 기준의 구조를 지니고 있지 않으며, 유연한 스키마를 사용하기 때문에 RDBMS에서는 사용할 수 없는 데이터 형식을 그대로 저장할수도 있습니다.

NoSQL DB들의 예시로는 document DB (i.e. MongoDB), column-family DB (Cassandra, HBase), 그래프 DB (Neo4j, Kibana) 등이 있습니다. 

핵심 차이점으로 나눠보자면 다음과 같습니다:

1. DB 저장 모델: SQL은 테이블 기준으로 저장, NoSQL은 Data type에 따른 다양한 기준으로 저장.
2. 데이터 타입: SQL은 무조건 정형 데이터만 담을 수 있으며, NoSQL은 비정형 데이터도 다룰 수 있음.
3. 스키마: SQL은 미리 스키마를 정의해줘야 하지만, NoSQL은 유연한 스키마를 갖고 있음.
4. 스케일링 (확장) 방법: SQL은 수직 확장을 쓰며, NoSQL은 분산되어 있기에 수평확장이 가능하다.

https://www.oracle.com/kr/database/what-is-a-relational-database/

https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql

### ✅ a. SQL DB, NoSQL DB 설명하다 수평 확장, 수직 확장 언급함) 너가 SQL DB는 수직 확장을 한다고 말했는데, SQL DB는 수평 확장이 불가능해?

SQL DB 또한 수평 확장이 가능합니다. 다만, 더욱 복잡하고 제한적일 수 있습니다.

SQL DB에 수평 확장을 위한 기술으로는 다음이 존재합니다.

- 샤딩(sharding) : 데이터를 여러 서버에 분산하는 기술
- 레플리케이션(replication) : 데이터를 여러 서버에 복제하여 저장합니다.
- 클러스터링(clustering) : 여러 서버를 하나의 시스템처럼 작동하게 만들어서 고가용성과 분산을 제공

예시로는 PostgreSQL의 읽기 전용 복제본을 통한 수평 확장이 있습니다.

### b. (NoSQL DB 설명하다 빅데이터라는 단어를 말함) 너가 빅데이터에 대해 얘기해서 말인데, Hadoop ecosystem의 소프트웨어 써본 적 있어?

써본 적 없습니다.

### ✅ c. (SQL DB는 전통적으로 수평확장을 한다고 말함) 그럼에도 불구하고 사용되는 이유가 있어?

1. ACID Compliance (Atomicity, Consistency, Isolation, Durability):
데이터베이스 트랜잭션에서 데이터 무결성을 보장하기 위한 네 가지 요소를 지칭하는 약자입니다. Atomicity(원자성), Consistency(일관성), Isolation(격리성), Durability(영속성) 등이 있습니다.
A - 트랜잭션에 속한 각각의 문(데이터 읽기, 쓰기, 업데이트 등 CRUD)를 하나의 원자로 취급합니다. 문 전체를 실행하거나 모두 실패하거나.
C - 트랜잭션으로 인하여 테이블에 변경 사항을 저장하려 하면, 예측할 수 있는 방향으로만 취합합니다. 
I - 여러 사용자가 같은 테이블에 동시에 읽고 쓰는 작업을 할 경우, 각각의 트랜잭션을 격리함으로써 서로 방해하거나 영향을 미치지 못하게 막는다.
D - 트랜잭션으로 인해 변경된 데이터를 저장하도록 보장합니다. 시스템이 오류나도 데이터가 보장이 되어야 합니다.
2. Transaction Management
트랜잭션 관리가 더욱 용이합니다. 여러 분산 환경에서 트랜잭션을 동시다발적으로 하려 한다면 데이터 무결성을 보장하기가 더욱 어려워진다.
3. Schema Rigidity
SQL DB들은 구조가 미리 정의되어 있는 스키마를 따르기에 하나의 컴퓨터에서 관리하기 편하고 간단합니다. 수평확장을 할 시에 더욱 복잡해지며, 데이터 무결성을 보장하기가 어려워집니다.

https://www.databricks.com/kr/glossary/acid-transactions

### ✅ d. (ACID 언급) 그러면 NoSQL DB들에서는 ACID 보장이 안돼?

NoSQL DB들은 보통 SQL DB들과는 다르게 BASE 원칙을 따르는 경향이 있습니다.
Basically Available - 기본 가용성이란 언제든 데이터베이스에 동시에 엑세스할 수 있음을 의미. 다른 사용자가 완료할때까지 기다릴 필요가 없습니다.
Soft State - 소프트 상태는 외부 트리거 또는 입력이 없더라도 나중에 시간이 지나면 자동으로 업데이트 해주는 개념입니다.
Eventually Consistent - 최종 일관성은 모든 동시 업데이트가 완료되었을 때 일관된 상태가 된다는 것을 지칭합니다.

MongoDB Atlas은 다중 문서 ACID 트랜잭션을 지원하며, Cassandra는 LightWeight Transaction을 통해 NoSQL DB임에도 불구하고 ACID 원칙을 지키는것으로 알고 있습니다.

CAP 정리에 따르면 데이터베이스는 일관성(consistency), 가용성(availability) 및 파티션 내성(partition tolerance) 세가지 중 두가지를 보장할 수 있다고 한다. ACID와 BASE 모두 파티션 내성을 제공하기 때문에 높은 일관성과 가용성을 동시에 제공할 수는 없습니다. ACID는 보통 일관성에 더 초점이 맞춰져 있고, BASE는 일관성에 더 맞춰져 있기에, 보통 둘 중 하나로 기울게 되어있습니다.

https://aws.amazon.com/ko/compare/the-difference-between-acid-and-base-database/

# 빅데이터

### 하둡의 MapReduce 기능 방법을 설명해봐.

### HDFS와 일반 DB의 차이 설명해봐.

### ETL이라는 개념에 대해 들어봤어?

### 너가 진행한 프로젝트 중 ETL을 수행한 프로젝트가 있다면 그 프로젝트에서 한 ETL을 단계별로 자세히 설명해봐.

### Cache에 대해 설명해봐.

### file descriptor과 socket의 차이와 관계성을 설명해봐.

### HTTPS의 동작방법을 설명해봐.

# 보안

### public key와 private key에 대해 설명해봐.

### Diffie-Helmann encryption 방법 설명해봐.

### 3 way handshake 설명해봐.

### SSL 인증서와 TLS의 차이를 설명해봐.

### HTTP 1,2,3의 차이는 뭐야?

# OS

### Process와 Thread의 차이를 설명해봐.

### Namespace에 대해서 알아?

### Namespace와 Virtual Machine의 차이를 설명해봐.

### Page Table에 대해서 설명해봐.

### Process Switch는 언제 발생하고, 이걸 최적화 시키기 위한 스케줄링 방식에 대해 설명해봐.

### Semaphor은 언제 쓰이고 동작 원리는 뭐야?

### Virtual Memory는 언제 쓰여?

# 컨테이너화

### 도커의 컨테이너는 어떻게 구현되어 있는지 설명해봐.

### docker-compose의 역할은 뭐야?