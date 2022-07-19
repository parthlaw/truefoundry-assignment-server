export class ErrorResponseDto {
  constructor(
    public message: string,
    public status: number,
    public error: string,
  ) {}
}
export class OctokitErrorResponseDto extends ErrorResponseDto {
  constructor(
    public message: string,
    public status: number,
    public error: string,
    public documentation_url: string,
  ) {
    super(message, status, error);
  }
}
