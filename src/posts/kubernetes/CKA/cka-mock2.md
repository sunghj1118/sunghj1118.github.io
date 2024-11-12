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

5. Create a new deployment called nginx-deploy, with image nginx:1.16 and 1 replica. Next upgrade the deployment to version 1.17 using rolling update.
- Deployment : nginx-deploy. Image: nginx:1.16
- Image: nginx:1.16
- Task: Upgrade the version of the deployment to 1:17
- Task: Record the changes for the image upgrade

1. Create a deployment with image nginx:1.16 and 1 replica  
`kubectl create deployment nginx-deploy --image=nginx:1.16 --replicas=1`

2. Upgrade the deployment to version 1.17
`kubectl set image deployment/nginx-deploy nginx=nginx:1.17 --record`


6. Create a new user called john. Grant him access to the cluster. John should have permission to create, list, get, update and delete pods in the development namespace . The private key exists in the location: /root/CKA/john.key and csr at /root/CKA/john.csr.
- Important Note: As of kubernetes 1.19, the CertificateSigningRequest object expects a signerName.
- Please refer the documentation to see an example. The documentation tab is available at the top right of terminal.
- CSR: john-developer Status:Approved
- Role Name: developer, namespace: development, Resource: Pods
- Access: User 'john' has appropriate permissions

Steps:
1. Create a Certificate Signing Request (CSR)
2. Approve the CSR
3. Create a Role
4. Create a RoleBinding
5. Generate a kubeconfig file for John


6. Create a CSR for john

step 1: create CSR

```bash
cat << EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: john-developer
spec:
  request: $(cat /root/CKA/john.csr | base64 | tr -d '\n')
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
EOF
```

step 2: approve CSR  
`kubectl certificate approve john-developer`

step 3: create role  
`kubectl create role developer --verb=create,list,get,update,delete --resource=pods -n development`

step 4: create rolebinding  
`kubectl create rolebinding john-developer --role=developer --user=john -n development`

step 5: generate kubeconfig file for john  
`kubectl get csr john-developer -o jsonpath='{.status.certificate}' | base64 -d > john.crt`

TO_VERIFY:
```bash
kubectl auth can-i create pods --as=john -n development
kubectl auth can-i list pods --as=john -n development
kubectl auth can-i get pods --as=john -n development
kubectl auth can-i update pods --as=john -n development
kubectl auth can-i delete pods --as=john -n development
```

7. Create a nginx pod called nginx-resolver using image nginx, expose it internally with a service called nginx-resolver-service. Test that you are able to look up the service and pod names from within the cluster. Use the image: busybox:1.28 for dns lookup. Record results in /root/CKA/nginx.svc and /root/CKA/nginx.pod  
- Pod: nginx-resolver created
- Service DNS Resolution recorded correctly
- Pod DNS resolution recorded correctly


모르겠다. 계속 틀린다. pod랑 service를 bash로 temp busybox 하나 만들어서 보려고 하는데 이게 아닌것 같다.

**끝나고 풀이를 보니까 다음과 같다:**

step 1:  
- Use the command kubectl run and create a nginx pod and busybox pod. Resolve it, nginx service and its pod name from busybox pod.
- To create a pod nginx-resolver and expose it internally:  

`kubectl run nginx-resolver --image=nginx`  
`kubectl expose pod nginx-resolver --name=nginx-resolver-service --port=80 --target-port=80 --type=ClusterIP`  

step 2:  
To create a pod test-nslookup. Test that you are able to look up the service and pod names from within the cluster:

`kubectl run test-nslookup --image=busybox:1.28 --rm -it --restart=Never -- nslookup nginx-resolver-service`  
`kubectl run test-nslookup --image=busybox:1.28 --rm -it --restart=Never -- nslookup nginx-resolver-service > /root/CKA/nginx.svc`  

step 3:  
Get the IP of the nginx-resolver pod and replace the dots(.) with hyphon(-) which will be used below.

`kubectl get pod nginx-resolver -o wide`  
`kubectl run test-nslookup --image=busybox:1.28 --rm -it --restart=Never -- nslookup <P-O-D-I-P.default.pod> > /root/CKA/nginx.pod`  



8. Create a static pod on node01 called nginx-critical with image nginx and make sure that it is recreated/restarted automatically in case of a failure.  

- Use /etc/kubernetes/manifests as the Static Pod path for example.
- static pod configured under /etc/kubernetes/manifests ?
- Pod nginx-critical-node01 is up and running

답:
- `ssh node01`  
- `mkdir /etc/kubernetes/manifests`  
- `cd /etc/kubernetes/manifests`  
- `vim nginx-critical.yaml`  
- `kubectl get pods -o wide | grep nginx-critical`  

## 마무리  

1번 모의고사보다 어렵다. 이런 식으로 나오면 당황할 것 같다. 더 열심히 공부해야겠다.