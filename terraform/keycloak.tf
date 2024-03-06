terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "4.4.0"
    }
  }
}

provider "keycloak" {
  client_id = "admin-cli"
  username  = "admin"
  password  = "password"
  url       = "http://keycloak:8080"
}

resource "keycloak_realm" "realm" {
  realm             = "wealth-bank"
  enabled           = true
  display_name      = "Wealth Bank"
  display_name_html = "<b>Wealth Bank</b>"

  # Realm login settings
  registration_allowed           = true
  registration_email_as_username = true
  reset_password_allowed         = true
  remember_me                    = true
  login_with_email_allowed       = true
  ssl_required                   = "external"
  
  # Realm theme settings
  login_theme   = "keycloak"
  account_theme = "base"
  admin_theme   = "base"
  email_theme   = "base"

  # Realm token settings
  default_signature_algorithm = "RS256"
  access_code_lifespan        = "1h"

  # Realm authentication settings
  password_policy = "upperCase(1) and length(8) and forceExpiredPasswordChange(365) and notUsername"

  internationalization {
    supported_locales = [
      "en"
    ]
    default_locale = "en"
  }

  security_defenses {
    headers {
      x_frame_options                     = "SAMEORIGIN"
      content_security_policy             = "frame-src 'self'; frame-ancestors 'self'; object-src 'none';"
      content_security_policy_report_only = ""
      x_content_type_options              = "nosniff"
      x_robots_tag                        = "none"
      x_xss_protection                    = "1; mode=block"
      strict_transport_security           = "max-age=31536000; includeSubDomains"
    }
    brute_force_detection {
      permanent_lockout                = false
      max_login_failures               = 5
      wait_increment_seconds           = 60
      quick_login_check_milli_seconds  = 1000
      minimum_quick_login_wait_seconds = 60
      max_failure_wait_seconds         = 900
      failure_reset_time_seconds       = 43200
    }
  }
}

data "keycloak_role" "default_realm_role" {
  realm_id = keycloak_realm.realm.id
  name     = "default-roles-${keycloak_realm.realm.realm}"
}

resource "keycloak_openid_client" "example_react_fe_client" {
  realm_id  = keycloak_realm.realm.id
  client_id = "example-react-fe"
  name      = "example-react-fe"
  enabled   = true
  base_url  = "http://localhost:3000"

  access_type                  = "PUBLIC"
  standard_flow_enabled        = true
  direct_access_grants_enabled = true
  valid_redirect_uris = [
    "*"
  ]

  web_origins = [
    "*"
  ]
}

resource "keycloak_openid_client" "fe_api_client" {
  realm_id  = keycloak_realm.realm.id
  client_id = "fe-api"
  name      = "fe-api"
  enabled   = true
  base_url  = "http://localhost:3001"

  access_type = "CONFIDENTIAL"
  authorization {
    policy_enforcement_mode = "PERMISSIVE"
  }
  service_accounts_enabled = true
}

resource "keycloak_role" "example_react_fe_customer_client_role" {
  realm_id    = keycloak_realm.realm.id
  client_id   = keycloak_openid_client.example_react_fe_client.id
  name        = "customer"
  description = "Wealth Bank Customer"
}

resource "keycloak_role" "example_react_fe_fraud_analyst_client_role" {
  realm_id    = keycloak_realm.realm.id
  client_id   = keycloak_openid_client.example_react_fe_client.id
  name        = "fraud-analyst"
  description = "Wealth Bank Fraud Analyst"
}

resource "keycloak_role" "fe_api_client_customer_client_role" {
  realm_id    = keycloak_realm.realm.id
  client_id   = keycloak_openid_client.fe_api_client.id
  name        = "customer"
  description = "Wealth Bank Customer"
}

resource "keycloak_user" "user_bob_with_password" {
  realm_id = keycloak_realm.realm.id
  username = "bob"
  enabled  = true

  email      = "bob@domain.com"
  first_name = "Bob"
  last_name  = "Bobson"

  initial_password {
    value     = "Password1!"
    temporary = false
  }
}

resource "keycloak_user" "user_alice_with_password" {
  realm_id = keycloak_realm.realm.id
  username = "alice"
  enabled  = true

  email      = "fraud@domain.com"
  first_name = "Alice"
  last_name  = "Alison"

  initial_password {
    value     = "Password1!"
    temporary = false
  }
}

resource "keycloak_user_roles" "user_bob_roles" {
  realm_id = keycloak_realm.realm.id
  user_id  = keycloak_user.user_bob_with_password.id

  role_ids = [
    keycloak_role.example_react_fe_customer_client_role.id,
    data.keycloak_role.default_realm_role.id
  ]
}

resource "keycloak_user_roles" "user_alice_roles" {
  realm_id = keycloak_realm.realm.id
  user_id  = keycloak_user.user_alice_with_password.id

  role_ids = [
    keycloak_role.example_react_fe_fraud_analyst_client_role.id,
    data.keycloak_role.default_realm_role.id
  ]
}
