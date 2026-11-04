import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

const processes = [
  spawn(process.execPath, ['--env-file=.env.local', 'server.js'], {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' },
  }),
  spawn(process.execPath, [resolve('node_modules/vite/bin/vite.js')], {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' },
  }),
]

let stopping = false

function stop(exitCode = 0) {
  if (stopping) return
  stopping = true
  for (const child of processes) {
    if (!child.killed) child.kill()
  }
  process.exit(exitCode)
}

for (const child of processes) {
  child.on('error', (error) => {
    console.error('[dev] Failed to start local process:', error.message)
    stop(1)
  })
  child.on('exit', (code) => {
    if (!stopping && code !== 0) stop(code || 1)
  })
}

process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
