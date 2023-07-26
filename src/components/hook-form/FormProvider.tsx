import { CSSProperties } from 'react'
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

type Props = {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  style?: CSSProperties
}

export default function FormProvider({ children, onSubmit, methods, style }: Props) {
  return (
    <Form {...methods}>
      <form style={style} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  )
}
