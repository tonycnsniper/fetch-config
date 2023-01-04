export interface ClientCustomConfig {
  method: 'POST' | 'GET'
  headers?: object
  body?: BodyInit
}

export const client = async <T>(
  url: URL,
  customConfig: ClientCustomConfig
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    method: customConfig.method,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (customConfig.body) {
    config.body = customConfig.body
  }

  let data: any
  try {
    const response = await fetch(url, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.resolve(err.statusText || data)
  }
}
