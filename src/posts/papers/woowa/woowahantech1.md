---
title: "[독후감] 요즘 우아한 개발 1장"
date: "2024-07-03"
description: "[요즘 우아한 개발 - 우아한형제들] 개발팀이 어떻게 일하는지, 어떤 문화를 가지고 있는지에 대한 책이다."
tags: ["Papers", "Books"]
---

# 읽기에 앞서
배달의민족의 우아한형제들은 탁월한 개발 문화로 명성이 높고 인기 기업이다. 그러나, 실제로 우아한 형제들에 대해서 누가 묻는다면 왜 그렇게 좋은지 제대로 대답을 못하겠다. 일단, 우아한형제들이 왜 좋은 개발 문화를 가졌는지 알기 위해서는 무엇이 좋은 개발문화인이 먼저 정의해야 한다. 제가 생각하기에 좋은 개발 문화는 개발자의 성장을 촉진하는 문화다. 개발자의 성장을 위해 코드 리뷰를 적극적으로 해주며, 직접 아키텍처 설계를 할 수 있게 참여를 많이 권장하며, 다양한 경험을 제공해야 한다고 생각한다. 좋은 코드를 작성하기 위해 끊임없이 대화하며 협업을 중요시해야 하며, 질문과 배움에 있어서 강압적인 분위기가 형성되면 안 된다고 생각한다. 하나의 팀 또는 크게는 조직에서 추구하는 개발 가치관이나 스타일이 일치해야 한다. 또한, 새로운 아이디어나 도전을 수용하는 환경을 제공함으로써 개발자가 더욱 뛰어난 능력 향상을 달성하도록 도움을 줘야 한다고 생각한다. '요즘 우아한 개발'을 읽어보면서 과연 우아한형제들은 내가 생각하는 좋은 개발 문화와 얼마나 일치하는지, 또는 내가 생각하지 못했던 좋은 개발 문화는 무엇이 있을지 알아보려 한다.

# 01. 내가 경험한 B마트 프론트엔드의 온보딩 프로세스
## 요약 및 후기
첫인상으로는 우아한형제들은 정말 **문서화**와 **공유**에 미쳐있는 것 같다. 매일 상황공유로 하루를 시작하고, 금요일마다 자유주제 공유 및 발표하고, 프로젝트 및 서비스화를 하면서 문서화를 엄청나게 한다.


## 정리
우아한형제들 B마트서비스팀의 웹 프론트엔드 개발자 권기석님께서 작성하신 온보딩 프로세스에 대한 소개 및 후기글이다. 파일럿 프로젝트를 6주동안 하면서 협업문화와 개발문화에 적응하도록 했다. 크게는 다음의 목표가 있었다고 한다:

- 위키/지라/제플린을 활용한 협업 방식 파악
- 기술 선택/설계/개발 단계에서 팀원에게 피드백받기
- 실제 서비스에서 활용되는 API를 활용하여 개발하기

## 협업을 위한 스트레칭
### 데일리 스크럼과 회고
업무 시간 전에 매일 미팅을 통해 진행상황이나 문제를 공유하고 대화하는 시간을 가진다.

### 투명하고 상세한 문서화
문서를 투명하고 상세하게 작성하여, 프로젝트의 히스토리를 볼 수 있게 다음 단계들으로 작성한다.
- 1단계: 대략적인 스케치. 배경 및 계획.
- N단계: 이슈 및 문제 해결. 히스토리.
- 마지막 단계: 회고. 1단계 기준으로 성과/비교 작업.

### 자유 주제 워크숍
매주 금요일 돌아가면서 자유 주제로 워크숍을 진행한다.

## 협업 도구 활용해보기
실제 서비스 개발에 쓰이는 도구들에 익숙해지는 과정을 제일 먼저 거쳤으며, 위키/지라/제플린 등이 있었다. 


## 실제 서비스 중인 페이지 개발로 도메인 파악하기

### 실제 서비스 API 요청 활용
쿠폰 조회, 이벤트 목록 조회 API 문서들을 직접 읽어보면서 도메인과 그 응답 형태를 파악할 수 있었다고 한다.

### 팀이 서비스하는 프로젝트에 대한 이해
팀에서는 프로젝트 코드를 어떻게 구현했는지 궁금할때면 직접 코드를 살펴보며, 프로젝트 구조를 자연스럽게 파악할 수 있었다고 한다.

## 아낌없이 주는 코드 리뷰
우아한형제들에서는 코드리뷰어를 선정하는 절차를 건너뛰기 위해서 PR이 발생할 시, 자동으로 리뷰어를 랜덤으로 배정하는 봇을 만들었으며, PR에 관련된 일이 발생할 때마다 슬랙으로 알림이 가겠금 설정했다. 이 때문에 누구에게 리뷰해달라고 할지에 대한 절차를 건너뛰었지만, 배정된 리뷰어 이외에 다섯명이나 코드 리뷰를 해줬다고 하며, 모든 팀원들이 코드 리뷰에 엄청 적극적으로 임했다고 한다.

### 확장하기 좋은 코드
Before:
```
const colors = {
    gray1: '#222222',
    gray2: '#444444',
    gray3: '#666666',
```

After:
```
const colors = {
    gray_100: '#222222',
    gray_200: '#444444',
    gray_300: '#666666',
```
위 간단한 예시로, 확장하기 좋은 코드의 예시를 살펴볼 수 있다. 프로젝트가 발전함에 따라서, gray1과 gray2 사이에 새로운 #333333으로 gray3 색깔이 추가되어야 한다고 생각해보자. 이때, 모든 코드를 바꾸는게 아니라, 애초에 gray_100, gray_200라고 해서, gray_150을 추후에 사용할 수 있게 하면 좋다.

### E2E 테스트의 의미
End-to-End 테스트 코드를 작성할 때, 거시적으로 기능이 정상적으로 작동하는지만 구현하지 말고, 실제 앱을 사용할 때 어떻게 동작할지 구현할 수 있어야 한다.
