---
title: "CKA 시험 준비 기출문제"
date: "2024-11-02"
description: "CKA 시험 준비를 위한 기출문제 풀이"
tags: ["Infra", "Kubernetes"]
---

# CKA 기출문제 회독

CKA는 기출문제가 많이 공개되고, 또 재출제율이 매우 높은 시험으로 알고 있다. 그래서 이번 기회에는 한번 기출문제들을 한번 씩 읽어보고 받아 쳐보고 공부해보려 한다.


## Exam Topics 기출문제

https://www.examtopics.com/exams/cncf/cka/view/

**Question #1**

    Context -  
    You have been asked to create a new ClusterRole for a deployment pipeline and bind it to a specific ServiceAccount scoped to a specific namespace.

    Task -   
    Create a new ClusterRole named deployment-clusterrole, which only allows to create the following resource types:
    ✑ Deployment
    ✑ Stateful Set
    ✑ DaemonSet

    Create a new ServiceAccount named cicd-token in the existing namespace app-team1.
    
    Bind the new ClusterRole deployment-clusterrole to the new ServiceAccount cicd-token, limited to the namespace app-team1.

`kubectl config use-context k8s`  

`kubectl create clusterrole deployment-clusterrole --verb=create --resource=Deployment,StatefulSet,DaemonSet`  

`kubectl create sa cicd-token -n app-team1`

`kubectl create clusterrolebinding deploy-b --clusterrole=deployment-clusterrole --serviceaccount=app-team1:cicd-token`

(오늘 공교롭게도 스터디에서 나온 주제다. 클러스터롤, 클러스터 롤 바인딩, 그리고 SA)


**Question #2**  
    Task -  
    Set the node named ek8s-node-0 as unavailable and reschedule all the pods running on it.

`kubectl config use-context ek8s`

`kubectl get nodes`

`kubectl drain ek8s-node-1 --ignore-daemonsets`  
- 이때 사용되는 `drain` 명령어는 해당 노드를 비활성화하고, 해당 노드에 있는 모든 파드를 다른 노드로 이동시킨다. `--ignore-daemonsets` 옵션을 사용하면 데몬셋을 무시하고 파드를 이동시킨다.

`kubectl drain ek8s-node-1 --ignore-daemonsets --delete-emptydir-data`
- `--delete-emptydir-data` 옵션을 사용하면 노드를 비활성화하기 전에 해당 노드의 emptyDir 볼륨을 삭제한다.

`kubectl get nodes`

(문제에서는 ek8s-node-0를 비활성화하라고 했지만, 사진에서는 왜 ek8s-node-1을 비활성화했는지 모르겠다.)

**Question #3**  
    Task -  
    Given an existing Kubernetes cluster running version 1.22.1, upgrade all of the Kubernetes control plane and node components on the master node only to version 1.22.2.  
    Be sure to drain the master node before upgrading it and uncordon it after the upgrade.

`kubectl config use-context mk8s`  

`kubectl get nodes`  

`kubectl drain mk8s-master-0 --ignore-daemonsets`  
- cordoned 뜻은 노드에 파드가 스케줄링 되지 않도록 하는 것이고, drain은 노드에 있는 파드를 다른 노드로 이동시키는 것이다.

`ssh mk8s-master-0`

`sudo -i`
- 이때 -i 옵션의 뜻은 root로 로그인하라는 뜻이다.

`apt install kubeadm=1.22.2-00 kubelet=1.22.2-00`

`kubeadm upgrade apply v1.22.2`

`systemctl restart kubelet`

`exit`
- root에서 나가기

`exit`
- ssh에서 나가기

`kubectl uncordon mk8s-master-0`
- uncordon은 노드에 파드가 다시 스케줄링 되도록 하는 것이다.

`kubectl get nodes`
- 마스터 노드가 다시 정상적으로 작동하는지 확인한다.