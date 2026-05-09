// These should be caught by no-floating-promise eslint rule

async function doWork() {
  await new Promise((resolve) => { setTimeout(resolve, 500) })
  return 'done'
}

doWork() // missing await
