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

`kubectl drain ek8s-node-0 --ignore-daemonsets`  
- 이때 사용되는 `drain` 명령어는 해당 노드를 비활성화하고, 해당 노드에 있는 모든 파드를 다른 노드로 이동시킨다. `--ignore-daemonsets` 옵션을 사용하면 데몬셋을 무시하고 파드를 이동시킨다.

`kubectl drain ek8s-node-0 --ignore-daemonsets --delete-emptydir-data`
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


4. Task -
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

```bash
ETCDCTL_API=3 etcdctl snapshot save /var/lib/backup/etcd-snapshot.db \
--endpoints=https://127.0.0.1:2379 \
--cacert=/opt/KUIN00601/ca.crt \
--cert=/opt/KUIN00601/etcd-client.crt \
--key=/opt/KUIN00601/etcd-client.key
```

`ETCDCTL_API=3 etcdctl snapshot restore /var/lib/backup/etcd-snapshot-previous.db --data-dir /var/lib/etcd-restored`

5. Task -
Create a new NetworkPolicy named allow-port-from-namespace in the existing namespace fubar.
Ensure that the new NetworkPolicy allows Pods in namespace internal to connect to port 9000 of Pods in namespace fubar.
Further ensure that the new NetworkPolicy:
✑ does not allow access to Pods, which don't listen on port 9000
✑ does not allow access from Pods, which are not in namespace internal

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-port-from-namespace
  namespace: fubar
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: internal
    ports:
    - protocol: TCP
      port: 9000
```

6. Task -
Reconfigure the existing deployment front-end and add a port specification named http exposing port 80/tcp of the existing container nginx.
Create a new service named front-end-svc exposing the container port http.
Configure the new service to also expose the individual Pods via a NodePort on the nodes on which they are scheduled.

- add a port specification named http exposing port 80/tcp of the existing container nginx.
```yaml
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
      name: http
```

- create a new service named front-end-svc exposing the container port http.
```bash
kubectl expose deployment front-end --name=front-end-svc --port=80 --target-port=http --type=NodePort
```

7. Task -
Scale the deployment presentation to 3 pods.

`kubectl scale deployment presentation --replicas=3`


8. Task -
Schedule a pod as follows:
✑ Name: nginx-kusc00401
✑ Image: nginx
✑ Node selector: disk=ssd

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-kusc00401
spec:
  nodeSelector:
    disk: ssd
  containers:
  - name: nginx
    image: nginx
```


9. Task -
Check to see how many nodes are ready (not including nodes tainted NoSchedule) and write the number to /opt/KUSC00402/kusc00402.txt.


`kubectl get nodes -o jsonpath='{.items[?(@.spec.taints[?(@.effect=="NoSchedule") == null])].status.conditions[?(@.type=="Ready")].status}' | grep True | wc -l > /opt/KUSC00402/kusc00402.txt`

or easy way:

`k get nodes`   
`echo '2' > /opt/KUSC00402/kusc00402.txt`  

10. Task -
Schedule a Pod as follows:
✑ Name: kucc8
✑ App Containers: 2
✑ Container Name/Images:
- nginx
- consul

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kucc8
spec:
  containers:
  - name: nginx
    image: nginx
  - name: consul
    image: consul
```

`kubectl apply -f kucc8-pod.yaml`  


11. Task -
Create a persistent volume with name app-data, of capacity 2Gi and access mode ReadOnlyMany. The type of volume is hostPath and its location is /srv/app- data.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-data
spec:
  capacity:
    storage: 2Gi
  accessModes:
    - ReadOnlyMany
  hostPath:
    path: /srv/app-data
```

12. Task -
Monitor the logs of pod foo and:
✑ Extract log lines corresponding to error file-not-found
✑ Write them to /opt/KUTR00101/foo

`kubectl logs foo | grep "file-not-found" > /opt/KUTR00101/foo`


13. Context -
An existing Pod needs to be integrated into the Kubernetes built-in logging architecture (e.g. kubectl logs). Adding a streaming sidecar container is a good and common way to accomplish this requirement.

Task -
Add a sidecar container named sidecar, using the busybox image, to the existing Pod big-corp-app. The new sidecar container has to run the following command:

`/bin/sh -c "tail -n+1 -f /var/log/big-corp-app. log"`

Use a Volume, mounted at /var/log, to make the log file big-corp-app.log available to the sidecar container.

`kubectl get pod big-corp-app -o yaml > big-corp-app.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: big-corp-app
spec:
  containers:
  - name: main-container
    image: busybox
    volumeMounts:
    - name: varlog
      mountPath: /var/log
  - name: sidecar
    image: busybox
    command: ["/bin/sh", "-c", "tail -n+1 -f /var/log/big-corp-app.log"]
    volumeMounts:
    - name: varlog
      mountPath: /var/log
  volumes:
  - name: varlog
    emptyDir: {}
```

14. Task -
From the pod label name=overloaded-cpu, find pods running high CPU workloads and write the name of the pod consuming most CPU to the file /opt/
KUTR00401/KUTR00401.txt (which already exists).

`kubectl top pods -l name=overloaded-cpu --sort-by=cpu --no-headers | head -n 1 | awk '{print $1}' > /opt/KUTR00401/KUTR00401.txt`

15. Task -
A Kubernetes worker node, named wk8s-node-0 is in state NotReady.
Investigate why this is the case, and perform any appropriate steps to bring the node to a Ready state, ensuring that any changes are made permanent.

`sudo systemctl restart kubelet`  
`sudo systemctl restart kube-proxy`  

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

- Create a new PersistentVolumeClaim:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pv-volume
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Mi
  storageClassName: csi-hostpath-sc
```

- Create a new Pod which mounts the PersistentVolumeClaim as a volume:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-server
spec:
  containers:
    - name: nginx
      image: nginx
      volumeMounts:
        - mountPath: /usr/share/nginx/html
          name: web-volume
  volumes:
    - name: web-volume
      persistentVolumeClaim:
        claimName: pv-volume
```

- Expand the PersistentVolumeClaim to a capacity of 70Mi:
`kubectl edit pvc pv-volume`


17. Task -
Create a new nginx Ingress resource as follows:
✑ Name: pong
✑ Namespace: ing-internal
✑ Exposing service hello on path /hello using service port 5678


- Create a new nginx Ingress resource:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pong
  namespace: ing-internal
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - http:
      paths:
      - path: /hello
        pathType: Prefix
        backend:
          service:
            name: hello
            port:
              number: 5678
```

