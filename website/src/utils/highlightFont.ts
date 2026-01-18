export function highlightCode(code: string) {
    const keywords = new Set([
      "import",
      "from",
      "function",
      "return",
      "const",
      "let",
      "export",
      "default",
      "async",
      "await",
      "type",
    ]);
    const literals = new Set(["true", "false", "null", "undefined"]);
  
    let result = "";
    let i = 0;
    let inTag = false;
    let expectTagName = false;
  
    const append = (value: string, className?: string) => {
      const escaped = escapeHtml(value);
      if (!className) {
        result += escaped;
        return;
      }
      result += `<span class="${className}">${escaped}</span>`;
    };
  
    while (i < code.length) {
      const char = code[i];
  
      if (char === "<") {
        append("<", "cm-token-punct");
        i += 1;
        inTag = true;
        if (code[i] === "/") {
          append("/", "cm-token-punct");
          i += 1;
        }
        expectTagName = true;
        continue;
      }
  
      if (char === ">" && inTag) {
        append(">", "cm-token-punct");
        i += 1;
        inTag = false;
        expectTagName = false;
        continue;
      }
  
      if (char === '"' || char === "'") {
        const quote = char;
        let j = i + 1;
        while (j < code.length) {
          if (code[j] === "\\" && j + 1 < code.length) {
            j += 2;
            continue;
          }
          if (code[j] === quote) {
            j += 1;
            break;
          }
          j += 1;
        }
        append(code.slice(i, j), "cm-token-string");
        i = j;
        continue;
      }
  
      if (/\d/.test(char)) {
        let j = i + 1;
        while (j < code.length && /[\d.]/.test(code[j])) {
          j += 1;
        }
        append(code.slice(i, j), "cm-token-number");
        i = j;
        continue;
      }
  
      if (/[A-Za-z_]/.test(char)) {
        let j = i + 1;
        while (j < code.length && /[\w-]/.test(code[j])) {
          j += 1;
        }
        const word = code.slice(i, j);
        if (expectTagName) {
          append(word, "cm-token-tag");
          expectTagName = false;
        } else if (inTag) {
          let k = j;
          while (k < code.length && /\s/.test(code[k])) {
            k += 1;
          }
          if (code[k] === "=") {
            append(word, "cm-token-attr");
          } else {
            append(word);
          }
        } else if (keywords.has(word)) {
          append(word, "cm-token-keyword");
        } else if (literals.has(word)) {
          append(word, "cm-token-literal");
        } else {
          append(word);
        }
        i = j;
        continue;
      }
  
      append(char);
      i += 1;
    }
  
    return result;
  }

export function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }