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

9. Get the list of nodes in JSON format and store it in a file at /opt/outputs/nodes-z3444kd9.json.

`kubectl get nodes -o json > /opt/outputs/nodes-z3444kd9.json`

10. Create a service messaging-service to expose the messaging application within the cluster on port 6379.

`kubectl expose pod messaging --port=6379 --name=messaging-service`

11. Create a deployment named hr-web-app using the image kodekloud/webapp-color with 2 replicas.

`kubectl create deployment hr-web-app --image=kodekloud/webapp-color --replicas=2`

12. Create a static pod named static-busybox on the controlplane node that uses the busybox image and the command sleep 1000.

`grep -i staticPodPath /var/lib/kubelet/config.yaml`로 static pod의 경로를 찾아서 그 경로에 pod를 만들면 된다.
`vim /etc/kubernetes/manifests/static-busybox.yaml`로 만들어서 아래 내용을 넣어주면 된다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: static-busybox
spec:
  containers:
  - name: static-busybox
    image: busybox
    command: ["sleep", "1000"]
```


## 마무리  
- 3번은 create service를 하는게 아니라 expose라는걸 써서 헷갈린다.
- ClusterIP가 default값이라서 생략해도 되는것 같다.
- 같은 이름의 pod와 service를 만들때는 `kubectl run`으로 pod를 만들고 `--expose`로 service를 만들면 된다.
