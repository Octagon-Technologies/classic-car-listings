/**
 * @class
 */
export default class SortOption {
  /**
   * @param {'date' | 'price'} name - The column to sort by
   * @param {'asc' | 'desc'} order - The order of sorting
   */
  constructor(name, order) {
    this.name = name;
    this.order = order;
  }
}
