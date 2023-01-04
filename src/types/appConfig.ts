export interface AppConfiguration {
  ip?: String
  domain?: String
  namespace?: String
}

export interface ConfigReponseBody {
  statusText?: String
  status?: Number
  body?: AppConfiguration
}

export interface InitialSessionResponse extends ConfigReponseBody {
  InitialConfigurationToken?: String
}

export interface InitialSessionBody {
  ApplicationIdentifier: String
  ConfigurationProfileIdentifier: String
  EnvironmentIdentifier: String
  RequiredMinimumPollIntervalInSeconds?: Number
}

export interface GetConfigurationResponse {
  NextPollConfigurationToken: String
  NextPollIntervalInSeconds: Number
  Configuration: AppConfiguration
}
