import Image from 'next/image'
import NFTListing from '@/components/NFTListing'

export default function Home() {
  return (
    <main className="main" style={{width: 'var(--main-width)'}}>
      <NFTListing />
      <NFTListing />
      <NFTListing />
      <NFTListing />
      <NFTListing />
      <NFTListing />
    </main>
  )
}
