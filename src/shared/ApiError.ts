class ApiError extends Error {
  statusCode: number;

  data: any;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ApiError;
