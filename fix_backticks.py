import re

with open('Source/Plugin/Transform/Inject/Webview/Blob/Url/Rewrite.ts') as f:
    content = f.read()

# Pattern 1: \`word\` → word  (escaped backtick quoting)
content = re.sub(r'\\`([^`]+)\\`', r'\1', content)

# Pattern 2: `word` → word (bare backtick, but only in JSDoc comments)  
# We handle this line-by-line to avoid affecting template literals in code
lines = content.split('\n')
in_jsdoc = False
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('/**'):
        in_jsdoc = True
    if in_jsdoc:
        # Also catch any remaining bare backticks in JSDoc lines
        lines[i] = line.replace('`', "'")
    if '*/' in stripped and in_jsdoc:
        in_jsdoc = False

content = '\n'.join(lines)
with open('Source/Plugin/Transform/Inject/Webview/Blob/Url/Rewrite.ts', 'w') as f:
    f.write(content)

print('Fixed all backtick quoting in JSDoc comments.')
