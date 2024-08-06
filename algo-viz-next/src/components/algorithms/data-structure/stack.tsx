'use client'

import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {ArrowRightIcon} from "@radix-ui/react-icons";

export default function Stack() {
    const [stack, setStack] = useState<number[]>([]);
    const [stackSize, setStackSize] = useState<number>(0);
    const [value, setValue] = useState<number>(0);
    const [popItem, setPopItem] = useState<boolean>(false);

    const push = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let tmpStack = stack.splice(0);
        tmpStack.push(value);
        setStack(tmpStack);

        setValue(0);

        setStackSize(stackSize + 1);
    };

    const pop = async () => {
        if (stackSize <= 0) {
            toast({
                title: 'Stack is empty',
                description: 'Please enter push some number first.',
                variant: 'destructive',
            });
        } else {
            setPopItem(true);
            await new Promise((resolve) => setTimeout(resolve, 800));
            setPopItem(false);

            let tmpStack = stack.splice(0);
            tmpStack.pop();
            setStack(tmpStack);

            setStackSize(stackSize - 1);
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

            <div className={'w-[250px] my-4'}>
                {
                    stackSize > 0 ?
                        <ul className={'flex flex-col text-center gap-y-0.5'}>
                            {
                                stack.toReversed().map((val: number, index: number) => (
                                    <li key={index} className={`shadow-md border-2 bg-purple-400 rounded-b-xl py-2 ${index == 0 ? 'relative' : ''}  ${index == 0 && popItem ? 'bg-red-600 text-white animate-pulse' : ''}`}>
                                        {val} {index == 0 ? <div className={'absolute top-1.5 -left-4 drop-shadow-xl bg-purple-700 text-gray-200 px-1 py-1 rounded-md text-sm animate-bounce'}><div className={'flex items-center'}>Top <ArrowRightIcon/></div></div> : ''}
                                    </li>
                                ))
                            }
                        </ul> :
                        <div>Empty stack</div>
                }
            </div>
        </div>
    )
}