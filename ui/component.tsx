import { FC, useRef, useMemo } from 'react'
import { createExtensionUI } from '@ohbug/core'
import type { OhbugExtensionUIComponentProps } from '@ohbug/types'
import useDeepCompareEffect from 'use-deep-compare-effect'
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'

const Component: FC<OhbugExtensionUIComponentProps> = ({ event }) => {
  const container = useRef<HTMLDivElement>(null)
  const component = useRef<rrwebPlayer>(null)

  const events = useMemo(
    () =>
      event && event?.metaData?.rrweb
        ? JSON.parse(JSON.stringify(event.metaData.rrweb))
        : [],
    [event]
  )

  useDeepCompareEffect(() => {
    // @ts-ignore
    component.current?.$destroy()
    // @ts-ignore
    component.current = new rrwebPlayer({
      target: container.current!,
      props: {
        events,
      },
    })

    return () => {
      // @ts-ignore
      component.current?.$destroy()
    }
  }, [events])

  return event && event?.metaData?.rrweb ? (
    <div ref={container} />
  ) : (
    <div>There is no corresponding rrweb data for the current Event</div>
  )
}

export default createExtensionUI({
  name: 'OhbugExtensionUIRrweb',
  key: 'rrweb',
  components: {
    event: Component,
  },
})
