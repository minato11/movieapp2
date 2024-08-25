'use client'
import React, {useState } from 'react';
import { Input } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();


  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    setSearchQuery(event.target.value);
    if (searchQuery) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };


  return (
    <div className="Search ">
      <Input
        fullWidth={true}
        type='text'
        size='medium'
        placeholder="Search..."
        onChange={(event) => {
          handleSearch(event);
        }}
        color='primary'
      />

    </div>
  );
};

export default Search;