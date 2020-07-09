const BinaryNode = require('./BinaryNode');
const { equals } = require('./util');

/** A non self-balancing, rooted binary tree, whose internal nodes each store a key greater than all the keys in the node's left subtree and less than those in its right subtree. */
class BinaryTree {
    /**
     * Construct a binary tree object
     * 
     * @param {Array} iterable Value used to construct a tree, defaults to null if undefined
     * @param {Function} comparator The comparator(val1, val2) function that will be used to compare two values, defaults to aritmetic comparator if undefined
     */
    constructor(iterable, comparator) {
        if (!comparator) { //numerical values will be assumed
            this.comparator = (num1, num2) => {
                if (num1 > num2) return num1;
                else return num2;
            }
        }
        else this.comparator = comparator;
        /** 
         * The root node of this tree
         * 
         * @type {BinaryNode}
         * */
        this.root = null;
        if (iterable) { //build tree
            this.buildTree(iterable);
        }
    }

    /**
     * Search for a value
     * 
     * @param {*} value The value to search for
     * @param {BinaryNode} node The node being evaluated, defaults to this.root if undefined
     * @returns {BinaryNode | null} the node where the value exists, or null if the value does not exist
     */
    search(value, node) {
        if (!node) node = this.root;
        if (!node || equals(node.data, value)) return node;
        if (equals(this.comparator(value, node.data), value)) {
            if (!node.right) return null;
            return this.search(value, node.right);
        }
        if (!node.left) return null;
        return this.search(value, node.left);
    }

    /**
     * Attempt to insert a value
     * 
     * @param {*} value The value to insert
     * @returns {boolean} whether the value was successfully inserted
     */
    insert(value) {
        if (!this.root) {
            this.root = new BinaryNode(null, null, value);
            return true;
        }
        else {
            return this.root.searchTreeInsert(value, this.comparator);
        }
    }

    /**
     * Attempt to remove a value
     * 
     * @param {*} value The value to remove
     * @returns {boolean} whether the value was successfully removed
     */
    remove(value) {
        let array = this.toArray();
        let valExists = false;
        for (let i = 0; i < array.length; ++i) {
            if (equals(array[i], value)) {
                array.splice(i, 1);
                valExists = true;
                break;
            }
        }
        if (!valExists) return false;
        this.buildTree(array);
        return true;
    }

    /**
     * Return this tree as a sorted array of values
     * 
     * @returns {Array} this tree as a sorted array of values
     */
    toArray() {
        return this.root.toArray();
    }

    /**
     * Build a non self-balancing binary search tree representing an iterable
     * 
     * @param {Array} iterable Value used to construct a tree
     */
    buildTree(iterable) {
        this.root = new BinaryNode(null, null, iterable[0]);
        for (let i = 1; i < iterable.length; ++i) this.insert(iterable[i]);
    }

    /**
     * Check if an object is equal to this object
     * 
     * @param {*} obj The object that will be compared with this object
     */
    isEqual(obj) {
        return JSON.stringify(this) === JSON.stringify(obj);
    }
}

module.exports = BinaryTree;