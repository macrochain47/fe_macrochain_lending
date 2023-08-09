import Image from 'next/image'
import NFTListing from '@/components/NFTListing'

export default function Home() {
  return (
    <div className='app-home'>
      <NFTListing />
      <NFTListing />
      <NFTListing />
      <NFTListing />
      <NFTListing />
      <NFTListing />
    </div>
  )
}
