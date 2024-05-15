'use client'

import {useState} from "react";
import {Button} from "@/components/ui/button";

const BubbleSort = () => {
    const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [sorting, setSorting] = useState(false);

    const getRandomNumber = (start: number, end: number) => {
        return Math.ceil(Math.random() * (end - start) + end);
    };

    const generateArray = () => {
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
                if (tempArray[j] > tempArray[j + 1]) {
                    await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization
                    let temp = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = temp;
                    setArray(tempArray.slice());
                }
            }
        }

        setSorting(false);
    };


    return (
        <div>
            <div className={'flex justify-center items-end'}>
                {array.map((value: number, idx: number) => (
                    <div
                        className={'bg-sky-400 mx-2'}
                        key={idx}
                        style={{
                            height: `${value * 10}px`,
                            width: '20px',
                            transition: 'background-color 0.3s'
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
