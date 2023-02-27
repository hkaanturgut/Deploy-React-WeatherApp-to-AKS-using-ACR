// *** Resource Group ***
rg_name     = "aks-acr-deployment-project-RG"
rg_location = "canadacentral"

// *** Azure Container Registery (ACR) ***
acr_name = "kaantweatherapp"
sku      = "Premium"

// *** Azure Kubernetes Service (AKS) ***
kubernetes_cluster_name = "weather-app-cluster"
dns_prefix              = "exampleaks1"
//default_node_pool
default_node_pool_name       = "weatherapp"
default_node_pool_node_count = 1
default_node_pool_vm_size    = "Standard_D2as_v4"
// identity
identity_type = "SystemAssigned"


// *** Role Assignment to connect ACR and AKS together ***
role_definition_name             = "AcrPull"
skip_service_principal_aad_check = true