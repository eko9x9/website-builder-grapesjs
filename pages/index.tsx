import React, { ReactElement } from 'react'
import dynamic from 'next/dynamic'

export default function index(): ReactElement {

  const Editor = dynamic(() => import("../components/Editor"), {ssr: false,});

  return (
    <div>
      <Editor />
    </div>
  )
}
