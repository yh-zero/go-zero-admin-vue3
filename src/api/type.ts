export type SafeResponseType<T> = {
  success: boolean;
  data: T;
  error: Error | null;
  originResponse: any;
};
