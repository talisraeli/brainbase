# Brainbase

Your AI personal knowledgebase and personal CRM.

## Usage

- `ctrl+b+a` - Add a new thought.
- `ctrl+b+q` - Query for a thought.
- `ctrl+b+s` - Settings (OpenAI keys, Model usage, Encryption, Costs)

## How it works

### Adding a thought

1. If thought is too big -> summerize
2. Create an embedding of the thought and save to sqlite-vss.
3. Save as json (data, created_at, updated_at) / sqlite?

### Querying for a thought

1. Find top {x} thoughts that are similar to the query.
2. If you press [tab] it will generate a new thought based on the query and the top {x} thoughts.
   Note: sorted then by date?

## Development

`npm i`
`npm start`

Building
`npm run make`
`npm run publish`
or (on WSL):
`npm run make -- --platform=win32`

## Usages

- https://github.com/WiseLibs/better-sqlite3
- https://www.npmjs.com/package/sqlite-vss
- https://mdxeditor.dev/
