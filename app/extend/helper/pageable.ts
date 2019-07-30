class Pageable {
  static pageHelper(pageNum: number, pageSize: number) {
    const limit = (pageNum - 1) * pageSize;
    const offset = pageSize * 1;
    return {
      limit,
      offset,
    };
  }
}

export default Pageable;
