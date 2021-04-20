import { createExtensionUI } from '@ohbug/core'
import useDeepCompareEffect from 'use-deep-compare-effect'
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'

export default createExtensionUI({
  name: 'OhbugExtensionUIRrweb',
  key: 'rrweb',
  components: {
    event: (React) => ({ event }) => {
      const container = React.useRef<HTMLDivElement>(null)
      const component = React.useRef<rrwebPlayer>(null)

      const events = React.useMemo(
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
    },
  },
})
