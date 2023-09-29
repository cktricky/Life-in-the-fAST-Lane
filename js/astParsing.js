const fs = require('fs').promises;
const path = require('path');

async function aggregateContents(directory) {
  let result = '';

  // Get the list of files/directories in the current directory
  const files = await fs.readdir(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      // If it's a directory, recursively aggregate its contents
      result += await aggregateContents(fullPath);
    } else if (path.extname(file.name) === '.js') {
      // If it's a .js file, read and aggregate its contents
      const content = await fs.readFile(fullPath, 'utf-8');
      result += content + '\n'; // You can remove the newline if not needed
    }
  }

  return result;
}

const { parse } = require('@babel/parser');
const { t }  = require('@babel/types');
const _traverse = require("@babel/traverse");
const traverse = _traverse.default;




const redirectCheckPlugin = require("./redirectCheckPlugin");
// Usage example
const directoryName = './exampleApp'; // Replace with your directory name
aggregateContents(directoryName)
  .then(content => {
    var ast = parse(content, {
        sourceType: "module"
        // OPTIONAL - Add plugins like tsc, jsx, flow, etc yourself
        //plugins: ["jsx"]
    });
    traverse(ast, redirectCheckPlugin().visitor );
  })
  .catch(error => {
    console.error('Error reading contents:', error);
  });
  
 
  