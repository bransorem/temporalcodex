import { PasswordForm } from './passform'
import { AccessForm } from './accessform'

export function StrangerEntry({ onChange }: { onChange: (y: boolean) => void }) {
  return (
    <>
      <div className="flex flex-col w-full">
        <AccessForm onChange={onChange} />
      </div>
    </>
  )
}

export function StrangerName() {
  return (
    <>
      <div className="flex flex-col w-full">
        <PasswordForm />
      </div>
    </>
  )
}
