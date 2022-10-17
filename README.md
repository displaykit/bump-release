# @displaykit/bump-release:

> Add a better description here

## How to add a new language?
- Add a new file to the resolvers map `src/resolvers/index.js`

## My language has a different kind of package file extension, what can I do?
- You can add the new extension inside `src/infra/resolverBase/readFileBy.js`
    - The output must be a JSON with a key version 

## Releases
> ...

### JavaScript

```sh
/release/minor javascript-ex ./examples/javascript-ex javascript
```

### Dart

```sh
/release/minor dart-ex ./examples/dart-ex dart
```

## Roadmap

- [ ] Add GitHub comments to invite to check the release tag created
- [ ] Add GitHub releases support
    - Try to promote an existing tag to a release
- [ ] Create GitHub App and abstraction to get tokens from it "agnostically"
- [ ] Add more languages
- [ ] Add more tests
- [ ] Add more documentation
