## How to add a new language?
- Add a new file to the resolvers map `src/resolvers/index.js`

## My language has a different kind of package file extension, what can I do?
- You can add the new extension inside `src/infra/resolverBase/readFileBy.js`
    - The output must be a JSON with a key version 