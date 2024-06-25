import {UpdateIcon} from "@radix-ui/react-icons";

export default function LoadingSpinner() {
    return (
        <div className={'transition-all'}>
            {/*<div*/}
            {/*    className={'bg-background/70 backdrop-blur h-screen w-screen fixed top-0 left-0 z-10 transition-all'}></div>*/}
            <div className={'fixed left-1/2 top-1/3 z-20'}>
                <UpdateIcon className={'animate-spin h-8 w-8 app-text-color'}/>
            </div>
        </div>
    )
}