import { Role } from "@prisma/client"

export class CreateUserDto {
    email: string
    password: string
    fio: string
    name: string
}
