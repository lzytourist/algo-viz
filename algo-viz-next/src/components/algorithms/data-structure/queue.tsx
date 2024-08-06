'use client'

import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {ArrowRightIcon} from "@radix-ui/react-icons";

export default function Queue() {
    const [queue, setQueue] = useState<number[]>([]);
    const [queueSize, setQueueSize] = useState<number>(0);
    const [value, setValue] = useState<number>(0);
    const [popItem, setPopItem] = useState<boolean>(false);

    const push = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let tmpQueue = queue.splice(0);
        tmpQueue.push(value);
        setQueue(tmpQueue);

        setValue(0);

        setQueueSize(queueSize + 1);
    };

    const pop = async () => {
        if (queueSize <= 0) {
            toast({
                title: 'Queue is empty',
                description: 'Please enter push some number first.',
                variant: 'destructive',
            });
        } else {
            setPopItem(true);
            await new Promise((resolve) => setTimeout(resolve, 800));
            setPopItem(false);

            let tmpQueue = queue.splice(0);
            tmpQueue.reverse().pop();
            setQueue(tmpQueue.reverse());

            setQueueSize(queueSize - 1);
        }
    };

    return (
        <div className={'flex flex-col items-center'}>
            <div className={'w-[250px] flex flex-col items-center gap-y-4'}>
                <form onSubmit={push} className={'flex items-center'}>
                    <Input
                        type={'number'}
                        placeholder={'Enter a number'}
                        value={value}
                        onChange={(e) => setValue(parseInt(e.target.value))}
                        className={'rounded-r-none'}
                    />
                    <Button type={'submit'} className={'rounded-l-none'}>Push</Button>
                </form>
                <Button
                    type={"button"}
                    className={'w-full bg-red-600 hover:bg-red-600'}
                    onClick={pop}>Pop</Button>
            </div>

            <div className={'my-4'}>
                {
                    queueSize > 0 ?
                        <ul className={'flex text-center gap-y-0.5'}>
                            {
                                queue.map((val: number, index: number) => (
                                    <li key={index} className={`shadow-md border-2 bg-purple-400 rounded-l-xl p-2 ${index == 0 ? 'relative' : ''} ${index == 0 && popItem ? 'bg-red-600 text-white animate-pulse' : ''}`}>
                                        {val} {index == 0 ? <div className={'absolute top-1.5 -left-16 drop-shadow-xl bg-purple-700 text-gray-200 px-1 py-1 rounded-md text-sm'}><div className={'flex items-center'}>Front <ArrowRightIcon/></div></div> : ''}
                                    </li>
                                ))
                            }
                        </ul> :
                        <div>Empty queue</div>
                }
            </div>
        </div>
    )
}