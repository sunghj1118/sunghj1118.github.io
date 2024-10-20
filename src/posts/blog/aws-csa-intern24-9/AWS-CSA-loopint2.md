---
title: "Amazon Cloud Support Intern - Loop Interview 준비 2"
date: "2024-10-15"
description: "Cloud Support Intern 채용연계형 인턴의 Loop Interview 준비하면서 LP 예상 질문과 STAR 답변 정리"
tags: ["Blog", "취준", "Amazon"]
---

# 면접 준비과정

면접에서는 무조건 STAR 기법에 의한 LP behavioral 질문이 나올 것이라고 생각하고, 가장 연관성이 높은 LP를 미리 정리해두고 준비해봤다.

- [면접 준비과정](#면접-준비과정)
- [Format](#format)
- [Cloud Support: Role](#cloud-support-role)
- [LPs ranked in order of relevance:](#lps-ranked-in-order-of-relevance)
- [Behavioral Questions](#behavioral-questions)
  - [Customer Obsession](#customer-obsession)
  - [Learn and Be Curious](#learn-and-be-curious)
  - [Dive Deep](#dive-deep)
  - [Deliver Results](#deliver-results)
  - [Bias for Action](#bias-for-action)
  - [Earn Trust](#earn-trust)


# Format
Format: Each interviewer, 1 hour, 2 unique leadership principles
◦	Introductions (2-3mins)
◦	Functional questions (if any)
◦	Behavioral questions (20-25 mins for each LP)
◦	Follow up questions
◦	e.g. Do you think you could have done things differently?
◦	e.g. Do you think the result was ideal?
Q&A (last 5-10mins)

Each interviewer tests based on 2 LP’s -> Total of 4.


# Cloud Support: Role
•	responsible for solving customer’s cases
•	apply advanced troubleshooting techniques
•	 provide tailored solutions for our customers
•	drive customer interactions by thoughtfully working with customers
•	dive deep into the root cause of an issue
•	enjoy learning cloud technology
•	solving and troubleshooting complex issues
•	working with customers

# LPs ranked in order of relevance:
1.	Customer Obsession
2.	Learn and Be Curious
3.	Dive Deep
4.	Deliver Results
5.	Bias for Action
6.	Earn Trust
7.	Ownership
8.	Insist on the Highest Standards



 
# Behavioral Questions
## Customer Obsession
Q. Share a difficult interaction you had with a customer or how you went above and beyond for a customer.
S: The first and most impactful interaction I had with a customer was when I was conducting industrial projects with companies as the president and representative of our Yonsei Big Data academic club. This was the first time that club was attempting to perform an industrial collaboration project. 
T: I had to direct meetings for the first time with the executives of 16 companies, listening to their requests and discussing how we could contribute to their company. The executives were almost always chief representatives, given as the companies we collaborated with were often startups or small companies. It was very important that I properly understood the challenges that these companies were facing as well as our capabilities and the extent to which we can contribute.
A: To be able to provide the best communication and service to our customers, the companies, I had to conduct a lot of research on topics I had previously never heard about. I remember one of the biggest challenges I faced being that most companies, and AI startups in particular, often required incredibly specific domain knowledge. One particularly memorable case was that of my first meeting which was with a Sound Generation AI startup company called PozaLabs. I remember struggling a lot in the first meeting since I had very little domain knowledge on sound AI entirely. Due to this, I had to research a lot regarding this domain before the second meeting, reading survey papers on sound AI despite it having nothing to do with my prior areas of knowledge and interest. I contacted several Graduate school seniors that were researched that area and consulted them regarding what problems a company doing Sound Generation could face. Due to this, I was able to prepare several suggestions before our second meeting regarding what topics we might be able to provide research on. Some of these topics included the model wrongly learning features that were not relevant to actual musical notes but rather learning features such as reverb which made it seem as if the music was more rich than reality.
R: As a result, I was eventually able to succesfully strike up 3 industrial collaboration projects which we were able to finish succesfully. 









## Learn and Be Curious
Q. Tell me about a time when you took on a new skill (proactively).
S: I had to take on a new skill proactively when I was responsible for the cloud and back end role during a project in which we had to classify cans through the use of computer vision so that the resulting class could be read out loud for blind people. 
T: My task was to had to effectively send images to the GCP server and receive the classification results. Prior to this project, I had no experience with cloud computing in general. Classification in general would already take a lot of time, so it was essential that the backend could be able to take a lot of traffic and be resilient for the success of the project. 
A: Initially, I started creating the product using RESTful APIs. However, I soon realized that REST’s unidirectional design and 1 request to 1 response system was not good enough, as we initially aimed to make our service to classify cans through video in real time, requiring high performance and low latency. Since we were going to use video streaming, we also required the system to be bidirectional as we needed to receive responses while simultaneously sending a video stream of data. To this end, I had to research which methods could solve these problems and became aware about gRPC. This was the first time I had ever heard about gRPC and Protobufs in general. To be able to learn about gRPC better, I created and led a study group about the topic with weekly sessions during a semester while developing a solution for our project. 
R: By doing so, I was able to improve the transmission time that previously was taking much longer since it was based on json into protobuf. The reason why the performance increased was since json is a text-based highly verbose and thus heavy data type. Meanwhile, protobufs are based in binary which made the data much lighter in general. 

## Dive Deep
Q. Give me an example of when you used data to make a decision/solve a problem.
S: A problem that several companies and individuals face when they try to register patents is that the entire process is often very exhausting and difficult, having to search an enormous amount of patents to check if their product actual contributes anything new over the preexisting products. 
T: To solve this problem, I thought that there must be an easy way of using all the existing patent data. If it were possible to cross-check one’s current patent against all the preexisting patents, then it would naturally follow that it would save huge amounts of resources and time for companies and individuals. This not only had large implications monetarily, but also in business impact as companies would be able to focus on which products to make and which to improve upon without wasting time comparing patents.
A: In order to solve this problem, I had to crawl over 400 thousand patents from the Korean Patent Office. To do so, I initially attempted to use Selenium to open and view every single patent page. However, after a few days, I realized that this was not fast enough given the incredibly large amount of patent text data that I had to collect. Due to this, I quickly improved upon this method and discovered that I could request GET methods for patent data using URL placeholders with the patent IDS. As such, I was able to quickly gather all 400 thousand patents’ data. Another problem that I faced was that over 100 thousand of the 400 thousand patents were written in other languages such as Japanese, Chinese, or European languages. In order to be able to properly compare these languages, I had to translate these patents into english. However, most translating APIs were very expensive despite having many mistranslations in more professional settings and vocabulary and as such I had to use GPT’s API to preserve the context and meaning of the patent as much as possible.
R: By doing this, I was able to provide features that greatly facilitated the production of patents by cross-comparing the information of our prototype patent idea with the preexisting 400 thousand patents from over 200 categories. Additionaly, we also developed features in which the service would write a basic rough draft of the patent based on a simple idea and sketch of the product as well a feature that would search relevant news and papers from Naver News and DBPia.


## Deliver Results
Q. Describe a time where you delivered a project under tight deadlines OR a time where you faced obstacles in achieving a goal.
S: There was a occasion when we were developing an application for real time subway tracking with four team members. The deadline was very tight, being just over a month.
T: My task was developing not only the backend for the application but also creating the frontend of the web application.
A: This was very tough for me since I had never experienced frontend before and I was the only member in the team that had any sort of experience with writing production code in the team, as the other 3 members’ expertise was with AI. I had to work on the project every single day, studying whilst studying. It became very important for me to be able to deliver results as the AI team faced problems right before the deadline which meant that we might be unable to showcase a key feature of our service, and as such, the other features needed to be much more complete. My performance was directly related to the success of our project and we were working in a very intense and tight deadline. I was barely able to sleep the last few days before the deadline, working while eating even right before the presentation.
R: Thankfully, we were able to showcase the application succesfully, as I was able to develop a solution that showed the real-time crowdiness of the subways as well as the expected crowdiness of the subways based on an estimate based on the past years’ data. Despite the fact that things didn’t work the way we expected throughout the project I was able to finish it on time. 

## Bias for Action
Q. Tell me about a time you took a risk. What kind of risk was it?
S: I had to take several risks when I became president of the Yonsei Big Data Academic Club (YBIGTA). YBIGTA, being founded in 2012, is South Korea’s first Universitary club focused on reaserching topics related to Big Data. It is comprised of three teams: the Data Analytics, Data Science, and Data Engineering team. Each team is composed of approximately 10-25 members with approximately 60 members total.
T: I had to make sure that all teams were satisfied with their roles as well as ensuring that all members of the club were satisfied with the club activities. I also had to ensure that our group wasn’t remaining stagnant and teaching outdated topics and sharing irrelevant information. This was important for both the future of the club as well as for the present and past members since the club has a very long history, as it was founded in 2012. This was very urgent, as the amount of applicants for our group was decreasing annually, and we had to ensure that our new members learn relevant information.
A: In order to ensure the competency of our group, I took several calculated risks and started several initiatives that we had never done before. The major initiatives that I pushed for were as follows. First, I started the first ever industrial collaboration projects in the club. The reason why I aimed to create such projects was to ensure that our members were able to perform a higher level of professionality in their work similar to that actually used in the workplace, achieve more business impactful results, ensure that the work done goes beyond the scope of a one-time toy project, and be able to improve the legacy and quality of YBIGTA.
To determine which companies to contact, I analyzed which companies were most likely to do projects with us. To this end, I reasoned that companies in which past club members are employed or companies that have previous experienced industrial-academic collaboration projects were most likely to collaborate with us. 
To this end, I had to create promotional material showcasing our capabilities, send cold-mails to 44 companies, from which I was able to arrange meetings with 16 companies and eventually establishing 3 industrial collaboration projects. I had to work with a very tight schedule, having to attend meetings daily during exams week so that we were able to start the projects as soon as possible.
R: By doing so, we were able to succesfully finish YBIGTA’s first ever industrial collaboration projects. We were able to provide several succesful results for each of our projects. In the first project which we led with a Medical Information Corporation, we were able the readability of a feature for their application in which potential medical side effects of medication would appear as huge paragraphs and garbled text. In another project we were able to conduct research on Image Generation, eventually continuing the project up to another year and submitting the research paper to CVPR. Additionally, we were able to provide insight to another company by conducting research on Hierarchical Text Classification. 


## Earn Trust
Q. Describe a time where you helped a struggling team member OR have received feedback from others.
S: When I was leading a group of 10 members for our team project: Highlighter.
T: I had to ensure that everyone would be able to contribute to the project while doing things they enjoyed and wanted to learn.
A: To do so, I conducted several 1on1 meetings with each of the team members apart from the regular meetings to learn what they wanted to do and how they were doing. This was to make sure that no one felt they were working alone or struggling for too long before getting help. This in turn also helped everyone so that they could get assistance if they were struggling too much, or restructure tasks so that they were more reflective of the difficulty.
R: Due to this, we were able to succesfully finish the project and create a pipeline that 1) fetched real time video and chatting traffic data, 2) gather it using Kafka Streams and create a Kafka application that would return timestamps for traffic spikes, 3) cut the relevant part of the live stream based on the context-relevant dialogue 4) and upload it automatically to youtube. By doing so, not only were we able to sucessfully finish the project, but all 10 team members were able to learn a lot and were satisfied with their and everyone else’s contributions to the project.