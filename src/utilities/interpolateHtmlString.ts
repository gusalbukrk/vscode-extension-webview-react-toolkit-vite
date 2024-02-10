// evaluate given str as a template literal with obj as its variables
// could've used eval instead (`eval('`' + fs.readFileSync(documentUri.fsPath, 'utf8') + '`')`)
// following approach was chosen because it's evident which variables are needed in the template
export default function interpolate(str: string, obj: Record<string, unknown>) {
  return new Function( // new Function(arg1, arg2, /* …, */ argN, functionBody)
    ...Object.keys(obj),
    `return \`${
      str.replaceAll('`', '\\`') // escape backticks, otherwise error if `str` contains backticks
    }\`;`,
  )(...Object.values(obj));
}
