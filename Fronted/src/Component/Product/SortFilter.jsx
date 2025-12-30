import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (e) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams)

    if (value === 'default') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }

    setSearchParams(params)
  }

  return (
    <div>
      <select
        id="sort"
        value={searchParams.get('sort') || 'default'}
        onChange={handleChange}
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortFilter
