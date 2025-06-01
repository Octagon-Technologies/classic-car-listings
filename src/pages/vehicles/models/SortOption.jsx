/**
 * @class
 */
export default class SortOption {
  /**
   * @param { string } key - key that identifies sortOption in list
   * @param {'datePosted' | 'price'} name - The column to sort by
   * @param {'ascend' | 'descend'} order - The order of sorting
   */
  constructor(key, name, order) {
    this.name = name;
    this.order = order;
    this.key = key;
  }
}
