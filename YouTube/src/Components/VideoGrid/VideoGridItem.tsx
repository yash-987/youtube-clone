import { useEffect, useRef,useState } from "react"
import { formatDuration } from "../../utils/formatDuration"
import { formatTimeAgo } from "../../utils/formatTimeAgo"

interface VideoGridItemProps{
    id: string,
    title: string,
    channel: {
        id: string,
        name: string,
        profileUrl: string,
        
    },
    views: number,
    postedAt: Date,
    duration: number,
    thumbnailUrl: string,
    videoUrl:string
}

const VIEW_FORMATTER = Intl.NumberFormat(undefined,{notation:'compact'})


const VideoGridItem = ({id,title,channel,views,postedAt,duration,thumbnailUrl,videoUrl,...props}: VideoGridItemProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current == null) return
        
        if (isPlaying) { 
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    },[isPlaying])




  return (
      <div className="flex flex-col gap-2 "
          onMouseEnter={() => setIsPlaying(true)}
          onMouseLeave={()=>setIsPlaying(false)}
      
      
      >
          <a href={`/watch?v=${id}`} className="relative aspect-video">
              <img src={thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 rounded-xl ${isPlaying? 'rounded-none':'rounded-xl'}`} alt="" />
              <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
              {formatDuration(duration)}
              </div>
              <video ref={videoRef} 
                  muted
                  playsInline
                  className={`block h-full object-cover absolute inset-0 transition-opacity duration
                  ${isPlaying?'opacity-100 delay-200':'opacity-0'}
                  `}
               src={videoUrl}>
                  
              </video>
          </a>

          <div className="flex gap-2">
              <a href={`/@${channel.id}`} className="flex shrink-0">
                  <img src={channel.profileUrl} alt=""
                  className="w-12 h-12 rounded-full "/>
              </a>

              <div className="flex flex-col ">
                  <a href={`/watch?v=${id}`} className="font-bold">
                      {title}
                  </a>
                  <a href={`/@${channel.id}`} className="text-secondary-text text-sm">{channel.name}</a>

                  <div className="text-secondary-text text-sm">
                      {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
                  </div>
              </div>
          </div>

          

    </div>
  )
}

export default VideoGridItem