---
title: "CKA 시험 준비 2일차"
date: "2024-10-29"
description: "11월 내로 시험을 보기 위한 CKA 준비 2일차"
tags: ["Infra", "Kubernetes"]
---

# CKA 시험 준비 2일차
오늘은 어제 풀었던 모의고사를 다시 한번 풀어보면서 복습해보려 한다. 이렇게 해서 간단한 질문들은 그래도 빠르게 풀 수 있게 연습해보려 한다.


## 오늘의 풀이
1. Create a static pod named static-busybox on the controlplane node that uses the busybox image and the command sleep 1000.

Name: static-busybox
Image: busybox

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: static-busybox
spec:
  containers:
  - name: busybox
    image: busybox:1.28
    args:
    - sleep
    - "1000"
```

`kubectl apply -f static-busybox.yaml`

- https://kubernetes.io/docs/reference/kubectl/quick-reference/


2. Create a POD in the finance namespace named temp-bus with the image redis:alpine.

`kubectl run temp-bus --image=redis:alpine -n finance`

3. A new application orange is deployed. There is something wrong with it. Identify and fix the issue.

어제 틀렸던 문제다. 보니까 무슨 temp에 저장된걸 적용시켜야 했던데. edit 써서 tmp 생성까진 기억나는데 다음이 기억이 안난다. documentation에도 못 찾겠다.

어제 답을 보니까 `replace`를 써야한다. `kubectl replace -f /tmp/kubectl-edit-xxxx.yaml --force`

4. Expose the hr-web-app created in the previous task as a service named hr-web-app-service, accessible on port 30082 on the nodes of the cluster.  
The web application listens on port 8080.

    Name: hr-web-app-service  
    Type: NodePort  
    Endpoints: 2  
    Port: 8080  
    NodePort: 30082  

아 이건 알았는데 기억이 안난다.

`kubectl expose deployment hr-web-app --name=hr-web-app-service --type=NodePort --port=8080`

`kubectl edit svc hr-web-app-service`

5. Use JSON PATH query to retrieve the osImages of all the nodes and store it in a file /opt/outputs/nodes_os_x43kj56.txt.  
The osImage are under the nodeInfo section under status of each node.

이건 json query 문법이 자세히 기억이 안난다. nodes 아래 어디에 있더라..

`kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}' > /opt/outputs/nodes_os_x43kj56.txt`

- https://kubernetes.io/docs/reference/kubectl/jsonpath/

이건 연습 좀 해야겠다. 봐도 잘 모르겠다.

6. Create a Persistent Volume with the given specification:    


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

## 복기
static-busybox 틀렸다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: static-busybox
spec:
  containers:
  - name: busybox
    image: busybox:1.28
    args:
    - sleep
    - "1000"               
```

답은 이거였다.
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