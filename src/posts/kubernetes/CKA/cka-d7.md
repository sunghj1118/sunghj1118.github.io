---
title: "CKA 시험 준비 D7"
date: "2024-11-15"
description: "11월 내로 시험을 보기 위한 CKA 준비 D7"
tags: ["Infra", "Kubernetes"]
---

# CKA 시험 준비 D-7
두번째 모의고사를 풀면서 회고를 해보려 한다.

## 복기
1. Create a namespace called 'development' and a pod with image nginx called nginx on this namespace.

`kubectl create namespace development`  
`kubectl run nginx --image=nginx -n development`

2. Create a nginx pod with label env=test in engineering namespace See the solution below.

`kubectl run nginx --image=nginx -n engineering --labels=env=test`

3. Get list of all pods in all namespaces and write it to file "/opt/pods-list.yaml"

`kubectl get pods --all-namespaces -o yaml > /opt/pod-list.yaml`

4. Create a pod with image nginx called nginx and allow traffic on port 80

`kubectl run nginx --image=nginx --port=80`

5. Create a busybox pod that runs the command "env" and save the output to "envpod" file

`kubectl run busybox --image=busybox --restart=Never -rm -it -- env > envpod`

## ITEXAMS - CKA questions
1. Create a new ClusterRole named deployment-clusterrole, which only allows to create the following resource types:  
✑ Deployment  
✑ Stateful Set  
✑ DaemonSet  
Create a new ServiceAccount named cicd-token in the existing namespace app-team1.  
Bind the new ClusterRole deployment-clusterrole to the new ServiceAccount cicd-token, limited to the namespace app-team1.
2. Set the node named ek8s-node-0 as unavailable and reschedule all the pods running on it.
3. Given an existing Kubernetes cluster running version 1.22.1, upgrade all of the Kubernetes control plane and node components on the master node only to version 1.22.2.
Be sure to drain the master node before upgrading it and uncordon it after the upgrade.
4. First, create a snapshot of the existing etcd instance running at https://127.0.0.1:2379, saving the snapshot to /var/lib/backup/etcd-snapshot.db.
Next, restore an existing, previous snapshot located at /var/lib/backup/etcd-snapshot-previous.db.
5. Create a new NetworkPolicy named allow-port-from-namespace in the existing namespace fubar.
Ensure that the new NetworkPolicy allows Pods in namespace internal to connect to port 9000 of Pods in namespace fubar.  
Further ensure that the new NetworkPolicy:  
✑ does not allow access to Pods, which don't listen on port 9000  
✑ does not allow access from Pods, which are not in namespace internal
6. Reconfigure the existing deployment front-end and add a port specification named http exposing port 80/tcp of the existing container nginx.  
Create a new service named front-end-svc exposing the container port http.  
Configure the new service to also expose the individual Pods via a NodePort on the nodes on which they are scheduled.
7. Scale the deployment presentation to 3 pods.
8. Schedule a pod as follows:  
✑ Name: nginx-kusc00401  
✑ Image: nginx  
✑ Node selector: disk=ssd  
9. Check to see how many nodes are ready (not including nodes tainted NoSchedule) and write the number to /opt/KUSC00402/kusc00402.txt.
10. Schedule a Pod as follows:  
✑ Name: kucc8  
✑ App Containers: 2  
✑ Container Name/Images:  
- nginx  
- consul  
11. Create a persistent volume with name app-data, of capacity 2Gi and access mode ReadOnlyMany. The type of volume is hostPath and its location is /srv/app- data.
12. Monitor the logs of pod foo and:  
✑ Extract log lines corresponding to error file-not-found  
✑ Write them to /opt/KUTR00101/foo  
13. Add a sidecar container named sidecar, using the busybox image, to the existing Pod big-corp-app. The new sidecar container has to run the following command:  
`/bin/sh -c "tail -n+1 -f /var/log/big-corp-app.log"`  
Use a Volume, mounted at /var/log, to make the log file big-corp-app.log available to the sidecar container.
14. From the pod label name=overloaded-cpu, find pods running high CPU workloads and write the name of the pod consuming most CPU to the file /opt/KUTR00401/KUTR00401.txt (which already exists).
15. A Kubernetes worker node, named wk8s-node-0 is in state NotReady.  
Investigate why this is the case, and perform any appropriate steps to bring the node to a Ready state, ensuring that any changes are made permanent.
16. Task -
Create a new PersistentVolumeClaim:  
✑ Name: pv-volume  
✑ Class: csi-hostpath-sc  
✑ Capacity: 10Mi  
Create a new Pod which mounts the PersistentVolumeClaim as a volume:  
✑ Name: web-server  
✑ Image: nginx  
✑ Mount path: /usr/share/nginx/html  
Configure the new Pod to have ReadWriteOnce access on the volume.  
Finally, using kubectl edit or kubectl patch expand the PersistentVolumeClaim to a capacity of 70Mi and record that change.
17. Create a new nginx Ingress resource as follows:  
✑ Name: pong  
✑ Namespace: ing-internal  
✑ Exposing service hello on path /hello using service port 5678  
