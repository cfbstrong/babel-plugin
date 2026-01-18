//核心思路：转换成AST，然后修改AST树（增删改...），最后生成新的代码

module.exports = ({ type: t }) => {
  return {
    visitor: {
      //当遇到Identifier时，就会执行这个函数
      Indentifier(path) {
        const parentIsIf = t.isIfStatement(path.parentPath);
        const isDebug = path.node.name === "DEBUG";
        if (parentIsIf && isDebug) {
          //把Indentifier转换成string
          const stringNode = t.stringLiteral("DEBUG");
          //替换
          path.replaceWith(stringNode);
        }
      },

      StringLiterral(path) {
        const parentIsIf = t.isIfStatement(path.parentPath);
        const isDebug = path.node.value === "DEBUG";
        if (parentIsIf && isDebug) {
          //控制在生产环境下才能移除代码
          if (process.env.NODE_ENV === "production") path.parentPath.remove(); //删除debug代码
        }
      },
    },
  };
};
