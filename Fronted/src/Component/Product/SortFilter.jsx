import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortFilter = ({ onSortChange }) => {
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

   
    if (onSortChange) {
      onSortChange(value)
    }
  }

  return (
    <div>
      <select
        id="sort"
        value={searchParams.get('sort') || 'default'}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularityAsc">Popularity: Low to High</option>
        <option value="popularityDesc">Popularity: High to Low</option>
      </select>
    </div>
  )
}

export default SortFilter
