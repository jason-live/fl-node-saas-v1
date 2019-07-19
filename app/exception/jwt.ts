class JwtException {
  /**
   * jwt 伪装异常
   * @static
   * @memberof JwtException
   */
  static JsonWebTokenError = 'JsonWebTokenError';

  /**
   * jwt 未生效异常
   * @static
   * @memberof JwtException
   */
  static NotBeforeError = 'NotBeforeError';

  /**
   * jwt 超时异常
   * @static
   * @memberof JwtException
   */
  static TokenExpiredError = 'TokenExpiredError';
}

export default JwtException;
