---
title: "3차 모의고사 기출문제"
date: "2024-11-18"
description: "3차 모의고사 기출문제"
tags: ["Infra", "Kubernetes"]
---

# 2차 모의고사 기출문제

1. Create a new service account with the name pvviewer. Grant this Service account access to list all PersistentVolumes in the cluster by creating an appropriate cluster role called pvviewer-role and ClusterRoleBinding called pvviewer-role-binding.
Next, create a pod called pvviewer with the image: redis and serviceAccount: pvviewer in the default namespace.


2. List the InternalIP of all nodes of the cluster. Save the result to a file /root/CKA/node_ips.

Answer should be in the format: InternalIP of controlplane<space>InternalIP of node01 (in a single line)


3. Create a pod called multi-pod with two containers.
Container 1: name: alpha, image: nginx
Container 2: name: beta, image: busybox, command: sleep 4800

Environment Variables:
container 1:
name: alpha

Container 2:
name: beta

```yaml
---
apiVersion: v1
kind: Pod
metadata:
  name: multi-pod
spec:
  containers:
  - image: nginx
    name: alpha
    env:
    - name: name
      value: alpha
  - image: busybox
    name: beta
    command: ["sleep", "4800"]
    env:
    - name: name
      value: beta
```

4. Create a Pod called non-root-pod , image: redis:alpine  

- runAsUser: 1000  
- fsGroup: 2000  

5. We have deployed a new pod called np-test-1 and a service called np-test-service. Incoming connections to this service are not working. Troubleshoot and fix it.
Create NetworkPolicy, by the name ingress-to-nptest that allows incoming connections to the service over port 80.

Important: Don't delete any current objects deployed.

```yaml
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ingress-to-nptest
  namespace: default
spec:
  podSelector:
    matchLabels:
      run: np-test-1
  policyTypes:
  - Ingress
  ingress:
  - ports:
    - protocol: TCP
      port: 80
```

6. Taint the worker node node01 to be Unschedulable. Once done, create a pod called dev-redis, image redis:alpine, to ensure workloads are not scheduled to this worker node. Finally, create a new pod called prod-redis and image: redis:alpine with toleration to be scheduled on node01.

- key: env_type, value: production, operator: Equal and effect: NoSchedule

7. Create a pod called hr-pod in hr namespace belonging to the production environment and frontend tier .
image: redis:alpine

Use appropriate labels and create all the required objects if it does not exist in the system already.

- `kubectl create namespace hr`  
- `kubectl run hr-pod --image=redis:alpine --namespace=hr --labels=environment=production,tier=frontend`  


8. A kubeconfig file called super.kubeconfig has been created under /root/CKA. There is something wrong with the configuration. Troubleshoot and fix it.

Verify host and port for kube-apiserver are correct.

Open the super.kubeconfig in vi editor.

Change the 9999 port to 6443 and run the below command to verify:

`kubectl cluster-info --kubeconfig=/root/CKA/super.kubeconfig`


9. We have created a new deployment called nginx-deploy. scale the deployment to 3 replicas. Has the replica's increased? Troubleshoot the issue and fix it.

Use the command kubectl scale to increase the replica count to 3.

`kubectl scale deploy nginx-deploy --replicas=3`

The controller-manager is responsible for scaling up pods of a replicaset. If you inspect the control plane components in the kube-system namespace, you will see that the controller-manager is not running.

`kubectl get pods -n kube-system`

The command running inside the controller-manager pod is incorrect.
After fix all the values in the file and wait for controller-manager pod to restart.

Alternatively, you can run sed command to change all values at once:

`sed -i 's/kube-contro1ler-manager/kube-controller-manager/g' /etc/kubernetes/manifests/kube-controller-manager.yaml`

This will fix the issues in controller-manager yaml file.

At last, inspect the deployment by using below command:

`kubectl get deploy`


## 마무리  

시간도 부족하고 푸는 순서에 익숙해져야겠다. 이외에도 아직도 어려운 NetworkPolicy와 Taint, Tolerations, Jsonpath에 대해서는 각별히 더 주의해야겠다.