export class ListUserDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly deleted?: boolean,
  ) {}
}
