import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {getRandomNumber, SortingState} from "@/lib/utils";
import {ArrowDownIcon} from "@radix-ui/react-icons";

interface MergeSortState {
    start: number,
    end: number,
    level: number,
    initial: number,
    partition: 'right' | 'left'
}

const N: number = 22;
const MAX: number = 100000;
const levelState: number[] = [0, 2, 4, 6];

export default function MergeSort() {
    const [arr, setArr] = useState<number[]>([]);
    const [states, setStates] = useState<MergeSortState[]>([]);
    const [grid, setGrid] = useState<number[][]>([]);
    const [step, setStep] = useState<number>(-1);
    const [sortState, setSortState] = useState<SortingState>(SortingState.NOT_SORTED);

    const generateArray = () => {
        for (let i = 0; i < 8; ++i) {
            arr.push(getRandomNumber());
        }
    };

    const resetGrid = () => {
        let tmpGrid: number[][] = new Array(10);
        for (let i: number = 0; i < 10; i++) {
            let row: number[] = new Array(N);
            row.fill(MAX);
            tmpGrid[i] = row.slice();
        }
        setGrid(tmpGrid.slice());
        setStep(-1);
        setSortState(SortingState.NOT_SORTED);
    };

    useEffect(() => {
        let tmpStates: MergeSortState[] = [];
        const mergeSort = (
            start: number,
            end: number,
            level: number = 0,
            initial: number = 0,
            partition: 'right' | 'left' = 'left'
        ) => {
            if (start > end) return;
            tmpStates.push({start, end, level, initial, partition});

            let mid = (end - start + 1) / 2;
            mergeSort(start - mid, start - 1, level + 1, initial, 'left');
            mergeSort(end + 1, end + mid, level + 1, initial + mid, 'right');
        };

        mergeSort(7, 14);
        setStates(tmpStates.slice());

        resetGrid();
        generateArray();
    }, []);

    const applySortStates = async () => {
        let tmpStates = states.slice();
        let tmpGrid = grid.slice();

        setSortState(SortingState.STARTED);

        for (let i = 0; i < tmpStates.length; ++i) {
            const state = tmpStates[i];

            for (let j = state.start, k = 0; j <= state.end; ++j, ++k) {
                tmpGrid[levelState[state.level]][j] = state.initial + k;
            }
            setGrid([...tmpGrid]);
            await new Promise(resolve => setTimeout(resolve, 550));

            setStep(i);
        }

        setSortState(SortingState.SORTED);
    };

    return (
        <div className={'flex flex-col items-center'}>
            <h1 className={'text-3xl text-center'}>Merge Sort In Action Baibe</h1>
            <div className={'flex gap-2'}>
                <Button
                    disabled={sortState == SortingState.SORTED || sortState == SortingState.STARTED}
                    onClick={applySortStates}>Sort</Button>
                <Button
                    disabled={sortState == SortingState.STARTED}
                    onClick={resetGrid}>Reset</Button>
            </div>
            <div className={'relative border-2 border-dashed p-4 my-8 space-y-2'}>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-[-145deg] absolute left-[290px] top-[50px] ${step < 0 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-45 absolute left-[125px] top-[140px] ${step < 1 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-[-45deg] absolute left-[250px] top-[140px] ${step < 4 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-45 absolute left-[625px] top-[140px] ${step < 8 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] -rotate-45 absolute left-[750px] top-[140px] ${step < 11 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-45 absolute left-[35px] top-[235px] ${step < 2 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] -rotate-45 absolute left-[80px] top-[235px] ${step < 3 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-45 absolute left-[290px] top-[235px] ${step < 5 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] -rotate-45 absolute left-[335px] top-[235px] ${step < 6 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-45 absolute left-[540px] top-[235px] ${step < 9 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] -rotate-45 absolute left-[585px] top-[235px] ${step < 10 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] rotate-45 absolute left-[795px] top-[235px] ${step < 12 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] -rotate-45 absolute left-[845px] top-[235px] ${step < 13 ? 'hidden' : ''}`}/>
                <ArrowDownIcon
                    className={`h-[80px] w-[80px] -rotate-45 absolute left-[585px] top-[44px] ${step < 7 ? 'hidden' : ''}`}/>
                {
                    grid.map((row, i) => (
                        <div key={i} className={'flex space-x-0.5 items-center text-white'}>
                            {
                                row.map((value: number, index: number) => (
                                    <div
                                        className={`animate-accordion-down h-[40px] w-[40px] transition-colors flex items-center justify-center ${value == -1 ? 'text-primary' : ''} ${value == MAX ? '' : 'bg-primary'}`}
                                        key={index}>{value != -1 && value != MAX ? arr[value] : ''}</div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}