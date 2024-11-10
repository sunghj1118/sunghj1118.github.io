---
title: "2차 모의고사 기출문제"
date: "2024-11-10"
description: "2차 모의고사 기출문제"
tags: ["Infra", "Kubernetes"]
---

# 2차 모의고사 기출문제

1. Take a backup of the etcd cluster and save it to /opt/etcd-backup.db.

`export ETCDCTL_API=3`
`etcdctl snapshot save /opt/etcd-backup.db`


2. Create a Pod called redis-storage with image: redis:alpine with a Volume of type emptyDir that lasts for the life of the Pod.  
Specs on the below.  
- Pod named 'redis-storage' created  
- Pod 'redis-storage' uses Volume type of emptyDir  
- Pod 'redis-storage' uses volumeMount with mountPath = /data/redis  

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis-storage
spec:
  containers:
  - name: redis-storage
    image: redis:alpine
    volumeMounts:
      - mountPath: /data/redis
        name: redis-storage-volume
  volumes:
  - name: redis-storage-volume
    emptyDir: {}
```

3. Create a new pod called super-user-pod with image busybox:1.28. Allow the pod to be able to set system_time.  

The container should sleep for 4800 seconds.  
Pod: super-user-pod  
Container Image: busybox:1.28  
Is SYS_TIME capability set for the container?  


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: super-user-pod
spec:
  containers:
  - name: super-user-container
    image: busybox:1.28
    command: ["sleep", "4800"]
    securityContext:
      capabilities:
        add: ["SYS_TIME"]
```

4. A pod definition file is created at /root/CKA/use-pv.yaml. Make use of this manifest file and mount the persistent volume called pv-1. Ensure the pod is running and the PV is bound.   

mountPath: /data   
persistentVolumeClaim Name: my-pvc   
persistentVolume Claim configured correctly   
pod using the correct mountPath   
pod using the persistent volume claim?   


step1: create PVC to bind with PV

`vim pvc.yaml`

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 10Mi
```

`kubectl apply -f pvc.yaml`

step2: edit existing pod yaml file to use PVC

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: use-pv
  name: use-pv
spec:
  containers:
  - image: nginx
    name: use-pv
    resources: {}
    volumeMounts:
    - mountPath: "/data"
      name: mypd
  volumes:
  - name: mypd
    persistentVolumeClaim:
      claimName: my-pvc
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

`kubectl apply -f /root/CKA/use-pv.yaml`

`kubectl get pvc my-pvc`

`kubectl get pod use-pv`



## 마무리  
- 3번은 create service를 하는게 아니라 expose라는걸 써서 헷갈린다.
- ClusterIP가 default값이라서 생략해도 되는것 같다.
- 같은 이름의 pod와 service를 만들때는 `kubectl run`으로 pod를 만들고 `--expose`로 service를 만들면 된다.
