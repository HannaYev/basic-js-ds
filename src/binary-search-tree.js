const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data, nodeEl = this.rootTree) {
    if (this.rootTree === null) {
      this.rootTree = new Node(data);
    } else if (nodeEl.data > data) {
      nodeEl.left === null
        ? (nodeEl.left = new Node(data))
        : this.add(data, nodeEl.left);
    } else if (nodeEl.data < data) {
      nodeEl.right === null
        ? (nodeEl.right = new Node(data))
        : this.add(data, nodeEl.right);
    }
    return this;
  }

  has(data, nodeEl = this.rootTree) {
    if (this.rootTree === null) {
      return false;
    } else if (nodeEl.data === data) {
      return true;
    } else if (nodeEl.data > data && nodeEl.left) {
      return this.has(data, nodeEl.left);
    } else if (nodeEl.data < data && nodeEl.right) {
      return this.has(data, nodeEl.right);
    } else {
      return false;
    }
  }

  find(data, nodeEl = this.rootTree) {
    if (this.rootTree === null) {
      return null;
    } else if (nodeEl.data === data) {
      return nodeEl;
    } else if (nodeEl.data > data && nodeEl.left) {
      return this.find(data, nodeEl.left);
    } else if (nodeEl.data < data && nodeEl.right) {
      return this.find(data, nodeEl.right);
    } else {
      return null;
    }
  }

  remove(data) {
    this.rootTree = removeData(this.rootTree, data);

    function removeData(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;

        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = removeData(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) return null;

    let node = this.rootTree;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootTree) return null;

    let node = this.rootTree;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};