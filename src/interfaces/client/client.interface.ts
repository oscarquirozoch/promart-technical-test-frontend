export interface IClient {
    id: string
    name: string
    surname: string
    mothers_surname: string | null
    email: string
    birthdate: string
    age?: string
    created_at: string
}