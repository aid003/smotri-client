import { useRouter } from "next/navigation";


export const useNavigation = (path, options) => { 
    const router = useRouter();

    const handleClick = () => {
            router.push(path, options);
    }
    
    return handleClick;
}