import { Avatar, AvatarImage, AvatarFallback} from "./ui/avatar"

const BotAvatar = () => {
  return (
    <Avatar className="w-8 h-8">
    <AvatarImage src='/logo.png'/>
    </Avatar>
  )
}

export default BotAvatar