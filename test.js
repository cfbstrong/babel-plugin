const { transformSync } = require("@babel/core");
const myPlugin = require("./index");

//使用插件
const code = `

    console.log("cilck");
 
    if(DEBUG){
        //1. 在生产环境下去掉调试代码
        //2. 在dev环境下执行
        const a = 10;
        const b = 20;
        console.log(a + b); 
    }
`;

const result = transformSync(code, {
  //相当于babel.config.js
  plugins: [myPlugin],
});

console.log(result.code);
