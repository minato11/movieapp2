import React from 'react';
import Link from 'next/link';

const NotFound = ({ message }: { message: string }) => {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center px-6 lg:px-8">
        <h2>Not Found</h2>
        <p>{message}</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
