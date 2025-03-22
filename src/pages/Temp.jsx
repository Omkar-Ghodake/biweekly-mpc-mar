import React from 'react'
import Button from '../components/Button'

const Temp = () => {
  return (
    <div className='h-screen w-screen flex flex-col space-y-20 items-center justify-center'>
      <div className='flex space-x-10'>
        {/* <Button>Submit</Button> */}
        <div className='flex flex-col items-center justify-center space-y-5'>
          <Button size='sm'>Submit</Button>
          <Button>Submit</Button>
          <Button size='lg'>Submit</Button>
        </div>

        <div className='flex flex-col items-center justify-center space-y-5'>
          <Button variant='secondary' size='sm'>
            Submit
          </Button>
          <Button variant='secondary' size='md'>
            Submit
          </Button>
          <Button variant='secondary' size='lg'>
            Submit
          </Button>
        </div>

        <div className='flex flex-col items-center justify-center space-y-5'>
          <Button variant='danger' size='sm'>
            Submit
          </Button>
          <Button variant='danger' size='md'>
            Submit
          </Button>
          <Button variant='danger' size='lg'>
            Submit
          </Button>
        </div>
      </div>

      <div className='flex space-x-10'>
        {/* <Button>Submit</Button> */}
        <div className='flex flex-col items-center justify-center space-y-5'>
          <Button type='outline' size='sm'>
            Submit
          </Button>
          <Button type='outline'>Submit</Button>
          <Button type='outline' size='lg'>
            Submit
          </Button>
        </div>

        <div className='flex flex-col items-center justify-center space-y-5'>
          <Button variant='secondary' type='outline' size='sm'>
            Submit
          </Button>
          <Button variant='secondary' type='outline' size='md'>
            Submit
          </Button>
          <Button variant='secondary' type='outline' size='lg'>
            Submit
          </Button>
        </div>

        <div className='flex flex-col items-center justify-center space-y-5'>
          <Button variant='danger' type='outline' size='sm'>
            Submit
          </Button>
          <Button variant='danger' type='outline' size='md'>
            Submit
          </Button>
          <Button variant='danger' type='outline' size='lg'>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Temp
