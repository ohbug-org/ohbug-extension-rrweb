import React from 'react'
import { createExtensionUI } from '@ohbug/core'
import type { OhbugExtensionUIComponentProps } from '@ohbug/types'
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'

interface RrwebProps extends OhbugExtensionUIComponentProps {}
const Component: React.FC<RrwebProps> = ({ event }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current && event && event?.metaData?.rrweb) {
      new rrwebPlayer({
        target: ref.current,
        props: {
          events: event.metaData.rrweb,
        },
      })
    }
  }, [event, ref.current])

  return <div ref={ref} />
}

export default createExtensionUI({
  name: 'OhbugExtensionRrweb',
  key: 'rrweb',
  components: {
    event: Component,
  },
})
