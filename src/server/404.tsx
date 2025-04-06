import { Button } from "@/components/ui";


export function NotFound() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1"></div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">Time Travelers Ball - Temporal Misalignment</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a> */}
          </div>
        </nav>
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-28 sm:py-32 lg:py-32">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">404</h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Your coordinates couldn't be located in time.</p>
            <p className="text-blue-700 mt-8 text-lg font-medium text-pretty sm:text-xl/8">
              <a href='/'><Button variant="outline" className="cursor-pointer">Try going home</Button></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}