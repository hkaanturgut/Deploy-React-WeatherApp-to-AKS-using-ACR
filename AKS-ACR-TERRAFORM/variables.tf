// *** Variables for RG ***
variable "rg_name" {
  type = string
}
variable "rg_location" {
  type = string
}



// *** Variables for Azure Container Registery (ACR)  ***
variable "acr_name" {
  description = ""
  type        = string
}
variable "sku" {
  description = ""
  type        = string
}



// *** Azure Kubernetes Service Variables ***
variable "kubernetes_cluster_name" {
  description = ""
  type        = string
}
variable "dns_prefix" {
  description = ""
  type        = string
}
//Default Node Pool Variables 
variable "default_node_pool_name" {
  description = ""
  type        = any
}
variable "default_node_pool_node_count" {
  description = ""
  type        = number
}
variable "default_node_pool_vm_size" {
  description = ""
  type        = string
}
//Identity Variables
variable "identity_type" {
  description = ""
  type        = string
}
# // *** Service Principal ***
# variable "aks_service_principal_client_id" {
#   type = any
# }
# variable "aks_service_principal_client_secret" {
#   type = any
# }


// *** Role Assignment to connect ACR and AKS together ***
variable "role_definition_name" {
  type = string

}
variable "skip_service_principal_aad_check" {
  type = bool

}