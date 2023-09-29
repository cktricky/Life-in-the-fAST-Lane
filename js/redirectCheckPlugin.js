// redirectCheckPlugin.js

const t = require("@babel/types");

module.exports = function() {
    return {
        visitor: {
            CallExpression(path) {
                if (
                    t.isMemberExpression(path.node.callee) &&
                    t.isIdentifier(path.node.callee.object, { name: "res" }) &&
                    t.isIdentifier(path.node.callee.property, { name: "redirect" }) &&
                    t.isMemberExpression(path.node.arguments[0]) &&
                    t.isMemberExpression(path.node.arguments[0].object) &&
                    t.isIdentifier(path.node.arguments[0].object.object, { name: "req" }) &&
                    t.isIdentifier(path.node.arguments[0].object.property, { name: "query" }) &&
                    t.isIdentifier(path.node.arguments[0].property, { name: "url" })
                ) {
                    console.log("Detected use of req.query.url inside res.redirect()");
                }
            }
        }
    };
};
