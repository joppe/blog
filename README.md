Working example of preact, where preact is compiled along with the project files into one file.

The key is the following (in tsconfig.json):
- allowJS set to `true`
- add a paths array, with a pointer to the preact src
```
"paths": {
    "node_modules/preact/src/preact": ["node_modules/preact/src/preact.js"]
},
```
- also add the definition file to the files array
```
"files": [
    "node_modules/preact/src/preact.d.ts"
]
```

In system.conf.js add
```
map: {
    'src/main': 'dist/main.js'
}
```

