import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata, { author } from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from '@/components/Image'
import readingTime from 'reading-time'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title, readingTime } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="pb-10">
            <div className="mt-4 space-y-1 text-left">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div>
                {authorDetails.map((author) => (
                  <Link key={author.name} href={author.twitter}>
                    <div className="mb-1 flex items-center space-x-2">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="24px"
                          height="24px"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                      </dl>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-2 ">
                <div className="text-gray-500 dark:text-gray-400">{readingTime.text}</div>
              </div>
            </div>
          </header>
          <div
            className=" pb-8 dark:divide-gray-700 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-4 dark:prose-dark">{children}</div>
            </div>
            <div className="prose pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
              Thanks for reading 💖! <br />
              Follow me on <Link href={siteMetadata.mastodon}>Mastodon</Link>,{' '}
              <Link href={siteMetadata.twitter}>Twitter</Link>, or subscribe via{' '}
              <Link href="/feed.xml">RSS</Link>
            </div>
            <Comments frontMatter={frontMatter} />
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
