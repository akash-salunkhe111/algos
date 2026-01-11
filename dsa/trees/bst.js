var searchBST = function(root, val) {
    while(root !== null && root.val !== val) { 
        root = val < root.val ? root.left : root.right;
     }

     return root;
};


var searchBSTRecursive = function(root, val) {
    if (!root) return null;
    if(root.val === val) return root;
    return val < root.val ? searchBSTRecursive(root.left, val) : searchBSTRecursive(root.right, val);
};