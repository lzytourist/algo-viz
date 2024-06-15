'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";

const BubbleSort = () => {
    const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [sorting, setSorting] = useState(0);
    const [lastSorted, setLastSorted] = useState(10000);
    const [cmpIndex, setCmpIndex] = useState(-2);
    const [index, setIndex] = useState(-2);

    const getRandomNumber = (start: number, end: number) => {
        return Math.ceil(Math.random() * (end - start) + end);
    };

    const generateArray = () => {
        setIndex(-2);
        setSorting(0);

        let tempArray = [];
        let len = getRandomNumber(5, 10);

        for (let i = 0; i < len; ++i) {
            tempArray.push(getRandomNumber(2, 12))
        }

        setArray(tempArray);
        setLastSorted(10000);
    };

    useEffect(() => {
        generateArray();
    }, []);

    const bubbleSort = async () => {
        setSorting(1);
        const len = array.length;
        let tempArray = array.slice();

        let sorted: boolean = false;
        for (let i = 0; i < len - 1 && !sorted; i++) {
            sorted = true;

            for (let j = 0; j < len - i - 1; j++) {
                setCmpIndex(j);

                await new Promise((resolve) => setTimeout(resolve, 800));

                if (tempArray[j] > tempArray[j + 1]) {
                    setIndex(j);
                    sorted = false;

                    await new Promise((resolve) => setTimeout(resolve, 800));

                    let temp = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = temp;

                    setArray(tempArray.slice());
                    setIndex(-2);
                }
            }
            
            setLastSorted(len - i - 1);
        }

        setSorting(2);
        setLastSorted(0);
        setCmpIndex(-2);
    };


    return (
        <div>
            <div className={'flex justify-center items-end min-h-[350px]'}>
                {array.map((value: number, idx: number) => (
                    <div
                        className={
                            `mx-2 text-center ${
                                idx >= lastSorted ? 'bg-green-400' :
                                index == -2 && cmpIndex == idx ? 'bg-orange-200' : 
                                    index == -2 && cmpIndex + 1 == idx ? 'bg-orange-400' :
                                        index == idx ? 'bg-red-600' : 'bg-sky-400'
                            }`
                        }
                        key={idx}
                        style={{
                            height: `${value * 15}px`,
                            width: '30px',
                            transition: 'all ease-in 0.3s'
                        }}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            <div className="text-center my-6">
                <Button variant={'secondary'} size={'lg'} onClick={generateArray}
                        disabled={sorting == 1}>
                    Generate Array
                </Button>
                <Button variant={'destructive'} size={'lg'} onClick={bubbleSort}
                        disabled={sorting == 1 || sorting == 2}>
                    Sort
                </Button>
            </div>
        </div>
    )
}

export default BubbleSort;
