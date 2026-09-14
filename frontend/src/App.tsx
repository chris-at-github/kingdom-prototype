import { Button } from '@/components/ui/button'

function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-6 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">kingdom-prototype</h1>
        <p className="text-sm text-muted-foreground">
          React and Vite with shadcn/ui on Base UI and Tailwind CSS 4
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </main>
  )
}

export default App
