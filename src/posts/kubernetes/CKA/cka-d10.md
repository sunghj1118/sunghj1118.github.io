---
title: "CKA 시험 준비 D10"
date: "2024-11-12"
description: "11월 내로 시험을 보기 위한 CKA 준비 D10"
tags: ["Infra", "Kubernetes"]
---

# CKA 시험 준비 D-10
두번째 모의고사를 풀면서 회고를 해보려 한다.


## 복기
1. etcd 클러스터 백업을 /opt/etcd-backup.db에 저장하라.

```bash
export ETCDCTL_API=3
etcdctl snapshot save /opt/etcd-backup.db
```

이렇게만 하면 다음 오류가 뜬다.
`Error: rpc error: code = Unavailable desc = transport is closing`

이유는 etcdctl을 실행할 때, etcd 서버의 endpoint를 지정해주지 않아서 그렇다.
즉, etcd 서버의 endpoint를 지정해주어야 한다.

```bash
ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \ 
--cert=/etc/kubernetes/pki/etcd/server.crt \ 
--key=/etc/kubernetes/pki/etcd/server.key \ 
snapshot save /opt/etcd-backup.db
```

이때, \는 가독성을 위해 쓰인것이며, 실제 명령어를 실행할 때는 제거해야 한다.



2. Create a Pod called redis-storage with image: redis:alpine with a Volume of type emptyDir that lasts for the life of the Pod.
- Pod named 'redis-storage' created
- Pod 'redis-storage' uses Volume type of emptyDir
- Pod 'redis-storage' uses volumeMount with mountPath = /data/redis

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis-storage
spec:
  container:
  - name: redis-storage-container
    image: redis:alpine
    volumeMounts:
      - mountPath: /data/redis
        name: redis-volume
  volumes:
  - name: redis-volume
    emptyDir:
      sizeLimit: 500Mi
```

3. Create a new pod called super-user-pod with image busybox:1.28. Allow the pod to be able to set system_time.
- Pod: super-user-pod
- Container Image: busybox:1.28
- Is SYS_TIME capability set for the container?

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: super-user-pod
spec:
  containers:
  - name: super-user-container
    image: busybox:1.28
    securityContext:
      capabilities:
        add: ["SYS_TIME"]
    command: ["sleep", "4800"]
```

command는 복수형 commands가 아닌 command이다.

4. A pod definition file is created at /root/CKA/use-pv.yaml. Make use of this manifest file and mount the persistent volume called pv-1. Ensure the pod is running and the PV is bound.
- mountPath: /data
- persistentVolumeClaim Name: my-pvc

step 1: PV 생성
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

step 2: Pod yaml 파일이 PVC를 사용하도록 수정
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
    - mountPath: /data
      name: mypv
  volumes:
  - name: mypv
    persistentVolumeClaim:
      claimName: my-pvc
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

- volumeMounts와 volumes를 사용하여 PVC를 사용하도록 설정한다.


2차 모의고사 처음으로 다 풀었다. 생각보다 더 어려웠다. D10이 남은만큼 이제 실제 출제된 문제들 위주로도 조금씩 외워야겠다.