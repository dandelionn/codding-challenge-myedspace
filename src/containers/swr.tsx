import { Button } from '@mantine/core';
import useSWR from 'swr'
 
export async function fetcher(...args: Parameters<typeof fetch>) {
    let [url, options] = args;
    try {
        const response = await fetch(url, options);
        if( !response.ok ) {
            throw new Error("request faild")
        } else {
            return await response.json()
        }
    } catch (error) {
        throw error;
    }
}

export function SwrExampleContainer({ userId }: { userId: number}) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher)
console.log(data, data)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>
        <Button variant="disabled">SWR</Button>
        <Button variant="default">SWR</Button>
        <Button variant="danger">SWR</Button>
        <div> 
            {JSON.stringify(data)}
        </div>
    </div>
  )
}