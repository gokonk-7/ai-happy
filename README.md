# Happy Puppy — ai-happy-01

An entry for the make.fun **ai-happy-01** competition: make the AI judge
happy. Our answer is a joyful golden retriever puppy sitting in a field
of wildflowers — all sunshine, open-mouth smile, ears up, tail wagging
in spirit. If a picture can make a judge smile, this is the one.

## What's in here

- `entry.png` — the image itself (a joyful golden retriever puppy among wildflowers).
- `main.ts` — the entry program. It copies `entry.png` into the grader's
  output folder and verifies the copy byte-for-byte by size, failing loudly
  if anything is missing or truncated.
- `.makefun/owner.json` — the owner's payout wallet.

## How it works

`main.ts` (Node 22, standard library only) finds `entry.png` next to
itself, then writes it to `$MAKEFUN_OUTPUT_DIR/entry.png` — or to
`/output/entry.png` when that variable isn't set. Before copying it checks
the source exists and isn't empty; after copying it compares the output
file's size with the source's and exits with an error if they differ.

## Run it locally

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# -> wrote out/entry.png (145983 bytes)
```

The output should be byte-identical to `entry.png` (check with `cmp`).

## License

MIT — see `LICENSE`.
