import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import NowPlaying from './NowPlaying'

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 transition hover:text-gray-600"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="mx-auto mb-8 mt-4 flex w-full flex-col items-start justify-center">
      <FooterGradient />
      <hr className="border-1 mb-8 w-full border-gray-100 dark:border-gray-800" />
      <div className="flex w-full flex-col-reverse justify-between pb-16 sm:flex-row">
        <div className="flex flex-col sm:flex-row sm:space-x-16">
          <div className="mb-1 flex flex-row justify-center space-x-8 sm:mb-0 sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-4">
            <Link href="/about" className="text-gray-500 transition hover:text-gray-600">
              About
            </Link>
            <Link href="/blog" className="text-gray-500 transition hover:text-gray-600">
              Blog
            </Link>
            <Link href="/tags" className="text-gray-500 transition hover:text-gray-600">
              Tags
            </Link>
            <Link href="/projects" className="text-gray-500 transition hover:text-gray-600">
              Projects
            </Link>
          </div>
          <div className="mb-1 flex  flex-row justify-center  space-x-8 sm:mb-0 sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-4">
            <ExternalLink href={siteMetadata.twitter}>Twitter</ExternalLink>
            <ExternalLink href={siteMetadata.github}>GitHub</ExternalLink>
            <Link href="/feed.xml" className="text-gray-500 transition hover:text-gray-600">
              {' '}
              RSS{' '}
            </Link>
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:items-center sm:justify-center ">
          <p className="mb-2 max-w-xs self-start text-left text-base text-gray-500 dark:text-gray-400 sm:text-right">
            Software and cathedrals are much the same - first we build them, then we pray.
          </p>
          <div className="self-end">
            <NowPlaying />
            <div />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterGradient() {
  return (
    <div className="motion-safe:animate-rotate-colors pointer-events-none z-[-1] mx-auto max-w-6xl">
      <div className="absolute inset-x-0 h-[200px] rounded-t-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 opacity-20 blur-3xl" />
    </div>
  )
}
