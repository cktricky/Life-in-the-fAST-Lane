import ast
import os

class ExampleVisitor(ast.NodeVisitor):
    def __init__(self):
        self.has_raw_sql = False

    def visit_Call(self, node):
        print(node)

class RawSQLVisitor(ast.NodeVisitor):
    def __init__(self):
        self.has_raw_sql = False

    def visit_Call(self, node):
        if (isinstance(node.func, ast.Attribute) and
            isinstance(node.func.value, ast.Attribute) and
            node.func.value.attr == 'objects' and
            node.func.attr == 'raw'):
            self.has_raw_sql = True
        self.generic_visit(node)

def get_contents(path):
    # Check if path is a file or directory
    if os.path.isfile(path):
        # Read the file and return its content
        with open(path, 'r', encoding='utf-8') as file:
            return file.read()

    elif os.path.isdir(path):
        # Get the list of files and sub-directories in the directory
        content_list = []
        for root, dirs, files in os.walk(path):
            for name in files:
                with open(os.path.join(root, name), 'r', encoding='utf-8') as file:
                    content_list.append(file.read())
        return "".join(content_list)

    else:
        return "Invalid path or unsupported type"

# Example
path = input("Enter a file or directory path: ")
code = get_contents(path)


tree = ast.parse(code)
visitors = [ExampleVisitor(), RawSQLVisitor()]

for VisitorClass in visitors:
    visitor = VisitorClass
    visitor.visit(tree)

print(visitor.has_raw_sql)