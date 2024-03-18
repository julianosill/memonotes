import * as Dialog from '@radix-ui/react-dialog'

type RootProps = Dialog.DialogProps

export function Root(props: RootProps) {
  return <Dialog.Root {...props} />
}
