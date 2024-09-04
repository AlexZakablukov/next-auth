import Image from "next/image";

type UserProps = {
    name: string;
    image: string;
}

const User = ({name, image}: UserProps) => {
    return <div className='flex gap-2 items-center'>
        <Image src={image} alt={name} width={40} height={40} className='rounded-full overflow-hidden'/>
        <div>{name}</div>
    </div>
}

export default User