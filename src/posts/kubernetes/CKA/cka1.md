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

13. Create a POD in the finance namespace named temp-bus with the image redis:alpine.   
`kubectl run temp-bus --image=redis:alpine --namespace=finance`

14. A new application orange is deployed. There is something wrong with it. Identify and fix the issue.   

yaml 파일 다시 수정. CKA 준비 1일차에 더 자세히 적어놓았다.

15. Expose the hr-web-app created in the previous task as a service named hr-web-app-service, accessible on port 30082 on the nodes of the cluster.
The web application listens on port 8080.   

hr-web-app이라는 이름을 갖고 있는 NodePort 서비스를 만들고, 8080에 노출한다.
`kubectl expose deployment hr-web-app --name=hr-web-app-service --type=NodePort --port=8080`

`kubectl edit service hr-web-app-service`에 들어가서 nodePort를 수정한다.

```yaml
  ports:
  - nodePort: 31718
    port: 8080
    protocol: TCP
    targetPort: 8080
  - nodePort: 30082
    port: 8080
    protocol: TCP
    targetPort: 8080
```

16. Use JSON PATH query to retrieve the osImages of all the nodes and store it in a file /opt/outputs/nodes_os_x43kj56.txt.
The osImage are under the nodeInfo section under status of each node.   

`kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}' > /opt/outputs/nodes_os_x43kj56.txt`
- `kubectl get nodes`로 노드 정보를 가져온다.
- `-o jsonpath`로 jsonpath를 사용한다.
- `{.items[*].status.nodeInfo.osImage}`로 osImage를 가져온다.
  - `items[*]`로 모든 노드를 가져온다.
  - `status.nodeInfo.osImage`로 osImage를 가져온다.

17. Create a Persistent Volume with the given specification: -  
Volume name: pv-analytics  
Storage: 100Mi  
Access mode: ReadWriteMany  
Host path: /pv/data-analytics  


```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-analytics
spec:
  capacity:
    storage: 100Mi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: "/pv/data-analytics"
```

`kubectl apply -f pv.yaml`로 만들어준다.


## 마무리  
- 3번은 create service를 하는게 아니라 expose라는걸 써서 헷갈린다.
- ClusterIP가 default값이라서 생략해도 되는것 같다.
- 같은 이름의 pod와 service를 만들때는 `kubectl run`으로 pod를 만들고 `--expose`로 service를 만들면 된다.
