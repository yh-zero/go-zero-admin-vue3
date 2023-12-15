// 登录表单
export type LoginType = {
  username: string;
  password: string;
  captcha: string;
  checkKey: string;
};

// 验证码返回
export type CaptchaType = {
  captchaImg: string;
};

// 登录返回
export type LoginRespType = {
  saToken: string;
  token: string;
  ticket: string;
};
