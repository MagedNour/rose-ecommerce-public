import { Spinner } from '@/components/common/spinner'
import React from 'react'

export default function loading() {
  return (
    <Spinner className="size-12" show={true}/>
  )
}
