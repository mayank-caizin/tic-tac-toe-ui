export interface Player {
  id: string,
  name: string,
  email: string,
}

export interface PlayerForRegister {
  name: string,
  email: string,
  password: string
}

export interface PlayerForAuthentication {
  email: string,
  password: string
}
