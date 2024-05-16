'use client'

import {useState} from "react";
import {Button} from "@/components/ui/button";

const BubbleSort = () => {
    const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [sorting, setSorting] = useState(false);
    const [cmpIndex, setCmpIndex] = useState(-2);
    const [index, setIndex] = useState(-2);

    const getRandomNumber = (start: number, end: number) => {
        return Math.ceil(Math.random() * (end - start) + end);
    };

    const generateArray = () => {
        setIndex(-2);

        let tempArray = [];
        let len = getRandomNumber(5, 10);

        for (let i = 0; i < len; ++i) {
            tempArray.push(getRandomNumber(2, 12))
        }

        setArray(tempArray);
    };

    const bubbleSort = async () => {
        setSorting(true);
        const len = array.length;
        let tempArray = array.slice();

        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                setCmpIndex(j);

                await new Promise((resolve) => setTimeout(resolve, 900));

                if (tempArray[j] > tempArray[j + 1]) {
                    setIndex(j);

                    await new Promise((resolve) => setTimeout(resolve, 700));

                    let temp = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = temp;

                    setArray(tempArray.slice());
                    setIndex(-2);
                }
            }
        }

        setSorting(false);
        setCmpIndex(-2);
    };


    return (
        <div>
            <div className={'flex justify-center items-end'}>
                {array.map((value: number, idx: number) => (
                    <div
                        className={
                            `mx-2 text-center ${
                                index == -2 && cmpIndex == idx ? 'bg-orange-200' : 
                                    index == -2 && cmpIndex + 1 == idx ? 'bg-orange-400' :
                                        index == idx ? 'bg-red-600' : 'bg-sky-400'
                            }`
                        }
                        key={idx}
                        style={{
                            height: `${value * 15}px`,
                            width: '30px',
                            transition: 'background-color 0.4s'
                        }}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            <div className="text-center my-6">
                <Button variant={'secondary'} size={'lg'} onClick={generateArray}
                        disabled={sorting}>
                    Generate Array
                </Button>
                <Button variant={'destructive'} size={'lg'} onClick={bubbleSort}
                        disabled={sorting}>
                    Sort
                </Button>
            </div>
        </div>
    )
}

export default BubbleSort;
