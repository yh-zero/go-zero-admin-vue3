/*
 * localStorage 一个有过期特性的localStorage类
 */

class Storage {
  /*
   * 获取缓存
   * @param { String } key 本地缓存中的指定的 key
   */
  get(key: string) {
    const data = window.localStorage.getItem(key);
    if (!data) {
      return null;
    }
    const _data = JSON.parse(data);
    // 已过期
    if (
      this.validExpire(
        new Date().getTime(),
        _data?.writeTime,
        _data.durationTime,
      )
    ) {
      this.remove(key);
      return null;
    } else {
      return _data.data;
    }
  }

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
   * @param { String } key 本地缓存中的指定的 key
   * @param { Any } data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
   * @param { Number } duraction 有效时长，单位毫秒
   */
  set(key: string, data: any, duraction?: number) {
    const obj = {
      data: data, // 存储数据
      writeTime: new Date().getTime(), // 写入时间
      durationTime: duraction, // 有效时长 单位毫秒
    };
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

  /**
   * 从本地缓存中异步移除指定 key
   * @param { String } key 本地缓存中的指定的 key
   */
  remove(key: string) {
    window.localStorage.removeItem(key);
  }

  /*
   * 清理本地数据缓存
   */
  clear() {
    window.localStorage.clear();
  }

  /**
   * 验证是否过期
   * @param { Number } nowTime 当前时间
   * @param { Number } writeTime 缓存写入时间
   * @param { Number } expireTime 缓存有效时长
   */
  validExpire(nowTime: number, writeTime: number, durationTime: number) {
    if (!durationTime && durationTime !== 0) {
      return false;
    }
    return nowTime > writeTime + durationTime;
  }
}

export default new Storage();
