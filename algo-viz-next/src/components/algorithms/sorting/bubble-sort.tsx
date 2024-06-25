'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {SortingState} from "@/lib/utils";

const BubbleSort = () => {
    const [array, setArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState<SortingState>(SortingState.NOT_SORTED);
    const [lastSorted, setLastSorted] = useState<number>(10000);
    const [comparisonIndex, setComparisonIndex] = useState<number>(-2);
    const [swapIndex, setSwapIndex] = useState<number>(-2);

    const getRandomNumber = (max: number, min: number) => {
        if (max < min) {
            max ^= min;
            min ^= max;
            max ^= min;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateArray = () => {
        setSwapIndex(-2);
        setSorting(0);

        let tempArray = [];
        let len = getRandomNumber(8, 15);

        for (let i = 0; i < len; ++i) {
            tempArray.push(getRandomNumber(20, 2))
        }

        setArray(tempArray);
        setLastSorted(10000);
    };

    useEffect(() => {
        generateArray();
    }, []);

    const bubbleSort = async () => {
        setSorting(SortingState.STARTED);

        const len = array.length;
        let tempArray = array.slice();

        let sorted: boolean = false;
        for (let i = 0; i < len - 1 && !sorted; i++) {
            sorted = true;

            for (let j = 0; j < len - i - 1; j++) {
                setComparisonIndex(j);

                await new Promise((resolve) => setTimeout(resolve, 800));

                if (tempArray[j] > tempArray[j + 1]) {
                    setSwapIndex(j);
                    sorted = false;

                    await new Promise((resolve) => setTimeout(resolve, 800));

                    let temp = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = temp;

                    setArray(tempArray.slice());
                    setSwapIndex(-2);
                }
            }

            setLastSorted(len - i - 1);
        }

        setSorting(SortingState.SORTED);
        setLastSorted(0);
        setComparisonIndex(-2);
    };


    return (
        <div>
            <div className={'border-2 border-dashed flex justify-center items-end min-h-[305px]'}>
                {array.map((value: number, idx: number) => (
                    <div
                        className={
                            `mx-2 text-center rounded-t ${
                                sorting == SortingState.SORTED ? 'bg-green-500 text-white' :
                                idx >= lastSorted ? 'bg-green-400 text-white' :
                                swapIndex == -2 && comparisonIndex == idx ? 'bg-orange-200' : 
                                    swapIndex == -2 && comparisonIndex + 1 == idx ? 'bg-orange-400' :
                                        swapIndex == idx ? 'bg-red-600' : 'bg-sky-400'
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
                        disabled={sorting == SortingState.STARTED}>
                    Generate Array
                </Button>
                <Button variant={'destructive'} size={'lg'} onClick={bubbleSort}
                        disabled={sorting == SortingState.STARTED || sorting == SortingState.SORTED}>
                    Sort
                </Button>
            </div>
        </div>
    )
}

export default BubbleSort;
