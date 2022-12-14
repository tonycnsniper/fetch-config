export interface AppConfiguration {
  ip: String
  domain: String
  namespace: String
}

export interface ConfigReponseBody {
  message?: String
  status?: Number
  body?: AppConfiguration
}
