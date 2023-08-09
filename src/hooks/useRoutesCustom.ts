import { useLocation } from 'react-router'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { applyToEveryWord, capitalizeFirstLetter } from 'src/utils/strings'

type Link = { name: string; href?: string }
type Route = { links: Link[]; heading: string }
type Path = { route: string; name: string; lastChild: string }
type Options = { [k: string]: string }

const parsePath = (route: Route, options: Options) => {
  Object.entries(options).forEach(([key, value]) => {
    route.links.forEach((link) => {
      if (link.name.includes(`{{${key}}}`)) link.name = link.name.replace(`{{${key}}}`, value)
    })
    if (route.heading.includes(`{{${key}}}`))
      route.heading = route.heading.replace(`{{${key}}}`, value)
  })
  return route
}

const getRootElement = (
  map: null | Record<string, any>,
  path: string,
  previous: string
): Path | undefined => {
  if (map === null) return undefined
  // replaced - by _: because route has '-' and in route definition we could put only '_'
  return map[path.replace('-', '_')]?.root ?? getRootElement(map[previous] ?? null, path, previous)
}

const getPathElement = (
  map: string | Path | Record<string, any>,
  path: string
): Path | undefined => {
  if (typeof map !== 'object') return undefined
  if (map.route === path) return map as Path
  const keys = Object.keys(map)

  let element
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    element = getPathElement((map as Record<string, any>)[key], path)
    if (element) break
  }

  return element
}

const getRoute = (pathname: string, options: Options) => {
  const paths = pathname.split('/')
  paths.shift()
  const route: Route = {
    links: [],
    heading: ''
  }

  paths.forEach((p, index) => {
    if (index === paths.length - 1) return
    const elem = getRootElement(ROUTES, p, paths[index - 1])
    if (elem) route.links.push({ name: elem.name, href: elem.route })
  })

  const heading = getPathElement(ROUTES, pathname)
  route.heading = heading?.name ?? ''
  if (heading && heading?.lastChild !== '') route.links.push({ name: heading.lastChild })
  return parsePath(route, options)
}

export function useRoutesCustom() {
  const { pathname } = useLocation()
  const { user } = useAuthContext()
  const { translate } = useLocales()
  const route = getRoute(pathname, { username: user?.displayName }) ?? { links: [], heading: '' }

  route.heading = applyToEveryWord(route.heading, (w) =>
    capitalizeFirstLetter(translate(w as Translation))
  )

  route.links = route.links.map((link) => ({
    ...link,
    name: applyToEveryWord(link.name, (w) => capitalizeFirstLetter(translate(w as Translation)))
  }))
  return route
}
