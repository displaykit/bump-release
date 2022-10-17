# @displaykit/bump-release

## How to add a new language?
- Add a new file to the resolvers map `src/resolvers/index.js`

## My language has a different kind of package file extension, what can I do?
- You can add the new extension inside `src/infra/resolverBase/readFileBy.js`
    - The output must be a JSON with a key version 

## BLA?
...

## Releases

### JavaScript

```sh
/release/minor javascript-ex ./examples/javascript-ex javascript
```

### Dart

```sh
/release/minor dart-ex ./examples/dart-ex dart
```
