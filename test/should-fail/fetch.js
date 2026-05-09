// lint-test: deno-check-only
async function main() {
  await (await fetch('https://archive.org/metadata/commute/subject')).json().trim()
}

void main()
