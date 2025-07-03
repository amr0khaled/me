import { FollowPointer } from "@/components/follower-pointer"
import Header from "@/layout/header"


export default function Home() {
  return (
    <>
      <Header />
      <main className='min-h-64 w-full px-4 flex flex-row-reverse'>
        <FollowPointer>
          <div className='min-h-56 w-64 border-2 rounded-xl'>
            <h1>Hello</h1>
          </div>
        </FollowPointer>
      </main>
    </>
  )
}
