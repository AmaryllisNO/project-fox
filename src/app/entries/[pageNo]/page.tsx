'use client';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  'https://clpmzomwbhblohaswlgv.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscG16b213YmhibG9oYXN3bGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MDkwOTIsImV4cCI6MjAxNTk4NTA5Mn0.Inx9_Y5KcmgJHmuT_bmQZHcT81hgdQDkaNd4NwuONYY'
);

const Page = ({ params }: any) => {
  const pageNo = parseInt(params.pageNo);
  const indexNo = pageNo - 1;
  console.log('pageNo', pageNo);
  // console.log('router: ', router);
  const [pageEntry, setPageEntry] = useState<any>(null); // To store your data
  const [error, setError] = useState<any>(null);
  // const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    // Creating an async function inside useEffect
    const fetchPageEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('pageEntries')
          .select()
          .eq('pageNo', pageNo);
        console.log('pageEntry data: ', data);

        if (data && data.length > 0) {
          setPageEntry(data[0]); // Storing the data in state
          console.log('setPageEntry: ', data);
        } else {
          setError('The page entry was not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchPageEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  console.log('pageEntry state: ', pageEntry);
  // Render your component with the fetched data
  const dateOptions: any = { day: 'numeric', month: 'short', year: 'numeric' };

  if (error) {
    return <div>There was an error: {error}</div>;
  }

  return (
    <div>
      <h1>Project Fox</h1>

      {error && <div>There was an error: {error}</div>}

      {pageEntry ? (
        <>
          <h2>{pageEntry.title}</h2>

          <span>
            Created at:{' '}
            {new Date(pageEntry.created_at).toLocaleDateString(
              'nb-NO',
              dateOptions
            )}
          </span>
          {pageEntry.textBlocks.map((textBlock: any, index: number) => {
            return (
              <div key={index} style={{ color: 'white' }}>
                {textBlock}
              </div>
            );
          })}
          <div>{pageEntry.pageNo}</div>
          <Link href={`/entries/${pageNo + 1}`}>NEXT</Link>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Page;
