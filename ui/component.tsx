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
      const events = JSON.parse(JSON.stringify(event.metaData.rrweb))
      new rrwebPlayer({
        target: ref.current,
        // @ts-ignore
        props: {
          events,
        },
      })
    }
  }, [event, ref.current])

  return <div ref={ref} />
}

export default createExtensionUI({
  name: 'OhbugExtensionUIRrweb',
  key: 'rrweb',
  components: {
    event: Component,
  },
})
