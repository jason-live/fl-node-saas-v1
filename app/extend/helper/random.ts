import { random } from 'lodash';

class Random {
  /**
   * 字符串数组常量
   * @static
   * @type {string[]}
   * @memberof Random
   */
  private static CHARS: string[] = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                                     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                                     'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                                     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                                     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

  /**
   * 获取指定长度的随机数字串
   * @static
   * @param {number} length
   * @returns {string}
   * @memberof Random
   */
  static randomNumber(length: number): string {
    let val: string = '';
    for (let i = 0; i < length; i++) {
      val = val + random(0, 9);
    }
    return val;
  }

  /**
   * 获取指定长度的数字字母串
   * @static
   * @param {boolean} randomFlag // 是否随机长度
   * @param {number} min // 最小长度
   * @param {number} max // 最大长度
   * @returns {string}
   * @memberof Random
   * @description // randomFlag 为 false 时，取最小长度值
   */
  static randomNumberChar(randomFlag: boolean, min: number, max?: number): string {
    let str: string = '';
    let range: number = min;
    if (randomFlag) {
      range = Math.round(Math.random() * (max || 0 - min)) + min;
    }
    for (let i = 0; i < range; i++) {
      const pos = Math.round(Math.random() * (this.CHARS.length - 1));
      str += this.CHARS[pos];
    }
    return str;
  }
}

export default Random;
