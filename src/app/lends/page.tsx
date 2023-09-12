'use client'

import NFTListing from '@/components/home/NFTListing'
import React, { useEffect } from 'react'
import './Lends.scss'
import appApi from '@/api/appAPI'
const Lends = () => {
  const [loans, setLoans] = React.useState<any[]>([])

  const fetchLoan = async() => {
    const data = await appApi.getAllLoan()
    const listLoan = data.data;
    listLoan.reverse()
    setLoans(listLoan)

    console.log(listLoan)
  }
  useEffect(() => {
    fetchLoan()
  }, [])

  return (
    <div className='app-lend--listing'>
      {
        loans.map((loan, index) => (
          <NFTListing key={index} data={loan}/>
        ))
      }
    </div>
  )
}

export default Lends