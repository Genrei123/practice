import StoreHeader from '@/app/components/StoreHeader'
import StoreFooter from '@/app/components/StoreFooter'

export default function ContactLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <StoreHeader />
      <main>{children}</main>
      <StoreFooter />
    </>
  )
}
