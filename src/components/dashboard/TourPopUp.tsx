import { X, MoveRight } from 'lucide-react'
import Link from "@docusaurus/Link";

interface TourPopUpProps {
  onClose: () => void
}

const TourPopUp = ({ onClose }: TourPopUpProps) => {
  return (
    <div className='fixed inset-0 z-99999 flex items-center justify-center bg-black/70 px-3 sm:px-5'>
      <div className='bg-white relative rounded-2xl w-4xl max-h-[95vh] overflow-y-auto'>

        <button
          onClick={onClose}
          className='absolute z-100000 right-2 top-2 border border-black bg-black/70 text-white rounded-full p-1'
        >
          <X />
        </button>

        <div className='p-5 flex flex-col gap-3 max-sm:p-3'>

          <section>
            <iframe
              className="w-full aspect-video rounded-xl"
              src="https://www.youtube.com/embed/XWjx-RjmhRM"
              title="Recode Hive Tour"
              allowFullScreen
            />
          </section>

          <section className='flex flex-col gap-4 pl-5 pr-5 max-sm:px-1'>

            <div>
              <div className='text-gray-500 font-bold'>
                Recodehive
              </div>

              <div className='font-bold text-xl max-sm:text-lg'>
                Explore recode hive and discover everything you can learn, build, and contribute to.
              </div>
            </div>

            <div className='flex justify-between gap-3 max-md:flex-col'>

              <div className='flex flex-col'>
                <span className='text-[15px] font-semibold'>
                  Learn and Explore
                </span>
                <span className='text-xs'>
                  Discover courses, blogs, and resources to build your skills.
                </span>
              </div>

              <div className='flex flex-col'>
                <span className='text-[15px] font-semibold'>
                  Contribute
                </span>
                <span className='text-xs'>
                  Find projects, contribute to open source, and build real-world experience.
                </span>
              </div>

              <div className='flex flex-col'>
                <span className='text-[15px] font-semibold'>
                  Earn & Grow
                </span>
                <span className='text-xs'>
                  Earn points, track your progress, and showcase your achievements.
                </span>
              </div>

            </div>

            <div className='border'></div>

            <div className='flex justify-end gap-3 max-sm:flex-col-reverse max-sm:w-full'>

              <button
                onClick={onClose}
                className='text-xs max-sm:w-full max-sm:py-2'
              >
                Watch Later
              </button>

              <Link
                to={"https://www.recodehive.com/docs/"}
                className='text-xs flex w-full shrink-0 items-center justify-center gap-1 rounded-xl bg-[#16a34a] px-5 py-2 font-semibold !text-white transition hover:bg-green-700 sm:w-auto max-sm:w-full'
              >
                Explore Recodehive
                <MoveRight size={12} />
              </Link>

            </div>

          </section>
        </div>
      </div>
    </div>
  )
}

export default TourPopUp