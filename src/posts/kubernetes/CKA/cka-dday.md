---
title: "CKA 시험 준비 D-day"
date: "2024-11-22"
description: "CKA 후기"
tags: ["Infra", "Kubernetes"]
---

# CKA 시험 준비 D-day

망한것 같다. 일단 CKA는 주말이 아닌 이상 새벽에만 응시가 가능해서 새벽 3시에 끔찍한 악몽을 꾸고 기상했다.  
시험 시작 전 환경을 확인한다고 하여 5시 30분부터 들어갔으나 생각보다 설치하고, 방을 다 보여주는데 시간이 오래 걸렸다.  
6시 30분이 되어서야 시작할 수 있었으며 생각보다 엄격하게 시험 환경 검사를 한다.


시험이 시작하면 PSI라는 프로그램 속에서 원격으로 다른 VM에 접속하여 시험을 볼 수 있다. 이때, 터미널에 직접 들어가서 모든 명령어를 수행하면서 시험이 진행된다.

여기서 주의해야 할 점은 linux 기반 firefox 브라우저가 제공되어서 복붙이 cmd로는 되지 않으며 `ctrl+shift+v`로 복붙을 해야 하고, 복사 단축키는 결국에 못 찾았다. 또한, vim 편집기 단축어도 달랐으며, cmd+F로 검색을 할 수 없는게 시간을 많이 잡아먹었다.

17문제 중에 족보랑 유사하게 나왔음에도 불구하고 시간이 부족했으며 마지막 15, 16, 17 문제는 건들지도 못했다.

17 문제 중에 최소 66%를 받아야 통과이기 때문에 최소한 내가 푼 14문제 중 12문제를 맞춰야 한다는 뜻인데 어렵지 않을까 싶다.

너무 아쉽지만 재응시가 한번 더 있기 때문에 다음에는 더 잘 준비해서 응시해야겠다.

# 출제 문제

1. Task -
Create a new NetworkPolicy named allow-port-from-namespace in the existing namespace fubar.
Ensure that the new NetworkPolicy allows Pods in namespace internal to connect to port 9000 of Pods in namespace fubar.
Further ensure that the new NetworkPolicy:
✑ does not allow access to Pods, which don't listen on port 9000
✑ does not allow access from Pods, which are not in namespace internal

2. Task -  
First, create a snapshot of the existing etcd instance running at https://127.0.0.1:2379, saving the snapshot to /var/lib/backup/etcd-snapshot.db.

The following TLS certificates/key are supplied for connecting to the server with etcdctl :
• CA certificate: /opt/KUIN00601/ca.crt
• Client certificate:
/opt/KUIN00601/etcd-client.crt
• Client key:
/opt/KUIN00601/etcd-client.key

Creating a snapshot of the given instance is expected to complete in seconds.
If the operation seems to hang, something's likely wrong with your command. Use CTRL + c to cancel the operation and try again.

Next, restore an existing, previous snapshot located at /var/lib/backup/etcd-snapshot-previous.db.

3. Task -  
    Set the node named ek8s-node-0 as unavailable and reschedule all the pods running on it.

4. Task -  
Reconfigure the existing deployment front-end and add a port specification named http exposing port 80/tcp of the existing container nginx.
Create a new service named front-end-svc exposing the container port http.
Configure the new service to also expose the individual Pods via a NodePort on the nodes on which they are scheduled.

5. Task -
Reconfigure the existing deployment front-end and add a port specification named http exposing port 80/tcp of the existing container nginx.
Create a new service named front-end-svc exposing the container port http.
Configure the new service to also expose the individual Pods via a NodePort on the nodes on which they are scheduled.

6. Task -
Scale the deployment presentation to 3 pods.

7. Task -
Schedule a pod as follows:
✑ Name: nginx-kusc00401
✑ Image: nginx
✑ Node selector: disk=ssd

8. Task -
Check to see how many nodes are ready (not including nodes tainted NoSchedule) and write the number to /opt/KUSC00402/kusc00402.txt.

9. Task -
Schedule a Pod as follows:
✑ Name: kucc8
✑ App Containers: 2
✑ Container Name/Images:
- nginx
- consul

10. Task -
Create a new nginx Ingress resource as follows:
✑ Name: pong
✑ Namespace: ing-internal
✑ Exposing service hello on path /hello using service port 5678

11. Task -
Monitor the logs of pod foo and:
✑ Extract log lines corresponding to error file-not-found
✑ Write them to /opt/KUTR00101/foo

12.  Context -
An existing Pod needs to be integrated into the Kubernetes built-in logging architecture (e.g. kubectl logs). Adding a streaming sidecar container is a good and common way to accomplish this requirement.

Task -
Add a sidecar container named sidecar, using the busybox image, to the existing Pod big-corp-app. The new sidecar container has to run the following command:

`/bin/sh -c "tail -n+1 -f /var/log/big-corp-app. log"`

Use a Volume, mounted at /var/log, to make the log file big-corp-app.log available to the sidecar container.

`kubectl get pod big-corp-app -o yaml > big-corp-app.yaml`

13. Task -
From the pod label name=overloaded-cpu, find pods running high CPU workloads and write the name of the pod consuming most CPU to the file /opt/
KUTR00401/KUTR00401.txt (which already exists).

14. Create a new PersistentVolumeClaim:
✑ Name: pv-volume
✑ Class: csi-hostpath-sc
✑ Capacity: 10Mi
Create a new Pod which mounts the PersistentVolumeClaim as a volume:
✑ Name: web-server
✑ Image: nginx
✑ Mount path: /usr/share/nginx/html
Configure the new Pod to have ReadWriteOnce access on the volume.
Finally, using kubectl edit or kubectl patch expand the PersistentVolumeClaim to a capacity of 70Mi and record that change.

15.   Context -  
    You have been asked to create a new ClusterRole for a deployment pipeline and bind it to a specific ServiceAccount scoped to a specific namespace.

    Task -   
    Create a new ClusterRole named deployment-clusterrole, which only allows to create the following resource types:
    ✑ Deployment
    ✑ Stateful Set
    ✑ DaemonSet

    Create a new ServiceAccount named cicd-token in the existing namespace app-team1.
    
    Bind the new ClusterRole deployment-clusterrole to the new ServiceAccount cicd-token, limited to the namespace app-team1.

16. Task -
A Kubernetes worker node, named wk8s-node-0 is in state NotReady.
Investigate why this is the case, and perform any appropriate steps to bring the node to a Ready state, ensuring that any changes are made permanent.

17.    Task -  
Given an existing Kubernetes cluster running version 1.22.1, upgrade all of the Kubernetes control plane and node components on the master node only to version 1.22.2.  
Be sure to drain the master node before upgrading it and uncordon it after the upgrade.


# 복기
sidecar, ingress, systemctl이 특히나 어려웠다. 아마 이 문제들을 틀리지 않았을까 싶다.