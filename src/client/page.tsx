
function Page({ children }: any) {
  return (
    <div className="bg-slate-950 h-screen w-screen">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-12 sm:py-18 lg:py-18">
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-balance sm:text-3xl text-blue-800">Intertemporal Communications Network</h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">Please enter a message locator</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
