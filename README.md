# Deploy-React-WeatherApp-to-AKS-using-ACR

This GitHub repository provides a step-by-step guide on how to deploy your React Weather App to Azure Kubernetes Service (AKS) using Azure Container Registry (ACR). The guide is designed to be beginner-friendly and includes detailed instructions and code snippets to help you set up your AKS cluster, containerize your app, and deploy it to AKS using ACR. With this guide, you can easily deploy your React Weather App to AKS and make it available to your users with high availability and scalability.

![react-weather-aks-acr-diagram drawio](https://user-images.githubusercontent.com/113396342/221478940-4180565c-1469-4edd-b7e5-1c38a5df5bc8.png)
#

This is the summary of the steps that we will go over in this tutorial:

- Build Docker Image with Dockerfile
- Create Azure Container Registry (ACR) by TERRAFORM
- Create Azure Kubernetes Services (AKS) by TERRAFORM.
- Push the image into ACR registry
- Create Deployment and Service ( yaml file )

## Lets Get Started!

### Build a Docker Image

- Create a Dockerfile with the following content;


       FROM node:14

       WORKDIR /app

       COPY package*.json ./

       RUN npm install

       COPY . .

       EXPOSE 3000

       CMD [ "npm", "start" ]

     
  In order to build the image;
  
         - docker build -t IMAGE_NAME . 
       
### Create ACR and AKS by Terraform

 - <a href="https://github.com/hkaanturgut/Deploy-React-WeatherApp-to-AKS-using-ACR/tree/main/AKS-ACR-TERRAFORM" target="_blank">AKS-ACR Terraform Codes</a>
 
   To provision the resources 
        
         - terraform apply -var-file="dev.tfvars"

#### Azure Kubernetes Cluster (AKS)

  ![Screenshot 2023-02-26 at 9 47 03 PM](https://user-images.githubusercontent.com/113396342/221467454-1e83bcec-0f4d-4a9f-a6de-5d075ce9a2fd.png)

#### Azure Container Registry (ACR)

![Screenshot 2023-02-26 at 9 47 44 PM](https://user-images.githubusercontent.com/113396342/221467582-1221cd17-cea0-4f61-9828-2a66c5f8ccb9.png)
#

### Deep Note :

- Once Azure Kubernetes Cluster is created , Azure automaticly creates another resource group starts with "MC" to put the components of the cluster in.But puts the Kubernetes Service itself inside the resource group that we created.
    - Resource Group that I created
    
    ![Screenshot 2023-02-26 at 9 48 22 PM](https://user-images.githubusercontent.com/113396342/221468338-f3f7a94b-e629-4be8-b0c9-62ba674262af.png)
    
    - Resource Group that AZURE created 
    
    ![Screenshot 2023-02-26 at 9 48 31 PM](https://user-images.githubusercontent.com/113396342/221468925-b44a0c6c-da72-4df9-ab79-9dec23f94650.png)
#

## Connect to Azure Kubernetes Cluster 

- In order to connect to the cluster, click Connect , copy and paste the following commands to your terminal.
  
       - az aks get-credentials --resource-group aks-acr-deployment-project-RG --name weather-app-cluster
       
![Screenshot 2023-02-26 at 9 48 54 PM](https://user-images.githubusercontent.com/113396342/221470229-bd64f6a4-9a80-4b2f-9d86-593e8ab437af.png)

- Once you connected to the cluster , you can verify and see the node by doing;
          
          - kubectl get nodes 
  
 ![Screenshot 2023-02-26 at 10 52 12 PM](https://user-images.githubusercontent.com/113396342/221470516-24ea2cb5-dc5f-4aea-8f80-c92cf29479d3.png)
#

- It is time to login to the ACR and push the image
         
    - Login to ACR by doing;
          
          - az acr login --name ACR_NAME
          
 ![Screenshot 2023-02-26 at 10 56 10 PM](https://user-images.githubusercontent.com/113396342/221470854-f3db6b48-694b-4cd2-b9cc-c1a30f952d36.png)
         
-  In order to push the image , firt tag (rename) the image by doing;

              - docker tag CURRENT_IMAGE_NAME  ACR_LOGINSERVER/IMAGE_NAME:TAG
              
![Screenshot 2023-02-26 at 9 55 35 PM](https://user-images.githubusercontent.com/113396342/221471170-ea168924-a622-45f5-b8b7-a36ec77ddca4.png)
              
- Push the image to the ACR by doing;

              - docker push ACR_LOGINSERVER/IMAGE_NAME:TAG
              
![Screenshot 2023-02-26 at 10 01 03 PM](https://user-images.githubusercontent.com/113396342/221471196-2bff69d9-8c46-46e4-937b-d64aee0c2aa7.png)
#

## Create a yaml file for creating a Deployment and a Service. Content should be like;

              apiVersion: apps/v1
              kind: Deployment
              metadata:
                name: weather-app-deployment
              spec:
                replicas: 3
                selector:
                  matchLabels:
                    app: weather-app
                template:
                  metadata:
                    labels:
                      app: weather-app
                  spec:
                    containers:
                    - name: weather-app-container
                      image: kaantweatherapp.azurecr.io/weather-app-react:latest
                      resources:
                        limits:
                          cpu: 1
                          memory: 1Gi
                        requests:
                          cpu: 500m
                          memory: 500Mi
                      ports:
                      - containerPort: 3000
              ---

              apiVersion: v1
              kind: Service
              metadata:
                name: weather-app-service
              spec:
                selector:
                  app: weather-app
                ports:
                  - name: http
                    protocol: TCP
                    port: 80
                    targetPort: 3000
                type: LoadBalancer




#

#### Create the Deployment and Service 

- In order the create the Deployment and the Service from the YAML file;

       kubectl create -f NAME_OF_THE_FILE.yaml
            
![Screenshot 2023-02-26 at 10 02 10 PM](https://user-images.githubusercontent.com/113396342/221472016-7264da58-2f0a-4856-be1d-2c27bce98169.png)
#

- Check out the pods , deployment and the service.
   
   - In order to access the app , open the EXTERNAL-IP of the Service
   
![Screenshot 2023-02-26 at 10 05 14 PM](https://user-images.githubusercontent.com/113396342/221472285-f3b82107-a3c8-452f-b93e-8f5b131ba388.png)
#

## APP IS WORKING THROUGH AZURE KUBERNETES SERVICE
![Screenshot 2023-02-26 at 10 05 23 PM](https://user-images.githubusercontent.com/113396342/221472429-ee5ced57-8cd5-4dea-be82-e4ea20596e53.png)

#

Developer of the App : <a href="https://github.com/hamzakoc/Wheather_App_React" target="_blank">Hamza KOC</a>
