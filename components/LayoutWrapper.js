import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <HeaderGradient />
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between">
          <header className="flex items-center py-10">
            <div className="flex flex-auto items-center justify-between">
              <div className="flex flex-1 items-center justify-between text-base leading-5">
                <div className="hidden sm:block">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="mr-4 cursor-pointer p-2 font-medium text-gray-900 hover:rounded hover:underline  dark:text-gray-100 sm:p-2 "
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>

                <ThemeSwitch />
              </div>

              <MobileNav />
            </div>
          </header>
          <main className="mb-auto">{children}</main>

          <Footer />
        </div>
      </SectionContainer>
      {/* <FooterGradient /> */}
    </>
  )
}

function HeaderGradient() {
  return (
    <div className="motion-safe:animate-rotate-colors pointer-events-none z-[-2] mx-auto max-w-6xl">
      <div className="absolute inset-x-0 top-[-64px] h-[200px] bg-gradient-to-r from-indigo-300 to-purple-400 opacity-30 blur-3xl" />
    </div>
  )
}

// function FooterGradient() {
//   return (
//     <div className="mx-auto max-w-6xl motion-safe:animate-rotate-colors pointer-events-none z-[-1]">
//       <div className="absolute inset-x-0 bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 rounded-t-full opacity-20 blur-3xl h-[200px]" />
//     </div>
//   );
// }

export default LayoutWrapper
