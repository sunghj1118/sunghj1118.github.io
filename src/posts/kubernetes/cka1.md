---
title: "1차 모의고사 기출문제"
date: "2024-09-12"
description: "1차 모의고사 기출문제"
tags: ["Infra", "Kubernetes"]
---

# 1차 모의고사 기출문제

1. Deploy a pod named nginx-pod using the nginx:alpine image.

`kubectl run nginx-pod --image=nginx:alpine`

2. Deploy a redis pod using the redis:alpine image with the labels set to tier=db.

`kubectl run redis --image=redis:alpine --labels=tier=db`

3. Create a service redis-service to expose the redis application within the cluster on port 6379.

`kubectl expose pod redis --port=6379 --name=redis-service`

4. Create a deployment named webapp using the image kodekloud/webapp-color with 3 replicas.

`kubectl create deployment webapp --image=kodekloud/webapp-color --replicas=3`

5. Create a new pod called custom-nginx using the nginx image and run it on container port 8080.

`kubectl run custom-nginx --image=nginx --port=8080`

6. Create a new namespace called dev-ns.

`kubectl create namespace dev-ns`

7. Create a new deployment called redis-deploy in the dev-ns namespace with the redis image. It should have 2 replicas.

`kubectl create deployment redis-deploy --image=redis --replicas=2 -n dev-ns`

이때, 일반적인 `kubectl get deployments`로 하면 방금 생성한 deployment가 안보인다. 이때는 namespace를 다음과 같이 지정해주면 된다: `kubectl get deployments -n dev-ns`

8. Create a pod called httpd using the image httpd:alpine in the default namespace. Next, create a service of type ClusterIP by the same name (httpd). The target port for the service should be 80.

`kubectl run httpd --image=httpd:alpine`
`kubectl expose pod httpd --port=80 --type=ClusterIP --name=httpd`

이렇게 했는데, 보니까 `kubectl run httpd --image=httpd:alpine --port=80 --expose`로 한번에 할 수 있었다. 보니까 ClusterIP가 default값이라서 생략해도 되는것 같다.



## 마무리  
- 3번은 create service를 하는게 아니라 expose라는걸 써서 헷갈린다.
- ClusterIP가 default값이라서 생략해도 되는것 같다.
- 같은 이름의 pod와 service를 만들때는 `kubectl run`으로 pod를 만들고 `--expose`로 service를 만들면 된다.
