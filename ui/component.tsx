import React from 'react'
import type { OhbugEvent } from '@ohbug/types'
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'

interface OhbugExtensionUIRrwebProps {
  event: OhbugEvent<any>
}
const Component: React.FC<OhbugExtensionUIRrwebProps> = ({ event }) => {
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

const extension = {
  name: 'OhbugExtensionRrweb',
  key: 'rrweb',
  type: 'metaData',
  component: Component,
}

export default extension
